/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:50:40
 * @Description: 角色-菜单关联
 */
<template>
  <flex-container direction="column" wrap="nowrap">
    <flex-container>
      <flex-item :grow="1">
        <el-form class="form-style-line">
          <el-form-item>
            <el-input placeholder="输入菜单名称或路径进行过滤" v-model="filterText" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </flex-item>
      <flex-item alignItems="center">
        <el-button type="pinforimary" size="mini" plain @click="handleExpandSwitch" :icon="isTreeExpand?'icon-ali ali-tuceng':'icon-ali ali-tuceng1'" :title="isTreeExpand?'全部折叠':'全部展开'"></el-button>
      </flex-item>
    </flex-container>

    <flex-item>
      <el-tree ref="menuTree" show-checkbox :data="data" @check-change="doCheckChange" :node-key="menuTreeProps.key" :props="menuTreeProps" default-expand-all draggable :render-content="doRenderTreeContent" :filter-node-method="doFilterNode"></el-tree>
    </flex-item>
  </flex-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    checkedKeys: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      filterText: "",
      //树展开
      isTreeExpand: true,
      //菜单树配置
      menuTreeProps: {
        children: "children",
        label: "menuName",
        key: "uuid",
        disabled: data => {
          return data.menuVisible !== "1";
        }
      }
    };
  },
  watch: {
    checkedKeys: {
      handler: function(val) {
        this.$emit("input", val);
        this.doCheckKeys(val);
      },
      immediate: true
    },
    filterText(val) {
      this.$refs["menuTree"].filter(val);
    }
  },
  methods: {
    // 选择树节点,解决方案:https://blog.csdn.net/xudalin/article/details/103158941
    doCheckKeys(keys) {
      keys.forEach(key => {
        let node = this.$refs["menuTree"].getNode(key);
        if (node.isLeaf) this.$refs["menuTree"].setChecked(node, true);
      });
    },
    //切换树展开
    handleExpandSwitch() {
      this.isTreeExpand = !this.isTreeExpand;
      this.$utils.treeExpandSwitch(this.$refs["menuTree"], this.isTreeExpand);
    },
    //选择的菜单发生改变
    doCheckChange() {
      this.$emit("input", this.$refs["menuTree"].getCheckedKeys().concat(this.$refs["menuTree"].getHalfCheckedKeys()));
    },
    //树节点过滤
    doFilterNode(value, data) {
      let isMenuName = data.menuName.includes(value);
      let isMenuUrl = data.menuUrl.includes(value);
      return isMenuName || isMenuUrl;
    },
    //渲染树
    doRenderTreeContent(h, { node, data, store }) {
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
        </flex-container>
      );
    }
  }
};
</script>

