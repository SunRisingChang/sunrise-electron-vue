/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 16:09:11 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:57:13
 * @Description: 字典值 列表类型 面板
 */
<template>
  <el-card>

    <flex-container slot="header" justifyContent='space-between'>
      <flex-item alignItems='center'>
        <i class="el-icon-s-operation margin-right-6 font-size-16"></i>组数据
      </flex-item>
      <flex-item alignItems='center'>
        <el-button type="primary" size="mini" @click="handleAddDictItem" circle icon="el-icon-plus" title="添加"></el-button>
        <el-button type="primary" @click="handleQueryDictItem" size="mini" circle icon="el-icon-search" title="查询"></el-button>
        <el-button size="mini" @click="$refs['dictItemForm'].resetFields()" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
        <el-button size="mini" @click="$emit('close')" circle plain icon="el-icon-close" title="关闭面板"></el-button>
      </flex-item>
    </flex-container>

    <flex-container direction="column" wrap='nowrap'>

      <flex-item class="margin-bottom-10">
        <el-form ref="dictItemForm" :model="dictItemForm" label-position="right" label-width="55px" class="form-style-line">
          <el-row>
            <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
              <el-form-item label="名称 :" prop="dictName">
                <el-input v-model="dictItemForm.dictName" maxlength="10" show-word-limit></el-input>
              </el-form-item>
            </col-pr>
            <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
              <el-form-item label="Key :" prop="dictKey">
                <el-input v-model="dictItemForm.dictKey" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </col-pr>
            <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
              <el-form-item label="Value :" prop="dictValue">
                <el-input v-model="dictItemForm.dictValue" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </col-pr>
            <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
              <el-form-item label="状态 :" prop="dictStat">
                <dict-select v-model="dictItemForm.dictStat" dict-key='GroupStat' placeholder="请选择" clearable></dict-select>
              </el-form-item>
            </col-pr>
          </el-row>
        </el-form>
      </flex-item>

      <flex-item>
        <data-table ref="dictItemTable" border index highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func='loadDictItem' :pageOptions='pageOptions'>
          <data-table-column prop="dictName" label="名称" show-overflow-tooltip></data-table-column>
          <data-table-column prop="dictKey" label="Key" show-overflow-tooltip></data-table-column>
          <data-table-column prop="dictValue" label="Value" show-overflow-tooltip></data-table-column>
          <data-table-column prop="dictStat" label="状态" show-overflow-tooltip :formatter='row=>$utils.tableColDictFormt("GroupStat",row.dictStat)'></data-table-column>
          <data-table-column prop="op" label="操作" align='center' width='80'>
            <template slot-scope="scope">
              <el-button type="text" @click="handleEditDictItem(scope.row)" size="mini" icon="el-icon-edit" title="编辑" />
              <el-button type="text" @click="handleDelDictItem(scope.row)" size="mini" icon="el-icon-delete" title="删除" />
            </template>
          </data-table-column>
        </data-table>
      </flex-item>

    </flex-container>

    <!-- 组数据修改|添加面板 -->
    <dialog-drag title="组数据编辑" :visible.sync="showDictItemDia">
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>组数据编辑
      </span>
      <dictMgr-item-edit :initData='editDictItem' @updataData='doUpdataDictItem' @close='showDictItemDia=false'></dictMgr-item-edit>
    </dialog-drag>

  </el-card>
</template>

<script>
import SysDictMgrApi from "@/api/sysm/sysDictMgrApi.js";
import DictMgrItemEdit from "./DictMgr_item_edit";

//默认的字典列表值
let DefaultDictSelectItem = {
  dictName: "",
  dictKey: "",
  dictValue: "",
  dictOrde: 0,
  dictPuuid: "",
  dictStat: "1"
};

export default {
  components: {
    DictMgrItemEdit
  },
  props: {
    initData: {
      type: Object
    }
  },
  data() {
    return {
      //分页参数
      pageOptions: {
        pagerCount: 5
      },
      //表单数据
      dictItemForm: {
        dictName: "",
        dictKey: "",
        dictValue: "",
        dictStat: ""
      },
      //显示编辑
      showDictItemDia: false,
      //数据传递
      editDictItem: {}
    };
  },
  watch: {
    "initData.uuid": {
      handler(val) {
        this.$nextTick(() => {
          if (val) this.$refs["dictItemTable"].loadData({ groupUuid: val });
        });
      },
      immediate: true
    }
  },
  methods: {
    //字典组查询接口
    loadDictItem(params) {
      return SysDictMgrApi.querySysDictSelectItem(params);
    },
    //修改字典组
    handleEditDictItem(row) {
      this.editDictItem = Object.assign({}, row);
      this.showDictItemDia = true;
    },
    //添加按钮
    handleAddDictItem() {
      this.editDictItem = Object.assign({}, DefaultDictSelectItem, {
        groupUuid: this.initData.uuid
      });
      this.showDictItemDia = true;
    },
    //查询按钮
    handleQueryDictItem() {
      this.$refs["dictItemTable"].loadData(
        Object.assign(this.dictItemForm, { groupUuid: this.initData.uuid })
      );
    },
    //删除字典组
    async handleDelDictItem(row) {
      try {
        let resp = await SysDictMgrApi.delSysDictItem([row.uuid]);
      } finally {
        this.handleQueryDictItem();
      }
    },
    //字典值更新回调
    async doUpdataDictItem(data) {
      try {
        await SysDictMgrApi.saveSysDictItem([data]);
      } finally {
        this.handleQueryDictItem();
      }
    }
  }
};
</script>
