/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-02 17:43:21
 * @Description: quartz日志对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //查询日志
  queryLogQuartz(params) {
    return ajax.get("/logs/quartzMgr/queryLogQuartz", { params: params });
  }
};
