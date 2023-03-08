import Vue from "vue";

//------------ Vue插件 开始 ----------------
import ElementUI from "element-ui";
import VueProgressBar from "vue-progressbar";
//markdown编辑器
import MavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
//遮罩导航
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import VCharts from "v-charts";
//------------ Vue插件 结束 ----------------

//------------ Vue配置插件 开始 ----------------
import Axios from "./lib/ajax";
import XEUtils from "./utils";
import VueRouter from "./router";
import Vuex from "./vuex";
import VueI18n from "./i18n";
import "./services"; //MockJs;
//------------ Vue配置插件 结束 ----------------

//------------ 全局配置 开始 -----------------
import AppConfig from "@/resources/appConfig";
//------------ 全局配置 结束 -----------------

//------------ 全局资源 开始 ------------------
import App from "./App"; //装配页
import "@/style"; //样式
import Components from "@/components"; //自定义组件
import Directives from "@/directive"; //自定义指令
import Filters from "@/filters"; //自定义过滤器
//------------ 全局资源 结束 ------------------

//------------ Vue全局配置 开始 ---------------
import LogFrontService from "@/services/service/LogFrontService";
// Vue.config.errorHandler = LogFrontService.errorHandler;
Vue.config.productionTip = false;
//------------ Vue全局配置 结束 ---------------

//------------ 自定义的VUE全局对象 开始 ----------
// 遮罩导航
Vue.prototype.$driver = Driver;
Vue.prototype.$ajax = Axios; //http请求工具
Vue.prototype.$utils = XEUtils; //工具函数库
Vue.prototype.$mainLoading = false; //内容区loading开关
//------------ 自定义的VUE全局对象 结束 ----------

//------------ 动态加载electron 开始 ------------
if (process.env.IS_ELECTRON) {
  const electron = require('electron');
  Vue.prototype.$electron = electron;
}
//------------ 动态加载electron 结束 ------------

//------------ Vue插件装配 开始 -----------------
Vue.use(ElementUI, {
  size: AppConfig.uiSize, //设置 element-ui 默认的大小
  i18n: (key, value) => VueI18n.t(key, value)
});
Vue.use(VueProgressBar, { thickness: "3px" });
Vue.use(VCharts);
Vue.use(MavonEditor);
Vue.use(Directives);
Vue.use(Components);
Vue.use(Filters);
//------------ Vue插件装配 结束 -----------------

export default new Vue({
  router: VueRouter,
  store: Vuex,
  i18n: VueI18n,
  render: h => h(App)
}).$mount("#app");
