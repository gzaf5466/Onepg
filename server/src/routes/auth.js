import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, updateUserPassword } from "../models/userModel.js";
import { sendSignupOtpEmail, sendPasswordResetOtpEmail } from "../utils/mailer.js";

const router = Router();

const SESSION_DAYS = parseInt(process.env.SESSION_DAYS || "180", 10);
const REFRESH_THRESHOLD_DAYS = parseInt(process.env.SESSION_REFRESH_THRESHOLD_DAYS || "7", 10);

// In-memory OTP stores (email -> { otp, expiresAt })
const signupOtpStore = new Map();
const passwordResetOtpStore = new Map();

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
  const id = payloadLike.id ?? payloadLike.sub;
  const role = payloadLike.role;
  const email = payloadLike.email;
  return jwt.sign(
    { sub: id, role, email },
    process.env.JWT_SECRET,
    { expiresIn: `${SESSION_DAYS}d` }
  );
}

function issueSession(res, user) {
  const token = signToken(user);
  res.cookie("token", token, cookieOptions());
  return token;
}

// POST /api/auth/send-signup-otp
router.post("/send-signup-otp", async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Valid email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing.rowCount > 0) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    signupOtpStore.set(normalizedEmail, { otp, expiresAt });

    await sendSignupOtpEmail(normalizedEmail, otp, name || "Merchant");

    res.json({ success: true, message: "Verification code sent to your email address." });
  } catch (err) {
    console.error("send-signup-otp error:", err);
    res.status(500).json({ success: false, message: "Failed to send verification code." });
  }
});

// POST /api/auth/signup  (with Mail OTP verification)
router.post("/signup", async (req, res) => {
  try {
    const { name, company, email, password, phone, otp } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing.rowCount > 0) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    // OTP Verification
    if (!otp) {
      return res.status(400).json({ success: false, message: "Email verification code is required." });
    }

    const otpData = signupOtpStore.get(normalizedEmail);
    if (!otpData || otpData.otp !== otp || otpData.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
    }

    // Clear OTP after successful check
    signupOtpStore.delete(normalizedEmail);

    const passwordHash = await bcrypt.hash(password, 12);
    const insert = await createUser({ name, email: normalizedEmail, passwordHash, role: "client" });
    const user = insert.rows[0];

    const token = issueSession(res, user);
    res.status(201).json({
      success: true,
      message: "Account registered successfully!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("signup error:", err);
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
});

// POST /api/auth/register (legacy compatibility)
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
    const normalizedEmail = (email || "").trim().toLowerCase();
    const q = await findUserByEmail(normalizedEmail);
    if (q.rowCount === 0) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const user = q.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = issueSession(res, user);
    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Valid email address required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);
    if (user.rowCount === 0) {
      return res.status(404).json({ success: false, message: "No registered merchant found with this email." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    passwordResetOtpStore.set(normalizedEmail, { otp, expiresAt });

    await sendPasswordResetOtpEmail(normalizedEmail, otp);

    res.json({ success: true, message: `Verification code sent to ${normalizedEmail}` });
  } catch (err) {
    console.error("forgot-password error:", err);
    res.status(500).json({ success: false, message: "Failed to send reset code." });
  }
});

// POST /api/auth/verify-otp
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const data = passwordResetOtpStore.get(normalizedEmail);

    if (!data || data.otp !== otp || data.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
    }

    res.json({ success: true, message: "Code verified successfully." });
  } catch (err) {
    console.error("verify-otp error:", err);
    res.status(500).json({ success: false, message: "Server error verifying code." });
  }
});

// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: "Email, OTP and new password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const data = passwordResetOtpStore.get(normalizedEmail);

    if (!data || data.otp !== otp || data.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
    }

    // Remove OTP after verification
    passwordResetOtpStore.delete(normalizedEmail);

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await updateUserPassword(normalizedEmail, passwordHash);

    res.json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    console.error("reset-password error:", err);
    res.status(500).json({ success: false, message: "Server error resetting password." });
  }
});

// GET /api/auth/me  (with sliding refresh)
router.get("/me", (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const nowSec = Math.floor(Date.now() / 1000);
    const remainingSec = (payload.exp || 0) - nowSec;
    const thresholdSec = REFRESH_THRESHOLD_DAYS * 24 * 60 * 60;

    if (remainingSec > 0 && remainingSec < thresholdSec) {
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

