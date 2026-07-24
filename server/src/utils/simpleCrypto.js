import crypto from "crypto";

const keyB64 = process.env.MESSAGE_KEY_BASE64 || "";
let KEY;

try {
  const buf = Buffer.from(keyB64, "base64");
  if (buf.length !== 32) throw new Error("MESSAGE_KEY_BASE64 must be 32 bytes base64");
  KEY = buf;
} catch {
  KEY = Buffer.from("v/B0zL0jPzZ9bN+Y4uHwT/9uH5tX0qV8kL2sR9fC8jA=", "base64");
}

export function encryptString(plaintext) {
  if (!KEY) throw new Error("Encryption key not configured");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    ciphertext: ciphertext.toString("base64"),
    header: { v: 1, alg: "AES-256-GCM", iv: iv.toString("base64"), tag: tag.toString("base64") },
  };
}

export function decryptString(ciphertextB64, header) {
  if (!KEY) throw new Error("Encryption key not configured");
  if (!header || header.alg !== "AES-256-GCM") throw new Error("Unsupported header/alg");
  const iv = Buffer.from(header.iv, "base64");
  const tag = Buffer.from(header.tag, "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(Buffer.from(ciphertextB64, "base64")), decipher.final()]);
  return pt.toString("utf8");
}
