/**
 * @Author: Sun Rising
 * @Date: 2019-02-19 10:48:26
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-05-08 10:42:49
 * @Description: 按钮权限指令
 * 使用说明:
 * 1.功能:如果当前登录的用户所拥有的角色未选择按钮级的权限，那么这个按钮将被隐藏。
 * 2.添加规则，在菜单管理中进行添加，“目标标识”填写你所控制的按钮key
 * 3.使用规则，在你想要控制的按钮上添加“v-buttonAuth”指令，传入字符串key,例如v-button-auth="'user_add'"
 */

export default {
  name: 'ButtonAuth',
  bind(el, binding, vnode, oldnode) { },
  inserted(el, binding, vnode, oldnode) {
    let menuSource = vnode.context.$store.state.base.menuSource;
    let key = binding.value;
    let fullPath = vnode.context.$route.fullPath;
    let buttonAuths = [];

    //获取当前路由下的所有按钮权限
    menuSource.forEach(value => {
      if (fullPath === value.menuParent) buttonAuths.push(value);
    });

    let curr_buttonAuth = buttonAuths.find(value => value.menuKey === key);

    if (!curr_buttonAuth || curr_buttonAuth.menuVisible == 0) el.remove();
  },
  update(el, binding, vnode, oldnode) { }
};
