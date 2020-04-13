/**
 * @Author: Sun Rising 
 * @Date: 2019-01-22 14:15:55 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-12 19:39:14
 * @Description: 路由显示组件基于element ui + vue-router
 */
 <template>
  <!-- 一级目录 -->
  <el-menu-item v-if="(!item.children||item.children.length===0)&&!item.httpurl&&!item.hide" :index="parentPath+'/'+item.path">
    <i :class="item.icon"></i>
    <span>{{$t('route.'+item.name) }}</span>
  </el-menu-item>

  <!-- 多级目录 -->
  <el-submenu v-else-if="item.children&&item.children.length>0&&!item.hide" :index="parentPath?(parentPath+'/'+item.path):(item.path)">
    <template slot="title">
      <i :class="item.icon"></i>
      <span>{{ $t('route.'+item.name) }}</span>
    </template>
    <routers-view v-for="_item in item.children" :key="_item.path" :item="_item" :parentPath="parentPath?(parentPath+'/'+item.path):(item.path)"></routers-view>
  </el-submenu>

  <!-- 外网地址 -->
  <div v-else-if="(!item.children||item.children.length===0)&&item.httpurl&&!item.hide" v-bind="getHttpUrl(item.httpurl)">
    <el-menu-item class="menu-item-httpurl" disabled :index="item.httpurl">
      <i :class="item.icon"></i>
      <span>{{$t('route.'+item.name)}}</span>
    </el-menu-item>
  </div>
</template>
 
 <script>
export default {
  name: "RoutersView",
  props: {
    item: {
      type: Object
    },
    parentPath: {
      type: String,
      default: ""
    }
  },
  methods: {
    getHttpUrl(url) {
      return {
        is: "a",
        href: url,
        target: "_blank"
      };
    }
  }
};
</script>
 
