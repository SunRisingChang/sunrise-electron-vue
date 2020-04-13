/**
 * @Author: Sun Rising 
 * @Date: 2020-04-09 13:20:46 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-13 09:37:49
 * @Description: 用于 Electron 模式下的标题栏
 */
<template>
  <flex-container class="tittle-bar" height="30px" alignItems="center" justifyContent="space-between">
    <flex-item class="tittle-bar-text" alignItems="center">
      <span class="tittle-bar-logo"></span>
      <el-dropdown @command="handleHelpCommand">
        <span class="pointer">帮助</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="checkUpdate">检查更新</el-dropdown-item>
          <el-dropdown-item command="about" divided>关于</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </flex-item>
    <flex-item class="tittle-bar-icon" alignItems="center">
      <el-progress v-if="showProgress" class="update-progress" :percentage="progressNumber" :stroke-width="3" :color="progressColor"></el-progress>
      <i v-if="isDevelopment" class="el-icon-refresh-right" @click="handleReload"></i>
      <i v-if="isDevelopment" class="icon-ali ali-gongju1" @click="handleDevTools"></i>
      <i v-if="isUpdate" class="el-icon-s-flag icon-color-danger" :title="'检测到新版本'+newVersionInfo.version+'，立即下载!'" @click="handleNewDownload"></i>
      <i v-else class="el-icon-s-flag icon-color-success" title="已是最新版本!"></i>
      <i class="icon-ali ali-zuixiaohua" @click="handleMinimize"></i>
      <i v-if="!maximize" class="icon-ali ali-zuidahua2" @click="handleMaximize"></i>
      <i v-else class="icon-ali ali-zuidahua" @click="handleDefaultSize"></i>
      <i class="icon-ali ali-guanbi" @click="handleQuit"></i>
    </flex-item>
    <!-- 关于 -->
    <el-dialog title="关于" :visible.sync="aboutDiaVisible" width="30%" :show-close="false">
      <span>{{versionInfo.name}}_{{versionInfo.version}}</span>
    </el-dialog>
  </flex-container>
</template>

<script>
import { ipcRenderer, shell } from "electron";

export default {
  data() {
    return {
      // 是否是初始检查更新
      isInitUpdate: true,
      // 最大化
      maximize: false,
      // 更新确认
      updataDiaVisible: false,
      // 关于
      aboutDiaVisible: false,
      // 更新进度条
      showProgress: false,
      // 是否有版本更新
      isUpdate: false,
      // 当前的版本信息
      versionInfo: {},
      // 最新的版本信息
      newVersionInfo: {},
      // 下载进度
      progressNumber: 0,
      // 下载进度颜色
      progressColor: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  computed: {
    // 是否是开发模式
    isDevelopment() {
      return process.env.NODE_ENV == "development";
    }
  },
  created() {
    this.initElectronListener();
    this.checkUpdate(true);
  },
  methods: {
    // 帮助菜单组处理
    handleHelpCommand(command) {
      if (command == "checkUpdate") this.checkUpdate();
      if (command == "about") this.aboutDiaVisible = true;
    },
    // 检查更新
    checkUpdate(isInitUpdate = false) {
      this.isInitUpdate = isInitUpdate;
      this.versionInfo = ipcRenderer.sendSync("main-check-update");
    },
    // 立即下载更新
    handleNewDownload() {
      ipcRenderer.send("main-new-download");
    },
    // 初始化监听器
    initElectronListener() {
      // 更新进度条
      ipcRenderer.on("renderer-update-progress", (event, arg) => {
        if (!this.showProgress) this.showProgress = true;
        this.progressNumber = this.$utils.toFixedNumber(arg.percent, 2);
      });
      // 在窗口最大化的时候触发
      ipcRenderer.on("win-maximize", () => {
        this.maximize = true;
      });
      // 在窗口退出最大化的时候触发
      ipcRenderer.on("win-unmaximize", () => {
        this.maximize = false;
      });
      // 有更新时
      ipcRenderer.on("renderer-update-available", async (event, arg) => {
        try {
          this.newVersionInfo = arg;
          this.isUpdate = true;
          await this.$confirm(`检测到新版本${arg.version}，是否立即下载?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false
          });
          this.handleNewDownload();
        } catch (error) {}
      });
      // 检查更新错误
      ipcRenderer.on("renderer-update-error", async (event, arg) => {
        try {
          if (!this.isInitUpdate)
            await this.$confirm("检查更新失败", "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "error",
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              closeOnHashChange: false
            });
        } catch (error) {}
      });
      // 更新包下载结束
      ipcRenderer.on("renderer-package-downloaded", async () => {
        try {
          await this.$confirm("更新包下载完成，是否立即重启安装?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false
          });
          ipcRenderer.send("main-quit-install");
        } catch (error) {}
      });
    },
    // 最小化
    handleMinimize() {
      ipcRenderer.send("win-minimize");
    },
    // 最大化
    handleMaximize() {
      ipcRenderer.send("win-maximize");
      this.maximize = true;
    },
    // 恢复默认窗口大小
    handleDefaultSize() {
      ipcRenderer.send("win-defaultsize");
      this.maximize = false;
    },
    // 退出应用
    handleQuit() {
      ipcRenderer.send("win-quit");
    },
    // 重载
    handleReload() {
      ipcRenderer.send("win-reload");
    },
    // 切换调试工具
    handleDevTools() {
      ipcRenderer.send("win-devtools");
    }
  }
};
</script>