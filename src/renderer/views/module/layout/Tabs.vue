/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 19:04:38 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-09 13:23:07
 * @Description: 伪多页显示区
 */
<template>
  <flex-container class="tabs-block" wrap="nowrap" justifyContent="space-between" alignItems="center">
    <flex-item :grow="1" class="tabs" width="calc(100% - 41px)">
      <el-tabs v-model="tabPages.currTab" type="card" @tab-remove="removeTab" @tab-click="clickTab">
        <el-tab-pane v-for="item in tabPages.tabPages" :key="item.key" :label="getLabel(item)" :path="item.path" :name="item.key" :closable="item.path!=="/""></el-tab-pane>
      </el-tabs>
    </flex-item>
    <flex-item class="tabs-op" width="40px" alignItems="center" justifyContent="center">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$store.dispatch('base/closeOtherTabPage')">{{$t('document.tabs.closeOtherTags')}}</el-dropdown-item>
          <el-dropdown-item @click.native="$store.dispatch('base/closeRightTabPage')">{{$t('document.tabs.closeTheRightLabel')}}</el-dropdown-item>
          <el-dropdown-item @click.native="$store.dispatch('base/closeAllTabPage')">{{$t('document.tabs.closeAllTags')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </flex-item>
  </flex-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["tabPages"])
  },
  methods: {
    //点击tab标签
    clickTab(targetObj) {
      this.$router.push({ path: targetObj.$attrs.path });
    },
    //移除tab标签
    removeTab(tabsKey) {
      this.$store.dispatch("base/delTabPages", tabsKey);
    },
    //获取标签页名称
    getLabel(item) {
      if (item.alias) return item.alias;
      return this.$t("route." + item.name);
    }
  }
};
</script>
