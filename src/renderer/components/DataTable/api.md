# <center> DataTable 组件说明 </center>

> 该组件是基于 Element UI 开发的，所以 el-table、el-table-column、el-pagination 的属性及方法、事件对该组件同样适用。下面列举的是扩展部分。

#### Use

```html
<data-table v-bind="Attributes" v-on="Events" ...>
  <data-table-column prop="xxx" label="xxx" ...></data-table-column>
  ...
</data-table>
```

#### DataTable.Attributes

| 参数         | 说明                                                     | 类型     | 可选值                   | 默认值                 |
| :----------- | :------------------------------------------------------- | :------- | :----------------------- | :--------------------- |
| pageOptions  | 分页参数                                                 | Object   | el-pagination.Attributes | [如下例](#pageOptions) |
| csvOptions   | csv 参数                                                 | Object   | ——                       | [如下例](#csvOptions)  |
| loadDataFunc | 接收列表数据查询方法 ,[如下例](#loadDataFunc)            | Function | ——                       | null                   |
| title        | 表格标题                                                 | String   | ——                       | "Data Table"           |
| loadDataFunc | 接收列表数据查询方法                                     | Function | ——                       | null                   |
| index        | 是否开启索引列，该索引列是基于记录总数非基于列表显示总数 | Boolean  | ——                       | false                  |
| columnButton | 是否开启动态列显示                                       | Boolean  | ——                       | true                   |
| csvButton    | 是否开启 CSV 下载                                        | Boolean  | ——                       | true                   |
| autoLoad     | 初始加载表格                                             | Boolean  | ——                       | false                  |
| autoUpdate   | 是否显示自动刷新                                         | Boolean  | ——                       | false                  |
| interval     | 自动刷新间隔(s)                                          | Number   | ——                       | 5000                   |
| runTimer     | 定时器开关                                               | Boolean  | ——                       | false                  |

<div id='pageOptions'></div>

##### DataTable.Attributes.pageOptions

```javascript
{
  //总条目数
  total: 0,
  //页码按钮的数量，当总页数超过该值时会折叠
  pagerCount: 7,
  //组件布局，子组件名用逗号分隔
  layout: "prev, pager, next,total,sizes",
  //是否为分页按钮添加背景色
  background: false,
  //只有一页时是否隐藏
  hideOnSinglePage: true,
  //每页显示条目个数
  pageSize: 10,
  //当前页数
  currentPage: 1,
  //每页显示个数选择器的选项设置
  pageSizes: [10, 20, 40, 60, 100],
  //是否禁用
  disabled: false
}
```

<div id='csvOptions'></div>

##### DataTable.Attributes.csvOptions

```javascript
{
  //文件名
  filename: "table.csv",
  //是否导出源数据
  original: false,
  //是否显示表头
  isHeader: true,
  //是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise
  download: true,
  //自定义数据
  data: null,
  //自定义列
  columns: null,
  //列过滤方法，该函数 Function(row,index,list) 的返回值用来决定该列是否导出
  columnFilterMethod: column =>
    ["index", "selection", "expand"].indexOf(column.type) === -1 &&
    column.property,
  //数据过滤方法，该函数 Function(row,index,list) 的返回值用来决定该数据是否导出
  dataFilterMethod: (row, index, list) => {
    return true;
  }
}
```

<div id ='loadDataFunc'></div>

##### DataTable.Attributes.loadDataFunc

```javascript
loadData: function(params) {
  return ajax.get("/sys/datatable", { params: params });
}
```

#### DataTable.Methods

| 方法名    | 说明                     | 参数                                    |
| :-------- | :----------------------- | :-------------------------------------- |
| loadData  | 表格数据加载方法，如下例 | Object [查询参数]                       |
| doLock    | 开启表格遮罩             | ——                                      |
| doUnlock  | 关闭表格遮罩             | ——                                      |
| exportCsv | 导出 CSV 文件            | Object [[csvOptions 对象](#csvOptions)] |
