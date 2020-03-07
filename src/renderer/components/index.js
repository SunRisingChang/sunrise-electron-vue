/**
 * @Author: Sun Rising
 * @Date: 2019-05-31 12:26:06
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-03-07 12:31:37
 * @Description: 自定义组件装配器
 */
import KeepViews from "./KeepViews";
import TransitionKeep from "./TransitionKeep";
import DataTable from "./DataTable/index.vue";
import DataTableColumn from "./DataTableColumn/index.vue";
import FlexContainer from "./FlexContainer";
import FlexItem from "./FlexItem";
import ColPr from "./ColPr/index.vue";
import CronTab from "./CronTab/index.vue";
import DictSelect from "./DictSelect/index.vue";
import RoutersView from "./RoutersView/index.vue";
import MarkdownEditor from "./MarkdownEditor/index.vue";
import DialogDrag from "./DialogDrag/index.vue";
import AutocompleteInput from "./AutocompleteInput/index.vue";

export default {
  install(Vue, option) {
    //页面缓存组件
    Vue.component("keep-views", KeepViews);
    //配合keep-views使用在其父级
    Vue.component("transition-keep", TransitionKeep);

    //Cron表达式生成器
    Vue.component("cron-tab", CronTab);
    //路由显示组件支持嵌套路由
    Vue.component("routers-view", RoutersView);
    //MarkdownEditor组件
    Vue.component("markdown-editor", MarkdownEditor);

    //多功能表格组件
    Vue.component("data-table", DataTable);
    Vue.component("data-table-column", DataTableColumn);

    //字典选择工具
    Vue.component("dict-select", DictSelect);

    //Flex布局组件
    Vue.component("flex-container", FlexContainer);
    Vue.component("flex-item", FlexItem);
    //封装了响应式默认值
    Vue.component("col-pr", ColPr);

    //弹出层组件
    Vue.component("dialog-drag", DialogDrag);

    //可记忆的select输入框
    Vue.component("autocomplete-input", AutocompleteInput);
  }
};
