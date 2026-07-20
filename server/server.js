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

// Socket signaling
import { attachRTC } from "./src/realtime/rtc.js";

const app = express();
app.set("trust proxy", 1); // behind Nginx/ELB

// --- Basic hardening ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

const rawOrigins = process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173";
const CLIENT_ORIGINS = rawOrigins
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: CLIENT_ORIGINS.length > 1 ? CLIENT_ORIGINS : CLIENT_ORIGINS[0],
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Health
app.get("/", (_req, res) => res.send("API OK (PERN + RBAC + Chat + RTC)"));

// REST routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/rtc", rtcRouter); // ICE config

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// Error guard
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// --- HTTP + Socket.IO ---
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_ORIGINS.length > 1 ? CLIENT_ORIGINS : CLIENT_ORIGINS[0], credentials: true },
});

attachRTC(io); // <-- WebRTC signaling (auth + rooms + signaling events)

server.listen(PORT,  '0.0.0.0', () => {
  console.log(`API running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (r) => console.error("unhandledRejection:", r));
process.on("uncaughtException", (e) => console.error("uncaughtException:", e));
