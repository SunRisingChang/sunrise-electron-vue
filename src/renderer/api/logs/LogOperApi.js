/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-03 13:00:53
 * @Description: 交互日志对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //查询日志
  queryLogOper(params) {
    return ajax.get("/logs/operMgr/queryLogOper", { params: params });
  }
};
