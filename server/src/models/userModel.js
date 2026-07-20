// backend/src/models/userModel.js
import { pool } from "../db.js";

export async function findUserByEmail(email) {
  return pool.query(
    "SELECT id, name, full_name, email, role, password_hash FROM users WHERE email=$1",
    [email]
  );
}

export async function createUser({ name, email, passwordHash, role }) {
  // Insert both name and full_name to satisfy NOT NULL on full_name
  return pool.query(
    `INSERT INTO users (name, full_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, role`,
    [name || null, name || null, email, passwordHash, role]
  );
}

export async function ensureSingleAdmin({ name, email, passwordHash }) {
  // If an admin already exists, return it
  const existing = await pool.query(
    "SELECT id FROM users WHERE role='admin' LIMIT 1"
  );
  if (existing.rowCount > 0) return existing.rows[0];

  // Otherwise create the one-and-only admin
  const res = await pool.query(
    `INSERT INTO users (name, full_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4, 'admin')
     RETURNING id`,
    [name || null, name || null, email, passwordHash]
  );
  return res.rows[0];
}

export async function updateUserPassword(email, passwordHash) {
  return pool.query(
    "UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING id, name, email, role",
    [passwordHash, email]
  );
}

