/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 16:10:12 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:56:38
 * @Description: 字典值 树类型 面板
 */
<template>
  <el-card>

    <flex-container slot="header" justifyContent='space-between'>
      <flex-item alignItems='center'>
        <i class="el-icon-s-operation margin-right-6 font-size-16"></i>组数据
        <el-tooltip v-if="isSort&&dictTree.length>0&&dictTree[0].children.length>0" content="排序已修改,请保存 !" placement="right">
          <i class="el-icon-warning icon-color-danger"></i>
        </el-tooltip>
      </flex-item>
      <flex-item alignItems='center'>
        <el-button size="mini" @click="handleSave" circle icon="icon-ali ali-gongju" title="排序整理"></el-button>
        <el-button size="mini" @click="loadDictTree" circle icon="el-icon-refresh" title="刷新"></el-button>
        <el-button size="mini" plain @click="handleExpandSwitch" circle :icon="isTreeExpand?'icon-ali ali-tuceng':'icon-ali ali-tuceng1'" :title="isTreeExpand?'全部折叠':'全部展开'"></el-button>
        <el-button size="mini" @click="$emit('close')" circle plain icon="el-icon-close" title="关闭面板"></el-button>
      </flex-item>
    </flex-container>

    <flex-container direction="column" wrap='nowrap'>
      <flex-item class="margin-bottom-10">
        <el-form class="form-style-line">
          <el-form-item>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>
          </el-form-item>
        </el-form>
      </flex-item>

      <flex-item>
        <el-tree ref="dictTree" :data="dictTree" node-key="uuid" default-expand-all :filter-node-method="doFilterNode" draggable :allow-drop="doAllowDropNode">
          <flex-container slot-scope="{ node, data }" wrap='nowrap' justifyContent='space-between'>
            <flex-item v-if="data.root" alignItems="center">
              {{initData.groupName}}根节点
              <el-tag class="margin-left-4" type="warning">注意 : 该结点使用时不显示 !</el-tag>
            </flex-item>
            <flex-item v-else alignItems="center">
              <el-tooltip :content="'Key: '+data.dictKey+' , Value: '+data.dictValue" placement="right">
                <el-button type="text" :disabled="data.dictStat==='0'">{{data.dictName}}</el-button>
              </el-tooltip>
            </flex-item>
            <flex-item class="margin-right-10">
              <el-button type="text" size="mini" icon="el-icon-plus" title="添加子节点" @click="(e)=>doAppendNode(data,e)"></el-button>
              <el-button v-if="!data.root" type="text" size="mini" icon="el-icon-edit" title="修改" @click="(e)=>doEditNode(data,e)"></el-button>
              <el-button v-if="!data.root" type="text" size="mini" icon="el-icon-delete" title="删除" @click="(e)=>doDelNode(node, data,e)"></el-button>
            </flex-item>
          </flex-container>
        </el-tree>
      </flex-item>
    </flex-container>

    <!-- 组数据修改|添加面板 -->
    <dialog-drag title="组数据编辑" :visible.sync="showDictItemDia">
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>组数据编辑
      </span>
      <dictMgr-item-edit type='tree' :initData='editDictItem' @updataData='doUpdataDictItem' @close='showDictItemDia=false'></dictMgr-item-edit>
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
      //树展开
      isTreeExpand: true,
      //排序是否修改
      isSort: false,
      //显示修改面板
      showDictItemDia: false,
      //树过滤
      filterText: "",
      //字典树
      dictTree: [],
      editDictItem: {}
    };
  },
  watch: {
    "initData.uuid": {
      handler(val) {
        this.$nextTick(() => {
          this.loadDictTree();
        });
      },
      immediate: true
    },
    filterText(val) {
      this.$refs["dictTree"].filter(val);
    }
  },
  methods: {
    //加载树数据
    async loadDictTree() {
      let resp = await SysDictMgrApi.querySysDictTreeItem({
        groupUuid: this.initData.uuid
      });
      //创建树
      let creatTree = [];
      if (resp.data.length > 0)
        creatTree = this.$utils.toArrayTree(resp.data, {
          key: "uuid",
          parentKey: "dictPuuid",
          sortKey: "dictOrde"
        });
      //拼接根节点
      let dictTree = {
        uuid: this.$utils.now(),
        root: true,
        children: creatTree
      };
      this.dictTree = [dictTree];
    },
    //保存字典树
    async handleSave() {
      try {
        //补全排序字段
        this.$utils.addTreeSort(this.dictTree, "dictOrde");
        let sysDictTreeArray = this.$utils.toTreeArray(
          this.dictTree[0].children
        );
        sysDictTreeArray.forEach(item => delete item.children);
        await SysDictMgrApi.saveSysDictItem(sysDictTreeArray);
        this.isSort = false;
      } finally {
        this.loadDictTree(this.initData.uuid);
      }
    },
    //切换树展开
    handleExpandSwitch() {
      this.isTreeExpand = !this.isTreeExpand;
      this.$utils.treeExpandSwitch(this.$refs["dictTree"], this.isTreeExpand);
    },
    //可否放置
    doAllowDropNode(draggingNode, dropNode, type) {
      let is =
        draggingNode.parent.id === dropNode.parent.id && type !== "inner";
      if (is) this.isSort = true;
      return is;
    },
    //数据修改回调
    async doUpdataDictItem(data) {
      try {
        await SysDictMgrApi.saveSysDictItem([data]);
      } catch (error) {
      } finally {
        this.loadDictTree();
      }
    },
    //追加结点
    async doAppendNode(data, e) {
      try {
        e.stopPropagation();
        let newChild = Object.assign({}, DefaultDictSelectItem, {
          dictName: "新增节点",
          dictKey: "null",
          dictValue: "null",
          groupUuid: this.initData.uuid,
          dictPuuid: data.uuid
        });
        await SysDictMgrApi.saveSysDictItem([newChild]);
      } catch (error) {
      } finally {
        this.loadDictTree();
      }
    },
    //修改结点
    doEditNode(data, e) {
      this.editDictItem = data;
      this.showDictItemDia = true;
      e.stopPropagation();
    },
    //删除节点
    async doDelNode(node, data, e) {
      try {
        e.stopPropagation();
        await SysDictMgrApi.delSysDictItem([data.uuid]);
      } catch (error) {
      } finally {
        this.loadDictTree();
      }
    },
    //树过滤
    doFilterNode(value, data) {
      if (!value) return true;
      return JSON.stringify(data).indexOf(value) !== -1;
    }
  }
};
</script>

