import { pool } from "../db.js";

export async function createMessage({ chatId, senderId, ciphertext, headerJson }) {
  const r = await pool.query(
    `INSERT INTO messages (chat_id, sender_id, ciphertext, header_json)
     VALUES ($1,$2,$3,$4)
     RETURNING id, chat_id, sender_id, created_at`,
    [chatId, senderId, ciphertext, headerJson]
  );
  return r.rows[0];
}

export async function listMessages({ chatId, afterId, limit = 50 }) {
  if (afterId) {
    return pool.query(
      `SELECT id, chat_id, sender_id, ciphertext, header_json, created_at
         FROM messages
        WHERE chat_id = $1 AND id > $2
        ORDER BY id ASC
        LIMIT $3`,
      [chatId, afterId, limit]
    );
  }
  // last N ascending
  return pool.query(
    `SELECT * FROM (
       SELECT id, chat_id, sender_id, ciphertext, header_json, created_at
         FROM messages
        WHERE chat_id = $1
        ORDER BY id DESC
        LIMIT $2
     ) t
     ORDER BY id ASC`,
    [chatId, limit]
  );
}
