<template>
	<el-form>
		<el-radio-group v-model='radioValue'>
			<el-row class="margin-10">
				<el-radio :label="1"> 周，允许的通配符[, - * /]</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="2"> 不指定</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="3">
					周期从星期
					<el-input-number class="el-input-height" :min="1" v-model='cycle01' /> -
					<el-input-number class="el-input-height" :min="1" v-model='cycle02' />
				</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="4">
					第
					<el-input-number class="el-input-height" :min="1" v-model='average01' /> 周的星期
					<el-input-number class="el-input-height" :min="1" v-model='average02' />
				</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="5">
					本月最后一个星期
					<el-input-number class="el-input-height" :min="1" v-model='weekday' />
				</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="6">
					任意指定
					<el-button size="mini" @click="checkboxList=[]">清空指定</el-button>
					<el-row class="margin-top-10">
						<el-checkbox-group v-model="checkboxList">
							<el-col :span="2" v-for='(item,index) in weekList' :key="item">
								<el-checkbox :label="index+1">
									{{item}}
								</el-checkbox>
							</el-col>
						</el-checkbox-group>
					</el-row>
				</el-radio>
			</el-row>
		</el-radio-group>
	</el-form>
</template>

<script>
import crontabWeek from "./crontab-week";
export default crontabWeek;
</script>