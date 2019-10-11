/**
 * @Author: Sun Rising 
 * @Date: 2019-05-20 21:34:53 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:59:12
 * @Description: IconFont库
 */
<template>
  <flex-container direction='column' wrap='nowrap' class="icon-font-page">
    <flex-item>
      <el-alert class="margin-bottom-10" title="IconFont图标库" type="success" :closable='false' description="阿里巴巴的IconFont图标库，详见 https://www.iconfont.cn/">
      </el-alert>
    </flex-item>
    <flex-item v-html="iconFontHtml">
    </flex-item>
  </flex-container>
</template>

<script>
import Iconfont from "@/style/depend/iconfont/demo_index.html";
import "@/style/depend/iconfont/demo.css";
import "@/style/depend/iconfont/iconfont.css";
import "@/style/depend/iconfont/iconfont.js";
import "@/style/depend/iconfont/jquery.js";
import "@/style/depend/iconfont/prismjs.js";

export default {
  name: "IconFontPage",
  data() {
    return {
      iconFontHtml: Iconfont
    };
  },
  mounted() {
    $(document).ready(function() {
      $(".tab-container .content:first").show();

      $("#tabs li").click(function(e) {
        var tabContent = $(".tab-container .content");
        var index = $(this).index();

        if ($(this).hasClass("active")) {
          return;
        } else {
          $("#tabs li").removeClass("active");
          $(this).addClass("active");

          tabContent
            .hide()
            .eq(index)
            .fadeIn();
        }
      });
    });
  }
};
</script>
<style lang='scss'>
.icon-font-page {
  & .main {
    padding: 0;
    width: 100%;
    & .logo {
      display: none;
    }
    & .nav-more {
      display: none;
    }
  }
}
</style>
