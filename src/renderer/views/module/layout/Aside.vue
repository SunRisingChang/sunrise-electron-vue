/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 19:07:18 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-09 15:17:06
 * @Description: 侧导航区
 */
<template>
  <flex-container height="100%" direction="column" wrap="nowrap">
    <flex-item class="log-block" height="50px" alignItems="center" justifyContent="center">
      <span class="aside-logo"></span>
      <transition name="el-fade-in-linear" :appear="true" mode="in-out">
        <span v-show="!$store.state.base.isCollapse">{{$t('title')}}</span>
      </transition>
    </flex-item>
    <flex-item height="calc(100% - 50px)">
      <el-scrollbar>
        <el-menu router :default-active="$route.path" :collapse-transition="true" :collapse="$store.state.base.isCollapse" unique-opened>
          <routers-view v-for="item in $store.state.base.menuInfo" :key="item.path" :item="item"></routers-view>
        </el-menu>
      </el-scrollbar>
    </flex-item>
  </flex-container>
</template>




