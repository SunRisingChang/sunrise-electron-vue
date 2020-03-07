/**
 * @Author: Sun Rising 
 * @Date: 2020-03-07 12:32:32 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-03-07 14:10:39
 * @Description: 可记忆的select输入框
 */
<template>
  <flex-container class="count-to-page" direction="column" wrap="nowrap">
    <flex-item>
      <el-alert class="margin-bottom-10" title="可记忆的输入框" type="success" :closable="false" description="基于Element UI select修改，将输入内容缓存至前端缓存,不清空浏览器缓存下拉值是不会被释放的。"></el-alert>
    </flex-item>
    <flex-container direction="column" wrap="nowrap">
      <flex-item class="count-block" justifyContent="center" alignItems="center">
        <autocomplete-input code-key="AutocompleteInput" v-model="value"></autocomplete-input>
      </flex-item>
      <flex-item justifyContent="center"></flex-item>
    </flex-container>
  </flex-container>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  }
};
</script>

<style>
</style>