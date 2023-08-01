<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";

const router = useRouter();

const activeButton = ref<number>(5);

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
const disabled = ref<boolean>(false);
const totalPage = ref<number>(5);
const withdrawalRecordList = ref([
    {
        submission_time: "2023-07-01 15:23:00",
        withdrawal_platform_number: "640c1f88fe2a3727b815f25",
        withdrawal_amount: 999.99,
        receipt_amount: 999.99,
        handling_fee: 10,
        free_charge: 0,
        free_source_fee: "VIP",
        operation_balance: 999.99,
        order_status: "待审批",
        remark: ""
    },
    {
        submission_time: "2023-07-01 15:23:00",
        withdrawal_platform_number: "640c1f88fe2a3727b815f25",
        withdrawal_amount: 999.99,
        receipt_amount: 999.99,
        handling_fee: 10,
        free_charge: 0,
        free_source_fee: "VIP",
        operation_balance: 999.99,
        order_status: "已打款",
        remark: ""
    },
    {
        submission_time: "2023-07-01 15:23:00",
        withdrawal_platform_number: "640c1f88fe2a3727b815f25",
        withdrawal_amount: 999.99,
        receipt_amount: 999.99,
        handling_fee: 10,
        free_charge: 0,
        free_source_fee: "VIP",
        operation_balance: 999.99,
        order_status: "打款中",
        remark: ""
    },
    {
        submission_time: "2023-07-01 15:23:00",
        withdrawal_platform_number: "640c1f88fe2a3727b815f25",
        withdrawal_amount: 999.99,
        receipt_amount: 999.99,
        handling_fee: 10,
        free_charge: 0,
        free_source_fee: "VIP",
        operation_balance: 999.99,
        order_status: "已拒绝",
        remark: "封禁提现"
    },
    {
        submission_time: "2023-07-01 15:23:00",
        withdrawal_platform_number: "640c1f88fe2a3727b815f25",
        withdrawal_amount: 999.99,
        receipt_amount: 999.99,
        handling_fee: 10,
        free_charge: 0,
        free_source_fee: "VIP",
        operation_balance: 999.99,
        order_status: "取消订单",
        remark: ""
    },
    {
        submission_time: "2023-07-01 15:23:00",
        withdrawal_platform_number: "640c1f88fe2a3727b815f25",
        withdrawal_amount: 999.99,
        receipt_amount: 999.99,
        handling_fee: 10,
        free_charge: 0,
        free_source_fee: "VIP",
        operation_balance: 999.99,
        order_status: "打款失败",
        remark: ""
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
                <el-form-item label="金额范围:">
                    <el-input v-model="formData.min_amount" placeholder="最小金额"></el-input>
                    <font style="margin: 0px 6px;">至</font>
                    <el-input v-model="formData.max_amount" placeholder="最大金额"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 10px;">
            <el-table v-loading="loading" v-el-table-infinite-scroll="handleScrollLoad" :data="withdrawalRecordList"
                :infinite-scroll-disabled="disabled" style="width: 100%; margin-top: 10px; height: 535px; overflow: auto;">

                <el-table-column label="提交时间" align="center" prop="submission_time" width="200" />
                <el-table-column label="提现平台单号" align="center" prop="withdrawal_platform_number" width="200" />
                <el-table-column label="提现金额" align="center" prop="withdrawal_amount">
                    <template #default="scope">
                        <p>{{ scope.row.withdrawal_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="到账金额" align="center" prop="receipt_amount">
                    <template #default="scope">
                        <p>{{ scope.row.receipt_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="手续费" align="center" prop="handling_fee">
                    <template #default="scope">
                        <p>{{ scope.row.handling_fee }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="免手续费" align="center" prop="free_charge">
                    <template #default="scope">
                        <p>{{ scope.row.free_charge }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="免手续费来源" align="center" prop="free_source_fee">
                    <template #default="scope">
                        <p>{{ scope.row.free_source_fee }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作后余额" align="center" prop="operation_balance">
                    <template #default="scope">
                        <p>{{ scope.row.operation_balance }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" align="center" prop="order_status">
                    <template #default="scope">
                        <font color="green" v-if="scope.row.order_status == '已打款'">{{ scope.row.order_status }}</font>
                        <font color="red" v-else-if="scope.row.order_status == '已拒绝' || scope.row.order_status == '打款失败'">
                            {{ scope.row.order_status }}
                        </font>
                        <font v-else>{{ scope.row.order_status }}</font>
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center" prop="remark">
                    <template #default="scope">
                        <p>{{ scope.row.remark }}</p>
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
