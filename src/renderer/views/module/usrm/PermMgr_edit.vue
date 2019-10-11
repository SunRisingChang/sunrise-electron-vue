/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:51:49
 * @Description: 权限编辑
 */
<template>
  <flex-container>

    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="90px" class="form-style-line">
      <el-row>
        <el-col>
          <el-form-item label="资源隶属 :" prop="permTable">
            <el-input v-model="formData.permTable" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="资源类型 :" prop="permType">
            <el-select v-model="formData.permType" placeholder="请选择" clearable>
              <el-option label="菜单" value="1">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="权限状态 :" prop="permStat">
            <el-select v-model="formData.permStat" placeholder="请选择" clearable>
              <el-option label="正常" value="1">
              </el-option>
              <el-option label="禁用" value="2">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="权限描述 :" prop="permDesc">
            <el-input type="textarea" v-model="formData.permDesc" maxlength="512" show-word-limit></el-input>
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
        permType: [
          { required: true, message: "请选择资源类型 !", trigger: "change" }
        ],
        permTable: [
          { required: true, message: "请输入隶属表 !", trigger: "change" }
        ],
        permStat: [
          { required: true, message: "请选择权限状态 !", trigger: "change" }
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

