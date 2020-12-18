/**
 * @Author: Sun Rising 
 * @Date: 2020-04-12 09:44:37 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-12-18 16:50:26
 * @Description: 主窗体 生命周期管理类
 */
import { BrowserWindow, Tray, Menu } from "electron";
/**
 * createProtocol 关联协议
 */
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

// 应用图标
const iconImgUrl = `${__static}/electron-icon/icon.ico`;
class Window {

	// 创建主窗口
	createWindow() {
		this.win = new BrowserWindow({
			width: 1465,
			height: 920,
			minWidth: 470,
			// 隐藏标题栏
			frame: false,
			// 窗口图标
			icon: iconImgUrl,
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

		// 托盘图标
		this.tray = new Tray(iconImgUrl);
		const contextMenu = Menu.buildFromTemplate([
			{ label: '退出', click: () => { this.win.destroy() } },//我们需要在这里有一个真正的退出（这里直接强制退出）
		])
		this.tray.setContextMenu(contextMenu)
		// 我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
		this.tray.on('click', () => {
			this.win.isVisible() ? this.win.hide() : this.win.show()
		})

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