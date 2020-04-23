# <center> TplFormRender 组件说明 </center>

> 模板表单 JSON 渲染组件，该组件是基于 Element UI 开发的，依赖组件 el-form-item、el-input、el-time-select、el-time-picker、el-date-picker、el-select、el-info-table。

#### 功能

- 解析并显示 el-form-item 部分

#### Use

```html
<template>
  <el-form :model="previewForm">
      <el-form-tpl-item
        v-for="(item,index) in formJsonArray"
        :key="index"
        :model="item"
        :data='previewForm'
        v-bind="Attributes"
        v-on="Events"
        ...
      >
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
      </el-form-tpl-item>
  </el-form>
</template>
<script>
  import TemplateformApi from "@/api/templateform";

  export default {
    data() {
      return {
        // 页面遮罩
        pageLoading:false
        // 表单对象
        previewForm: {},
        // 模板表单对象
        formJsonArray: []
      };
    },
    created() {
      this.initFormTpl();
    },
    methods: {
      // 初始化模板表单
      async initFormTpl() {
        try {
          // 遮罩开启
          this.pageLoading = true;
          // 请求结构
          let resp = await TemplateformApi.getTplForm({
            // 表单的唯一标识需事先知道
            businessCode: "Announcement-familyData"
          });
          this.formJsonArray = resp.data.fields;
        } catch (error) {
          if (error.code && error.code !== "200") this.$message(error.message);
        } finally {
          this.pageLoading = false;
        }
      }
    }
  };
</script>
```

#### WsFormTplItem.Attributes

| 参数        | 说明                          | 类型    | 可选值                 | 默认值 |
| :---------- | :---------------------------- | :------ | :--------------------- | :----- |
| model       | 组件渲染模型                  | Object  | ——                     | null   |
| data        | v-model 挂在对象 from-->model | Object  | ——                     | null   |
| verifyRules | 规则清单                      | Object  | [如下例](#verifyRules) | null   |
| readonly    | 是否进行反显                  | Boolean | ——                     | false  |
| showRules   | 显隐规则清单                  | Object  | [如下例](#showRules)   | null   |

#### WsFormTplItem.Events

| 参数   | 说明                   | 类型  |
| :----- | :--------------------- | :---- |
| update | 当前时刻生成的表单结构 | Array |

<div id='verifyRules'></div>

##### WsFormTplItem.Attributes.verifyRules

```javascript
let verifyRules = {
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
  ],
  region: [{ required: true, message: "请选择活动区域", trigger: "change" }]
};
```

<div id='showRules'></div>

##### WsFormTplItem.Attributes.showRules

```javascript
let showRules = {
  name: () => {
    return true;
  },
  region: () => {
    return false;
  }
};
```
