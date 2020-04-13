/**
 * @Author: Sun Rising
 * @Date: 2019-05-20 13:41:02
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-14 13:26:17
 * @Description: 浏览器工具，内置 Web API 接口
 */
import XEUtils from "xe-utils";

export default {
  //----------------------- 下载CSV开始 ----------------------
  /**
   * 获取CSV下载地址
   * @param {*} content CSV内容字符串
   */
  getCsvUrl(content) {
    if (
      window.Blob &&
      window.URL &&
      window.URL.createObjectURL &&
      !XEUtils.browse().safari
    ) {
      return URL.createObjectURL(new Blob([content], { type: "text/csv" }));
    }
    return `data:attachment/csv;charset=utf-8,${encodeURIComponent(content)}`;
  },
  /**
   * 下载CSV文件
   * @param {*} filename 下载的文件名
   * @param {*} content CSV文件字符串
   */
  downloadCsv(filename, content) {
    if (navigator.msSaveBlob && window.Blob) {
      navigator.msSaveBlob(new Blob([content], { type: "text/csv" }), filename);
    } else if (XEUtils.browse()["-ms"]) {
      var win = window.top.open("about:blank", "_blank");
      win.document.charset = "utf-8";
      win.document.write(content);
      win.document.close();
      win.document.execCommand("SaveAs", filename);
      win.close();
    } else {
      var linkElem = document.createElement("a");
      linkElem.target = "_blank";
      linkElem.download = filename;
      linkElem.href = XEUtils.getCsvUrl(content);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }
  },
  //----------------------- 下载CSV结束 ----------------------
  //下载文件
  downFile(url) {
    let a = document.createElement("a");
    let event = new MouseEvent("click");
    a.href = XEUtils.getProxyUrl(url);
    a.target = "_blank";
    a.dispatchEvent(event);
  }
};
