<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import {getAgentlist} from '@/api/Players'
import useStore from '@/store';
import {useRoute} from 'vue-router';
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(0);

const loading = ref<boolean>(false);

const formData = ref<any>({
    user_account: "",
})
const userAccountList = ref<Array<any>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "fangda_0625@gg.com",
        total_recharge: 999.99,
        total_withdraw_amount: 999.99,
        account_balance: 999.99,
        rebate: 999.99,
        rebate_received: 999.99,
        not_claimed_rebate: 999.99,
        invite_count: 999.99,
        account_status: "正常",
    },
])
const handleChange = () => {

}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

onMounted(()=>{
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    });
})

const getData = async () =>{
    let res = await getAgentlist(user.token, formData.user_account);
    userAccountList.value = res.data.data;
}

const gotToRelationPage = (user_account:string) =>{
    router.push({name:'AgencyRelation', params:{user_account:user_account}}, );
}

const handleQuery = () => {
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    });
}

</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <div style="margin-right: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'AgencyDetail')">代理详情</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'AgencySetting')">代理设置</el-button>
            </div>
        </div>
        <div class="search">
            <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                <el-form-item label="客户账号" prop="customer_label">
                    <el-input v-model="formData.user_account" placeholder="请输入客户账号" clearable
                                style="width: 200px" />
                </el-form-item>

                <el-form-item style="float: right;">
                    <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-card>
            <el-table v-loading="loading" :data="userAccountList" style="width: 100%;">
                <el-table-column label="客户账号" align="center" prop="customer_account" width="200" />
                <el-table-column label="充值总额" align="center" prop="total_recharge" width="200" />
                <el-table-column label="提现总额" width="200" align="center" prop="total_withdraw_amount" />
                <el-table-column label="账户余额" width="200" align="center" prop="account_balance" />
                <el-table-column label="累计返利" align="center" prop="rebate" width="120"></el-table-column>
                <el-table-column label="累计领取返利" align="center" prop="rebate_received" width="120"></el-table-column>
                <el-table-column label="未领取返利" align="center" prop="not_claimed_rebate"></el-table-column>
                <el-table-column label="总邀请人数" align="center" prop="invite_count"></el-table-column>
                <el-table-column label="账号状态" align="center" prop="account_status"></el-table-column>
                <el-table-column align="center">
                    <template #default="scope">
                        <el-button type="primary" link @click="gotToRelationPage(scope.row.customer_account)">查看代理关系</el-button>
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
</style>
