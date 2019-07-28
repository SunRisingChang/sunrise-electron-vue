/**
 * @Author: Sun Rising
 * @Date: 2018-12-13 11:08:02
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 13:16:13
 * @Description:核心路由，非懒加载
 * meta: { noKeepAlive: true}禁止缓存,不写则默认进行缓存
 */
import Home from "@/views/Home";
import Login from "@/views/Login";
import Setting from "@/views/module/other/Setting";
import Lock from "@/views/module/other/Lock";
import Main from "@/views/module/other/Main";
import UserInfo from "@/views/module/other/UserInfo";
import NoticeMsg from "@/views/module/other/NoticeMsg";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      //根页面
      { path: "/", component: Main, name: "Home" },
      //头部右侧设置按钮页面
      {
        path: "setting",
        component: Setting,
        name: "Setting"
      },
      //个人信息
      {
        path: "userInfo",
        component: UserInfo,
        name: "UserInfo"
      },
      //通知信息
      {
        path: "noticeMsg",
        component: NoticeMsg,
        name: "NoticeMsg"
      }
    ]
  },
  //登录页面
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  //锁屏页面
  {
    path: "/lock",
    name: "Lock",
    component: Lock
  }
];
