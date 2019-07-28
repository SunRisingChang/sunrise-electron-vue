<template>
	<el-card class="box-card">
		<template slot="header" class="clearfix">
			<span>未来 5 次运行时间</span>
		</template>
		<el-row v-if='isShow'>
			<el-col class="margin-bottom-10" :span="24" v-for='item in resultList' :key="item">
				{{item}}
			</el-col>
		</el-row>
		<el-row v-else>
			<el-col :span="24">计算结果中...</el-col>
		</el-row>
	</el-card>
</template>

<script>
import crontabResult from "./crontab-result";
export default crontabResult;
</script>