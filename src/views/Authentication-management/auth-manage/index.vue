<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface GetCustomerData {
    role_level: string,
    role_type: string,
    role_name: string
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
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(4);

const customerList = ref<Array<GetCustomerData>>([
    {
        role_level: "M1",
        role_type: "senior director",
        role_name: "高级总监"
    },
    {
        role_level: "M2",
        role_type: "director",
        role_name: "总监"
    },    
    {
        role_level: "P1",
        role_type: "Manager",
        role_name: "经理"
    },
    {
        role_level: "P2",
        role_type: "supervisors",
        role_name: "主管"
    }
])

const handleQuery = () => {

}

const resetQuery = () => {

}

const goCustomerDetailPage = () => {
    router.push({ name: "AuthorityDetail" });
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <el-card>
                    <el-table v-loading="loading" :data="customerList" style="width: 100%;">
                        <el-table-column label="角色级别" align="center" prop="nick_name">
                            <template #default="scope">
                                {{ scope.row.role_level }}
                            </template>
                        </el-table-column>
                        <el-table-column label="角色类型" align="center" prop="user_account">
                            <template #default="scope">
                                {{ scope.row.role_type }}
                            </template>
                        </el-table-column>
                        <el-table-column label="角色名称" align="center" prop="id">
                            <template #default="scope">
                                {{ scope.row.role_name }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template #default>
                                <el-button type="primary" link @click="goCustomerDetailPage">编辑</el-button>
                                <el-button type="danger" link>删除</el-button>
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