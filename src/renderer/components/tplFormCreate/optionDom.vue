/**
 * @Author: Sun Rising 
 * @Date: 2019-12-03 13:11:40 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-23 12:50:51
 * @Description: 动态组件配置
 */
<template>
  <div v-if="value" class="option-dom">
    <el-form ref="form" :model="value" label-width="100px">
      <el-form-item label="DOM 类型">
        <el-select style="width:100%;" v-model="value.domType" placeholder="请选择DOM类型">
          <el-option label="input" value="input"></el-option>
          <el-option label="radio" value="radio"></el-option>
          <el-option label="checkbox" value="checkbox"></el-option>
          <el-option label="select" value="select"></el-option>
          <el-option label="timeSelect" value="timeSelect"></el-option>
          <el-option label="timePicker" value="timePicker"></el-option>
          <el-option label="datePicker" value="datePicker"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="childTypeOption.length>0" label="子类型">
        <el-select style="width:100%;" v-model="value.childType" placeholder="请选择DOM类型">
          <el-option v-for="item in childTypeOption" :key="item.key" :label="item.label" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="value.label"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="value.alias"></el-input>
      </el-form-item>
      <el-form-item label="Key">
        <el-input v-model="value.key"></el-input>
      </el-form-item>
      <el-form-item v-if="value.domType==='radio'||value.domType==='checkbox'||value.domType==='select'" label="数据插槽名">
        <el-input v-model="value.slotName"></el-input>
      </el-form-item>
      <el-form-item label="检验规则">
        <el-input v-model="value.rule"></el-input>
      </el-form-item>
      <el-form-item label="显隐函数">
        <el-input v-model="value.showFunName"></el-input>
      </el-form-item>
      <el-form-item v-if="value.domType==='input'" label="最大长度">
        <el-input-number style="width:100%;" v-model="value.maxlength" :min="1" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="value.showable"></el-switch>
      </el-form-item>
      <el-form-item label="是否为空">
        <el-switch v-model="value.notNull"></el-switch>
      </el-form-item>
      <el-form-item label="是否反显">
        <el-switch v-model="value.readonly"></el-switch>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="value.disabled"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "optionDom",
  props: {
    value: {
      type: Object,
      default: function() {
        return null;
      }
    }
  },
  data() {
    return {
      // 子类型复选框
      childTypeOption: []
    };
  },
  created() {
    this.doInit();
  },
  watch: {
    "value.domType": function() {
      this.doInit();
      if (this.childTypeOption.length > 0) {
        let currChildType = this.childTypeOption.find(v => v.key === this.value.childType);
        if (!currChildType) this.$set(this.value, "childType", this.childTypeOption[0].key);
      }
    }
  },
  methods: {
    // 初始化数据
    doInit() {
      // 创建子类型
      let t_childTypeOption = [];
      if (this.value.domType === "input") {
        t_childTypeOption = [
          {
            key: "text",
            label: "text"
          },
          {
            key: "textarea",
            label: "textarea"
          }
        ];
      } else if (this.value.domType === "timePicker") {
        t_childTypeOption = [
          {
            key: "isRange[false]",
            label: "isRange[false]"
          },
          {
            key: "isRange[true]",
            label: "isRange[true]"
          }
        ];
      } else if (this.value.domType === "datePicker") {
        t_childTypeOption = [
          {
            key: "date",
            label: "date"
          },
          {
            key: "week",
            label: "week"
          },
          {
            key: "month",
            label: "month"
          },
          {
            key: "year",
            label: "year"
          },
          {
            key: "dates",
            label: "dates"
          },
          {
            key: "daterange",
            label: "daterange"
          },
          {
            key: "monthrange",
            label: "monthrange"
          },
          {
            key: "datetime",
            label: "datetime"
          },
          {
            key: "datetimerange",
            label: "datetimerange"
          }
        ];
      }
      this.$set(this, "childTypeOption", t_childTypeOption);
      // 创建必要字段childType
      if (this.value.domType === "input" || this.value.domType === "timePicker" || this.value.domType === "datePicker") {
        if (!this.value.hasOwnProperty("childType")) this.$set(this.value, "childType", this.childTypeOption[0].key);
      } else {
        this.$delete(this.value, "childType");
      }
      // 创建必要字段 slotName
      if (this.value.domType === "radio" || this.value.domType === "checkbox" || this.value.domType === "select") {
        if (!this.value.hasOwnProperty("slotName")) this.$set(this.value, "slotName", "");
      } else {
        this.$delete(this.value, "slotName");
      }
    }
  }
};
</script>
<style lang="scss">
.option-dom {
  padding: 20px;
}
</style>