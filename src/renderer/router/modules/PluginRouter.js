/**
 * @Author: Sun Rising
 * @Date: 2018-12-10 17:45:34
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-23 11:13:47
 * @Description:插件管理
 *
 * 注意:各个路由是独立的懒加载时要保持路由拥有自己的组件
 * 实例而非共享实例，故父级路由component要写成() => import("@/views/home")）
 * meta: { noKeepAlive: true}禁止缓存,不写则默认进行缓存
 */
export default [
  {
    path: "/plugin",
    icon: "el-icon-water-cup",
    name: "Plugin",
    component: () => import("@/views/Home"),
    children: [
      // cron表达式生成器
      {
        path: "crontab",
        icon: "el-icon-coffee-cup",
        component: () => import("@/views/module/plugin/cronTabPage"),
        name: "CronTabPage"
      },
      // 数据分页表格组件
      {
        path: "datatable",
        icon: "el-icon-cold-drink",
        component: () => import("@/views/module/plugin/dataTablePage"),
        name: "DataTablePage"
      },
      //图标库
      {
        path: "iconfont",
        icon: "el-icon-goblet",
        component: () => import("@/views/module/plugin/iconfontPage"),
        name: "IconFontPage"
      },
      //Markdown
      {
        path: "markdown",
        icon: "el-icon-refrigerator",
        component: () => import("@/views/module/plugin/markdownPage"),
        name: "MarkdownPage"
      },
      //单路由多开
      {
        path: "singlePageOpen/:params",
        icon: "el-icon-coffee",
        component: () => import("@/views/module/plugin/singlePageOpen.vue"),
        name: "SinglePageOpen"
      },
      //JSON编辑器
      {
        path: "jsonEditPage",
        icon: "el-icon-lollipop",
        component: () => import("@/views/module/plugin/jsonEditPage.vue"),
        name: "JsonEditPage"
      },
      //数字滚动
      {
        path: "countToPage",
        icon: "el-icon-place",
        component: () => import("@/views/module/plugin/countToPage.vue"),
        name: "CountToPage"
      },
      //可记忆的select输入框
      {
        path: "autocompleteInputPage",
        icon: "el-icon-coin",
        component: () => import("@/views/module/plugin/autocompleteInputPage.vue"),
        name: "AutocompleteInputPage"
      },
      // 模板表单
      {
        path: "tplFormCreatePage",
        icon: "el-icon-tickets",
        component: () => import("@/views/module/plugin/tplFormCreatePage.vue"),
        name: "TplFormCreatePage"
      },
      //路由嵌套
      {
        path: "router1",
        icon: "el-icon-trophy",
        name: "RouterPage1",
        component: () => import("@/views/module/other/RouteContainer"),
        children: [
          {
            path: "router11",
            icon: "el-icon-trophy-1",
            component: () =>
              import("@/views/module/plugin/routerPage/routerPage"),
            name: "RouterPage11"
          },
          {
            path: "router12",
            icon: "el-icon-first-aid-kit",
            name: "RouterPage12",
            component: () => import("@/views/module/other/RouteContainer"),
            children: [
              {
                path: "router121",
                icon: "el-icon-discover",
                component: () =>
                  import("@/views/module/plugin/routerPage/routerPage"),
                name: "RouterPage121"
              },
              {
                path: "router122",
                icon: "el-icon-medal",
                component: () =>
                  import("@/views/module/plugin/routerPage/routerPage2"),
                name: "RouterPage122"
              }
            ]
          }
        ]
      }
    ]
  }
];
