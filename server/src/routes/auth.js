// v7/backend/src/routes/auth.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js";

const router = Router();

const SESSION_DAYS = parseInt(process.env.SESSION_DAYS || "180", 10);
const REFRESH_THRESHOLD_DAYS = parseInt(process.env.SESSION_REFRESH_THRESHOLD_DAYS || "7", 10);

function cookieOptions() {
  const secure = String(process.env.COOKIE_SECURE).toLowerCase() === "true";
  const sameSite = process.env.COOKIES_SAMESITE || process.env.COOKIE_SAMESITE || "lax";
  return {
    httpOnly: true,
    secure,         // set true in production with HTTPS
    sameSite,       // 'none' requires secure: true
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000, // persist across restarts
  };
}

function signToken(payloadLike) {
  // payloadLike: { id/email/role } or JWT payload from verify()
  const id = payloadLike.id ?? payloadLike.sub;
  const role = payloadLike.role;
  const email = payloadLike.email;
  return jwt.sign(
    { sub: id, role, email },
    process.env.JWT_SECRET,
    { expiresIn: `${SESSION_DAYS}d` } // long-lived
  );
}

function issueSession(res, user) {
  const token = signToken(user);
  res.cookie("token", token, cookieOptions());
  return token;
}

// POST /api/auth/register  (client/lawyer only)
router.post("/register", async (req, res) => {
  try {
    let { name, email, password, role = "client" } = req.body;

    if (role === "admin") {
      return res.status(400).json({ message: "Cannot create admin via API" });
    }
    if (!["client", "lawyer"].includes(role)) role = "client";
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const exists = await findUserByEmail(email);
    if (exists.rowCount > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const insert = await createUser({ name, email, passwordHash, role });
    const user = insert.rows[0];

    issueSession(res, user);
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const q = await findUserByEmail(email);
    if (q.rowCount === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = q.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    issueSession(res, user);
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/me  (with sliding refresh)
router.get("/me", (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET); // { sub, role, email, iat, exp }

    // Sliding session: if token is close to expiring, silently refresh it
    const nowSec = Math.floor(Date.now() / 1000);
    const remainingSec = (payload.exp || 0) - nowSec;
    const thresholdSec = REFRESH_THRESHOLD_DAYS * 24 * 60 * 60;

    if (remainingSec > 0 && remainingSec < thresholdSec) {
      // re-issue with same identity info
      issueSession(res, { id: payload.sub, role: payload.role, email: payload.email });
    }

    res.json({ ok: true, sub: payload.sub, role: payload.role, email: payload.email });
  } catch {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// POST /api/auth/social
router.post("/social", async (req, res) => {
  try {
    const { provider = "google", email, name } = req.body;
    const targetEmail = email || `${provider.toLowerCase()}@onepg.co.in`;
    const targetName = name || `${provider.charAt(0).toUpperCase() + provider.slice(1)} Merchant`;

    let user;
    const existing = await findUserByEmail(targetEmail);

    if (existing && existing.rowCount > 0) {
      user = existing.rows[0];
    } else {
      const passwordHash = await bcrypt.hash(`social-auth-${Date.now()}`, 12);
      const insert = await createUser({
        name: targetName,
        email: targetEmail,
        passwordHash,
        role: "client",
      });
      user = insert.rows[0];
    }

    const token = issueSession(res, user);
    return res.json({
      success: true,
      message: `Successfully authenticated via ${provider}`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "client",
      },
    });
  } catch (error) {
    console.error("Social auth error:", error);
    return res.status(500).json({ success: false, message: "Social authentication failed" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions());
  res.json({ ok: true });
});

export default router;
