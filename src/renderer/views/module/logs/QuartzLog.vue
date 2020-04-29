/**
 * @Author: Sun Rising 
 * @Date: 2019-06-12 15:25:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-26 09:37:08
 * @Description: quartz日志
 */
<template>
  <flex-container wrap="nowrap" justifyContent="space-between">
    <flex-item :grow="1" width="100%">
      <el-card>
        <flex-container slot="header" justifyContent="space-between">
          <flex-item alignItems="center">
            <i class="el-icon-watch margin-right-6 font-size-16"></i>任务日志
          </flex-item>
          <flex-item alignItems="center">
            <el-button type="primary" @click="handleQueryLogQuartz" size="mini" circle icon="el-icon-search" title="查询"></el-button>
            <el-button size="mini" @click="$refs['logQuartzForm'].resetFields();startTime=[];" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap="nowrap">
          <flex-item class="margin-bottom-10">
            <el-form ref="logQuartzForm" :model="logQuartzForm" label-position="right" label-width="90px" class="form-style-line">
              <el-row>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="任务名称 :" prop="qtzName">
                    <el-input v-model="logQuartzForm.qtzName" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="任务组 :" prop="qtzGroup">
                    <el-input v-model="logQuartzForm.qtzGroup" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="日志等级 :" prop="logLeve">
                    <dict-select v-model="logQuartzForm.logLeve" dict-key="LogLeve" placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="服务器名称 :" prop="svrName">
                    <el-input v-model="logQuartzForm.svrName" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
                  <el-form-item label="服务器地址 :" prop="svrAddr">
                    <el-input v-model="logQuartzForm.svrAddr" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
                  <el-form-item label="开始时间 :" prop="startTime">
                    <el-date-picker v-model="startTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="logQuartzTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func="loadLogQuartz" :row-class-name="doRowClassName">
              <data-table-column prop="qtzName" label="任务名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="qtzGroup" label="任务组" show-overflow-tooltip></data-table-column>
              <data-table-column prop="logLeve" label="日志等级" width="80" :formatter="row=>$utils.tableColDictFormt('LogLeve',row.logLeve)"></data-table-column>
              <data-table-column prop="svrName" label="服务器名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="svrAddr" label="服务器地址" width="120"></data-table-column>
              <data-table-column prop="startTime" label="开始时间" width="140" :formatter="$utils.tableColTimeFormt"></data-table-column>
              <data-table-column prop="procTime" label="耗时(μs)" width="75"></data-table-column>
              <data-table-column prop="op" label="操作" align="center" width="80">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleEyeLogQuartz(scope.row)" size="mini" icon="el-icon-more" title="查看" />
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <!-- 任务 -->
    <dialog-drag title="任务编辑" :visible.sync="showLogQuartzDia">
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>任务日志详情
      </span>
      <quartz-log-eye :initData="logquartz" @close="showLogQuartzDia=false"></quartz-log-eye>
    </dialog-drag>
  </flex-container>
</template>

<script>
import LogQuartzApi from "@/api/logs/LogQuartzApi.js";
import QuartzLogEye from "./QuartzLog_eye";

export default {
  components: {
    QuartzLogEye
  },
  data() {
    return {
      //显示任务面板
      showLogQuartzDia: false,
      //任务查询form
      logQuartzForm: {
        qtzName: "",
        qtzGroup: "",
        logLeve: "",
        svrName: "",
        svrAddr: ""
      },
      //组件传值
      logquartz: {},
      //开始时间查询
      startTime: []
    };
  },
  methods: {
    // 动态显示行数据的颜色来表示是否执行成功
    doRowClassName({ row, rowIndex }) {
      if (row.execInfo) {
        return "error-row";
      } else {
        return "success-row";
      }
    },
    //任务查询接口
    loadLogQuartz(params) {
      return LogQuartzApi.queryLogQuartz(params);
    },
    //查询按钮
    handleQueryLogQuartz() {
      //处理时间
      let params = Object.assign({}, this.logQuartzForm);
      if (this.startTime && this.startTime.length === 2) {
        Object.assign(params, {
          startTimeStart: this.startTime[0].getTime(),
          startTimeEnd: this.startTime[1].getTime()
        });
      }
      this.$refs["logQuartzTable"].loadData(params);
    },
    //查看任务
    handleEyeLogQuartz(row) {
      this.logquartz = Object.assign({}, row);
      this.showLogQuartzDia = true;
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-table .error-row {
  background: #fef0f0;
}

/deep/.el-table .success-row {
  background: #f0f9eb;
}
</style>