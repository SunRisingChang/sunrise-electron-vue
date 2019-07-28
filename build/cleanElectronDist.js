const del = require("del");
const chalk = require("chalk");
const doneLog = chalk.bgGreen.white(" CLEAN DONE ") + " ";

function clean() {
  del.sync(["dist/electron/*"]);
  console.log(`${doneLog}`);
  process.exit();
}
clean();
