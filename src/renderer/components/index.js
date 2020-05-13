/**
 * @Author: Sun Rising
 * @Date: 2019-05-31 12:26:06
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-05-08 09:28:48
 * @Description: 自定义组件装配器
 */
const Components = require.context('./', true, /^(\.\/)[a-z]*\/index.(vue|js)$/i);

export default {
  install(Vue, option) {
    Components.keys().forEach(key => {
      let component = Components(key).default
      Vue.component(component.name, component);
    });
  }
};
