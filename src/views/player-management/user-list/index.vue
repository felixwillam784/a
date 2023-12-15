<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

import useStore from '@/store';

import { onMounted } from "vue";
import { getUserListApi } from '@/api/Players';

const router = useRouter();

interface GetCustomerData {
    id: string
    user_account: string
    nick_name: string
    customer_type: string
    vip_level: string
    account_status: number | string
    prohibited_withdrawal: number | string
    frozen_state: number | string,
    user_tag: string
    registration_time: string
}

const formData = ref<any>({
    user_account: "",
    nick_name: "",
    customer_type: "",
    invitation_id: "",
    customer_label: "",
    vip_level: "",
    phone_number: "",
    user_cpf: "",
    card_number: "",
    page_num: 1,
    page_size: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(2);

const customerList = ref<Array<GetCustomerData>>([

])

const { user } = useStore();

onMounted(()=>{
    handleQuery();
})
const handleQuery = async () => {
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
}
const getData = async () => {
    let userListRes = await getUserListApi(user.token, formData.value);
    customerList.value = userListRes.data.data;
    total.value = customerList.value.length;
}
const resetQuery = () => {
    for (let property in formData.value) {
        if (formData.value.hasOwnProperty(property)) {
           formData.value[property] = "";
        }
    }
}

const goCustomerDetailPage = (id:string) => {
    router.push({ name: "UserDetail", params:{id:id}});
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="客户账号" prop="user_account">
                            <el-input v-model="formData.user_account" placeholder="请输入客户账号" clearable />
                        </el-form-item>
                        <el-form-item label="客户昵称" prop="nick_name">
                            <el-input v-model="formData.nick_name" placeholder="请输入客户昵称" clearable />
                        </el-form-item>
                        <el-form-item label="客户类型" prop="customer_type">
                            <el-select v-model="formData.customer_type" placeholder="请选择客户类型" clearable>
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="邀请ID" prop="invitation_id">
                            <el-input v-model="formData.invitation_id" placeholder="请输入用户邀请ID" clearable />
                        </el-form-item>
                        <el-form-item label="客户标签" prop="customer_label">
                            <el-select v-model="formData.customer_label" placeholder="请选择客户标签" clearable>
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="VIP等级" prop="vip_level">
                            <el-select v-model="formData.vip_level" placeholder="请输入VIP等级" clearable>
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="手机号" prop="phone_number">
                            <el-input v-model="formData.phone_number" placeholder="请输入手机号" clearable />
                        </el-form-item>
                        <el-form-item label="CPF" prop="user_cpf">
                            <el-input v-model="formData.user_cpf" placeholder="请输入用户CPF" clearable />
                        </el-form-item>
                        <el-form-item label="银行卡号" prop="card_number">
                            <el-input v-model="formData.card_number" placeholder="请输入银行卡号" clearable />
                        </el-form-item>
                    </el-form>
                </div>
                <el-card>
                    <el-table v-loading="loading" :data="customerList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name" width="160">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">
                                    {{ scope.row.nick_name }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户账号" align="center" prop="user_account" width="160">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">
                                    {{ scope.row.user_account }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户ID" align="center" prop="id" width="200">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">
                                    {{ scope.row.id }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户类型" width="100" align="center" prop="customer_type" />
                        <el-table-column label="VIP等级" width="120" align="center" prop="vip_level" />
                        <el-table-column label="账号状态" align="center" prop="account_status">
                            <template #default="scope">
                                <p v-if="scope.row.account_status == 0">正常</p>
                                <p v-else>异常</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="禁止提现" align="center" prop="prohibited_withdrawal">
                            <template #default="scope">
                                <p v-if="scope.row.prohibited_withdrawal == 0">否</p>
                                <p plain v-else>是</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="冻结状态" align="center" prop="frozen_state">
                            <template #default="scope">
                                <p plain v-if="scope.row.frozen_state == 0">正常</p>
                                <p plain v-else>异常</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户标记" align="center" prop="user_tag" width="180"></el-table-column>
                        <el-table-column label="注册时间" align="center" prop="registration_time" width="180"></el-table-column>
                        <el-table-column label="操作" align="center" width="200" fixed="right">
                            <template #default="scope">
                                <el-button type="danger" link @click="goCustomerDetailPage(scope.row.id)">详情</el-button>
                                <el-button type="danger" link>提现封禁</el-button>
                                <el-button type="danger" link>拉黑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="float: right;">
                        <pagination v-if="total > 0" :total="total" v-model:page="formData.page_num"
                            v-model:limit="formData.page_size" @pagination="handleQuery" />
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