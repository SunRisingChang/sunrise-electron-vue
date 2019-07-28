/**
 * @Author: Sun Rising 
 * @Date: 2019-06-13 10:57:44 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:57:46
 * @Description: 字典组编辑
 */
<template>
  <flex-container>

    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="80px" class="form-style-line">
      <el-row :span='12'>
        <el-col>
          <el-form-item label="名称 :" prop="groupName">
            <el-input v-model="formData.groupName" maxlength="40" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="索引 :" prop="groupKey">
            <el-input v-model="formData.groupKey" maxlength="40" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="类型 :" prop="dictType">
            <dict-select v-model="formData.dictType" dict-key='DictType' placeholder="请选择" clearable></dict-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="状态 :" prop="groupStat">
            <dict-select v-model="formData.groupStat" dict-key='GroupStat' placeholder="请选择" clearable></dict-select>
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
        groupName: [
          { required: true, message: "请输入名称 !", trigger: "change" }
        ],
        groupKey: [
          { required: true, message: "请输入索引 !", trigger: "change" }
        ],
        dictType: [
          { required: true, message: "请选择类型 !", trigger: "change" }
        ],
        groupStat: [
          { required: true, message: "请选择状态 !", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    //检测修改字典组类型
    "formData.dictType": {
      async handler(val) {
        try {
          if (
            this.formData.dictType !== this.initData.dictType &&
            this.initData.uuid
          )
            await this.$confirm(
              "检测到字典类型修改,该操作会使其下字典数据清空,是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            );
        } catch (error) {
          this.formData.dictType = this.initData.dictType;
        }
      }
    }
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

