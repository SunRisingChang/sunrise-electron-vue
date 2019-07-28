/**
 * @Author: Sun Rising
 * @Date: 2019-07-07 09:47:51
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 17:40:05
 * @Description: 错误日志服务
 */
import LogFrontApi from "@/api/logs/LogFrontApi";
import AppConfig from "@/resources/appConfig";

async function errorHandler(err, vm, info) {
  console.log(err, vm, info);
  if (AppConfig.frontLogEnable && !AppConfig.isDebug)
    await LogFrontApi.saveLogFront({
      timestamp: new Date().getTime(),
      path: vm.$route.path,
      info: info,
      error: err.stack
    });
}

export default {
  errorHandler
};
