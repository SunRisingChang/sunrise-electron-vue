/**
 * @Author: Sun Rising 
 * @Date: 2019-06-26 12:57:43 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-25 22:42:40
 * @Description: 组织管理
 */
<template>
  <flex-container direction="column" wrap="nowrap">
    <!-- 查询面板 -->
    <flex-item class="margin-bottom-10" v-show="showQuery">
      <el-card>
        <flex-container slot="header" justifyContent="space-between">
          <flex-item alignItems="center">
            <i class="el-icon-s-operation margin-right-6 font-size-16"></i>查询参数
          </flex-item>
          <flex-item alignItems="center">
            <el-button type="primary" size="mini" @click="handleQuery" circle icon="el-icon-search" title="查询"></el-button>
            <el-button size="mini" @click="$refs['queryForm'].resetFields()" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
          </flex-item>
        </flex-container>
        <el-form ref="queryForm" :model="queryForm" label-position="right" label-width="80px" class="form-style-line">
          <el-row>
            <col-pr :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <el-form-item label="组织名称 :" prop="orgName">
                <el-input v-model="queryForm.orgName" maxlength="10" show-word-limit></el-input>
              </el-form-item>
            </col-pr>
            <col-pr :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <el-form-item label="组织简称 :" prop="orgBrfName">
                <el-input v-model="queryForm.orgBrfName" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </col-pr>
            <col-pr :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <el-form-item label="组织状态 :" prop="orgStat">
                <el-select v-model="queryForm.orgStat" placeholder="请选择">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="禁用" value="2"></el-option>
                  <el-option label="注销" value="3"></el-option>
                </el-select>
              </el-form-item>
            </col-pr>
            <col-pr :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <el-form-item label="更新时间 :" prop="updatedTime">
                <el-date-picker v-model="queryForm.updatedTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </col-pr>
          </el-row>
        </el-form>
      </el-card>
    </flex-item>
    <!-- 结果面板 -->
    <flex-item :grow="1">
      <el-card>
        <flex-container slot="header" justifyContent="space-between">
          <flex-item alignItems="center">
            <i class="icon-fa fa-sitemap margin-right-6 font-size-16"></i>
            <span class="margin-right-4">系统组织</span>
            <el-tooltip v-if="isSort&&sysOrg.children&&sysOrg.sysOrg.length>0" content="排序已修改,请保存 !" placement="right">
              <i class="el-icon-warning icon-color-danger"></i>
            </el-tooltip>
          </flex-item>
          <flex-item alignItems="center">
            <el-button :loading="treeLoading" size="mini" @click="handleSaveSysOrg" circle icon="icon-ali ali-gongju-" title="排序整理"></el-button>
            <el-button :loading="treeLoading" size="mini" @click="doLoadTree" circle icon="el-icon-refresh" title="刷新"></el-button>
            <el-button :loading="treeLoading" size="mini" plain @click="handleExpandSwitch" circle :icon="isTreeExpand?'icon-ali ali-tuceng':'icon-ali ali-tuceng1'" :title="isTreeExpand?'全部折叠':'全部展开'"></el-button>
            <el-button :loading="treeLoading" size="mini" plain @click="handleShowQuery" circle :icon="!showQuery?'el-icon-caret-top':'el-icon-caret-bottom'" :title="!showQuery?'显示查询面板':'隐藏查询面板'"></el-button>
          </flex-item>
        </flex-container>
        <el-tree v-loading="treeLoading" ref="orgTree" :data="sysOrg" :node-key="orgTreeProps.key" :props="orgTreeProps" default-expand-all draggable :allow-drop="doAllowDropNode" :render-content="doRenderTreeContent" :filter-node-method="doFilterNode"></el-tree>
      </el-card>
    </flex-item>
    <!-- 编辑面板 -->
    <dialog-drag title="编辑数据" :visible.sync="OrgEditVisible">
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>编辑数据
      </span>
      <org-edit :initData="editSysOrg" @updataData="doUpdataData" @close="OrgEditVisible=false"></org-edit>
    </dialog-drag>
  </flex-container>
</template>
<script>
import SysOrgMgrApi from "@/api/usrm/sysOrgMgrApi";
import OrgEdit from "./OrgMgr_edit";

//默认的组织实体模型
const DefaultOrgModel = {
  uuid: null,
  // 唯一编号
  orgCode: "",
  // 父组织
  orgPare: "",
  // 组织名称
  orgName: "",
  // 组织简称
  orgBrfName: "",
  // 组织描述
  orgDesc: "",
  // 组织负责人
  orgMast: "",
  // 组织地址
  orgAddr: "",
  // 组织邮编
  orgPost: "",
  // 组织电话
  orgPhone: "",
  // 组织状态;1、正常 2、禁用 3、注销
  orgStat: "1",
  // 组织排序
  orgOrde: 0,
  // 创建人
  createdUser: null,
  // 创建时间
  createdTime: 0,
  // 更新人
  updatedUser: null,
  // 更新时间
  updatedTime: 0
};

//根节点code
const TreeRootOrgCode = "ROOT";

export default {
  name: "OrgMgr",
  components: { OrgEdit },
  data() {
    return {
      //树加载
      treeLoading: false,
      //树展开
      isTreeExpand: true,
      //组织是否修改
      isSort: false,
      //显示查询界面
      showQuery: false,
      //查询表单
      queryForm: {
        orgName: "",
        orgBrfName: "",
        orgStat: "",
        updatedTime: []
      },
      //添加组织弹出层
      OrgAddVisible: false,
      //编辑组织弹出层
      OrgEditVisible: false,
      //系统组织
      sysOrg: [],
      //传递组织所有的子节点key
      sysOrgKeys: [],
      //传递编辑的组织数据
      editSysOrg: {},
      //组织树配置
      orgTreeProps: {
        children: "children",
        label: "orgName",
        key: "orgCode"
      }
    };
  },
  mounted() {
    this.doLoadTree();
  },
  methods: {
    //保存系统组织
    async handleSaveSysOrg() {
      try {
        if (this.sysOrg[0].children.length === 0) {
          return;
        }
        this.treeLoading = true;
        //补全排序字段
        this.$utils.addTreeSort(this.sysOrg[0].children, "orgOrde");
        //树结构转数组
        let sysOrgArray = this.$utils.toTreeArray(this.sysOrg[0].children);
        sysOrgArray.forEach(item => delete item.children);
        //发送请求
        let resp = await SysOrgMgrApi.saveSysOrg(sysOrgArray);
        this.isSort = false;
        await this.doLoadTree();
      } catch (error) {
        this.$alert("数据提交失败 !");
      } finally {
        this.treeLoading = false;
      }
    },
    //查询树
    handleQuery() {
      this.$refs["orgTree"].filter(this.queryForm);
    },
    //切换显示查询卡片
    handleShowQuery() {
      this.showQuery = !this.showQuery;
    },
    //切换树展开
    handleExpandSwitch() {
      this.isTreeExpand = !this.isTreeExpand;
      this.$utils.treeExpandSwitch(this.$refs["orgTree"], this.isTreeExpand);
    },
    //加载初始组织
    async doLoadTree() {
      try {
        this.treeLoading = true;
        let resp = await SysOrgMgrApi.getSysOrg();
        await this.$utils.sleep(3000);
        let _sysOrg = this.$utils.toArrayTree(resp.data, {
          key: "orgCode",
          parentKey: "orgPare",
          children: "children",
          sortKey: "orgOrde"
        });
        this.sysOrg = [
          {
            orgName: "组织机构树",
            orgBrfName: TreeRootOrgCode,
            orgCode: TreeRootOrgCode,
            children: _sysOrg
          }
        ];
      } catch (error) {
        this.$alert("数据加载失败 !");
      } finally {
        this.treeLoading = false;
      }
    },
    //确认编辑
    async doUpdataData(data) {
      try {
        this.treeLoading = true;
        let updata = [data];
        if (this.editSysOrg.orgStat !== data.orgStat && data.orgStat !== "1") {
          let treeVNode = this.$refs["orgTree"].getNode(data.orgCode);
          this.$utils.eachTree(treeVNode.data.children, item => {
            item.orgStat = data.orgStat;
            updata.push(item);
          });
        }
        await SysOrgMgrApi.saveSysOrg(updata);
        await this.doLoadTree();
      } catch (error) {
      } finally {
        this.treeLoading = false;
      }
    },
    //添加按钮组织
    doAddButtonNode(node, data) {
      this.editSysOrg = Object.assign({}, DefaultOrgModel, {
        orgPare: data.orgCode,
        createdTime: this.$utils.now(),
        updatedTime: this.$utils.now()
      });
      this.OrgEditVisible = true;
    },
    //树节点过滤
    doFilterNode(value, data) {
      if (data.orgCode === TreeRootOrgCode) return true;
      let isOrgName = data.orgName.includes(value.orgName);
      let isOrgBrfName = data.orgBrfName.includes(value.orgBrfName);
      let isOrgStat = data.orgStat.includes(value.orgStat);
      let isUpdatedTime = true;
      if (value.updatedTime && value.updatedTime.length === 2) {
        isUpdatedTime = value.updatedTime[0].getTime() <= data.updatedTime && data.updatedTime <= value.updatedTime[1].getTime();
      }
      return isOrgName && isOrgBrfName && isOrgStat && isUpdatedTime;
    },
    //可否放置
    doAllowDropNode(draggingNode, dropNode, type) {
      let is = draggingNode.parent.id === dropNode.parent.id && type !== "inner";
      if (is) this.isSort = true;
      return is;
    },
    //移除node
    async doRemoveNode(node, data) {
      try {
        await this.doMessageBox();
        if (data.uuid) await SysOrgMgrApi.delSysOrg([data.uuid]);
        this.$refs["orgTree"].remove(data[this.orgTreeProps.key]);
        this.isSort = true;
      } catch (error) {}
    },
    //修改node
    doEditNode(data) {
      this.editSysOrg = data;
      this.OrgEditVisible = true;
    },
    //通用的操作确认弹出层
    doMessageBox(message, title, type) {
      return this.$confirm(message ? message : "确定进行此操作!", title ? title : "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type ? type : "warning"
      });
    },
    //渲染树
    doRenderTreeContent(h, { node, data, store }) {
      //----------------- 添加按钮组织 开始 -------------------------------
      let addButtonGroup = [];
      let addButton = (
        <el-button
          type="text"
          size="mini"
          icon="el-icon-plus"
          title="添加按钮"
          on-click={e => {
            this.doAddButtonNode(node, data);
            e.stopPropagation();
          }}
        />
      );
      let editButton = (
        <el-button
          type="text"
          size="mini"
          icon="el-icon-edit"
          title="编辑"
          on-click={e => {
            this.doEditNode(data);
            e.stopPropagation();
          }}
        />
      );
      let delButton = (
        <el-button
          size="mini"
          type="text"
          icon="el-icon-delete"
          title="删除"
          on-click={e => {
            this.doRemoveNode(node, data);
            e.stopPropagation();
          }}
        />
      );

      if (data.children && data.orgCode === TreeRootOrgCode) {
        addButtonGroup.push(addButton);
      } else if (data.children && data.orgCode !== TreeRootOrgCode) {
        addButtonGroup.push(addButton);
        addButtonGroup.push(editButton);
        addButtonGroup.push(delButton);
      }

      //----------------- 添加按钮组织 结束 -------------------------------
      //----------------- 图标区 开始 ------------------------------------
      let _orgIcon = "icon-size-14";
      if (data.orgStat != 1 && data.orgCode !== TreeRootOrgCode) {
        _orgIcon = _orgIcon + " icon-color-danger";
      }
      if (data.orgStat == 1 && data.orgCode !== TreeRootOrgCode) {
        _orgIcon = _orgIcon + " icon-color-info";
      }
      if (data.orgCode === TreeRootOrgCode) {
        _orgIcon = _orgIcon + " icon-color-primary";
      }
      //----------------- 图标区 结束 ------------------------------------
      return (
        <flex-container wrap="nowrap" alignItems="center" justifyContent="space-between">
          <flex-item alignItems="center">
            <el-tooltip content={data.orgCode} placement="right">
              <span class={_orgIcon}>{node.label}</span>
            </el-tooltip>
          </flex-item>
          <flex-item alignItems="center" class="margin-right-5">
            {addButtonGroup}
          </flex-item>
        </flex-container>
      );
    }
  }
};
</script>

