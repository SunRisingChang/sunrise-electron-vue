# <center> AutocompleteInput 组件说明 </center>

> 主要功能是记忆输入的内容且缓存到前端数据库中，在下次输入时给出提示。该组件是基于 Element UI 开发的，所以 el-select 的属性及方法、事件对该组件同样适用。下面列举的是扩展部分。

#### Use

```html
<autocomplete-input v-bind="Attributes" v-on="Events" ...></autocomplete-input>
```

#### DataTable.Attributes

| 参数         | 说明                                                     | 类型     | 可选值                   | 默认值                 |
| :----------- | :------------------------------------------------------- | :------- | :----------------------- | :--------------------- |
| codeKey  | 缓存key                                                | String   | —— | '' |
| maxCacheNumber   | 最多缓存数                                                 | Number   | ——                       | 50 |
