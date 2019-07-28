/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-09 13:03:01
 * @Description: 附件管理对外接口
 */
import ajax from "@/lib/ajax";
import XEUtils from "xe-utils";

export default {
  //查询文件
  querySysFile(params) {
    return ajax.get("/sysm/fileMgr/querySysFile", { params: params });
  },
  //删除任务
  delSysFile(params) {
    return ajax.delete("/sysm/fileMgr/delSysFile/" + params);
  },
  //批量修改文件状态
  changeSysFileStat(uuids, stat) {
    return ajax.put("/sysm/fileMgr/changeSysFileStat/" + uuids + "/" + stat);
  },
  //获取文件上传路径
  getSaveSysFileUrl() {
    return XEUtils.getProxyUrl("/sysm/fileMgr/saveSysFile");
  }
};
