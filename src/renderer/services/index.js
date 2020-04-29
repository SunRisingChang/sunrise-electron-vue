/**
 * 服务启动文件，对服务进行统一的管理
 */
import { SocketService } from "./service/SocketService";
import { MockService } from "./service/MockService.js";
import config from "@/resources/appConfig";

//mockjs拦截
if (config.isDebug) new MockService();

export default {
  //登录之后手动启动服务
  run() {
    //长连接，服务器推送
    if (!config.isDebug) {
      let baseUrl =
        process.env.NODE_ENV === "development"
          ? location.host
          : config.prodProxyUrl.substring(7);
      new SocketService("ws://" + baseUrl + "/socket/systemMessage");
    }
  }
};
