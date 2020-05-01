/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 19:02:54 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2020-04-29 15:09:44
 * @Description: 密码修改
 */
<template>
  <dialog-drag title="密码修改" :visible.sync="isShowChangePwd" width="400px">
    <flex-container>
      <flex-item width="100%">
        <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="90px" class="form-style-line" status-icon>
          <el-form-item label="原始密码 :" prop="oldPwd">
            <el-input type="password" v-model="formData.oldPwd" maxlength="20" placeholder="原始密码"></el-input>
          </el-form-item>
          <el-form-item label="新设密码 :" prop="newPwd">
            <el-input type="password" v-model="formData.newPwd" maxlength="20" placeholder="新设密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="checkPwd">
            <el-input type="password" v-model="formData.checkPwd" maxlength="20" placeholder="确认密码"></el-input>
          </el-form-item>
        </el-form>
      </flex-item>
      <flex-container class="footer" justifyContent="flex-end">
        <el-button @click="$store.commit('base/setIsShowChangePwd', false)">取 消</el-button>
        <el-button @click="handleUpdateData" type="primary">确 定</el-button>
      </flex-container>
    </flex-container>
  </dialog-drag>
</template>

<script>
import VuexApi from "@/api/vuexApi.js";

export default {
  data() {
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入确认密码"));
      }
      if (this.formData.newPwd !== value) {
        callback(new Error("两次输入的密码不一致"));
      }
      callback();
    };
    return {
      isShowChangePwd: false,
      formData: {
        oldPwd: "",
        newPwd: "",
        checkPwd: ""
      },
      formRules: {
        oldPwd: [
          {
            required: true,
            message: "请输入原始密码 !",
            trigger: "change"
          },
          { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" }
        ],
        newPwd: [
          {
            required: true,
            message: "请输入新设密码 !",
            trigger: "change"
          },
          { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" }
        ],
        checkPwd: [{ validator: checkPwd, trigger: "change" }]
      }
    };
  },
  watch: {
    "$store.state.base.isShowChangePwd": {
      handler(val) {
        this.isShowChangePwd = val;
      },
      immediate: true
    },
    isShowChangePwd: {
      handler(val) {
        this.$store.commit("base/setIsShowChangePwd", val);
      }
    }
  },
  methods: {
    async handleUpdateData() {
      try {
        await this.$refs["editForm"].validate();
        await VuexApi.changePwd({
          oldPwd: this.$utils.encodePasswd(this.formData.oldPwd),
          newPwd: this.$utils.encodePasswd(this.formData.newPwd)
        });
        this.$store.dispatch("base/logout");
      } catch (error) {}
    }
  }
};
</script>
