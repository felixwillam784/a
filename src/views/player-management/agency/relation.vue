<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import {getAgentRelationshipList} from '@/api/Players'
import useStore from '@/store';
import {useRoute} from 'vue-router';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(0);

const loading = ref<boolean>(false);

const formData = ref<any>({
    user_account: "",
    account_status:"",
    least_benefit:0,
})

const handleChange = () => {

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
  let res = await getAgentRelationshipList(user.token, formData.value, 1);
  agentReportList1.value = res.data.data;

  res = await getAgentRelationshipList(user.token, formData.value, 2);
  agentReportList2.value = res.data.data;

  res = await getAgentRelationshipList(user.token, formData.value, 3);
  agentReportList3.value = res.data.data;
}

const goBack = () =>{
    router.push({name:'AgencyDetail'})
}

interface GetAgentReport {
  id: string;
  user_account:string;
  total_recharge:number;
  total_withdraw_amount:number;
  account_balance:number;
  bet_amount:number;
  bet_count:number;
  income_amount:number;
  account_status:string;
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

const handleQuery = () =>{
  loading.value = true;
  getData().then(()=>{
    loading.value = false;
  }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
}

const resetQuery = () => {
  formData.value.user_account = "";
  formData.value.account_status = "";
  formData.value.least_benefit = 0;
}
</script>

<template>
    <div class="app-container">
        <div style="margin-bottom:10px">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>
        <div class="search">
            <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                <el-form-item prop="customer_label">
                    <p style="margin-right:10px">客户账号 </p>
                    <el-input v-model="formData.user_account" placeholder="请输入客户账号" clearable />
                </el-form-item>
                <el-form-item prop="customer_label">
                    <p style="margin-right:10px">客户状态 </p>
                    <el-select v-model="formData.account_status" placeholder="请选择客户状态" clearable />
                </el-form-item>
                <el-form-item prop="customer_label">
                    <p style="margin-right:10px">累计带来收益大于 </p>
                    <el-input v-model="formData.least_benefit" placeholder="请输入累计收益金额" clearable />
                </el-form-item>

                <el-form-item style="float: right;">
                    <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin:20px 10px; display:flex">
            <div style="display:flex; align-items:center; justify-content:center;">
                上级代理:<el-button type="primary" link>{{route.params.user_account}}</el-button>
            </div>
            <div style="margin-left:auto; display:flex">
                <span class = "game-report-overview game-report-bg1">一级代理人数: 99999</span>
                <span class = "game-report-overview game-report-bg1">一级代理累计返利: 99999</span>
            </div>
        </div>
        <div class="user-detail-header">
          <div >
            <el-button :type="activeButton == 0 ? 'warning' : ''"
              @click="handleButtonActive(0)">一级代理</el-button>
            <el-button :type="activeButton == 1 ? 'warning' : ''"
              @click="handleButtonActive(1)">二级代理</el-button>
            <el-button :type="activeButton == 2 ? 'warning' : ''"
              @click="handleButtonActive(2)">三级代理</el-button>              
          </div>
        </div>
        <el-card style="margin-top: 20px;" v-if="activeButton == 0">
          <el-table v-loading="loading" :data="agentReportList1" style="width: 100%;">
            <el-table-column label = "用户账号" align="left" prop="user_account">
              <template #default="scope">
                <el-button type="primary" link>{{scope.row.user_account}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label = "充值总额" align="left" prop="total_recharge">
              <template #default="scope">
                <p>{{ scope.row.total_recharge }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现总额" align="left" prop="total_withdraw_amount">
              <template #default="scope">
                <p>{{ scope.row.total_withdraw_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "账户余额" align="left" prop="account_balance">
              <template #default="scope">
                <p>{{ scope.row.account_balance }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计下注金额" align="left" prop="bet_amount">
              <template #default="scope">
                <p>{{ scope.row.bet_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计下注次数" align="left" prop="bet_count">
              <template #default="scope">
                <p>{{ scope.row.bet_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计带来收益金额" align="left" prop="income_amount">
              <template #default="scope">
                <p>{{ scope.row.income_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "账号状态" align="left" prop="account_status">
              <template #default="scope">
                <p>{{ scope.row.account_status }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card style="margin-top: 20px;" v-if="activeButton == 1">
          <el-table v-loading="loading" :data="agentReportList2" style="width: 100%;">
            <el-table-column label = "用户账号" align="left" prop="user_account">
              <template #default="scope">
                <el-button type="primary" link>{{scope.row.user_account}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label = "充值总额" align="left" prop="total_recharge">
              <template #default="scope">
                <p>{{ scope.row.total_recharge }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现总额" align="left" prop="total_withdraw_amount">
              <template #default="scope">
                <p>{{ scope.row.total_withdraw_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "账户余额" align="left" prop="account_balance">
              <template #default="scope">
                <p>{{ scope.row.account_balance }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计下注金额" align="left" prop="bet_amount">
              <template #default="scope">
                <p>{{ scope.row.bet_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计下注次数" align="left" prop="bet_count">
              <template #default="scope">
                <p>{{ scope.row.bet_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计带来收益金额" align="left" prop="income_amount">
              <template #default="scope">
                <p>{{ scope.row.income_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "账号状态" align="left" prop="account_status">
              <template #default="scope">
                <p>{{ scope.row.account_status }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card style="margin-top: 20px;" v-if="activeButton == 2">
          <el-table v-loading="loading" :data="agentReportList3" style="width: 100%;">
            <el-table-column label = "用户账号" align="left" prop="user_account">
              <template #default="scope">
                <el-button type="primary" link>{{scope.row.user_account}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label = "充值总额" align="left" prop="total_recharge">
              <template #default="scope">
                <p>{{ scope.row.total_recharge }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "提现总额" align="left" prop="total_withdraw_amount">
              <template #default="scope">
                <p>{{ scope.row.total_withdraw_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "账户余额" align="left" prop="account_balance">
              <template #default="scope">
                <p>{{ scope.row.account_balance }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计下注金额" align="left" prop="bet_amount">
              <template #default="scope">
                <p>{{ scope.row.bet_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计下注次数" align="left" prop="bet_count">
              <template #default="scope">
                <p>{{ scope.row.bet_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "累计带来收益金额" align="left" prop="income_amount">
              <template #default="scope">
                <p>{{ scope.row.income_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label = "账号状态" align="left" prop="account_status">
              <template #default="scope">
                <p>{{ scope.row.account_status }}</p>
              </template>
            </el-table-column>
          </el-table>
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
