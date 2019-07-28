//中文介绍:https://github.com/postcss/postcss/blob/HEAD/README-cn.md
//postcss配置文件

module.exports = {
  plugins: {
    //@import "normalize.css"; /* == @import "../node_modules/normalize.css/normalize.css"; */
    "postcss-import": {},
    //自动改变引入路径已匹配文件路径，必要时可以进行图片的压缩或重命名。
    "postcss-url": {},
    //自动添加CSS属性前缀，以便浏览器支持特殊属性
    autoprefixer: {}
  }
};
