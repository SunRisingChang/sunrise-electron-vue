/**
 * 通知服务，用于后端主动推送通知，前端被动响应通知，通知以json的格式进行传递，如果不符合接收规范则丢弃。
 */
import { dictMsg, sessionMsg } from "./SocketMsgAnalysis";

export class SocketService {

  static websocket;

  constructor(url) {
    SocketService.websocket = new WebSocket(url);
    SocketService.websocket.onopen = e => {
      console.log("websocket已连接!");
    };
    SocketService.websocket.onmessage = e => {
      //按照类型进行分类传入不同的方法进行解析入vuex
      let message = JSON.parse(e.data);
      if (message.type == "101") dictMsg(message);
      if (message.type == "102") sessionMsg(message);
    };
    SocketService.websocket.onerror = e => {
      console.log("websocket发生错误");
      console.log(new Date().getTime());
      console.log(e);
    };
    SocketService.websocket.onclose = e => {
      console.log("websocket已断开");
    };
  }
}
