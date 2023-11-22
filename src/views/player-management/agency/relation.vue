<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import {getUserDetailTable, getUserDetailApi, getUserDetailDepositWithdrawl, getUserDetailAgent} from '@/api/Players'
import useStore from '@/store';
import {useRoute} from 'vue-router';
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(0);

const loading = ref<boolean>(false);

const formData = ref<any>({
    user_account: "",
})
const userAccountList = ref<Array<any>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_label: "用户备注",
        flow_amount: -999,
        flow_type: "下注",
        flow_time: "2023-07-12 10:23:24",
    },
])
const handleChange = () => {

}

onMounted(()=>{
    getData();
})

const getData = async () =>{
}

const goBack = () =>{
    router.push({name:'AgencyDetail'})
}

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


const agentReportList1 = ref<Array<GetAgentReport>>([
])
const agentReportList2 = ref<Array<GetAgentReport>>([
])
const agentReportList3 = ref<Array<GetAgentReport>>([
])

const handleButtonActive = (index: number) => {
    activeButton.value = index;
}

</script>

<template>
    <div class="app-container">
        <div style="margin-bottom:10px">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>
        <div class="search">
            <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                <el-form-item label="客户标签" prop="customer_label">
                    <el-input v-model="formData.user_account" placeholder="请输入客户账号" clearable style="width: 200px" />
                </el-form-item>
                <el-form-item label="客户标签" prop="customer_label">
                    <el-select v-model="formData.user_account" placeholder="请输入客户账号" clearable style="width: 200px" />
                </el-form-item>
                <el-form-item label="客户标签" prop="customer_label">
                    <el-input v-model="formData.user_account" placeholder="请输入客户账号" clearable style="width: 200px" />
                </el-form-item>

                <el-form-item style="float: right;">
                    <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin:20px 10px; display:flex">
            <div style="display:flex; align-items:center; justify-content:center;">
                asdf:{{route.params.user_account}}
            </div>
            <div style="margin-left:auto; display:flex">
                <span class = "game-report-overview game-report-bg1">彩金总数: {{totablBonous}}</span>
                <span class = "game-report-overview game-report-bg1">领取人数: {{recip_count}}</span>
            </div>
        </div>
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
          <el-table v-loading="loading" :data="agentReportList1" style="width: 100%;">
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
          <el-table v-loading="loading" :data="agentReportList2" style="width: 100%;">
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
        <el-card style="margin-top: 20px;" v-if="activeButton == 2">
          <el-table v-loading="loading" :data="agentReportList3" style="width: 100%;">
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
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}

:deep(.el-form-item__label) {
    font-size: 16px !important;
    font-weight: bold !important;
}

:deep(.el-table thead th.el-table__cell) {
    background: #f5f7fa;
    height: 60px;
}

.vip-bonus-collapse {
    // transition: height 0.3s ease-out;
    display: none;
}

.vip-bonus-show {
    // transition: height 0.3s ease-out;
    display: block;
}

.red {
  color: red;
}

.game-report-overview {
  color: red;
  font-size: 18px;
  border: 1px solid;
  border-color: black;
  margin-right: 10px;
  padding: 10px 15px;
}

.game-report-bg1 {
  background-color: #ffccff;
}
.user-detail-header {
  padding-top: 20px;
  display: flex;
  align-items: center;
}
</style>
