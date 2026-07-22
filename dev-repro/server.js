import express from 'express';
import helmet from 'helmet';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5174;

// Minimal helmet config to ensure COOP header is present
app.use(helmet({
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
}));

// Serve static demo files
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (_req, res) => res.sendFile(path.join(process.cwd(), 'public', 'index.html')));
app.get('/login.html', (_req, res) => res.sendFile(path.join(process.cwd(), 'public', 'login.html')));

app.listen(PORT, () => console.log(`BHK repro server running on http://localhost:${PORT}`));
