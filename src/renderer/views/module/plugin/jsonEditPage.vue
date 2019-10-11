/**
 * @Author: Sun Rising 
 * @Date: 2019-07-08 09:43:02 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:58:31
 * @Description: Json编辑器
 */
<template>
  <flex-container class="cron-tab-page" direction='column' wrap='nowrap'>
    <flex-item>
      <el-alert class="margin-bottom-10" title="Json编辑器" type="success" :closable='false' description="这是一个基于CodeMirror的Json编辑器">
      </el-alert>
    </flex-item>
    <flex-container class="margin-bottom-10">
      <flex-item width='100%'>
        <json-editor ref="jsonEditor" v-model="value" />
      </flex-item>
    </flex-container>
  </flex-container>
</template>

<script>
import JsonEditor from "@/components/JsonEditor/index";
const jsonData =
  '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]';

export default {
  components: { JsonEditor },
  data() {
    return {
      value: JSON.parse(jsonData)
    };
  }
};
</script>
