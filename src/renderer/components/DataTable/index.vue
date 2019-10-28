/**
 * @Author: Sun Rising 
 * @Date: 2019-05-19 11:31:28 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-10-28 10:14:40
 * @Description: 多功能数据表格
 */
<template>
  <div class="table-wrap">
    <!-- 表格头部 -->
    <div class="table-title-wrap" v-if="title">
      <!-- 标题区 -->
      <div class="table-title-left">
        <span>
          <i class="icon-ali ali-table1 table-icon" />
          {{title}}
        </span>
      </div>
      <!-- 头部按钮区 -->
      <div class="table-title-right">
        <!-- 表格自动刷新 -->
        <el-button v-if="autoUpdate" type="text" :class="timerSwitch?'icon-color-success':'icon-color-info'" icon="icon-ali ali-shuaxin" :title="timerSwitch?'关闭自动刷新':'开启自动刷新'" @click='handleTimerSwitch'></el-button>
        <!-- 导出到文件 -->
        <el-popover v-if="csvButton" placement="right" trigger="click">
          <el-button slot="reference" type="text" icon="icon-ali ali-ic_download" title="导出CSV"></el-button>
          <el-row>
            <el-button class="icon-size-14" type="text" style="width:100%" size="mini" icon="icon-ali ali-file-csv" @click="exportCsv({original:true})">原始数据</el-button>
          </el-row>
          <el-row>
            <el-button class="icon-size-14" type="text" style="width:100%" size="mini" icon="icon-ali ali-file-csv" @click="exportCsv({original:false})">渲染数据</el-button>
          </el-row>
        </el-popover>
        <!-- 列选择器 -->
        <el-popover v-if="columnButton" placement="right" trigger="click">
          <el-button slot="reference" type="text" icon="icon-ali ali-liebiaolist29" title="列选择" />
          <el-checkbox-group v-model="checkColumn">
            <el-row v-for="item in checkboxColumn" :key="item.key">
              <el-checkbox :label='item.key'>
                {{item.label}}
              </el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-popover>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table-body-wrap">
      <el-table ref="theTable" v-loading='loading' v-bind="tableAttrs" v-on="this.$listeners">
        <el-table-column fixed align="center" type="index" width="50" :index='doGetTableIndex' show-overflow-tooltip />
        <slot></slot>
      </el-table>
    </div>
    <!-- 表格脚 -->
    <div :class='tableFootWrapStyle'>
      <el-pagination v-bind="pageAttrs" @current-change='changePage' @size-change='changeSize' />
    </div>
  </div>
</template>

<script>
import { Table } from "element-ui";
import Utils from "./utils";

//默认的分页参数
let DefaultPageOptions = {
  //总条目数
  total: 0,
  //页码按钮的数量，当总页数超过该值时会折叠
  pagerCount: 7,
  //组件布局，子组件名用逗号分隔
  layout: "prev, pager, next,total,sizes",
  //是否为分页按钮添加背景色
  background: false,
  //只有一页时是否隐藏
  hideOnSinglePage: true,
  //每页显示条目个数
  pageSize: 10,
  //当前页数
  currentPage: 1,
  //每页显示个数选择器的选项设置
  pageSizes: [10, 20, 40, 60, 100],
  //是否禁用
  disabled: false
};

//默认的CSV导出参数
let DefaultCSVOptions = {
  //文件名
  filename: "table.csv",
  //是否导出源数据
  original: false,
  //是否显示表头
  isHeader: true,
  //是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise
  download: true,
  //自定义数据
  data: null,
  //自定义列
  columns: null,
  //列过滤方法，该函数 Function(row,index,list) 的返回值用来决定该列是否导出
  columnFilterMethod: column =>
    ["index", "selection", "expand"].indexOf(column.type) === -1 &&
    column.property,
  //数据过滤方法，该函数 Function(row,index,list) 的返回值用来决定该数据是否导出
  dataFilterMethod: (row, index, list) => {
    return true;
  }
};

export default {
  name: "DataTable",
  props: {
    ...Table.props,
    //分页参数
    pageOptions: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //csv参数
    csvOptions: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //接收列表数据查询方法
    loadDataFunc: {
      type: Function,
      default: null
    },
    //表格标题
    title: {
      type: String,
      default: "Data Table"
    },
    //是否开启索引列，该索引列是基于记录总数非基于列表显示总数
    index: {
      type: Boolean,
      default: false
    },
    //是否开启动态列显示
    columnButton: {
      type: Boolean,
      default: true
    },
    //是否开启CSV下载
    csvButton: {
      type: Boolean,
      default: true
    },
    //初始加载表格
    autoLoad: {
      type: Boolean,
      default: false
    },
    //是否显示自动刷新
    autoUpdate: {
      type: Boolean,
      default: false
    },
    //自动刷新间隔s
    interval: {
      type: Number,
      default: 5000
    },
    //定时器开关
    runTimer: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      //向子组件广播
      $table: this
    };
  },
  data() {
    return {
      //表格遮罩
      loading: false,
      //表格数据
      tableData: [],
      //分页数据
      paginationOptions: Object.assign(
        {},
        DefaultPageOptions,
        this.pageOptions
      ),
      //查询参数
      queryParames: {},
      //列复选框
      checkboxColumn: [],
      //选择的列复选框
      checkColumn: [],
      //定时器
      timer: null,
      //定时器开关
      timerSwitch: this.runTimer
    };
  },
  computed: {
    //表格参数
    tableAttrs() {
      if (this.$props.data.length > 0) {
        Object.assign(this.tableData, this.$props.data);
      }
      return Object.assign({}, this.$props, { data: this.tableData });
    },
    //分页参数
    pageAttrs() {
      return Object.assign(
        {},
        DefaultPageOptions,
        this.$props.pageOptions,
        this.paginationOptions
      );
    },
    //表格脚样式
    tableFootWrapStyle() {
      if (this.border && this.tableData.length > 0) {
        return "table-foot-wrap table-foot-border-wrap";
      } else {
        return "table-foot-wrap";
      }
    }
  },
  mounted() {
    //初始化选择的列
    this.initCheckColumn();
    //自动加载数据
    if (this.autoLoad) {
      this.loadData();
    }
    //定时刷新表格
    this.checkTimer(this.timerSwitch);
  },
  activated: function() {
    this.checkTimer(this.timerSwitch);
  },
  deactivated: function() {
    this.clearTimer();
  },
  destroyed: function() {
    this.clearTimer();
  },
  methods: {
    //定时器状态切换
    handleTimerSwitch() {
      this.timerSwitch = !this.timerSwitch;
      this.checkTimer(this.timerSwitch);
    },
    //检查定时器
    checkTimer(e) {
      e ? this.addTimer() : this.clearTimer();
    },
    //启动定时器
    addTimer() {
      if (!this.timer) {
        if (!this.autoLoad) this.loadData();
        this.timer = setInterval(() => {
          this.loadData();
        }, this.interval);
      }
    },
    //清除定时器
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    //初始化选择的列
    initCheckColumn() {
      this.$slots.default.forEach(value => {
        let comOpt = value.componentOptions;
        if (comOpt && comOpt.propsData && comOpt.propsData.prop) {
          this.checkboxColumn.push({
            key: comOpt.propsData.prop,
            label: comOpt.propsData.label
          });
          this.checkColumn.push(comOpt.propsData.prop);
        }
      });
    },
    //查询表格列表
    async loadData(params) {
      try {
        if (this.loadDataFunc) {
          this.doLock();
          let pageInfo = {
            currentPageNum: this.paginationOptions.currentPage,
            pageSize: this.paginationOptions.pageSize
          };
          let resp = await this.loadDataFunc(
            Object.assign({}, params, pageInfo)
          );
          //解析服务器响应数据
          this.tableData = resp.data.dataBody;
          this.paginationOptions.currentPage = parseInt(
            resp.data.currentPageNum
          );
          this.paginationOptions.pageSize = parseInt(resp.data.pageSize);
          this.paginationOptions.total = parseInt(resp.data.totalRecords);
          this.queryParames = params;
          return resp;
        }
      } finally {
        this.doUnlock();
      }
    },
    //点击页码
    changePage(pageNum) {
      this.paginationOptions.currentPage = pageNum;
      this.loadData(this.queryParames);
    },
    //改变页面记录数
    changeSize(size) {
      this.paginationOptions.pageSize = size;
      this.loadData(this.queryParames);
    },
    //获取列表索引
    doGetTableIndex(index) {
      if (
        this.paginationOptions.currentPage &&
        this.paginationOptions.pageSize
      ) {
        return (
          (this.paginationOptions.currentPage - 1) *
            this.paginationOptions.pageSize +
          index +
          1
        );
      }
      return index + 1;
    },
    //开启遮罩
    doLock() {
      this.loading = true;
    },
    //关闭遮罩
    doUnlock() {
      this.loading = false;
    },
    //导出CSV文件
    exportCsv(options) {
      //合并参数
      let opts = Object.assign({}, DefaultCSVOptions, this.csvOptions, options);
      if (opts.filename.indexOf(".csv") === -1) {
        opts.filename += ".csv";
      }
      //获取列数组
      let columns = this.$refs["theTable"]
        ? this.$refs["theTable"].columns
        : [];
      //获取表格数据字符串
      let csvContent = Utils.getCsvContent(
        opts,
        this.tableData,
        columns,
        this.$el
      );
      //下载
      if (!opts.download) {
        return Promise.resolve(csvContent);
      } else {
        return this.$utils.downloadCsv(opts.filename, csvContent);
      }
    },
    //获取table实例
    getEl() {
      return this.$refs["theTable"];
    }
  }
};
</script>

<style lang="scss">
//数据表格DataTable
.table-wrap {
  display: flex;
  width: 100%;
  flex-direction: column;
  & .table-title-wrap {
    border: 1px solid #ebeef5;
    border-bottom-width: 0px;
    font-size: 14px;
    color: #303133;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(244, 244, 245);
    & .table-title-left {
      letter-spacing: 0.5px;
      & .table-icon {
        margin-right: 2px;
        font-size: 18px;
      }
    }
    & .table-title-right {
      display: flex;
      & > span {
        display: flex;
      }
      & .el-button {
        padding: 0px;
        margin-left: 10px;
        & i {
          font-size: 18px;
        }
      }
    }
  }
  & .table-foot-wrap {
    display: flex;
    flex-direction: row-reverse;
    overflow-x: auto;
    & .el-pagination {
      padding: 8px 0px;
      & .el-select .el-input {
        margin: 0px;
      }
    }
  }
  & .table-foot-border-wrap {
    border: 1px solid #ebeef5;
    border-top-width: 0px;
  }
}
</style>


