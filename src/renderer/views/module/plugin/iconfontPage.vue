/**
 * @Author: Sun Rising 
 * @Date: 2019-05-20 21:34:53 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-25 19:31:31
 * @Description: IconFont库
 */
<template>
  <flex-container direction="column" wrap="nowrap" class="icon-font-page">
    <flex-item>
      <el-alert class="margin-bottom-10" title="IconFont图标库" type="success" :closable="false" description="阿里巴巴的IconFont图标库，详见 https://www.iconfont.cn/"></el-alert>
    </flex-item>
    <flex-item>
      <ul class="icon-list">
        <li v-for="className in icons" :key="className" @click="handleCopy(className)">
          <i :class="'icon-ali '+className"></i>
          <span>{{"."+className}}</span>
        </li>
      </ul>
    </flex-item>
  </flex-container>
</template>

<script>
import packageJson from "../../../../../package.json";
import axios from "axios";
const baseUrl = "http://at.alicdn.com/t/";

export default {
  name: "IconFontPage",
  data() {
    return {
      iconfontId: packageJson.iconfontId,
      icons: []
    };
  },
  created() {
    this.loadIconfontData();
  },
  methods: {
    // 加载Iconfont数据
    async loadIconfontData() {
      try {
        const res = await axios.get(baseUrl + this.iconfontId + ".css");
        const cssJson = res.data;
        this.$set(this, "icons", cssJson.match(/ali-[a-zA-Z0-9-_]*/g));
      } catch (error) {
        this.$message.error("iconfont 加载失败。");
      }
    },
    // 复制到剪贴板
    handleCopy(className) {
      this.$utils.copy(`icon-ali ${className}`);
    }
  }
};
</script>

<style lang='scss' scoped>
.icon-font-page {
  .icon-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(10, 10%);
    width: 100%;
    & li {
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 60px;
      & * {
        transition: all 0.3s;
      }
      & span {
        font-size: 12px;
        overflow: hidden;
        width: 100%;
        text-align: center;
        cursor: text;
      }
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        & i {
          font-size: 40px;
        }
      }
    }
    & .icon-ali {
      font-size: 30px;
    }
  }
}
</style>
