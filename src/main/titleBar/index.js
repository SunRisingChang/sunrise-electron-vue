import { ipcMain } from "electron";

// 关闭应用
ipcMain.on('win-quit', (event, arg) => {
    console.log(event);
    // win.close()
})