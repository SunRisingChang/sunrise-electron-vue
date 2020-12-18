/**
 * @Author: Sun Rising 
 * @Date: 2019-06-12 15:25:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-12-18 15:52:55
 * @Description: 权限管理
 */
<template>
  <flex-container wrap="nowrap" justifyContent="space-between">
    <flex-item :grow="1" width="100%">
      <el-card>
        <flex-container slot="header" justifyContent="space-between">
          <flex-item alignItems="center"> <i class="icon-fa fa-shield margin-right-6 font-size-16"></i>权限管理 </flex-item>
          <flex-item alignItems="center">
            <el-button type="primary" size="mini" @click="handleAddPerm" circle icon="el-icon-plus" title="添加"></el-button>
            <el-button type="primary" @click="handleQueryPerm" size="mini" circle icon="el-icon-search" title="查询"></el-button>
            <el-button size="mini" @click="$refs['permForm'].resetFields()" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap="nowrap">
          <flex-item class="margin-bottom-10">
            <el-form ref="permForm" :model="permForm" label-position="right" label-width="90px" class="form-style-line">
              <el-row>
                <col-pr>
                  <el-form-item label="资源类型 :" prop="permType">
                    <dict-select v-model="permForm.permType" dict-key="PermType" placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
                <col-pr>
                  <el-form-item label="隶属表 :" prop="permTable">
                    <el-input v-model="permForm.permTable" maxlength="50" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr>
                  <el-form-item label="权限状态 :" prop="permStat">
                    <dict-select v-model="permForm.permStat" dict-key="PermStat" placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="permTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func="loadPerm" :pageOptions="pageOptions">
              <data-table-column prop="permType" label="资源类型" show-overflow-tooltip :formatter="(row) => $utils.tableColDictFormt('PermType', row.permType)"></data-table-column>
              <data-table-column prop="permTable" label="隶属表" show-overflow-tooltip></data-table-column>
              <data-table-column prop="permStat" label="状态" show-overflow-tooltip :formatter="(row) => $utils.tableColDictFormt('PermStat', row.permStat)"></data-table-column>
              <data-table-column prop="permDesc" label="描述" show-overflow-tooltip></data-table-column>
              <data-table-column prop="op" label="操作" align="center" width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleEditPerm(scope.row)" size="mini" icon="el-icon-edit" title="编辑" />
                  <el-button type="text" @click="handleDelPerm(scope.row)" size="mini" icon="el-icon-delete" title="删除" />
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <!-- 权限修改|添加面板 -->
    <dialog-drag title="权限编辑" :visible.sync="showPermDia">
      <span slot="title"> <i class="el-icon-edit margin-right-4"></i>权限编辑 </span>
      <perm-mgr-edit :initData="editPerm" @updataData="doUpdataPerm" @close="showPermDia = false"></perm-mgr-edit>
    </dialog-drag>
  </flex-container>
</template>

<script>
import SysPermMgrApi from "@/api/usrm/sysPermMgrApi.js";
import PermMgrEdit from "./PermMgr_edit";

//默认的权限
let DefaultPerm = {
  uuid: null,
  // 资源类型
  permType: "",
  // 权限资源隶属表
  permTable: "",
  // 权限状态;1、正常 2、禁用
  permStat: "",
  // 权限描述
  permDesc: "",
  // 创建人
  createdUser: "",
  // 创建时间
  createdTime: "",
  // 更新人
  updatedUser: "",
  // 更新时间
  updatedTime: "",
};

export default {
  components: {
    PermMgrEdit,
  },
  data() {
    return {
      //显示权限修改|添加面板
      showPermDia: false,
      //权限查询form
      permForm: {
        // 资源类型
        permType: "",
        // 权限资源隶属表
        permTable: "",
        // 权限状态;1、正常 2、禁用
        permStat: "",
      },
      //分页参数
      pageOptions: {
        pagerCount: 5,
      },
      //组件传值
      editPerm: {},
    };
  },
  methods: {
    //权限查询接口
    loadPerm(params) {
      return SysPermMgrApi.querySysPerm(params);
    },
    //查询按钮
    handleQueryPerm() {
      this.$refs["permTable"].loadData(this.permForm, true);
    },
    //修改权限
    handleEditPerm(row) {
      this.editPerm = Object.assign({}, row);
      this.showPermDia = true;
    },
    //添加权限
    handleAddPerm() {
      this.editPerm = Object.assign({}, DefaultPerm);
      this.showPermDia = true;
    },
    //删除权限
    async handleDelPerm(row) {
      try {
        await SysPermMgrApi.delSysPerm([row.uuid]);
      } finally {
        this.handleQueryPerm();
      }
    },
    //权限更新回调
    async doUpdataPerm(data) {
      try {
        await SysPermMgrApi.saveSysPerm(data);
      } finally {
        this.handleQueryPerm();
      }
    },
  },
};
</script>
