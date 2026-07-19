import express from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import { findOrCreateSocialUser } from '../config/passport.js';
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

// POST /api/auth/signup
router.post(
  '/signup',
  loginLimiter,
  [
    body('name').trim().notEmpty().withMessage('Full name is required.'),
    body('company').trim().notEmpty().withMessage('Company / Business name is required.'),
    body('email').isEmail().withMessage('Valid email required.').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { name, company, email, password, phone, plan } = req.body;
    const client = await db.connect();

    try {
      await client.query('BEGIN');

      // 1. Check if user email already exists
      const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      // 2. Generate unique Client ID
      const countRes = await client.query('SELECT COUNT(*) FROM clients');
      const nextNum = parseInt(countRes.rows[0].count) + 1000 + Math.floor(Math.random() * 100);
      const clientId = `OPG-2026-${nextNum}`;

      const selectedPlan = plan === 'Premium' ? 'Premium' : 'Basic';
      const isPremium = selectedPlan === 'Premium';
      const amountPaid = 0.00;
      const pendingAmount = isPremium ? 30000.00 : 10000.00;

      // 3. Create client record
      await client.query(
        `INSERT INTO clients (id, name, company, email, phone, plan, status, progress, amount_paid, pending_amount)
         VALUES ($1, $2, $3, $4, $5, $6, 'Pending', 10, $7, $8)`,
        [clientId, name, company, email, phone || null, selectedPlan, amountPaid, pendingAmount]
      );

      // 4. Default services
      const defaultServices = ['Payout Process', 'Payin Settlement', 'Advocate AI Integration'];
      for (const svc of defaultServices) {
        await client.query(
          'INSERT INTO services (client_id, name, status) VALUES ($1, $2, $3)',
          [clientId, svc, 'Not Started']
        );
      }

      // 5. Default KYC documents
      const defaultDocs = ['Certificate of Incorporation', 'Company PAN Card', 'Corporate GST Certificate'];
      for (const doc of defaultDocs) {
        await client.query(
          'INSERT INTO documents (client_id, name, status) VALUES ($1, $2, $3)',
          [clientId, doc, 'Pending']
        );
      }

      // 6. Initial Pending Invoice
      const invId = `INV-2026-00${nextNum}`;
      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      await client.query(
        'INSERT INTO invoices (id, client_id, date, amount, status) VALUES ($1, $2, $3, $4, $5)',
        [invId, clientId, dateStr, pendingAmount, 'Pending']
      );

      // 7. Timeline entry
      await client.query(
        'INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, $2, $3, $4, $5)',
        [clientId, 'Account Registered', dateStr, 'Merchant account self-registered via web portal.', 'Completed']
      );

      // 8. Create user authentication record
      const salt = await bcrypt.genSalt(12);
      const password_hash = await bcrypt.hash(password, salt);

      const userRes = await client.query(
        `INSERT INTO users (name, email, password_hash, role, client_id, is_active)
         VALUES ($1, $2, $3, 'client', $4, 1)
         RETURNING id, name, email, role, client_id`,
        [name, email, password_hash, clientId]
      );

      await client.query('COMMIT');

      const newUser = userRes.rows[0];
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET missing.');
      }

      const token = jwtSign({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        client_id: newUser.client_id
      }, secret, { expiresIn: '7d' });

      res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        token,
        user: newUser
      });

    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Signup error:', err.message);
      res.status(500).json({ success: false, message: 'Failed to complete registration.' });
    } finally {
      client.release();
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

// POST /api/auth/social — Handle Google & GitHub Social Login/Signup
router.post('/social', loginLimiter, [
  body('email').isEmail().withMessage('Valid email required.').normalizeEmail(),
  body('provider').isIn(['google', 'microsoft']).withMessage('Unsupported social auth provider.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { email, name, provider, companyName } = req.body;
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    // 1. Check if user already exists
    const userRes = await client.query(
      'SELECT id, name, email, role, client_id, is_active FROM users WHERE email = $1',
      [email]
    );

    let dbUser;

    if (userRes.rows.length > 0) {
      dbUser = userRes.rows[0];
      if (dbUser.is_active !== 1) {
        await client.query('ROLLBACK');
        return res.status(403).json({ success: false, message: 'This account has been deactivated.' });
      }
    } else {
      // 2. Automatically register new user & merchant profile
      const countRes = await client.query('SELECT COUNT(*) FROM clients');
      const nextNum = parseInt(countRes.rows[0].count) + 1000 + Math.floor(Math.random() * 100);
      const clientId = `OPG-2026-${nextNum}`;

      const displayName = name || email.split('@')[0];
      const businessName = companyName || `${displayName}'s Business`;

      // Insert merchant client record
      await client.query(
        `INSERT INTO clients (id, name, company, email, plan, status, progress, amount_paid, pending_amount)
         VALUES ($1, $2, $3, $4, 'Basic', 'Pending', 10, 0.00, 10000.00)`,
        [clientId, displayName, businessName, email]
      );

      // Insert default services
      const defaultServices = ['Payout Process', 'Payin Settlement', 'Advocate AI Integration'];
      for (const svc of defaultServices) {
        await client.query('INSERT INTO services (client_id, name, status) VALUES ($1, $2, $3)', [clientId, svc, 'Not Started']);
      }

      // Insert default KYC docs
      const defaultDocs = ['Certificate of Incorporation', 'Company PAN Card', 'Corporate GST Certificate'];
      for (const doc of defaultDocs) {
        await client.query('INSERT INTO documents (client_id, name, status) VALUES ($1, $2, $3)', [clientId, doc, 'Pending']);
      }

      // Timeline entry
      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      await client.query(
        'INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, $2, $3, $4, $5)',
        [clientId, `Social Sign-up (${provider})`, dateStr, `Account created via ${provider.toUpperCase()} single-sign-on.`, 'Completed']
      );

      // Random dummy password hash for social accounts
      const dummySalt = await bcrypt.genSalt(10);
      const dummyHash = await bcrypt.hash(`social_${provider}_${Date.now()}`, dummySalt);

      const newUserRes = await client.query(
        `INSERT INTO users (name, email, password_hash, role, client_id, is_active)
         VALUES ($1, $2, $3, 'client', $4, 1)
         RETURNING id, name, email, role, client_id`,
        [displayName, email, dummyHash, clientId]
      );

      dbUser = newUserRes.rows[0];
    }

    await client.query('COMMIT');

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET missing.');
    }

    const token = jwtSign({
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      client_id: dbUser.client_id
    }, secret, { expiresIn: '7d' });

    res.json({
      success: true,
      message: `Authenticated via ${provider.toUpperCase()} successfully!`,
      token,
      user: dbUser
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Social auth error:', err.message);
    res.status(500).json({ success: false, message: 'Server error processing social sign-in.' });
  } finally {
    client.release();
  }
});

// GET /api/auth/google — Passport Google OAuth Redirect
router.get('/google', (req, res, next) => {
  const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
  if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'DUMMY_GOOGLE_CLIENT_ID') {
    console.warn('⚠️ Google OAuth attempt failed: GOOGLE_CLIENT_ID is not configured in server/.env');
    return res.redirect(`${clientUrl}/login?error=${encodeURIComponent('Google Authentication service is currently unavailable. Please sign in with your email and password.')}`);
  }
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

// GET /api/auth/google/callback — Passport Google OAuth Callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
    if (err || !user) {
      console.error('Google Passport callback error:', err);
      const msg = err?.message || 'Unable to authenticate with Google. Please try again or sign in with your email.';
      return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(msg)}`);
    }

    const secret = process.env.JWT_SECRET;
    const token = jwtSign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      client_id: user.client_id
    }, secret, { expiresIn: '7d' });

    res.redirect(`${clientUrl}/login?token=${token}&social=google`);
  })(req, res, next);
});

// GET /api/auth/microsoft — Passport Microsoft OAuth Redirect
router.get('/microsoft', (req, res, next) => {
  const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
  if (!process.env.MICROSOFT_CLIENT_ID || process.env.MICROSOFT_CLIENT_ID === 'DUMMY_MICROSOFT_CLIENT_ID') {
    console.warn('⚠️ Microsoft OAuth attempt failed: MICROSOFT_CLIENT_ID is not configured in server/.env');
    return res.redirect(`${clientUrl}/login?error=${encodeURIComponent('Microsoft Authentication service is currently unavailable. Please sign in with your email and password.')}`);
  }
  passport.authenticate('microsoft', { session: false })(req, res, next);
});

// GET /api/auth/microsoft/callback — Passport Microsoft OAuth Callback
router.get('/microsoft/callback', (req, res, next) => {
  passport.authenticate('microsoft', { session: false }, (err, user) => {
    const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
    if (err || !user) {
      console.error('Microsoft Passport callback error:', err);
      const msg = err?.message || 'Unable to authenticate with Microsoft. Please try again or sign in with your email.';
      return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(msg)}`);
    }

    const secret = process.env.JWT_SECRET;
    const token = jwtSign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      client_id: user.client_id
    }, secret, { expiresIn: '7d' });

    res.redirect(`${clientUrl}/login?token=${token}&social=microsoft`);
  })(req, res, next);
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
