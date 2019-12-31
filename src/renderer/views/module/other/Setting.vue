/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 19:01:02 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-12-31 19:26:29
 * @Description: 系统设置
 */
<template>
  <el-card>
    <flex-container direction="column" wrap='nowrap'>
      <flex-item class="cfg-block" direction="column">
        <span>应用主题</span>
        <div>
          <el-radio-group v-model="currTheme">
            <el-radio-button v-for="item in $store.state.base.sysConfig.theme" :key="item" :label="item">{{item}}</el-radio-button>
          </el-radio-group>
        </div>
      </flex-item>
      <flex-item class="cfg-block" direction="column">
        <span>单页切换</span>
        <div>
          <el-radio-group v-model="singlePage">
            <el-radio-button :label="true">单页</el-radio-button>
            <el-radio-button :label="false">伪多页</el-radio-button>
          </el-radio-group>
        </div>
      </flex-item>
      <flex-item class="cfg-block" direction="column">
        <span>页脚显隐</span>
        <div>
          <el-radio-group v-model="footerShow">
            <el-radio-button :label="true">显示</el-radio-button>
            <el-radio-button :label="false">隐藏</el-radio-button>
          </el-radio-group>
        </div>
      </flex-item>
    </flex-container>
  </el-card>

</template>
<script>
export default {
  data() {
    return {
      currTheme: this.$store.state.base.sysConfig.currTheme,
      singlePage: this.$store.state.base.sysConfig.singlePage,
      footerShow: this.$store.state.base.sysConfig.footerOption.show
    };
  },
  watch: {
    currTheme: {
      handler(val) {
        this.$store.dispatch("base/changeTheme", val);
      }
    },
    singlePage: {
      handler(val) {
        this.$store.commit("base/setSysConfig", { singlePage: val });
      }
    },
    footerShow: {
      handler(val) {
        this.$store.commit("base/setSysConfig", {
          footerOption: { show: val }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cfg-block {
  margin-bottom: 10px;
  & > span {
    margin-bottom: 10px;
    font-size: 14px;
    color: #606266;
    & i {
      font-size: 12px;
      margin-right: 5px;
    }
    &::after {
      content: "";
      display: block;
      width: 100%;
      background-color: #dcdfe6;
      height: 1px;
      margin-top: 5px;
    }
  }
}
</style>
