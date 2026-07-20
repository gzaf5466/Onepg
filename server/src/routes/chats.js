import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { createChat, listChatsForUser, isMember, membersOfChat } from "../models/chatModel.js";
import { pool } from "../db.js";

const router = Router();

// POST /api/chats  { isGroup, title, memberIds[] }
router.post("/", auth, async (req, res) => {
  try {
    const { isGroup = false, title = null, memberIds = [] } = req.body || {};
    const chat = await createChat({ isGroup, title, memberIds, createdBy: req.user.id });
    res.status(201).json(chat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create chat" });
  }
});

// GET /api/chats  -> list user's chats
router.get("/", auth, async (req, res) => {
  try {
    const list = await listChatsForUser(req.user.id);
    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to list chats" });
  }
});

// GET /api/chats/:chatId/members  -> list members
router.get("/:chatId/members", auth, async (req, res) => {
  try {
    const chatId = Number(req.params.chatId);
    if (!(await isMember(chatId, req.user.id))) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const members = await membersOfChat(chatId);
    res.json(members);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to list members" });
  }
});

// POST /api/chats/dm/:otherUserId -> get or create a 1:1 chat
router.post("/dm/:otherUserId", auth, async (req, res) => {
  try {
    const me = req.user.id;
    const other = Number(req.params.otherUserId);
    if (!other) return res.status(400).json({ message: "Invalid user id" });
    if (me === other) return res.status(400).json({ message: "Cannot DM yourself" });

    const existing = await pool.query(
      `
      SELECT c.id
        FROM chats c
        JOIN chat_members cm ON cm.chat_id = c.id
       WHERE c.is_group = FALSE
       GROUP BY c.id
       HAVING COUNT(DISTINCT cm.user_id) = 2
          AND SUM(CASE WHEN cm.user_id = $1 THEN 1 ELSE 0 END) > 0
          AND SUM(CASE WHEN cm.user_id = $2 THEN 1 ELSE 0 END) > 0
       LIMIT 1
      `,
      [me, other]
    );

    if (existing.rowCount > 0) {
      const chat = await pool.query(
        "SELECT id, is_group, title, created_at, created_by FROM chats WHERE id=$1",
        [existing.rows[0].id]
      );
      return res.json(chat.rows[0]);
    }

    const chat = await createChat({ isGroup: false, title: null, memberIds: [other], createdBy: me });
    res.status(201).json(chat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create DM" });
  }
});

export default router;
