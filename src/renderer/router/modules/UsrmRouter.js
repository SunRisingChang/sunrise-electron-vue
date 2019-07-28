/**
 * @Author: Sun Rising
 * @Date: 2018-12-10 17:45:34
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 13:35:10
 * @Description:用户管理
 *
 * 注意:各个路由是独立的懒加载时要保持路由拥有自己的组件
 * 实例而非共享实例，故父级路由component要写成() => import("@/views/home")）
 * meta: { noKeepAlive: true}禁止缓存,不写则默认进行缓存
 */
export default [
  {
    path: "/usrm",
    icon: "el-icon-postcard",
    name: "AccMgr",
    component: () => import("@/views/Home"),
    children: [
      // 用户管理
      {
        path: "usermgr",
        icon: "el-icon-s-custom",
        component: () => import("@/views/module/usrm/UserMgr.vue"),
        name: "UserMgr"
      },
      // 角色管理
      {
        path: "rolemgr",
        icon: "el-icon-user",
        component: () => import("@/views/module/usrm/RoleMgr.vue"),
        name: "RoleMgr",
        meta: { noKeepAlive: true }
      },
      // 组织管理
      {
        path: "orgmgr",
        icon: "icon-fa fa-sitemap",
        component: () => import("@/views/module/usrm/OrgMgr.vue"),
        name: "OrgMgr",
        meta: { noKeepAlive: false }
      },
      // 权限管理
      {
        path: "permmgr",
        icon: "icon-fa fa-shield",
        component: () => import("@/views/module/usrm/PermMgr.vue"),
        name: "PermMgr"
      }
    ]
  }
];
