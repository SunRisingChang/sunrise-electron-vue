/**
 * @Author: Sun Rising 
 * @Date: 2019-07-08 21:15:16 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 13:45:22
 * @Description: 主页仪表盘
 */
<template>
  <flex-container class="main-page" direction="column" wrap='nowrap'>
    <flex-container class="margin-bottom-10" justifyContent='space-between'>
      <flex-item :grow='1'>
        <div class="item-block item-block1">
          <div>
            <span>分类统计</span>
            <span>实时</span>
          </div>
          <div>
            <span>
              <count-to ref="example" :start-val="0" :end-val="9832" autoplay />
            </span>
          </div>
          <div>
            <span><i class="el-icon-eleme"></i></span>
            <span>9832</span>
          </div>
          <div>
            <span>当前分类总记录数</span>
          </div>
        </div>
      </flex-item>
      <flex-item :grow='1' class="margin-left-10">
        <div class="item-block item-block2">
          <div>
            <span>附件统计</span>
            <span>实时</span>
          </div>
          <div>
            <span>
              <count-to ref="example" :start-val="0" :end-val="2693" autoplay />
            </span>
          </div>
          <div>
            <span><i class="el-icon-s-goods"></i></span>
            <span>2693</span>
          </div>
          <div>
            <span>当前分类总记录数</span>
          </div>
        </div>
      </flex-item>
      <flex-item :grow='1' class="margin-left-10">
        <div class="item-block item-block3">
          <div>
            <span>文章统计</span>
            <span>实时</span>
          </div>
          <div>
            <span>
              <count-to ref="example" :start-val="0" :end-val="1936" autoplay />
            </span>
          </div>
          <div>
            <span><i class="el-icon-s-promotion"></i></span>
            <span>1936</span>
          </div>
          <div>
            <span>当前分类总记录数</span>
          </div>
        </div>
      </flex-item>
      <flex-item :grow='1' class="margin-left-10">
        <div class="item-block item-block4">
          <div>
            <span>新闻统计</span>
            <span>实时</span>
          </div>
          <div>
            <span>
              <count-to ref="example" :start-val="0" :end-val="2019" autoplay />
            </span>
          </div>
          <div>
            <span><i class="el-icon-s-comment"></i></span>
            <span>2019</span>
          </div>
          <div>
            <span>当前分类总记录数</span>
          </div>
        </div>
      </flex-item>
    </flex-container>
    <flex-container class="margin-bottom-10" justifyContent='space-between'>
      <flex-item :grow='1' width='49%'>
        <el-card>
          <flex-container direction="column" wrap='nowrap'>
            <flex-item class="margin-bottom-10" alignItems='center'>
              <i class="icon-fa fa-line-chart margin-right-5"></i>
              <span>今日话题</span>
            </flex-item>
            <flex-item>
              <ve-line width='100%' :grid='grid' :data="chartData" :toolbox="toolbox"></ve-line>
            </flex-item>
          </flex-container>
        </el-card>
      </flex-item>
      <flex-item :grow='1' width='49%' class="margin-left-10">
        <el-card>
          <flex-container direction="column" wrap='nowrap'>
            <flex-item class="margin-bottom-10" alignItems='center'>
              <i class="icon-fa fa-bar-chart margin-right-5"></i>
              <span>新闻统计</span>
            </flex-item>
            <flex-item>
              <ve-histogram width='100%' :grid='grid' :data="chartData" :toolbox="toolbox"></ve-histogram>
            </flex-item>
          </flex-container>
        </el-card>
      </flex-item>
    </flex-container>
    <flex-container justifyContent='space-between'>
      <flex-item width='30%' :grow='1'>
        <el-card class="item3-block item3-block1">
          <flex-container direction="column" wrap='nowrap'>
            <flex-item class="margin-bottom-10" alignItems='center'>
              <i class="el-icon-user margin-right-5"></i>
              <span>作者信息</span>
            </flex-item>
            <flex-item>
              <flex-container class="userInfo" direction="column" wrap='nowrap'>
                <p>姓名: Sun Rising</p>
                <p>码云: <el-link href="https://gitee.com/sunrise-chang" target="_blank">链接</el-link>
                </p>
                <p>Github: <el-link href="https://github.com/SunRisingChang" target="_blank">链接</el-link>
                </p>
                <p>Marketplace: <el-link href="https://marketplace.visualstudio.com/publishers/SunRising" target="_blank">链接</el-link>
                </p>
              </flex-container>
            </flex-item>
          </flex-container>
        </el-card>
      </flex-item>
      <flex-item width='30%' :grow='1' class="margin-left-10">
        <el-card class="item3-block item3-block2">
          <flex-container direction="column" wrap='nowrap'>
            <flex-item class="margin-bottom-10" alignItems='center'>
              <i class="el-icon-time margin-right-5"></i>
              <span>更新历史</span>
            </flex-item>
            <flex-item>
              <el-scrollbar>
                <el-timeline>
                  <el-timeline-item timestamp="2018/4/12" placement="top">
                    <h4>更新 Github 模板</h4>
                    <p>Sun Rising 提交于 2018/4/12 20:46</p>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/3" placement="top">
                    <h4>更新 Github 模板</h4>
                    <p>Sun Rising 提交于 2018/4/3 20:46</p>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <h4>更新 Github 模板</h4>
                    <p>Sun Rising 提交于 2018/4/2 20:46</p>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <h4>更新 Github 模板</h4>
                    <p>Sun Rising 提交于 2018/4/2 20:46</p>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <h4>更新 Github 模板</h4>
                    <p>Sun Rising 提交于 2018/4/2 20:46</p>
                  </el-timeline-item>
                </el-timeline>
              </el-scrollbar>
            </flex-item>
          </flex-container>
        </el-card>
      </flex-item>
      <flex-item width='30%' :grow='1' class="margin-left-10">
        <el-card class="item3-block item3-block3">
          <flex-container direction="column" wrap='nowrap'>
            <flex-item class="margin-bottom-10" alignItems='center'>
              <i class="el-icon-warning-outline margin-right-5"></i>
              <span>版本信息</span>
            </flex-item>
            <flex-container class="verInfo" direction="column" wrap='nowrap'>
              <p>当前版本: sunrise-v1.0.0</p>
              <p>基于框架: Vue、Element UI</p>
              <p>关于版权</p>
              <div>
                Sunrise 虽然是开源项目但不允许直接进行二次销售，必须经作者同意或二次开发后进行销售。不得恶意分享产品源代码，违者将承担相应的法律责任。
              </div>
              <p>© 2018 sunrise.com 版权所有</p>
            </flex-container>
          </flex-container>
        </el-card>
      </flex-item>
    </flex-container>
  </flex-container>
</template>

<script>
import countTo from "vue-count-to";

export default {
  components: { countTo },
  data() {
    return {
      chartData: {
        columns: ["日期", "成本", "利润"],
        rows: [
          { 日期: "1月1日", 成本: 15, 利润: 12 },
          { 日期: "1月2日", 成本: 12, 利润: 25 },
          { 日期: "1月3日", 成本: 21, 利润: 10 },
          { 日期: "1月4日", 成本: 41, 利润: 32 },
          { 日期: "1月5日", 成本: 31, 利润: 30 },
          { 日期: "1月6日", 成本: 71, 利润: 55 }
        ]
      },
      grid: { bottom: 10 },
      toolbox: {
        feature: {
          magicType: { type: ["line", "bar"] },
          saveAsImage: {}
        }
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.main-page {
  .item-block {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    color: #fff;
    & > div {
      margin: 0 10px;
      display: flex;
      font-size: 14px;
      &:nth-child(1) {
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        & > span:nth-child(2) {
          border-radius: 2px;
          width: 40px;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
      &:nth-child(2) {
        height: 50px;
        line-height: 50px;
        font-size: 24px;
      }
      &:nth-child(3),
      &:nth-child(4) {
        margin-bottom: 10px;
      }
    }
  }
  .item-block1 {
    /*! autoprefixer: off */
    background: -webkit-gradient(linear, top, #0073b7, #0073b7);
    background: -webkit-linear-gradient(top, #0073b7, #0073b7);
    /* autoprefixer: on */
    background: -moz-linear-gradient(top, #0073b7, #0073b7);
    background: -o-linear-gradient(top, #0073b7, #0073b7);
    background: linear-gradient(top, #0073b7, #0073b7);
    & > div {
      &:nth-child(1) {
        & > span:nth-child(2) {
          background-color: #18bc9c;
        }
      }
    }
  }
  .item-block2 {
    /*! autoprefixer: off */
    background: -webkit-gradient(linear, top, #50a6e0, #3699db);
    background: -webkit-linear-gradient(top, #50a6e0, #3699db);
    /* autoprefixer: on */
    background: -moz-linear-gradient(top, #50a6e0, #3699db);
    background: -o-linear-gradient(top, #50a6e0, #3699db);
    background: linear-gradient(top, #50a6e0, #3699db);
    & > div {
      &:nth-child(1) {
        & > span:nth-child(2) {
          background-color: #3498db;
        }
      }
    }
  }
  .item-block3 {
    /*! autoprefixer: off */
    background: -webkit-gradient(linear, top, #918ec2, #635fa9);
    background: -webkit-linear-gradient(top, #918ec2, #635fa9);
    /* autoprefixer: on */
    background: -moz-linear-gradient(top, #918ec2, #635fa9);
    background: -o-linear-gradient(top, #918ec2, #635fa9);
    background: linear-gradient(top, #918ec2, #635fa9);
    & > div {
      &:nth-child(1) {
        & > span:nth-child(2) {
          background-color: #2c3e50;
        }
      }
    }
  }
  .item-block4 {
    /*! autoprefixer: off */
    background: -webkit-gradient(linear, top, #1cdab5, #18be9d);
    background: -webkit-linear-gradient(top, #1cdab5, #18be9d);
    /* autoprefixer: on */
    background: -moz-linear-gradient(top, #1cdab5, #18be9d);
    background: -o-linear-gradient(top, #1cdab5, #18be9d);
    background: linear-gradient(top, #1cdab5, #18be9d);
    & > div {
      &:nth-child(1) {
        & > span:nth-child(2) {
          background-color: #2c3e50;
        }
      }
    }
  }
  .item3-block {
    height: 400px;
    .el-card__body {
      overflow: hidden;
    }
    & .el-scrollbar {
      height: 339px;
      width: 100%;
      .is-horizontal {
        display: none;
      }
    }
  }
  .item3-block1 {
    .userInfo {
      font-size: 14px;
      p {
        margin-bottom: 5px;
      }
      div {
        background-color: #f2f2f2;
        padding: 10px;
        font-size: 12px;
      }
    }
  }
  .item3-block3 {
    p {
      margin-bottom: 5px;
      &:nth-child(2) {
        margin-bottom: 10px;
      }
    }
    .verInfo {
      font-size: 14px;
      div {
        background-color: #f2f2f2;
        padding: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>


