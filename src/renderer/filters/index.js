/**
 * @Author: Sun Rising
 * @Date: 2020-05-08 10:54:53
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-05-08 11:43:04
 * @Description: 过滤器统一配置
 */
const Filters = require.context('./', false, /^(\.\/)((?!index)[a-z])*\.js$/i);

export default {
    install(Vue, option) {
        Filters.keys().forEach(key => {
            let Filter = Filters(key).default
            Vue.filter(Filter.name, Filter.handle);
        });
    }
};