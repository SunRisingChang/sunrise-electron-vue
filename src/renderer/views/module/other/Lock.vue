/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 19:02:24 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-29 08:42:34
 * @Description: 锁屏页面
 */
<template>
  <flex-container v-if="loading" height="100%" direction="column" alignItems="center" justifyContent="center" class="lock-page">
    <flex-item class="margin-bottom-20" justifyContent="center">
      <i class="icon-ali ali-yonghu2 user-icon"></i>
    </flex-item>
    <flex-item class="margin-bottom-20" justifyContent="center">
      <span class="user-name-block">{{userName}}</span>
    </flex-item>
    <flex-item class="margin-bottom-20" justifyContent="center">
      <el-input type="password" class="user-paswd" :placeholder="$t('login.passWd')" v-model="passwd" size="medium" @keyup.enter.native="lockLogin">
        <el-button @click="lockLogin" slot="append" icon="icon-ali ali-denglu" :title="$t('login.button')"></el-button>
      </el-input>
    </flex-item>
    <flex-item class="margin-bottom-20" justifyContent="center">
      <span class="msg-block">已锁定</span>
    </flex-item>
  </flex-container>
</template>
<script>
import VuexApi from "@/api/vuexApi";

export default {
  data() {
    return {
      loading: false,
      userName: null,
      passwd: null
    };
  },
  created() {
    if (!this.$route.query.userName) {
      this.$router.push({ path: "/login" });
    } else {
      this.userName = this.$route.query.userName;
      this.loading = true;
    }
  },
  mounted: function() {
    this.$store.dispatch("base/changeTheme");
  },
  methods: {
    async lockLogin() {
      let loading;
      try {
        if (this.passwd) {
          loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          await this.$utils.sleep(3000);
          await this.$store.dispatch("base/login", {
            userName: this.userName,
            passWd: this.passwd
          });
          this.$router.push({ path: "/" });
        }
      } catch (error) {
      } finally {
        if (loading) loading.close();
      }
    }
  }
};
</script>

