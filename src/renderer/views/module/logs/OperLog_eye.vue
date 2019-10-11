/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 19:04:27
 * @Description: 交互日志查看
 */
<template>
  <flex-container>

    <el-form ref="editForm" label-position="right" label-width="90px" class="form-style-line" disabled>
      <el-row :span='12'>
        <el-col>
          <el-form-item label="请求路径 :" prop="reqUrl">
            <el-input :value="initData.reqUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="路径说明 :" prop="urlDesc">
            <el-input :value="initData.urlDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="服务器地址 :" prop="svrAdrr">
            <el-input :value="initData.svrAdrr"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="服务器名称 :" prop="svrName">
            <el-input :value="initData.svrName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="客户端地址 :" prop="cliAdrr">
            <el-input :value="initData.cliAdrr"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="客户端说明 :" prop="cliDesc">
            <el-input type="textarea" :autosize='{ minRows: 2, maxRows: 6 }' :value="initData.cliDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="操作开始 :" prop="startTime">
            <el-input :value="$utils.toDateString(initData.startTime,'yyyy-MM-dd HH:mm:ss')"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="耗时(ms) :" prop="procTime">
            <el-input :value="initData.procTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="响应代码 :" prop="respCode">
            <el-input :value="initData.respCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="响应说明 :" prop="respDesc">
            <el-input :value="initData.respDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="操作人 :" prop="opUser">
            <el-input :value="initData.opUser"></el-input>
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

