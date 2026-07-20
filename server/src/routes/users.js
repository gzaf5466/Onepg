import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { pool } from "../db.js";

const router = Router();

// GET /api/users/me - current user's profile
router.get("/me", auth, async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id=$1",
      [req.user.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ message: "User not found" });
    res.json(r.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

// PUT /api/users/me - update name and/or email (if unique)
router.put("/me", auth, async (req, res) => {
  try {
    let { name, email } = req.body || {};
    name = typeof name === "string" ? name.trim() : undefined;
    email = typeof email === "string" ? email.trim() : undefined;

    if (email) {
      const exists = await pool.query(
        "SELECT 1 FROM users WHERE email=$1 AND id<>$2 LIMIT 1",
        [email, req.user.id]
      );
      if (exists.rowCount > 0) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    // Build dynamic update
    const fields = [];
    const values = [];
    let i = 1;
    if (name !== undefined) {
      fields.push(`name=$${i}`, `full_name=$${i}`); // keep full_name in sync
      values.push(name);
      i += 1;
    }
    if (email !== undefined) {
      fields.push(`email=$${i}`);
      values.push(email);
      i += 1;
    }
    if (fields.length === 0) {
      return res.status(400).json({ message: "No changes provided" });
    }

    values.push(req.user.id);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id=$${i} RETURNING id, name, email, role`;
    const r = await pool.query(sql, values);
    res.json(r.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// GET /api/users?search=alice
router.get("/", auth, async (req, res) => {
  try {
    const q = (req.query.search || "").trim();

    if (!q) {
      const r = await pool.query(
        "SELECT id, name, email, role FROM users ORDER BY id LIMIT 50"
      );
      return res.json(r.rows);
    }

    const like = `%${q.replace(/[%_]/g, s => "\\" + s)}%`;
    const r = await pool.query(
      `SELECT id, name, email, role
         FROM users
        WHERE email ILIKE $1 ESCAPE '\\' OR name ILIKE $1 ESCAPE '\\'
        ORDER BY name NULLS LAST, email
        LIMIT 50`,
      [like]
    );
    res.json(r.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to search users" });
  }
});

export default router;
