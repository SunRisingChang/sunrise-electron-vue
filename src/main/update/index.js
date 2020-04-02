/**
 * @Author: Sun Rising
 * @Date: 2020-04-02 11:10:38
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-02 17:43:46
 * @Description: 系统更新
 */
import { app } from "electron";
import GistClient from "gist-client";
import XEUtils from "../utils";

const gistClient = new GistClient()
const Token = 'aa6539435866889be1fc4f320e95655b8efdbbd5'
const GistId = '0865c9b7d8b80e2e234369192d18aeb4'

/**
 * 检查更新
 */
async function checkUpdate() {
	try {
		gistClient.setToken(Token)
		let resp = await gistClient.getOneById(GistId + '?r=' + Math.random())
		let versionInfo = JSON.parse(resp.files.version.content)
		// 解析版本清单
		if (Array.isArray(versionInfo.versions) && versionInfo.versions.length > 0) {
			let nowVersion = app.getVersion();
			let lastVersion = versionInfo.versions[versionInfo.versions.length - 1].version
			if (XEUtils.diffVersion(nowVersion, lastVersion)) {
				update(versionInfo)
			}
		}
	} catch (error) {
		console.log(`检查更新失败!${error}`);
	} finally {
		// 检查等待图标停止
	}
}

/**
 * 开始更新
 * @param {*} versionInfo 版本信息
 */
async function update(versionInfo) {
	console.log(versionInfo);
}

export default {
	checkUpdate
};