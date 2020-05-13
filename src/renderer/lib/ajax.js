import axios from "axios";
import app from "../main";
import XEUtils from "xe-utils";
import AppConfig from "@/resources/appConfig";
import router from "@/router/index";

/**
 * 允许在向服务器发送前，修改请求数据
 * 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
 * 函数必须返回一个字符串，或 ArrayBuffer，或 Stream
 * @param {*} data
 */
let transformRequest = function (data) {
  return JSON.stringify(data);
};

/**
 * 在拦截器之前执行，在传递给 then/catch 前，允许修改响应数据
 * @param {*} data
 */
let transformResponse = function (data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return {}
  }
};

let ajax = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL:
    process.env.NODE_ENV === "development"
      ? AppConfig.devProxyUrl
      : AppConfig.prodProxyUrl,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
    // "Content-Type": "application/x-www-form-urlencoded"
    // "Content-Type": "multipart/form-data"
  },
  withCredentials: true, //跨域请求带上cookie
  transformRequest: [transformRequest],
  transformResponse: [transformResponse],
  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 reject
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 4000
});

// 添加请求拦截器,transformRequest之后执行
ajax.interceptors.request.use(
  config => {
    app.$Progress.start();
    return config;
  },
  error => {
    console.log("http filed!" + error);
  }
);

// 添加响应拦截器，transformResponse之后执行
ajax.interceptors.response.use(
  response => {
    return new Promise((resolve, reject) => {
      try {
        let _handle = response.data.handle;
        // 服务器处理异常
        if (_handle && _handle.code !== AppConfig.httpConst.HTTP_HANDLE_OK) {
          //需要登陆
          if (_handle.code === AppConfig.httpConst.SHIRO_CREDENTITALS)
            router.push({
              path: "/login"
            });
          XEUtils.sayOpWarn(_handle.code + " , " + _handle.message);
          reject(_handle);
        }
        // 处理成功提示
        if (['post', 'put', 'delete'].includes(response.config.method) && !response.config.url.includes("/anon/"))
          if (_handle.code === AppConfig.httpConst.HTTP_HANDLE_OK)
            XEUtils.sayOpSuccess(_handle.code + " , " + _handle.message);
        resolve(_handle);
      } catch (error) {
        console.log(error);
      } finally {
        app.$Progress.finish();
      }
    });
  },
  error => {
    let response = error.response;
    XEUtils.sayOpError(`HTTP连接已断开 , ${response.status}`);
    console.log("response filed!");
    console.log(error);
  }
);

export default ajax;
