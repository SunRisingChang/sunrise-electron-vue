/**
 * @Author: Sun Rising 
 * @Date: 2019-07-01 12:58:20 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-05-08 08:46:26
 * @Description: 字典数据选择插件
 */
<template>
  <el-cascader v-if="dictType==='tree'" v-bind="this.$props" v-on="this.$listeners" :options="dictData" :props="dictProps"></el-cascader>
  <el-select v-else v-bind="this.$props" v-on="this.$listeners">
    <el-option v-for="item in dictData" :key="item.uuid" :label="item.dictValue" :value="item.dictKey"></el-option>
  </el-select>
</template>

<script>
import { Select } from "element-ui";
import { Cascader } from "element-ui";

export default {
  name: "DictSelect",
  props: {
    ...Select.props,
    ...Cascader.props,
    //字典组key
    dictKey: {
      type: String,
      default: ""
    },
    //字典类型[select|tree]
    dictType: {
      type: String,
      default: "select"
    }
  },
  data() {
    return {
      dictData: [],
      dictProps: {
        value: "uuid",
        label: "dictName"
      }
    };
  },
  watch: {
    dictKey: {
      handler(val) {
        if (val) this.loadDictData(val);
      },
      immediate: true
    }
  },
  methods: {
    async loadDictData(dictkey) {
      try {
        let result = this.dictType === "tree" ? await this.$utils.getDictTree(dictkey) : await this.$utils.getDictSelect(dictkey);
        this.dictData = result;
      } catch (error) {}
    }
  }
};
</script>