/**
 * @Author: Sun Rising 
 * @Date: 2019-05-15 09:02:32 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:59:30
 * @Description: 数据分页表格插件展示
 */
<template>
  <flex-container direction='column' wrap='nowrap' class="cron-tab-page">
    <flex-item>
      <el-alert class="margin-bottom-10" title="数据分页表格组件" type="success" :closable='false' description="这是一个数据分页表格组件，配合定制的后台可配置出复杂的使用场景，使用简单。">
      </el-alert>
    </flex-item>
    <flex-item>
      <el-card shadow="hover">
        <flex-container slot="header" justifyContent='space-between'>
          <flex-item alignItems='center'>数据表格</flex-item>
          <flex-item>
            <el-button type="primary" plain @click="handleQuery">查询</el-button>
          </flex-item>
        </flex-container>
        <data-table ref="thetable" border index auto-load auto-update column-button csv-button title="Data Table" :load-data-func='loadData'>
          <data-table-column prop="id" label="ID" show-overflow-tooltip></data-table-column>
          <data-table-column prop="name" label="姓名" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag>{{scope.row.name}}</el-tag>
            </template>
          </data-table-column>
          <data-table-column prop="email" label="Email" show-overflow-tooltip></data-table-column>
          <data-table-column prop="address" label="地址" show-overflow-tooltip></data-table-column>
          <data-table-column prop="date" label="日期" show-overflow-tooltip></data-table-column>
          <data-table-column prop="remark" label="备注" show-overflow-tooltip></data-table-column>
        </data-table>
      </el-card>
    </flex-item>
    <flex-item>
      <markdown-editor class="margin-top-20" v-model="content" view></markdown-editor>
    </flex-item>
  </flex-container>
</template>

<script>
import ajax from "@/lib/ajax";
import api from "@/components/DataTable/api.md";

export default {
  name: "DataTablePage",
  data() {
    return {
      content: api,
      loadData: function(params) {
        console.log("数据表格请求参数:");
        console.log(params);
        return ajax.get("/sys/queryDataTable", { params: params });
      }
    };
  },
  methods: {
    handleQuery() {
      this.$refs["thetable"]
        .loadData({ a: 1, b: 2, c: [{}] })
        .then(resp => {
          console.log(resp);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>