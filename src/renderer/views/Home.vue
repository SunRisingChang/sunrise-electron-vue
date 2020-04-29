/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 18:48:35 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-29 08:49:19
 * @Description: 内容装配页
 */
<template>
  <el-container v-loading="loading" :element-loading-text="$t('loading')" element-loading-spinner="icon-ali ali-jiazai1" element-loading-background="rgba(0, 0, 0, 0.6)">
    <vue-progress-bar></vue-progress-bar>
    <el-aside ref="aside" class="sun-aside" width="auto">
      <Aside />
    </el-aside>
    <el-container>
      <el-header class="sun-header">
        <Header />
      </el-header>
      <el-main class="padding-0 h-full">
        <el-container class="h-full">
          <el-header v-if="!$store.state.base.sysConfig.singlePage" class="main-header">
            <Tabs />
          </el-header>
          <el-main class="main-main">
            <el-scrollbar native class="main-scrollbar">
              <Main />
            </el-scrollbar>
            <el-backtop target=".main-scrollbar .el-scrollbar__wrap"></el-backtop>
          </el-main>
        </el-container>
      </el-main>
      <el-footer class="sun-footer" height="25px" v-if="$store.state.base.sysConfig.footerOption.show">
        <Footer />
      </el-footer>
    </el-container>
    <div class="bg-mask" v-if="$store.state.base.defaultLayout==='miniLayout'&&!$store.state.base.isCollapse" @click="$store.commit('base/setCollapse',{isCollapse:!$store.state.base.isCollapse})"></div>
    <change-pwd v-if="$store.state.base.isShowChangePwd"></change-pwd>
  </el-container>
</template>

<script>
import { Header, Aside, Tabs, Main, Footer } from "./module/layout";
import ChangePwd from "./module/other/ChangePwd";
import SysServices from "@/services";

export default {
  components: { Header, Aside, Tabs, Main, Footer, ChangePwd },
  data() {
    return {
      loading: true
    };
  },
  watch: {
    "$store.state.base.defaultLayout": {
      handler(val) {
        //自动适配窗口大小
        this.changLayout(val);
      },
      immediate: true
    },
    "$store.state.base.isCollapse": {
      handler(val) {
        //展开菜单抽屉
        this.changCollapse(val);
      },
      immediate: true
    }
  },
  async mounted() {
    //通知vuex注册窗口改变事件
    this.$store.dispatch("base/monitorWinSize");
    //主题初始化操作
    this.$store.dispatch("base/changeTheme");
    //获取后台初始化信息
    await this.$store.dispatch("base/initSystem");
    //检查登录状态
    this.$store.dispatch("base/isLogged");
    //启动长连接监听
    SysServices.run();
    this.loading = false;
  },
  methods: {
    changLayout(val) {
      this.$nextTick(() => {
        let vnnode = this.$refs["aside"];
        if (val === "miniLayout") {
          vnnode.$el.classList.add("leftFade");
          setTimeout(() => {
            vnnode.$el.classList.remove("leftFade");
            vnnode.$el.style.width = 0;
          }, 300);
        } else if (val === "streamLayout") {
          if (vnnode.$el.style.width === "0px") {
            vnnode.$el.classList.add("fadeLeft");
            setTimeout(() => {
              vnnode.$el.classList.remove("fadeLeft");
              vnnode.$el.style.width = "auto";
            }, 300);
          }
        } else if (val === "defaultLayout") {
          vnnode.$el.style.width = "auto";
        }
      });
    },
    changCollapse(val) {
      this.$nextTick(() => {
        let layout = this.$store.state.base.defaultLayout;
        let vnnode = this.$refs["aside"];
        if (!val && layout === "miniLayout") {
          vnnode.$el.style.position = "fixed";
          vnnode.$el.classList.add("collapseOpen");
          setTimeout(() => {
            vnnode.$el.classList.remove("collapseOpen");
            vnnode.$el.style.width = "auto";
          }, 300);
        } else if (val && layout === "miniLayout") {
          vnnode.$el.classList.add("collapseClose");
          setTimeout(() => {
            vnnode.$el.classList.remove("collapseClose");
            vnnode.$el.style.width = 0;
            vnnode.$el.style.position = "unset";
          }, 300);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.collapseOpen {
  animation-name: collapseOpen;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes collapseOpen {
  0% {
    width: 0px;
  }
  100% {
    width: 250px;
  }
}
.collapseClose {
  animation-name: collapseClose;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes collapseClose {
  0% {
    width: 250px;
  }
  100% {
    width: 0px;
  }
}
.leftFade {
  animation-name: leftFade;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes leftFade {
  0% {
    width: 64px;
  }
  100% {
    width: 0px;
  }
}
.fadeLeft {
  animation-name: fadeLeft;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes fadeLeft {
  0% {
    width: 0px;
  }
  100% {
    width: 64px;
  }
}
.bg-mask {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
