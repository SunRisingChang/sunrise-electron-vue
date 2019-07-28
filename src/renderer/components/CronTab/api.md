## <center> CronTab 组件说明 </center>

> 当手动输入的 Cron 表达式错误时，输入框会自动清空。

#### Use

```html
<cron-tab v-model="xxx" v-bind="Attributes" v-on="Events" ...></cron-tab>
```

#### Attributes

| 参数            | 说明     | 类型    | 可选值 | 默认值   |
| :-------------- | :------- | :------ | :----- | :------- |
| value / v-model | 绑定值   | String  | ——     | ——       |
| readonly        | 是否只读 | Boolean | ——     | false    |
| title           | 按钮提示 | String  | ——     | 高级设置 |
