/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 10:35:24
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-02 14:37:36
 * @Description: 日期工具类
 */
import XEUtils from "xe-utils";

export default {
  /**
   * 日期格式化为任意格式字符串，
   * @param {*} time Date对象或时间戳
   * @param {*} cFormat 格式化字符串
   */
  toDateStringExp(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s} 星期{a}";
    let date;
    if (typeof time === "object") {
      date = time;
    } else {
      if (("" + time).length === 10) time = parseInt(time) * 1000;
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    });
    return time_str;
  },
  /**
   * 返回两个日期之间差距
   * @param {*} startDate 开始日期，Date对象、时间戳、2017-12-10 10:08:59
   * @param {*} endDate 结束日期，Date对象、时间戳、2017-12-10 10:08:59
   */
  toDateDiffText(startDate, endDate) {
    let dateDiff = XEUtils.getDateDiff(startDate, endDate);
    if (dateDiff.done) {
      if (dateDiff.time < 31536000000) {
        if (dateDiff.time < 2592000000) {
          if (dateDiff.time < 86400000) {
            if (dateDiff.time < 360000) {
              if (dateDiff.time < 60000) {
                if (dateDiff.time < 10000) {
                  return `刚刚`;
                }
                return `${dateDiff.ss}秒之前`;
              }
              return `${dateDiff.mm}分钟之前`;
            }
            return `${dateDiff.HH}小时之前`;
          }
          return `${dateDiff.dd}天之前`;
        }
        return `${dateDiff.MM}个月之前`;
      }
      return `${dateDiff.yyyy}年之前`;
    }
    return "错误类型";
  }
};
