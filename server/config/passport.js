import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import bcrypt from 'bcryptjs';
import db from './db.js';

// Helper function to find or auto-create a user & merchant profile from Passport OAuth profile
export const findOrCreateSocialUser = async (provider, profile) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const email = profile.emails && profile.emails[0] && profile.emails[0].value ? profile.emails[0].value : null;

    if (!email) {
      const providerName = provider === 'google' ? 'Google' : 'Microsoft';
      throw new Error(`No email address associated with your ${providerName} account. Please set a public email on ${providerName} or sign up manually.`);
    }

    const displayName = profile.displayName || profile.username || email.split('@')[0];

    // 1. Check existing user
    const userRes = await client.query(
      'SELECT id, name, email, role, client_id, is_active FROM users WHERE email = $1',
      [email]
    );

    if (userRes.rows.length > 0) {
      await client.query('COMMIT');
      return userRes.rows[0];
    }

    // 2. Generate unique Merchant Client ID
    const countRes = await client.query('SELECT COUNT(*) FROM clients');
    const nextNum = parseInt(countRes.rows[0].count) + 1000 + Math.floor(Math.random() * 100);
    const clientId = `OPG-2026-${nextNum}`;

    const businessName = `${displayName}'s Business`;

    await client.query(
      `INSERT INTO clients (id, name, company, email, plan, status, progress, amount_paid, pending_amount)
       VALUES ($1, $2, $3, $4, 'Basic', 'Pending', 10, 0.00, 10000.00)`,
      [clientId, displayName, businessName, email]
    );

    // Default services
    const defaultServices = ['Payout Process', 'Payin Settlement', 'Advocate AI Integration'];
    for (const svc of defaultServices) {
      await client.query('INSERT INTO services (client_id, name, status) VALUES ($1, $2, $3)', [clientId, svc, 'Not Started']);
    }

    // Default KYC docs
    const defaultDocs = ['Certificate of Incorporation', 'Company PAN Card', 'Corporate GST Certificate'];
    for (const doc of defaultDocs) {
      await client.query('INSERT INTO documents (client_id, name, status) VALUES ($1, $2, $3)', [clientId, doc, 'Pending']);
    }

    // Timeline entry
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    await client.query(
      'INSERT INTO timeline (client_id, label, date, notes, status) VALUES ($1, $2, $3, $4, $5)',
      [clientId, `Passport Single Sign-On (${provider})`, dateStr, `Account created via Passport ${provider.toUpperCase()} Strategy.`, 'Completed']
    );

    // Dummy password hash for OAuth users
    const dummySalt = await bcrypt.genSalt(10);
    const dummyHash = await bcrypt.hash(`passport_${provider}_${profile.id}_${Date.now()}`, dummySalt);

    const newUserRes = await client.query(
      `INSERT INTO users (name, email, password_hash, role, client_id, is_active)
       VALUES ($1, $2, $3, 'client', $4, 1)
       RETURNING id, name, email, role, client_id`,
      [displayName, email, dummyHash, clientId]
    );

    await client.query('COMMIT');
    return newUserRes.rows[0];

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`Passport ${provider} user creation error:`, err.message);
    throw err;
  } finally {
    client.release();
  }
};

// 1. Configure Google Passport Strategy
const googleClientId = process.env.GOOGLE_CLIENT_ID || 'DUMMY_GOOGLE_CLIENT_ID';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_GOOGLE_CLIENT_SECRET';
const backendUrl = (process.env.BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `${backendUrl}/api/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateSocialUser('google', profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// 2. Configure Microsoft Passport Strategy
const microsoftClientId = process.env.MICROSOFT_CLIENT_ID || 'DUMMY_MICROSOFT_CLIENT_ID';
const microsoftClientSecret = process.env.MICROSOFT_CLIENT_SECRET || 'DUMMY_MICROSOFT_CLIENT_SECRET';

passport.use(
  new MicrosoftStrategy(
    {
      clientID: microsoftClientId,
      clientSecret: microsoftClientSecret,
      callbackURL: `${backendUrl}/api/auth/microsoft/callback`,
      scope: ['user.read']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateSocialUser('microsoft', profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id }));

export default passport;
