export default {
  title: "后台管理系统",
  loading: "拼命加载中",
  route: {
    Home: "主页",
    Setting: "设置",
    UserInfo: "个人信息",
    NoticeMsg: "通知信息",
    //----------系统管理 开始----------
    AccMgr: "账户管理",
    SysMgr: "系统设置",
    UserMgr: "用户管理",
    RoleMgr: "角色管理",
    OrgMgr: "组织管理",
    PermMgr: "权限管理",
    MenuMgr: "菜单管理",
    ResMgr: "资源管理",
    QuartzMgr: "任务管理",
    DictMgr: "字典管理",
    //----------系统管理 结束----------
    //----------系统日志 开始----------
    LogsMgr: "系统日志",
    OperLog: "交互日志",
    FileMgr: "附件管理",
    QuartzLog: "任务日志",
    //----------系统日志 结束----------
    //----------插件示例 开始----------
    Plugin: "插件示例",
    CronTabPage: "Cron生成器",
    DataTablePage: "数据分页组件",
    IconFontPage: "IconFont",
    MarkdownPage: "Markdown",
    RouterPage1: "嵌套路由",
    RouterPage11: "路由1",
    RouterPage12: "路由2",
    RouterPage121: "路由2-1",
    RouterPage122: "路由2-2",
    SinglePageOpen: "单路由多开",
    JsonEditPage: "Json编辑器",
    CountToPage: "数字滚动",
    //----------插件示例 结束----------
    //----------其它页面 开始----------
    OtherPage: "其它页面",
    Page404: "目标未找到",
    Page500: "服务器错误"
    //----------其它页面 结束----------
  },
  navbar: {
    telescopicMenu: "伸缩菜单",
    message: "消息",
    exitFullScreen: "退出全屏",
    enterFullScreen: "进入全屏",
    lockScreen: "锁屏",
    language: "语言",
    setting: "设置",
    perInfo: "个人信息",
    changePW: "修改密码",
    logout: "注销登录"
  },
  login: {
    //锁屏登陆
    button: "登录",
    userName: "用户名",
    passWd: "密码",
    //门户登录页
    title: "登录",
    userName: "请输入用户名",
    passWord: "请输入密码",
    kaptchaCode: "请输入验证码",
    infoH1: "Hello there,",
    infoH2: "welcome to SunRise.",
    infoH3:
      "SunRise 是一个界面管理平台。它基于最新的 Vue.js 开发堆栈并使用 Element UI ,内置常见的插件集成、企业应用程序的典型模板，许多强大的功能。",
    infoButton: "Gitee"
  },
  verify: {
    //登录页
    userNotNull: "用户名不可为空 !",
    userLength: "用户名应输入 4 至 20 个字符 !",
    pawdNotNull: "密码不可为空 !",
    pawdLength: "密码应输入 10 至 30 个字符 !",
    captchaNotNull: "验证码不可为空 !",
    captchaLength: "请输入 4 位验证码 !"
  },
  document: {
    tabs: {
      closeOtherTags: "关闭其它标签",
      closeTheRightLabel: "关闭右侧标签",
      closeAllTags: "关闭全部标签"
    },
    main: {}
  }
};
