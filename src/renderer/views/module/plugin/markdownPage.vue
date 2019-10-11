/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 18:58:42 
 * @Last Modified by: Sun Rising 
 * @Last Modified time: 2019-07-10 18:58:42 
 * @Description: Markdown编辑器
 */
<template>
  <flex-container direction='column' wrap='nowrap' class="markdown-page-page">
    <flex-item>
      <el-alert class="margin-bottom-10" title="Markdown 编辑组件" type="success" :closable='false' description="该组件使用的是mavonEditor组件进行的二次封装，详见 https://github.com/hinesboy/mavonEditor">
      </el-alert>
    </flex-item>
    <flex-item>
      <markdown-editor v-model="content" :scroll='true' height='100%'></markdown-editor>
    </flex-item>
  </flex-container>
</template>

<script>
import api from "@/components/MarkdownEditor/api.md";

export default {
  name: "MarkdownPage",
  data() {
    return {
      content: api
    };
  }
};
</script>
<style lang="scss">
.markdown-page-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  & > div:nth-child(2) {
    display: flex;
  }
}
</style>


