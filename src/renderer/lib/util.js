import md5 from "md5";

/**
 * 工具
 */

//获取页面路由的key,组件 key-views 中的key是使用它来获得
export function getRouterUniqueKey(router) {
  let keyStr = router.name + router.path;
  return md5(keyStr);
}
