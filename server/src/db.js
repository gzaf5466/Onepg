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
