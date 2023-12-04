<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import {getUserDetailTable, getUserDetailApi, getUserDetailDepositWithdrawl, getUserDetailAgent} from '@/api/Players'
import useStore from '@/store';
import {useRoute} from 'vue-router';
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(0);
const activeNames = ref(['1', '2', '3', '4']);
const subActiveNames = ref(['1', '2', '3', '4']);
const vipBonusHeight = ref(0);
const vipBonusShow = ref<boolean>(false);

const basicInformation = ref<any>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_account: "test77@gmail.com",
    nick_name: "UserName10001",
    belong_to_superior: "aaaaaaaaaaa",
    user_invitation_code: "64982dfge466546456tgty",
    phone_number: "+45 5345454656456456",
    customer_type: "KOL",
    user_tag: "优质用户",
    account_status: "已流失",
    withdrawal_status: "提现封禁",
    frozen_status: "正常",
    register_ip: "168.191.1.1",
    operation_notes: "可能是个羊毛的，设置提现封禁",
    registration_time: "2023-06-30 19:30:30",
    recently_login_time: "2023-06-30 19:30:30",
})

const depositAndWithdrawalData = ref({
    account_balance: 999999.99,
    withdraw_amount: 888888.88,
    frozen_balance: 111111.11,
    principal_balance: 9999.99,
    bonus_balance: 9999.99,
    bonus_amount: 8900.66,
    total_recharge: 9999.99,
    total_withdrawal: 9999.999,
    charge_withdrawal_difference: 9999.99,
    bet_amount: 9999.99,
    profit_and_loss: 100000,
    activity_bonus: 10000,
    vip_level: "vip999",
    vip_rebate: 10000,
    vip_no_handling_fee: "9999.99 / 10000.00",
    vip_upgrade_rewards: 10000,
    vip_deposit_progress: "2344.00 / 10000.00",
    vip_betting_progress: "2344.00 / 10000.00",
    total_vip_bonus: 9999.99,
    vip_weekly_rewards: 9999.99,
    vip_monthly_rewards: 9999.99,
    vip_day_rewards: 99999.99,
    vip_sign_rewards: 9999.99,
    vip_spinner_rewards: 10000,
    vip_task_rewards: 10000,
    recharge_rebate: 10000,
    vip_event_bonus: 1000,

    recharge_amount: 10000,
    deduction_amount:10000,
    bet_count:1543,
})

const agentInformation = ref({
    all_subordinates: 999,
    belong_to_superior: "aaaaaaaaaa",
    agent_type: "KOL",
    rating: "A",
    recharge_amount_of_sum: 99999,
    subordinate_withdrawal_sum: 999999,
    total_profit_and_loss: 10000,
    recharger_number: 1000,
    subordinate_total_betting_amount: 100000,
    betting_rebate_amount: 10000,
    agent_direct_rewards: 10000,
    agent_achievement_rewards: 10000,
    agent_task_rewards: 10000,
    yesterday_rebate_amount: 10000,
    last_withdrawal_days_number: "5天3小时",
    last_invite_days_number: "3天2小时",
    first_level_registration_number: 1000,
    second_level_registration_number: 1000,
    third_level_registration_number: 1000,
    first_level_recharge_number: 10000,
    second_level_recharge_number: 10000,
    third_level_recharge_number: 10000,
    first_level_recharge_amount: 10000,
    second_level_recharge_amount: 10000,
    third_level_recharge_amount: 10000,
    first_level_withdrawal_amount: 10000,
    second_level_withdrawal_amount: 10000,
    third_level_withdrawal_amount: 10000,
    first_level_charge_withdrawal_difference: 10000,
    second_level_charge_withdrawal_difference: 10000,
    third_level_charge_withdrawal_difference: 10000,
    first_level_betting_rebate: 10000,
    second_level_betting_rebate: 10000,
    third_level_betting_rebate: 10000,
})
const bankList = ref([
    {
        payee: "Salvation A",
        beneficiary_bank: "GCASH",
        account: "09266467987",
    }
])

const pixList = ref([
    {
        mail: "Salvation A",
        name: "GCASH",
        phone_number: "09266467987",
        pix:"09266467987",
    }
]);

const walletList = ref([
    {
        account: "Salvation A",
        beneficiary_bank: "GCASH",
        payee: "09266467987",
    }
]);

const mexList = ref([
    {
        bank_card_number: "Salvation A",
        bank_code: "GCASH",
        curp_type: "09266467987",
        payee:"09266467987",
        rfc_curp: "09266467987",
        withdrawal_method:"09266467987",
    }
]);

const loading = ref<boolean>(false);

const goBack = () => {
    router.push({ name: "User List",params:{id:route.params.id}});
}

const handleChange = () => {

}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

const moreVipBonusShow = () => {
    vipBonusShow.value = !vipBonusShow.value;
    vipBonusHeight.value = vipBonusShow.value ? 150 : 0;
}

onMounted(()=>{
    getData().catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
})

const getData = async () =>{
    let temp = await getUserDetailApi(user.token, route.params.id);
    basicInformation.value = temp.data.data;

    temp = await getUserDetailDepositWithdrawl(user.token, route.params.id);
    depositAndWithdrawalData.value = temp.data.data;

    temp = await getUserDetailAgent(user.token, route.params.id);
    agentInformation.value = temp.data.data;

    temp = await getUserDetailTable(user.token, route.params.id);
    bankList.value = temp.data.data.bank_list;
    pixList.value = temp.data.data.pix_list;
    walletList.value = temp.data.data.wallet_list;
    mexList.value = temp.data.data.mex_list;

    console.log(pixList.value);
}

</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
            <div style="margin-left: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'UserDetail')">用户详情</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'FundingDetails')">资金明细</el-button>
                <el-button :type="activeButton == 2 ? 'warning' : ''"
                    @click="handleButtonActive(2, 'AgentRebate')">代理返利</el-button>
                <el-button :type="activeButton == 3 ? 'warning' : ''"
                    @click="handleButtonActive(3, 'PromotionRecord')">推广记录</el-button>
                <el-button :type="activeButton == 4 ? 'warning' : ''"
                    @click="handleButtonActive(4, 'RechargeRecord')">充值记录</el-button>
                <el-button :type="activeButton == 5 ? 'warning' : ''"
                    @click="handleButtonActive(5, 'WithdrawalRecord')">提现记录</el-button>
                <el-button :type="activeButton == 6 ? 'warning' : ''"
                    @click="handleButtonActive(6, 'ManualDeduction')">人工扣款</el-button>
                <el-button :type="activeButton == 7 ? 'warning' : ''"
                    @click="handleButtonActive(7, 'ManualRecharge')">人工充值</el-button>
                <el-button :type="activeButton == 8 ? 'warning' : ''"
                    @click="handleButtonActive(8, 'BettingRecord')">投注记录</el-button>
                <el-button :type="activeButton == 9 ? 'warning' : ''"
                    @click="handleButtonActive(9, 'RegistrationRecord')">登录记录</el-button>
            </div>
        </div>
        <el-card>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="基础信息" name="1">
                    <template #title>
                        <h2>基础信息</h2>
                    </template>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="用户ID:">
                                    {{ basicInformation.user_account }}
                                    <el-button link>
                                        <el-icon>
                                            <CopyDocument />
                                        </el-icon>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="用户昵称:">
                                {{ basicInformation.nick_name }}
                                <el-button link>
                                    <el-icon>
                                        <CopyDocument />
                                    </el-icon>
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="用户账号:">
                                {{ basicInformation.id }}
                                <el-button link>
                                    <el-icon>
                                        <CopyDocument />
                                    </el-icon>
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="归属上级:">
                                    <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;"
                                        @click="router.push({ name: 'UserDetail' })">
                                        {{ basicInformation.belong_to_superior }}
                                    </el-link>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="用户邀请码:">
                                {{ basicInformation.user_invitation_code }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号码:">
                                {{ basicInformation.phone_number }}
                                <el-button link type="primary" style="margin-left: 20px;">
                                    修改
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="注册时间:">
                                    {{ basicInformation.registration_time }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最后登录时间:">
                                {{ basicInformation.recently_login_time }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="注册IP:">
                                {{ basicInformation.register_ip }}
                                <el-button link type="success" style="margin-left: 20px;">
                                    巴西 圣保罗
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="用户类型:">
                                    {{ basicInformation.customer_type }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="用户标记:">
                                {{ basicInformation.user_tag }}
                                <el-button link type="primary" style="margin-left: 20px;">
                                    修改
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="账号状态:">
                                    <font color="red">{{ basicInformation.account_status }}</font>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="提现状态:">
                                {{ basicInformation.withdrawal_status }}
                                <el-button link type="danger" style="margin-left: 20px;">
                                    封禁提现
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="冻结状态:">
                                {{ basicInformation.frozen_status }}
                                <el-button link type="danger" style="margin-left: 20px;">
                                    拉黑
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="24">
                            <el-form label-width="200">
                                <el-form-item label="运营备注:">
                                    {{ basicInformation.operation_notes }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="账户信息" name="2">
                    <template #title>
                        <h2>账户信息</h2>
                    </template>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="账户余额:">
                                    {{ depositAndWithdrawalData.account_balance }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可提现金额:">
                                {{ depositAndWithdrawalData.withdraw_amount }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="冻结余额:">
                                {{ depositAndWithdrawalData.frozen_balance }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="本金余额:">
                                    {{ depositAndWithdrawalData.principal_balance }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="赠金余额:">
                                {{ depositAndWithdrawalData.bonus_balance }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="派奖金额:">
                                {{ depositAndWithdrawalData.bonus_amount }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="总充值:">
                                    {{ depositAndWithdrawalData.total_recharge }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="总提款:">
                                {{ depositAndWithdrawalData.total_withdrawal }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="充提差:">
                                {{ depositAndWithdrawalData.charge_withdrawal_difference }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="投注次数:">
                                    {{ depositAndWithdrawalData.bet_count }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="投注盈亏:">
                                {{ depositAndWithdrawalData.profit_and_loss }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="活动赠金:">
                                {{ depositAndWithdrawalData.activity_bonus }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="投注金额:">
                                    {{ depositAndWithdrawalData.bet_amount }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="人工充值金额:">
                                {{ depositAndWithdrawalData.recharge_amount }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="人工扣款金额:">
                                {{ depositAndWithdrawalData.deduction_amount }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="VIP等级:">
                                    {{ depositAndWithdrawalData.vip_level }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VIP打码返利:">
                                {{ depositAndWithdrawalData.vip_rebate }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VIP升级奖励总计:">
                                {{ depositAndWithdrawalData.vip_upgrade_rewards }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="VIP存款进度:">
                                    {{ depositAndWithdrawalData.vip_deposit_progress }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VIP投注进度:">
                                {{ depositAndWithdrawalData.vip_betting_progress }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VIP提现免手续费额度:">
                                {{ depositAndWithdrawalData.vip_no_handling_fee }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="VIP总赠金总计:">
                                    {{ depositAndWithdrawalData.total_vip_bonus }}
                                    <el-button link @click="moreVipBonusShow">
                                        <el-icon>
                                            <ArrowRight v-if="!vipBonusShow"/>
                                            <ArrowDown v-else/>
                                        </el-icon>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                        <el-col :span="8">
                        </el-col>
                    </el-row>
                    <div :class="vipBonusShow ? 'vip-bonus-show' : 'vip-bonus-collapse'">
                        <el-row :gutter="20" style="justify-content: center;">
                            <el-col :span="8">
                                <el-form label-width="200">
                                    <el-form-item label="VIP周奖励总计:">
                                        {{ depositAndWithdrawalData.vip_weekly_rewards }}
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="VIP月奖励总计:">
                                    {{ depositAndWithdrawalData.vip_monthly_rewards }}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="VIP会员日奖励总计:">
                                    {{ depositAndWithdrawalData.vip_day_rewards }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="justify-content: center;">
                            <el-col :span="8">
                                <el-form label-width="200">
                                    <el-form-item label="VIP签到奖励总计:">
                                        {{ depositAndWithdrawalData.vip_sign_rewards }}
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="VIP转盘奖励总计:">
                                    {{ depositAndWithdrawalData.vip_spinner_rewards }}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="VIP任务奖励总计:">
                                    {{ depositAndWithdrawalData.vip_task_rewards }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="justify-content: center;">
                            <el-col :span="8">
                                <el-form label-width="200">
                                    <el-form-item label="充值返利:">
                                        {{ depositAndWithdrawalData.recharge_rebate }}
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="VIP活动赠金:">
                                    {{ depositAndWithdrawalData.vip_event_bonus }}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="代理信息" name="3">
                    <template #title>
                        <h2>代理信息</h2>
                    </template>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="所有下级人数:">
                                    {{ agentInformation.all_subordinates }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="归属上级:">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;"
                                    @click="router.push({ name: 'UserDetail' })">
                                    {{ agentInformation.belong_to_superior }}
                                </el-link>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="代理类型:">
                                {{ agentInformation.agent_type }}
                                <Font color="red" style="margin-left: 20px;">评级: {{ agentInformation.rating }}</Font>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="代理充值金额总和:">
                                    {{ agentInformation.recharge_amount_of_sum }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="下级提现总和:">
                                {{ agentInformation.subordinate_withdrawal_sum }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="代理总盈亏:">
                                {{ agentInformation.total_profit_and_loss }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="充值人数总和:">
                                    {{ agentInformation.recharger_number }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="下级投注总金额:">
                                {{ agentInformation.subordinate_total_betting_amount }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="投注返利总金额:">
                                {{ agentInformation.betting_rebate_amount }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="代理直接奖励:">
                                    {{ agentInformation.agent_direct_rewards }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="代理成就奖励:">
                                {{ agentInformation.agent_achievement_rewards }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="代理任务奖励:">
                                {{ agentInformation.agent_task_rewards }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="昨日返佣金额:">
                                    {{ agentInformation.yesterday_rebate_amount }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="代理最后取款间隔天数:">
                                {{ agentInformation.last_withdrawal_days_number }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="代理最后邀请间隔天数:">
                                {{ agentInformation.last_invite_days_number }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="一级代理注册人数:">
                                    {{ agentInformation.first_level_registration_number }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="二级代理注册人数:">
                                {{ agentInformation.second_level_registration_number }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="三级代理注册人数:">
                                {{ agentInformation.third_level_registration_number }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="一级代理充值人数:">
                                    {{ agentInformation.first_level_recharge_number }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="二级代理充值人数:">
                                {{ agentInformation.second_level_recharge_number }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="三级代理充值人数:">
                                {{ agentInformation.third_level_recharge_number }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="一级代理充值金额:">
                                    {{ agentInformation.first_level_recharge_amount }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="二级代理充值金额:">
                                {{ agentInformation.second_level_recharge_amount }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="三级代理充值金额:">
                                {{ agentInformation.third_level_recharge_amount }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="一级代理提现金额:">
                                    {{ agentInformation.first_level_withdrawal_amount }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="二级代理提现金额:">
                                {{ agentInformation.second_level_withdrawal_amount }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="三级代理提现金额:">
                                {{ agentInformation.third_level_withdrawal_amount }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="一级代理充提差:">
                                    {{ agentInformation.first_level_charge_withdrawal_difference }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="二级代理充提差:">
                                {{ agentInformation.second_level_charge_withdrawal_difference }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="三级代理充提差:">
                                {{ agentInformation.third_level_charge_withdrawal_difference }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="justify-content: center;">
                        <el-col :span="8">
                            <el-form label-width="200">
                                <el-form-item label="一级代理投注返佣:">
                                    {{ agentInformation.first_level_betting_rebate }}
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="二级代理投注返佣:">
                                {{ agentInformation.second_level_betting_rebate }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="三级代理投注返佣:">
                                {{ agentInformation.third_level_betting_rebate }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="提款信息" name="4">
                    <template #title>
                        <h2>提款信息</h2>
                    </template>
                    <div style="width: 90%; margin: auto;">
                        <el-collapse v-model="subActiveNames">
                            <el-collapse-item title="BANK" name="1">
                                <template #title>
                                    <h3>BANK</h3>
                                </template>
                                <el-table v-loading="loading" :data="bankList" style="width: 100%;">
                                    <el-table-column label="收款人" align="center" prop="payee" />
                                    <el-table-column label="收款银行" align="center" prop="beneficiary_bank" />
                                    <el-table-column label="账号" align="center" prop="account">
                                        <template #default="scope">
                                            <p>{{ scope.row.account }}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="160" fixed="right">
                                        <template #default="scope">
                                            <el-button type="primary" link>修改</el-button>
                                            <el-button type="danger" link>删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item title="PIX" name="2">
                                <template #title>
                                    <h3>PIX</h3>
                                </template>
                                <el-table v-loading="loading" :data="pixList" style="width: 100%;">
                                    <el-table-column label="名称" align="center" prop="name">
                                        <template #default="scope">
                                            <p>{{ scope.row.mail }}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="邮箱" align="center" prop="mail">
                                        <template #default="scope">
                                            <p>{{ scope.row.name }}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="手机号" align="center" prop="phone_number">
                                        <template #default="scope">
                                            <p>{{ scope.row.phone_number }}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="Pix" align="center" prop="pix">
                                        <template #default="scope">
                                            <p>{{ scope.row.pix }}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="160" fixed="right">
                                        <template #default="scope">
                                            <el-button type="primary" link>修改</el-button>
                                            <el-button type="danger" link>删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item title="Electronic Wallet" name="3">
                                <template #title>
                                    <h3>Electronic Wallet</h3>
                                </template>
                                <el-table v-loading="loading" :data="walletList" style="width: 100%;">
                                    <el-table-column label="收款人" align="center" prop="payee" />
                                    <el-table-column label="收款银行" align="center" prop="beneficiary_bank" />
                                    <el-table-column label="账号" align="center" prop="account">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="160" fixed="right">
                                        <template #default="scope">
                                            <el-button type="primary" link>修改</el-button>
                                            <el-button type="danger" link>删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                            <el-collapse-item title="Mex" name="4">
                                <template #title>
                                    <h3>Mex</h3>
                                </template>
                                <el-table v-loading="loading" :data="mexList" style="width: 100%;">
                                    <el-table-column label="收款人" align="center" prop="payee" />
                                    <el-table-column label="银行代码" align="center" prop="bank_code" />
                                    <el-table-column label="提款方式" align="center" prop="withdrawal_method">
                                    </el-table-column>
                                    <el-table-column label="银行卡号" align="center" prop="bank_card_number" />
                                    <el-table-column label="RFC/CURP类型" align="center" prop="curp_type" />
                                    <el-table-column label="操作" align="center" width="160" fixed="right">
                                        <template #default="scope">
                                            <el-button type="primary" link>修改</el-button>
                                            <el-button type="danger" link>删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-collapse-item>
            </el-collapse>
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
</style>
