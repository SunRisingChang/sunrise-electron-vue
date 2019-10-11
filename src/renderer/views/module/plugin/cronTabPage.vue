/**
 * @Author: Sun Rising 
 * @Date: 2019-01-02 15:09:10 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:59:44
 * @Description: Cron表达式选择器
 */
<template>
  <flex-container class="cron-tab-page" direction='column' wrap='nowrap'>
    <flex-item>
      <el-alert class="margin-bottom-10" title="Cron表达式选择器" type="success" :closable='false' description="这是一个cron表达式选择工具，用于form表单录入也可以单独使用，使用简单。">
      </el-alert>
    </flex-item>
    <flex-container class="margin-bottom-10">
      <flex-item alignItems='center' class="margin-right-5">
        Cron表达式 :
      </flex-item>
      <flex-item :grow='1'>
        <cron-tab v-model="cronVal"></cron-tab>
      </flex-item>
    </flex-container>
    <flex-item class="margin-bottom-10">{{cronVal}}</flex-item>
    <flex-item>
      <markdown-editor v-model="content" view></markdown-editor>
    </flex-item>
  </flex-container>
</template>

<script>
import api from "@/components/CronTab/api.md";

export default {
  name: "CronTabPage",
  data() {
    return {
      content: api,
      cronVal: null
    };
  }
};
</script>