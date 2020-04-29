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

//处理session过期
export function sessionMsg(message) {
  store.dispatch("base/lock");
  XEUtils.sayOpInfo(message.value, 4000)
}
