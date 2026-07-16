import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// Enforce configuration check
const connectionString = process.env.DATABASE_URL;
const isProd = process.env.NODE_ENV === 'production';

let pool;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: isProd ? { rejectUnauthorized: false } : false
  });
} else {
  // Fallback to explicit params
  pool = new Pool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'onepg',
    ssl: isProd ? { rejectUnauthorized: false } : false
  });
}

// Test database reachability
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err.message);
});

export default pool;
