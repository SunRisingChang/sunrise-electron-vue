/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:57:28
 * @Description: 数组值编辑
 */
<template>
  <flex-container>

    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="80px" class="form-style-line">
      <el-row :span='12'>
        <el-col>
          <el-form-item label="名称 :" prop="dictName">
            <el-input v-model="formData.dictName" maxlength="40" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Key :" prop="dictKey">
            <el-input v-model="formData.dictKey" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Value :" prop="dictValue">
            <el-input v-model="formData.dictValue" maxlength="40" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="状态 :" prop="dictStat">
            <el-select v-model="formData.dictStat" placeholder="请选择">
              <el-option label="可用" value="1">
              </el-option>
              <el-option label="禁用" value="0">
              </el-option>
            </el-select>
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
    },
    type: {
      type: String,
      default: "select"
    }
  },
  data() {
    return {
      formData: Object.assign({}, this.initData),
      formRules: {
        dictName: [
          { required: true, message: "请输入名称 !", trigger: "change" }
        ],
        dictKey: [
          { required: true, message: "请输入Key !", trigger: "change" }
        ],
        dictValue: [
          { required: true, message: "请选择Value !", trigger: "change" }
        ],
        dictOrde: [
          { type: "number", message: "请选择数字 !", trigger: "change" }
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

