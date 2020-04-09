/**
 * @Author: Sun Rising
 * @Date: 2018-12-14 11:32:25
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-09 14:36:07
 * @Description: 样式配置
 */
//element-ui依赖库,可深度定制
import "./depend/element-theme/theme-expansion.scss";
//扩展图标库，加入fontawesome。
import "font-awesome/scss/font-awesome.scss";
import "./depend/_fontawesome.scss";
//扩展图标库，加入阿里巴巴iconfont。
import "./depend/iconfont/font_747224_32w6r6pgs5.css";
import "./depend/_iconfont.scss";
//扩展动画库,基于vue2的动画库animate
import "vue2-animate/dist/vue2-animate.min.css";

//自定义主题
import "./theme";
//常用的工具类
import "./depend/_color.scss";
import "./depend/_layout.scss";
import "./depend/_animation.scss";
//自定义样式，主要用于自己写定制项目需要
import "./project-custom.scss";
