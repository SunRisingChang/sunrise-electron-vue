/**
 * @Author: Sun Rising 
 * @Date: 2020-04-12 12:32:21 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-13 09:50:29
 * @Description: 整个生命周期的监控
 */
/**
 * app Electron 整个生命周期的监控
 * protocol 协议管理
 */
import { app, shell, protocol } from "electron";
import Window from "./window";
import Update from "./update";
import TitleBar from "./titleBar";

class App {

  constructor() {
    this.window = new Window()
    // 生产环境，作为安全的标准注册，绕过资源的内容安全策略，允许注册ServiceWorker并支持访存API。
    protocol.registerSchemesAsPrivileged([
      { scheme: "app", privileges: { secure: true, standard: true } }
    ]);
    this.initOn()
  }

  // 初始化事件绑定
  initOn() {
    // OS X 当应用被激活时触发，常用于点击应用的 dock 图标的时候。
    app.on("activate", () => {
      this.init()
    });

    // 当 Electron 完成初始化时被触发。
    app.on("ready", () => {
      this.init()
    });

    // 当所有的窗口都被关闭时触发。
    app.on("window-all-closed", () => {
      // 排除darwin平台只是为了复制该OS行为：在Windows和Linux上，惯例是在用户关闭其窗口时终止（退出）该软件； 而在macOS上，约定是将进程保留在后台。
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    // 在创建新的 webContents 时触发
    app.on("web-contents-created", (_, webContents) => {
      // 创建新窗口之前触发,a标签弹出使用默认浏览器打开
      webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
      });
    });

    // 是否是开发模式
    const isDevelopment = process.env.NODE_ENV !== "production";

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
  }

  // 初始化渲染资源
  init() {
    this.window.checkMainWindow();
    // 更新管理
    new Update(this.window)
    // 标题栏管理
    new TitleBar()
  }

}

new App();
