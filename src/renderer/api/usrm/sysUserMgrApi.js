/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-29 17:34:28
 * @Description: 系统用户管理对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //查询用户
  querySysUser(params) {
    return ajax.get("/usrm/userMgr/querySysUser", { params: params });
  },
  //删除用户
  delSysUser(params) {
    return ajax.delete("/usrm/userMgr/delSysUser/" + params);
  },
  //保存用户
  saveSysUser(data) {
    return ajax.post("/usrm/userMgr/saveSysUser", data);
  },
  //用户锁定
  userLock(params) {
    return ajax.put("/usrm/userMgr/userLock/" + params);
  },
  //用户解锁
  userUnlock(params) {
    return ajax.put("/usrm/userMgr/userUnlock/" + params);
  },
  //用户注销
  userDest(params) {
    return ajax.put("/usrm/userMgr/userDest/" + params);
  },
  //密码重置
  pwdRest(params) {
    return ajax.put("/usrm/userMgr/pwdRest/" + params);
  }
};
