/**
 * @Author: Sun Rising 
 * @Date: 2019-07-02 21:46:01 
 * @Last Modified by: Sun Rising
 * @Last Modified time: 2019-07-10 18:53:30
 * @Description: 任务编辑
 */

<template>
  <flex-container v-loading="loading" elemeur-loading-text="正在读取数据...">

    <el-form ref="editForm" :model="formData" :rules="formRules" label-position="right" label-width="100px" class="form-style-line">
      <el-row>
        <el-col>
          <el-form-item label="任务名称" prop="quartzName">
            <el-input v-model="formData.quartzName" maxlength="40" show-word-limit :disabled="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="任务组" prop="quartzGroup">
            <el-input v-model="formData.quartzGroup" maxlength="40" show-word-limit :disabled="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="执行类" prop="quartzClass">
            <el-select v-model="formData.quartzClass" :disabled="readonly">
              <el-option v-for="item in jobClass" :key="item.value" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Cron表达式" prop="quartzCron">
            <cron-tab v-model="formData.quartzCron" :disabled="readonly"></cron-tab>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="初始参数" prop="quartzParams">
            <el-input v-model="formData.quartzParams" maxlength="20" show-word-limit :disabled="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="执行策略" prop="quartzMisfire">
            <dict-select v-model="formData.quartzMisfire" dict-key='QuartzMisfire' placeholder="请选择" clearable :disabled="readonly"></dict-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="优先级" prop="quartzPriority">
            <el-input v-model.number="formData.quartzPriority" maxlength="2" show-word-limit :disabled="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="任务描述" prop="quartzDesc">
            <el-input type="textarea" v-model="formData.quartzDesc" maxlength="512" show-word-limit :disabled="readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="!readonly">
          <el-form-item label="立即执行" prop="isRun">
            <el-radio-group v-model="formData.isRun" :disabled="readonly">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if='formData.quartzExce'>
          <el-form-item label="异常信息" prop="quartzExce">
            <el-input type="textarea" :autosize='{ minRows: 2, maxRows: 6 }' readonly :value="formData.quartzExce"></el-input>
          </el-form-item>
        </el-col>
        <template v-if="quartzJob!==null">
          <el-col>
            <el-form-item label="下次执行" prop="nextFireTime">
              <el-input :value="$utils.toDateString(quartzJob.nextFireTime,'yyyy-MM-dd HH:mm:ss')" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="上次执行" prop="prevFireTime">
              <el-input :value="$utils.toDateString(quartzJob.prevFireTime,'yyyy-MM-dd HH:mm:ss')" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="生效时间" prop="startTime">
              <el-input :value="$utils.toDateString(quartzJob.startTime,'yyyy-MM-dd HH:mm:ss')" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="失效时间" prop="endTime">
              <el-input :value="$utils.toDateString(quartzJob.endTime,'yyyy-MM-dd HH:mm:ss')" disabled></el-input>
            </el-form-item>
          </el-col>
        </template>
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
import SysQuartzApi from "@/api/sysm/sysQuartzApi.js";

export default {
  props: {
    initData: {
      type: Object
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  inject: ["jobClass"],
  data() {
    return {
      loading: false,
      formData: Object.assign({}, this.initData),
      quartzJob: null,
      formRules: {
        quartzName: [
          { required: true, message: "请输入任务名称", trigger: "change" }
        ],
        quartzGroup: [
          { required: true, message: "请输入任务组", trigger: "change" }
        ],
        quartzClass: [
          { required: true, message: "请选择执行类", trigger: "change" }
        ],
        quartzCron: [
          { required: true, message: "请输入Cron表达式", trigger: "change" }
        ],
        quartzPriority: [
          { type: "number", message: "请输入数值", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    if (this.formData.uuid) this.getQuartzJobInfo();
  },
  methods: {
    //加载job详情
    async getQuartzJobInfo() {
      let resp = await SysQuartzApi.getSysQuartzJobInfo({
        uuid: this.formData.uuid
      });
      this.quartzJob = resp.data;
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

