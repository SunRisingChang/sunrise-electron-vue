<template>
  <flex-container class="tpl-form-create-page" direction="column" wrap="nowrap">
    <flex-item>
      <el-alert class="margin-bottom-10" title="模板表单" type="success" :closable="false" description="模板表单管理插件，可视化创建form表单且生成渲染json串，再使用json字符串渲染成form表单。"></el-alert>
    </flex-item>
    <flex-container class="margin-bottom-10">
      <tpl-form-create></tpl-form-create>
    </flex-container>
    <flex-item>
      <markdown-editor v-model="content" view></markdown-editor>
    </flex-item>
    <flex-item>
      <markdown-editor v-model="content2" view></markdown-editor>
    </flex-item>
  </flex-container>
</template>

<script>
import tplFormCreateMD from "@/components/tplFormCreate/api.md";
import tplFormRenderMD from "@/components/tplFormRender/api.md";

export default {
  name: "tplFormCreatePage",
  data() {
    return {
      content: tplFormCreateMD,
      content2: tplFormRenderMD
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>