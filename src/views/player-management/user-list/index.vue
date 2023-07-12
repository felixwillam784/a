<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref<any>({
    customer_account: "",
    customer_name: "",
    customer_type: "",
    customer_label: "",
    vip_level: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(2);

const customerList = ref<Array<any>>([
    {
        customer_id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_type: "一般用户",
        vip_level: "LV0",
        account_status: 0,
        prohibited_withdrawal: 0,
        frozen_state: 0,
        label: "用户备注",
    },
    {
        customer_id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10002",
        customer_type: "一般用户",
        vip_level: "LV1",
        account_status: 1,
        prohibited_withdrawal: 1,
        frozen_state: 1,
        label: "用户备注",
    }
])

const handleQuery = () => {

}

const resetQuery = () => {

}

const goCustomerDetailPage = () => {
    router.push({ name: "User Detail" });
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="客户账号" prop="keywords">
                            <el-input v-model="formData.customer_account" placeholder="请输入客户账号" clearable
                                style="width: 200px" />
                        </el-form-item>

                        <el-form-item label="客户名字" prop="status">
                            <el-input v-model="formData.customer_name" placeholder="请输入客户账号" clearable
                                style="width: 200px" />
                        </el-form-item>
                    </el-form>
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="客户类型" prop="status">
                            <el-select v-model="formData.customer_type" placeholder="请选择客户类型" clearable
                                style="width: 200px">
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="客户标签" prop="status">
                            <el-select v-model="formData.customer_label" placeholder="请选择客户类型" clearable
                                style="width: 200px">
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="VIP等级" prop="status">
                            <el-select v-model="formData.vip_level" placeholder="请输入VIP等级" clearable style="width: 200px">
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="customerList" style="width: 100%;">

                        <el-table-column key="customer_id" label="用户ID" align="center" prop="customer_id" width="200" />
                        <el-table-column key="customer_account" label="用户账号" align="center" prop="customer_account"
                            width="160" />
                        <el-table-column label="用户名" width="160" align="center" prop="customer_name" />
                        <el-table-column label="用户类型" width="100" align="center" prop="customer_type" />
                        <el-table-column label="VIP等级" width="120" align="center" prop="vip_level" />

                        <el-table-column label="账号状态" align="center" prop="account_status">
                            <template #default="scope">
                                <el-button type="success" plain v-if="scope.row.account_status == 0">正常</el-button>
                                <el-button type="danger" plain v-else>异常</el-button>
                            </template>
                        </el-table-column>

                        <el-table-column label="禁止提现" align="center" prop="prohibited_withdrawal">
                            <template #default="scope">
                                <el-button type="success" plain v-if="scope.row.prohibited_withdrawal == 0">否</el-button>
                                <el-button type="danger" plain v-else>是</el-button>
                            </template>
                        </el-table-column>

                        <el-table-column label="冻结状态" align="center" prop="frozen_state">
                            <template #default="scope">
                                <el-button type="success" plain v-if="scope.row.frozen_state == 0">否</el-button>
                                <el-button type="danger" plain v-else>是</el-button>
                            </template>
                        </el-table-column>

                        <el-table-column label="标签" align="center" prop="label" width="180"></el-table-column>

                        <el-table-column label="操作" align="center" width="400" fixed="right">
                            <template #default="scope">
                                <el-button type="primary" @click="goCustomerDetailPage" plain>详情</el-button>
                                <el-button type="primary" plain>充值</el-button>
                                <el-button type="primary" plain>流水</el-button>
                                <el-button type="primary" plain>黑名单</el-button>
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
