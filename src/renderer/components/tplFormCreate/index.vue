/**
 * @Author: Sun Rising
 * @Date: 2019-12-03 10:53:44
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-25 13:20:48
 * @Description: 模板表单Json生成工具
 */
<template>
  <div class="tpl-form-create">
    <div class="button-block">
      <el-button :disabled="formJsonArray.length==0" plain type="info" @click="formVisible=true">生成表单</el-button>
      <el-button :disabled="formJsonArray.length==0" plain type="info" @click="jsonVisible=true">生成JSON</el-button>
      <el-button plain type="primary" @click="handleAdd">添加DOM</el-button>
    </div>
    <el-form label-width="80px">
      <el-table class="ws-create-form" row-key="key" ref="table" border :data="formJsonArray" @selection-change="doSelectionChange">
        <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
        <el-table-column width="100" label="类型" prop="domType" align="center" fixed="left"></el-table-column>
        <el-table-column width="100" label="子类型" prop="domType" align="center" fixed="left">
          <template slot-scope="scope">{{ scope.row.childType?scope.row.childType:'---' }}</template>
        </el-table-column>
        <el-table-column label="标题" prop="label" align="center" fixed="left"></el-table-column>
        <el-table-column label="别名" align="center">
          <template slot-scope="scope">{{ scope.row.alias?scope.row.alias:'---' }}</template>
        </el-table-column>
        <el-table-column width="100" label="Key" prop="key" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column width="90" label="数据插槽名" align="center">
          <template slot-scope="scope">{{ scope.row.slotName?scope.row.slotName:'---' }}</template>
        </el-table-column>
        <el-table-column label="检验规则" align="center">
          <template slot-scope="scope">{{ scope.row.rule?scope.row.rule:'---' }}</template>
        </el-table-column>
        <el-table-column label="显隐函数" align="center">
          <template slot-scope="scope">{{ scope.row.showFunName?scope.row.showFunName:'---' }}</template>
        </el-table-column>
        <el-table-column label="最大长度" prop="maxlength" align="center"></el-table-column>
        <el-table-column label="是否为空" align="center">
          <template slot-scope="scope">{{ scope.row.notNull }}</template>
        </el-table-column>
        <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">{{ scope.row.showable }}</template>
        </el-table-column>
        <el-table-column label="是否反显" align="center">
          <template slot-scope="scope">{{ scope.row.readonly }}</template>
        </el-table-column>
        <el-table-column label="是否禁用" align="center">
          <template slot-scope="scope">{{ scope.row.disabled }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center" size="mini" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDel(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- dom配置层 -->
    <el-drawer title="DOM配置" :visible.sync="isDrawerShow" append-to-body size="300">
      <option-dom v-if="isDrawerShow" v-model="currEditDOM"></option-dom>
    </el-drawer>
    <!-- 生成JSON -->
    <dialog-drag title="生成JSON" :visible.sync="jsonVisible">
      <pre>{{JSON.stringify(this.formJsonArray,null,2)}}</pre>
    </dialog-drag>
    <!-- 生成表单 -->
    <dialog-drag title="生成表单" :visible.sync="formVisible">
      <el-form :show-message="false" :model="previewForm" label-position="right" label-width="90px" class="form-style-line">
        <tpl-form-render v-for="(item,index) in formJsonArray" :key="index" :model="item" :data="previewForm">
          <!-- 插槽名称 select -->
          <template slot="select">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </template>
          <!-- 插槽名称 checkbox -->
          <template slot="checkbox">
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </template>
          <!-- 插槽名称 radio -->
          <template slot="radio">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </template>
        </tpl-form-render>
      </el-form>
    </dialog-drag>
  </div>
</template>

<script>
import OptionDom from "./optionDom";
import Sortable from "sortablejs";
import UUID from "uuid/v4";

// 默认DOM结构
const defaultDOM = {
  /**
   * 可选类型
   * input
   * time
   * select
   * radio
   * checkbox
   */
  domType: "input",
  // input标题
  label: "标题",
  // DOM的v-model
  key: "key",
  // 是否为空
  notNull: false,
  // 是否禁用
  disabled: false,
  // 是否显示
  showable: true,
  // 别名,如果传入会覆盖label属性
  alias: null,
  // 检验规则
  rule: null,
  // 最大长度
  maxlength: 255,
  // 显隐控制函数,类型字符串 ['true'|'false'|函数名]
  showFunName: "true",
  // 是否反显组件
  readonly: false,
  // ------  备用字段 --------
  // ID
  id: "snap",
  // 绑定字段
  bindingField: "snap",
  // 是否是默认必选项
  defaultRequired: false,
  // 是否参与输出
  exportable: true,
  // 表单ID
  formId: "snap"
};

export default {
  name: "TplFormCreate",
  components: {
    OptionDom
  },
  props: {
    // 初始化
    initFormItem: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      // 编辑层开关
      isDrawerShow: false,
      // 表单Json
      formJsonArray: [],
      // 编辑的Dom
      currEditDOM: null,
      // 是否进行table复选的监听
      watchTableSelect: true,
      // json显示层
      jsonVisible: false,
      // 表单显示层
      formVisible: false,
      // 用于反显的form
      previewForm: {}
    };
  },
  watch: {
    formJsonArray: {
      handler(newValue) {
        this.$emit("update", newValue);
        this.doRowDrop();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.initFormItem) {
      this.$set(this, "formJsonArray", this.initFormItem);
      this.initTableSelect();
    }
  },
  methods: {
    // 行拖拽
    doRowDrop() {
      const tbody = document.querySelector(".ws-create-form .el-table__body-wrapper tbody");
      if (tbody) {
        const _this = this;
        Sortable.create(tbody, {
          ghostClass: "blue-background-class",
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.formJsonArray.splice(oldIndex, 1)[0];
            _this.formJsonArray.splice(newIndex, 0, currRow);
          }
        });
      }
    },
    // 删除dom
    handleDel(index) {
      this.formJsonArray.splice(index, 1);
    },
    // 编辑dom
    handleEdit(row) {
      this.isDrawerShow = true;
      this.currEditDOM = row;
    },
    // 添加dom
    handleAdd() {
      const t = Object.assign({}, defaultDOM, {
        key: "key" + UUID()
      });
      this.formJsonArray.push(t);
      this.$refs["table"].toggleRowSelection(t, true);
    },
    // 批量显隐
    doSelectionChange(rows) {
      if (this.watchTableSelect) {
        this.formJsonArray.forEach(value => {
          value.showable = false;
        });
        rows.forEach(value => {
          value.showable = true;
        });
      }
    },
    // 初始化列选择
    initTableSelect() {
      this.watchTableSelect = false;
      this.formJsonArray.forEach(value => {
        if (value.showable) {
          this.$nextTick(() => {
            this.$refs["table"].toggleRowSelection(value, true);
          });
        }
      });
      this.watchTableSelect = true;
    },
    // 获取结构
    getFormItem() {
      return this.formJsonArray;
    }
  }
};
</script>

<style lang="scss" scoped>
.tpl-form-create {
  width: 100%;
}
.button-block {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
