/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 19:06:08 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-25 12:45:13
 * @Description: 头部显示区
 */
<template>
  <flex-container height="100%" alignItems="center" justifyContent="space-between">
    <flex-item alignItems="center">
      <el-button type="text" @click="$store.commit('base/setCollapse',{isCollapse:!$store.state.base.isCollapse})" :icon="!$store.state.base.isCollapse?'icon-fa fa-outdent':'icon-fa fa-indent'" :title="$t('navbar.telescopicMenu')"></el-button>
      <el-breadcrumb v-if="$store.state.base.defaultLayout === 'defaultLayout'" class="margin-left-20" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{$t('route.'+item.name)}}</el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </flex-item>
    <flex-container width="auto" height="100%" alignItems="center">
      <flex-item class="margin-right-20">
        <el-button type="text" icon="icon-fa fa-paper-plane-o" @click="handelOpenGuide" title="引导"></el-button>
      </flex-item>
      <flex-item class="margin-right-20">
        <el-badge class="mark" :value="noticeMsgNum">
          <el-button type="text" icon="icon-fa fa-bell-o" @click="$router.push({ path: '/noticeMsg' })"></el-button>
        </el-badge>
      </flex-item>
      <flex-item class="margin-right-20">
        <el-button type="text" @click="$store.dispatch('base/fullScreenModel')" :icon="$store.state.base.isFullScreen?'icon-ali ali-iconzuixiaohua':'icon-ali ali-zuidahua1'" :title="$store.state.base.isFullScreen?$t('navbar.exitFullScreen'):$t('navbar.enterFullScreen')"></el-button>
      </flex-item>
      <flex-item class="margin-right-20">
        <el-button type="text" icon="icon-ali ali-suoping" :title="$t('navbar.lockScreen')" @click="handleLockScreen"></el-button>
      </flex-item>
      <flex-item class="margin-right-20">
        <el-dropdown trigger="click" placement="bottom" @command="handleSetLanguage">
          <span class="el-dropdown-link">
            <span>
              <el-button type="text" icon="icon-ali ali-yuyanqiehuan" :title="$t('navbar.language')"></el-button>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in $store.state.base.sysConfig.language" :disabled="$store.state.base.sysConfig.currLanguage===item.code" :command="item.code" :key="item.code">{{item.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </flex-item>
      <flex-item class="margin-right-20">
        <el-dropdown @command="handleUserOpButton">
          <span class="el-dropdown-link">
            <span v-if="$store.state.base.defaultLayout !== 'miniLayout'">
              {{$store.state.base.userInfo.acName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <span v-if="$store.state.base.defaultLayout === 'miniLayout'">
              <i class="icon-fa fa-user-o"></i>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="perInfo">{{$t('navbar.perInfo')}}</el-dropdown-item>
            <el-dropdown-item command="changePW">{{$t('navbar.changePW')}}</el-dropdown-item>
            <el-dropdown-item command="logout" divided>{{$t('navbar.logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </flex-item>
      <flex-item>
        <el-button type="text" icon="icon-fa fa-cog" :title="$t('navbar.setting')" @click="$router.push({path: '/setting'})"></el-button>
      </flex-item>
    </flex-container>
  </flex-container>
</template>
<script>
import steps from "@/resources/defineSteps.js";

export default {
  computed: {
    levelList: function() {
      let levelList = [{ path: "/", name: "Home" }];
      if (this.$route.matched[0].path) levelList = levelList.concat(this.$route.matched);
      return levelList;
    },
    noticeMsgNum: function() {
      let num = 0;
      this.$store.state.base.noticeMsg.forEach(value => {
        if (!value.isRead) num++;
      });
      return num !== 0 ? num : null;
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("base/changeI18n", lang);
    },
    handleLockScreen() {
      this.$store.dispatch("base/lock");
    },
    //用户下拉
    handleUserOpButton(op) {
      if (op === "logout") this.$store.dispatch("base/logout");
      if (op === "perInfo") this.$router.push({ path: "/userInfo" });
      if (op === "changePW") this.$store.commit("base/setIsShowChangePwd", true);
    },
    handelOpenGuide() {
      let driver = new this.$driver();
      driver.defineSteps(steps);
      driver.start();
    }
  }
};
</script>