import express from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import db from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const jwtSign = jsonwebtoken.sign;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
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
