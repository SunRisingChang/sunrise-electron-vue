/**
 * @Author: Sun Rising 
 * @Date: 2019-01-02 09:44:04 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:53:11
 * @Description: 任务管理
 */
<template>
  <flex-container>

    <flex-item :grow='1' width='100%'>
      <el-card>
        <flex-container slot="header" justifyContent='space-between'>
          <flex-item alignItems='center'>
            <i class="el-icon-alarm-clock margin-right-6 font-size-16"></i>任务管理
          </flex-item>
          <flex-item alignItems='center'>
            <el-button type="primary" size="mini" circle icon="el-icon-plus" @click="handleAddQuartz" title="添加"></el-button>
            <el-button type="primary" size="mini" circle icon="el-icon-search" @click="handleQueryQuartz" title="查询"></el-button>
            <el-button size="mini" circle plain icon="el-icon-refresh-left" @click="$refs['quartzForm'].resetFields()" title="重置"></el-button>
            <el-button size="mini" circle plain icon="el-icon-video-play" :disabled="!tableMultipleSelection.length>0" @click="handleResumeJobs" title="批量启用"></el-button>
            <el-button size="mini" circle plain icon="el-icon-video-pause" :disabled="!tableMultipleSelection.length>0" @click="handlePauseJobs" title="批量暂停"></el-button>
            <el-button size="mini" circle plain icon="el-icon-delete" :disabled="!tableMultipleSelection.length>0" @click="handleDelJobs" title="批量删除"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap='nowrap'>
          <flex-item class="margin-bottom-10">
            <el-form ref="quartzForm" :model="quartzForm" label-position="right" label-width="80px" class="form-style-line">
              <el-row>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="任务名称" prop="quartzName">
                    <el-input v-model="quartzForm.quartzName" maxlength="20" show-word-limit />
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="任务组" prop="quartzGroup">
                    <el-input v-model="quartzForm.quartzGroup" maxlength="20" show-word-limit />
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="执行状态" prop="quartzStat">
                    <dict-select v-model="quartzForm.quartzStat" dict-key='QuartzRunStat' placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="quartzTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func='loadQuartz' @selection-change='handleSelectionChange'>
              <data-table-column prop="selection" type="selection" align='center' width="50" fixed='left'></data-table-column>
              <data-table-column prop="quartzName" label="任务名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="quartzGroup" label="任务组" show-overflow-tooltip></data-table-column>
              <data-table-column prop="quartzStat" label="执行状态" show-overflow-tooltip :formatter='row=>$utils.tableColDictFormt("QuartzRunStat",row.quartzStat)'></data-table-column>
              <data-table-column prop="quartzClass" label="执行类路径" show-overflow-tooltip></data-table-column>
              <data-table-column prop="quartzCron" label="Cron表达式" width="90" align="center"></data-table-column>
              <data-table-column prop="quartzDesc" label="任务描述" show-overflow-tooltip></data-table-column>
              <data-table-column prop="op" label="操作" fixed='right' width="150" align="center">
                <template slot-scope="scope">
                  <el-button type="text" :disabled="scope.row.quartzStat==='1'" icon="el-icon-edit" title="编辑" @click="handleEditQuartz(scope.row)"></el-button>
                  <el-button type="text" :disabled="scope.row.quartzStat==='1'" icon="el-icon-delete" title="删除" @click="handleDelJob(scope.row)"></el-button>
                  <el-button type="text" :disabled="scope.row.quartzStat==='1'" icon="el-icon-video-play" title="启用" @click="handleResumeJob(scope.row)"></el-button>
                  <el-button type="text" :disabled="scope.row.quartzStat==='2'" icon="el-icon-video-pause" title="暂停" @click="handlePauseJob(scope.row)"></el-button>
                  <el-button type="text" icon="el-icon-more" title="详情" @click="handleViewJob(scope.row)"></el-button>
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <!-- Quartz信息修改|添加面板 -->
    <dialog-drag :visible.sync="showQuartzDia" top='8vh'>
      <span slot="title">
        <i class="el-icon-edit margin-right-4"></i>{{quartzEditReadonly?'任务详情':'任务编辑'}}
      </span>
      <quartz-mgr-edit :readonly='quartzEditReadonly' :initData='editQuartz' @updataData='doUpdataQuartz' @close='showQuartzDia=false'></quartz-mgr-edit>
    </dialog-drag>

  </flex-container>
</template>

<script>
import QuartzMgrEdit from "./QuartzMgr_edit";
import SysQuartzApi from "@/api/sysm/sysQuartzApi.js";

//默认的Quartz信息
let DefaultQuartz = {
  uuid: null,
  // 任务名称
  quartzName: "",
  // 任务组
  quartzGroup: "",
  // 执行状态
  quartzStat: "",
  // 执行类路径
  quartzClass: "",
  // cron表达式
  quartzCron: "",
  // 任务异常
  quartzExce: "",
  // 任务说明
  quartzDesc: "",
  // 初始参数
  quartzParams: "",
  // 执行规则
  quartzMisfire: "1",
  // 优先级
  quartzPriority: 0,
  // 立即运行
  isRun: false,
  // 创建人
  createdUser: "",
  // 创建时间
  createdTime: "",
  // 更新人
  updatedUser: "",
  // 更新时间
  updatedTime: ""
};

export default {
  components: { QuartzMgrEdit },
  provide() {
    return {
      // 任务执行类
      jobClass: this.jobClass
    };
  },
  data() {
    return {
      //表单层是否只读
      quartzEditReadonly: false,
      //显示Quartz编辑层
      showQuartzDia: false,
      //查询表单
      quartzForm: {
        quartzName: null,
        quartzGroup: null,
        quartzStat: null
      },
      //表格是否进行多选
      tableMultipleSelection: [],
      //组件传值
      editQuartz: {},
      //job实现类
      jobClass: []
    };
  },
  mounted() {
    this.loadJobClass();
  },
  methods: {
    //初始化任务实现类
    async loadJobClass() {
      try {
        let resp = await SysQuartzApi.getJobClass();
        this.$utils.clear(this.jobClass);
        resp.data.forEach(element => this.jobClass.push(element));
      } catch (error) {}
    },
    //Quartz查询接口
    loadQuartz(params) {
      return SysQuartzApi.querySysQuartz(params);
    },
    //查询按钮
    handleQueryQuartz() {
      this.$refs["quartzTable"].loadData(this.quartzForm);
    },
    //添加按钮
    handleAddQuartz() {
      this.editQuartz = Object.assign({}, DefaultQuartz);
      this.quartzEditReadonly = false;
      this.showQuartzDia = true;
    },
    //任务修改
    handleEditQuartz(row) {
      this.editQuartz = Object.assign({}, DefaultQuartz, row);
      this.quartzEditReadonly = false;
      this.showQuartzDia = true;
    },
    //详情按钮
    handleViewJob(row) {
      this.editQuartz = Object.assign({}, DefaultQuartz, row);
      this.quartzEditReadonly = true;
      this.showQuartzDia = true;
    },
    //批量监听
    handleSelectionChange(tableMultipleSelection) {
      let _tableMultipleSelection = [];
      tableMultipleSelection.forEach(value => {
        _tableMultipleSelection.push(value.uuid);
      });
      this.tableMultipleSelection = _tableMultipleSelection;
    },
    //运行任务
    async handleResumeJob(row) {
      try {
        await SysQuartzApi.resumeSysQuartz([row.uuid]);
      } catch (error) {
      } finally {
        this.handleQueryQuartz();
      }
    },
    //批量运行任务
    async handleResumeJobs() {
      try {
        if (this.tableMultipleSelection.length > 0)
          await SysQuartzApi.resumeSysQuartz(this.tableMultipleSelection);
      } catch (error) {
      } finally {
        this.handleQueryQuartz();
      }
    },
    //暂停任务
    async handlePauseJob(row) {
      try {
        await SysQuartzApi.pauseSysQuartz([row.uuid]);
      } catch (error) {
      } finally {
        this.handleQueryQuartz();
      }
    },
    //批量暂停任务
    async handlePauseJobs() {
      try {
        if (this.tableMultipleSelection.length > 0)
          await SysQuartzApi.pauseSysQuartz(this.tableMultipleSelection);
      } catch (error) {
      } finally {
        this.handleQueryQuartz();
      }
    },
    //删除任务
    async handleDelJob(row) {
      try {
        await SysQuartzApi.delSysQuartz([row.uuid]);
      } catch (error) {
        console.log(error);
      } finally {
        this.handleQueryQuartz();
      }
    },
    //批量删除任务
    async handleDelJobs() {
      try {
        if (this.tableMultipleSelection.length > 0)
          await SysQuartzApi.delSysQuartz(this.tableMultipleSelection);
      } catch (error) {
      } finally {
        this.handleQueryQuartz();
      }
    },
    //Quartz更新回调
    async doUpdataQuartz(data) {
      try {
        await SysQuartzApi.saveSysQuartz(data);
      } finally {
        this.handleQueryQuartz();
      }
    }
  }
};
</script>

