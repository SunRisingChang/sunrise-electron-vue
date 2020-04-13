/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 18:46:23 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-13 08:38:24
 * @Description: 核心路由
 */
<template>
  <flex-container height="100%" direction="column" wrap="nowrap">
    <!-- 标题栏组件 -->
    <component :is="tittleBar"></component>
    <flex-item :height="contentHeight">
      <transition name="fade" mode="out-in" :duration="1000">
        <router-view />
      </transition>
    </flex-item>
  </flex-container>
</template>

<script>
import appConfig from "@/resources/appConfig.js";

export default {
  data() {
    return {
      // 标题栏
      tittleBar: null,
      // 内容体高度
      contentHeight: "100%"
    };
  },
  created() {
    this.checkBrowser();
    this.initTittleBar();
  },
  methods: {
    // 初始化标题栏
    initTittleBar() {
      if (this.$electron) {
        this.tittleBar = () => import("./views/module/layout/TittleBar.vue");
        this.contentHeight = "calc(100% - 30px)";
      }
    },
    //检查浏览器兼容性
    checkBrowser() {
      let agent = navigator.userAgent.toLowerCase();
      let reg_ie = /(msie |rv:)([\d.]+)/gi;
      let reg_edge = /(edge)\/([\d.]+)/gi;
      let reg_firefox = /(firefox)\/([\d.]+)/gi;
      let reg_chrome = /(chrome)\/([\d.]+)/gi;
      let reg_safari = /(safari)\/([\d.]+)/gi;
      let reg_opera = /(?:opr|opera)\/([\d.]+)/gi;
      let browserName, browserVersion;

      //Opera
      if (agent.includes("opera") || agent.includes("opr")) {
        browserName = "Opera";
        browserVersion = reg_opera.exec(agent)[1];
      }

      //IE
      else if (agent.includes("msie") || agent.includes("rv:11")) {
        browserName = "IE";
        browserVersion = reg_ie.exec(agent)[2];
      }

      //Edge
      else if (agent.includes("edge")) {
        browserName = "Edge";
        browserVersion = reg_edge.exec(agent)[2];
      }

      //Firefox
      else if (agent.includes("firefox")) {
        browserName = "Firefox";
        browserVersion = reg_firefox.exec(agent)[2];
      }

      //Chrome
      else if (agent.includes("chrome")) {
        browserName = "Chrome";
        browserVersion = reg_chrome.exec(agent)[2];
      }

      //Safari
      else if (agent.includes("safari")) {
        browserName = "Safari";
        browserVersion = reg_safari.exec(agent)[2];
      }

      let isOK = true;
      let browserMixVerList = appConfig.browserMixVerList;
      let _browserVersion = this.$utils.toInteger(browserVersion);
      let mixVer;
      if (browserName === "Opera") {
        isOK = (mixVer = browserMixVerList.opera) < _browserVersion;
      } else if (browserName === "IE") {
        isOK = (mixVer = browserMixVerList.ie) < _browserVersion;
      } else if (browserName === "Edge") {
        isOK = (mixVer = browserMixVerList.edge) < _browserVersion;
      } else if (browserName === "Firefox") {
        isOK = (mixVer = browserMixVerList.firefox) < _browserVersion;
      } else if (browserName === "Chrome") {
        isOK = (mixVer = browserMixVerList.chrome) < _browserVersion;
      } else if (browserName === "Safari") {
        isOK = (mixVer = browserMixVerList.safari) < _browserVersion;
      }

      if (!isOK) {
        this.$alert("当前浏览器: " + browserName + " .ver " + browserVersion + " 请使用 " + browserName + " .ver " + mixVer + "&#8743; </br>推荐使用Chrome的最新版本 !", "浏览器检测异常...", {
          type: "info",
          showClose: false,
          showCancelButton: false,
          showConfirmButton: false,
          center: true,
          dangerouslyUseHTMLString: true
        });
      }
    }
  }
};
</script>
