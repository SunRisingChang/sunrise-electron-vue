# <center> Vue.js 开发规范 </center>

## 一、命名

#### 1、文件夹

a) 开发的每个 **视图模块** 文件夹应创建在<kbd>/src/renderer/views/module</kbd>下，名称应和后端 **controllers 下级包名** 保持一致且为 **小驼峰命名** ，例如：

- 后端

```java
package com.cnetong.dxp.base.controllers.aces;

@RestController
@RequestMapping(value="/anon/aces")
public class LoginController extends BaseController {}
```

- 前端

```java
aces
```

#### 2、文件

a) 每个 **Vue 视图文件** 文件应创建在<kbd>/src/renderer/views/module/[模块]</kbd>下，名称应和后端 **Controllers** 名保持一致且为 **大驼峰命名** ，例如：

- 后端

```java
package com.cnetong.dxp.base.controllers.aces;

@RestController
@RequestMapping(value="/anon/aces")
public class LoginController extends BaseController {}
```

- 前端

```java
Login.vue
```

b) **JavaScript/Css** 文件使用 **小驼峰命名** 。

#### 3、变量

比较 **驼峰式命名** 和 **下划线命名** ,下划线命名虽然长但是会有明确的分割且因全是小写高度保持一致看起来比较舒服, 所以就是用下划线命名了!(就这理由能说服谁啊!)

> **下划线命名** 为 **全小写使用下划线进行单词的分割** ,由 **动词 _ 名词 _ 形容词 | 副词** 组成且单词长度不宜过长, 单词推荐简写至 4 位, 如果该变量不能表达出其意思, 那么就用注释补充吧！

a) **JavaScript/SCSS 变量** （作用域为整个.js 文件或更大的范围）使用 **下划线命名** 。

b) **Css 类** 使用 **中划线命名** ,组成结构和 **下划线命名** 一样。

#### 4、常量

a) **任何常量** 都使用 **下划线命名且字母全部大写**, 由 **动词 _ 名词 _ 形容词 | 副词** 组成且单词长度不宜过长, 单词推荐简写至 4 位, 如果该变量不能表达出其意思, 那么就用注释补充吧！

#### 5、方法

a) **任何方法** 都使用 **小驼峰命名** , 组成结构和 **下划线命名** 一样 ;
b) 由 **按钮触发** 的方法都以 **handle** 来代替 **动词** ;
c) 由 **业务触发** 的方法都以 **do** 来代替 **动词** ;
d) **事件绑定** 方法都以 **on** 来代替 **动词** ;

#### 6、其它

a) **路由名称** 使用 **小驼峰命名** 且和其组件文件名保持一致；

## 二、注释

**代码注释在一个项目的后期维护中显的尤为重要，所以我们要为每一个文件编写使用说明，为代码中每一个方法编写方法说明。**

#### 1、文件

a) 安装插件 **vscode-fileheader**，该插件可以记录 **创建人**、**创建时间**、**修改人**、**修改时间**，如果文件已经存在 fileheader 注释，那么它会在你修改文件时 **自动更新修改人和修改时间** 。

b) 配置插件

```json
"fileheader.Author": "Sun Rising",
"fileheader.LastModifiedBy": "Sun Rising"
```

c) 插件使用
组件新建时会自动生成文件注释或手动快捷键<kbd>ctrl+alt+i</kbd>，模板如下：

```javascript
/*
 * @Author: Sun Rising
 * @Date: 2018-12-08 10:51:48
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-05-15 22:53:28
 */
```

#### 2、组件

a) 组件的作用、接收的参数，使用多行注释，模板如下：

```javascript
/**
 * 编写理由：因使用tabs来实现路由分页显示并保存路由页面的状态...
 * 适用场景：tabs路由分页
 * 传入参数：{
 *            //缓存的key集合
 *            include: [Array],
 *            //排除的key集合
 *            exclude: [Array],
 *            //缓存的最大key数量
 *            max: [String, Number]
 *          }
 * 备注：不用在 vue 页面写 name 属性了。。。！
 */
```

#### 3、变量

a) 这个变量是干嘛的，使用单行注释。

#### 4、方法

a) 这个方法是干嘛的，使用多行注释或单行，格式不限。

#### 5、核心语句

a) 如果你觉得语句复杂，那么就写点注释，说不定下次读这段代码的人就是你，在语句上方使用单行注释，

## 三、Element UI 使用

#### 1、组件

a) 组件元素书写时 **不要含有大写字母**，如下：

```javascript
//导入
import AisFooter from "@/components/core/AisFooter.vue";
//注册
components: {
  AisFooter;
}
//使用
<ais-footer />;
```

#### 2、属性

a) 如果属性传入的是布尔值且传入为 true 时应 **简写** ，如下：

```html
<!-- 反例 -->
<el-menu :router="true" :default-active="$route.path" ...></el-menu>
<!--正例-->
<el-menu router :default-active="$route.path" ...></el-menu></el-menu>
```

b) el-table-column 标签要写 show-overflow-tooltip，如下：

```html
<el-table-column show-overflow-tooltip ... />
```

#### 3、事件

a) 如果调用的方法不需要参数传入，那么 **不要写小括号** 。

```html
<!-- 反例 -->
<el-button @click="handleAdd()"></el-button>
<!-- 正例 -->
<el-button @click="handleAdd"></el-button>
```

## 四、JavaScript 使用

#### 1、声明

a) vue 文件方法声明顺序,如下：

```css
- components            //组件注册
- props                 //传入属性
- data                  //页面属性
- watch                 //数据监听
- computed              //计算属性
- created               //页面创建
- mounted               //页面挂载
- activited             //被keep-active加载
- update                //页面更新
- beforeRouteUpdate    //在当前路由改变,但是该组件被复用时调用
- metods                //方法
```

b) 组件 props 原子化，提供 **默认值**，使用 type 属性 **校验类型**，使用 props 之前先检查该 prop 是否存在。

c) 使用 **ES6** 风格编码，定义变量使用 **let** ,定义常量使用 **const** 。

d) 避免 this.\$parent。

e) **调试信息 console.log() debugger 使用完及时删除** 。

#### 2、Ajax

a) 使用标准的 Ajax 书写方式，如下：

```javascript
//现在的写法
handleDelete() {
  this.lock(); //进行遮罩
  DecApi.delDec(this.decMessage.decHead.uuid)
    .then(resp => {
      //TODO ...      //执行AJAX处理
      this.unLock(); //无论如何要保证取消遮罩
    })
    .catch(e => {
      //TODO ...      //执行异常处理
      this.unLock(); //无论如何要保证取消遮罩
    });
},
//推荐的写法
async handleDelete() {
  this.lock(); //进行遮罩
  try {
    let resp = await DecApi.delDec(this.decMessage.decHead.uuid);
    //TODO ...      //执行AJAX保存
  } catch (e) {
    if (e.hasInfo()) {
      this.showMessage(e.info); //如果有消息,则提示消息
    }
  } finally {
    this.unLock(); //无论如何要保证取消遮罩
  }
}
```

## 五、CSS 使用

熟悉框架自带的 css 样式，例如 margin-top-4、pull-right 等等。

#### 1、全局

a) **新建项目专属的样式文件，不要写在框架的样式表中，防止框架升级时导致样式缺失的问题** ；

#### 2、局部

a) **在页面的最外层元素设置一个约束类，类选择器要添加这个约束或在style标签上使用scoped属性，防止影响上级的样式** ；

#### 3、组件

a) 样式的编写应该全部写在组件内部，防止迁移组件时样式会缺失；

b) 在页面的最外层元素设置一个约束类，类选择器要添加这个约束或在style标签上使用scoped属性，防止影响上级的样式；
