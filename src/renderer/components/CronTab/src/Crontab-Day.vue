<template>
  <el-form>
    <el-radio-group v-model='radioValue'>
      <el-row class="margin-10">
        <el-radio :label="1"> 日，允许的通配符[, - * /]</el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="2"> 不指定</el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="3">
          周期从
          <el-input-number class="el-input-height" :min="1" v-model='cycle01' /> -
          <el-input-number class="el-input-height" :min="1" v-model='cycle02' /> 日
        </el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="4">
          从
          <el-input-number class="el-input-height" :min="1" v-model='average01' /> 号开始，每
          <el-input-number class="el-input-height" :min="1" v-model='average02' /> 日执行一次
        </el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="5">
          每月
          <el-input-number class="el-input-height" :min="1" v-model='workday' /> 号最近的那个工作日
        </el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="6"> 本月最后一天</el-radio>
      </el-row>
      <el-row class="margin-10">
        <el-radio :label="7">
          任意指定
          <el-button size="mini" @click="checkboxList=[]">清空指定</el-button>
          <el-row class="margin-top-10">
            <el-checkbox-group v-model="checkboxList">
              <el-col :xs="3" :sm='2' v-for='(item,index) in 31' :key="item">
                <el-checkbox :label="item">
                  {{index+2>10?item:'0'+(item)}}
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
import crontabDay from "./crontab-day";
export default crontabDay;
</script>