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
const primaryAgentList = ref([
    {
        userAccount: "test77@gmail.com",
        nickName: "UserName100001",
        type: "一级代理",
        rechargeAmount: 999,
        withdrawalAmount: 900,
        chargeDifference: 99,
        bettingAmount: 900,
    },
    {
        userAccount: "test77@gmail.com",
        nickName: "UserName100001",
        type: "一级代理",
        rechargeAmount: 998,
        withdrawalAmount: 900,
        chargeDifference: -99,
        bettingAmount: 990,
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
                </el-col>
            </el-row>
            <el-table v-loading="loading" :data="primaryAgentList" style="width: 100%; margin-top: 20px;">

                <el-table-column label="用户账号" align="center" prop="userAccount" width="200" />
                <el-table-column label="昵称" align="center" prop="nickName" width="250" />
                <el-table-column label="类型" align="center" prop="type">
                    <template #default="scope">
                        <p>{{ scope.row.type }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="累计充值金额" align="center" prop="rechargeAmount">
                    <template #default="scope">
                        <p>$ {{ scope.row.rechargeAmount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="累计提现金额" align="center" prop="withdrawalAmount">                    
                    <template #default="scope">
                        <p>$ {{ scope.row.withdrawalAmount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="累计充提差" align="center" prop="chargeDifference">                    
                    <template #default="scope">
                        <Font color="green" v-if="scope.row.chargeDifference > 0">${{ scope.row.chargeDifference.toFixed(2) }}</Font>
                        <Font color="red" v-else>-${{ scope.row.chargeDifference.toFixed(2).substring(1) }}</Font>
                    </template>
                </el-table-column>
                <el-table-column label="累计下注金额" align="center" prop="bettingAmount">                    
                    <template #default="scope">
                        <p>$ {{ scope.row.bettingAmount.toFixed(2) }}</p>
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
