/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 09:52:35
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-01 08:15:36
 * @Description: 自定义工具类，会挂载到Vue的$utils上，调用方法为this.$utils.xxx
 */
import XEUtils from "xe-utils";
import BrowserUtils from "./BrowserUtils";
import RegUtils from "./RegUtils";
import DateUtils from "./DateUtils";
import StringUtils from "./StringUtils";
import ArrayUtils from "./ArrayUtils";
import ElementUtils from "./ElementUtils";
import DictUtils from "./DictUtils";
import OtherUtils from "./OtherUtils";

XEUtils.mixin(
  Object.assign(
    BrowserUtils,
    DateUtils,
    RegUtils,
    StringUtils,
    ArrayUtils,
    ElementUtils,
    DictUtils,
    OtherUtils
  )
);

export default XEUtils;
