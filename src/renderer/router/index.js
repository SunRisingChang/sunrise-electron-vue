/**
 * @Author: Sun Rising
 * @Date: 2018-12-24 12:01:37
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-29 08:27:00
 * @Description: vue-RouTer 配置
 */
import Vue from "vue";
import Router from "vue-router";
import store from "@/vuex";
import BaseRouter from "@/router/modules/BaseRouter";
import dataStorage from "@/lib/dataStorage";
import { getRouterUniqueKey } from "@/lib/util";

Vue.use(Router);

let routerObj = new Router({
  // mode: "history",
  routes: [].concat(BaseRouter)
});

//不进行缓存的页面
let excludePages = ["Login", "Lock"];

//加入页面缓存
let keepPage = function (to) {
  //在排除名单外且在路由表中
  if (excludePages.indexOf(to.name) === -1 && to.matched.length !== 0) {
    if (!store.getters.sysConfig.singlePage) {
      let name = to.params.alias ? to.params.alias : to.name;
      let noKeepAlive = to.meta.noKeepAlive ? to.meta.noKeepAlive : false;
      let routerObj = {
        name: name,
        path: to.path,
        alias: to.query.alias
      };
      store.dispatch("base/addTabPages", {
        name: routerObj.name,
        path: routerObj.path,
        alias: routerObj.alias,
        keepAlive: !noKeepAlive,
        key: getRouterUniqueKey(routerObj)
      });
    }
  }
};

//页面跳转之前拦截
routerObj.beforeEach(async (to, from, next) => {
  //登陆信息验证
  //如果没有匹配到路由，则尝试重新加载路由信息
  if (to.matched.length === 0) {
    store.dispatch("base/initSystem");
    //刷新时清理tab页数据，关闭手动添加的tab页
    store.dispatch("base/checkTabsData");
  }

  if (to.path === '/lock' || to.path === "/login") {
    next();
    return;
  }

  if (!(await dataStorage.getSessionStorage().getItem("user"))) {
    next({ path: "/login" });
    return;
  } else {
    keepPage(to);
  }
  next();
});

export default routerObj;
