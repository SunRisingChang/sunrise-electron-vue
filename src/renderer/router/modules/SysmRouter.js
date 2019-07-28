/**
 * @Author: Sun Rising
 * @Date: 2018-12-10 17:45:34
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-15 15:30:57
 * @Description:系统管理
 *
 * 注意:各个路由是独立的懒加载时要保持路由拥有自己的组件
 * 实例而非共享实例，故父级路由component要写成() => import("@/views/home")）
 * meta: { noKeepAlive: true}禁止缓存,不写则默认进行缓存
 */
export default [
  {
    path: "/sysm",
    icon: "el-icon-set-up",
    name: "SysMgr",
    component: () => import("@/views/Home.vue"),
    children: [
      // 菜单管理
      {
        path: "menuMgr",
        icon: "icon-fa fa-bars",
        component: () => import("@/views/module/sysm/MenuMgr.vue"),
        name: "MenuMgr"
      },
      // 字典管理
      {
        path: "dictMgr",
        icon: "icon-fa fa-book",
        component: () => import("@/views/module/sysm/DictMgr.vue"),
        name: "DictMgr"
      },
      // 文件管理
      {
        path: "fileMgr",
        icon: "icon-fa fa-file-o",
        component: () => import("@/views/module/sysm/FileMgr.vue"),
        name: "FileMgr"
      },
      // 任务管理
      {
        path: "quartzmgr",
        icon: "el-icon-alarm-clock",
        component: () => import("@/views/module/sysm/QuartzMgr.vue"),
        name: "QuartzMgr"
      }
    ]
  }
];
