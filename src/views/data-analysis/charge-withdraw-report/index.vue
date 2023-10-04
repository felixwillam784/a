<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

import {getChargeWidrawReport} from '@/api/DataAnalysis'
import useStore from '@/store';
//import { watch } from "fs";

const { user } = useStore();

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

interface GetChargeWithdrawReport {
  id: string;
  charge_withdraw_date_time: string;
  charge_withdraw_platform_difference: number;
  charge_withdraw_recharge_today_rate: string;
  charge_withdraw_recharge_count: number;
  charge_withdraw_recharge_number: number;
  charge_withdraw_success_recharge_count: number;
  charge_withdraw_success_recharge_rate: string;
  charge_withdraw_first_charge_number: number;
  charge_withdraw_new_user_recharge_count: number;
  charge_withdraw_first_charge_amount: string;
  charge_withdraw_new_user_recharge_amount: string;  
  charge_withdraw_refill_user_count: number;
  charge_withdraw_refill_count: number;
  charge_withdraw_recharge_amount: string;
  charge_withdraw_recharge_amount_proportion: string;
  charge_withdraw_registrant_count: number;
  charge_withdraw_new_user_payment_rate: string;
  charge_withdraw_cash_withdrawal_app_count: number;
  charge_withdraw_success_withdraw_count: number;
  charge_withdraw_success_withdraw_amount: string;
  charge_withdraw_agent_withdraw_amount: string;
  charge_withdraw_gold_count: number;
  charge_withdraw_manual_addition_amount: string;
  charge_withdraw_manual_recharge_count: number;
  charge_withdraw_manual_top_amount: string;
  charge_withdraw_none_withdraw_amount: string;

}

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(true);

const total = ref<number>(5);

const chargeWithdrawReportList = ref<Array<GetChargeWithdrawReport>>([
  // {
  //   id: "8e8fd8fsdfd8fe8f8df8ef",
  //   charge_withdraw_date_time: "2020-06-30",
  //   charge_withdraw_platform_difference: 99999.99,
  //   charge_withdraw_recharge_today_rate: 99.99,
  //   charge_withdraw_recharge_count: 99999,
  //   charge_withdraw_recharge_number: 99999,
  //   charge_withdraw_success_recharge_count: 99999,
  //   charge_withdraw_success_recharge_rate: 99.99,
  //   charge_withdraw_first_charge_number: 999,
  //   charge_withdraw_new_user_recharge_count: 999,
  //   charge_withdraw_first_charge_amount: 99999.99,
  //   charge_withdraw_new_user_recharge_amount: 99999.99,  
  //   charge_withdraw_refill_user_count: 999,
  //   charge_withdraw_refill_count: 999,
  //   charge_withdraw_recharge_amount: 9999.99,
  //   charge_withdraw_recharge_amount_proportion: 99.99,
  //   charge_withdraw_registrant_count: 99999,
  //   charge_withdraw_new_user_payment_rate: 99.99,
  //   charge_withdraw_cash_withdrawal_app_count: 99999,
  //   charge_withdraw_success_withdraw_count: 99999,
  //   charge_withdraw_success_withdraw_amount: 9999.99,
  //   charge_withdraw_agent_withdraw_amount: 9999.99,
  //   charge_withdraw_gold_count: 999,
  //   charge_withdraw_manual_addition_amount: 9999.99,
  //   charge_withdraw_manual_recharge_count: 999,
  //   charge_withdraw_manual_top_amount: 9999.99,
  //   charge_withdraw_none_withdraw_amount: 9999.99,
  // },
  // {
  //   id: "8e8fd8fsdfd8fe8f8df8eg",
  //   charge_withdraw_date_time: "2020-06-29",
  //   charge_withdraw_platform_difference: 99999.99,
  //   charge_withdraw_recharge_today_rate: 99.99,
  //   charge_withdraw_recharge_count: 99999,
  //   charge_withdraw_recharge_number: 99999,
  //   charge_withdraw_success_recharge_count: 99999,
  //   charge_withdraw_success_recharge_rate: 99.99,
  //   charge_withdraw_first_charge_number: 999,
  //   charge_withdraw_new_user_recharge_count: 999,
  //   charge_withdraw_first_charge_amount: 99999.99,
  //   charge_withdraw_new_user_recharge_amount: 99999.99,  
  //   charge_withdraw_refill_user_count: 999,
  //   charge_withdraw_refill_count: 999,
  //   charge_withdraw_recharge_amount: 9999.99,
  //   charge_withdraw_recharge_amount_proportion: 99.99,
  //   charge_withdraw_registrant_count: 99999,
  //   charge_withdraw_new_user_payment_rate: 99.99,
  //   charge_withdraw_cash_withdrawal_app_count: 99999,
  //   charge_withdraw_success_withdraw_count: 99999,
  //   charge_withdraw_success_withdraw_amount: 9999.99,
  //   charge_withdraw_agent_withdraw_amount: 9999.99,
  //   charge_withdraw_gold_count: 999,
  //   charge_withdraw_manual_addition_amount: 9999.99,
  //   charge_withdraw_manual_recharge_count: 999,
  //   charge_withdraw_manual_top_amount: 9999.99,
  //   charge_withdraw_none_withdraw_amount: 9999.99,
  // },
  // {
  //   id: "8e8fd8fsdfd8fe8f8df8eh",
  //   charge_withdraw_date_time: "2020-06-28",
  //   charge_withdraw_platform_difference: 99999.99,
  //   charge_withdraw_recharge_today_rate: 99.99,
  //   charge_withdraw_recharge_count: 99999,
  //   charge_withdraw_recharge_number: 99999,
  //   charge_withdraw_success_recharge_count: 99999,
  //   charge_withdraw_success_recharge_rate: 99.99,
  //   charge_withdraw_first_charge_number: 999,
  //   charge_withdraw_new_user_recharge_count: 999,
  //   charge_withdraw_first_charge_amount: 99999.99,
  //   charge_withdraw_new_user_recharge_amount: 99999.99,  
  //   charge_withdraw_refill_user_count: 999,
  //   charge_withdraw_refill_count: 999,
  //   charge_withdraw_recharge_amount: 9999.99,
  //   charge_withdraw_recharge_amount_proportion: 99.99,
  //   charge_withdraw_registrant_count: 99999,
  //   charge_withdraw_new_user_payment_rate: 99.99,
  //   charge_withdraw_cash_withdrawal_app_count: 99999,
  //   charge_withdraw_success_withdraw_count: 99999,
  //   charge_withdraw_success_withdraw_amount: 9999.99,
  //   charge_withdraw_agent_withdraw_amount: 9999.99,
  //   charge_withdraw_gold_count: 999,
  //   charge_withdraw_manual_addition_amount: 9999.99,
  //   charge_withdraw_manual_recharge_count: 999,
  //   charge_withdraw_manual_top_amount: 9999.99,
  //   charge_withdraw_none_withdraw_amount: 9999.99,
  // },
  // {
  //   id: "8e8fd8fsdfd8fe8f8df8ei",
  //   charge_withdraw_date_time: "2020-06-27",
  //   charge_withdraw_platform_difference: 99999.99,
  //   charge_withdraw_recharge_today_rate: 99.99,
  //   charge_withdraw_recharge_count: 99999,
  //   charge_withdraw_recharge_number: 99999,
  //   charge_withdraw_success_recharge_count: 99999,
  //   charge_withdraw_success_recharge_rate: 99.99,
  //   charge_withdraw_first_charge_number: 999,
  //   charge_withdraw_new_user_recharge_count: 999,
  //   charge_withdraw_first_charge_amount: 99999.99,
  //   charge_withdraw_new_user_recharge_amount: 99999.99,  
  //   charge_withdraw_refill_user_count: 999,
  //   charge_withdraw_refill_count: 999,
  //   charge_withdraw_recharge_amount: 9999.99,
  //   charge_withdraw_recharge_amount_proportion: 99.99,
  //   charge_withdraw_registrant_count: 99999,
  //   charge_withdraw_new_user_payment_rate: 99.99,
  //   charge_withdraw_cash_withdrawal_app_count: 99999,
  //   charge_withdraw_success_withdraw_count: 99999,
  //   charge_withdraw_success_withdraw_amount: 9999.99,
  //   charge_withdraw_agent_withdraw_amount: 9999.99,
  //   charge_withdraw_gold_count: 999,
  //   charge_withdraw_manual_addition_amount: 9999.99,
  //   charge_withdraw_manual_recharge_count: 999,
  //   charge_withdraw_manual_top_amount: 9999.99,
  //   charge_withdraw_none_withdraw_amount: 9999.99,
  // },
  // {
  //   id: "8e8fd8fsdfd8fe8f8df8ej",
  //   charge_withdraw_date_time: "2020-06-26",
  //   charge_withdraw_platform_difference: 99999.99,
  //   charge_withdraw_recharge_today_rate: 99.99,
  //   charge_withdraw_recharge_count: 99999,
  //   charge_withdraw_recharge_number: 99999,
  //   charge_withdraw_success_recharge_count: 99999,
  //   charge_withdraw_success_recharge_rate: 99.99,
  //   charge_withdraw_first_charge_number: 999,
  //   charge_withdraw_new_user_recharge_count: 999,
  //   charge_withdraw_first_charge_amount: 99999.99,
  //   charge_withdraw_new_user_recharge_amount: 99999.99,  
  //   charge_withdraw_refill_user_count: 999,
  //   charge_withdraw_refill_count: 999,
  //   charge_withdraw_recharge_amount: 9999.99,
  //   charge_withdraw_recharge_amount_proportion: 99.99,
  //   charge_withdraw_registrant_count: 99999,
  //   charge_withdraw_new_user_payment_rate: 99.99,
  //   charge_withdraw_cash_withdrawal_app_count: 99999,
  //   charge_withdraw_success_withdraw_count: 99999,
  //   charge_withdraw_success_withdraw_amount: 9999.99,
  //   charge_withdraw_agent_withdraw_amount: 9999.99,
  //   charge_withdraw_gold_count: 999,
  //   charge_withdraw_manual_addition_amount: 9999.99,
  //   charge_withdraw_manual_recharge_count: 999,
  //   charge_withdraw_manual_top_amount: 9999.99,
  //   charge_withdraw_none_withdraw_amount: 9999.99,
  // },
])

const handleDateRange = (date: string) => {
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

const handleQuery = () => {
}

const handleReset = () => {
  handleDateRange('today');
}

const handleSearch = () => {
  loading.value = true;
  getData().then(()=>{
    loading.value = false;
  });
}

const getData = async () =>{
  
  let depositWithdrawDataRes = await getChargeWidrawReport(user.token, dateRange.value, formData.value);
  chargeWithdrawReportList.value  = depositWithdrawDataRes.data.data;
  total.value = depositWithdrawDataRes.data.data.length;
}
onMounted(()=>{
  getData().then(()=>{
    loading.value = false;
  });
})
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
        <el-card style="margin-top: 20px;" >
          <el-table v-loading="loading" :data="chargeWithdrawReportList" style="width: 100%;">
            <el-table-column label = "时间" align="left" prop="charge_withdraw_date_time" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_date_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "平台充提差" align="left" prop="charge_withdraw_platform_difference" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_platform_difference.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="充提差占今日充值今天百分比" align="left" prop="charge_withdraw_recharge_today_rate" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_recharge_today_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值笔数" align="left" prop="charge_withdraw_recharge_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_recharge_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值人数" align="left" prop="charge_withdraw_recharge_number" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_recharge_number }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功笔数" align="left" prop="charge_withdraw_success_recharge_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_success_recharge_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "充值成功率" align="left" prop="charge_withdraw_success_recharge_rate" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_success_recharge_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "首充人数" align="left" prop="charge_withdraw_first_charge_number" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_first_charge_number }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充新用户人数" align="left" prop="charge_withdraw_new_user_recharge_count" width="160">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_new_user_recharge_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "首充金额" align="left" prop="charge_withdraw_first_charge_amount" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_first_charge_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新用户首日充值总金额" align="left" prop="charge_withdraw_new_user_recharge_amount" width="170">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_new_user_recharge_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充人数" align="left" prop="charge_withdraw_refill_user_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_refill_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充笔数" align="left" prop="charge_withdraw_refill_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_refill_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充金额" align="left" prop="charge_withdraw_recharge_amount" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_recharge_amount}}</p>
              </template>
            </el-table-column>
            <el-table-column label = "复充金额占比" align="left" prop="charge_withdraw_recharge_amount_proportion" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_recharge_amount_proportion }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "注册人数" align="left" prop="charge_withdraw_registrant_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_registrant_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新用户付费率" align="left" prop="charge_withdraw_new_user_payment_rate" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_new_user_payment_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "申请提现笔数" align="left" prop="charge_withdraw_cash_withdrawal_app_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_cash_withdrawal_app_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现成功笔数" align="left" prop="charge_withdraw_success_withdraw_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_success_withdraw_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现成功金额" align="left" prop="charge_withdraw_success_withdraw_amount" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_success_withdraw_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "代理提现金额" align="left" prop="charge_withdraw_agent_withdraw_amount" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_agent_withdraw_amount}}</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动加金笔数" align="left" prop="charge_withdraw_gold_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_gold_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动加金金额" align="left" prop="charge_withdraw_manual_addition_amount" width="120">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_manual_addition_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动确认充值笔数" align="left" prop="charge_withdraw_manual_recharge_count" width="160">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_manual_recharge_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "手动确认充值金额" align="left" prop="charge_withdraw_manual_top_amount" width="160">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_manual_top_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现成功不打款金额" align="left" prop="charge_withdraw_none_withdraw_amount" width="160">
              <template #default="scope">
                <p>{{ scope.row.charge_withdraw_none_withdraw_amount}}</p>
              </template>
            </el-table-column>
            
          </el-table>
          <div style="float: right;">
            <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handleQuery" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
</style>