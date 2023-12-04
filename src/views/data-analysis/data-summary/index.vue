<script setup lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

import { Chart, Grid, Line, Tooltip, Bar, Marker } from 'vue3-charts'
import useStore from '@/store';
import {getDataSummaryChatGameTotal, getDataSummaryChartDepositeWithdrawalTotalData, getDataSummaryChartThirdGame, getDataSummaryChartSelfGame, getDataSummaryChartfirstDepositeRetention, getDataSummaryReport, getDataSummaryChartDepositeWithdrawalData, getDataSummaryChartfirstChargeCountData, getDataSummaryChartfirstChargeAmountData, getDataSummaryChartfirstActivityRetention, getDataSummaryChartAgentRetention} from '@/api/DataAnalysis'
import { fa } from 'element-plus/es/locale';
const { user } = useStore();
const router = useRouter();
const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

const activeRetentionButton = ref<number>(0);

const activeButton = ref<number>(0);

const activeGameAPIButton = ref<number>(0);

const depositWithdrawlTotal={
  recharge_amount:9999.99,
  success_withdrawal_amount:9999.99,
  agent_withdrawal_amount:9999.99,
  deposit_and_withdrawal_difference:9999.99,
};

const gameTotal={
  bet_amount:9999.99,
  winning_amount:9999.99,
  platform_profit_loss:9999.99,
  dealer_advantage:9999.99,
};

const chart1Array = [
  { date: '6-20', chart_recharge_amount: 3700, chart_success_withdraw_amount: 2800, chart_agent_withdraw_amount: 1800, chart_charge_withdraw_difference: 800,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99 },
];

const chart2Array = [
  { date: '6-20', chart_first_charge_count: 2100, chart_recharge_count: 2978},
];

const chart3Array = [
  { date: '6-20', chart_first_charge_amount: 2100, chart_recharge_amount: 2978},
];

const chart4Array = [
  { date: '6-20', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999,},
];

const chart5Array = [
  { date: '6-20', chart_new_register_count: 3700, chart_new_agent_count: 3300, chart_agent_2_stay_count: 2900, chart_agent_3_stay_count: 2500, chart_agent_7_stay_count: 2200, chart_agent_15_stay_count: 1900, chart_agent_30_stay_count: 1400, chart_agent_2_retention_rate: 9999, chart_agent_3_retention_rate: 9999, chart_agent_7_retention_rate: 9999, chart_agent_15_retention_rate: 9999, chart_agent_30_retention_rate: 9999,},
];

const chart6Array = [
  { date: '6-20', chart_new_register_count: 3700, chart_first_deposite_count: 3300, chart_first_deposite_2_stay_count: 2900, chart_first_deposite_3_stay_count: 2500, chart_first_deposite_7_stay_count: 2200, chart_first_deposite_15_stay_count: 1900, chart_first_deposite_30_stay_count: 1400, chart_first_deposite_2_retention_rate: 9999, chart_first_deposite_3_retention_rate: 9999, chart_first_deposite_7_retention_rate: 9999, chart_first_deposite_15_retention_rate: 9999, chart_first_deposite_30_retention_rate: 9999,},
];

const chart7Array = [
  { date: '6-20', chart_self_bet_amount: 3500, chart_self_bonus_amount: 2500, chart_self_profit_loss: 1800, chart_self_bettor_count: 9999, chart_self_game_count: 9999, chart_self_game_revenue_rate: 99.99,},
];
const chart8Array = [
  { date: '6-20', chart_third_bet_amount: 3500, chart_third_bonus_amount: 2500, chart_third_profit_loss: 1800, chart_third_bettor_count: 9999, chart_third_game_count: 9999, chart_third_game_revenue_rate: 99.99,},
];

const chart1data = ref(chart1Array);
const chart2data = ref(chart2Array);
const chart3data = ref(chart3Array);
const chart4data = ref(chart4Array);
const chart5data = ref(chart5Array);
const chart6data = ref(chart6Array);
const chart7data = ref(chart7Array);
const chart8data = ref(chart8Array);
const depositWithdrawlTotalData = ref(depositWithdrawlTotal);
const gameTotalData = ref(gameTotal);

const chart1direction = ref<any>('horizontal');
const chart1margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
});
const chart1axis = ref<any>({
  primary: {
    type: 'band',
  },
  secondary: {
    domain: ['0', 'dataMax + 100'],
    type: 'linear',
    format: (domain: any) => {
      if (domain*1 > 4000) {
        return "";
      } else {
        return domain*1/1000 + "K";
      } 
    },
    tricks: 4
  }
});



interface GetRetentionReport {
  id: string;
  data_summary_date_time: string;
  data_summary_active_user_count: number;
  data_summary_platform_balance: string;
  data_summary_new_user_count: string;
  data_summary_add_active_user_count: number;
  data_summary_login_user_count: number;
  data_summary_active_ratio: string;
  data_summary_recharge_success_count: number;
  data_summary_recharge_success_amount: string;
  data_summary_recharge_success_rate: string;
  data_summary_first_charge_count: number;
  data_summary_first_charge_amount: string;
  data_summary_today_first_deposit_new_user: string;
  data_summary_refill_user_count: number;
  data_summary_refill_new_user_count: number;
  data_summary_refill_count: string;
  data_summary_recharge_amount: string;
  data_summary_recharge_ratio: string;
  data_summary_new_user_payment_rate: string;
  data_summary_cash_withdraw_app_count: number;
  data_summary_success_withdraw_count: number;
  data_summary_success_withdraw_amount: string;
  data_summary_charge_withdraw_difference: string;
  data_summary_deposit_withdraw_difference_rate: string;
  data_summary_manual_confirm_transaction_count: number;
  data_summary_manual_confirm_amount: string;
  data_summary_bet_count: number;
  data_summary_bet_amount: string;
  data_summary_bonus_amount: string;
  data_summary_game_revenue: string;
  data_summary_today_platform_rtp: string;
  data_summary_internal_game_rtp: string;
  data_summary_external_game_rtp: string;
  data_summary_agent_rebate_amount: string;
  data_summary_hidden_commission_rebate_amount: string;
  data_summary_none_withdraw_amount: string;
  data_summary_nextday_recharge_amount: string;
  data_summary_3day_recharge_amount: string;
  data_summary_active_retention_rate_1: string;
  data_summary_active_retention_rate_3: string;
  data_summary_active_retention_rate_7: string;
  data_summary_active_retention_rate_15: string;
  data_summary_active_retention_rate_30: string;
  data_summary_agent_retention_rate_1: string;
  data_summary_agent_retention_rate_3: string;
  data_summary_agent_retention_rate_7: string;
  data_summary_agent_retention_rate_15: string;
  data_summary_agent_retention_rate_30: string;
  data_summary_first_charge_retention_rate_1: string;
  data_summary_first_charge_retention_rate_3: string;
  data_summary_first_charge_retention_rate_7: string;
  data_summary_first_charge_retention_rate_15: string;
  data_summary_first_charge_retention_rate_30: string;
  data_summary_active_retention_value_1: string;
  data_summary_active_retention_value_3: string;
  data_summary_active_retention_value_7: string;
  data_summary_active_retention_value_15: string;
  data_summary_active_retention_value_30: string;
  data_summary_agent_retention_value_1: string;
  data_summary_agent_retention_value_3: string;
  data_summary_agent_retention_value_7: string;
  data_summary_agent_retention_value_15: string;
  data_summary_agent_retention_value_30: string;
  data_summary_first_charge_retention_value_1: string;
  data_summary_first_charge_retention_value_3: string;
  data_summary_first_charge_retention_value_7: string;
  data_summary_first_charge_retention_value_15: string;
  data_summary_first_charge_retention_value_30: string;
}

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(1);

const retentionReportList = ref<Array<GetRetentionReport>>([
])

const handleDateRange = (date: string) => {
  if (dateRange?.value != null) {
    switch (date) {
      case "before yesterday":
        dateRange.value[0] = moment().subtract(2, 'day').format('YYYY-MM-DD');
        dateRange.value[1] = moment().subtract(2, 'day').format('YYYY-MM-DD');
        buttonIndex.value = 2;
        break;
      case "yesterday":
        dateRange.value[0] = moment().subtract(1, 'day').format('YYYY-MM-DD');
        dateRange.value[1] = moment().subtract(1, 'day').format('YYYY-MM-DD');
        buttonIndex.value = 1;
        break;
      case "today":
        dateRange.value[0] = moment().format('YYYY-MM-DD');
        dateRange.value[1] = moment().format('YYYY-MM-DD');
        buttonIndex.value = 0;
        break;
      case "this week":
        dateRange.value[0] = moment().clone().startOf('week').format('YYYY-MM-DD');
        dateRange.value[1] = moment().clone().endOf('week').format('YYYY-MM-DD');
        buttonIndex.value = 3;
        break;
      case "last week":
        dateRange.value[0] = moment().clone().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
        dateRange.value[1] = moment().clone().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
        buttonIndex.value = 4;
        break;
      case "this month":
        dateRange.value[0] = moment().clone().startOf('month').format('YYYY-MM-DD');
        dateRange.value[1] = moment().clone().endOf('month').format('YYYY-MM-DD');
        buttonIndex.value = 5;
        break;
      case "last month":
        dateRange.value[0] = moment().clone().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        dateRange.value[1] = moment().clone().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
        buttonIndex.value = 6;
        break;
      case "this year":
        dateRange.value[0] = moment().clone().startOf('year').format('YYYY-MM-DD');
        dateRange.value[1] = moment().clone().endOf('year').format('YYYY-MM-DD');
        buttonIndex.value = 7;
        break;
      case "last year":
        dateRange.value[0] = moment().clone().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
        dateRange.value[1] = moment().clone().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
        buttonIndex.value = 8;
        break;
      case "last 7days":
        dateRange.value[0] = moment().subtract(7, 'day').format('YYYY-MM-DD');
        dateRange.value[1] = moment().subtract(0, 'day').format('YYYY-MM-DD');
        buttonIndex.value = 9;
        break;
      case "last 30days":
        dateRange.value[0] = moment().subtract(30, 'day').format('YYYY-MM-DD');
        dateRange.value[1] = moment().subtract(0, 'day').format('YYYY-MM-DD');
        buttonIndex.value = 10;
        break;
      case "all":
        dateRange.value[0] = "";
        dateRange.value[1] = "";
        buttonIndex.value = 11;
        break;
      case "previous day":
        var date1 = new Date(dateRange.value[0]);
        var date2 = new Date(dateRange.value[1]);

        dateRange.value[0] = moment(date1).subtract(1, 'day').format('YYYY-MM-DD');
        dateRange.value[1] = moment(date2).subtract(1, 'day').format('YYYY-MM-DD');
        break;
      case "next day":
        var date1 = new Date(dateRange.value[0]);
        var date2 = new Date(dateRange.value[1]);

        dateRange.value[0] = moment(date1).subtract(-1, 'day').format('YYYY-MM-DD');
        dateRange.value[1] = moment(date2).subtract(-1, 'day').format('YYYY-MM-DD');
        break;
    }
  }
}

const handleButtonActive = (index: number) => {
  activeButton.value = index;
}

const handleChartRetentionType = (index: number) => {
  activeRetentionButton.value = index;
}

const handleGameAPIType = (index: number) => {
  activeGameAPIButton.value = index;
}

const handlePagination = () => {
  handleSearch();
}

const handleReset = () => {
  handleDateRange('today');
}

const handleSearch = () => {
  loading.value = true;
  getData().then(()=>{
    loading.value = false;
  }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
}
onMounted(()=>{
  loading.value = true;
  getData().then(()=>{
    loading.value = false;
  }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
})
const getData = async () =>{
  
  let retentionReportListDataRes = await getDataSummaryReport(user.token, dateRange.value, formData.value);
  retentionReportList.value  = retentionReportListDataRes.data.data;
  total.value = retentionReportListDataRes.data.data.length;

  let temp = await getDataSummaryChartDepositeWithdrawalData(user.token, dateRange.value, formData.value);
  chart1data.value = temp.data.data;

  temp = await getDataSummaryChartfirstChargeCountData(user.token, dateRange.value, formData.value);
  chart2data.value = temp.data.data;

  temp = await getDataSummaryChartfirstChargeAmountData(user.token, dateRange.value, formData.value);
  chart3data.value = temp.data.data;

  temp = await getDataSummaryChartfirstActivityRetention(user.token, dateRange.value, formData.value);
  chart4data.value = temp.data.data;

  temp = await getDataSummaryChartAgentRetention(user.token, dateRange.value, formData.value);
  chart5data.value = temp.data.data;

  temp = await getDataSummaryChartfirstDepositeRetention(user.token, dateRange.value, formData.value);
  chart6data.value = temp.data.data;
  
  temp = await getDataSummaryChartSelfGame(user.token, dateRange.value, formData.value);
  chart7data.value = temp.data.data;
  
  temp = await getDataSummaryChartThirdGame(user.token, dateRange.value, formData.value);
  chart8data.value = temp.data.data;
  
  temp = await getDataSummaryChartDepositeWithdrawalTotalData(user.token, dateRange.value, formData.value);
  depositWithdrawlTotalData.value = temp.data.data;

  temp = await getDataSummaryChatGameTotal(user.token, dateRange.value, formData.value);
  gameTotalData.value = temp.data.data;
  
}




</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card style="margin-top: 10px;">
          <el-row>
            <el-button :type="buttonIndex == 0 ? 'primary' : ''" @click="handleDateRange('today')">今日</el-button>
            <el-button :type="buttonIndex == 1 ? 'primary' : ''" @click="handleDateRange('yesterday')">昨日</el-button>
            <el-button :type="buttonIndex == 2 ? 'primary' : ''" @click="handleDateRange('before yesterday')">前日</el-button>
            <el-button :type="buttonIndex == 3 ? 'primary' : ''" @click="handleDateRange('this week')">本周</el-button>
            <el-button :type="buttonIndex == 4 ? 'primary' : ''" @click="handleDateRange('last week')">上周</el-button>
            <el-button :type="buttonIndex == 5 ? 'primary' : ''" @click="handleDateRange('this month')">本月</el-button>
            <el-button :type="buttonIndex == 6 ? 'primary' : ''" @click="handleDateRange('last month')">上月</el-button>
            <el-button :type="buttonIndex == 7 ? 'primary' : ''" @click="handleDateRange('this year')">今年</el-button>
            <el-button :type="buttonIndex == 8 ? 'primary' : ''" @click="handleDateRange('last year')">去年</el-button>
            <el-button :type="buttonIndex == 9 ? 'primary' : ''" @click="handleDateRange('last 7days')">过去7天</el-button>
            <el-button :type="buttonIndex == 10 ? 'primary' : ''" @click="handleDateRange('last 30days')">过去30天</el-button>
            <el-button :type="buttonIndex == 11 ? 'primary' : ''" @click="handleDateRange('all')">全部</el-button>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-form ref="formDataRef" :inline="true" style="width: 100%;">
              <el-form-item>
                <el-button  @click="handleDateRange('previous day')">前一天</el-button>
              </el-form-item>
              <el-form-item label="选择周期:">
                <el-date-picker type="daterange" v-model="dateRange" range-separator="至"
                  value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-button  @click="handleDateRange('next day')">后一天</el-button>
              </el-form-item>
              <el-form-item style="float: right;">
                <el-button @click="handleReset" :icon="Refresh">重置</el-button>
                <el-button @click="handleSearch" :icon="Search">查新</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
        <div class="user-detail-header">
          <div >
            <el-button :type="activeButton == 0 ? 'warning' : ''"
              @click="handleButtonActive(0)">数据</el-button>
            <el-button :type="activeButton == 1 ? 'warning' : ''"
              @click="handleButtonActive(1)">图表</el-button>
          </div>
        </div>
        <el-card style="margin-top: 20px;" v-if="activeButton == 0">
          <el-table v-loading="loading" :data="retentionReportList" style="width: 100%;" >
            <el-table-column label = "时间" align="left" prop="data_summary_date_time" width="100">
              <template #default="scope">
                <p>{{ scope.row.data_summary_date_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "活跃用户数" align="left" prop="data_summary_active_user_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_active_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "今日平台余额" align="left" prop="data_summary_platform_balance" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_platform_balance }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增用户数" align="left" prop="data_summary_new_user_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_new_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增活跃用户" align="left" prop="data_summary_add_active_user_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_add_active_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "登录用户" align="left" prop="data_summary_login_user_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_login_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "活跃比" align="left" prop="data_summary_active_ratio" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_active_ratio }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功笔数" align="left" prop="data_summary_recharge_success_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_success_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功金额" align="left" prop="data_summary_recharge_success_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_success_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功率" align="left" prop="data_summary_recharge_success_rate" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_success_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "首充人数" align="left" prop="data_summary_first_charge_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_first_charge_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "首充金额" align="left" prop="data_summary_first_charge_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_first_charge_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新用户今日首充金额" align="left" prop="data_summary_today_first_deposit_new_user" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_today_first_deposit_new_user }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充人数" align="left" prop="data_summary_refill_user_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_refill_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新用户复充人数" align="left" prop="data_summary_refill_new_user_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_refill_new_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充笔数" align="left" prop="data_summary_refill_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_refill_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充金额" align="left" prop="data_summary_recharge_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充占比" align="left" prop="data_summary_recharge_ratio" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_ratio }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "新用户付费率" align="left" prop="data_summary_new_user_payment_rate" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_new_user_payment_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "申请提现笔数" align="left" prop="data_summary_cash_withdraw_app_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_cash_withdraw_app_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现成功笔数" align="left" prop="data_summary_success_withdraw_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_success_withdraw_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现成功金额" align="left" prop="data_summary_success_withdraw_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_success_withdraw_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充提差" align="left" prop="data_summary_charge_withdraw_difference" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_charge_withdraw_difference }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充提差占今日总充值金额百分比" align="left" prop="data_summary_deposit_withdraw_difference_rate" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_deposit_withdraw_difference_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动确认笔数" align="left" prop="data_summary_manual_confirm_transaction_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_manual_confirm_transaction_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动确认金额" align="left" prop="data_summary_manual_confirm_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_manual_confirm_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "投注数量" align="left" prop="data_summary_bet_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_bet_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "投注金额" align="left" prop="data_summary_bet_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_bet_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "派奖金额" align="left" prop="data_summary_bonus_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_bonus_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "游戏收益" align="left" prop="data_summary_game_revenue" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_game_revenue }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "平台今日RTP" align="left" prop="data_summary_today_platform_rtp" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_today_platform_rtp }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "内部游戏RTP" align="left" prop="data_summary_internal_game_rtp" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_internal_game_rtp }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "外部游戏RTP" align="left" prop="data_summary_external_game_rtp" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_external_game_rtp }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "代理返佣金额" align="left" prop="data_summary_agent_rebate_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_agent_rebate_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "返佣暗扣金额" align="left" prop="data_summary_hidden_commission_rebate_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_hidden_commission_rebate_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现成功不打款金额" align="left" prop="data_summary_none_withdraw_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_none_withdraw_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "次日复充金额" align="left" prop="data_summary_nextday_recharge_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_nextday_recharge_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "3日复充金额" align="left" prop="data_summary_3day_recharge_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_3day_recharge_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "活跃留存率" align="center" >
              <el-table-column label = "次日" align="left" prop="data_summary_active_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_1 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="data_summary_active_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_3 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="data_summary_active_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_7 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="data_summary_active_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_15 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="data_summary_active_retention_rate_30" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_30 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_30 }}</p>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label = "代理留存率" align="center"  >
              <el-table-column label = "次日" align="left" prop="data_summary_agent_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_1 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="data_summary_agent_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_3 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="data_summary_agent_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_7 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="data_summary_agent_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_15 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="data_summary_agent_retention_rate_30" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_30 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_30 }}</p>
                </template>
              </el-table-column>  
            </el-table-column>
            <el-table-column label = "首充留存率" align="center"  >
              <el-table-column label = "次日" align="left" prop="data_summary_first_charge_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_1 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="data_summary_first_charge_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_3 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="data_summary_first_charge_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_7 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="data_summary_first_charge_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_15 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="data_summary_first_charge_retention_rate_30" width="90">
                <template #default="scope">
                  <p >{{ scope.row.data_summary_first_charge_retention_rate_30 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_30 }}</p>
                </template>
              </el-table-column>  
            </el-table-column>                     
          </el-table>
          <div style="float: right;">
            <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handlePagination" />
          </div>
        </el-card>
        <template v-if="activeButton == 1">
          
            <el-row>
              <el-col :span="16">
                <el-card style="margin-top: 20px; width=100%; margin-right:20px;" >
                  <div class="deposit-withdraw-data-header">
                    <p class="p-title">充提数据</p>
                  </div>
                  <div class="deposit-withdraw-data-body" >
                    <div class="deposit-withdraw-data-item" >
                      <p class="p-title">充值金额</p>
                      <p class="p-text">{{depositWithdrawlTotalData.recharge_amount}}</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">成功提现金额</p>
                      <p class="p-text">{{depositWithdrawlTotalData.success_withdrawal_amount}}</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">代理提现金额</p>
                      <p class="p-text">{{depositWithdrawlTotalData.agent_withdrawal_amount}}</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">充提差</p>
                      <p class="p-text">{{depositWithdrawlTotalData.deposit_and_withdrawal_difference}}</p>
                    </div>
                  </div>
                  
                  <Chart
                    :size="{ width: 1000, height: 500 }"
                    :data="chart1data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Line :dataKeys="['date', 'chart_recharge_amount']" :lineStyle="{ stroke: '#ff99ff' }"/>
                      <Line :dataKeys="['date', 'chart_success_withdraw_amount']" :lineStyle="{ stroke: '#66ff00' }"/>
                      <Line :dataKeys="['date', 'chart_agent_withdraw_amount']" :lineStyle="{ stroke: '#ff0000' }"/>
                      <Line :dataKeys="['date', 'chart_charge_withdraw_difference']" :lineStyle="{ stroke: '#66ccff' }"/>
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          date: { label: '时间', color: '#000000'},
                          chart_recharge_amount: { label: '充值金额', color: '#ff99ff' },
                          chart_success_withdraw_amount: { label: '成功提现金额', color: '#66ff00'},
                          chart_agent_withdraw_amount: { label: '代理提现金额', color: '#ff0000' },
                          chart_charge_withdraw_difference: { label: '充提差', color: '#66ccff' },
                          chart_recharge_success_rate: {label: '充值成功率', color: '#000000'},
                          chart_new_user_payment_rate: {label: '新用户付费率', color: '#000000'}
                        }"
                      >
                      </Tooltip>
                    </template>


                  </Chart>
                </el-card>
                
                
              </el-col>
                
              <el-col :span="8">
                <el-card style="margin-top: 20px; width=100%" >
                  <div class="deposit-withdraw-data-header">
                    <p class="p-title">首充复充人数</p>
                  </div>
                  <div class="deposit-withdraw-data-body" style="float: right;">
                    <div class="deposit-withdraw-data-item" style="display:flex" >
                      <p class="p-title">首充</p>
                      <div class="p-block1" ></div>
                    </div>
                    <div class="deposit-withdraw-data-item" style="display:flex">
                      <p class="p-title">复充</p>
                      <div class="p-block2" ></div>
                    </div>
                  </div>
                  
                  <Chart
                    :size="{ width: 500, height: 190 }"
                    :data="chart2data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Bar :dataKeys="['date', 'chart_first_charge_count']" :barStyle="{ fill: '#66ccff' }" :gap = "20" />
                      <Bar :dataKeys="['date', 'chart_recharge_count']" :barStyle="{ fill: '#ffcc00'}" :gap = "20" />
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          chart_first_charge_count: { hide: true },
                          chart_recharge_count: { label: '', color: 'black' },
                          date: { hide: true }
                        }"
                      />
                    </template>

                  </Chart>
                </el-card>

                <el-card style="margin-top: 20px; width=100%" >
                  <div class="deposit-withdraw-data-header">
                    <p class="p-title">首充复充金额</p>
                  </div>

                  <div class="deposit-withdraw-data-body" style="float: right;">
                    <div class="deposit-withdraw-data-item" style="display:flex" >
                      <p class="p-title">首充</p>
                      <div class="p-block1" ></div>
                    </div>
                    <div class="deposit-withdraw-data-item" style="display:flex">
                      <p class="p-title">复充</p>
                      <div class="p-block2" ></div>
                    </div>
                  </div>

                  <Chart
                    :size="{ width: 500, height: 190 }"
                    :data="chart3data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Bar :dataKeys="['date', 'chart_first_charge_amount']" :barStyle="{ fill: '#66ccff' }" :gap = "20" />
                      <Bar :dataKeys="['date', 'chart_recharge_amount']" :barStyle="{ fill: '#ffcc00'}" :gap = "20" />
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          chart_first_charge_amount: { hide: true },
                          chart_recharge_amount: { label: '', color: 'black' },
                          date: { hide: true }
                        }"
                      />
                    </template>

                  </Chart>
                </el-card>
                
              </el-col>
            </el-row>

            <el-card style="margin-top: 20px;">
              <el-row>
                <el-col :span="20">
                  <div class="deposit-withdraw-data-header">
                    <p class="p-title">留存数据</p>
                  </div>
                  <Chart
                    v-if="activeRetentionButton==0"
                    :size="{ width: 1200, height: 500 }"
                    :data="chart4data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Line :dataKeys="['date', 'chart_new_register_count']" :lineStyle="{ stroke: '#ff0000' }"/>
                      <Line :dataKeys="['date', 'chart_new_active_count']" :lineStyle="{ stroke: '#ff9900' }"/>
                      <Line :dataKeys="['date', 'chart_active_2_stay_count']" :lineStyle="{ stroke: '#ffff00' }"/>
                      <Line :dataKeys="['date', 'chart_active_3_stay_count']" :lineStyle="{ stroke: '#008000' }"/>
                      <Line :dataKeys="['date', 'chart_active_7_stay_count']" :lineStyle="{ stroke: '#0000ff' }"/>
                      <Line :dataKeys="['date', 'chart_active_15_stay_count']" :lineStyle="{ stroke: '#6699ff' }"/>
                      <Line :dataKeys="['date', 'chart_active_30_stay_count']" :lineStyle="{ stroke: '#800080' }"/>
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          date: { label: '时间', color: '#000000'},
                          chart_new_register_count: { label: '新增注册', color: '#ff99ff' },
                          chart_new_active_count: { label: '新增活跃', color: '#66ff00'},
                          chart_active_2_stay_count: { label: '活跃2留人数', color: '#ffff00' },
                          chart_active_3_stay_count: { label: '活跃3留人数', color: '#008000' },
                          chart_active_7_stay_count: {label: '活跃7留人数', color: '#0000ff'},
                          chart_active_15_stay_count: {label: '活跃15留人数', color: '#6699ff'},
                          chart_active_30_stay_count: {label: '活跃30留人数', color: '#800080'},
                          chart_active_2_retention_rate: { label: '活跃2留率', color: '#ffff00' },
                          chart_active_3_retention_rate: { label: '活跃3留率', color: '#008000' },
                          chart_active_7_retention_rate: {label: '活跃7留率', color: '#0000ff'},
                          chart_active_15_retention_rate: {label: '活跃15留率', color: '#6699ff'},
                          chart_active_30_retention_rate: {label: '活跃30留率', color: '#800080'},
                        }"
                      >
                        <!-- <div>sssssssssss</div> -->
                      </Tooltip>
                    </template>


                  </Chart>
                  <Chart
                    v-if="activeRetentionButton==1"
                    :size="{ width: 1200, height: 500 }"
                    :data="chart5data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Line :dataKeys="['date', 'chart_new_register_count']" :lineStyle="{ stroke: '#ff0000' }"/>
                      <Line :dataKeys="['date', 'chart_new_agent_count']" :lineStyle="{ stroke: '#ff9900' }"/>
                      <Line :dataKeys="['date', 'chart_agent_2_stay_count']" :lineStyle="{ stroke: '#ffff00' }"/>
                      <Line :dataKeys="['date', 'chart_agent_3_stay_count']" :lineStyle="{ stroke: '#008000' }"/>
                      <Line :dataKeys="['date', 'chart_agent_7_stay_count']" :lineStyle="{ stroke: '#0000ff' }"/>
                      <Line :dataKeys="['date', 'chart_agent_15_stay_count']" :lineStyle="{ stroke: '#6699ff' }"/>
                      <Line :dataKeys="['date', 'chart_agent_30_stay_count']" :lineStyle="{ stroke: '#800080' }"/>
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          date: { label: '时间', color: '#000000'},
                          chart_new_register_count: { label: '新增注册', color: '#ff99ff' },
                          chart_new_agent_count: { label: '新增活跃', color: '#66ff00'},
                          chart_agent_2_stay_count: { label: '活跃2留人数', color: '#ffff00' },
                          chart_agent_3_stay_count: { label: '活跃3留人数', color: '#008000' },
                          chart_agent_7_stay_count: {label: '活跃7留人数', color: '#0000ff'},
                          chart_agent_15_stay_count: {label: '活跃15留人数', color: '#6699ff'},
                          chart_agent_30_stay_count: {label: '活跃30留人数', color: '#800080'},
                          chart_agent_2_retention_rate: { label: '活跃2留率', color: '#ffff00' },
                          chart_agent_3_retention_rate: { label: '活跃3留率', color: '#008000' },
                          chart_agent_7_retention_rate: {label: '活跃7留率', color: '#0000ff'},
                          chart_agent_15_retention_rate: {label: '活跃15留率', color: '#6699ff'},
                          chart_agent_30_retention_rate: {label: '活跃30留率', color: '#800080'},
                        }"
                      >
                        <!-- <div>sssssssssss</div> -->
                      </Tooltip>
                    </template>


                  </Chart>
                  <Chart
                    v-if="activeRetentionButton==2"
                    :size="{ width: 1200, height: 500 }"
                    :data="chart6data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Line :dataKeys="['date', 'chart_new_register_count']" :lineStyle="{ stroke: '#ff0000' }"/>
                      <Line :dataKeys="['date', 'chart_first_deposite_count']" :lineStyle="{ stroke: '#ff9900' }"/>
                      <Line :dataKeys="['date', 'chart_first_deposite_2_stay_count']" :lineStyle="{ stroke: '#ffff00' }"/>
                      <Line :dataKeys="['date', 'chart_first_deposite_3_stay_count']" :lineStyle="{ stroke: '#008000' }"/>
                      <Line :dataKeys="['date', 'chart_first_deposite_7_stay_count']" :lineStyle="{ stroke: '#0000ff' }"/>
                      <Line :dataKeys="['date', 'chart_first_deposite_15_stay_count']" :lineStyle="{ stroke: '#6699ff' }"/>
                      <Line :dataKeys="['date', 'chart_first_deposite_30_stay_count']" :lineStyle="{ stroke: '#800080' }"/>
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          date: { label: '时间', color: '#000000'},
                          chart_new_register_count: { label: '新增注册', color: '#ff99ff' },
                          chart_first_deposite_count: { label: '新增活跃', color: '#66ff00'},
                          chart_first_deposite_2_stay_count: { label: '活跃2留人数', color: '#ffff00' },
                          chart_first_deposite_3_stay_count: { label: '活跃3留人数', color: '#008000' },
                          chart_first_deposite_7_stay_count: {label: '活跃7留人数', color: '#0000ff'},
                          chart_first_deposite_15_stay_count: {label: '活跃15留人数', color: '#6699ff'},
                          chart_first_deposite_30_stay_count: {label: '活跃30留人数', color: '#800080'},
                          chart_first_deposite_2_retention_rate: { label: '活跃2留率', color: '#ffff00' },
                          chart_first_deposite_3_retention_rate: { label: '活跃3留率', color: '#008000' },
                          chart_first_deposite_7_retention_rate: {label: '活跃7留率', color: '#0000ff'},
                          chart_first_deposite_15_retention_rate: {label: '活跃15留率', color: '#6699ff'},
                          chart_first_deposite_30_retention_rate: {label: '活跃30留率', color: '#800080'},
                        }"
                      >
                        <!-- <div>sssssssssss</div> -->
                      </Tooltip>
                    </template>


                  </Chart>
                </el-col>
                <el-col :span="4">
                  <el-row>
                    <el-button :type="activeRetentionButton == 0 ? 'warning' : ''"
                      @click="handleChartRetentionType(0)">活跃</el-button>
                    <el-button :type="activeRetentionButton == 1 ? 'warning' : ''"
                      @click="handleChartRetentionType(1)">代理</el-button>
                    <el-button :type="activeRetentionButton == 2 ? 'warning' : ''"
                      @click="handleChartRetentionType(2)">首充</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>

            <el-card style="margin-top: 20px;">
              <el-row>
                <el-col :span="20">
                  <div class="deposit-withdraw-data-header">
                    <p class="p-title">游戏数据</p>
                  </div>
                  <div class="deposit-withdraw-data-body" >
                    <div class="deposit-withdraw-data-item" style="margin-left:30px;" >
                      <p class="p-title">投注金额</p>
                      <p class="p-text">{{gameTotalData.bet_amount}}</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">派奖金额</p>
                      <p class="p-text">{{gameTotalData.winning_amount}}</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">平台盈亏</p>
                      <p class="p-text">{{gameTotalData.platform_profit_loss	}}</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">庄家优势</p>
                      <p class="p-text">{{gameTotalData.dealer_advantage}}%</p>
                    </div>
                  </div>

                  <Chart
                    v-if="activeGameAPIButton == 0"
                    :size="{ width: 1200, height: 500 }"
                    :data="chart7data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Line :dataKeys="['date', 'chart_self_bet_amount']" :lineStyle="{ stroke: '#ff0000' }"/>
                      <Line :dataKeys="['date', 'chart_self_bonus_amount']" :lineStyle="{ stroke: '#ff9900' }"/>
                      <Line :dataKeys="['date', 'chart_self_profit_loss']" :lineStyle="{ stroke: '#ffff00' }"/>
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          date: { label: '时间', color: '#000000'},
                          chart_self_bet_amount: { label: '投注金额', color: '#000000' },
                          chart_self_bonus_amount: { label: '派奖金额', color: '#000000' },
                          chart_self_profit_loss: { label: '平添盈亏', color: '#000000' },
                          chart_self_bettor_count: {label: '投注人数', color: '#000000'},
                          chart_self_game_count: {label: '投注局数', color: '#000000'},
                          chart_self_game_revenue_rate: {label: '庄家优势', color: '#000000'},
                        }"
                      >
                        <!-- <div>sssssssssss</div> -->
                      </Tooltip>
                    </template>


                  </Chart>
                  <Chart
                    v-if="activeGameAPIButton==1"
                    :size="{ width: 1200, height: 500 }"
                    :data="chart8data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Line :dataKeys="['date', 'chart_third_bet_amount']" :lineStyle="{ stroke: '#ff0000' }"/>
                      <Line :dataKeys="['date', 'chart_third_bonus_amount']" :lineStyle="{ stroke: '#ff9900' }"/>
                      <Line :dataKeys="['date', 'chart_third_profit_loss']" :lineStyle="{ stroke: '#ffff00' }"/>
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          date: { label: '时间', color: '#000000'},
                          chart_third_bet_amount: { label: '投注金额', color: '#000000' },
                          chart_third_bonus_amount: { label: '派奖金额', color: '#000000' },
                          chart_third_profit_loss: { label: '平添盈亏', color: '#000000' },
                          chart_third_bettor_count: {label: '投注人数', color: '#000000'},
                          chart_third_game_count: {label: '投注局数', color: '#000000'},
                          chart_third_game_revenue_rate: {label: '庄家优势', color: '#000000'},
                        }"
                      >
                        <!-- <div>sssssssssss</div> -->
                      </Tooltip>
                    </template>


                  </Chart>
                </el-col>
                <el-col :span="4">
                  <el-row>
                    <el-button :type="activeGameAPIButton == 0 ? 'warning' : ''"
                      @click="handleGameAPIType(0)">自研</el-button>
                    <el-button :type="activeGameAPIButton == 1 ? 'warning' : ''"
                      @click="handleGameAPIType(1)">三方</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
            
        </template>
        
      </el-col>
    </el-row>    
  </div>
</template>

<style lang="scss">

.user-detail-header {
  padding-top: 20px;
  display: flex;
  align-items: center;
}
.deposit-withdraw-data-header {
  margin-bottom: 10px;
  .p-title {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 10px;
    font-size:20px;
    font-weight: 600;
  }
}
.deposit-withdraw-data-body {
  display: flex;

  .deposit-withdraw-data-item {
    width: 120px;

    .p-title {
      margin-top: 0px;
      margin-bottom: 20px;
      margin-right: 10px;
      font-size:14px;
      font-weight: 600;
    }

    .p-text {
      margin-top: 0px;
      margin-bottom: 0px;
      font-size:20px;
    }

    .p-block1 {
      width:30px;
      height: 20px;
      background-color: #66ccff;
    }

    .p-block2 {
      width:30px;
      height: 20px;
      background-color: #ffcc00;
    }
    
  }
  
  
}
</style>
