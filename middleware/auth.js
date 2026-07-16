import jsonwebtoken from 'jsonwebtoken';
import db from '../config/db.js';

const jwtVerify = jsonwebtoken.verify;

// Authentication guard
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token required.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, message: 'Server configuration error: JWT_SECRET missing.' });
    }

    const decoded = jwtVerify(token, secret);

    // Verify user activity status dynamically in the database
    const { rows } = await db.query(
      'SELECT id, role, client_id, is_active FROM users WHERE id = $1',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'User account not found.' });
    }

    const user = rows[0];
    if (user.is_active !== 1) {
      return res.status(403).json({ success: false, message: 'Access denied. Account has been deactivated.' });
    }

    // Attach decoded user meta to request
    req.user = {
      id: user.id,
      role: user.role,
      client_id: user.client_id
    };

    next();
  } catch (err) {
    console.warn('JWT Verification warning:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired authorization token.' });
  }
};

// Admin only restriction middleware
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin privileges required.' });
  }
  next();
};

// Client only restriction middleware
export const requireClient = (req, res, next) => {
  if (!req.user || req.user.role !== 'client') {
    return res.status(403).json({ success: false, message: 'Client privileges required.' });
  }
  next();
};
