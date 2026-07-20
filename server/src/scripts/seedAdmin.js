// backend/src/scripts/seedAdmin.js
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { ensureSingleAdmin } from "../models/userModel.js";
import { pool } from "../db.js";

dotenv.config();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "System Admin";

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const row = await ensureSingleAdmin({ name, email, passwordHash });
  console.log("✅ Admin ready with id:", row.id);
  await pool.end();
  process.exit(0);
}

main().catch(async (e) => {
  console.error("Seed admin failed:", e);
  try { await pool.end(); } catch {}
  process.exit(1);
});
