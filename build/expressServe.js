/**
 * @Author: Sun Rising
 * @Date: 2019-07-17 14:00:15
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-17 14:01:30
 * @Description: 打包项目预览
 */
const express = require("express");
const app = express();

const port = 8081;

let history = require("connect-history-api-fallback");

//重定向到index.html
history({
  rewrites: [
    {
      from: /^\/libs\/.*$/,
      to: "/index.html"
    }
  ]
});

app.use(history());

app.use(express.static("./dist/web"));

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
