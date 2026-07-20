import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { isMember } from "../models/chatModel.js";
import { createMessage, listMessages } from "../models/messageModel.js";
import { encryptString, decryptString } from "../utils/simpleCrypto.js";

const router = Router();

// POST /api/messages  { chatId, text }
router.post("/", auth, async (req, res) => {
  try {
    const { chatId, text } = req.body || {};
    if (!chatId || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ message: "chatId and non-empty text are required" });
    }
    if (!(await isMember(Number(chatId), req.user.id))) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { ciphertext, header } = encryptString(text);

    const message = await createMessage({
      chatId: Number(chatId),
      senderId: req.user.id,
      ciphertext,
      headerJson: header
    });

    res.status(201).json({
      id: message.id,
      chat_id: message.chat_id,
      sender_id: message.sender_id,
      text,
      created_at: message.created_at,
      storage: { ciphertext, header }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || "Failed to send message" });
  }
});

// GET /api/messages/:chatId  (?after, ?limit, ?raw=1)
router.get("/:chatId", auth, async (req, res) => {
  try {
    const chatId = Number(req.params.chatId);
    if (!(await isMember(chatId, req.user.id))) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const afterId = req.query.after ? Number(req.query.after) : null;
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const raw = req.query.raw === "1";

    const r = await listMessages({ chatId, afterId, limit });
    const rows = afterId ? r.rows : r.rows.slice().reverse();

    if (raw) return res.json(rows);

    const out = rows.map(m => {
      let text = "";
      try {
        text = decryptString(m.ciphertext, m.header_json);
      } catch { /* ignore */ }
      return {
        id: m.id,
        chat_id: m.chat_id,
        sender_id: m.sender_id,
        text,
        created_at: m.created_at
      };
    });

    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to list messages" });
  }
});

export default router;
