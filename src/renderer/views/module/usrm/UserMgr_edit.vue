/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:50:15
 * @Description: 用户编辑
 */
<template>
  <flex-container v-loading='loading'>

    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="90px" class="form-style-line">
      <el-row :span='12'>
        <el-col>
          <el-form-item label="账户名称 :" prop="acName">
            <el-input v-model="formData.acName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="账户状态 :" prop="acStat">
            <dict-select v-model="formData.acStat" dict-key='AcStat' placeholder="请选择" clearable></dict-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="隶属组织 :" prop="orgUuid">
            <el-cascader :options="orgTree" v-model="formData.orgUuid" :props="orgTreeProps" clearable @change='orgUuidChange'></el-cascader>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="拥有角色 :" prop="roleUuids">
            <el-select v-model="formData.roleUuids" multiple placeholder="请选择">
              <el-option v-for="item in roles" :key="item.uuid" :label="item.roleName" :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="初始密码 :" prop="acPwd">
            <el-input v-model="formData.acPwd" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="用户姓名 :" prop="userName">
            <el-input v-model="formData.userName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="用户性别 :" prop="userSex">
            <dict-select v-model="formData.userSex" dict-key='Sex' placeholder="请选择" clearable></dict-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="联系电话 :" prop="userPhone">
            <el-input v-model="formData.userPhone" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="出生日期 :" prop="userBirthday">
            <el-date-picker v-model="formData.userBirthday" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="邮箱地址 :" prop="userEmail">
            <el-input v-model="formData.userEmail" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <template v-if="formData.createdUser">
          <el-col>
            <el-form-item label="创建用户 :" prop="createdUser">
              <el-input v-model="formData.createdUser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="创建时间 :" prop="createdTime">
              <el-input :value="$utils.toDateString(formData.createdTime,'yyyy-MM-dd HH:mm:ss')" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="更新用户 :" prop="updatedUser">
              <el-input v-model="formData.updatedUser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="更新时间 :" prop="updatedTime">
              <el-input :value="$utils.toDateString(formData.updatedTime,'yyyy-MM-dd HH:mm:ss')" disabled></el-input>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <flex-container class="footer" justifyContent='flex-end'>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button @click="handleUpdateData" type="primary">确 定</el-button>
    </flex-container>

  </flex-container>
</template>

<script>
import SysRoleMgrApi from "@/api/usrm/sysRoleMgrApi.js";

export default {
  props: {
    initData: {
      type: Object
    }
  },
  inject: ["orgTree", "orgTreeProps"],
  data() {
    return {
      loading: false,
      roles: [],
      formData: Object.assign({}, this.initData),
      formRules: {
        acName: [
          { required: true, message: "请输入账户名称 !", trigger: "change" }
        ],
        acStat: [
          { required: true, message: "请选择账户状态 !", trigger: "change" }
        ],
        orgUuid: [
          { required: true, message: "请选择隶属组织 !", trigger: "change" }
        ],
        roleUuids: [
          { required: true, message: "请选择拥有角色 !", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    if (this.formData.orgUuid) this.loadRole(this.formData.orgUuid);
  },
  methods: {
    //动态加载角色
    async loadRole(orgUuid) {
      try {
        this.loading = true;
        let resp = await SysRoleMgrApi.getRoleByOrgUuid({ orgUuid: orgUuid });
        this.roles = resp.data;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    //组织改变
    orgUuidChange(orgUuid) {
      this.loadRole(orgUuid);
      this.formData.roleUuids = [];
    },
    //确认修改
    async handleUpdateData() {
      try {
        await this.$refs["editForm"].validate();
        this.$emit("updataData", this.formData);
        this.$emit("close");
      } catch (error) {}
    }
  }
};
</script>

