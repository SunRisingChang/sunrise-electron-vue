/**
 * @Author: Sun Rising 
 * @Date: 2020-03-07 12:27:22 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-03-07 14:20:43
 * @Description: 可记忆的select输入框
 */
<template>
  <el-select allow-create filterable default-first-option v-bind="this.$props" v-on="this.$listeners" :loading="isLoading" :popper-class="getPopperClass">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { Select } from "element-ui";
import dataStorage from "@/lib/dataStorage";

export default {
  name: "AutocompleteInput",
  props: {
    ...Select.props,
    // 缓存key
    codeKey: {
      type: String,
      default: null
    },
    // 最多缓存数
    maxCacheNumber: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      // 缓存数据
      options: [],
      // 加载中
      isLoading: false
    };
  },
  computed: {
    getPopperClass() {
      return this.options.length === 0 ? "autocomplete-input-popper" : "";
    }
  },
  watch: {
    value: {
      handler(val) {
        this.updateOption(val);
      }
    }
  },
  async created() {
    await this.loadOption();
  },
  methods: {
    // 拉取缓存数据
    async loadOption() {
      if (!this.codeKey) return;
      try {
        this.isLoading = true;
        let autoInputStorage = dataStorage.getAutoInputStorage();
        let _options = await autoInputStorage.getItem(this.codeKey);
        if (Array.isArray(_options)) this.$set(this, "options", _options);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    // 更新缓存数据
    async updateOption(val) {
      if (val) {
        let currItem = this.options.find(v => v.value === val);
        if (!currItem) {
          this.options.unshift({
            label: val,
            value: val
          });
          if (this.options.length > this.maxCacheNumber) this.options.splice(this.maxCacheNumber, this.options.length - this.maxCacheNumber);
          await this.pushOption();
        }
      }
    },
    // 提交缓存数据
    async pushOption() {
      if (this.codeKey) {
        let autoInputStorage = dataStorage.getAutoInputStorage();
        await autoInputStorage.setItem(this.codeKey, this.options);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-input__inner {
  padding: 0 15px;
}
/deep/.el-input__suffix {
  display: none;
}
</style>
<style>
.autocomplete-input-popper {
  display: none;
}
</style>