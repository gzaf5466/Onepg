import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5174;

// Enable if running behind Nginx or Apache
app.enable('trust proxy');

// Performance & Parsing
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet Security Config for OAuth (Google & Amazon)
app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    crossOriginEmbedderPolicy: false, // Prevents blocking OAuth scripts
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://accounts.google.com/gsi/client",
          "https://assets.loginwithamazon.com/sdk/na/login1.js",
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        frameSrc: [
          "'self'",
          "https://accounts.google.com/",
          "https://www.amazon.com/",
        ],
        connectSrc: [
          "'self'",
          "https://accounts.google.com/gsi/",
          "https://api.amazon.com/",
        ],
      },
    },
  })
);

// Serve Static Assets
const publicPath = path.join(process.cwd(), 'public');
app.use(
  express.static(publicPath, {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
    etag: true,
  })
);

// Routes
app.get('/', (_req, res) => res.sendFile(path.join(publicPath, 'index.html')));
app.get('/login.html', (_req, res) => res.sendFile(path.join(publicPath, 'login.html')));

// Health Check Endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// SPA Fallback - Serve index.html for unmatched routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// 404 Handler
app.use((_req, res) => {
  res.status(404).send('Resource not found');
});

// Global Error Handler
app.use((err, _req, res, _next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle PM2 / systemd process restarts cleanly
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});