/**
 * @Author: Sun Rising 
 * @Date: 2020-04-09 13:20:46 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-09 15:54:03
 * @Description: 用于 Electron 模式下的标题栏
 */
<template>
  <flex-container class="tittle-bar" height="30px" alignItems="center" justifyContent="space-between">
    <flex-item class="tittle-bar-text">
      <span class="tittle-bar-logo"></span>
      <span>{{$t('title')}}</span>
    </flex-item>
    <flex-item class="tittle-bar-icon">
      <i class="icon-ali ali-zuixiaohua" @click="handleMinimize"></i>
      <i v-if="!maximize" class="icon-ali ali-zuidahua2" @click="handleMaximize"></i>
      <i v-else class="icon-ali ali-zuidahua" @click="handleDefaultSize"></i>
      <i class="icon-ali ali-guanbi" @click="handleQuit"></i>
    </flex-item>
  </flex-container>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data() {
    return {
      // 最大化
      maximize: false
    };
  },
  methods: {
    // 最小化
    handleMinimize() {},
    // 最大化
    handleMaximize() {},
    // 恢复默认窗口大小
    handleDefaultSize() {},
    // 退出应用
    handleQuit() {
      ipcRenderer.send("win-quit");
    }
  }
};
</script>