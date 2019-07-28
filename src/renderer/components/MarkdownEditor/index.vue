/**
 * @Author: Sun Rising 
 * @Date: 2019-05-22 10:26:29 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-22 12:04:14
 * @Description: markdown-edit插件
 */
<template>
  <div class="markdown-edit-warp" :style="warpHeight">
    <mavon-editor v-model="value" v-bind='attrs' />
  </div>
</template>

<script>
//默认的视图模式参数
const DefaultViewOptions = {
  //开启边框阴影
  boxShadow: false,
  //true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
  subfield: false,
  //edit： 默认展示编辑区域 ， preview： 默认展示预览区域 , 其他 = edit
  defaultOpen: "preview",
  //工具栏是否显示
  toolbarsFlag: false,
  //markdown样式： 默认github
  codeStyle: "atom-one-dark"
};

export default {
  name: "MarkdownEditor",
  props: {
    //显示的文字
    value: {
      type: String,
      default: null
    },
    //mavon-editor配置属性集合
    options: {
      type: Object,
      default: function() {
        return {
          //markdown样式： 默认github
          codeStyle: "atom-one-dark"
        };
      }
    },
    //是否是显示模式
    view: {
      type: Boolean,
      default: false
    },
    //组件的高度
    height: {
      type: String,
      default: "auto"
    },
    //是否出现滚动条
    scroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    //容器高度
    warpHeight() {
      let str = "";
      if (this.scroll) {
        str = "display: flex;";
      }
      if (this.height === "auto") {
        str = str.concat("height:auto;");
      } else if (this.height.includes("px")) {
        str = str.concat("height:" + this.height);
      } else if (this.height.includes("%")) {
        str = str.concat("height:" + this.height);
      } else {
        str = str.concat("height:" + this.height + "px");
      }
      return str;
    },
    //mavon-editor配置属性集合
    attrs() {
      return this.view ? DefaultViewOptions : this.options;
    }
  }
};
</script>
<style lang="scss">
.markdown-edit-warp {
  width: 100%;
  & .markdown-body {
    width: 100%;
  }
}
</style>

