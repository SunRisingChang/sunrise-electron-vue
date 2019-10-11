/**
 * @Author: Sun Rising 
 * @Date: 2019-06-01 16:38:29 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:55:13
 * @Description: 添加开发菜单
 */
<template>
  <flex-container>
    <flex-container class="head_botton">
      <el-button type="text" @click="handleExpandSwitch" :icon="isTreeExpand?'icon-ali ali-tuceng':'icon-ali ali-tuceng1'" :title="isTreeExpand?'全部折叠':'全部展开'"></el-button>
    </flex-container>
    <el-tree ref="devMenuTree" :data="menuTreeData" :node-key="menuTreeProps.key" :props="menuTreeProps" :default-expand-all='isTreeExpand' show-checkbox>
      <span slot-scope="node">{{$t('route.'+node.data.name)}}</span>
    </el-tree>
    <flex-container class="footer" justifyContent='flex-end'>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button @click="handleUpdateMenuTree" type="primary">确 定</el-button>
    </flex-container>
  </flex-container>
</template>

<script>
import { RouterAssembly } from "@/lib/routerAssembly";

export default {
  props: {
    //初始化数据
    initData: {
      type: Array
    }
  },
  data() {
    return {
      //菜单数据
      menuTreeData: [],
      //树展开
      isTreeExpand: true,
      //tree树配置
      menuTreeProps: {
        children: "children",
        label: "name",
        key: "fullPath"
      }
    };
  },
  mounted() {
    this.doLoadDevMenu();
  },
  methods: {
    //加载开发菜单
    doLoadDevMenu() {
      this.menuTreeData = new RouterAssembly().getLazyRouters();
      this.$utils.addTreeFullPath(this.menuTreeData, "fullPath", "path");
      this.$refs["devMenuTree"].setCheckedKeys(this.initData);
    },
    //确认修改
    async handleUpdateMenuTree() {
      let treeVNode = this.$refs["devMenuTree"];
      let _checkTreeKeys = treeVNode.getCheckedKeys(true);
      let checkTreeKeys = this.$utils.arrayDiff(_checkTreeKeys, this.initData);
      let checkTreeKeyChains = this.$utils.getTreeKeyChainsByCheckKey(
        treeVNode,
        checkTreeKeys,
        this.menuTreeProps.key
      );
      let data = {
        addChildrenNode: checkTreeKeyChains,
        checkKeys: _checkTreeKeys
      };
      //检测是否进行了菜单的删除
      let deleteKeys = this.$utils.arrayDiff(this.initData, _checkTreeKeys);
      if (deleteKeys.length > 0) {
        try {
          await this.$confirm(
            "检测到您删除了现有菜单，请确认此操作.",
            "提示信息",
            {
              type: "info",
              confirmButtonText: "确认操作",
              cancelButtonText: "放弃修改"
            }
          );
        } catch (error) {
          return;
        }
      }
      this.$emit("updataTree", data);
      this.$emit("close");
    },
    //切换树展开
    handleExpandSwitch() {
      this.isTreeExpand = !this.isTreeExpand;
      this.$utils.treeExpandSwitch(
        this.$refs["devMenuTree"],
        this.isTreeExpand
      );
    }
  }
};
</script>
