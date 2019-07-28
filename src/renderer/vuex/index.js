/**
 * @Author: Sun Rising
 * @Date: 2018-12-15 17:39:01
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-03 18:48:18
 * @Description: vuex配置
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import base from "./modules/base";

Vue.use(Vuex);

export default new Vuex.Store({
  //严格模式，修改Vuex state 必须使用 mutation 处理
  strict: true,
  modules: { base },
  getters,
  plugins: [
    //添加vuex状态保持，解决页面刷新vuex状态丢失的问题
    createPersistedState({
      key: "vuex",
      reducer: state => ({
        base: {
          tabsData: state.base.tabsData,
          sysDict: state.base.sysDict
        }
      })
    })
  ]
});
