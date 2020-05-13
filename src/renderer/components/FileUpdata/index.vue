<template>
  <el-upload ref="elUpload" class="file-upload" v-bind="this.$props" v-on="this.$listeners">
    <template v-if="drag">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div v-if="tip" class="el-upload__tip" slot="tip">{{tip}}</div>
    </template>
  </el-upload>
</template>

<script>
import { Upload } from "element-ui";

export default {
  name: "FileUpdata",
  props: {
    ...Upload.props,
    tip: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    getEl() {
      return this.$refs["elUpload"];
    }
  }
};
</script>

<style lang="scss">
.file-upload {
  width: 100%;
  .el-upload,
  .el-upload-dragger {
    width: 100%;
  }
}
</style>

