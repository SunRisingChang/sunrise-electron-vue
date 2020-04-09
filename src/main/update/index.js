/**
 * @Author: Sun Rising
 * @Date: 2020-04-02 11:10:38
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-09 13:39:19
 * @Description: 系统更新
 */
import { autoUpdater } from 'electron-updater'

const message = {
	checking: { type: 1, info: '正在检查更新' },
	updateAva: { type: 2, info: '检测到新版本，正在下载' },
	updateNotAva: { type: 3, info: '已是最新版本' },
	downloadProgress: { type: 4, info: '下载进度' },
	updateDownloaded: { type: 5, info: '下载完成' },
	error: { type: 6, info: '检查更新出错' },
};

// 更新的配置文件
autoUpdater.updateConfigPath = 'app-update.yml'

// 当开始检查更新的时候触发
autoUpdater.on('checking-for-update', function () {
	sendUpdateMessage(message.checking)
});

// 当发现一个可用更新的时候触发，更新包下载会自动开始
autoUpdater.on('update-available', function (info) {
	sendUpdateMessage(message.updateAva)
});

// 当没有可用更新的时候触发
autoUpdater.on('update-not-available', function () {
	sendUpdateMessage(message.updateNotAva)
});

// 更新下载进度事件
autoUpdater.on('download-progress', function (progressObj) {
	sendUpdateMessage(message.downloadProgress)
});

// 在更新下载完成的时候触发
autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
	sendUpdateMessage(message.updateDownloaded)
	// autoUpdater.quitAndInstall();
});

// 当更新发生错误的时候触发
autoUpdater.on('error', function (error) {
	sendUpdateMessage(message.error)
});

// 检测更新
function updateHandle() {
	autoUpdater.checkForUpdates();
};

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(message) {
	console.log(message);
}

export default {
	updateHandle
};