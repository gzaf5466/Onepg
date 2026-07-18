import express from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import db from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { sendOtpEmail } from '../config/email.js';

const router = express.Router();
const jwtSign = jsonwebtoken.sign;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per IP
  message: { success: false, message: 'Too many password recovery attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/login
router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().withMessage('Valid email required.').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const { rows } = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const dbUser = rows[0];
      if (dbUser.is_active !== 1) {
        return res.status(403).json({ success: false, message: 'This account has been deactivated.' });
      }

      const isMatch = await bcrypt.compare(password, dbUser.password_hash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is missing from the environment configuration.');
      }

      const payload = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        client_id: dbUser.client_id
      };

      const token = jwtSign(payload, secret, { expiresIn: '7d' });

      res.json({
        success: true,
        token,
        user: { 
          id: dbUser.id, 
          name: dbUser.name, 
          email: dbUser.email, 
          role: dbUser.role, 
          client_id: dbUser.client_id 
        },
      });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ success: false, message: 'Server error during authentication.' });
    }
  }
);

// In-memory OTP Cache (Email -> { code, expiresAt })
const otpStore = new Map();

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPasswordLimiter, [
  body('email').isEmail().withMessage('Valid email required.').normalizeEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Invalid email address provided.' });
  }

  const { email } = req.body;

  try {
    const { rows } = await db.query('SELECT id, email FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      // Don't reveal if user exists for security, but return standard response
      return res.json({ success: true, message: 'If an account exists, a verification code has been sent.' });
    }

    // Generate 4-digit OTP
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    otpStore.set(email, { code: otpCode, expiresAt });

    await sendOtpEmail(email, otpCode);

    res.json({ 
      success: true, 
      message: 'Verification code sent to your registered email address.' 
    });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to process password reset request.' });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', forgotPasswordLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('otp').notEmpty().withMessage('OTP is required.')
], (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (!stored) {
    return res.status(400).json({ success: false, message: 'Verification code expired or not found. Please request a new code.' });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new code.' });
  }

  if (stored.code !== otp.trim()) {
    return res.status(400).json({ success: false, message: 'Invalid verification code. Please check and try again.' });
  }

  res.json({ success: true, message: 'Code verified successfully.' });
});

// POST /api/auth/reset-password
router.post('/reset-password', forgotPasswordLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('otp').notEmpty(),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
], async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const stored = otpStore.get(email);

  if (!stored || stored.code !== otp.trim() || Date.now() > stored.expiresAt) {
    return res.status(400).json({ success: false, message: 'Invalid or expired session. Please start again.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    await db.query(
      'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE email = $2',
      [password_hash, email]
    );

    otpStore.delete(email);

    res.json({ success: true, message: 'Password reset successfully. You can now login.' });
  } catch (err) {
    console.error('Password reset error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to update password.' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT id, name, email, role, client_id, is_active FROM users WHERE id = $1',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User session not found.' });
    }

    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error('Auth verification error:', err.message);
    res.status(500).json({ success: false, message: 'Server error retrieving session.' });
  }
});

export default router;
