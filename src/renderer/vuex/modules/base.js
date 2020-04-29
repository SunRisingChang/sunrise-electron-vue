/**
 * @Author: Sun Rising
 * @Date: 2018-12-13 11:08:52
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-29 08:38:18
 * @Description: vuex 核心模块 base
 */
import config from "@/resources/appConfig";
import router from "@/router/index";
import { getRouterUniqueKey } from "@/lib/util";
import { RouterAssembly } from "@/lib/routerAssembly";
import dataStorage from "@/lib/dataStorage";
import XEUtils from "xe-utils";

import VuexApi from "@/api/vuexApi";

let defaultTabsData = {
  currTab: "/",
  tabPages: [
    {
      name: "Home",
      path: "/",
      key: getRouterUniqueKey({ name: "Home", path: "/" }),
      keepAlive: true
    }
  ]
};

export default {
  namespaced: true,
  state: {
    //动态数据
    dynData: {
      browserWidth: null,
      browserHeight: null
    },
    //系统配置
    sysConfig: config,
    //系统字典
    sysDict: {},
    //---------------------用于配置布局的全局变量 开始-------------------
    //响应式布局
    defaultLayout: null,
    //导航栏是否展开
    isCollapse: false,
    //是否为全屏模式
    isFullScreen: false,
    //是否显示验证码
    isShowCaptcha: false,
    //是否显示修改密码层
    isShowChangePwd: false,
    //---------------------用于配置布局的全局变量 结束-------------------
    //---------------------- 需重置 开始 -------------
    //多页面时记录tabs数据
    tabsData: JSON.parse(JSON.stringify(defaultTabsData)),
    //用户信息，用于所有页面的全局共享
    userInfo: {
      acName: ""
    },
    //菜单信息
    menuInfo: [],
    //菜单源包含按钮级权限信息
    menuSource: [],
    //通知信息
    noticeMsg: [
      {
        message: "字典修改",
        value: "测试数据",
        timestamp: new Date().getTime()
      }
    ]
    //---------------------- 需重置 结束 -------------
  },
  mutations: {
    setDynData(state, dynData) {
      Object.assign(state.dynData, dynData);
    },
    setTabsData(state, tabsData) {
      Object.assign(state.tabsData, tabsData);
    },
    resetTabsData(state) {
      state.tabsData = JSON.parse(JSON.stringify(defaultTabsData));
    },
    setDefaultLayout(state, defaultLayout) {
      Object.assign(state, defaultLayout);
    },
    setCollapse(state, collapse) {
      Object.assign(state, collapse);
    },
    toggleFullScreen(state) {
      state.isFullScreen = !state.isFullScreen;
    },
    setSysConfig(state, sysConfig) {
      Object.assign(state.sysConfig, sysConfig);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setMenuSource(state, menuSource) {
      state.menuSource = menuSource;
    },
    setMenuInfo(state, menuInfo) {
      state.menuInfo = menuInfo;
    },
    setIsShowCaptcha(state, isShowCaptcha) {
      state.isShowCaptcha = isShowCaptcha;
    },
    setSysDict(state, dict) {
      Object.assign(state.sysDict, dict);
    },
    setIsShowChangePwd(state, isShowChangePwd) {
      state.isShowChangePwd = isShowChangePwd;
    },
    putNoticeMsg(state, noticeMsg) {
      state.noticeMsg.push(Object.assign(noticeMsg, { isRead: false }));
    },
    delNoticeMsg(state, noticeMsg) {
      XEUtils.remove(state.noticeMsg, item => item === noticeMsg);
    },
    setNoticeMsgReaded(state, noticeMsg) {
      let currNoticeMsg = state.noticeMsg.find(
        value => value.timestamp === noticeMsg.timestamp
      );
      currNoticeMsg.isRead = true;
    }
  },
  actions: {
    //注册浏览器窗口改变事件
    monitorWinSize({ dispatch, state, commit }) {
      if (!window.onresize) {
        window.onresize = () => {
          commit("setDynData", {
            browserWidth: document.documentElement.clientWidth,
            browserHeight: document.documentElement.clientHeight
          });
          dispatch("changeLayoutType", state.dynData.browserWidth);
        };
        window.onresize();
      }
    },
    //删除tab页面
    delTabPages({ state, commit }, tabKey) {
      let currindex = state.tabsData.tabPages.findIndex(item => {
        return item.key === tabKey;
      });
      if (currindex > -1) {
        let tabPages_t = Object.assign([], state.tabsData.tabPages);
        if (tabKey === state.tabsData.currTab) {
          tabPages_t.splice(currindex, 1);
          commit("setTabsData", {
            currTab: state.tabsData.tabPages[currindex - 1].key,
            tabPages: tabPages_t
          });
          router.push({
            path: state.tabsData.tabPages[currindex - 1].path
          });
        } else {
          tabPages_t.splice(currindex, 1);
          commit("setTabsData", {
            tabPages: tabPages_t
          });
        }
      }
    },
    //刷新时清理tab页数据，关闭手动添加的tab页
    checkTabsData({ state, dispatch }) {
      state.tabsData.tabPages.forEach(value => {
        if (value.path.indexOf(config.interRoutePrefix) > -1) {
          dispatch("delTabPages", value.key);
        }
      });
    },
    /**
     *添加Tab页面
     * @param {*} tabObj {name:*,path:*,key:getRouterUniqueKey({name:*,path:*})}
     *
     */
    addTabPages({ state, commit }, tabObj) {
      let idx = state.tabsData.tabPages.findIndex(item => {
        return item.key === tabObj.key;
      });
      let tabPages_t = Object.assign([], state.tabsData.tabPages);
      if (idx === -1) tabPages_t.push(tabObj);
      commit("setTabsData", {
        currTab: tabObj.key,
        tabPages: tabPages_t
      });
    },
    //根据窗口宽度确定布局类型
    changeLayoutType({ state, commit }, browserWidth) {
      if (browserWidth >= state.sysConfig.defaultLayout) {
        commit("setDefaultLayout", { defaultLayout: "defaultLayout" });
        if (state.isCollapse) commit("setCollapse", { isCollapse: false });
      } else if (
        browserWidth < state.sysConfig.streamLayout[0] &&
        browserWidth >= state.sysConfig.streamLayout[1]
      ) {
        commit("setDefaultLayout", { defaultLayout: "streamLayout" });
        if (!state.isCollapse) commit("setCollapse", { isCollapse: true });
      } else if (browserWidth < state.sysConfig.miniLayout) {
        commit("setDefaultLayout", { defaultLayout: "miniLayout" });
        if (!state.isCollapse) commit("setCollapse", { isCollapse: true });
      }
    },
    //全屏模式
    fullScreenModel({ state, commit }) {
      if (state.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        //FireFox
        else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
        //Chrome等
        else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        //IE11
        else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        let docElm = document.documentElement;
        //W3C
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
      commit("toggleFullScreen");
    },
    //关闭其它标签页
    closeOtherTabPage({ dispatch, state, commit }) {
      let currIndex = state.tabsData.tabPages.findIndex(item => {
        return item.key === state.tabsData.currTab;
      });
      if (currIndex > -1) {
        let tabPages_t = Object.assign([], state.tabsData.tabPages);
        tabPages_t.splice(1, currIndex - 1);
        commit("setTabsData", {
          tabPages: tabPages_t
        });
        dispatch("closeRightTabPage");
      }
    },
    //关闭右侧标签页
    closeRightTabPage({ state, commit }) {
      let currIndex = state.tabsData.tabPages.findIndex(item => {
        return item.key === state.tabsData.currTab;
      });
      if (currIndex > -1) {
        if (currIndex !== state.tabsData.tabPages.length - 1) {
          let tabPages_t = Object.assign([], state.tabsData.tabPages);
          tabPages_t.splice(currIndex + 1);
          commit("setTabsData", {
            tabPages: tabPages_t
          });
        }
      }
    },
    //关闭全部标签页
    closeAllTabPage({ state, commit }) {
      commit("resetTabsData");
      router.push({ path: state.tabsData.currTab });
    },
    //改变主题
    changeTheme({ state, commit }, themeName) {
      if (themeName) {
        commit("setSysConfig", { currTheme: themeName });
        window.document.body.setAttribute("class", themeName.toLowerCase());
      } else {
        window.document.body.setAttribute(
          "class",
          state.sysConfig.currTheme.toLowerCase()
        );
      }
      // 兼容electron模式
      if (process.env.IS_ELECTRON) {
        window.document.body.classList.add("electron");
      }
    },
    //切换国际化
    changeI18n({ commit }, languageCode) {
      commit("setSysConfig", { currLanguage: languageCode });
      dataStorage.getCookie().set("language", languageCode, { expires: 7 });
    },
    //登陆
    async login({ commit }, data) {
      try {
        let resp = await VuexApi.login(data);
        dataStorage.getSessionStorage().setItem("user", resp.data);
        commit("setIsShowCaptcha", false);
        router.push({ path: "/" });
        return XEUtils.PromiseResolve(resp);
      } catch (error) {
        if (error.code === config.httpConst.SHIRO_EXCESSIVE_ATTEMPTS) {
          commit("setIsShowCaptcha", true);
        } else {
          commit("setIsShowCaptcha", false);
        }
        return XEUtils.PromiseReject(error);
      }
    },
    //检查是否登陆
    async isLogged({ commit }) {
      try {
        let resp = await VuexApi.isLogged();
        commit("setUserInfo", resp.data);
      } catch (error) { }
    },
    //注销
    async logout({ dispatch }) {
      await VuexApi.logout();
      dataStorage.getSessionStorage().removeItem("user");
      dataStorage.getCookie().remove("user");
      //清空缓存的vuex状态
      window.localStorage.removeItem("vuex");
      //重置VUEX
      dispatch("resetVuex");
      router.push({ path: "/login" });
    },
    /**
     * 页面锁定
     * @param {*} triggerType 触发类型，[按钮触发|长连接触发]
     */
    async lock({ state }, triggerType) {
      if (triggerType === 'button')
        await VuexApi.logout();
      router.push({ path: "/lock", query: { userName: state.userInfo.acName } });
    },
    //向后台拉取必要的初始化信息
    initSystem({ commit }) {
      return new Promise(async (resolve, reject) => {
        let resp = await VuexApi.initSystem();
        commit("setMenuSource", Object.assign([], resp.data.sysMenu));
        //过滤掉按钮菜单
        XEUtils.remove(resp.data.sysMenu, item => item.menuType === "3");
        let sysMenu = XEUtils.toArrayTree(resp.data.sysMenu, {
          key: "menuUrl",
          parentKey: "menuParent",
          children: "children",
          sortKey: "menuOrde"
        });
        new RouterAssembly().addRouterAll(router, sysMenu);
        commit("setMenuInfo", sysMenu);
        resolve(sysMenu);
      });
    },
    //Vuex 重置方法
    resetVuex({ commit }) {
      commit("setTabsData", JSON.parse(JSON.stringify(defaultTabsData)));
      commit("setUserInfo", {});
      commit("setMenuInfo", []);
      commit("setIsShowChangePwd", false);
    }
  }
};
