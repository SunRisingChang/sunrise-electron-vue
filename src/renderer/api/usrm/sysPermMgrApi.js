/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-02 17:42:28
 * @Description: 系统权限管理对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //保存系统权限
  saveSysPerm(data) {
    return ajax.post("/usrm/permMgr/saveSysPerm", data);
  },
  //获取系统权限
  querySysPerm(params) {
    return ajax.get("/usrm/permMgr/querySysPerm", { params: params });
  },
  //删除系统权限
  delSysPerm(param) {
    return ajax.delete("/usrm/permMgr/delSysPerm/" + param);
  },
  //获取权限类别Map
  getPermMap() {
    return ajax.get("/usrm/permMgr/getPermMap");
  }
};
