/**
 * @Author: Sun Rising 
 * @Date: 2020-04-12 10:51:10 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-12 12:38:34
 * @Description: 标题栏管理
 */
import { ipcMain, BrowserWindow } from "electron";

class TitleBar {

	constructor() {
		this.initOn()
	}

	// 初始化事件绑定
	initOn() {
		// 关闭应用
		ipcMain.on('win-quit', (event) => {
			BrowserWindow.fromWebContents(event.sender).close()
		})

		// 最小化
		ipcMain.on('win-minimize', (event) => {
			BrowserWindow.fromWebContents(event.sender).minimize()
		})

		// 最大化
		ipcMain.on('win-maximize', (event) => {
			BrowserWindow.fromWebContents(event.sender).maximize()
		})

		// 恢复默认窗口大小
		ipcMain.on('win-defaultsize', (event) => {
			BrowserWindow.fromWebContents(event.sender).unmaximize()
		})

		// 重载
		ipcMain.on('win-reload', (event) => {
			let focusedWindow = BrowserWindow.fromWebContents(event.sender);
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
			BrowserWindow.fromWebContents(event.sender).toggleDevTools()
		})
	}

}

export default TitleBar;
