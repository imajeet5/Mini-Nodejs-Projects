var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "a" });
var log_stdout = process.stdout;

if (process.env.NODE_ENV === "production") {
  console.log = function (d) {
    //
    log_file.write(`${util.format(d)} -- ${Date.now()}` + "\n");
    log_stdout.write(util.format(d) + "\n");
  };
}

console.log("Hi there xdfdfsdfsd sdfsd ");

// NODE_ENV=production node app.js