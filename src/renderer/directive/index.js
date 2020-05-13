/**
 * @Author: Sun Rising
 * @Date: 2019-05-31 12:10:32
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-05-08 10:44:33
 * @Description: 指令统一管理
 */
const Directives = require.context('./', true, /^(\.\/)[a-z]*\/index.js$/i);

export default {
  install(Vue, option) {
    Directives.keys().forEach(key => {
      let directive = Directives(key).default
      Vue.directive(directive.name, directive);
    });
  }
};
