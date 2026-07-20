import { useSocketAuth } from "./socketAuth.js";
import { startCallLog, endCallLog } from "../models/callModel.js";

/**
 * Socket.IO namespace: /rtc
 * Events:
 *  - join { roomId, type? = 'video' | 'audio' }      // join room, notifies peers
 *  - signal:offer { roomId, sdp, target? }           // WebRTC offer
 *  - signal:answer { roomId, sdp, target? }          // WebRTC answer
 *  - signal:candidate { roomId, candidate, target? } // ICE candidate
 *  - leave { roomId }                                 // leave room
 *  - peer-joined { userId, socketId }
 *  - peer-left { userId, socketId }
 *  - peers { peers: socketId[] }                      // current peers in room
 *
 * New pre-call events for ringing / accept flow:
 *  - call:invite { toUserId, roomId, type }          // invite a user to a call (no RTC join yet)
 *  - call:incoming { fromUser:{id,name,email}, roomId, type } // emitted to callee
 *  - call:accept { roomId, fromUserId }              // callee accepted
 *  - call:accepted { roomId }                        // emitted to caller upon acceptance
 *  - call:reject { roomId, fromUserId, reason? }     // callee rejected
 *  - call:rejected { roomId, reason? }               // emitted to caller upon rejection
 */
export function attachRTC(io) {
  const nsp = io.of("/rtc");
  useSocketAuth(nsp);

  // Track room occupancy & call logs
  const rooms = new Map(); // roomId -> { sockets:Set<socketId>, logId:number|null, type:'video'|'audio' }
  // Track online sockets per user for targeted emits during invite/accept
  const userSockets = new Map(); // userId -> Set<socketId>

  nsp.on("connection", (socket) => {
    const user = socket.user;

    // --- track mappings ---
    if (user?.id) {
      const set = userSockets.get(user.id) || new Set();
      set.add(socket.id);
      userSockets.set(user.id, set);
    }

    socket.on("join", async ({ roomId, type = "video" } = {}) => {
      if (!roomId) return;

      socket.join(roomId);

      let room = rooms.get(roomId);
      if (!room) {
        // first joiner -> start call log
        let logId = null;
        try {
          const log = await startCallLog({ roomId, callType: type, createdBy: user.id });
          logId = log?.id || null;
        } catch {}
        room = { sockets: new Set(), logId, type };
        rooms.set(roomId, room);
      }
      room.sockets.add(socket.id);

      // notify others
      socket.to(roomId).emit("peer-joined", { userId: user.id, socketId: socket.id });
      // send current peers
      const peers = Array.from(room.sockets).filter((id) => id !== socket.id);
      socket.emit("peers", { peers });
    });

    // Signaling: broadcast to room or targeted socket
    socket.on("signal:offer", ({ roomId, sdp, target }) => {
      if (!roomId || !sdp) return;
      const payload = { from: socket.id, userId: user.id, sdp };
      target ? nsp.to(target).emit("signal:offer", payload) : socket.to(roomId).emit("signal:offer", payload);
    });

    socket.on("signal:answer", ({ roomId, sdp, target }) => {
      if (!roomId || !sdp) return;
      const payload = { from: socket.id, userId: user.id, sdp };
      target ? nsp.to(target).emit("signal:answer", payload) : socket.to(roomId).emit("signal:answer", payload);
    });

    socket.on("signal:candidate", ({ roomId, candidate, target }) => {
      if (!roomId || !candidate) return;
      const payload = { from: socket.id, userId: user.id, candidate };
      target ? nsp.to(target).emit("signal:candidate", payload) : socket.to(roomId).emit("signal:candidate", payload);
    });

    // --- Pre-call ringing flow ---
    socket.on("call:invite", ({ toUserId, roomId, type = "video" } = {}) => {
      if (!toUserId || !roomId) return;
      const targets = userSockets.get(toUserId);
      if (!targets || targets.size === 0) return; // callee offline -> optionally handle
      const fromUser = { id: user.id, name: user.name, email: user.email };
      for (const sid of targets) nsp.to(sid).emit("call:incoming", { fromUser, roomId, type });
    });

    socket.on("call:accept", ({ roomId, fromUserId } = {}) => {
      if (!roomId || !fromUserId) return;
      const targets = userSockets.get(fromUserId);
      if (!targets || targets.size === 0) return;
      for (const sid of targets) nsp.to(sid).emit("call:accepted", { roomId });
    });

    socket.on("call:reject", ({ roomId, fromUserId, reason } = {}) => {
      if (!roomId || !fromUserId) return;
      const targets = userSockets.get(fromUserId);
      if (!targets || targets.size === 0) return;
      for (const sid of targets) nsp.to(sid).emit("call:rejected", { roomId, reason });
    });

    socket.on("leave", async ({ roomId } = {}) => {
      if (!roomId) return;
      socket.leave(roomId);
      const room = rooms.get(roomId);
      if (room) {
        room.sockets.delete(socket.id);
        socket.to(roomId).emit("peer-left", { userId: user.id, socketId: socket.id });
        if (room.sockets.size === 0) {
          try { if (room.logId) await endCallLog(room.logId); } catch {}
          rooms.delete(roomId);
        }
      }
    });

    socket.on("disconnect", async () => {
      // remove from all rooms it was in
      for (const [roomId, room] of rooms.entries()) {
        if (room.sockets.delete(socket.id)) {
          socket.to(roomId).emit("peer-left", { userId: user.id, socketId: socket.id });
          if (room.sockets.size === 0) {
            try { if (room.logId) await endCallLog(room.logId); } catch {}
            rooms.delete(roomId);
          }
        }
      }
      // remove from userSockets map
      if (user?.id) {
        const set = userSockets.get(user.id);
        if (set) {
          set.delete(socket.id);
          if (set.size === 0) userSockets.delete(user.id);
          else userSockets.set(user.id, set);
        }
      }
    });
  });
}
