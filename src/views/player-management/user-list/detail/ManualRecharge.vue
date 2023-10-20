<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";

import useStore from '@/store';
import {useRoute} from 'vue-router';
import {getUserManualRechargeDetail} from '@/api/Players'
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(7);

const formData = ref<any>({
    dateRange: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    min_amount: 0,
    max_amount: 0,
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(5);
const loading = ref<boolean>(false);
const disabled = ref<boolean>(false);
const totalPage = ref<number>(5);
const manualRechargeList = ref([
    {
        time: "2023-07-01 15:23:00",
        change_type: "人工充值",
        operator: "UserName",
        order_amount: 999.99,
        required_code_amount: 999.99,
        remark: "人工充值是因为",
    },
    {
        time: "2023-07-01 15:23:00",
        change_type: "主播加金",
        operator: "UserName",
        order_amount: 999.99,
        required_code_amount: 999.99,
        remark: "人工充值是因为",
    },
    {
        time: "2023-07-01 15:23:00",
        change_type: "异常补金",
        operator: "UserName",
        order_amount: 999.99,
        required_code_amount: 999.99,
        remark: "人工充值是因为",
    },
    {
        time: "2023-07-01 15:23:00",
        change_type: "手动赠金",
        operator: "UserName",
        order_amount: 999.99,
        required_code_amount: 999.99,
        remark: "人工充值是因为",
    },
    {
        time: "2023-07-01 15:23:00",
        change_type: "虚拟账号加金",
        operator: "UserName",
        order_amount: 999.99,
        required_code_amount: 999.99,
        remark: "人工充值是因为",
    },
])

const handleQuery = () => {
    getData();
}

const resetQuery = () => {

}
onMounted(()=>{
    getData();
})

const getData = async () =>{
    let temp = await getUserManualRechargeDetail(user.token, route.params.id, formData.value);
    manualRechargeList.value = temp.data.data;
}
const goBack = () => {
    router.push({ name: "User List" });
}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

const handleScrollLoad = () => {
    console.log("ok");

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
            <el-table v-loading="loading" v-el-table-infinite-scroll="handleScrollLoad" :data="manualRechargeList"
                :infinite-scroll-disabled="disabled" style="width: 100%; margin-top: 10px; height: 535px; overflow: auto;">

                <el-table-column label="时间" align="center" prop="time" width="200" />
                <el-table-column label="变动类型" align="center" prop="change_type" />
                <el-table-column label="操作人员" align="center" prop="operator">
                    <template #default="scope">
                        <p>{{ scope.row.operator }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="订单金额" align="center" prop="order_amount">
                    <template #default="scope">
                        <p>{{ scope.row.order_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="需求打码量" align="center" prop="required_code_amount">
                    <template #default="scope">
                        <p>{{ scope.row.required_code_amount }}</p>
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
