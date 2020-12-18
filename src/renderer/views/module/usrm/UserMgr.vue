/**
 * @Author: Sun Rising 
 * @Date: 2019-06-12 15:25:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-12-18 15:53:16
 * @Description: 用户管理
 */
<template>
  <flex-container wrap="nowrap" justifyContent="space-between">
    <flex-item :grow="1" width="100%">
      <el-card>
        <flex-container slot="header" justifyContent="space-between">
          <flex-item alignItems="center"> <i class="el-icon-s-custom margin-right-6 font-size-16"></i>用户信息 </flex-item>
          <flex-item alignItems="center">
            <el-button v-button-auth="'user-add'" type="primary" size="mini" @click="handleAddUser" circle icon="el-icon-plus" title="添加"></el-button>
            <el-button v-button-auth="'user-query'" type="primary" @click="handleQueryUser" size="mini" circle icon="el-icon-search" title="查询"></el-button>
            <el-button
              size="mini"
              @click="
                $refs['userForm'].resetFields();
                lastLogDate = [];
              "
              circle
              plain
              icon="el-icon-refresh-left"
              title="重置"
            ></el-button>
            <el-button :disabled="!tableSelection.length > 0" size="mini" circle @click="handleUserLock(true)" plain icon="icon-fa fa-lock" title="批量锁定"></el-button>
            <el-button :disabled="!tableSelection.length > 0" size="mini" circle @click="handleUserUnlock(true)" plain icon="icon-fa fa-unlock" title="批量解锁"></el-button>
            <el-button :disabled="!tableSelection.length > 0" size="mini" circle @click="handleUserDest(true)" plain icon="el-icon-switch-button" title="批量注销"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap="nowrap">
          <flex-item class="margin-bottom-10">
            <el-form ref="userForm" :model="userForm" label-position="right" label-width="80px" class="form-style-line">
              <el-row>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="账户名称 :" prop="acName">
                    <el-input v-model="userForm.acName" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="用户姓名 :" prop="userName">
                    <el-input v-model="userForm.userName" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="用户状态 :" prop="acStat">
                    <dict-select v-model="userForm.acStat" dict-key="AcStat" placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="隶属组织 :" prop="orgUuid">
                    <el-cascader :options="orgTree" v-model="userForm.orgUuid" :props="orgTreeProps" clearable></el-cascader>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="用户性别 :" prop="userSex">
                    <dict-select v-model="userForm.userSex" dict-key="Sex" placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
                  <el-form-item label="最后登录 :" prop="lastLogDate">
                    <el-date-picker v-model="lastLogDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="userTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func="loadUser" :pageOptions="pageOptions" @selection-change="(val) => (this.tableSelection = val)">
              <data-table-column prop="selection" type="selection" align="center" width="50" fixed="left"></data-table-column>
              <data-table-column prop="acName" label="账户名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="acStat" label="状态" show-overflow-tooltip :formatter="(row) => $utils.tableColDictFormt('AcStat', row.acStat)"></data-table-column>
              <data-table-column prop="orgUuid" label="隶属组织" show-overflow-tooltip width="150">
                <template slot-scope="scope">
                  <el-cascader class="cascader-table-disabled" :options="orgTree" :value="scope.row.orgUuid" :props="orgViewProps" disabled></el-cascader>
                </template>
              </data-table-column>
              <data-table-column prop="userName" label="用户姓名" show-overflow-tooltip></data-table-column>
              <data-table-column prop="userSex" label="性别" show-overflow-tooltip :formatter="(row) => $utils.tableColDictFormt('Sex', row.userSex)"></data-table-column>
              <data-table-column prop="userPhone" label="联系电话" show-overflow-tooltip></data-table-column>
              <data-table-column prop="userEmail" label="邮件" show-overflow-tooltip></data-table-column>
              <data-table-column prop="userBirthday" label="出生日期" show-overflow-tooltip :formatter="$utils.tableColTimeFormt"></data-table-column>
              <data-table-column prop="lastLogDate" label="最后登录" show-overflow-tooltip :formatter="$utils.tableColTimeFormt"></data-table-column>
              <data-table-column prop="op" label="操作" align="center" width="170">
                <template slot-scope="scope">
                  <el-button :disabled="scope.row.acStat === '3'" type="text" @click="handleEditUser(scope.row)" size="mini" icon="el-icon-edit" title="编辑" />
                  <el-button type="text" @click="handleDelUser(scope.row)" size="mini" icon="el-icon-delete" title="删除" />
                  <el-button :disabled="scope.row.acStat === '3'" type="text" @click="handlePwdRest(scope.row)" size="mini" icon="icon-ali ali-key" title="重置密码" />
                  <el-button :disabled="scope.row.acStat === '2' || scope.row.acStat === '3'" type="text" @click="handleUserLock(false, scope.row)" size="mini" icon="icon-fa fa-lock" title="锁定"></el-button>
                  <el-button :disabled="scope.row.acStat === '1' || scope.row.acStat === '3'" type="text" @click="handleUserUnlock(false, scope.row)" size="mini" icon="icon-fa fa-unlock" title="解锁"></el-button>
                  <el-button :disabled="scope.row.acStat === '3'" type="text" @click="handleUserDest(false, scope.row)" size="mini" icon="el-icon-switch-button" title="注销"></el-button>
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <!-- 用户信息修改|添加面板 -->
    <dialog-drag title="用户信息编辑" :visible.sync="showUserDia">
      <span slot="title"> <i class="el-icon-edit margin-right-4"></i>用户信息编辑 </span>
      <user-mgr-edit :initData="editUser" @updataData="doUpdataUser" @close="showUserDia = false"></user-mgr-edit>
    </dialog-drag>
  </flex-container>
</template>

<script>
import SysUserMgrApi from "@/api/usrm/sysUserMgrApi.js";
import SysOrgMgrApi from "@/api/usrm/sysOrgMgrApi.js";
import UserMgrEdit from "./UserMgr_edit";

//默认的用户信息
let DefaultUser = {
  uuid: null,
  // 用户名
  acName: "",
  // 密码
  acPwd: "",
  // 隶属组织
  orgUuid: "",
  // 盐
  encSalt: "",
  // 状态:1、正常 2、锁定 3、注销
  acStat: "",
  // 最后登录时间
  lastLogDate: "",
  // 用户名
  userName: "",
  // 性别
  userSex: "",
  // 联系电话
  userPhone: "",
  // 邮件
  userEmail: "",
  // 生日
  userBirthday: "",
  // 创建人
  createdUser: "",
  // 创建时间
  createdTime: "",
  // 更新人
  updatedUser: "",
  // 更新时间
  updatedTime: "",
  roleUuids: [],
};

export default {
  components: {
    UserMgrEdit,
  },
  provide() {
    return {
      orgTree: this.orgTree,
      orgTreeProps: this.orgTreeProps,
    };
  },
  data() {
    return {
      tableSelection: [],
      //组织树
      orgTree: [],
      //组织下拉配置
      orgTreeProps: {
        checkStrictly: true,
        emitPath: false,
        value: "uuid",
        label: "orgName",
      },
      //组织反显配置
      orgViewProps: {
        checkStrictly: true,
        emitPath: false,
        value: "uuid",
        label: "orgName",
      },
      //显示用户信息修改|添加面板
      showUserDia: false,
      //用户信息查询form
      userForm: {
        // 用户名
        userName: "",
        // 状态:1、正常 2、锁定 3、注销
        userStat: "",
        // 性别
        userSex: "",
        orgUuid: "",
      },
      // 最后登录时间
      lastLogDate: [],
      //分页参数
      pageOptions: {
        pagerCount: 5,
      },
      //组件传值
      editUser: {},
    };
  },
  mounted() {
    this.initOrgTree();
  },
  methods: {
    //初始化组织下拉
    async initOrgTree() {
      try {
        let resp = await SysOrgMgrApi.getOrgTree();
        this.$utils.eachTree(resp.data, (item) => {
          if (item.children.length === 0) delete item.children;
        });
        this.$utils.clear(this.orgTree);
        resp.data.forEach((element) => this.orgTree.push(element));
      } catch (error) {}
    },
    //用户信息查询接口
    loadUser(params) {
      return SysUserMgrApi.querySysUser(params);
    },
    //查询按钮
    handleQueryUser() {
      //处理时间
      let params = Object.assign({}, this.userForm);
      if (this.lastLogDate && this.lastLogDate.length === 2) {
        Object.assign(params, {
          lastLogDateStart: this.lastLogDate[0].getTime(),
          lastLogDateEnd: this.lastLogDate[1].getTime(),
        });
      }
      this.$refs["userTable"].loadData(params, true);
    },
    //修改用户信息
    handleEditUser(row) {
      this.editUser = Object.assign({}, row);
      this.showUserDia = true;
    },
    //添加用户信息
    handleAddUser() {
      this.editUser = Object.assign({}, DefaultUser);
      this.showUserDia = true;
    },
    //删除用户信息
    async handleDelUser(row) {
      try {
        let resp = await SysUserMgrApi.delSysUser([row.uuid]);
      } finally {
        this.handleQueryUser();
      }
    },
    //锁定用户
    async handleUserLock(isSelect, row) {
      try {
        let uuids = [];
        if (isSelect) {
          this.tableSelection.forEach((value) => {
            uuids.push(value.uuid);
          });
        } else {
          uuids.push(row.uuid);
        }
        await SysUserMgrApi.userLock(uuids);
      } catch (error) {
      } finally {
        this.handleQueryUser();
      }
    },
    //解锁用户
    async handleUserUnlock(isSelect, row) {
      try {
        let uuids = [];
        if (isSelect) {
          this.tableSelection.forEach((value) => {
            uuids.push(value.uuid);
          });
        } else {
          uuids.push(row.uuid);
        }
        await SysUserMgrApi.userUnlock(uuids);
      } catch (error) {
      } finally {
        this.handleQueryUser();
      }
    },
    //用户注销
    async handleUserDest(isSelect, row) {
      try {
        await this.$confirm("此操作会将用户置于最终状态且不可逆, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let uuids = [];
        if (isSelect) {
          this.tableSelection.forEach((value) => {
            uuids.push(value.uuid);
          });
        } else {
          uuids.push(row.uuid);
        }
        await SysUserMgrApi.userDest(uuids);
      } catch (error) {
      } finally {
        this.handleQueryUser();
      }
    },
    //用户信息更新回调
    async doUpdataUser(data) {
      try {
        await SysUserMgrApi.saveSysUser(data);
        this.showUserDia = false;
        this.handleQueryUser();
      } catch (error) {}
    },
    //重置密码
    async handlePwdRest(row) {
      try {
        await this.$confirm("此操作将重置该账户密码,且不可撤销, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await SysUserMgrApi.pwdRest([row.uuid]);
      } catch (error) {}
    },
  },
};
</script>
