/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 11:44:39
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-02 15:57:18
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
  },
  /**
   * 比较版本号
   * @param {*} newVersion 目前的版本号
   * @param {*} lastVersion 最新的版本号
   */
  diffVersion(newVersion, lastVersion) {
    if (newVersion && lastVersion) {
      let newVerArr = newVersion.split('.');
      let lastVerArr = lastVersion.split('.');
      let maxLength = Math.max(newVerArr.length, lastVerArr.length);
      for (let index = 0; index < maxLength; index++) {
        if (Number(newVerArr[index] || 0) < Number(lastVerArr[index] || 0)) return true
        if (Number(newVerArr[index] || 0) > Number(lastVerArr[index] || 0)) return false
      }
    }
    return false
  }
};
