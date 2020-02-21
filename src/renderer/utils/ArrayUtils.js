/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 11:52:03
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-02-21 15:19:28
 * @Description: 数组工具
 */
import XEUtils from "xe-utils";

export default {
  /**
   * 清理数组对象中的无效元素（undefined、null），返回一个新数组
   * @param {*} actual 待清理数组
   */
  cleanArray(actual) {
    return actual.filter(value => !!value);
  },
  /**
   * 两个数组的差集
   * @param {*} array1
   * @param {*} array2
   */
  arrayDiff(array1, array2) {
    return array1.filter(value => !array2.includes(value));
  },
  /**
   * 添加树结构中的路径链
   * @param {*} treeNode 树结构
   * @param {*} fullPathStr 表示树结构的属性名
   * @param {*} pathStr 树的key
   * @param {*} parentPath 父级路径
   */
  addTreeFullPath(treeNode, fullPathStr, pathStr, parentPath) {
    treeNode.forEach(value => {
      let _parentPath = XEUtils.isUndefined(parentPath) ? "" : parentPath + "/";
      value[fullPathStr] = _parentPath + value[pathStr];
      if (value.children) {
        XEUtils.addTreeFullPath(
          value.children,
          fullPathStr,
          pathStr,
          value[fullPathStr]
        );
      }
    });
  },
  /**
   * 向树结构中添加排序字段
   * @param {*} treeNode 树结构数据
   * @param {*} sortStr 排序字段
   */
  addTreeSort(treeNode, sortStr) {
    treeNode.forEach((item, index) => {
      item[sortStr] = index;
      if (item.children) {
        XEUtils.addTreeSort(item.children, sortStr);
      }
    });
  },
  /**
   * 获取数组中全部的目标索引,不支持对象数组
   * @param {*} arrary 数组
   * @param {*} target 目标
   */
  findAllIndex(arrary, target) {
    let results = [];
    if (Array.isArray(arrary)) {
      let len = arrary.length, pos = 0;
      while (pos < len) {
        pos = arrary.indexOf(target, pos);
        if (pos === -1)
          break;
        results.push(pos);
        pos = pos + 1;
      }
    }
    return results;
  }
};
