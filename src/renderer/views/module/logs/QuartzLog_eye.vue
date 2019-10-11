/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 19:03:46
 * @Description: Quartz日志查看
 */
<template>
  <flex-container>

    <el-form ref="editForm" label-position="right" label-width="90px" class="form-style-line" disabled>
      <el-row :span='12'>
        <el-col>
          <el-form-item label="任务名称 :" prop="qtzName">
            <el-input :value="initData.qtzName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="任务组 :" prop="qtzGroup">
            <el-input :value="initData.qtzGroup"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="日志等级 :" prop="logLeve">
            <dict-select :value="initData.logLeve" dict-key='LogLeve'></dict-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="服务器名称 :" prop="svrName">
            <el-input :value="initData.svrName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="服务器地址 :" prop="svrAddr">
            <el-input :value="initData.svrAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="开始时间 :" prop="startTime">
            <el-input :value="$utils.toDateString(initData.startTime,'yyyy-MM-dd HH:mm:ss')"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="耗时(ms) :" prop="procTime">
            <el-input :value="initData.procTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="异常信息 :" prop="execInfo">
            <el-input type="textarea" :autosize='{ minRows: 2, maxRows: 6 }' :value="initData.execInfo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </flex-container>
</template>

<script>
export default {
  props: {
    initData: {
      type: Object
    }
  }
};
</script>

