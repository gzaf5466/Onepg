import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * GET /api/rtc/ice  -> { iceServers: [...] }
 * Use env:
 *  - STUN_URL (optional; default "stun:stun.l.google.com:19302")
 *  - TURN_URL (optional; comma-separated URLs)
 *  - TURN_USERNAME / TURN_PASSWORD (optional)
 */
router.get("/ice", auth, (req, res) => {
  const iceServers = [];
  const stun = process.env.STUN_URL || "stun:stun.l.google.com:19302";
  iceServers.push({ urls: [stun] });

  if (process.env.TURN_URL && process.env.TURN_USERNAME && process.env.TURN_PASSWORD) {
    iceServers.push({
      urls: process.env.TURN_URL.split(",").map(s => s.trim()),
      username: process.env.TURN_USERNAME,
      credential: process.env.TURN_PASSWORD,
    });
  }

  res.json({ iceServers });
});

export default router;
