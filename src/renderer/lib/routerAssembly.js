/**
 * @Author: Sun Rising
 * @Date: 2018-12-10 18:13:53
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-10-08 23:59:22
 * @Description: 提供额外对路由的操作方法
 */
import lazyRouters from "@/router/lazy";
import config from "@/resources/appConfig";
import XEUtils from "xe-utils";

/**
 * 处理的后台路由结构
 * [{
 *  path:'',
 *  children:[{path:''},...]
 * }]
 */
export class RouterAssembly {
  /**
   * 添加一个路由页面
   *
   */
  addRouter(routerObj, name, path, component) {
    //添加前缀
    path = config.interRoutePrefix + path;
    //准备路由
    let router = {
      path: path,
      component: () => import("@/views/Home"),
      children: [
        {
          path: "/",
          name: name,
          component: component
        }
      ]
    };
    //添加路由
    routerObj.addRoutes([router]);
    routerObj.options.routes.push(router);
    //跳转
    routerObj.push({ path: path });
  }

  /**
   * 添加所有的路由
   */
  addRouterAll(routerObj, routers) {
    let lazyRouters = this.getLazyRouters();
    //如果是开发者模式加载全部菜单
    if (config.isDebug) {
      //添加额外的菜单
      lazyRouters.push({
        path: "*",
        redirect: "/",
        hide: true
      });
      //向路由对象中添加路由信息
      lazyRouters.forEach(item => {
        routerObj.options.routes.push(item);
        routers.push(item);
      });
      //动态添加路由
      routerObj.addRoutes(lazyRouters);
      return;
    }
    //组合菜单信息
    XEUtils.eachTree(routers, item => {
      let currItem = XEUtils.findTree(lazyRouters, item2 => {
        return item2.path === item.menuKey;
      });
      let _item = Object.assign({}, currItem.item);
      delete _item.children;
      Object.assign(item, _item, {
        icon: item.menuIcon,
        hide: item.menuVisible === "0"
      });
    });
    //添加额外的菜单
    routers.push({
      path: "*",
      redirect: "/",
      hide: true
    });
    //向路由对象中添加路由信息
    routers.forEach(item => {
      routerObj.options.routes.push(item);
    });
    //动态添加路由
    routerObj.addRoutes(routers);
  }

  /**
   * 获取全部的懒加载路由
   */
  getLazyRouters() {
    return Object.assign([], lazyRouters);
  }
}
