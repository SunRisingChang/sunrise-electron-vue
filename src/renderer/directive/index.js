/**
 * @Author: Sun Rising
 * @Date: 2019-05-31 12:10:32
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-10-09 08:52:09
 * @Description: 指令统一管理
 */
import ElDialogDrag from "./ElDialogDrag";
import ButtonAuth from "./ButtonAuth";

export default {
  install(Vue, option) {
    //el-dialog拖拽指令v-drag
    Vue.directive("Drag", ElDialogDrag);
    //按钮权限过滤v-button-auth
    Vue.directive("ButtonAuth", ButtonAuth);
  }
};
