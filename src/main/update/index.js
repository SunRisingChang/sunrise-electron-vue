/**
 * @Author: Sun Rising
 * @Date: 2020-04-02 11:10:38
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-13 09:31:09
 * @Description: 系统更新管理
 */
import { autoUpdater } from 'electron-updater'
import { ipcMain } from "electron";
import { app } from "electron";

class Updater {

	/**
	 * 
	 * @param {*} window 主窗体实例
	 */
	constructor(window) {
		this.message = {
			checking: { type: 1, info: '正在检查更新' },
			updateAva: { type: 2, info: '检测到新版本' },
			updateNotAva: { type: 3, info: '已是最新版本' },
			downloadProgress: { type: 4, info: '下载进度' },
			updateDownloaded: { type: 5, info: '下载完成' },
			error: { type: 6, info: '检查更新出错' },
		};
		// 更新的配置文件
		autoUpdater.updateConfigPath = 'app-update.yml'
		// 禁止自动下载
		autoUpdater.autoDownload = false;
		// 获取主窗体实例
		this.mainWindow = window.getMainWindow()
		this.initOn();
		this.initListener()
	}

	// 初始化事件绑定
	initOn() {
		// 当开始检查更新的时候触发
		autoUpdater.on('checking-for-update', () => {
			this.sendUpdateMessage(this.message.checking)
		});

		// 当发现一个可用更新的时候触发
		autoUpdater.on('update-available', (info) => {
			this.mainWindow.webContents.send('renderer-update-available', info)
			this.sendUpdateMessage(this.message.updateAva)
		});

		// 当没有可用更新的时候触发
		autoUpdater.on('update-not-available', () => {
			this.sendUpdateMessage(this.message.updateNotAva)
		});

		// 更新下载进度事件
		autoUpdater.on('download-progress', (progress) => {
			this.mainWindow.webContents.send('renderer-update-progress', progress)
			this.sendUpdateMessage(this.message.downloadProgress)
		});

		// 在更新下载完成的时候触发
		autoUpdater.on('update-downloaded', (info) => {
			this.sendUpdateMessage(this.message.updateDownloaded)
		});

		// 当更新发生错误的时候触发
		autoUpdater.on('error', (error) => {
			this.mainWindow.webContents.send('renderer-update-error', error)
			this.sendUpdateMessage(this.message.error)
		});

	}

	// 通过main进程发送事件给renderer进程，提示更新信息
	sendUpdateMessage(message) {
		console.log(message);
	}

	// 初始化监听
	initListener() {
		// 检测更新
		ipcMain.on('main-check-update', (event) => {
			autoUpdater.checkForUpdates();
			event.returnValue = {
				name: app.getName(),
				version: app.getVersion()
			}
		})

		// 立即下载更新
		ipcMain.on('main-new-download', async (event) => {
			// 手动下载
			await autoUpdater.downloadUpdate()
			event.sender.send('renderer-package-downloaded');
		})

		// 退出且安装
		ipcMain.on('main-quit-install', () => {
			autoUpdater.quitAndInstall();
		})
	}

}

export default Updater;
