<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";

const router = useRouter();

const activeButton = ref<number>(3);

const formData = ref<any>({
    dateRange: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(5);
const loading = ref<boolean>(false);
const disabled = ref<boolean>(false);
const totalPage = ref<number>(5);
const promotionRecordList = ref([
    {
        registration_time: "2023-07-01 15:23:00",
        nick_name: "UserName1001",
        user_account: "test77@gmail.com",
        recharge_amount: 999.99,
        withdrawan_amount: 999.99,
        withdrawal_amount: 999.99,
        charge_withdrawal_difference: -999.99,
        vip_level: "VIP99",
        account_status: "已流失",
        user_tag: "优质用户",
    },
    {
        registration_time: "2023-07-01 15:23:00",
        nick_name: "UserName1001",
        user_account: "test77@gmail.com",
        recharge_amount: 999.99,
        withdrawan_amount: 999.99,
        withdrawal_amount: 999.99,
        charge_withdrawal_difference: -999.99,
        vip_level: "VIP99",
        account_status: "正常用户",
        user_tag: "刷子用户",
    },
    {
        registration_time: "2023-07-01 15:23:00",
        nick_name: "UserName1001",
        user_account: "test77@gmail.com",
        recharge_amount: 999.99,
        withdrawan_amount: 999.99,
        withdrawal_amount: 999.99,
        charge_withdrawal_difference: -999.99,
        vip_level: "VIP99",
        account_status: "禁止提现",
        user_tag: "潜力用户",
    },
])

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

const handleScrollLoad = () => {

    if (disabled.value) return;

    formData.value.pageNum++;
    if (formData.value.pageNum <= totalPage.value) {
    }

    if (formData.value.pageNum === totalPage.value) {
        disabled.value = true;
    }
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
                <el-form-item style="float: right;">
                    <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 10px;">
            <el-table v-loading="loading" v-el-table-infinite-scroll="handleScrollLoad" :data="promotionRecordList"
                :infinite-scroll-disabled="disabled" style="width: 100%; margin-top: 10px; height: 535px; overflow: auto;">

                <el-table-column label="注册时间" align="center" prop="registration_time" width="200" />
                <el-table-column label="用户昵称" align="center" prop="nick_name">
                    <template #default="scope">
                        <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;"
                            @click="router.push({ name: 'UserDetail' })">{{ scope.row.nick_name }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="用户账户" align="center" prop="user_account">
                    <template #default="scope">
                        <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;"
                            @click="router.push({ name: 'UserDetail' })">{{ scope.row.user_account }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="充值" align="center" prop="recharge_amount">
                    <template #default="scope">
                        <p>{{ scope.row.recharge_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="已提现金额" align="center" prop="withdrawan_amount">
                    <template #default="scope">
                        <p>{{ scope.row.withdrawan_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="提现中金额" align="center" prop="withdrawal_amount">
                    <template #default="scope">
                        <p>{{ scope.row.withdrawal_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="充提差" align="center" prop="charge_withdrawal_difference">
                    <template #default="scope">
                        <p>{{ scope.row.charge_withdrawal_difference }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="VIP等级" align="center" prop="vip_level">
                    <template #default="scope">
                        <p>{{ scope.row.vip_level }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="账号状态" align="center" prop="account_status">
                    <template #default="scope">
                        <font color="red" v-if="scope.row.account_status == '已流失'">{{ scope.row.account_status }}</font>
                        <font v-else>{{ scope.row.account_status }}</font>
                    </template>
                </el-table-column>
                <el-table-column label="用户标记" align="center" prop="user_tag">
                    <template #default="scope">
                        <p>{{ scope.row.user_tag }}</p>
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
</style>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>
