<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { number } from 'echarts';
import useStore from '@/store';
import {getAgentActivityReport, getAgentNewReport, getAgentWarningReport} from '@/api/DataAnalysis'
const { user } = useStore();


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
  agent_new_level_payment_amount: string;
  agent_withdrawal_amount: string;
  agent_new_level_charge_withdraw_dif: string;
  agent_new_charge_bonus: string;
  agent_achievement_rewards: string;
  agent_new_task_rewards: string;
  agent_betting_rebate_amount: string;
  agent_3_day_active_rate: string;
  agent_7_day_active_rate: string;
  agent_15_day_active_rate: string;
  agent_30_day_active_rate: number | string;
}

interface GetNewAgentReport {
  id: string;
  agent_date_time: string;
  agent_new_agents_count: number;
  agent_new_first_register: number;
  agent_new_level_payment: string;
  agent_new_level_payment_amount: string;
  agent_capita_invited_register_count: number;
  agent_capita_invitation_register_amount: string;
}

interface GetAgentRiskReport {
  id: string;
  agent_date_time: string;
  agent_active_count: number;
  agent_risk_control_agents_count: number;
  agent_risk_control_agent_users_count: number;
  agent_risk_control_proportion: string;
  agent_own_risk_control_agents_count: number;
}

const router = useRouter();

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(false);

const total1 = ref<number>(0);

const total2 = ref<number>(0);

const total3 = ref<number>(0);

const agentReportList = ref<Array<GetAgentReport>>([
])

const newAgentReportList = ref<Array<GetNewAgentReport>>([
])

const agentRiskList = ref<Array<GetAgentRiskReport>>([
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
  });
}
onMounted(()=>{
  loading.value = true;
  getData().then(()=>{
    loading.value = false;
  });
})
const getData = async () =>{
  
  let agentReportListDataRes = await getAgentActivityReport(user.token, dateRange.value, formData.value);
  agentReportList.value  = agentReportListDataRes.data.data;
  total1.value = agentReportListDataRes.data.data.length;

  let  newAgentReportListDataRes= await getAgentNewReport(user.token, dateRange.value, formData.value);
  newAgentReportList.value  = newAgentReportListDataRes.data.data;
  total2.value = newAgentReportListDataRes.data.data.length;

  let agentRiskListDataRes = await getAgentWarningReport(user.token, dateRange.value, formData.value);
  agentRiskList.value  = agentRiskListDataRes.data.data;
  total3.value = agentRiskListDataRes.data.data.length;
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
                <p>{{ scope.row.agent_new_level_payment_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增记忆提现金额" align="left" prop="agent_withdrawal_amount" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_withdrawal_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增一级充提差" align="left" prop="agent_new_level_charge_withdraw_dif" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_level_charge_withdraw_dif }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增充值奖励" align="left" prop="agent_new_charge_bonus" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_charge_bonus }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增成就奖励" align="left" prop="agent_achievement_rewards" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_achievement_rewards }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增任务奖励" align="left" prop="agent_new_task_rewards" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_new_task_rewards }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "新增投注返佣金额" align="left" prop="agent_betting_rebate_amount" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_betting_rebate_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "3日活跃率" align="left" prop="agent_3_day_active_rate" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_3_day_active_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "7日活跃率" align="left" prop="agent_7_day_active_rate" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_7_day_active_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "15日活跃率" align="left" prop="agent_15_day_active_rate" width="160">
              <template #default="scope">
                <p>{{ scope.row.agent_15_day_active_rate }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "30日活跃率" align="left" prop="agent_30_day_active_rate" width="160">
              <template #default="scope">
                <p v-if="scope.row.agent_30_day_active_rate*1 > 0">{{ scope.row.agent_30_day_active_rate }}%</p>
                <p v-else>{{ scope.row.agent_30_day_active_rate }}</p>
              </template>
            </el-table-column>
            
          </el-table>
          <div style="float: right;">
            <pagination v-if="total1 > 0" :total="total1" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handlePagination" />
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
                <p>{{ scope.row.agent_capita_invited_register_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "人均邀请注册金额" align="left" prop="agent_capita_invitation_register_amount" width="240">
              <template #default="scope">
                <p>{{ scope.row.agent_capita_invitation_register_amount }}</p>
              </template>
            </el-table-column>            
          </el-table>
          <div style="float: right;">
            <pagination v-if="total2 > 0" :total="total2" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handlePagination" />
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
                <p>{{ scope.row.agent_risk_control_proportion }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "自身风控代理数" align="left" prop="agent_own_risk_control_agents_count" width="270">
              <template #default="scope">
                <p>{{ scope.row.agent_own_risk_control_agents_count }}</p>
              </template>
            </el-table-column>      
          </el-table>
          <div style="float: right;">
            <pagination v-if="total3 > 0" :total="total3" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handlePagination" />
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