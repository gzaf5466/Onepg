import express from 'express';
import db from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/tickets — Fetch all tickets (Admin) or client-specific tickets (Client)
router.get('/', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const { rows } = await db.query(
        `SELECT t.*, c.name AS client, c.company 
         FROM tickets t 
         JOIN clients c ON t.client_id = c.id 
         ORDER BY t.created_at DESC`
      );
      res.json({ success: true, tickets: rows });
    } else {
      if (!req.user.client_id) {
        return res.status(400).json({ success: false, message: 'No client profile bound to user session.' });
      }

      const { rows } = await db.query(
        'SELECT * FROM tickets WHERE client_id = $1 ORDER BY created_at DESC',
        [req.user.client_id]
      );
      res.json({ success: true, tickets: rows });
    }
  } catch (err) {
    console.error('Fetch tickets error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

// POST /api/tickets — Create a support ticket (Client / Admin)
router.post('/', authenticate, async (req, res) => {
  const { title, severity, desc } = req.body;
  if (!title || !desc || !severity) {
    return res.status(400).json({ success: false, message: 'Subject, description, and severity level are required.' });
  }

  const clientId = req.user.client_id;
  if (!clientId && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden. No client profile associated.' });
  }

  // If admin creates a ticket, they must supply client_id
  const targetClientId = req.user.role === 'admin' ? req.body.clientId : clientId;
  if (!targetClientId) {
    return res.status(400).json({ success: false, message: 'Client identity required for support ticket.' });
  }

  try {
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `TCK-2026-${nextNum}`;
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    await db.query(
      `INSERT INTO tickets (id, client_id, title, status, date, description, severity)
       VALUES ($1, $2, $3, 'Open', $4, $5, $6)`,
      [ticketId, targetClientId, title, dateStr, desc, severity]
    );

    res.status(201).json({ success: true, message: 'Support ticket raised successfully.', ticketId });
  } catch (err) {
    console.error('Create ticket error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

// PUT /api/tickets/:id/resolve — Mark support ticket as resolved (Admin only)
router.put('/:id/resolve', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await db.query(
      "UPDATE tickets SET status = 'Resolved' WHERE id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Target ticket code not found.' });
    }

    res.json({ success: true, message: 'Support Ticket marked as Resolved successfully!' });
  } catch (err) {
    console.error('Resolve ticket error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

export default router;
