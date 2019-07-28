/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 11:44:39
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-20 11:47:53
 * @Description: 字符串工具
 */
export default {
  /**
   * 获取字符串字节长度
   * @param {*} str 字符串
   */
  getStringByteLen(str) {
    var length = 0;
    var reg = /[\u4e00-\u9fa5]/;
    for (var i = 0; i < str.length; i++) {
      if (reg.test(str.charAt(i))) {
        length += 2;
      } else {
        length++;
      }
    }
    return length;
  }
};
