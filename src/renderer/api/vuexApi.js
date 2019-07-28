/**
 * @Author: Sun Rising
 * @Date: 2018-12-17 16:10:36
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-05 05:34:05
 * @Description: Vuex对外接口
 */
import ajax from "@/lib/ajax";
import XEUtils from "xe-utils";

export default {
  //用户登录
  login(data) {
    return ajax.post("/account/anon/login", data);
  },
  //用户注销
  logout() {
    return ajax.get("/account/logout");
  },
  //保存用户信息
  saveUserInfo(data) {
    return ajax.post("/account/saveUserInfo", data);
  },
  //修改密码
  changePwd(data) {
    return ajax.post("/account/changePwd", data);
  },
  //是否已经登录
  isLogged() {
    return ajax.get("/account/anon/isLogged");
  },
  //加载系统信息
  initSystem() {
    return ajax.get("/account/initSystem");
  },
  //获取验证码
  getCaptcha() {
    return XEUtils.getProxyUrl(
      "/account/anon/getKaptchaImage?t=" + new Date().getTime()
    );
  }
};
