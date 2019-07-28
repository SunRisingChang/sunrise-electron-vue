export default {
  //浏览器宽度
  // browserWidth: state => state.base.dynData.browserWidth,
  //浏览器高度
  // browserHeight: state => state.base.dynData.browserHeight,
  //系统配置参数
  sysConfig: state => state.base.sysConfig,
  //多页面时记录缓存的页面name,用于页面tabs标签显示
  tabPages: state => Object.assign({}, state.base.tabsData),
  //缓存路由页面列表
  keepRouters: state => {
    let kr = [];
    state.base.tabsData.tabPages.forEach((value, index) => {
      if (value.keepAlive) kr.push(value.key);
    });
    return kr;
  }
};
