/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-02 17:43:21
 * @Description: 系统字典管理对外接口
 */
import ajax from "@/lib/ajax";

export default {
  //查询字典组
  querySysDictGroup(params) {
    return ajax.get("/sysm/dictMgr/querySysDictGroup", { params: params });
  },
  //保存字典组
  saveSysDictGroup(data) {
    return ajax.post("/sysm/dictMgr/saveSysDictGroup", data);
  },
  //删除字典组
  delSysDictGroup(params) {
    return ajax.delete("/sysm/dictMgr/delSysDictGroup/" + params);
  },
  //查询字典select值
  querySysDictSelectItem(params) {
    return ajax.get("/sysm/dictMgr/getSysDictSelectItem", {
      params: params
    });
  },
  //查询字典tree值
  querySysDictTreeItem(params) {
    return ajax.get("/sysm/dictMgr/getSysDictTreeItem", { params: params });
  },
  //保存字典值
  saveSysDictItem(data) {
    return ajax.post("/sysm/dictMgr/saveSysDictItem", data);
  },
  //删除字典值
  delSysDictItem(params) {
    return ajax.delete("/sysm/dictMgr/delSysDictItem/" + params);
  },
  //获取字典值，通过字典组groupKey
  getSysDictItemByGroupKey(params) {
    return ajax.get("/sysm/dictMgr/getSysDictItemByGroupKey", {
      params: params
    });
  }
};
