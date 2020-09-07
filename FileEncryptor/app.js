// import our two functions
const encryptFile = require("./encrypt");
const decrypt = require("./decrypt");
// pull the mode, file and password from the command arguments.
const [mode, file, password] = process.argv.slice(2);

if (!mode) {
  console.log("Please pass mode - encrypt or decrypt");
  process.exit(1);
}
if (!file) {
  console.log("Please pass file path");
  process.exit(1);
}

if (!password) {
  console.log("Please enter password");
  process.exit(1);
}

if (mode === "encrypt") {
  encryptFile({ file, password });
} else if (mode === "decrypt") {
  decrypt({ file, password });
} else {
  console.log("Please pass mode - encrypt or decrypt");
  process.exit(1);
}

process.on("uncaughtException", (err) => {
  console.log(err.message);
  process.exit(1);
});
