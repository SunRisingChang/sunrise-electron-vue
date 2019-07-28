/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-07 10:21:57
 * @Description: 前端日志对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //记录日志
  saveLogFront(data) {
    return ajax.post("/frontlog/anon/saveFrontLog", data);
  }
};
