/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:51:01
 * @Description: 权限编辑
 */
<template>
  <flex-container v-loading='loading'>

    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="90px" class="form-style-line">
      <el-row>
        <el-col>
          <el-form-item label="角色名称 :" prop="roleName">
            <el-input v-model="formData.roleName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色编码 :" prop="roleCode">
            <el-input v-model="formData.roleCode" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="隶属组织 :" prop="orgUuid">
            <el-cascader :options="orgTree" v-model="formData.orgUuid" :props="orgTreeProps" clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="角色描述 :" prop="roleDesc">
            <el-input type="textarea" v-model="formData.roleDesc" maxlength="512" show-word-limit></el-input>
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
    <flex-container class="padding-10">
      <flex-item width="100%">
        <el-tabs>
          <el-tab-pane v-for="item in permMap" :key="item.key" :label="item.label">
            <role-menu v-if="item.key==='1'" :data='item.data' :checkedKeys='checkedKeys' v-model="selectedMenu"></role-menu>
          </el-tab-pane>
        </el-tabs>
      </flex-item>
    </flex-container>

    <flex-container class="footer" justifyContent='flex-end'>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button @click="handleUpdateData" type="primary">确 定</el-button>
    </flex-container>

  </flex-container>
</template>

<script>
import SysRoleMgrApi from "@/api/usrm/sysRoleMgrApi.js";
import RoleMenu from "./Role_menu";

export default {
  components: { RoleMenu },
  props: {
    initData: {
      type: Object
    }
  },
  inject: ["orgTree", "orgTreeProps", "permMap"],
  data() {
    return {
      loading: false,
      //选择的菜单
      selectedMenu: [],
      //默认选择的菜单keys
      checkedKeys: [],
      formData: Object.assign({}, this.initData),
      formRules: {
        roleName: [
          { required: true, message: "请输入角色名称 !", trigger: "change" }
        ],
        roleCode: [
          { required: true, message: "请输入角色编码 !", trigger: "change" }
        ],
        orgUuid: [
          { required: true, message: "请选择隶属组织 !", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    if (this.initData.uuid) this.initPermSelect(this.initData.uuid);
  },
  methods: {
    //初始化权限选择
    async initPermSelect(uuid) {
      try {
        this.loading = true;
        let resp = await SysRoleMgrApi.getSelectPerm({ roleUuid: uuid });
        Object.keys(resp.data).forEach(permType => {
          if (permType === "1") this.checkedKeys = resp.data[permType];
        });
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    //确认修改
    async handleUpdateData() {
      try {
        await this.$refs["editForm"].validate();
        this.formData.permUuids = {
          //装配菜单资源
          "1": this.selectedMenu
        };
        this.$emit("updataData", this.formData);
        this.$emit("close");
      } catch (error) {}
    }
  }
};
</script>

