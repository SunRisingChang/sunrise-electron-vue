/**
 * @Author: Sun Rising 
 * @Date: 2019-07-06 13:18:33 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 22:27:59
 * @Description: 通知管理 
 */
<template>
  <flex-container class="notice-msg" wrap='nowrap'>
    <flex-item v-if="showMenu" :width='$store.state.base.defaultLayout==="defaultLayout"?"310px":"100%"' direction="column" wrap='nowrap'>
      <el-card shadow="never" class="h-full">
        <flex-container slot="header" justifyContent='flex-end'>
          <flex-item alignItems='center'>
            <el-radio-group v-model="readOptions" size="mini">
              <el-radio-button label="1">全部</el-radio-button>
              <el-radio-button label="2">已读</el-radio-button>
              <el-radio-button label="3">未读</el-radio-button>
            </el-radio-group>
          </flex-item>
        </flex-container>
        <flex-container direction="column" wrap='nowrap'>
          <el-table :data="noticeMsg" :show-header='false' highlight-current-row @row-click='rowClick'>
            <el-table-column prop="isRead" label="已读" width="50" align="center">
              <template slot-scope="scope">
                <i v-if="scope.row.isRead" class="icon-ali ali-read icon-size-16" title="未读"></i>
                <i v-else class="icon-ali ali-noread icon-size-16" title="已读"></i>
              </template>
            </el-table-column>
            <el-table-column prop="message" label="概述">
            </el-table-column>
            <el-table-column prop="timestamp" label="接收时间" width="140" :formatter='$utils.tableColTimeFormt'>
            </el-table-column>
          </el-table>
        </flex-container>
      </el-card>
    </flex-item>
    <flex-item v-if="showMain" :grow='1' direction="column" wrap='nowrap'>
      <el-card shadow="never" class="card-full">
        <flex-container v-if="currMsg" direction="column" wrap='nowrap' height='100%'>
          <flex-container justifyContent='space-between' class="margin-bottom-20">
            <flex-item alignItems='center'>
              <el-button v-if='$store.state.base.defaultLayout!=="defaultLayout"' type="text" icon="el-icon-back margin-right-6 font-size-16" @click="handleBackMenu" title="返回"></el-button>
              <i class="el-icon-chat-line-square margin-right-6 font-size-16"></i>{{currMsg.message}}
            </flex-item>
            <flex-item alignItems='center'>
              <el-button type="primary" size="mini" @click="handleDelNoticeMsg" circle icon="el-icon-delete" title="删除"></el-button>
            </flex-item>
          </flex-container>
          <flex-container :grow='1' direction="column" wrap='nowrap'>
            <flex-item :grow='1'> {{currMsg.value}}</flex-item>
            <flex-item justifyContent='flex-end' class="margin-top-20">
              {{$utils.toDateString(currMsg.timestamp,'yyyy-MM-dd HH:mm:ss')}}
            </flex-item>
          </flex-container>
        </flex-container>
      </el-card>
    </flex-item>
  </flex-container>
</template>

<script>
export default {
  data() {
    return {
      readOptions: "1",
      noticeMsg: [],
      currMsg: null
    };
  },
  watch: {
    "$store.state.base.noticeMsg": {
      handler(val) {
        this.noticeMsg = val;
      },
      immediate: true
    },
    readOptions: {
      handler(val) {
        this.currMsg = null;
        this.noticeMsg = this.$store.state.base.noticeMsg.filter(item => {
          if (val === "1") return true;
          if (val === "2" && item.isRead) return true;
          if (val === "3" && !item.isRead) return true;
          return false;
        });
      }
    }
  },
  computed: {
    showMain() {
      let isMinLayout =
        this.$store.state.base.defaultLayout === "defaultLayout";
      if (isMinLayout) return true;
      return !!this.currMsg;
    },
    showMenu() {
      let isMinLayout =
        this.$store.state.base.defaultLayout === "defaultLayout";
      if (isMinLayout) return true;
      return !this.currMsg;
    }
  },
  methods: {
    rowClick(row, column, event) {
      this.$store.commit("base/setNoticeMsgReaded", row);
      this.currMsg = row;
    },
    handleDelNoticeMsg() {
      this.$store.commit("base/delNoticeMsg", this.currMsg);
      this.currMsg = null;
    },
    handleBackMenu() {
      this.currMsg = null;
    }
  }
};
</script>

