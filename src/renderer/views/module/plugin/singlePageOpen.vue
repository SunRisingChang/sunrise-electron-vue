/**
 * @Author: Sun Rising 
 * @Date: 2019-07-07 20:38:02 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:58:04
 * @Description: 单页多开
 */
 <template>
  <flex-container class="cron-tab-page" direction='column' wrap='nowrap'>
    <flex-item>
      <el-alert class="margin-bottom-10" title="单页多开" type="success" :closable='false' :description="$route.path">
      </el-alert>
    </flex-item>
    <flex-item>
      <el-row>
        <el-button type="primary" @click="addRouter">打开新建</el-button>
      </el-row>
    </flex-item>
  </flex-container>
</template>
 
 <script>
export default {
  data() {
    return {};
  },
  methods: {
    addRouter() {
      this.$router.push({
        path: "/plugin/singlePageOpen/" + new Date().getTime(),
        query: {
          alias: this.$t("route.SinglePageOpen") + +new Date().getTime()
        }
      });
    }
  }
};
</script>



 
