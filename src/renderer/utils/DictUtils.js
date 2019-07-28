/**
 * @Author: Sun Rising
 * @Date: 2019-07-01 08:10:23
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-03 09:03:29
 * @Description: 字典工具
 */
import dataStorage from "@/lib/dataStorage";
import sysDictMgrApi from "@/api/sysm/sysDictMgrApi";
import XEUtils from "xe-utils";
import store from "@/vuex";

export default {
  /**
   * 获取字典树
   * @param {*} dictKey 字典组key
   */
  async getDictTree(dictKey) {
    try {
      let cacheDict = await dataStorage.getDictStorage().getItem(dictKey);
      if (cacheDict) return cacheDict;
      let resp = await sysDictMgrApi.getSysDictItemByGroupKey({
        groupKey: dictKey
      });
      let treeData = [];
      if (resp.data.length > 0) {
        treeData = XEUtils.toArrayTree(resp.data, {
          key: "uuid",
          parentKey: "dictPuuid",
          children: "children",
          sortKey: "dictOrde"
        });
        XEUtils.eachTree(treeData, item => {
          if (item.children.length === 0) delete item.children;
        });
        await dataStorage.getDictStorage().setItem(dictKey, treeData);
        let _dict = {};
        _dict[dictKey] = treeData;
        store.commit("base/setSysDict", _dict);
      }
      return treeData;
    } catch (error) {
      return [];
    }
  },
  /**
   * 获取下拉字典
   * @param {*} dictKey 字典组key
   */
  async getDictSelect(dictKey) {
    try {
      let cacheDict = await dataStorage.getDictStorage().getItem(dictKey);
      if (cacheDict) return cacheDict;
      let resp = await sysDictMgrApi.getSysDictItemByGroupKey({
        groupKey: dictKey
      });
      if (resp.data.length > 0) {
        await dataStorage.getDictStorage().setItem(dictKey, resp.data);
        let _dict = {};
        _dict[dictKey] = resp.data;
        store.commit("base/setSysDict", _dict);
      }
      return resp.data;
    } catch (error) {
      return [];
    }
  },
  /**
   * 获取下拉字典的值
   * @param {*} dictKey 字典组key
   * @param {*} key 字典值key
   */
  getDictSelectValue(dictKey, key) {
    try {
      let cacheDict = store.state.base.sysDict[dictKey];
      if (!cacheDict) return key;
      let currIndex = cacheDict.findIndex(item => item.dictKey === key);
      return currIndex > -1 ? cacheDict[currIndex].dictValue : "未知参数";
    } catch (error) {
      return key;
    }
  },
  /**
   * 删除字典
   * @param {*} dictKey 字典组key
   */
  delDict(dictKey) {
    dataStorage.getDictStorage().removeItem(dictKey);
  }
};
