<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';

const router = useRouter();

const goBack = () => {
    router.go(-1);
}

const customerName = ref<string>("UserName10001");
const formData = ref<any>({
    date: moment().tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(1);
const loading = ref<boolean>(false);
const rechargeRecordList = ref([
    {
        withdrawalTime: "2023-07-01 15:23:00",
        platformOrderNumber: "ABCDEFGHIJKMKSLOOPGGERRERE",
        paymentChannel: "AAAAAAAAAAAA",
        paymentOrderNumber: "ABCDEFGHIJKMKSLOOPGGERRERE",
        withdrawalAmount: 999,
        handlingFee: 9,
        actualAmount: 999,
        orderStatus: 0,
    },
    {
        withdrawalTime: "2023-07-01 15:23:00",
        platformOrderNumber: "ABCDEFGHIJKMKSLOOPGGERRERE",
        paymentChannel: "AAAAAAAAAAAA",
        paymentOrderNumber: "ABCDEFGHIJKMKSLOOPGGERRERE",
        withdrawalAmount: 999,
        handlingFee: 9,
        actualAmount: 999,
        orderStatus: 1,
    },
    {
        withdrawalTime: "2023-07-01 15:23:00",
        platformOrderNumber: "ABCDEFGHIJKMKSLOOPGGERRERE",
        paymentChannel: "AAAAAAAAAAAA",
        paymentOrderNumber: "ABCDEFGHIJKMKSLOOPGGERRERE",
        withdrawalAmount: 999,
        handlingFee: 9,
        actualAmount: 999,
        orderStatus: 2,
    }
])

const handleQuery = () => {

}

const resetQuery = () => {

}
</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>

        <el-card>
            <el-row >
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8" class="betting-record-left-bg">用户名：</el-col>
                        <el-col :span="16" class="betting-record-right-bg">
                            {{ customerName }}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="16">
                    <el-form :model="formData" :inline="true" label-width="120">
                        <el-form-item label="提现日期:">
                            <el-date-picker v-model="formData.date" type="date" placeholder="Pick a Date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table v-loading="loading" :data="rechargeRecordList" style="width: 100%; margin-top: 10px;">

                <el-table-column label="时间" align="center" prop="withdrawalTime" width="200" />
                <el-table-column label="平台订单号" align="center" prop="platformOrderNumber" />
                <el-table-column label="支付通道" align="center" prop="paymentChannel">
                    <template #default="scope">
                        <p>{{ scope.row.paymentChannel }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="支付通道订单号" align="center" prop="paymentOrderNumber">
                    <template #default="scope">
                        <p>{{ scope.row.paymentOrderNumber }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="提现金额" align="center" prop="withdrawalAmount" width="100">                    
                    <template #default="scope">
                        <p>$ {{ scope.row.withdrawalAmount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="手续费" align="center" prop="handlingFee" width="100">                    
                    <template #default="scope">
                        <p>$ {{ scope.row.handlingFee.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="实到金额" align="center" prop="actualAmount" width="100">                    
                    <template #default="scope">
                        <p>$ {{ scope.row.actualAmount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" align="center" prop="orderStatus">                 
                    <template #default="scope">
                        <Font color="green" v-if="scope.row.orderStatus == 0">已完成</Font>
                        <Font color="red" v-else-if="scope.row.orderStatus == 1">已取消</Font>
                        <Font v-else>支付中</Font>
                    </template>
                </el-table-column>
            </el-table>

            <div style="float: right;">
                <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
                    v-model:limit="formData.pageSize" @pagination="handleQuery" />
            </div>
        </el-card>
    </div>
</template>

<style lang="scss">
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}

.betting-record-left-bg {
    background-color: #f5f7fa;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 32px;
}

.betting-record-right-bg {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 32px;
}
.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>
