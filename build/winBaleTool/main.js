const child_process = require("child_process");
const TemplateType = process.env.Template;

var workerProcess;
console.log(" Build Package ... ");

if (TemplateType === "t1")
  workerProcess = child_process.execFile("build-template1.bat", {
    cwd: __dirname
  });
else if (TemplateType === "t2")
  workerProcess = child_process.execFile("build-template2.bat", {
    cwd: __dirname
  });
else console.log(" 找不到指定的模板 ");

if (workerProcess) {
  workerProcess.stdout.on("data", function(data) {
    console.log(data);
  });
}
