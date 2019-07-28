/**
 * @Author: Sun Rising 
 * @Date: 2019-07-10 18:54:30 
 * @Last Modified by: Sun Rising 
 * @Last Modified time: 2019-07-10 18:54:30 
 * @Description: 菜单编辑
 */
<template>
  <flex-container>
    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="90px" class="form-style-line">
      <el-row :span='12'>
        <el-col>
          <el-form-item label="目标名称 :" prop="menuName">
            <el-input v-model="formData.menuName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="目标标识 :" prop="menuKey">
            <el-input v-model="formData.menuKey" maxlength="10" show-word-limit :disabled='formData.menuType!==3'></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="formData.menuType!=='3'">
          <el-form-item label="目标图标 :" prop="menuIcon">
            <el-input v-model="formData.menuIcon" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="目标类型 :" prop="menuType">
            <el-input :value="formData.menuType===1?'菜单组':formData.menuType===2?'菜单':'按钮'" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="目标路径 :" prop="menuUrl">
            <el-input v-model="formData.menuUrl" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="是否可见 :" prop="menuVisible">
            <el-radio-group v-model="formData.menuVisible">
              <el-radio label="1">可见</el-radio>
              <el-radio label="0">不可见</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item v-if="formData.menuType!=='3'" label="打开方式 :" prop="menuOpenWay">
            <el-input :value="formData.menuOpenWay==='1'?'当前窗口':'弹出窗口'" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="目标描述 :" prop="menuDesc">
            <el-input type="textarea" v-model="formData.menuDesc" maxlength="512" show-word-limit></el-input>
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
    let validateMenuKey = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入目标标识 !"));
      }
      let mk = this.initData.children.filter(node => value === node.menuKey);
      if (mk.length > 0) {
        callback(new Error("输入的目标标识重复,请重新确认 !"));
      }
      callback();
    };
    return {
      formData: Object.assign({}, this.initData),
      formRules: {
        menuName: [
          { required: true, message: "请输入目标名称 !", trigger: "change" }
        ],
        menuKey: [
          { required: true, validator: validateMenuKey, trigger: "change" }
        ],
        menuIcon: [
          { required: true, message: "请输入目标图标 !", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    "formData.menuKey": {
      handler(val) {
        if (this.formData.menuType === 3) {
          this.formData.menuUrl =
            this.formData.menuParent.replace(/\//g, ":").substr(1) +
            ":" +
            (val ? val : "");
        }
      },
      immediate: true
    }
  },
  methods: {
    //确认修改
    async handleUpdateData() {
      try {
        await this.$refs["editForm"].validate();
        if (this.formData.menuType === 3) this.formData.children = [];
        this.$emit("updataData", this.formData);
        this.$emit("close");
      } catch (error) {}
    }
  }
};
</script>
