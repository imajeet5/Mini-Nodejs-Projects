const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const path = require("path");

const AppendInitVect = require("./appendInitVec");

const getCipherKey = require("./getCipherKey");

function encryptFile({ file, password }) {
  // Generate a secure, pseudo random initialization vector.
  const initVect = crypto.randomBytes(16);

  // Generate a cipher key from the password.
  const CIPHER_KEY = getCipherKey(password);
  const readStream = fs.createReadStream(file);
  const gzip = zlib.createGzip();
  const cipher = crypto.createCipheriv("aes256", CIPHER_KEY, initVect);

  // we will append only once at  the start of the file
  const appendInitVect = new AppendInitVect(initVect);
  // Create a write stream with a different file extension.
  const writeStream = fs.createWriteStream(path.join(file + ".enc"));

  readStream.pipe(gzip).pipe(cipher).pipe(appendInitVect).pipe(writeStream);
}


 module.exports =  encryptFile;

/**
 * Note about hash function
 *
 *
 * It is one-way, meaning it’s very difficult, given a hash, to reverse it and figure out what went in.
 * It produces a fixed output length. For sha256, it will always produce a 32 byte buffer, which just happens to be the size we needed for our AES-256 cipher.
 * It’s deterministic. That is, the hash function will always produce the same hash for the same plaintext.
 */

