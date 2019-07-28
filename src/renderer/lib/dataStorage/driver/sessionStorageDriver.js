/**
 * @Author: Sun Rising
 * @Date: 2019-06-07 09:10:27
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-06-07 09:49:58
 * @Description: sessionStorage操作类
 */
let myCustomDriver = {
  _support: () => {
    return typeof Storage !== "undefined";
  },
  setItem: (key, value, callback) => {
    sessionStorage.setItem(key, value);
    return callback ? callback(key, value) : Promise.resolve(key, value);
  },
  getItem: (key, callback) => {
    let item = sessionStorage.getItem(key);
    return callback ? callback(item, key) : Promise.resolve(item, key);
  },
  removeItem: (key, callback) => {
    sessionStorage.removeItem(key);
    return callback ? callback(key) : Promise.resolve(key);
  },
  clear: callback => {
    sessionStorage.clear();
    return callback ? callback() : Promise.resolve();
  }
};

export default myCustomDriver;
