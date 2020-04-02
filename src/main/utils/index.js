/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 09:52:35
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-02 14:37:28
 * @Description: 自定义工具类，会挂载到Vue的$utils上，调用方法为this.$utils.xxx
 */
import XEUtils from "xe-utils";
import BrowserUtils from "./BrowserUtils";
import RegUtils from "./RegUtils";
import DateUtils from "./DateUtils";
import StringUtils from "./StringUtils";
import ArrayUtils from "./ArrayUtils";

XEUtils.mixin(
  Object.assign(
    BrowserUtils,
    DateUtils,
    RegUtils,
    StringUtils,
    ArrayUtils,
  )
);

export default XEUtils;
