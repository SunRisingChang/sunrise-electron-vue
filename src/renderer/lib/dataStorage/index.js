/**
 * @Author: Sun Rising
 * @Date: 2019-06-07 09:22:44
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-12 10:07:46
 * @Description: 前端数据库工厂，单例模式
 */
import Localforage from "localforage";
import SessionStorageDriver from "./driver/sessionStorageDriver";
import CookieDriver from "./driver/cookieDriver";

class DataStorageFactory {
  static sessionStorage;
  static localStorage;
  static webSQL;
  static indexedDB;
  static storage;
  static dictStorage;
  static cookie;
  static autoInputStorage;

  static getSessionStorage() {
    if (SessionStorageDriver._support) {
      DataStorageFactory.sessionStorage = SessionStorageDriver;
    }
    return DataStorageFactory.sessionStorage;
  }
  static getlocalStorage() {
    if (!DataStorageFactory.localStorage) {
      let _Localforage = Localforage.createInstance({
        name: "localStorage"
      });
      _Localforage.setDriver(Localforage.LOCALSTORAGE);
      DataStorageFactory.localStorage = _Localforage;
    }
    return DataStorageFactory.localStorage;
  }
  static getWebSQL() {
    if (!DataStorageFactory.webSQL) {
      let _Localforage = Localforage.createInstance({
        name: "webSQL"
      });
      _Localforage.setDriver(Localforage.WEBSQL);
      DataStorageFactory.webSQL = _Localforage;
    }
    return DataStorageFactory.webSQL;
  }
  static getIndexedDB() {
    if (!DataStorageFactory.indexedDB) {
      let _Localforage = Localforage.createInstance({
        name: "indexedDB"
      });
      _Localforage.setDriver(Localforage.INDEXEDDB);
      DataStorageFactory.indexedDB = _Localforage;
    }
    return DataStorageFactory.indexedDB;
  }
  //自动加在存储库,优先级 INDEXEDDB > WEBSQL > LOCALSTORAGE
  static getStorage() {
    if (!DataStorageFactory.storage) {
      let _Localforage = Localforage.createInstance({
        name: "storage"
      });
      DataStorageFactory.storage = _Localforage;
    }
    return DataStorageFactory.storage;
  }
  //组件记忆输入框仓库,优先级 INDEXEDDB > WEBSQL > LOCALSTORAGE
  static getAutoInputStorage() {
    if (!DataStorageFactory.autoInputStorage) {
      let _Localforage = Localforage.createInstance({
        name: "autoInputStorage"
      });
      DataStorageFactory.autoInputStorage = _Localforage;
    }
    return DataStorageFactory.autoInputStorage;
  }
  //字典仓库,优先级 INDEXEDDB > WEBSQL > LOCALSTORAGE
  static getDictStorage() {
    if (!DataStorageFactory.dictStorage) {
      let _Localforage = Localforage.createInstance({
        name: "dictStorage"
      });
      DataStorageFactory.dictStorage = _Localforage;
    }
    return DataStorageFactory.dictStorage;
  }
  static getCookie() {
    if (!DataStorageFactory.cookie) {
      DataStorageFactory.cookie = CookieDriver;
    }
    return DataStorageFactory.cookie;
  }
}
export default DataStorageFactory;
