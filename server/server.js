// server.js
import "dotenv/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";

// Routers
import authRouter from "./src/routes/auth.js";
import usersRouter from "./src/routes/users.js";
import chatsRouter from "./src/routes/chats.js";
import messagesRouter from "./src/routes/messages.js";
import rtcRouter from "./src/routes/rtc.js";
import clientsRouter from "./src/routes/clients.js";
import ticketsRouter from "./src/routes/tickets.js";

// Socket signaling
import { attachRTC } from "./src/realtime/rtc.js";

const app = express();
app.set("trust proxy", 1); // behind Nginx/ELB

// --- Basic hardening ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

const defaultOrigins = [
  "https://onepg.co.in",
  "https://www.onepg.co.in",
  "http://onepg.co.in",
  "http://www.onepg.co.in",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://127.0.0.1:5173"
];

const envOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const ALLOWED_ORIGINS = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (/^https?:\/\/(.+\.)?onepg\.co\.in$/i.test(origin)) return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy violation: Origin '${origin}' is not permitted.`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Health
app.get("/", (_req, res) => res.send("API OK (OnePG Backend Operational)"));
app.get("/api/health", (_req, res) => res.json({ status: "healthy", message: "OnePG Backend Operational" }));

// REST routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/rtc", rtcRouter); // ICE config

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// Error guard
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

// --- HTTP + Socket.IO ---
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Socket CORS policy violation"));
      }
    },
    credentials: true,
  },
});

attachRTC(io); // <-- WebRTC signaling (auth + rooms + signaling events)

server.listen(PORT,  '0.0.0.0', () => {
  console.log(`API running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (r) => console.error("unhandledRejection:", r));
process.on("uncaughtException", (e) => console.error("uncaughtException:", e));
