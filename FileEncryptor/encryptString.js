// Nodejs encryption with CTR
const crypto = require("crypto");

const getCipherKey = require("./getCipherKey");

function encrypt(text, password) {
  const iv = crypto.randomBytes(16);
  const CIPHER_KEY = getCipherKey(password);
  let cipher = crypto.createCipheriv("aes-256-cbc", CIPHER_KEY, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + encrypted.toString("hex");
}

function decrypt(text, password) {
  const CIPHER_KEY = getCipherKey(password);
  const ivString = text.substring(0, 32);
  const encryptedData = text.substring(32, text.length);
  const iv = Buffer.from(ivString, "hex");
  const encryptedText = Buffer.from(encryptedData, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", CIPHER_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

var hw = encrypt("Some serious stuff ", "abc123");
console.log(hw);
console.log(decrypt(hw, "abc123"));
