/**
 * @Author: Sun Rising 
 * @Date: 2019-06-12 15:25:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:56:06
 * @Description: 字典管理
 */
<template>
  <flex-container wrap='nowrap' justifyContent='space-between'>

    <flex-item :grow='1' width='40%'>
      <el-card>
        <flex-container slot="header" justifyContent='space-between'>
          <flex-item alignItems='center'>
            <i class="icon-fa fa-book margin-right-6 font-size-16"></i>字典组
          </flex-item>
          <flex-item alignItems='center'>
            <el-button type="primary" size="mini" @click="handleAddDictGroup" circle icon="el-icon-plus" title="添加"></el-button>
            <el-button type="primary" @click="handleQueryDictGroup" size="mini" circle icon="el-icon-search" title="查询"></el-button>
            <el-button size="mini" @click="$refs['dictGroupForm'].resetFields()" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap='nowrap'>
          <flex-item class="margin-bottom-10">
            <el-form ref="dictGroupForm" :model="dictGroupForm" label-position="right" label-width="50px" class="form-style-line">
              <el-row>
                <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
                  <el-form-item label="名称 :" prop="groupName">
                    <el-input v-model="dictGroupForm.groupName" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
                  <el-form-item label="索引 :" prop="groupKey">
                    <el-input v-model="dictGroupForm.groupKey" maxlength="50" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
                  <el-form-item label="类型 :" prop="dictType">
                    <dict-select v-model="dictGroupForm.dictType" dict-key='DictType' placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
                  <el-form-item label="状态 :" prop="groupStat">
                    <dict-select v-model="dictGroupForm.groupStat" dict-key='GroupStat' placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="dictGroupTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func='loadDictGroup' :pageOptions='pageOptions' @current-change='doDictGroupCurrChange'>
              <data-table-column prop="groupName" label="名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="groupKey" label="索引" show-overflow-tooltip></data-table-column>
              <data-table-column prop="dictType" label="类型" show-overflow-tooltip :formatter='row=>$utils.tableColDictFormt("DictType",row.dictType)'></data-table-column>
              <data-table-column prop="groupStat" label="状态" show-overflow-tooltip :formatter='row=>$utils.tableColDictFormt("GroupStat",row.groupStat)'></data-table-column>
              <data-table-column prop="op" label="操作" align='center' width='80'>
                <template slot-scope="scope">
                  <el-button type="text" @click="e=>handleEditDictGroup(scope.row,e)" size="mini" icon="el-icon-edit" title="编辑" />
                  <el-button type="text" @click="e=>handleDelDictGroup(scope.row,e)" size="mini" icon="el-icon-delete" title="删除" />
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <flex-item :grow='1' width='40%' class="margin-left-10" v-if="showDictItem">
      <DictMgrItemSelect v-if="currDictGroup.dictType==='1'" :initData='currDictGroup' @close='doCloseDictItem'></DictMgrItemSelect>
      <DictMgrItemTree v-if="currDictGroup.dictType==='2'" :initData='currDictGroup' @close='doCloseDictItem'></DictMgrItemTree>
    </flex-item>

    <!-- 字典组修改|添加面板 -->
    <dialog-drag title="字典组编辑" :visible.sync="showDictGroupDia">
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>字典组编辑
      </span>
      <dictMgr-group-edit :initData='editDictGroup' @updataData='doUpdataDictGroup' @close='showDictGroupDia=false'></dictMgr-group-edit>
    </dialog-drag>

  </flex-container>
</template>

<script>
import SysDictMgrApi from "@/api/sysm/sysDictMgrApi.js";
import DictMgrGroupEdit from "./DictMgr_group_edit";
import DictMgrItemSelect from "./DictMgr_item_select";
import DictMgrItemTree from "./DictMgr_item_tree";

//默认的字典组
let DefaultDictGroup = {
  groupName: "",
  groupKey: "",
  dictType: "",
  groupStat: ""
};

export default {
  components: {
    DictMgrGroupEdit,
    DictMgrItemSelect,
    DictMgrItemTree
  },
  data() {
    return {
      //显示字典值面板
      showDictItem: false,
      //显示字典组修改|添加面板
      showDictGroupDia: false,
      //显示字典值修改|添加面板
      showDictItemDia: false,
      //字典组查询form
      dictGroupForm: {
        groupName: "",
        groupKey: "",
        dictType: "",
        groupStat: ""
      },
      //分页参数
      pageOptions: {
        pagerCount: 5
      },
      //选择的字典组
      currDictGroup: null,
      //组件传值
      editDictGroup: {}
    };
  },
  methods: {
    //字典组查询接口
    loadDictGroup(params) {
      return SysDictMgrApi.querySysDictGroup(params);
    },
    //查询按钮
    handleQueryDictGroup() {
      this.$refs["dictGroupTable"].loadData(this.dictGroupForm);
    },
    //修改字典组
    handleEditDictGroup(row, e) {
      e.stopPropagation();
      this.editDictGroup = Object.assign({}, row);
      this.showDictGroupDia = true;
    },
    //添加字典组
    handleAddDictGroup() {
      this.editDictGroup = Object.assign({}, DefaultDictGroup);
      this.showDictGroupDia = true;
    },
    //删除字典组
    async handleDelDictGroup(row, e) {
      try {
        e.stopPropagation();
        await SysDictMgrApi.delSysDictGroup([row.uuid]);
      } finally {
        this.handleQueryDictGroup();
      }
    },
    //选择的字典组发生变化
    doDictGroupCurrChange(row) {
      if (row && row.uuid) {
        this.currDictGroup = Object.assign({}, row);
        if (!this.showDictItem) this.showDictItem = true;
      } else {
        if (this.showDictItem) this.showDictItem = false;
      }
    },
    //关闭select面板
    doCloseDictItem() {
      this.$refs["dictGroupTable"].getEl().setCurrentRow();
      this.showDictItem = false;
    },
    //字典组更新回调
    async doUpdataDictGroup(data) {
      try {
        await SysDictMgrApi.saveSysDictGroup(data);
      } finally {
        this.handleQueryDictGroup();
      }
    }
  }
};
</script>
