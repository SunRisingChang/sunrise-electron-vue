import Mockjs from "mockjs";
import XEUtils from "xe-utils";
import AppConfig from "@/resources/appConfig";
/**
 * 用于调试模式
 */
export class MockService {
  constructor() {
    // 获取 mock.Random 随机对象
    const Random = Mockjs.Random;
    console.log("Mockjs 启动...");

    //跨域代理前缀，在paraConfig.js dev.proxyTable
    const _P =
      process.env.NODE_ENV === "development"
        ? AppConfig.devProxyUrl
        : AppConfig.isSeparateDeploy ? AppConfig.prodProxyUrl : "";

    // 服务器默认格式
    let _R = respData => {
      return {
        error: "",
        stat: 200,
        handle: {
          data: respData,
          code: 200,
          message: "请求处理成功"
        },
        message: "模拟数据,服务器默认格式",
        timestamp: Random.time(),
        path: "NONE"
      };
    };

    //------------------------------ Vuex API 开始 -----------------
    //系统登录
    Mockjs.mock(
      _P + "/account/anon/login",
      "post",
      _R({ acName: "Debug Mode" })
    );

    //注销登录
    Mockjs.mock(_P + "/account/logout", "get", _R());

    //保存用户信息
    Mockjs.mock(_P + "/account/saveUserInfo", "post", _R());

    //修改密码
    Mockjs.mock(_P + "/account/changePwd", "post", _R());

    //是否已经登录
    Mockjs.mock(
      _P + "/account/anon/isLogged",
      "get",
      _R({ acName: "Debug Mode" })
    );

    //加载系统信息
    Mockjs.mock(
      _P + "/account/initSystem",
      "get",
      _R({
        sysMenu: []
      })
    );

    //------------------------------ Vuex API 结束 -----------------

    //查询
    Mockjs.mock(RegExp(_P + ".*/query.*"), "get", options => {
      let respTableData = [];
      for (
        let index = 0;
        index < parseInt(XEUtils.parseUrl(options.url).searchQuery["pageSize"]);
        index++
      ) {
        respTableData.push({
          id: Random.id(),
          permType: Random.pick(["1", "2"]),
          permStat: Random.pick(["1", "2"]),
          permTable: Random.pick([
            "SYS_USER",
            "SYS_DICT",
            "SYS_MENU",
            "SYS_QUARTZ"
          ]),
          acName: Random.last(),
          groupName: Random.last(),
          groupKey: Random.last(),
          fileName: Random.last() + ".JS",
          fileMd5: Random.guid(),
          filePath: Random.url(),
          fileUrl: Random.url(),
          fileType: "JS",
          fileSize: Random.integer(60, 1000),
          fileStat: Random.pick(["1", "2"]),
          quartzName: Random.last(),
          quartzGroup: Random.last(),
          quartzStat: Random.pick(["1", "2"]),
          quartzClass: Random.last() + ".CLASS",
          quartzCron: Random.integer(10000),
          quartzDesc: Random.paragraph(1, 1),
          reqUrl: Random.url(),
          urlDesc: "删除用户",
          svrAdrr: Random.ip(),
          svrName: Random.last(),
          cliAdrr: Random.ip(),
          cliDesc: Random.paragraph(1, 1),
          startTime: Random.date(),
          procTime: Random.integer(60, 100),
          respCode: "200",
          respDesc: "请求成功",
          opUser: Random.cname(),
          execInfo: Random.paragraph(1, 1),
          qtzName: Random.last(),
          qtzGroup: Random.last(),
          logLeve: Random.pick(["1", "2"]),
          svrAddr: Random.ip(),
          createdUser: Random.cname(),
          createdTime: Random.date(),
          updatedUser: Random.cname(),
          updatedTime: Random.date(),
          dictType: Random.pick(["1", "2"]),
          groupStat: Random.pick(["1", "2"]),
          userName: Random.cname(),
          roleName: Random.last(),
          roleCode: Random.last(),
          orgUuid: Random.id(),
          roleDesc: Random.paragraph(1, 1),
          permDesc: Random.paragraph(1, 1),
          acStat: Random.pick(["1", "2"]),
          userSex: Random.pick(["1", "2"]),
          orgUuid: Random.id(),
          userPhone: Random.id(),
          name: Random.cname(),
          userEmail: Random.email(),
          email: Random.email(),
          address: Random.county(true),
          date: Random.date(),
          userBirthday: Random.date(),
          lastLogDate: Random.date(),
          remark: Random.paragraph(1, 1)
        });
      }
      let respData = {
        dataBody: respTableData,
        currentPageNum: XEUtils.parseUrl(options.url).searchQuery[
          "currentPageNum"
        ],
        pageSize: XEUtils.parseUrl(options.url).searchQuery["pageSize"],
        totalRecords: 1000,
        sortField: "",
        SortDirection: "ASC"
      };
      return _R(respData);
    });

    //获取
    Mockjs.mock(RegExp(_P + ".*/get.*"), "get", _R([]));

    //删除
    Mockjs.mock(RegExp(_P + ".*/del.*"), "delete", _R());

    //保存
    Mockjs.mock(RegExp(_P + ".*/save.*"), "post", _R());

    //其它
    Mockjs.mock(RegExp(_P + ".*"), "put", _R());
  }
}
