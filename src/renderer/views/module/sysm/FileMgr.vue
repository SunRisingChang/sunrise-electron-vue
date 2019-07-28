/**
 * @Author: Sun Rising 
 * @Date: 2019-06-12 15:25:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:55:38
 * @Description: 附件管理
 */
<template>
  <flex-container wrap='nowrap' justifyContent='space-between'>

    <flex-item :grow='1' width='100%'>
      <el-card>
        <flex-container slot="header" justifyContent='space-between'>
          <flex-item alignItems='center'>
            <i class="icon-fa fa-file-o margin-right-6 font-size-16"></i>附件管理
          </flex-item>
          <flex-item alignItems='center'>
            <el-button type="primary" size="mini" @click="handleAddSysFile" circle icon="el-icon-plus" title="添加"></el-button>
            <el-button type="primary" @click="handleQuerySysFile" size="mini" circle icon="el-icon-search" title="查询"></el-button>
            <el-button size="mini" @click="$refs['sysFileForm'].resetFields();startTime=[];" circle plain icon="el-icon-refresh-left" title="重置"></el-button>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap='nowrap'>
          <flex-item class="margin-bottom-10">
            <el-form ref="sysFileForm" :model="sysFileForm" label-position="right" label-width="90px" class="form-style-line">
              <el-row>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="文件名称 :" prop="fileName">
                    <el-input v-model="sysFileForm.fileName" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="外网地址 :" prop="fileUrl">
                    <el-input v-model="sysFileForm.fileUrl" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="文件类型 :" prop="fileType">
                    <el-input v-model="sysFileForm.fileType" maxlength="10" show-word-limit></el-input>
                  </el-form-item>
                </col-pr>
                <col-pr :xs='24' :sm='24' :md='12' :lg='6' :xl='6'>
                  <el-form-item label="文件状态 :" prop="fileStat">
                    <dict-select v-model="sysFileForm.fileStat" dict-key='FileStat' placeholder="请选择" clearable></dict-select>
                  </el-form-item>
                </col-pr>
              </el-row>
            </el-form>
          </flex-item>
          <flex-item>
            <data-table ref="sysFileTable" border index auto-load highlight-current-row auto-update column-button csv-button title="Data Table" :load-data-func='loadSysFile'>
              <data-table-column prop="fileName" label="文件名称" show-overflow-tooltip></data-table-column>
              <data-table-column prop="fileMd5" label="文件MD5" show-overflow-tooltip></data-table-column>
              <data-table-column prop="filePath" label="服务器存放地址" show-overflow-tooltip></data-table-column>
              <data-table-column prop="fileUrl" label="外网访问地址" show-overflow-tooltip></data-table-column>
              <data-table-column prop="fileType" label="文件类型" width='70' show-overflow-tooltip></data-table-column>
              <data-table-column prop="fileSize" label="文件大小(KB)" width='100' show-overflow-tooltip></data-table-column>
              <data-table-column prop="fileStat" label="文件状态" align='center' width='80'>
                <template slot-scope="scope">
                  <el-tooltip :content="$utils.getDictSelectValue('FileStat',scope.row.fileStat)" placement="top">
                    <el-switch v-model="scope.row.fileStat" @change='e=>doChangeFileStat(e,scope.row)' active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="2">
                    </el-switch>
                  </el-tooltip>
                </template>
              </data-table-column>
              <data-table-column prop="createdUser" label="创建人" width='60' show-overflow-tooltip></data-table-column>
              <data-table-column prop="createdTime" label="创建时间" width='135' :formatter='$utils.tableColTimeFormt'></data-table-column>
              <data-table-column prop="updatedUser" label="更新人" width='60' show-overflow-tooltip></data-table-column>
              <data-table-column prop="updatedTime" label="更新时间" width='135' :formatter='$utils.tableColTimeFormt'></data-table-column>
              <data-table-column prop="op" width='80' label="操作" align='center'>
                <template slot-scope="scope">
                  <el-button type="text" @click="$utils.downFile(scope.row.fileUrl)" size="mini" icon="icon-ali ali-xiazai" title="下载" />
                  <el-button type="text" @click="handleDelSysFile(scope.row)" size="mini" icon="el-icon-delete" title="删除" />
                </template>
              </data-table-column>
            </data-table>
          </flex-item>
        </flex-container>
      </el-card>
    </flex-item>

    <!-- 文件 -->
    <dialog-drag :visible.sync="showSysFileDia" :before-close='doSysFileDiaClose'>
      <span slot="title">
        <i class="el-icon-upload margin-right-4"></i>文件上传
      </span>
      <flex-container>
        <flex-item width='100%'>
          <file-updata ref="fileUpdata" :action="updataUrl" :auto-upload='false' drag multiple></file-updata>
        </flex-item>
        <flex-container class="footer" justifyContent='flex-end'>
          <el-button @click="$refs['fileUpdata'].getEl().abort()">中 断</el-button>
          <el-button type="primary" @click="$refs['fileUpdata'].getEl().submit()">上 传</el-button>
        </flex-container>
      </flex-container>
    </dialog-drag>

  </flex-container>
</template>

<script>
import SysFileApi from "@/api/sysm/sysFileApi.js";
import FileUpdata from "@/components/FileUpdata/index";

export default {
  components: { FileUpdata },
  data() {
    return {
      //显示文件面板
      showSysFileDia: false,
      //文件查询form
      sysFileForm: {
        fileName: "",
        fileUrl: "",
        fileType: "",
        fileStat: ""
      },
      //组件传值
      sysFile: {},
      updataUrl: SysFileApi.getSaveSysFileUrl()
    };
  },
  methods: {
    //文件查询接口
    loadSysFile(params) {
      return SysFileApi.querySysFile(params);
    },
    //查询按钮
    handleQuerySysFile() {
      this.$refs["sysFileTable"].loadData(this.sysFileForm);
    },
    //删除文件
    async handleDelSysFile(row) {
      try {
        await SysFileApi.delSysFile([row.uuid]);
      } catch (error) {
      } finally {
        this.handleQuerySysFile();
      }
    },
    //修改文件状态
    async doChangeFileStat(newVal, row) {
      try {
        await SysFileApi.changeSysFileStat([row.uuid], newVal);
      } catch (error) {
      } finally {
        this.handleQuerySysFile();
      }
    },
    //添加文件
    handleAddSysFile() {
      this.showSysFileDia = true;
    },
    //弹出层关闭回调
    doSysFileDiaClose(done) {
      this.handleQuerySysFile();
      done();
    }
  }
};
</script>
