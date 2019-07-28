/**
 * @Author: Sun Rising 
 * @Date: 2019-05-19 11:17:11 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-06-03 10:05:35
 * @Description: Element UI el-col封装默认的响应式
 */
<template>
  <el-col v-bind="attr">
    <slot></slot>
  </el-col>
</template>

<script>
import { Col } from "element-ui";

export default {
  name: "ColPr",
  props: {
    ...Col.props
  },
  computed: {
    attr() {
      let _props = this.$props;
      let span = {
        xs: _props.xs ? _props.xs : 24,
        sm: _props.sm ? _props.sm : 12,
        md: _props.md ? _props.md : 8,
        lg: _props.lg ? _props.lg : 6,
        xl: _props.xl ? _props.xl : 4
      };
      return Object.assign({}, this.$props, span);
    }
  }
};
</script>
