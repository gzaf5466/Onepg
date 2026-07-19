import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import db from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Initialize Razorpay Instance
const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_dummyKey';
const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummySecret123456';

const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret
});

// POST /api/payments/create-order — Create Razorpay Test Order
router.post('/create-order', authenticate, async (req, res) => {
  try {
    const { amount, planName } = req.body; // Amount in INR (e.g. 5000 or custom)
    const numericAmount = Math.max(1, parseInt(amount) || 1000);

    const options = {
      amount: numericAmount * 100, // Razorpay takes amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${req.user.id}`,
      notes: {
        userId: req.user.id,
        clientId: req.user.client_id || '',
        planName: planName || 'OnePG Payment Plan'
      }
    };

    // If real keys aren't provided in .env, simulate order creation for test env
    if (keyId === 'rzp_test_dummyKey') {
      const simulatedOrder = {
        id: `order_test_${Date.now()}`,
        entity: 'order',
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: 'INR',
        receipt: options.receipt,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000)
      };
      return res.json({
        success: true,
        order: simulatedOrder,
        key: keyId,
        isSimulated: true,
        message: 'Razorpay Test Order generated (Simulated Mode - Add RAZORPAY_KEY_ID to .env for live test modal).'
      });
    }

    const order = await razorpayInstance.orders.create(options);
    res.json({
      success: true,
      order,
      key: keyId
    });
  } catch (err) {
    console.error('Razorpay create-order error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to create Razorpay payment order.' });
  }
});

// POST /api/payments/verify-payment — Signature Verification & Settlement
router.post('/verify-payment', authenticate, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amountPaid } = req.body;

    // Simulated Verification Mode when using dummy key
    if (keyId === 'rzp_test_dummyKey' || razorpay_order_id?.startsWith('order_test_')) {
      if (req.user.client_id) {
        const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        await db.query(
          `UPDATE clients SET amount_paid = amount_paid + $1, pending_amount = GREATEST(0, pending_amount - $1), updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
          [amountPaid || 1000, req.user.client_id]
        );
        await db.query(
          `INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, 'Razorpay Test Payment', $2, $3, 'Completed')`,
          [req.user.client_id, dateStr, `Test payment of ₹${amountPaid || 1000} settled via Razorpay Test Gateway.`]
        );
      }
      return res.json({ success: true, message: 'Simulated Razorpay payment verified and account updated.' });
    }

    // HMAC SHA256 Signature Verification
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed: Invalid Signature.' });
    }

    // Update Client Payment Ledger in Postgres
    if (req.user.client_id) {
      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const payAmount = parseFloat(amountPaid) || 0;

      await db.query(
        `UPDATE clients SET amount_paid = amount_paid + $1, pending_amount = GREATEST(0, pending_amount - $1), updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
        [payAmount, req.user.client_id]
      );

      await db.query(
        `INSERT INTO invoices (id, client_id, date, amount, status) VALUES ($1, $2, $3, $4, 'Paid')`,
        [`INV-RZP-${Date.now().toString().slice(-6)}`, req.user.client_id, dateStr, payAmount]
      );

      await db.query(
        `INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, 'Razorpay Payment Successful', $2, $3, 'Completed')`,
        [req.user.client_id, dateStr, `Received ₹${payAmount} via Razorpay (Payment ID: ${razorpay_payment_id})`]
      );
    }

    res.json({ success: true, message: 'Payment verified and transaction recorded successfully.' });

  } catch (err) {
    console.error('Razorpay verify-payment error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error verifying payment.' });
  }
});

export default router;
