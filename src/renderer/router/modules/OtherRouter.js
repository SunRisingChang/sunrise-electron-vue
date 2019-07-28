/**
 * @Author: Sun Rising
 * @Date: 2018-12-10 17:45:34
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 13:16:21
 * @Description:其它菜单
 *
 * 注意:各个路由是独立的懒加载时要保持路由拥有自己的组件
 * 实例而非共享实例，故父级路由component要写成() => import("@/views/home")）
 * meta: { noKeepAlive: true}禁止缓存,不写则默认进行缓存
 */
export default [
  {
    path: "/otherpage",
    icon: "el-icon-basketball",
    name: "OtherPage",
    component: () => import("@/views/Home"),
    children: [
      // 404
      {
        path: "page404",
        icon: "el-icon-lightning",
        component: () => import("@/views/module/other/Page404"),
        name: "Page404"
      },
      // 500
      {
        path: "page500",
        icon: "el-icon-heavy-rain",
        component: () => import("@/views/module/other/Page500"),
        name: "Page500"
      },
      {
        path: "baidu",
        icon: "el-icon-sunrise",
        httpurl: "https://www.baidu.com/",
        name: "Baidu"
      }
    ]
  }
];
