import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { autoUpdater } from 'electron-updater'
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
const path = require('path')
import "./menu";
import Update from "./update";

const isDevelopment = process.env.NODE_ENV !== "production";
let win;

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  win = new BrowserWindow({
    width: 1465,
    height: 920,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("ready", () => {
  createWindow();
  // Update.checkUpdate();
  // updateHandle()
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// 检测更新
function updateHandle() {
  console.log(1);

  let message = {
    error: { type: 1, info: '检查更新出错' },
    checking: { type: 2, info: '正在检查更新……' },
    updateAva: { type: 3, info: '检测到新版本，正在下载……' },
    updateNotAva: { type: 4, info: '现在使用的就是最新版本，不用更新' },
  };
  autoUpdater.updateConfigPath = 'app-update.yml'
  autoUpdater.on('error', function (error) {
    console.log(error);
    sendUpdateMessage(message.error)
  });
  autoUpdater.on('checking-for-update', function () {
    console.log("检测版本信息");
    sendUpdateMessage(message.checking)
  });
  autoUpdater.on('update-available', function (info) {
    console.log("检测到新版本，正在下载:****");
    console.log(info);
    sendUpdateMessage(message.updateAva)
  });
  autoUpdater.on('update-not-available', function () {
    console.log(3);
    sendUpdateMessage(message.updateNotAva)
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    console.log(4);
    win.webContents.send('downloadProgress', progressObj)
  });
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    console.log(event);
    console.log(releaseNotes);
    console.log(releaseName);
    console.log(releaseDate);
    console.log(updateUrl);
    console.log(quitAndUpdate);
    ipcMain.on('isUpdateNow', (e, arg) => {
      console.log(e);
      console.log(arg);
      console.log(arguments);
      console.log("开始更新");
      //some code here to handle event
      autoUpdater.quitAndInstall();
    });

    win.webContents.send('isUpdateNow')
  });

  // ipcMain.on("checkForUpdate", () => {
  //   console.log(5);
  //   //执行自动更新检查
  //   autoUpdater.checkForUpdates();
  // })
  autoUpdater.checkForUpdates();
};

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
  win.webContents.send('message', text)
}
