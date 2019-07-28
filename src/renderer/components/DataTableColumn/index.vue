/**
 * @Author: Sun Rising 
 * @Date: 2019-05-19 11:17:11 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-19 12:52:21
 * @Description: DataTable辅助组件
 */
<template>
  <!-- 可访问且有默认插槽传入 -->
  <el-table-column v-if="isVisible&&isScopedSlots" v-bind="this.$props">
    <template slot-scope="scope">
      <slot v-bind="scope"></slot>
    </template>
  </el-table-column>
  <!-- 可访问且传入的插槽非默认 -->
  <el-table-column v-else-if="isVisible" v-bind="this.$props">
    <slot></slot>
  </el-table-column>
</template>

<script>
import { TableColumn } from "element-ui";

export default {
  name: "DataTableColumn",
  props: {
    ...TableColumn.props
  },
  inject: [
    //父对象
    "$table"
  ],
  computed: {
    //该组件是否可见
    isVisible() {
      return !!this.checkColumn.find(value => value === this.prop);
    },
    //是否传入了匿名插槽
    isScopedSlots() {
      return this.$scopedSlots && this.$scopedSlots.default;
    },
    //选择的列
    checkColumn() {
      return this.$table.checkColumn;
    }
  }
};
</script>
