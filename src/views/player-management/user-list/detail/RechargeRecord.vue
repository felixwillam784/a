<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import useStore from '@/store';
import {useRoute} from 'vue-router';
import {getUserRechargeRecordDetail} from '@/api/Players'
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();
const activeButton = ref<number>(4);

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
const rechargeRecordList = ref([
    {
        submission_time: "2023-07-01 15:23:00",
        payment_time: "_____",
        platform_tracking_number: "6423565465f4645wed6567",
        channel_order_number: "70985656456456",
        gaia_order_number: "PPH20233445345345",
        recharge_amount: 999.99,
        bonus_amount: 999.99,
        order_status: "未支付",
    },
    {
        submission_time: "2023-07-01 15:23:00",
        payment_time: "2023-07-01 15:23:00",
        platform_tracking_number: "6423565465f4645wed6567",
        channel_order_number: "70985656456456",
        gaia_order_number: "PPH20233445345345",
        recharge_amount: 999.99,
        bonus_amount: 999.99,
        order_status: "已完成",
    },
    {
        submission_time: "2023-07-01 15:23:00",
        payment_time: "_____",
        platform_tracking_number: "6423565465f4645wed6567",
        channel_order_number: "70985656456456",
        gaia_order_number: "PPH20233445345345",
        recharge_amount: 999.99,
        bonus_amount: 999.99,
        order_status: "等待支付",
    },
    {
        submission_time: "2023-07-01 15:23:00",
        payment_time: "_____",
        platform_tracking_number: "6423565465f4645wed6567",
        channel_order_number: "70985656456456",
        gaia_order_number: "PPH20233445345345",
        recharge_amount: 999.99,
        bonus_amount: 999.99,
        order_status: "已取消",
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
    let temp = await getUserRechargeRecordDetail(user.token, route.params.id, formData.value);
    rechargeRecordList.value = temp.data.data;
}

const goBack = () => {
    router.push({ name: "User List" });
}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name, params:{id:route.params.id}});
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
            <el-table v-loading="loading" v-el-table-infinite-scroll="handleScrollLoad" :data="rechargeRecordList"
                :infinite-scroll-disabled="disabled" style="width: 100%; margin-top: 10px; height: 535px; overflow: auto;">

                <el-table-column label="提交时间" align="center" prop="submission_time" width="200" />
                <el-table-column label="打款时间" align="center" prop="payment_time" />
                <el-table-column label="平台单号" align="center" prop="platform_tracking_number">
                    <template #default="scope">
                        <p>{{ scope.row.platform_tracking_number }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="渠道订单号" align="center" prop="channel_order_number">
                    <template #default="scope">
                        <p>{{ scope.row.channel_order_number }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="Gaia订单号" align="center" prop="gaia_order_number">
                    <template #default="scope">
                        <p>{{ scope.row.gaia_order_number }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="充值金额" align="center" prop="recharge_amount">
                    <template #default="scope">
                        <p>{{ scope.row.recharge_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="赠金" align="center" prop="bonus_amount">
                    <template #default="scope">
                        <p>{{ scope.row.bonus_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" align="center" prop="order_status">
                    <template #default="scope">
                        <font color="green" v-if="scope.row.order_status == '已完成'">{{ scope.row.order_status }}</font>
                        <font color="red" v-else-if="scope.row.order_status == '已取消'">{{ scope.row.order_status }}</font>
                        <font v-else>{{ scope.row.order_status }}</font>
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
