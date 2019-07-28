/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-02 21:47:45
 * @Description: 系统quartz定时任务管理对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //查询quartz
  querySysQuartz(params) {
    return ajax.get("/sysm/quartzMgr/querySysQuartz", { params: params });
  },
  //获取jobClass
  getJobClass() {
    return ajax.get("/sysm/quartzMgr/getJobClass");
  },
  //保存任务
  saveSysQuartz(data) {
    return ajax.post("/sysm/quartzMgr/saveSysQuartz", data);
  },
  //删除任务
  delSysQuartz(params) {
    return ajax.delete("/sysm/quartzMgr/delSysQuartz/" + params);
  },
  //批量运行任务
  resumeSysQuartz(params) {
    return ajax.put("/sysm/quartzMgr/resumeSysQuartz/" + params);
  },
  //批量停止任务
  pauseSysQuartz(params) {
    return ajax.put("/sysm/quartzMgr/pauseSysQuartz/" + params);
  },
  //获取任务Job详情
  getSysQuartzJobInfo(params) {
    return ajax.get("/sysm/quartzMgr/getSysQuartzJobInfo", {
      params: params
    });
  }
};
