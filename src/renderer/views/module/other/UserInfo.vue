/**
 * @Author: Sun Rising 
 * @Date: 2019-07-05 05:06:48 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-12 22:32:08
 * @Description: 个人信息
 */
<template>
  <el-card>
    <flex-container justifyContent='center'>
      <flex-item width='300px' direction="column" wrap='nowrap'>
        <span class="user-info">{{$t('route.UserInfo')}}</span>
        <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="90px" class="form-style-line" :disabled="!isEdit" status-icon>
          <el-form-item label="姓名 :" prop="userName">
            <el-input v-model="formData.userName" maxlength="20" show-word-limit placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别 :" prop="userSex">
            <el-radio-group v-model="formData.userSex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系电话 :" prop="userPhone">
            <el-input v-model="formData.userPhone" maxlength="20" show-word-limit placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件 :" prop="userEmail">
            <el-input v-model="formData.userEmail" maxlength="20" placeholder="电子邮件"></el-input>
          </el-form-item>
          <el-form-item label="出生日期 :" prop="userBirthday">
            <el-date-picker v-model="formData.userBirthday" type="date" placeholder="选择日期" clearable></el-date-picker>
          </el-form-item>
        </el-form>
        <flex-container class="margin-top-20" justifyContent='center'>
          <el-button v-if="!isEdit" type="primary" @click="isEdit=true">修 改</el-button>
          <el-button v-if="isEdit" @click="reset">取 消</el-button>
          <el-button v-if="isEdit" type="primary" @click="handleUpdateData">确 认</el-button>
        </flex-container>
      </flex-item>
    </flex-container>
  </el-card>
</template>

<script>
import VuexApi from "@/api/vuexApi.js";

export default {
  data() {
    return {
      isEdit: false,
      formData: {},
      formRules: {
        userEmail: [
          { type: "email", message: "请输入正确的邮件格式", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    "$store.state.base.userInfo": {
      handler(val) {
        this.initUserInfo(val);
      },
      immediate: true
    }
  },
  methods: {
    async handleUpdateData() {
      try {
        await this.$refs["editForm"].validate();
        await VuexApi.saveUserInfo(this.formData);
      } catch (error) {}
    },
    initUserInfo(userInfo) {
      this.formData = Object.assign({}, userInfo);
      if (userInfo.userBirthday) {
        Object.assign(this.formData, {
          userBirthday: new Date(parseInt(userInfo.userBirthday))
        });
      }
    },
    reset() {
      this.initUserInfo(this.$store.state.base.userInfo);
      this.isEdit = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.user-info {
  text-align: center;
  height: 25px;
  line-height: 25px;
}
</style>

