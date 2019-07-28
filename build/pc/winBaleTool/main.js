const cmd = require("child_process");
const tem = process.env.Template;

console.log("开始封装打包.....");
if (tem === "t1")
  cmd.execFile("build-template1.bat", { cwd: __dirname }, errorMessage);
else if (tem === "t2")
  cmd.execFile("build-template2.bat", { cwd: __dirname }, errorMessage);
else console.log("找不到指定的模板.....");

function errorMessage(error, stdout, stderr) {
  if (error !== null) {
    console.log("exec error: " + error);
  } else
    console.log("封装完成！请在[" + __dirname + "/FilesToInstall]中查看！");
}
