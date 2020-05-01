/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 11:44:39
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-29 13:09:25
 * @Description: 字符串工具
 */
import XEUtils from "xe-utils";
import CryptoJS from 'crypto-js'

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
   * 密码加密,MD5(Hex(SHA256(pwd)))
   * @param {*} pwd 密码明文
   */
  encodePasswd(pwd) {
    if (XEUtils.isString(pwd)) {
      const SHA256_Hex = CryptoJS.SHA256(pwd).toString(CryptoJS.enc.Hex)
      return CryptoJS.MD5(SHA256_Hex).toString()
    }
    return pwd;
  }
};
