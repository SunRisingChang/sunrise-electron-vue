/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-06-30 12:05:50
 * @Description: 系统菜单管理对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //保存系统菜单
  saveSysMenu(data) {
    return ajax.post("/sysm/menuMgr/saveSysMenu", data);
  },
  //获取系统菜单
  getSysMenu() {
    return ajax.get("/sysm/menuMgr/getSysMenu");
  },
  //删除系统菜单
  delSysMenu(param) {
    return ajax.delete("/sysm/menuMgr/delSysMenu/" + param);
  }
};
