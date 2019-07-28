/**
 * @Author: Sun Rising
 * @Date: 2019-05-31 12:10:32
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-31 12:21:10
 * @Description: 指令统一管理
 */
import ElDialogDrag from "./ElDialogDrag";

export default {
  install(Vue, option) {
    //el-dialog拖拽指令
    Vue.directive("Drag", ElDialogDrag);
  }
};
