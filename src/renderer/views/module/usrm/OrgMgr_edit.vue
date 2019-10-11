/**
 * @Author: Sun Rising 
 * @Date: 2019-06-26 12:58:24 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:52:37
 * @Description: 组织管理编辑
 */
<template>
  <flex-container>
    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="90px" class="form-style-line">
      <el-row :span='12'>
        <el-col>
          <el-form-item label="组织名称 :" prop="orgName">
            <el-input v-model="formData.orgName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="唯一编号 :" prop="orgCode">
            <el-input v-model="formData.orgCode" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="组织简称 :" prop="orgBrfName">
            <el-input v-model="formData.orgBrfName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="负责人 :" prop="orgMast">
            <el-input v-model="formData.orgMast"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="组织地址 :" prop="orgAddr">
            <el-input v-model="formData.orgAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="组织邮编 :" prop="orgPost">
            <el-input v-model="formData.orgPost"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="组织电话 :" prop="orgPhone">
            <el-input v-model="formData.orgPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="组织状态 :" prop="orgStat">
            <el-radio-group v-model="formData.orgStat">
              <el-radio label="1">正常</el-radio>
              <el-radio label="2">禁用</el-radio>
              <el-radio label="3">注销</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="组织描述 :" prop="orgDesc">
            <el-input type="textarea" v-model="formData.orgDesc" maxlength="512" show-word-limit></el-input>
          </el-form-item>
        </el-col>
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
      </el-row>
    </el-form>
    <flex-container class="footer" justifyContent='flex-end'>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button @click="handleUpdateData" type="primary">确 定</el-button>
    </flex-container>
  </flex-container>
</template>

<script>
export default {
  props: {
    initData: {
      type: Object
    }
  },
  data() {
    return {
      formData: Object.assign({}, this.initData),
      formRules: {
        orgName: [
          { required: true, message: "请输入组织名称 !", trigger: "change" }
        ],
        orgCode: [
          { required: true, message: "请输入唯一编号 !", trigger: "change" }
        ]
      }
    };
  },
  methods: {
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
