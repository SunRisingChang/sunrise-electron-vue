/**
 * @Author: Sun Rising 
 * @Date: 2019-05-19 11:17:11 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-31 16:32:31
 * @Description: Element UI el-dialog封装默认,使用class[head_botton、footer]替换插槽[slot="title"、slot="footer"]
 */
<template>
  <el-dialog class="dialog-style" v-drag :visible.sync='visible_tep' v-bind="this.$props" v-on="this.$listeners">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot v-if="visible_tep"></slot>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog } from "element-ui";

export default {
  name: "DialogDrag",
  props: {
    ...Dialog.props,
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible_tep: false
    };
  },
  watch: {
    visible_tep(val) {
      this.$emit("update:visible", val);
    },
    visible: {
      handler(val) {
        this.visible_tep = val;
      },
      immediate: true
    }
  }
};
</script>
