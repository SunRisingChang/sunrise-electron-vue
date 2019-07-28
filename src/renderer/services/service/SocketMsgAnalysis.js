/**
 * 对后端传来的 信息进行解析，由通知服务调用
 */
import XEUtils from "xe-utils";
import store from "@/vuex";

//处理字典
export function dictMsg(message) {
  XEUtils.delDict(message.value);
  store.commit("base/putNoticeMsg", message);
}
