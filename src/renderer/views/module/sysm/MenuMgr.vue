/**
 * @Author: Sun Rising 
 * @Date: 2019-01-02 09:34:46 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-26 08:41:23
 * @Description: 菜单管理
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
            <col-pr>
              <el-form-item label="菜单名称 :" prop="menuName">
                <el-input v-model="queryForm.menuName" maxlength="10" show-word-limit></el-input>
              </el-form-item>
            </col-pr>
            <col-pr>
              <el-form-item label="菜单路径 :" prop="menuUrl">
                <el-input v-model="queryForm.menuUrl" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </col-pr>
            <col-pr>
              <el-form-item label="打开方式 :" prop="menuOpenWay">
                <el-select v-model="queryForm.menuOpenWay" placeholder="请选择">
                  <el-option label="当前窗口" :value="1"></el-option>
                  <el-option label="弹出窗口" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </col-pr>
            <col-pr>
              <el-form-item label="是否可见 :" prop="menuVisible">
                <el-radio-group v-model="queryForm.menuVisible">
                  <el-radio :label="1">可见</el-radio>
                  <el-radio :label="0">不可见</el-radio>
                </el-radio-group>
              </el-form-item>
            </col-pr>
            <col-pr :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
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
            <i class="icon-fa fa-bars margin-right-6 font-size-16"></i>
            <span class="margin-right-4">系统菜单</span>
            <el-tooltip v-if="isSort&&sysMenu.length>0" content="排序已修改,请保存 !" placement="right">
              <i class="el-icon-warning icon-color-danger"></i>
            </el-tooltip>
          </flex-item>
          <flex-item alignItems="center">
            <el-button :loading="treeLoading" type="primary" size="mini" @click="handleShowMenuAddDia" circle icon="el-icon-plus" title="添加"></el-button>
            <el-button :loading="treeLoading" size="mini" @click="handleSaveSysMenu" circle icon="icon-ali ali-gongju-" title="排序整理"></el-button>
            <el-button :loading="treeLoading" size="mini" @click="doLoadTree" circle icon="el-icon-refresh" title="刷新"></el-button>
            <el-button :loading="treeLoading" size="mini" plain @click="handleExpandSwitch" circle :icon="isTreeExpand?'icon-ali ali-tuceng':'icon-ali ali-tuceng1'" :title="isTreeExpand?'全部折叠':'全部展开'"></el-button>
            <el-button :loading="treeLoading" size="mini" plain @click="handleShowQuery" circle :icon="!showQuery?'el-icon-caret-top':'el-icon-caret-bottom'" :title="!showQuery?'显示查询面板':'隐藏查询面板'"></el-button>
          </flex-item>
        </flex-container>
        <el-tree v-loading="treeLoading" ref="menuTree" :data="sysMenu" :node-key="menuTreeProps.key" :props="menuTreeProps" default-expand-all draggable :allow-drop="doAllowDropNode" :render-content="doRenderTreeContent" :filter-node-method="doFilterNode"></el-tree>
      </el-card>
    </flex-item>
    <!-- 添加面板 -->
    <dialog-drag title="开发菜单" :visible.sync="MenuAddVisible">
      <span slot="title">
        <i class="icon-fa fa-bars margin-right-4"></i>开发菜单
      </span>
      <menu-add :initData="sysMenuKeys" @updataTree="doUpdataTree" @close="MenuAddVisible=false"></menu-add>
    </dialog-drag>
    <!-- 编辑面板 -->
    <dialog-drag title="编辑数据" :visible.sync="MenuEditVisible">
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>编辑数据
      </span>
      <menu-edit :initData="editSysMenu" @updataData="doUpdataData" @close="MenuEditVisible=false"></menu-edit>
    </dialog-drag>
  </flex-container>
</template>

<script>
import SysMenuMgrApi from "@/api/sysm/sysMenuMgrApi.js";
import MenuAdd from "./MenuMgr_add";
import MenuEdit from "./MenuMgr_edit";

//默认的菜单实体模型
const DefaultMenuModel = {
  uuid: null,
  // 权限标识
  menuKey: null,
  // 权限名称
  menuName: null,
  // 父级权限
  menuParent: null,
  // 顺序序号
  menuOrde: 0,
  // 权限类型;1：菜单组  2：菜单  3：按钮
  menuType: null,
  // 图标
  menuIcon: "el-icon-collection-tag",
  // 菜单地址
  menuUrl: null,
  // 是否可见
  menuVisible: "1",
  // 菜单打开方式;1：当前窗口 2：新窗口弹出
  menuOpenWay: null,
  // 描述
  menuDesc: null,
  // 创建人
  createdUser: null,
  // 创建时间
  createdTime: 0,
  // 更新人
  updatedUser: null,
  // 更新时间
  updatedTime: 0
};

export default {
  name: "MenuMgr",
  components: { MenuAdd, MenuEdit },
  data() {
    return {
      //树加载
      treeLoading: false,
      //树展开
      isTreeExpand: true,
      //菜单是否修改
      isSort: false,
      //显示查询界面
      showQuery: false,
      //查询表单
      queryForm: {
        menuName: "",
        menuUrl: "",
        menuOpenWay: null,
        updatedTime: [],
        menuVisible: null
      },
      //添加菜单弹出层
      MenuAddVisible: false,
      //编辑菜单弹出层
      MenuEditVisible: false,
      //系统菜单
      sysMenu: [],
      //传递菜单所有的子节点key
      sysMenuKeys: [],
      //传递编辑的菜单数据
      editSysMenu: {},
      //菜单树配置
      menuTreeProps: {
        children: "children",
        label: "menuName",
        key: "menuUrl"
      }
    };
  },
  mounted() {
    this.doLoadTree();
  },
  methods: {
    //保存系统菜单
    async handleSaveSysMenu() {
      try {
        this.treeLoading = true;
        //补全排序字段
        this.$utils.addTreeSort(this.sysMenu, "menuOrde");
        //树结构转数组
        let sysMenuArray = this.$utils.toTreeArray(this.sysMenu);
        sysMenuArray.forEach(item => delete item.children);
        //发送请求
        let resp = await SysMenuMgrApi.saveSysMenu(sysMenuArray);
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
      this.$refs["menuTree"].filter(this.queryForm);
    },
    //切换显示查询卡片
    handleShowQuery() {
      this.showQuery = !this.showQuery;
    },
    //显示菜单添加弹出层
    handleShowMenuAddDia() {
      //获取目前所有的菜单树的子节点
      let allNode = this.$utils.filterTree(this.sysMenu, item => {
        let _buttonSysMenu = item.children ? item.children.filter(item => item.menuType == 3) : [];
        if ((!item.children || _buttonSysMenu.length === item.children.length) && item.menuType !== 3) return item[this.menuTreeProps.key];
      });
      let sysMenuKeys = [];
      //获取全部子节点的key值
      allNode.forEach(node => sysMenuKeys.push(node[this.menuTreeProps.key]));
      this.sysMenuKeys = sysMenuKeys;
      this.MenuAddVisible = true;
    },
    //切换树展开
    handleExpandSwitch() {
      this.isTreeExpand = !this.isTreeExpand;
      this.$utils.treeExpandSwitch(this.$refs["menuTree"], this.isTreeExpand);
    },
    //加载初始菜单
    async doLoadTree() {
      try {
        this.treeLoading = true;
        let resp = await SysMenuMgrApi.getSysMenu();
        await this.$utils.sleep(3000);
        this.sysMenu = this.$utils.toArrayTree(resp.data, {
          key: "menuUrl",
          parentKey: "menuParent",
          children: "children",
          sortKey: "menuOrde"
        });
      } catch (error) {
        this.$alert("数据加载失败 !");
      } finally {
        this.treeLoading = false;
      }
    },
    //更新菜单树数据
    async doUpdataTree({ addChildrenNode, checkKeys }) {
      try {
        this.treeLoading = true;
        let treeVNode = this.$refs["menuTree"];
        //-------------- 添加新增节点 开始 ----------------
        for (var model of addChildrenNode) {
          for (var index in model.chain) {
            let key = model.chain[index]["fullPath"];
            let parentKey = index == 0 ? key : model.chain[index - 1]["fullPath"];
            let parentNode = treeVNode.getNode(parentKey);
            let childrenNode = treeVNode.getNode(key);
            let newNode = Object.assign({}, DefaultMenuModel, {
              menuKey: model.chain[index].path,
              menuUrl: model.chain[index].fullPath,
              menuName: this.$t("route." + model.chain[index].name),
              menuIcon: model.chain[index].icon,
              menuParent: parentNode ? parentNode.data.menuUrl : null,
              menuType: model.chain[index].children ? 1 : 2,
              menuOpenWay: !!model.chain[index].httpurl ? 2 : 1,
              createdTime: this.$utils.now(),
              updatedTime: this.$utils.now(),
              children: []
            });
            if (!parentNode) {
              await SysMenuMgrApi.saveSysMenu([newNode]);
              treeVNode.append(newNode, parentNode);
            }
            if (!childrenNode && index > 0) {
              await SysMenuMgrApi.saveSysMenu([newNode]);
              treeVNode.append(newNode, parentNode);
            }
          }
        }
        //-------------- 添加新增节点 结束 ----------------
        //-------------- 删除节点 开始 -------------------
        let deleteKeys = this.$utils.arrayDiff(this.sysMenuKeys, checkKeys);
        for (var key of deleteKeys) {
          let node = treeVNode.getNode(key);
          if (node.data.uuid) await SysMenuMgrApi.delSysMenu([node.data.uuid]);
          treeVNode.remove(key);
        }
        //-------------- 删除节点 结束 -------------------
        await this.doLoadTree();
      } catch (error) {
        this.$alert("数据更新失败 !");
      } finally {
        this.treeLoading = false;
      }
    },
    //确认编辑
    async doUpdataData(data) {
      try {
        this.treeLoading = true;
        let updata = [data];
        // if (
        //   this.editSysMenu.menuVisible !== data.menuVisible &&
        //   data.menuVisible !== "1"
        // ) {
        //   let treeVNode = this.$refs["menuTree"].getNode(data.menuUrl);
        //   this.$utils.eachTree(treeVNode.data.children, item => {
        //     item.menuVisible = data.menuVisible;
        //     updata.push(item);
        //   });
        // }
        await SysMenuMgrApi.saveSysMenu(updata);
        await this.doLoadTree();
      } catch (error) {
        this.$alert("数据更新失败 !");
      } finally {
        this.treeLoading = false;
      }
    },
    //添加按钮菜单
    doAddButtonNode(node, data) {
      this.editSysMenu = Object.assign({}, DefaultMenuModel, {
        menuParent: data.menuUrl,
        menuType: 3,
        menuOpenWay: 1,
        menuIcon: "el-icon-coordinate",
        createdTime: this.$utils.now(),
        updatedTime: this.$utils.now(),
        //父级下的全部按钮菜单,临时数据
        children: data.children
      });
      this.MenuEditVisible = true;
    },
    //树节点过滤
    doFilterNode(value, data) {
      let isMenuName = data.menuName.includes(value.menuName);
      let isMenuUrl = data.menuUrl.includes(value.menuUrl);
      let isMenuOpenWay = data.menuOpenWay === value.menuOpenWay || !value.menuOpenWay;
      //value.menuVisible === null解决!0为true
      let isMenuVisible = data.menuVisible === value.menuVisible || value.menuVisible === null;
      let isUpdatedTime = true;
      if (value.updatedTime && value.updatedTime.length === 2) {
        isUpdatedTime = value.updatedTime[0].getTime() <= data.updatedTime && data.updatedTime <= value.updatedTime[1].getTime();
      }
      return isMenuName && isMenuUrl && isMenuOpenWay && isMenuVisible && isUpdatedTime;
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
        if (data.uuid) await SysMenuMgrApi.delSysMenu([data.uuid]);
        this.$refs["menuTree"].remove(data[this.menuTreeProps.key]);
        this.isSort = true;
      } catch (error) {}
    },
    //修改node
    doEditNode(data) {
      this.editSysMenu = data;
      this.MenuEditVisible = true;
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
      //----------------- 添加按钮菜单 开始 -------------------------------
      let addButtonMenu = null;
      let isHaveButtonMenu = [];
      //子节点有多少是按钮菜单节点
      if (data.children) {
        isHaveButtonMenu = data.children.filter(value => value.menuType == 3);
      }
      //如果当前的孩子节点都是按钮菜单且当前节点不是按钮菜单
      if (isHaveButtonMenu.length === data.children.length && data.menuType != 3) {
        addButtonMenu = (
          <el-button
            type="text"
            size="mini"
            icon="el-icon-mouse"
            title="添加按钮"
            on-click={e => {
              this.doAddButtonNode(node, data);
              e.stopPropagation();
            }}
          />
        );
      }
      //----------------- 添加按钮菜单 结束 -------------------------------
      //----------------- 图标区 开始 ------------------------------------
      let _menuIcon = data.menuIcon + (data.menuVisible == 1 ? " icon-color-success" : " icon-color-info");
      //----------------- 图标区 结束 ------------------------------------
      return (
        <flex-container wrap="nowrap" alignItems="center" justifyContent="space-between">
          <flex-item alignItems="center">
            <span class="margin-right-2">
              <i class={_menuIcon} />
            </span>
            <el-tooltip content={data.menuUrl} placement="right" effect={data.menuOpenWay == 1 ? "dark" : "light"}>
              <span class="icon-size-14">{node.label}</span>
            </el-tooltip>
          </flex-item>
          <flex-item alignItems="center" class="margin-right-5">
            {addButtonMenu}
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
          </flex-item>
        </flex-container>
      );
    }
  }
};
</script>



