/**
 * app Electron整个生命周期的监控
 * protocol 协议管理
 * BrowserWindow 窗口管理
 */
import { app, protocol, BrowserWindow } from "electron";
/**
 * createProtocol 关联协议
 */
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

import update from "./update";

// 是否是开发模式
const isDevelopment = process.env.NODE_ENV !== "production";
let win;

// 生产环境，作为安全的标准注册，绕过资源的内容安全策略，允许注册ServiceWorker并支持访存API。
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

// 创建主窗口
function createWindow() {
  win = new BrowserWindow({
    width: 1465,
    height: 920,
    //  设置界面特性
    webPreferences: {
      // 是否完整支持node
      nodeIntegration: true
    }
  });

  // 开发模式下使用http协议
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    // 关联协议
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  // 窗口关闭时的回调
  win.on("closed", () => {
    win = null;
  });
}

// OS X 当应用被激活时触发，常用于点击应用的 dock 图标的时候。
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// 当 Electron 完成初始化时被触发。
app.on("ready", () => {
  createWindow();
  update.updateHandle()
});

// 当所有的窗口都被关闭时触发。
app.on("window-all-closed", () => {
  // 排除darwin平台只是为了复制该OS行为：在Windows和Linux上，惯例是在用户关闭其窗口时终止（退出）该软件； 而在macOS上，约定是将进程保留在后台。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

if (isDevelopment) {
  if (process.platform === "win32") {
    // 如果使用 IPC 通道衍生 Node.js 进程，则只要子进程收到父进程使用 childprocess.send() 发送的消息，就会触发 'message' 事件。
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    // 信号事件，'SIGTERM' 在 Windows 中不支持
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
