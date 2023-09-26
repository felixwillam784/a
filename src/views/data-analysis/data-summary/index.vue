<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

import { Chart, Grid, Line, Tooltip, Bar, Marker } from 'vue3-charts'

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

const activeRetentionButton = ref<number>(0);

const activeButton = ref<number>(0);

const activeGameAPIButton = ref<number>(0);

const chart1Array = [
  { date: '6-20', chart_recharge_amount: 3700, chart_success_withdraw_amount: 2800, chart_agent_withdraw_amount: 1800, chart_charge_withdraw_difference: 800,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99 },
  { date: '6-21',  chart_recharge_amount: 4900, chart_success_withdraw_amount: 4100, chart_agent_withdraw_amount: 2900,chart_charge_withdraw_difference: 2000,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99},
  { date: '6-22',  chart_recharge_amount: 4500, chart_success_withdraw_amount: 3700, chart_agent_withdraw_amount: 2400,chart_charge_withdraw_difference: 1700,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99 },
  { date: '6-23',  chart_recharge_amount: 4100, chart_success_withdraw_amount: 3300, chart_agent_withdraw_amount: 2000,chart_charge_withdraw_difference: 1200,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99 },
  { date: '6-24', chart_recharge_amount: 3700, chart_success_withdraw_amount: 3000, chart_agent_withdraw_amount: 1700, chart_charge_withdraw_difference: 900,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99 },
  { date: '6-25', chart_recharge_amount: 3600, chart_success_withdraw_amount: 2900, chart_agent_withdraw_amount: 1600, chart_charge_withdraw_difference: 800,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99 },
  { date: '6-26', chart_recharge_amount: 3500, chart_success_withdraw_amount: 2800, chart_agent_withdraw_amount: 1500, chart_charge_withdraw_difference: 700,  chart_recharge_success_rate: 99.99, chart_new_user_payment_rate: 99.99 },
];

const chart2Array = [
  { date: '6-20', chart_first_charge: 2100, chart_recharge: 2978},
  { date: '6-21', chart_first_charge: 2100, chart_recharge: 2978},
  { date: '6-22', chart_first_charge: 2100, chart_recharge: 2978},
  { date: '6-23', chart_first_charge: 2100, chart_recharge: 2978},
  { date: '6-24', chart_first_charge: 2100, chart_recharge: 2978},
  { date: '6-25', chart_first_charge: 2100, chart_recharge: 2978},
  { date: '6-26', chart_first_charge: 2100, chart_recharge: 2978},
];

const chart3Array = [
  { date: '6-20', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999,},
  { date: '6-21', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999,},
  { date: '6-22', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999, },
  { date: '6-23', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999, },
  { date: '6-24', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999,},
  { date: '6-25', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999,},
  { date: '6-26', chart_new_register_count: 3700, chart_new_active_count: 3300, chart_active_2_stay_count: 2900, chart_active_3_stay_count: 2500, chart_active_7_stay_count: 2200, chart_active_15_stay_count: 1900, chart_active_30_stay_count: 1400, chart_active_2_retention_rate: 9999, chart_active_3_retention_rate: 9999, chart_active_7_retention_rate: 9999, chart_active_15_retention_rate: 9999, chart_active_30_retention_rate: 9999,},
];

const chart4Array = [
  { date: '6-20', chart_bet_amount: 3500, chart_bonus_amount: 2500, chart_profit_loss: 1800, chart_bettor_count: 9999, chart_game_count: 9999, chart_game_revenue_rate: 99.99,},
  { date: '6-21', chart_bet_amount: 3500, chart_bonus_amount: 2500, chart_profit_loss: 1800, chart_bettor_count: 9999, chart_game_count: 9999, chart_game_revenue_rate: 99.99,},
  { date: '6-22', chart_bet_amount: 3500, chart_bonus_amount: 2500, chart_profit_loss: 1800, chart_bettor_count: 9999, chart_game_count: 9999, chart_game_revenue_rate: 99.99, },
  { date: '6-23', chart_bet_amount: 3500, chart_bonus_amount: 2500, chart_profit_loss: 1800, chart_bettor_count: 9999, chart_game_count: 9999, chart_game_revenue_rate: 99.99, },
  { date: '6-24', chart_bet_amount: 3500, chart_bonus_amount: 2500, chart_profit_loss: 1800, chart_bettor_count: 9999, chart_game_count: 9999, chart_game_revenue_rate: 99.99,},
  { date: '6-25', chart_bet_amount: 3500, chart_bonus_amount: 2500, chart_profit_loss: 1800, chart_bettor_count: 9999, chart_game_count: 9999, chart_game_revenue_rate: 99.99,},
  { date: '6-26', chart_bet_amount: 3500, chart_bonus_amount: 2500, chart_profit_loss: 1800, chart_bettor_count: 9999, chart_game_count: 9999, chart_game_revenue_rate: 99.99,},
];

const chart1data = ref(chart1Array);
const chart2data = ref(chart2Array);
const chart3data = ref(chart3Array);
const chart4data = ref(chart4Array);
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
  data_summary_platform_balance: number;
  data_summary_new_user_count: number;
  data_summary_add_active_user_count: number;
  data_summary_login_user_count: number;
  data_summary_active_ratio: number;
  data_summary_recharge_success_count: number;
  data_summary_recharge_success_amount: number;
  data_summary_recharge_success_rate: number;
  data_summary_first_charge_count: number;
  data_summary_first_charge_amount: number;
  data_summary_today_first_deposit_new_user: number;
  data_summary_refill_user_count: number;
  data_summary_refill_new_user_count: number;
  data_summary_refill_count: number;
  data_summary_recharge_amount: number;
  data_summary_recharge_ratio: number;
  data_summary_new_user_payment_rate: number;
  data_summary_cash_withdraw_app_count: number;
  data_summary_success_withdraw_count: number;
  data_summary_success_withdraw_amount: number;
  data_summary_charge_withdraw_difference: number;
  data_summary_deposit_withdraw_difference_rate: number;
  data_summary_manual_confirm_transaction_count: number;
  data_summary_manual_confirm_amount: number;
  data_summary_bet_count: number;
  data_summary_bet_amount: number;
  data_summary_bonus_amount: number;
  data_summary_game_revenue: number;
  data_summary_today_platform_rtp: number;
  data_summary_internal_game_rtp: number;
  data_summary_external_game_rtp: number;
  data_summary_agent_rebate_amount: number;
  data_summary_hidden_commission_rebate_amount: number;
  data_summary_none_withdraw_amount: number;
  data_summary_nextday_recharge_amount: number;
  data_summary_3day_recharge_amount: number;
  data_summary_active_retention_rate_1: number;
  data_summary_active_retention_rate_3: number;
  data_summary_active_retention_rate_7: number;
  data_summary_active_retention_rate_15: number;
  data_summary_active_retention_rate_30: number;
  data_summary_agent_retention_rate_1: number;
  data_summary_agent_retention_rate_3: number;
  data_summary_agent_retention_rate_7: number;
  data_summary_agent_retention_rate_15: number;
  data_summary_agent_retention_rate_30: number;
  data_summary_first_charge_retention_rate_1: number;
  data_summary_first_charge_retention_rate_3: number;
  data_summary_first_charge_retention_rate_7: number;
  data_summary_first_charge_retention_rate_15: number;
  data_summary_first_charge_retention_rate_30: number;
  data_summary_active_retention_value_1: number;
  data_summary_active_retention_value_3: number;
  data_summary_active_retention_value_7: number;
  data_summary_active_retention_value_15: number;
  data_summary_active_retention_value_30: number;
  data_summary_agent_retention_value_1: number;
  data_summary_agent_retention_value_3: number;
  data_summary_agent_retention_value_7: number;
  data_summary_agent_retention_value_15: number;
  data_summary_agent_retention_value_30: number;
  data_summary_first_charge_retention_value_1: number;
  data_summary_first_charge_retention_value_3: number;
  data_summary_first_charge_retention_value_7: number;
  data_summary_first_charge_retention_value_15: number;
  data_summary_first_charge_retention_value_30: number;
}

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(1);

const retentionReportList = ref<Array<GetRetentionReport>>([
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    data_summary_date_time: "2020-06-30",
    data_summary_active_user_count: 99999,
    data_summary_platform_balance: 99999,
    data_summary_new_user_count: 99999,
    data_summary_add_active_user_count: 99999,
    data_summary_login_user_count: 99999,
    data_summary_active_ratio: 99.99,
    data_summary_recharge_success_count: 99999,
    data_summary_recharge_success_amount: 99999.99,
    data_summary_recharge_success_rate: 99.99,
    data_summary_first_charge_count: 99999,
    data_summary_first_charge_amount: 99999.99,
    data_summary_today_first_deposit_new_user: 99999.99,
    data_summary_refill_user_count: 99999,
    data_summary_refill_new_user_count: 99999,
    data_summary_refill_count: 99999,
    data_summary_recharge_amount: 99999.99,
    data_summary_recharge_ratio: 99.99,
    data_summary_new_user_payment_rate: 99.99,
    data_summary_cash_withdraw_app_count: 99999,
    data_summary_success_withdraw_count: 99999,
    data_summary_success_withdraw_amount: 99999.99,
    data_summary_charge_withdraw_difference: 99999.99,
    data_summary_deposit_withdraw_difference_rate: 99.99,
    data_summary_manual_confirm_transaction_count: 99999,
    data_summary_manual_confirm_amount: 99999.99,
    data_summary_bet_count: 99999,
    data_summary_bet_amount: 99999.99,
    data_summary_bonus_amount: 99999.99,
    data_summary_game_revenue: 99999.99,
    data_summary_today_platform_rtp: 99.99,
    data_summary_internal_game_rtp: 99.99,
    data_summary_external_game_rtp: 99.99,
    data_summary_agent_rebate_amount: 99999.99,
    data_summary_hidden_commission_rebate_amount: 99999.99,
    data_summary_none_withdraw_amount: 99999.99,
    data_summary_nextday_recharge_amount: 99999.99,
    data_summary_3day_recharge_amount: 99999.99,
    data_summary_active_retention_rate_1: 99.99,
    data_summary_active_retention_rate_3: 99.99,
    data_summary_active_retention_rate_7: 99.99,
    data_summary_active_retention_rate_15: 99.99,
    data_summary_active_retention_rate_30: 99.99,
    data_summary_agent_retention_rate_1: 99.99,
    data_summary_agent_retention_rate_3: 99.99,
    data_summary_agent_retention_rate_7: 99.99,
    data_summary_agent_retention_rate_15: 99.99,
    data_summary_agent_retention_rate_30: 99.99,
    data_summary_first_charge_retention_rate_1: 99.99,
    data_summary_first_charge_retention_rate_3: 99.99,
    data_summary_first_charge_retention_rate_7: 99.99,
    data_summary_first_charge_retention_rate_15: 99.99,
    data_summary_first_charge_retention_rate_30: 99.99,
    data_summary_active_retention_value_1: 9999,
    data_summary_active_retention_value_3: 9999,
    data_summary_active_retention_value_7: 9999,
    data_summary_active_retention_value_15: 9999,
    data_summary_active_retention_value_30: 9999,
    data_summary_agent_retention_value_1: 9999,
    data_summary_agent_retention_value_3: 9999,
    data_summary_agent_retention_value_7: 9999,
    data_summary_agent_retention_value_15: 9999,
    data_summary_agent_retention_value_30: 9999,
    data_summary_first_charge_retention_value_1: 9999,
    data_summary_first_charge_retention_value_3: 9999,
    data_summary_first_charge_retention_value_7: 9999,
    data_summary_first_charge_retention_value_15: 9999,
    data_summary_first_charge_retention_value_30: 9999,
  }
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

const handleQuery = () => {
}

const handleReset = () => {
}

const handleSearch = () => {
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
                <p>{{ scope.row.data_summary_active_ratio.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功笔数" align="left" prop="data_summary_recharge_success_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_success_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功金额" align="left" prop="data_summary_recharge_success_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_success_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功率" align="left" prop="data_summary_recharge_success_rate" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_success_rate.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "首充人数" align="left" prop="data_summary_first_charge_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_first_charge_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "首充金额" align="left" prop="data_summary_first_charge_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_first_charge_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新用户今日首充金额" align="left" prop="data_summary_today_first_deposit_new_user" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_today_first_deposit_new_user.toFixed(2) }}</p>
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
                <p>{{ scope.row.data_summary_recharge_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充占比" align="left" prop="data_summary_recharge_ratio" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_recharge_ratio.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "新用户付费率" align="left" prop="data_summary_new_user_payment_rate" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_new_user_payment_rate.toFixed(2) }}%</p>
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
                <p>{{ scope.row.data_summary_success_withdraw_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充提差" align="left" prop="data_summary_charge_withdraw_difference" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_charge_withdraw_difference.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充提差占今日总充值金额百分比" align="left" prop="data_summary_deposit_withdraw_difference_rate" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_deposit_withdraw_difference_rate.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动确认笔数" align="left" prop="data_summary_manual_confirm_transaction_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_manual_confirm_transaction_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动确认金额" align="left" prop="data_summary_manual_confirm_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_manual_confirm_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "投注数量" align="left" prop="data_summary_bet_count" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_bet_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "投注金额" align="left" prop="data_summary_bet_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_bet_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "派奖金额" align="left" prop="data_summary_bonus_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_bonus_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "游戏收益" align="left" prop="data_summary_game_revenue" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_game_revenue.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "平台今日RTP" align="left" prop="data_summary_today_platform_rtp" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_today_platform_rtp.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "内部游戏RTP" align="left" prop="data_summary_internal_game_rtp" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_internal_game_rtp.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "外部游戏RTP" align="left" prop="data_summary_external_game_rtp" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_external_game_rtp.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "代理返佣金额" align="left" prop="data_summary_agent_rebate_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_agent_rebate_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "返佣暗扣金额" align="left" prop="data_summary_hidden_commission_rebate_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_hidden_commission_rebate_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现成功不打款金额" align="left" prop="data_summary_none_withdraw_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_none_withdraw_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "次日复充金额" align="left" prop="data_summary_nextday_recharge_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_nextday_recharge_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "3日复充金额" align="left" prop="data_summary_3day_recharge_amount" width="130">
              <template #default="scope">
                <p>{{ scope.row.data_summary_3day_recharge_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "活跃留存率" align="center" >
              <el-table-column label = "次日" align="left" prop="data_summary_active_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_1.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="data_summary_active_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_3.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="data_summary_active_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_7.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="data_summary_active_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_15.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="data_summary_active_retention_rate_30" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_active_retention_rate_30.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_active_retention_value_30 }}</p>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label = "代理留存率" align="center"  >
              <el-table-column label = "次日" align="left" prop="data_summary_agent_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_1.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="data_summary_agent_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_3.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="data_summary_agent_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_7.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="data_summary_agent_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_15.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="data_summary_agent_retention_rate_30" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_agent_retention_rate_30.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_agent_retention_value_30 }}</p>
                </template>
              </el-table-column>  
            </el-table-column>
            <el-table-column label = "首充留存率" align="center"  >
              <el-table-column label = "次日" align="left" prop="data_summary_first_charge_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_1.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="data_summary_first_charge_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_3.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="data_summary_first_charge_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_7.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="data_summary_first_charge_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.data_summary_first_charge_retention_rate_15.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="data_summary_first_charge_retention_rate_30" width="90">
                <template #default="scope">
                  <p >{{ scope.row.data_summary_first_charge_retention_rate_30.toFixed(2) }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.data_summary_first_charge_retention_value_30 }}</p>
                </template>
              </el-table-column>  
            </el-table-column>                     
          </el-table>
          <div style="float: right;">
            <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handleQuery" />
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
                      <p class="p-text">999999</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">成功提现金额</p>
                      <p class="p-text">999999</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">代理提现金额</p>
                      <p class="p-text">999999</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">充提差</p>
                      <p class="p-text">999999</p>
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
                      <Bar :dataKeys="['date', 'chart_first_charge']" :barStyle="{ fill: '#66ccff' }" :gap = "20" />
                      <Bar :dataKeys="['date', 'chart_recharge']" :barStyle="{ fill: '#ffcc00'}" :gap = "20" />
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          chart_first_charge: { hide: true },
                          chart_recharge: { label: '', color: 'black' },
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
                    :data="chart2data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Bar :dataKeys="['date', 'chart_first_charge']" :barStyle="{ fill: '#66ccff' }" :gap = "20" />
                      <Bar :dataKeys="['date', 'chart_recharge']" :barStyle="{ fill: '#ffcc00'}" :gap = "20" />
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          chart_first_charge: { hide: true },
                          chart_recharge: { label: '', color: 'black' },
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
                    :size="{ width: 1200, height: 500 }"
                    :data="chart3data"
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
                      <p class="p-text">999999</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">派奖金额</p>
                      <p class="p-text">999999</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">平台盈亏</p>
                      <p class="p-text">999999</p>
                    </div>
                    <div class="deposit-withdraw-data-item">
                      <p class="p-title">庄家优势</p>
                      <p class="p-text">0.5%</p>
                    </div>
                  </div>

                  <Chart
                    :size="{ width: 1200, height: 500 }"
                    :data="chart4data"
                    :margin="chart1margin"
                    :direction="chart1direction"
                    :axis="chart1axis">

                    <template #layers>
                      <Grid strokeDasharray="2,2" />
                      <Line :dataKeys="['date', 'chart_bet_amount']" :lineStyle="{ stroke: '#ff0000' }"/>
                      <Line :dataKeys="['date', 'chart_bonus_amount']" :lineStyle="{ stroke: '#ff9900' }"/>
                      <Line :dataKeys="['date', 'chart_profit_loss']" :lineStyle="{ stroke: '#ffff00' }"/>
                    </template>

                    <template #widgets>
                      <Tooltip
                        borderColor="#48CAE4"
                        :config="{
                          date: { label: '时间', color: '#000000'},
                          chart_bet_amount: { label: '投注金额', color: '#000000' },
                          chart_bonus_amount: { label: '派奖金额', color: '#000000' },
                          chart_profit_loss: { label: '平添盈亏', color: '#000000' },
                          chart_bettor_count: {label: '投注人数', color: '#000000'},
                          chart_game_count: {label: '投注局数', color: '#000000'},
                          chart_game_revenue_rate: {label: '庄家优势', color: '#000000'},
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
