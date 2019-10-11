/**
 * @Author: Sun Rising 
 * @Date: 2019-06-12 15:25:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 19:04:19
 * @Description: 交互日志
 */
<template>
  <flex-container wrap='nowrap' justifyContent='space-between'>

    <flex-item :grow='1' width='100%'>
      <el-card>
        <flex-container slot="header" justifyContent='space-between'>
          <flex-item alignItems='center'>
            <i class="el-icon-connection margin-right-6 font-size-16"></i>交互日志
          </flex-item>
          <flex-item alignItems='center'>
            <el-button type="primary" @click="handleQueryLogOper" size="mini" circle icon="el-icon-search" title="查询"></el-button>
            <el-button size="mini" @click="$refs['logOperForm'].resetFields();startTime=[];" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap='nowrap'>
          <flex-item class="margin-bottom-10">
            <el-form ref="logOperForm" :model="logOperForm" label-position="right" label-width="90px" class="form-style-line">
              <el-row>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="请求路径 :" prop="reqUrl">
                    <el-input v-model="logOperForm.reqUrl" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="路径说明 :" prop="urlDesc">
                    <el-input v-model="logOperForm.urlDesc" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="服务器地址 :" prop="svrAdrr">
                    <el-input v-model="logOperForm.svrAdrr" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="服务器名称 :" prop="svrName">
                    <el-input v-model="logOperForm.svrName" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="响应代码 :" prop="respCode">
                    <el-input v-model="logOperForm.respCode" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='12' :xl='6'>
                  <el-form-item label="开始时间 :" prop="startTime">
                    <el-date-picker v-model="startTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="logOperTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func='loadLogOper'>
              <data-table-column prop="reqUrl" label="请求路径" show-overflow-tooltip></data-table-column>
              <data-table-column prop="urlDesc" label="路径说明" show-overflow-tooltip></data-table-column>
              <data-table-column prop="svrAdrr" label="服务器地址" show-overflow-tooltip></data-table-column>
              <data-table-column prop="svrName" label="服务器名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="cliAdrr" label="客户端地址" show-overflow-tooltip></data-table-column>
              <data-table-column prop="cliDesc" label="客户端说明" show-overflow-tooltip></data-table-column>
              <data-table-column prop="startTime" label="操作开始" width='140' :formatter='$utils.tableColTimeFormt'></data-table-column>
              <data-table-column prop="procTime" label="耗时(ms)" width='80'></data-table-column>
              <data-table-column prop="respCode" label="响应代码" width='70'></data-table-column>
              <data-table-column prop="respDesc" label="响应说明" show-overflow-tooltip></data-table-column>
              <data-table-column prop="opUser" label="操作人" width='70' show-overflow-tooltip></data-table-column>
              <data-table-column prop="execInfo" label="异常堆栈" show-overflow-tooltip></data-table-column>
              <data-table-column prop="op" label="操作" align='center' width='80'>
                <template slot-scope="scope">
                  <el-button type="text" @click="handleEyeLogOper(scope.row)" size="mini" icon="el-icon-more" title="查看" />
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <!-- 任务 -->
    <dialog-drag title="任务编辑" :visible.sync="showLogOperDia">
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>交互日志详情
      </span>
      <oper-log-eye :initData='logOper' @close='showLogOperDia=false'></oper-log-eye>
    </dialog-drag>

  </flex-container>
</template>

<script>
import LogOperApi from "@/api/logs/LogOperApi.js";
import OperLogEye from "./OperLog_eye";

export default {
  components: {
    OperLogEye
  },
  data() {
    return {
      //显示任务面板
      showLogOperDia: false,
      //任务查询form
      logOperForm: {
        qtzName: "",
        qtzGroup: "",
        logLeve: "",
        svrName: "",
        svrAddr: ""
      },
      //组件传值
      logOper: {},
      //开始时间查询
      startTime: []
    };
  },
  methods: {
    //任务查询接口
    loadLogOper(params) {
      return LogOperApi.queryLogOper(params);
    },
    //查询按钮
    handleQueryLogOper() {
      //处理时间
      let params = Object.assign({}, this.logOperForm);
      if (this.startTime && this.startTime.length === 2) {
        Object.assign(params, {
          startTimeStart: this.startTime[0].getTime(),
          startTimeEnd: this.startTime[1].getTime()
        });
      }
      this.$refs["logOperTable"].loadData(params);
    },
    //查看任务
    handleEyeLogOper(row) {
      this.logOper = Object.assign({}, row);
      this.showLogOperDia = true;
    }
  }
};
</script>
