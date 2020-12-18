/**
 * @Author: Sun Rising 
 * @Date: 2019-06-12 15:25:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-12-18 15:53:04
 * @Description: 角色管理
 */
<template>
  <flex-container wrap="nowrap" justifyContent="space-between">
    <flex-item :grow="1" width="100%">
      <el-card>
        <flex-container slot="header" justifyContent="space-between">
          <flex-item alignItems="center"> <i class="el-icon-user margin-right-6 font-size-16"></i>角色管理 </flex-item>
          <flex-item alignItems="center">
            <el-button type="primary" size="mini" @click="handleAddRole" circle icon="el-icon-plus" title="添加"></el-button>
            <el-button type="primary" @click="handleQueryRole" size="mini" circle icon="el-icon-search" title="查询"></el-button>
            <el-button size="mini" @click="$refs['roleForm'].resetFields()" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap="nowrap">
          <flex-item class="margin-bottom-10">
            <el-form ref="roleForm" :model="roleForm" label-position="right" label-width="90px" class="form-style-line">
              <el-row>
                <col-pr>
                  <el-form-item label="隶属组织 :" prop="orgUuid">
                    <el-cascader :options="orgTree" v-model="roleForm.orgUuid" :props="orgTreeProps" clearable></el-cascader>
                  </el-form-item>
                </col-pr>
                <col-pr>
                  <el-form-item label="角色编码 :" prop="roleCode">
                    <el-input v-model="roleForm.roleCode" maxlength="50" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr>
                  <el-form-item label="角色名称 :" prop="roleName">
                    <el-input v-model="roleForm.roleName" maxlength="50" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="roleTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func="loadRole" :pageOptions="pageOptions">
              <data-table-column prop="roleName" label="角色名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="roleCode" label="角色编码" show-overflow-tooltip></data-table-column>
              <data-table-column prop="orgUuid" label="隶属组织" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-cascader class="cascader-table-disabled" :options="orgTree" :value="scope.row.orgUuid" :props="orgViewProps" disabled></el-cascader>
                </template>
              </data-table-column>
              <data-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip></data-table-column>
              <data-table-column prop="op" label="操作" align="center" width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleEditRole(scope.row)" size="mini" icon="el-icon-edit" title="编辑" />
                  <el-button type="text" @click="handleDelRole(scope.row)" size="mini" icon="el-icon-delete" title="删除" />
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <!-- 角色修改|添加面板 -->
    <dialog-drag title="角色编辑" :visible.sync="showRoleDia" top="8vh">
      <span slot="title"> <i class="el-icon-edit margin-right-4"></i>角色编辑 </span>
      <role-mgr-edit :initData="editRole" @updataData="doUpdataRole" @close="showRoleDia = false"></role-mgr-edit>
    </dialog-drag>
  </flex-container>
</template>

<script>
import SysRoleMgrApi from "@/api/usrm/sysRoleMgrApi.js";
import SysOrgMgrApi from "@/api/usrm/sysOrgMgrApi.js";
import SysPermMgrApi from "@/api/usrm/sysPermMgrApi.js";
import RoleMgrEdit from "./Role_edit";

//默认的角色
let DefaultRole = {
  uuid: null,
  // 隶属组织
  orgUuid: "",
  // 角色编码
  roleCode: "",
  // 角色名称
  roleName: "",
  // 角色描述
  roleDesc: "",
  // 创建人
  createdUser: "",
  // 创建时间
  createdTime: "",
  // 更新人
  updatedUser: "",
  // 更新时间
  updatedTime: "",
  //权限资源集合
  permUuids: null,
};

export default {
  components: {
    RoleMgrEdit,
  },
  provide() {
    return {
      orgTree: this.orgTree,
      orgTreeProps: this.orgTreeProps,
      permMap: this.permMap,
    };
  },
  data() {
    return {
      //权限资源
      permMap: [],
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
      //显示角色修改|添加面板
      showRoleDia: false,
      //角色查询form
      roleForm: {
        // 隶属组织
        orgUuid: "",
        // 角色编码
        roleCode: "",
        // 角色名称
        roleName: "",
      },
      //分页参数
      pageOptions: {
        pagerCount: 5,
      },
      //组件传值
      editRole: {},
    };
  },
  mounted() {
    this.initOrgTree();
    this.initPermMap();
  },
  methods: {
    //初始化权限资源
    async initPermMap() {
      let resp = await SysPermMgrApi.getPermMap();
      this.$utils.clear(this.permMap);
      Object.keys(resp.data).forEach((key) => {
        let data;
        if (key === "1")
          data = this.$utils.toArrayTree(resp.data[key], {
            key: "menuUrl",
            parentKey: "menuParent",
            children: "children",
            sortKey: "menuOrde",
          });
        this.permMap.push({
          key: key,
          label: "菜单资源",
          data: data,
        });
      });
    },
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
    //角色查询接口
    loadRole(params) {
      return SysRoleMgrApi.querySysRole(params);
    },
    //查询按钮
    handleQueryRole() {
      this.$refs["roleTable"].loadData(this.roleForm, true);
    },
    //修改角色
    handleEditRole(row) {
      this.editRole = Object.assign({}, row);
      this.showRoleDia = true;
    },
    //添加角色
    handleAddRole() {
      this.editRole = Object.assign({}, DefaultRole);
      this.showRoleDia = true;
    },
    //删除角色
    async handleDelRole(row) {
      try {
        await SysRoleMgrApi.delSysRole([row.uuid]);
      } finally {
        this.handleQueryRole();
      }
    },
    //角色更新回调
    async doUpdataRole(data) {
      try {
        await SysRoleMgrApi.saveSysRole(data);
      } finally {
        this.handleQueryRole();
      }
    },
  },
};
</script>
