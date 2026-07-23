import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.PGUSER || "postgres",
        host: process.env.PGHOST || "127.0.0.1",
        database: process.env.PGDATABASE || "onepg_db",
        password: String(process.env.PGPASSWORD || "postgres"),
        port: parseInt(process.env.PGPORT || "5432", 10),
      }
);

// Automatic Self-Healing Database Table Setup on Startup
export async function initDb() {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255),
        full_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'client',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS clients (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255),
        company VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS tickets (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        subject VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Open',
        priority VARCHAR(50) DEFAULT 'Normal',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    // Seed default system admin account if missing
    const adminCheck = await pool.query("SELECT id FROM users WHERE role='admin' LIMIT 1;");
    if (adminCheck.rowCount === 0) {
      const bcrypt = await import("bcryptjs");
      const adminPassHash = await bcrypt.default.hash("Admin@123456", 12);
      await pool.query(
        `INSERT INTO users (name, full_name, email, password_hash, role)
         VALUES ($1, $2, $3, $4, 'admin') ON CONFLICT (email) DO NOTHING;`,
        ["System Admin", "System Admin", "admin@onepg.co.in", adminPassHash]
      );
      console.log("👑 Default Admin account created: admin@onepg.co.in");
    }
    console.log("✅ Database tables initialized successfully.");
  } catch (err) {
    console.error("⚠️ Database initialization check:", err.message);
  }
}

initDb();
