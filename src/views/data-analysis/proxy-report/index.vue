<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { title } from 'process';
import { number } from 'echarts';

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

const activeButton = ref<number>(0);

interface GetAgentReport {
  id: string;
  agent_date_time: string;
  agent_agents_count: number;
  agent_active_agents_count: number;
  agent_new_active_agents_count: number;
  agent_new_agents_count: number;
  agent_new_level_payment_amount: number;
  agent_withdrawal_amount: number;
  agent_new_level_charge_withdraw_dif: number;
  agent_new_charge_bonus: number;
  agent_achievement_rewards: number;
  agent_new_task_rewards: number;
  agent_betting_rebate_amount: number;
  agent_3_day_active_rate: number;
  agent_7_day_active_rate: number;
  agent_15_day_active_rate: number;
  agent_30_day_active_rate: number | string;
}

interface GetNewAgentReport {
  id: string;
  agent_date_time: string;
  agent_new_agents_count: number;
  agent_new_first_register: number;
  agent_new_level_payment: number;
  agent_new_level_payment_amount: number;
  agent_capita_invited_register_count: number;
  agent_capita_invitation_register_amount: number;
}

interface GetAgentRiskReport {
  id: string;
  agent_date_time: string;
  agent_active_count: number;
  agent_risk_control_agents_count: number;
  agent_risk_control_agent_users_count: number;
  agent_risk_control_proportion: number;
  agent_own_risk_control_agents_count: number;
}

const router = useRouter();

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(5);

const agentReportList = ref<Array<GetAgentReport>>([
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    agent_date_time: "2020-06-30",
    agent_agents_count: 999999,
    agent_active_agents_count: 999999,
    agent_new_active_agents_count: 999999,
    agent_new_agents_count: 999999,
    agent_new_level_payment_amount: 999999.9,
    agent_withdrawal_amount: 999999.9,
    agent_new_level_charge_withdraw_dif: 999999.9,
    agent_new_charge_bonus: 999999.9,
    agent_achievement_rewards: 999999.9,
    agent_new_task_rewards: 999999.9,
    agent_betting_rebate_amount: 999999.9,
    agent_3_day_active_rate: 99.99,
    agent_7_day_active_rate: 99.99,
    agent_15_day_active_rate: 99.99,
    agent_30_day_active_rate: 99.99
  },
  {
    id: "8e8fd8fsdfd8fe8f8df8eg",
    agent_date_time: "2020-06-29",
    agent_agents_count: 999999,
    agent_active_agents_count: 999999,
    agent_new_active_agents_count: 999999,
    agent_new_agents_count: 999999,
    agent_new_level_payment_amount: 999999.9,
    agent_withdrawal_amount: 999999.9,
    agent_new_level_charge_withdraw_dif: 999999.9,
    agent_new_charge_bonus: 999999.9,
    agent_achievement_rewards: 999999.9,
    agent_new_task_rewards: 999999.9,
    agent_betting_rebate_amount: 999999.9,
    agent_3_day_active_rate: 99.99,
    agent_7_day_active_rate: 99.99,
    agent_15_day_active_rate: 99.99,
    agent_30_day_active_rate: "-"
  },
])

const newAgentReportList = ref<Array<GetNewAgentReport>>([
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    agent_date_time: "2020-06-30",
    agent_new_agents_count: 999999,
    agent_new_first_register: 999999,
    agent_new_level_payment: 999999,
    agent_new_level_payment_amount: 999999,
    agent_capita_invited_register_count: 1.0,
    agent_capita_invitation_register_amount: 9.99
  },
])

const agentRiskList = ref<Array<GetAgentRiskReport>>([
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    agent_date_time: "2020-06-30",
    agent_active_count: 999999,
    agent_risk_control_agents_count: 999999,
    agent_risk_control_agent_users_count: 999999,
    agent_risk_control_proportion: 99.99,
    agent_own_risk_control_agents_count: 999999,
  },
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    agent_date_time: "2020-06-29",
    agent_active_count: 999999,
    agent_risk_control_agents_count: 999999,
    agent_risk_control_agent_users_count: 999999,
    agent_risk_control_proportion: 99.99,
    agent_own_risk_control_agents_count: 999999,
  },
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    agent_date_time: "2020-06-28",
    agent_active_count: 999999,
    agent_risk_control_agents_count: 999999,
    agent_risk_control_agent_users_count: 999999,
    agent_risk_control_proportion: 99.99,
    agent_own_risk_control_agents_count: 999999,
  },
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    agent_date_time: "2020-06-27",
    agent_active_count: 999999,
    agent_risk_control_agents_count: 999999,
    agent_risk_control_agent_users_count: 999999,
    agent_risk_control_proportion: 99.99,
    agent_own_risk_control_agents_count: 999999,
  },
])

const gameTypes = ref<Array<any>>([
  {
    label: "Dice",
    value: "1"
  },
  {
    label: "Crash",
    value: "2"
  }
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

const handleButtonActive = (index: number) => {
    activeButton.value = index;
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
              @click="handleButtonActive(0)">代理活跃</el-button>
            <el-button :type="activeButton == 1 ? 'warning' : ''"
              @click="handleButtonActive(1)">代理拉新</el-button>
            <el-button :type="activeButton == 2 ? 'warning' : ''"
              @click="handleButtonActive(2)">代理风控</el-button>              
          </div>
        </div>
        <el-card style="margin-top: 20px;" v-if="activeButton == 0">
          <el-table v-loading="loading" :data="agentReportList" style="width: 100%;">
            <el-table-column label = "时间" align="left" prop="agent_date_time" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_date_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "总代理数" align="left" prop="agent_agents_count" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_agents_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "总活跃代理数" align="left" prop="agent_active_agents_count" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_active_agents_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增活跃代理数" align="left" prop="agent_new_active_agents_count" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_active_agents_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增代理数" align="left" prop="agent_new_agents_count" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_agents_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增一级付费金额" align="left" prop="agent_new_level_payment_amount" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_level_payment_amount.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增记忆提现金额" align="left" prop="agent_withdrawal_amount" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_withdrawal_amount.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增一级充提差" align="left" prop="agent_new_level_charge_withdraw_dif" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_level_charge_withdraw_dif.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增充值奖励" align="left" prop="agent_new_charge_bonus" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_charge_bonus.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增成就奖励" align="left" prop="agent_achievement_rewards" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_achievement_rewards.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增任务奖励" align="left" prop="agent_new_task_rewards" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_task_rewards.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增投注返佣金额" align="left" prop="agent_betting_rebate_amount" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_betting_rebate_amount.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "3日活跃率" align="left" prop="agent_3_day_active_rate" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_3_day_active_rate.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "7日活跃率" align="left" prop="agent_7_day_active_rate" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_7_day_active_rate.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "15日活跃率" align="left" prop="agent_15_day_active_rate" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_15_day_active_rate.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "30日活跃率" align="left" prop="agent_30_day_active_rate" width="160">
              <template #default="scope">
                <p v-if="scope.row.agent_30_day_active_rate*1 > 0">{{ scope.row.agent_30_day_active_rate.toFixed(2) }}%</p>
                <p v-else>{{ scope.row.agent_30_day_active_rate }}</p>
              </template>
            </el-table-column>
            
          </el-table>
          <div style="float: right;">
            <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handleQuery" />
          </div>
        </el-card>
        <el-card style="margin-top: 20px;" v-if="activeButton == 1">
          <el-table v-loading="loading" :data="newAgentReportList" style="width: 100%;">
            <el-table-column label = "时间" align="left" prop="agent_date_time" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_date_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增代理数" align="left" prop="agent_new_agents_count" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_new_agents_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增一级注册人数" align="left" prop="agent_new_first_register" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_new_first_register }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增一级付费人数" align="left" prop="agent_new_level_payment" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_new_level_payment }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增一级付费金额" align="left" prop="agent_new_level_payment_amount" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_new_level_payment_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "人均邀请注册数" align="left" prop="agent_capita_invited_register_count" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_capita_invited_register_count.toFixed(1) }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "人均邀请注册金额" align="left" prop="agent_capita_invitation_register_amount" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_capita_invitation_register_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>            
          </el-table>
          <div style="float: right;">
            <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handleQuery" />
          </div>
        </el-card>
        <el-card style="margin-top: 20px;" v-if="activeButton == 2">
          <el-table v-loading="loading" :data="agentRiskList" style="width: 100%;">
            <el-table-column label = "时间" align="left" prop="agent_date_time" width="270">
              <template #default="scope">
                <p>{{ scope.row.agent_date_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "活跃代理数" align="left" prop="agent_active_count" width="270">
              <template #default="scope">
                <p>{{ scope.row.agent_active_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "风控代理数" align="left" prop="agent_risk_control_agents_count" width="270">
              <template #default="scope">
                <p>{{ scope.row.agent_risk_control_agents_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "风控代理用户数" align="left" prop="agent_risk_control_agent_users_count" width="270">
              <template #default="scope">
                <p>{{ scope.row.agent_risk_control_agent_users_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "代理风控占比" align="left" prop="agent_risk_control_proportion" width="270">
              <template #default="scope">
                <p>{{ scope.row.agent_risk_control_proportion.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "自身风控代理数" align="left" prop="agent_own_risk_control_agents_count" width="270">
              <template #default="scope">
                <p>{{ scope.row.agent_own_risk_control_agents_count }}</p>
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
.red {
  color: red;
}

.user-detail-header {
  padding-top: 20px;
  display: flex;
  align-items: center;
}
</style>