<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';

const router = useRouter();

const activeButton = ref<number>(2);

const formData = ref<any>({
    dateRange: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    min_amount: "",
    max_amount: "",
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(5);
const loading = ref<boolean>(false);
const bettingRebateDialogVisible = ref(false);
const rechargeRebateDialogVisible = ref(false);
const agentRebateList = ref([
    {
        time: "2023-07-01",
        betting_rebate: 999.99,
        bettor_number: 999,
        recharge_rebate: 999.99,
        recharge_number: 999,
        achievement_rewards: 999.99,
        task_reward: 999.99,
    },
    {
        time: "2023-07-01",
        betting_rebate: 999.99,
        bettor_number: 999,
        recharge_rebate: 999.99,
        recharge_number: 999,
        achievement_rewards: 999.99,
        task_reward: 999.99,
    },
    {
        time: "2023-07-01",
        betting_rebate: 999.99,
        bettor_number: 999,
        recharge_rebate: 999.99,
        recharge_number: 999,
        achievement_rewards: 999.99,
        task_reward: 999.99,
    },
    {
        time: "2023-07-01",
        betting_rebate: 999.99,
        bettor_number: 999,
        recharge_rebate: 999.99,
        recharge_number: 999,
        achievement_rewards: 999.99,
        task_reward: 999.99,
    },
    {
        time: "2023-07-01",
        betting_rebate: 999.99,
        bettor_number: 999,
        recharge_rebate: 999.99,
        recharge_number: 999,
        achievement_rewards: 999.99,
        task_reward: 999.99,
    },
])

const bettingRebateList = ref([
    {
        time: "2023-07-01 16:00:00",
        bet_amount: 200,
        betting_rebate: 2,
        account: "fangda_0625@qq.com"
    },
    {
        time: "2023-07-01 16:00:00",
        bet_amount: 200,
        betting_rebate: 2,
        account: "fangda_0625@qq.com"
    },
    {
        time: "2023-07-01 16:00:00",
        bet_amount: 200,
        betting_rebate: 2,
        account: "fangda_0625@qq.com"
    },
    {
        time: "2023-07-01 16:00:00",
        bet_amount: 200,
        betting_rebate: 2,
        account: "fangda_0625@qq.com"
    },
    {
        time: "2023-07-01 16:00:00",
        bet_amount: 200,
        betting_rebate: 2,
        account: "fangda_0625@qq.com"
    },
    {
        time: "2023-07-01 16:00:00",
        bet_amount: 200,
        betting_rebate: 2,
        account: "fangda_0625@qq.com"
    },
    {
        time: "2023-07-01 16:00:00",
        bet_amount: 200,
        betting_rebate: 2,
        account: "fangda_0625@qq.com"
    },
])

const rechargeRebateList = ref([
    {
        time: "2023-07-01 16:00:00",
        amount: 200,
        rebate: 2,
        account: "fangda_0625@qq.com"
    },
    {
        time: "2023-07-01 16:00:00",
        amount: 200,
        rebate: 2,
        account: "fangda_0625@qq.com"
    },
]);

const handleQuery = () => {

}

const resetQuery = () => {

}

const goBack = () => {
    router.push({ name: "User List" });
}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

const showBettingRebateDialog = () => {
    bettingRebateDialogVisible.value = true;
}

const showRechargeRebateDialog = () => {
    rechargeRebateDialogVisible.value = true;
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
            <el-form :model="formData" :inline="true" label-width="120">
                <el-form-item label="选择时间:">
                    <el-date-picker type="daterange" v-model="formData.dateRange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="金额范围:">
                    <el-input v-model="formData.min_amount" placeholder="最小金额"></el-input>
                    <font style="margin: 0px 6px;">至</font>
                    <el-input v-model="formData.max_amount" placeholder="最大金额"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 10px;">
            <el-table v-loading="loading" :data="agentRebateList" style="width: 100%; margin-top: 10px;">
                <el-table-column label="时间" align="center" prop="time" width="200" />
                <el-table-column label="投注返利" align="center" prop="betting_rebate">
                    <template #default="scope">
                        <el-button type="primary" link @click="showBettingRebateDialog">{{ scope.row.betting_rebate
                        }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="投注人数" align="center" prop="bettor_number">
                    <template #default="scope">
                        <el-button type="primary" link>{{ scope.row.bettor_number }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="充值返利" align="center" prop="recharge_rebate">
                    <template #default="scope">
                        <el-button type="primary" link @click="showRechargeRebateDialog">{{ scope.row.recharge_rebate
                        }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="充值人数" align="center" prop="recharge_number">
                    <template #default="scope">
                        <el-button type="primary" link>{{ scope.row.recharge_number }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="代理成就奖励" align="center" prop="achievement_rewards">
                    <template #default="scope">
                        <p>{{ scope.row.achievement_rewards }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="代理任务奖励" align="center" prop="task_reward">
                    <template #default="scope">
                        <p>{{ scope.row.task_reward }}</p>
                    </template>
                </el-table-column>
            </el-table>

            <!-- <div style="float: right;">
                <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
                    v-model:limit="formData.pageSize" @pagination="handleQuery" />
            </div> -->
        </el-card>

        <el-dialog v-model="bettingRebateDialogVisible" title="投注返利奖励" style="width: 90%;">
            <el-table v-loading="loading" :data="bettingRebateList" style="width: 100%; height: 600px; overflow-y: auto;">
                <el-table-column label="时间" align="center" prop="time" width="200" />
                <el-table-column label="投注金额" align="center" prop="bet_amount">
                    <template #default="scope">
                        <p>{{ scope.row.bet_amount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="投注返利" align="center" prop="betting_rebate">
                    <template #default="scope">
                        <p>{{ scope.row.betting_rebate.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="投注用户邮箱" align="center" prop="account">
                    <template #default="scope">
                        <el-button type="primary" link>{{ scope.row.account }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog v-model="rechargeRebateDialogVisible" title="充值返利" style="width: 90%;">
            <el-table v-loading="loading" :data="rechargeRebateList" style="width: 100%; height: 600px; overflow-y: auto;">
                <el-table-column label="时间" align="center" prop="time" width="200" />
                <el-table-column label="充值金额" align="center" prop="amount">
                    <template #default="scope">
                        <p>{{ scope.row.amount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="充值返利" align="center" prop="rebate">
                    <template #default="scope">
                        <p>{{ scope.row.rebate.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="充值账号" align="center" prop="account">
                    <template #default="scope">
                        <el-button type="primary" link>{{ scope.row.account }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}
</style>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>
