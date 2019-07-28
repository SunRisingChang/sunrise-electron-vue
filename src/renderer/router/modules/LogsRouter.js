/**
 * @Author: Sun Rising
 * @Date: 2018-12-10 17:45:34
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 13:16:18
 * @Description:系统日志
 *
 * 注意:各个路由是独立的懒加载时要保持路由拥有自己的组件
 * 实例而非共享实例，故父级路由component要写成() => import("@/views/home")）
 * meta: { noKeepAlive: true}禁止缓存,不写则默认进行缓存
 */
export default [
  {
    path: "/logs",
    icon: "el-icon-s-order",
    name: "LogsMgr",
    component: () => import("@/views/Home"),
    children: [
      // 交互日志
      {
        path: "operLog",
        icon: "el-icon-connection",
        component: () => import("@/views/module/logs/OperLog.vue"),
        name: "OperLog"
      },
      // quartz日志
      {
        path: "quartzLog",
        icon: "el-icon-watch",
        component: () => import("@/views/module/logs/QuartzLog.vue"),
        name: "QuartzLog"
      }
    ]
  }
];
