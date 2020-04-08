/**
 * @Author: Sun Rising
 * @Date: 2020-04-02 11:10:38
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-02 19:22:09
 * @Description: 系统更新
 */
import { app } from "electron";
import GistClient from "gist-client";
import XEUtils from "../utils";

const gistClient = new GistClient()
const Token = 'f82c38976e62765dd0a65d33e0845cdc50cd8009'
const GistId = '0865c9b7d8b80e2e234369192d18aeb4'

/**
 * 检查更新
 */
async function checkUpdate() {
	try {
		let resp = await gistClient.setToken(Token).getOneById(GistId)
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