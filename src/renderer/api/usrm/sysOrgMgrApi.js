/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-06-27 09:15:12
 * @Description: 系统组织管理对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //保存系统组织
  saveSysOrg(data) {
    return ajax.post("/usrm/orgMgr/saveSysOrg", data);
  },
  //获取系统组织
  getSysOrg() {
    return ajax.get("/usrm/orgMgr/getSysOrg");
  },
  //删除系统组织
  delSysOrg(param) {
    return ajax.delete("/usrm/orgMgr/delSysOrg/" + param);
  },
  //获取可用的系统组织树
  getOrgTree() {
    return ajax.get("/usrm/orgMgr/getOrgTree");
  }
};
