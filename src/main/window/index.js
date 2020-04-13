/**
 * @Author: Sun Rising 
 * @Date: 2020-04-12 09:44:37 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-13 09:07:38
 * @Description: 主窗体 生命周期管理类
 */
import { BrowserWindow } from "electron";
/**
 * createProtocol 关联协议
 */
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

class Window {

	// 创建主窗口
	createWindow() {
		this.win = new BrowserWindow({
			width: 1465,
			height: 920,
			minWidth: 470,
			// 隐藏标题栏
			frame: false,
			//  设置界面特性
			webPreferences: {
				// 是否完整支持node
				nodeIntegration: true
			}
		});

		// 开发模式下使用http协议
		if (process.env.WEBPACK_DEV_SERVER_URL) {
			this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		} else {
			// 关联协议
			createProtocol("app");
			this.win.loadURL("app://./index.html");
		}

		// 窗口关闭时的回调
		this.win.on("closed", () => {
			this.win = null;
		});

		// 在窗口最大化的时候触发
		this.win.on("maximize", (event) => {
			event.sender.send('win-maximize')
		});

		// 在窗口退出最大化的时候触发
		this.win.on("unmaximize", (event) => {
			event.sender.send('win-unmaximize')
		});

	}

	// 检查且创建主窗口
	checkMainWindow() {
		if (!this.win) this.createWindow()
	}

	// 获取主窗体
	getMainWindow() {
		this.checkMainWindow()
		return this.win
	}

}

export default Window;