import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits
const KEY_LENGTH = 32; // 256 bits

// 🔐 Must be stored securely, like in env vars or Vault
const ENCRYPTION_SECRET =
  process.env.ENCRYPTION_SECRET?.length === KEY_LENGTH
    ? process.env.ENCRYPTION_SECRET
    : "replace-this-secret-32bytes!!!!!";

const key = Buffer.from(ENCRYPTION_SECRET);

// Encrypt a string
export const encrypt = (plainText: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  // Combine iv + encrypted data + authTag and encode
  const result = Buffer.concat([iv, authTag, encrypted]).toString("base64");
  return result;
};

// Decrypt a string
export const decrypt = (encryptedValue: string): string => {
  const bData = Buffer.from(encryptedValue, "base64");

  const iv = bData.slice(0, IV_LENGTH);
  const authTag = bData.slice(IV_LENGTH, IV_LENGTH + 16);
  const encryptedText = bData.slice(IV_LENGTH + 16);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};
