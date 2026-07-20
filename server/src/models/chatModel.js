import { pool } from "../db.js";

export async function createChat({ isGroup, title, memberIds = [], createdBy }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const chat = await client.query(
      "INSERT INTO chats (is_group, title, created_by) VALUES ($1,$2,$3) RETURNING id, is_group, title, created_at, created_by",
      [!!isGroup, title || null, createdBy || null]
    );
    const chatId = chat.rows[0].id;

    // include creator as member
    const fullMembers = new Set(memberIds.map(Number));
    if (createdBy) fullMembers.add(Number(createdBy));

    if (fullMembers.size) {
      const values = [];
      let i = 1;
      const params = [];
      for (const uid of fullMembers) {
        params.push(`($${i++}, $${i++})`);
        values.push(chatId, uid);
      }
      await client.query(
        `INSERT INTO chat_members (chat_id, user_id) VALUES ${params.join(",")}`,
        values
      );
    }

    await client.query("COMMIT");
    return chat.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function listChatsForUser(userId) {
  const r = await pool.query(
    `SELECT c.id, c.is_group, c.title, c.created_by, c.created_at
       FROM chats c
       JOIN chat_members cm ON cm.chat_id = c.id
      WHERE cm.user_id = $1
      ORDER BY c.created_at DESC`,
    [userId]
  );
  return r.rows;
}

export async function isMember(chatId, userId) {
  const r = await pool.query(
    "SELECT 1 FROM chat_members WHERE chat_id=$1 AND user_id=$2 LIMIT 1",
    [chatId, userId]
  );
  return r.rowCount > 0;
}

export async function membersOfChat(chatId) {
  const r = await pool.query(
    `SELECT u.id, u.name, u.email, u.role
       FROM chat_members cm
       JOIN users u ON u.id = cm.user_id
      WHERE cm.chat_id = $1
      ORDER BY u.name NULLS LAST, u.email`,
    [chatId]
  );
  return r.rows;
}
