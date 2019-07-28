/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-02 17:39:48
 * @Description: 系统角色管理对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //保存系统角色
  saveSysRole(data) {
    return ajax.post("/usrm/roleMgr/saveSysRole", data);
  },
  //获取系统角色
  querySysRole(params) {
    return ajax.get("/usrm/roleMgr/querySysRole", { params: params });
  },
  //删除系统角色
  delSysRole(param) {
    return ajax.delete("/usrm/roleMgr/delSysRole/" + param);
  },
  //获取已选择的资源
  getSelectPerm(params) {
    return ajax.get("/usrm/roleMgr/getSelectPerm", { params: params });
  },
  //通过组织机构UUID获取角色
  getRoleByOrgUuid(params) {
    return ajax.get("/usrm/roleMgr/getRoleByOrgUuid", { params: params });
  }
};
