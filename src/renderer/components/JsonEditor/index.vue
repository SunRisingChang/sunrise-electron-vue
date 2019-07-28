/**
 * @Author: Sun Rising 
 * @Date: 2019-07-08 10:53:40 
 * @Last Modified by: Sun Rising 
 * @Last Modified time: 2019-07-08 10:53:40 
 * @Description: Json编辑器
 */
<template>
  <div class="json-editor">
    <textarea ref="textarea" />
    </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint";
require("script-loader!jsonlint");
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/display/autorefresh";
import "codemirror/theme/rubyblue.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/selection/active-line.js";
import "codemirror/keymap/sublime.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/theme/lesser-dark.css";

export default {
  name: "JsonEditor",
  props: ["value"],
  data() {
    return {
      jsonEditor: false
    };
  },
  watch: {
    value(value) {
      const editor_value = this.jsonEditor.getValue();
      if (value !== editor_value) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true, // 显示行号
      mode: "application/json", // 语言模式
      keyMap: "sublime", // 快键键风格
      smartIndent: true, //智能缩进
      indentUnit: 4, // 智能缩进单位为4个空格长度
      indentWithTabs: true, // 使用制表符进行智能缩进
      lineWrapping: true,
      // 在行槽中添加行号显示器、折叠器、语法检测器`
      gutters: [
        "CodeMirror-linenumbers",
        "CodeMirror-foldgutter",
        "CodeMirror-lint-markers"
      ],
      theme: "lesser-dark", // 主题
      lint: true,
      autoRefresh: true,
      foldGutter: true, // 启用行槽中的代码折叠
      autofocus: true, //自动聚焦
      matchBrackets: true, // 匹配结束符号，比如"]、}"
      autoCloseBrackets: true, // 自动闭合符号
      styleActiveLine: true // 显示选中行的样式
    });

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
    this.jsonEditor.on("change", cm => {
      this.$emit("changed", cm.getValue());
      this.$emit("input", cm.getValue());
    });
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue();
    }
  }
};
</script>

<style scoped>
.json-editor {
  height: 100%;
  width: 100%;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll {
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #f08047;
}
</style>
