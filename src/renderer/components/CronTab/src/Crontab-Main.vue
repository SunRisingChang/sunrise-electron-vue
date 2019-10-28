<template>
  <div class="crontab-warp">
    <el-tabs v-model="tabActive" type="border-card">
      <el-tab-pane :label="tabTitles[0]" name="second">
        <CrontabSecond @update='updateContabValue' :check='checkNumber'></CrontabSecond>
      </el-tab-pane>
      <el-tab-pane :label="tabTitles[1]" name="minute">
        <CrontabMin @update='updateContabValue' :check='checkNumber'></CrontabMin>
      </el-tab-pane>
      <el-tab-pane :label="tabTitles[2]" name="hour">
        <CrontabHour @update='updateContabValue' :check='checkNumber'></CrontabHour>
      </el-tab-pane>
      <el-tab-pane :label="tabTitles[3]" name="day">
        <CrontabDay @update='updateContabValue' :check='checkNumber' :week='contabValueObj.week'></CrontabDay>
      </el-tab-pane>
      <el-tab-pane :label="tabTitles[4]" name="month">
        <CrontabMouth @update='updateContabValue' :check='checkNumber'></CrontabMouth>
      </el-tab-pane>
      <el-tab-pane :label="tabTitles[5]" name="week">
        <CrontabWeek @update='updateContabValue' :check='checkNumber' :day='contabValueObj.day'></CrontabWeek>
      </el-tab-pane>
      <el-tab-pane :label="tabTitles[6]" name="year">
        <CrontabYear @update='updateContabValue' :check='checkNumber'></CrontabYear>
      </el-tab-pane>
    </el-tabs>
    <el-card class="box-card">
      <template slot="header" class="clearfix">
        <span>时间表达式预览 :</span>
        <el-tag type="" class="spac-4">{{contabValueString}}</el-tag>
      </template>
      <el-form label-position="top" class="crontab-form">
        <el-row :gutter='10'>
          <el-col :span="3">
            <el-form-item :label="tabTitles[0]">
              <el-input :title="contabValueObj.second" readonly v-model="contabValueObj.second"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item :label="tabTitles[1]">
              <el-input :title='contabValueObj.min' readonly v-model="contabValueObj.min"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item :label="tabTitles[2]">
              <el-input :title='contabValueObj.hour' readonly v-model="contabValueObj.hour"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item :label="tabTitles[3]">
              <el-input :title='contabValueObj.day' readonly v-model="contabValueObj.day"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item :label="tabTitles[4]">
              <el-input :title='contabValueObj.mouth' readonly v-model="contabValueObj.mouth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item :label="tabTitles[5]">
              <el-input :title='contabValueObj.week' readonly v-model="contabValueObj.week"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="tabTitles[6]">
              <el-input :title='contabValueObj.year' readonly v-model="contabValueObj.year"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <CrontabResult :ex='contabValueString'></CrontabResult>
  </div>
</template>

<script>
import CrontabSecond from "./Crontab-Second.vue";
import CrontabMin from "./Crontab-Min.vue";
import CrontabHour from "./Crontab-Hour.vue";
import CrontabDay from "./Crontab-Day.vue";
import CrontabMouth from "./Crontab-Mouth.vue";
import CrontabWeek from "./Crontab-Week.vue";
import CrontabYear from "./Crontab-Year.vue";
import CrontabResult from "./Crontab-Result.vue";

export default {
  props: {
    value: { type: String, default: null }
  },
  data() {
    return {
      tabTitles: ["秒", "分", "时", "日", "月", "周", "年"],
      tabActive: "second",
      myindex: 0,
      contabValueObj: {
        second: "*",
        min: "*",
        hour: "*",
        day: "*",
        mouth: "*",
        week: "?",
        year: ""
      }
    };
  },
  watch: {
    value(val) {
      if (!val) this.clear();
    }
  },
  methods: {
    // tab切换值
    tabCheck(index) {
      this.tabActive = index;
    },
    // 由子组件触发，更改表达式组成的字段值
    updateContabValue(name, value) {
      this.contabValueObj[name] = value;
    },
    // 表单选项的子组件校验数字格式（通过-props传递）
    checkNumber(value, minLimit, maxLimit) {
      //检查必须为整数
      value = Math.floor(value);
      if (value < minLimit) {
        value = minLimit;
      } else if (value > maxLimit) {
        value = maxLimit;
      }
      return value;
    },
    // 填充表达式
    submitFill() {
      this.$emit("input", this.contabValueString);
    },
    //重置
    clear() {}
  },
  computed: {
    contabValueString: function() {
      let obj = this.contabValueObj;
      let str =
        obj.second +
        " " +
        obj.min +
        " " +
        obj.hour +
        " " +
        obj.day +
        " " +
        obj.mouth +
        " " +
        obj.week +
        (obj.year === "" ? "" : " " + obj.year);
      return str;
    }
  },
  components: {
    CrontabSecond,
    CrontabMin,
    CrontabHour,
    CrontabDay,
    CrontabMouth,
    CrontabWeek,
    CrontabYear,
    CrontabResult
  }
};
</script>
<style lang='scss'>
.crontab-warp {
  width: 100%;
  & .el-tabs {
    box-shadow: unset;
    & .el-tabs__content {
      overflow: auto;
    }
  }
  & .el-card {
    box-shadow: unset;
    border: 1px solid #dcdfe6;
    margin-top: 20px;
    & .el-card__header {
      background-color: #f5f7fa;
      height: 40px;
      padding: 0px 0px 0px 10px;
      line-height: 40px;
      color: #909399;
      & .el-tag {
        height: 24px;
        line-height: 24px;
      }
    }
    & .crontab-form {
      & .el-form-item {
        text-align: center;
        margin: 0px;
        & .el-form-item__content {
          & input {
            text-align: center;
          }
        }
      }
    }
  }
  & .el-input-height {
    line-height: 20px;
    width: 123px;
    & .el-input__inner {
      height: 22px;
      line-height: 22px;
    }
  }
  & .el-radio,
  & .el-radio-group {
    width: 100%;
  }
}
</style>
