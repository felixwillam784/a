<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import {getUserDetailTable, getUserDetailApi, getUserDetailDepositWithdrawl, getUserDetailAgent} from '@/api/Players'
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
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_label: "用户备注",
        flow_amount: -999,
        flow_type: "下注",
        flow_time: "2023-07-12 10:23:24",
    },
])
const handleChange = () => {

}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

onMounted(()=>{
    getData();
})

const getData = async () =>{
}

const gotToRelationPage = (user_account:string) =>{
    router.push({name:'AgencyRelation', params:{user_account:user_account}}, );
}

</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <div style="margin-right: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'AgencyDetail')">用户详情</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'AgencySetting')">资金明细</el-button>
            </div>
        </div>
        <div class="search">
            <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                <el-form-item label="客户标签" prop="customer_label">
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
                <el-table-column label="用户ID" align="center" prop="id" width="200" />
                <el-table-column label="用户账号" align="center" prop="customer_account" width="200" />
                <el-table-column label="用户名" width="200" align="center" prop="customer_name" />
                <el-table-column label="用户标签" width="200" align="center" prop="customer_label" />
                <el-table-column label="流水金额" width="200" align="center" prop="flow_amount">
                    <template #default="scope">
                        <Font color="green" v-if="scope.row.flow_amount > 0">
                            ${{ scope.row.flow_amount }}
                        </Font>
                        <Font color="red" v-else>
                            -${{ scope.row.flow_amount }}
                        </Font>
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center" prop="flow_type" width="120"></el-table-column>
                <el-table-column label="时间" align="center" prop="flow_time"></el-table-column>
                <el-table-column align="center">
                    <template #default="scope">
                        <el-button type="danger" link @click="gotToRelationPage(scope.row.id)">详情</el-button>
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
