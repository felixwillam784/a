<script setup lang="ts">
import { ref } from 'vue';
import { Chart, Grid, Line, Tooltip, Bar, Marker } from 'vue3-charts'
import { Top, Bottom } from '@element-plus/icons-vue';

const chart1Array = [
  { date: '6-20', visitor_rate: 100},
  { date: '6-21', visitor_rate: 120},
  { date: '6-22', visitor_rate: 130},
  { date: '6-23', visitor_rate: 160},
  { date: '6-24', visitor_rate: 190},
  { date: '6-25', visitor_rate: 250},
  { date: '6-26', visitor_rate: 300},
];

const chart2Array = [
  { date: '6-20', visitor_rate: 100},
  { date: '6-21', visitor_rate: 120},
  { date: '6-22', visitor_rate: 130},
  { date: '6-23', visitor_rate: 160},
  { date: '6-24', visitor_rate: 190},
  { date: '6-25', visitor_rate: 250},
  { date: '6-26', visitor_rate: 300},
];

const chart3Array = [
  { date: '6-20', visitor_rate: 100},
  { date: '6-21', visitor_rate: 120},
  { date: '6-22', visitor_rate: 130},
  { date: '6-23', visitor_rate: 160},
  { date: '6-24', visitor_rate: 190},
  { date: '6-25', visitor_rate: 250},
  { date: '6-26', visitor_rate: 300},
];

const chart4Array = [
  { date: '6-20', visitor_rate: 100},
  { date: '6-21', visitor_rate: 120},
  { date: '6-22', visitor_rate: 130},
  { date: '6-23', visitor_rate: 160},
  { date: '6-24', visitor_rate: 190},
  { date: '6-25', visitor_rate: 250},
  { date: '6-26', visitor_rate: 300},
];

const chart1data = ref(chart1Array);
const chart2data = ref(chart2Array);
const chart3data = ref(chart3Array);
const chart4data = ref(chart4Array);
const chart1direction = ref('horizontal');
const chart1margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
});
const chart1axis = ref({
  primary: {
		format: (domain: string) => {
      return ""
    },
  },
  secondary: {
    format: (domain: any) => {
      if (domain*1 > 4000) {
        return "";
      } else {
        return "";
      } 
    },
  }
});

const visitorOverview = ref({
	platform_balance: "",
	total_recharge_amount: "",
	total_withdrawal_amount: "",
	charge_withdrawal_difference: "",
	withdrawal_fee: "",
	total_withdrawal: "",
	bonus_amount: "",
	registration_number: "",
	depositor_number: "",
	lifting_ratio: "",
	agent_number: "",
	new_player_number: "",
	recharge_code_rate: "",
})
</script>

<template>
	<el-card>
		<el-row :gutter="12" style="justify-content: center;" class="visitor-card">
			<el-col :span="4">
				<el-card shadow="always">
					<el-row>
						<el-col :span="12">
							<div>今日访问总人数</div>
							<div class="visitor-text">999999</div>
							<div style="display:flex;">
								<div class="visitor-title">较昨日<span class="visitor-rate">100% </span></div>
								<el-icon class="visitor-icon" :size="20" color="red">
									<Top />
								</el-icon>						
							</div>
							
						</el-col>
						<el-col :span="12">
							<Chart
								:size="{ width: 180, height: 110 }"
								:data="chart1data"
								:margin="chart1margin"
								:direction="chart1direction"
								:axis="chart1axis">

								<template #layers>
									<Line :dataKeys="['date', 'visitor_rate']" :lineStyle="{ stroke: '#000000' }"/>
								</template>
							</Chart>
						</el-col>
					</el-row>
					
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card shadow="always">
					<el-row>
						<el-col :span="12">
							<div>今日活跃用户数</div>
							<div class="visitor-text">999999</div>
							<div style="display:flex;">
								<div class="visitor-title">较昨日<span class="visitor-rate">100% </span></div>
								<el-icon class="visitor-icon" :size="20" color="red">
									<Top />
								</el-icon>
							</div>
						</el-col>
						<el-col :span="12">
							<Chart
								:size="{ width: 180, height: 110 }"
								:data="chart2data"
								:margin="chart1margin"
								:direction="chart1direction"
								:axis="chart1axis">

								<template #layers>
									<Line :dataKeys="['date', 'visitor_rate']" :lineStyle="{ stroke: '#000000' }"/>
								</template>
							</Chart>
						</el-col>
					</el-row>
					
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card shadow="always">
					<el-row>
						<el-col :span="12">
							<div>实时在线人数</div>
							<div class="visitor-text">999999</div>
							<div style="display:flex;">
								<div class="visitor-title">较昨日<span class="visitor-rate">100% </span></div>
								<el-icon class="visitor-icon" :size="20" color="red">
									<Top />
								</el-icon>
							</div>
						</el-col>
						<el-col :span="12">
							<Chart
								:size="{ width: 180, height: 110 }"
								:data="chart3data"
								:margin="chart1margin"
								:direction="chart1direction"
								:axis="chart1axis">

								<template #layers>
									<Line :dataKeys="['date', 'visitor_rate']" :lineStyle="{ stroke: '#000000' }"/>
								</template>
							</Chart>
						</el-col>
					</el-row>
					
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card shadow="always">
					<el-row>
						<el-col :span="12">
							<div>今日充值成功数</div>
							<div class="visitor-text">999999</div>
							<div style="display:flex;">
								<div class="visitor-title">较昨日<span class="visitor-rate">100% </span></div>
								<el-icon class="visitor-icon" :size="20" color="red">
									<Top />
								</el-icon>
							</div>
						</el-col>
						<el-col :span="12">
							<Chart
								:size="{ width: 180, height: 110 }"
								:data="chart4data"
								:margin="chart1margin"
								:direction="chart1direction"
								:axis="chart1axis">

								<template #layers>
									<Line :dataKeys="['date', 'visitor_rate']" :lineStyle="{ stroke: '#000000' }"/>
								</template>
							</Chart>
						</el-col>
					</el-row>
					
				</el-card>
			</el-col>
		</el-row>
	</el-card>
</template>

<style lang="scss" scoped>
.el-col-4 {
	max-width: 22%;
	flex: 0 0 25%;
	margin-right: 20px;
	margin-left: 20px;
}

.visitor-card {
	.el-card {
		border: none !important;
		background-color: #E4E4E4 !important;

		.el-card__body {
			
			.visitor-text {
				margin-top: 20px;
				font-weight: bold;
				font-size: 20px;
				margin-left: 20px;
			
			}
			.visitor-title {
				margin-top: 20px;
			}
			.visitor-rate {
				margin-top: 20px;
				color: red;
			}
			.visitor-icon {
				margin-top: 23px;
				color: red;
			}
		}
	}
}
</style>