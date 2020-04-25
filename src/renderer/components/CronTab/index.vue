/**
 * @Author: Sun Rising 
 * @Date: 2018-12-14 10:10:18 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-25 13:11:42
 * @Description: 为可视化选择cron表达式
 */
<template>
  <div style="width: 100%;">
    <el-input v-model="cronStr" @blur="cronblur" :readonly="readonly" clearable :disabled="disabled">
      <el-button @click="showCronDia" slot="append" icon="icon-ali ali-gaojixuangu" :title="title" :disabled="disabled||readonly"></el-button>
    </el-input>
    <dialog-drag :visible.sync="showCron" width="80%" :show-close="false">
      <template slot="title">
        <flex-container wrap="nowrap" justifyContent="space-between">
          <flex-item alignItems="center">
            <i class="icon-ali ali-gaojixuangu margin-right-4"></i>
            <span>{{ title}}</span>
          </flex-item>
          <flex-item alignItems="center">
            <el-button size="mini" icon="icon-ali ali-baocun" type="primary" circle @click="$refs.cronTab.submitFill();showCron=!showCron"></el-button>
            <el-button size="mini" icon="el-icon-close" type="info" circle @click="showCron=!showCron"></el-button>
          </flex-item>
        </flex-container>
      </template>
      <cron-main ref="cronTab" v-model="cronStr"></cron-main>
    </dialog-drag>
  </div>
</template>

<script>
import CronMain from "./src/Crontab-Main";
import CronExpressionValidator from "../../lib/cronValidator.js";

export default {
  components: { CronMain },
  props: {
    title: { type: String, default: "高级设置" },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: String, default: null }
  },
  data() {
    return {
      cronStr: null,
      showCron: false
    };
  },
  watch: {
    cronStr(val) {
      this.$emit("input", val);
    },
    value: {
      handler(val) {
        this.cronStr = val;
      },
      immediate: true
    }
  },
  methods: {
    showCronDia() {
      this.showCron = true;
    },
    cronblur() {
      let val = this.cronStr;
      if (val && val !== "") {
        let result = CronExpressionValidator.validateCronExpression(val);
        if (!result) this.$emit("input", null);
      }
    }
  }
};
</script>