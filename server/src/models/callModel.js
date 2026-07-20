import { pool } from "../db.js";

export async function startCallLog({ roomId, callType = "video", createdBy = null }) {
  const r = await pool.query(
    `INSERT INTO call_logs (room_id, call_type, created_by)
     VALUES ($1, $2, $3)
     RETURNING id, room_id, call_type, started_at`,
    [String(roomId), callType, createdBy]
  );
  return r.rows[0];
}

export async function endCallLog(id) {
  const r = await pool.query(
    `UPDATE call_logs
        SET ended_at = NOW(),
            duration_sec = EXTRACT(EPOCH FROM (NOW() - started_at))::INT
      WHERE id = $1
      RETURNING id, duration_sec`,
    [id]
  );
  return r.rows[0];
}
