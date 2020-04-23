# <center> TplFormCreate 组件说明 </center>

> 模板表单 JSON 生成组件，该组件是基于 Element UI 开发的，支持 el-input、el-time-select、el-time-picker、el-date-picker、el-select、el-radio、el-checkbox 组件。

#### 功能

- 添加、删除、编辑 DOM 元素
- 行拖拽排序
- 栅格布局（ 4 列 ）
- 是否为空
- 是否禁用
- 是否显示
- 别名 (会替换标题显示)
- 检验规则
- 显隐控制函数,类型字符串 ['true'|'false'|Function]
- 是否反显组件

#### Use

```html
<tpl-form-create v-bind="Attributes" v-on="Events" ... />
```

#### WsFormTpl.Attributes

| 参数         | 说明       | 类型  | 可选值                  | 默认值 |
| :----------- | :--------- | :---- | :---------------------- | :----- |
| initFormItem | 初始化数据 | Array | [如下例](#initFormItem) | null   |

#### WsFormTpl.Events

| 参数   | 说明                   | 类型  |
| :----- | :--------------------- | :---- |
| update | 当前时刻生成的表单结构 | Array |

<div id='initFormItem'></div>

##### WsFormTpl.Attributes.initFormItem

```javascript
let initFormItem = [
  {
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
    // 栅格列数
    span: 4,
    // 显隐控制函数,类型字符串 ['true'|'false'|Function]
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
  }
];
```

#### WsFormTpl.Methods

| 方法名      | 说明                       | 参数 | 返回  |
| :---------- | :------------------------- | :--- | :---- |
| getFormItem | 手动拉取当前时刻的表单结构 | ——   | Array |
