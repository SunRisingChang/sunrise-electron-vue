<template>
	<el-form>
		<el-radio-group v-model='radioValue'>
			<el-row class="margin-10">
				<el-radio :label="1"> 不填，允许的通配符[, - * /]</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="2"> 每年</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="3">
					周期从
					<el-input-number class="el-input-height" :min="1" v-model='cycle01' /> -
					<el-input-number class="el-input-height" :min="1" v-model='cycle02' /> 年
				</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="4">
					从
					<el-input-number class="el-input-height" :min="1" v-model='average01' /> 年开始，每
					<el-input-number class="el-input-height" :min="1" v-model='average02' /> 年执行一次
				</el-radio>
			</el-row>
			<el-row class="margin-10">
				<el-radio :label="5">
					任意指定
					<el-button size="mini" @click="checkboxList=[]">清空指定</el-button>
					<el-row class="margin-top-10">
						<el-checkbox-group v-model="checkboxList">
							<el-col :span="2" v-for='(item) in 9' :key="item">
								<el-checkbox :label="item - 1 + fullYear">
									{{item -1 + fullYear}}
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
import crontabYear from "./crontab-year";
export default crontabYear;
</script>