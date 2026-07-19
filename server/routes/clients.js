import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Helper: Recompute client progress percentage based on services status
const computeProgress = (servicesList) => {
  if (!servicesList || servicesList.length === 0) return 10;
  // Active/Completed => 1.0 weight
  // In Progress/Under Review/Applied => 0.5 weight
  // Others => 0.0
  const activeCount = servicesList.filter(s => s.status === 'Active' || s.status === 'Completed').length;
  const inProgressCount = servicesList.filter(s => ['In Progress', 'Under Review', 'Applied', 'Pending'].includes(s.status)).length;
  const total = servicesList.length;
  
  return Math.min(100, Math.max(10, Math.round(((activeCount * 1.0 + inProgressCount * 0.5) / total) * 90) + 10));
};

// GET /api/clients — Fetch all clients (Admin) or own client data (Client)
router.get('/', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const { rows } = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
      
      // Decorate with services, documents, timeline, and invoices
      const enrichedClients = await Promise.all(rows.map(async (client) => {
        const servicesRes = await db.query('SELECT name, status FROM services WHERE client_id = $1', [client.id]);
        const docsRes = await db.query('SELECT name, status FROM documents WHERE client_id = $1', [client.id]);
        const timelineRes = await db.query('SELECT label, date, notes, status FROM timeline WHERE client_id = $1 ORDER BY created_at DESC', [client.id]);
        const invoicesRes = await db.query('SELECT id, date, amount, status FROM invoices WHERE client_id = $1 ORDER BY created_at DESC', [client.id]);
        
        return {
          ...client,
          amountPaid: parseFloat(client.amount_paid),
          pendingAmount: parseFloat(client.pending_amount),
          services: servicesRes.rows,
          documents: docsRes.rows,
          timeline: timelineRes.rows,
          invoices: invoicesRes.rows.map(inv => ({ ...inv, amount: parseFloat(inv.amount) }))
        };
      }));

      return res.json({ success: true, clients: enrichedClients });
    } else {
      // Client role — fetch only self
      if (!req.user.client_id) {
        return res.status(403).json({ success: false, message: 'Forbidden. No client associated with this account.' });
      }

      const clientRes = await db.query('SELECT * FROM clients WHERE id = $1', [req.user.client_id]);
      if (clientRes.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Client profile not found.' });
      }

      const client = clientRes.rows[0];
      const servicesRes = await db.query('SELECT name, status FROM services WHERE client_id = $1', [client.id]);
      const docsRes = await db.query('SELECT name, status FROM documents WHERE client_id = $1', [client.id]);
      const timelineRes = await db.query('SELECT label, date, notes, status FROM timeline WHERE client_id = $1 ORDER BY created_at DESC', [client.id]);
      const invoicesRes = await db.query('SELECT id, date, amount, status FROM invoices WHERE client_id = $1 ORDER BY created_at DESC', [client.id]);

      const clientData = {
        ...client,
        amountPaid: parseFloat(client.amount_paid),
        pendingAmount: parseFloat(client.pending_amount),
        services: servicesRes.rows,
        documents: docsRes.rows,
        timeline: timelineRes.rows,
        invoices: invoicesRes.rows.map(inv => ({ ...inv, amount: parseFloat(inv.amount) }))
      };

      return res.json({ success: true, clients: [clientData] });
    }
  } catch (err) {
    console.error('Fetch clients error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

// GET /api/clients/:id — Fetch single client
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  // Enforce access control
  if (req.user.role !== 'admin' && req.user.client_id !== id) {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  try {
    const clientRes = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
    if (clientRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Client not found.' });
    }

    const client = clientRes.rows[0];
    const servicesRes = await db.query('SELECT name, status FROM services WHERE client_id = $1', [id]);
    const docsRes = await db.query('SELECT name, status FROM documents WHERE client_id = $1', [id]);
    const timelineRes = await db.query('SELECT label, date, notes, status FROM timeline WHERE client_id = $1 ORDER BY created_at DESC', [id]);
    const invoicesRes = await db.query('SELECT id, date, amount, status FROM invoices WHERE client_id = $1 ORDER BY created_at DESC', [id]);

    res.json({
      success: true,
      client: {
        ...client,
        amountPaid: parseFloat(client.amount_paid),
        pendingAmount: parseFloat(client.pending_amount),
        services: servicesRes.rows,
        documents: docsRes.rows,
        timeline: timelineRes.rows,
        invoices: invoicesRes.rows.map(inv => ({ ...inv, amount: parseFloat(inv.amount) }))
      }
    });
  } catch (err) {
    console.error('Fetch client error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

// POST /api/clients — Add new client (Admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, company, email, phone, password, plan } = req.body;
  if (!name || !company || !email || !password || !plan) {
    return res.status(400).json({ success: false, message: 'Required fields missing.' });
  }

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Check duplicate email
    const emailCheck = await client.query('SELECT id FROM clients WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'Email address already registered.' });
    }

    // Determine ID prefix
    const countRes = await client.query('SELECT COUNT(*) FROM clients');
    const nextNum = parseInt(countRes.rows[0].count) + 1000 + Math.floor(Math.random() * 100);
    const clientId = `OPG-2026-${nextNum}`;

    // Prices
    const isPremium = plan === 'Premium';
    const amountPaid = isPremium ? 5000.00 : 1000.00;
    const pendingAmount = isPremium ? 25000.00 : 9000.00;

    // Insert client
    await client.query(
      `INSERT INTO clients (id, name, company, email, phone, plan, status, progress, amount_paid, pending_amount)
       VALUES ($1, $2, $3, $4, $5, $6, 'Pending', 10, $7, $8)`,
      [clientId, name, company, email, phone || null, plan, amountPaid, pendingAmount]
    );

    // Insert initial services
    const defaultServices = [
      'Payout Process',
      'Payin Settlement',
      'Advocate AI Integration'
    ];
    for (const svc of defaultServices) {
      await client.query(
        'INSERT INTO services (client_id, name, status) VALUES ($1, $2, $3)',
        [clientId, svc, 'Not Started']
      );
    }

    // Insert initial documents checklist
    const defaultDocs = [
      'Certificate of Incorporation',
      'Company PAN Card',
      'Corporate GST Certificate'
    ];
    for (const doc of defaultDocs) {
      await client.query(
        'INSERT INTO documents (client_id, name, status) VALUES ($1, $2, $3)',
        [clientId, doc, 'Pending']
      );
    }

    // Create Initial Invoice
    const invIdPaid = `INV-2026-00${nextNum}`;
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    await client.query(
      'INSERT INTO invoices (id, client_id, date, amount, status) VALUES ($1, $2, $3, $4, $5)',
      [invIdPaid, clientId, dateStr, amountPaid, 'Paid']
    );

    const invIdPending = `INV-2026-00${nextNum + 10}`;
    await client.query(
      'INSERT INTO invoices (id, client_id, date, amount, status) VALUES ($1, $2, $3, $4, $5)',
      [invIdPending, clientId, '--', pendingAmount, 'Pending']
    );

    // Create default timeline entry
    await client.query(
      'INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, $2, $3, $4, $5)',
      [clientId, 'Account initialized', dateStr, 'Account initialized by Administrator.', 'Completed']
    );

    // Create User login credential
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    await client.query(
      'INSERT INTO users (name, email, password_hash, role, client_id) VALUES ($1, $2, $3, $4, $5)',
      [name, email, hash, 'client', clientId]
    );

    await client.query('COMMIT');
    res.status(201).json({ success: true, message: 'Client profile and user credentials initialized successfully.', clientId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Create client transaction failed:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  } finally {
    client.release();
  }
});

// PUT /api/clients/:id/status — Update Service Status (Admin only)
router.put('/:id/status', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { serviceName, newStatus, notes } = req.body;

  if (!serviceName || !newStatus) {
    return res.status(400).json({ success: false, message: 'ServiceName and status values required.' });
  }

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // 1. Update the target service status
    const updateSvc = await client.query(
      'UPDATE services SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE client_id = $2 AND name = $3 RETURNING id',
      [newStatus, id, serviceName]
    );

    if (updateSvc.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Target service name not found.' });
    }

    // 2. Fetch all current services to calculate new progress percentage
    const allSvcs = await client.query('SELECT status FROM services WHERE client_id = $1', [id]);
    const progressPercent = computeProgress(allSvcs.rows);

    // 3. Determine if overall status changes
    let overallStatus = 'In Progress';
    const allCompleted = allSvcs.rows.every(s => s.status === 'Active' || s.status === 'Completed');
    if (allCompleted) {
      overallStatus = 'Completed';
    }

    await client.query(
      'UPDATE clients SET progress = $1, status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
      [progressPercent, overallStatus, id]
    );

    // 4. Add milestone step in timeline
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const timelineLabel = `Service "${serviceName}" updated`;
    const finalNotes = notes || `Service status for "${serviceName}" modified to ${newStatus}.`;
    
    await client.query(
      'INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, $2, $3, $4, $5)',
      [id, timelineLabel, dateStr, finalNotes, 'Completed']
    );

    await client.query('COMMIT');
    res.json({ success: true, message: 'Service status and progress updated successfully.' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Update service status error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  } finally {
    client.release();
  }
});

// POST /api/clients/:id/documents — Upload Document (Client/Admin)
router.post('/:id/documents', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body; // In real app, this might parse physical files; we simulate setting Uploaded state

  if (req.user.role !== 'admin' && req.user.client_id !== id) {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  if (!name) {
    return res.status(400).json({ success: false, message: 'Document name required.' });
  }

  try {
    const updateDoc = await db.query(
      `INSERT INTO documents (client_id, name, status) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (client_id, name) 
       DO UPDATE SET status = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [id, name, status || 'Uploaded']
    );

    // Append to timeline
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    await db.query(
      'INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, $2, $3, $4, $5)',
      [id, 'Document Uploaded', dateStr, `Merchant uploaded KYC document: ${name}`, 'Under Review']
    );

    res.json({ success: true, message: 'Document uploaded successfully.' });
  } catch (err) {
    console.error('Document upload error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

// PUT /api/clients/:id/webhook — Set Webhook URL & Client Secret Key
router.put('/:id/webhook', authenticate, async (req, res) => {
  const { id } = req.params;
  const { webhookUrl } = req.body;

  if (req.user.role !== 'admin' && req.user.client_id !== id) {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  try {
    // Generate fresh HMAC key prefix/secret key if not set, or refresh it
    const clientSecret = 'opg_sec_' + crypto.randomBytes(24).toString('hex');
    
    await db.query(
      'UPDATE clients SET webhook_url = $1, client_secret = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
      [webhookUrl, clientSecret, id]
    );

    res.json({ success: true, message: 'Webhook endpoint updated successfully.', clientSecret });
  } catch (err) {
    console.error('Webhook config error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

// POST /api/clients/:id/pay — Complete pending payment ledger balances
router.post('/:id/pay', authenticate, async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin' && req.user.client_id !== id) {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Get current pending balance
    const clientData = await client.query('SELECT pending_amount, amount_paid FROM clients WHERE id = $1 FOR UPDATE', [id]);
    if (clientData.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Client not found.' });
    }

    const { pending_amount, amount_paid } = clientData.rows[0];
    const pendingVal = parseFloat(pending_amount);
    const paidVal = parseFloat(amount_paid);

    if (pendingVal <= 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'No outstanding balance found.' });
    }

    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    // Update invoices
    await client.query(
      `UPDATE invoices SET status = 'Paid', date = $1 
       WHERE client_id = $2 AND status = 'Pending'`,
      [dateStr, id]
    );

    // Update client balance fields
    const updatedPaid = paidVal + pendingVal;
    await client.query(
      'UPDATE clients SET amount_paid = $1, pending_amount = 0.00, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [updatedPaid, id]
    );

    // Add milestone
    await client.query(
      'INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, $2, $3, $4, $5)',
      [id, 'Payment Succeeded', dateStr, `Settled balance payment of ₹${pendingVal.toLocaleString('en-IN')}`, 'Completed']
    );

    await client.query('COMMIT');
    res.json({ success: true, message: 'Invoice payments processed successfully.' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Payment processing failed:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  } finally {
    client.release();
  }
});

export default router;
