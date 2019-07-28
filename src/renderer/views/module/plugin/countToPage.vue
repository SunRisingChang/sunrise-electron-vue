/**
 * @Author: Sun Rising 
 * @Date: 2019-07-08 11:26:49 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 19:00:03
 * @Description: 数字滚动
 */
<template>
  <flex-container class="count-to-page" direction='column' wrap='nowrap'>
    <flex-item>
      <el-alert class="margin-bottom-10" title="数字滚动" type="success" :closable='false' description="这是一个数字滚动工具，基于vue-count-to插件">
      </el-alert>
    </flex-item>
    <flex-container direction='column' wrap='nowrap'>
      <flex-item class="count-block" justifyContent='center' alignItems='center'>
        <count-to ref="example" :start-val="setStartVal" :end-val="setEndVal" :duration="setDuration" :decimals="setDecimals" :separator="setSeparator" :prefix="setPrefix" :suffix="setSuffix" :autoplay="false" />
      </flex-item>
      <flex-item justifyContent='center'>
        <el-button type="primary" @click="start">开始</el-button>
        <el-button type="danger" @click="pauseResume">暂停/恢复</el-button>
      </flex-item>
    </flex-container>
  </flex-container>
</template>

<script>
import countTo from "vue-count-to";

export default {
  name: "CountToDemo",
  components: { countTo },
  data() {
    return {
      setStartVal: 0,
      setEndVal: 2017,
      setDuration: 4000,
      setDecimals: 0,
      setSeparator: ",",
      setSuffix: " rmb",
      setPrefix: "¥ "
    };
  },
  methods: {
    start() {
      this.$refs.example.start();
    },
    pauseResume() {
      this.$refs.example.pauseResume();
    }
  }
};
</script>

<style lang='scss'>
.count-to-page {
  .count-block {
    height: 100px !important;
    & span {
      font-size: 50px;
      color: #f56c6c;
    }
  }
}
</style>



