/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 14:06:45
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-20 16:01:13
 * @Description: DataTable工具类
 */
import XEUtils from "xe-utils";

export default {
  /**
   * 获取table数据格式化后的数据
   * @param {*} columns 表格列Observer
   * @param {*} oData 表格渲染数据
   * @param {*} tableElem 表格挂载DOM
   */
  getCsvLabelData(columns, oData, tableElem) {
    let trElemList = tableElem.querySelectorAll(
      ".el-table__body-wrapper .el-table__row"
    );
    return Array.from(trElemList).map((trElem, rowIndex) => {
      let item = {};
      let row = oData[rowIndex];
      columns.forEach(column => {
        let cell = trElem.querySelector(`.${column.id}`);
        item[column.id] = cell
          ? cell.innerText.trim()
          : row
          ? XEUtils.get(row, column.property)
          : "";
      });
      return item;
    });
  },
  /**
   * 获取table数据
   * @param {*} opts CSV参数
   * @param {*} oData 表格渲染数据
   * @param {*} oColumns 表格列Observer
   * @param {*} tableElem 表格挂载DOM
   */
  getCsvData(opts, oData, oColumns, tableElem) {
    let isOriginal = opts.original;
    let columns = opts.columns ? opts.columns : oColumns;
    if (opts.columnFilterMethod) {
      columns = columns.filter(opts.columnFilterMethod);
    }
    let datas = opts.data
      ? opts.data
      : isOriginal
      ? oData
      : this.getCsvLabelData(columns, oData, tableElem);
    if (opts.dataFilterMethod) {
      datas = datas.filter(opts.dataFilterMethod);
    }
    return { columns, datas };
  },
  /**
   * 获取table数据字符串
   * @param {*} opts CSV参数
   * @param {*} oData 表格渲染数据
   * @param {*} oColumns 表格列Observer
   * @param {*} tableElem 表格挂载DOM
   */
  getCsvContent(opts, oData, oColumns, tableElem) {
    let isOriginal = opts.original;
    let { columns, datas } = this.getCsvData(opts, oData, oColumns, tableElem);
    let content = "\ufeff";
    if (opts.isHeader) {
      content += columns.map(column => column.label).join(",") + "\n";
    }
    datas.forEach((record, rowIndex) => {
      if (isOriginal) {
        content +=
          columns
            .map(column => {
              if (column.type === "index") {
                return `"${
                  column.index ? column.index(rowIndex) : rowIndex + 1
                }"`;
              }
              return `"${XEUtils.get(record, column.property) || ""}"`;
            })
            .join(",") + "\n";
      } else {
        content +=
          columns.map(column => `"${record[column.id]}"`).join(",") + "\n";
      }
    });
    return content;
  }
};
