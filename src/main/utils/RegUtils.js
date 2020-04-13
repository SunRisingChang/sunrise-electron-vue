/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 10:13:34
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-20 10:13:34
 * @Description: 正则校验工具
 */
export default {
  /* 合法uri*/
  validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
  },
  /* 小写字母*/
  validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
  },
  /* 大写字母*/
  validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
  },
  /* 大小写字母*/
  validateAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  },
  /* 邮箱 */
  validateEmail(str) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  }
};
