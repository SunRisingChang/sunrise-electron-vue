<template>
  <el-form>
    <el-radio-group v-model='radioValue'>
      <el-row class="margin-10">
        <el-radio :label="1"> 分，允许的通配符[, - * /]</el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="2">
          周期从
          <el-input-number class="el-input-height" :min="1" v-model='cycle01' /> -
          <el-input-number class="el-input-height" :min="1" v-model='cycle02' /> 分
        </el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="3">
          从
          <el-input-number class="el-input-height" :min="1" v-model='average01' /> 分开始，每
          <el-input-number class="el-input-height" :min="1" v-model='average02' /> 分执行一次
        </el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="4">
          任意指定
          <el-button size="mini" @click="checkboxList=[]">清空指定</el-button>
          <el-row class="margin-top-10">
            <el-checkbox-group v-model="checkboxList">
              <el-col :xs="3" :sm='2' v-for='(item,index) in 60' :key="item">
                <el-checkbox :label="item-1">
                  {{index+1>10?item-1:'0'+(item-1)}}
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </el-radio>
      </el-row>
    </el-radio-group>
  </el-form>
</template>

<script>
import crontabMin from "./crontab-min";
export default crontabMin;
</script>