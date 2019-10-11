/**
 * @Author: Sun Rising 
 * @Date: 2019-07-07 13:15:31 
 * @Last Modified by: Sun Rising 
 * @Last Modified time: 2019-07-07 13:15:31 
 * @Description: 多级路由
 */
<template>
  <flex-container class="cron-tab-page" direction='column' wrap='nowrap'>
    <flex-item>
      <el-alert class="margin-bottom-10" title="多级路由" type="success" :closable='false' :description="$route.path">
      </el-alert>
    </flex-item>
  </flex-container>
</template>
