import jwt from "jsonwebtoken";
import cookie from "cookie";

export function useSocketAuth(io) {
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.token || socket.handshake.auth?.token;
      if (!token) return next(new Error("UNAUTHORIZED"));
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // attach user fields used by your REST /auth/me
      socket.user = { id: payload.sub, email: payload.email, role: payload.role, name: payload.name };
      next();
    } catch (e) {
      next(new Error("UNAUTHORIZED"));
    }
  });
}
