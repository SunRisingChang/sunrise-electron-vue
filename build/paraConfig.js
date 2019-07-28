"use strict";
// Template version: 1.3.1

const path = require("path");

module.exports = {
  dev: {
    assetsSubDirectory: "public", //资源路径，用于JS和CSS访问
    assetsPublicPath: "/", //URL访问资源HTML等
    proxyTable: {
      "/api": {
        target: "http://localhost:9999/",
        changeOrigin: true, //是否跨域
        ws: true, // 代理长连接
        pathRewrite: {
          "^/api": "/"
        } //重写接口
      },
      "/socket": {
        target: "ws://localhost:9999/",
        ws: true
      }
    }, //服务器代理表
    host: "localhost", // 可以被process.env.HOST覆盖
    port: 9080, // 可以被process.env.PORT覆盖，如果端口正在使用，则会确定一个空闲的
    autoOpenBrowser: true,
    errorOverlay: true, //在浏览器上显示错误
    notifyOnErrors: true, //使用notify通知错误
    poll: false,
    useEslint: true, // 使用 Eslint Loader?,linting错误和警告将显示在控制台中
    // 如果为true，eslint错误和警告也会显示在浏览器上
    showEslintErrorsInOverlay: false,
    devtool: "cheap-module-eval-source-map", //Source Maps
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, "../dist/web/index.html"), // 模板输出路径
    assetsRoot: path.resolve(__dirname, "../dist/web"), //输出路径
    assetsSubDirectory: "public",
    assetsPublicPath: "/electron-vue-sunrise/",
    productionSourceMap: true,
    devtool: "#source-map",
    //默认Gzip为许多流行的静态主机，如
    //Surge或Netlify已经为您提供所有静态资产的gzip。
    //在设置为“true”之前，请确保：
    //npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    //用一个额外的参数运行build命令
    //构建完成后查看包分析器报告：
    //`npm run build --report`
    //设置为“true”或“false”以始终打开或关闭它
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
