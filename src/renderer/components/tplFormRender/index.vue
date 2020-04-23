/**
 * @Author: Sun Rising 
 * @Date: 2019-12-04 17:18:57 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-23 12:52:38
 * @Description: form模板保单渲染组件
 */
<template>
  <el-form-item v-if="modelData&&showable" :prop="modelData.key" :title="modelData.alias?modelData.alias:modelData.label" :label="modelData.alias?modelData.alias:modelData.label" :rules="t_verifyRules">
    <template v-if="!readonly&&!modelData.readonly">
      <!-- input类型dom -->
      <el-input :type="modelData.childType" :disabled="modelData.disabled" v-if="modelData.domType==='input'" v-model="data[modelData.key]" :maxlength="modelData.maxlength" show-word-limit></el-input>
      <!-- timeSelect类型dom -->
      <el-time-select style="width:100%;" v-if="modelData.domType==='timeSelect'" :disabled="modelData.disabled" v-model="data[modelData.key]" placeholder="选择时间"></el-time-select>
      <!-- timePicker[true]类型dom -->
      <el-time-picker style="width:100%;" is-range v-if="modelData.domType==='timePicker'&&modelData.childType==='isRange[true]'" :disabled="modelData.disabled" v-model="data[modelData.key]" placeholder="任意时间点"></el-time-picker>
      <!-- timePicker[false]类型dom -->
      <el-time-picker style="width:100%;" v-if="modelData.domType==='timePicker'&&modelData.childType==='isRange[false]'" :disabled="modelData.disabled" v-model="data[modelData.key]" placeholder="任意时间点"></el-time-picker>
      <!-- datePicker类型dom -->
      <el-date-picker style="width:100%;" v-if="modelData.domType==='datePicker'" v-model="data[modelData.key]" :disabled="modelData.disabled" :type="modelData.childType" placeholder="选择日期"></el-date-picker>
      <!-- select类型dom -->
      <el-select style="width:100%;" v-if="modelData.domType==='select'" v-model="data[modelData.key]" :disabled="modelData.disabled" placeholder="请选择活动区域">
        <slot :name="modelData.slotName"></slot>
      </el-select>
      <!-- radio类型dom -->
      <el-radio-group style="width:100%;" v-if="modelData.domType==='radio'" v-model="data[modelData.key]" :disabled="modelData.disabled">
        <slot :name="modelData.slotName"></slot>
      </el-radio-group>
      <!-- checkbox类型dom -->
      <el-checkbox-group style="width:100%;" v-if="modelData.domType==='checkbox'" v-model="data[modelData.key]" :disabled="modelData.disabled">
        <slot :name="modelData.slotName"></slot>
      </el-checkbox-group>
    </template>
    <template v-else>{{data[modelData.key]}}</template>
  </el-form-item>
</template>

<script>
export default {
  name: "TplFormRender",
  props: {
    // 组件渲染模型
    model: {
      type: Object,
      default: null
    },
    // v-model 挂在对象 from-->model
    data: {
      type: Object,
      default: null
    },
    /**
     * 规则清单
     * {
     *  规则名称:规则函数
     * }
     */
    verifyRules: {
      type: Object,
      default: null
    },
    // 是否进行反显
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 显隐规则清单
     * {
     * 规则名称:规则函数
     * }
     */
    showRules: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 渲染模型
      modelData: null,
      // 显隐开关
      showable: false,
      // 表单校验规则
      t_verifyRules: null
    };
  },
  watch: {
    model: {
      async handler(newValue) {
        if (newValue && this.data) {
          this.$set(this, "modelData", Object.assign({}, newValue));
          this.getRules();
          await this.doIsShow();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 显隐控制函数
    async doIsShow() {
      this.showable = false;
      // ------------------------------ 数据挂载类型检查 开始 ----------------------------------
      // 需要变换数据类型的dom类型
      let DOMs = {
        checkbox: [],
        select: [],
        timePicker: ["isRange[true]"],
        datePicker: ["daterange", "monthrange", "datetimerange", "dates"]
      };

      if (DOMs.hasOwnProperty(this.modelData.domType)) {
        if (DOMs[this.modelData.domType].includes(this.modelData.childType)) {
          if (!Array.isArray(this.data[this.modelData.key])) {
            this.$delete(this.data, this.modelData.key);
          }
        } else if (!this.modelData.childType) {
          this.$set(this.data, this.modelData.key, []);
        } else {
          if (Array.isArray(this.data[this.modelData.key])) {
            this.$delete(this.data, this.modelData.key);
          }
        }
      } else {
        if (Array.isArray(this.data[this.modelData.key])) {
          this.$delete(this.data, this.modelData.key);
        }
      }
      // ------------------------------ 数据挂载类型检查 结束 ----------------------------------
      // ------------------------------ 显隐函数判定 开始 ----------------------------------
      // 算然延迟数为0 但是能解决下拉框错位的问题？？？？
      await setTimeout(async () => {
        // 如果模型禁止显示则忽视显隐函数
        if (!this.modelData.showable) {
          this.showable = false;
          return;
        }
        if (this.showRules && this.showRules.hasOwnProperty(this.modelData.showFunName)) {
          let target = this.showRules[this.modelData.showFunName];
          if (typeof target === "function") {
            this.showable = await this.showRules[this.modelData.showFunName]();
          } else if (typeof target === "boolean") {
            this.showable = await this.showRules[this.modelData.showFunName]();
          } else {
            this.showable = true;
          }
        } else {
          if (this.modelData.showFunName === "true") {
            this.showable = true;
          } else if (this.modelData.showFunName === "false") {
            this.showable = false;
          } else {
            this.showable = true;
          }
        }
      }, 0);
      // ------------------------------ 显隐函数判定 结束 ----------------------------------
    },
    // 获取表单规则
    getRules() {
      if (this.verifyRules && this.verifyRules.hasOwnProperty(this.modelData.rule)) {
        this.$set(this, "t_verifyRules", this.verifyRules[this.modelData.rule]);
      } else {
        this.$set(this, "t_verifyRules", [{ required: this.modelData.notNull }]);
      }
    }
  }
};
</script>