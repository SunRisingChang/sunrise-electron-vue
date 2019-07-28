/**
 * 通知服务，用于后端主动推送通知，前端被动响应通知，通知以json的格式进行传递，如果不符合接收规范则丢弃。
 */
import { dictMsg } from "./SocketMsgAnalysis";

export class SocketService {
  constructor(url) {
    let websocket = new WebSocket(url);
    websocket.onopen = e => {
      console.log("长连接打开成功!");
    };
    websocket.onmessage = e => {
      //按照类型进行分类传入不同的方法进行解析入vuex
      let message = JSON.parse(e.data);
      if (message.type == "101") dictMsg(message);
    };
    websocket.onerror = e => {};
    websocket.onclose = e => {};
  }
}
