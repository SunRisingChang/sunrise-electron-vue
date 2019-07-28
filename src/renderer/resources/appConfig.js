/**
 * @Author: Sun Rising
 * @Date: 2018-12-14 10:02:02
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-11 23:16:18
 * @Description:应用配置参数
 */
export default {
  //开发环境下二级域名,注意需要手动同步修改build/paraConfig.js文件
  devProxyUrl: "/api",
  //默认布局
  defaultLayout: 948,
  //精简布局
  streamLayout: [948, 500],
  //迷你布局
  miniLayout: 500,
  //是否使用伪多页应用
  singlePage: false,
  //主题列表
  theme: ["Dawn", "Blue", "Dark", "Light"],
  //当前的主题
  currTheme: "Dawn",
  //国际化
  language: [
    {
      title: "中文",
      code: "zh"
    },
    {
      title: "English",
      code: "en"
    }
  ],
  //默认语言
  currLanguage: "zh",
  //是否为调试模式
  isDebug: true,
  //是否启用前端日志
  frontLogEnable: true,
  //交互式添加路由的前缀
  interRoutePrefix: "/dyn",
  //element ui组件的默认大小
  uiSize: "small",
  //浏览器支持列表
  browserMixVerList: {
    ie: 9,
    edge: 0,
    firefox: 0,
    chrome: 0,
    safari: 0,
    opera: 0
  },
  //是否显示页脚 type[fixed|inline]
  footerOption: {
    type: "fixed",
    show: false
  },
  httpConst: {
    // 请求要求进行身份验证
    SHIRO_CREDENTITALS: 4010,
    // 未知的账号
    SHIRO_UNKNOWN_ACCOUNT: 4011,
    // 不正确的凭证
    SHIRO_INCORRECT_CREDENTIALS: 4012,
    // 凭证过期
    SHIRO_EXPIRED_CREDENTIALS: 4013,
    // 认证次数超过限制
    SHIRO_EXCESSIVE_ATTEMPTS: 4014,
    // 账号被锁定
    SHIRO_LOCKED_ACCOUNT: 4015,
    // 并发访问异常
    SHIRO_CONCURRENT_ACCESS: 4016,
    // 禁用的账号
    SHIRO_DISABLED_ACCOUNT: 4017,
    // 未知的Token
    SHIRO_UNSUPPORTED_TOKEN: 4018,
    // 账户异常
    SHIRO_ACCOUNT: 4019,
    // 务器已成功响应
    HTTP_OK: 200,
    // 求处理成功
    HTTP_HANDLE_OK: 200,
    // 务器异常
    HTTP_ERROR: 500,
    // 求的资源不可用
    HTTP_NOHANDLER_FOUND: 404
  }
};
