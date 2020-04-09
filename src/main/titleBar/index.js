import { ipcMain, BrowserWindow } from "electron";

// 关闭应用
ipcMain.on('win-quit', (event) => {
    BrowserWindow.getFocusedWindow().close()
})

// 最小化
ipcMain.on('win-minimize', (event) => {
    BrowserWindow.getFocusedWindow().minimize()
})

// 最大化
ipcMain.on('win-maximize', (event) => {
    BrowserWindow.getFocusedWindow().maximize()
})

// 恢复默认窗口大小
ipcMain.on('win-defaultsize', (event) => {
    BrowserWindow.getFocusedWindow().unmaximize()
})

// 重载
ipcMain.on('win-reload', (event) => {
    let focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        // 重载之后, 刷新并关闭所有之前打开的次要窗体
        if (focusedWindow.id === 1) {
            BrowserWindow.getAllWindows().forEach(win => {
                if (win.id > 1) win.close();
            });
        }
        focusedWindow.reload();
    }
})

// 切换调试工具
ipcMain.on('win-devtools', (event) => {
    BrowserWindow.getFocusedWindow().toggleDevTools()
})
