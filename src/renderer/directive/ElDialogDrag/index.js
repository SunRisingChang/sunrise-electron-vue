/**
 * @Author: Sun Rising
 * @Date: 2019-05-31 12:12:31
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-31 18:08:11
 * @Description:el-dialog拖拽指令
 */
export default {
  bind(el, binding, vnode, oldnode) {
    let dlg = el.getElementsByClassName("el-dialog")[0];

    dlg.offsetX = 0;
    dlg.offsetY = 0;

    let move = function(e) {
      dlg.style.marginLeft = "0px";
      dlg.style.marginTop = "0px";
      dlg.style.left = e.pageX - dlg.offsetX + "px";
      dlg.style.top = e.pageY - dlg.offsetY + "px";
    };

    let up = function() {
      removeEventListener("mousemove", move);
      removeEventListener("mouseup", up);
    };

    let down = function(e) {
      dlg.offsetX = e.pageX - dlg.offsetLeft;
      dlg.offsetY = e.pageY - dlg.offsetTop;

      addEventListener("mousemove", move);
      addEventListener("mouseup", up);
    };

    let header = el.getElementsByClassName("el-dialog__header")[0];
    header.style.cursor = "move";
    header.addEventListener("mousedown", down);
  },
  inserted(el, binding, vnode, oldnode) {},
  update(el, binding, vnode, oldnode) {}
};
