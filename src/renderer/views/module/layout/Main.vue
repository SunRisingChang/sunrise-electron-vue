/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 19:05:20 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 13:03:14
 * @Description: 内容显示区
 */
<template>
  <flex-container width='100%' height='100%' direction="column" wrap='nowrap'>
    <flex-container :grow='1' class="main-block" direction="column" wrap='nowrap' width='auto'>
      <flex-item :grow='1' class="transform-box">
        <!-- 这里使用transition-keep而不是使用transition是因为transition组件在过渡后会把其下的组件全部销毁（除keep-alive组件）这里使用的是keep-views会导致缓存路由信息丢失 -->
        <transition-keep name="fade-transform" mode="out-in">
          <keep-views :include='keepRouters'>
            <router-view v-loading='$mainLoading'></router-view>
          </keep-views>
        </transition-keep>
      </flex-item>
      <flex-item class="margin-top-4" height='25px' v-if="$store.state.base.sysConfig.footerOption.show&&$store.state.base.sysConfig.footerOption.type==='inline'">
        <Footer class="sun-footer" />
      </flex-item>
    </flex-container>
  </flex-container>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "./Footer";

export default {
  components: { Footer },
  computed: {
    ...mapGetters(["keepRouters"])
  }
};
</script>



