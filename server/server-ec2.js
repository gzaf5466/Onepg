import app from './index.js';
import db from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('⚡ Initializing OnePG Payments Onboarding Server...');
    
    // Validate database connection
    console.log('🔌 Verifying PostgreSQL connection...');
    const { rows } = await db.query('SELECT 1 + 1 AS connection_test');
    
    if (rows && rows[0]?.connection_test === 2) {
      console.log('✅ PostgreSQL database connection established successfully.');
    } else {
      throw new Error('Database test query returned unexpected result.');
    }

    app.listen(PORT, () => {
      console.log(`\n🚀 OnePG Onboarding Portal Backend running on http://localhost:${PORT}`);
      console.log(`   Health Check URL: http://localhost:${PORT}/api/health\n`);
    });

  } catch (err) {
    console.error('❌ Failed to start the server:', err.message);
    process.exit(1);
  }
};

startServer();
