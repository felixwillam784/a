<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus, Setting } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

interface GetWarningData {
    id: string,
    customer_account: string,
    customer_name: string,
    account_balance: number,
    total_recharge_amount: number,
    total_reflect_amount: number,
    risk_control_type: string,
    risk_control_description: string,
}

const router = useRouter();

const formData = ref<any>({
    customer_account: "",
    customer_name: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const total = ref<number>(1);

const warningList = ref<Array<GetWarningData>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test777@gmail.com",
        customer_name: "UserName10001",
        account_balance: 99,
        total_recharge_amount: 900,
        total_reflect_amount: 999,
        risk_control_type: "一级代理风控",
        risk_control_description: "",
    },
])

const handleQuery = () => {
}

const resetQuery = () => {
}

const goWarningSettingPage = () => {
    router.push({ name: "Risk Control Settings" })
}
const removeRiskControl = (id: string) => {

}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="客户账号" prop="customer_account">
                            <el-input v-model="formData.customer_account" placeholder="请输入客户账号" clearable />
                        </el-form-item>
                        <el-form-item label="客户名字" prop="customer_name">
                            <el-input v-model="formData.customer_name" placeholder="请输入客户名字" clearable />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                        </el-form-item>
                        <el-form-item style="float: right;">
                            <el-button type="primary" :icon="Setting" @click="goWarningSettingPage">风控设置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="warningList" style="width: 100%;">
                        <el-table-column label="客户账号" align="center" prop="customer_account" width="200" />
                        <el-table-column label="客户名字" align="center" prop="customer_name" width="200" />
                        <el-table-column label="账号余额" width="200" align="center" prop="account_balance">
                            <template #default="scope">
                                <p>${{ scope.row.account_balance.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="充值总金额" width="200" align="center" prop="total_recharge_amount">
                            <template #default="scope">
                                <p>${{ scope.row.total_recharge_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="体现总金额" align="center" prop="total_reflect_amount" width="200">
                            <template #default="scope">
                                <p>${{ scope.row.total_reflect_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="风控类型" align="center" prop="risk_control_type" width="200">
                            <template #default="scope">
                                <el-button type="danger" plain>{{ scope.row.risk_control_type }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="风控说明" align="center" prop="risk_control_description"></el-table-column>
                        <el-table-column align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="primary" link @click="removeRiskControl(scope.row.id)">解除风控</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="float: right;">
                        <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
                            v-model:limit="formData.pageSize" @pagination="handleQuery" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa !important;
    height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
    height: 80px;
}
</style>