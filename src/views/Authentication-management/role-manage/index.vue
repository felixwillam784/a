<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

interface GetVIPData {
    role_account: string,
    role_user: string,
    role_level: string,
    role_type: string,
    role_name: string,
    role_status: boolean,
}

const router = useRouter();

const formData = ref<any>({
    role_account: "",
    role_level: "",
    user:"",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const vipDialogVisible = ref<boolean>(false);
const vipDialogTitle = ref<string>("VIP信息修改");
const total = ref<number>(3);
const modifyReason = ref<string>("");
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");

const vipList = ref<Array<GetVIPData>>([
    {
        role_account: "admin_A",
        role_user: "admin_A",
        role_level: "M1",
        role_type: "senior director",
        role_name: "高级总监",
        role_status: true,
    },
    {
        role_account: "admin_B",
        role_user: "admin_B",
        role_level: "M2",
        role_type: "director",
        role_name: "总监",
        role_status: false,
    },
    {
        role_account: "admin_C",
        role_user: "admin_C",
        role_level: "P1",
        role_type: "Manager",
        role_name: "经理",
        role_status: true,
    },
    {
        role_account: "admin_D",
        role_user: "admin_D",
        role_level: "P2",
        role_type: "supervisors",
        role_name: "主管",
        role_status: true,
    },
])
const handleQuery = () => {
}

</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="角色账号" prop="vip_level">
                            <el-input v-model="formData.role_account" placeholder="请输入角色账号" clearable />
                        </el-form-item>
                        <el-form-item label="角色级别" prop="customer_name">
                            <el-input v-model="formData.role_level" placeholder="请输入角色级别" clearable />
                        </el-form-item>
                        <el-form-item label="使用者" prop="customer_name">
                            <el-input v-model="formData.user" placeholder="请输入用户使用者" clearable />
                        </el-form-item>
                        <el-form-item style="float:right">
                            <el-button type="primary" @click="handleQuery">新增角色</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="vipList" style="width: 100%;">
                        <el-table-column label="角色账号" align="center" prop="role_account"/>
                        <el-table-column label="角色使用者" align="center" prop="role_user"/>
                        <el-table-column label="角色级别" width="140" align="center" prop="role_level" />
                        <el-table-column label="角色类型" width="140" align="center" prop="role_type" />
                        <el-table-column label="角色名称" align="center" prop="role_name"></el-table-column>
                        <el-table-column label="角色状态" align="center" prop="role_status">
                            <template #default="scope">
                                <p v-if="scope.row.role_status" style="color:green">启用</p>
                                <p v-else style="color:red">禁用</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" fixed="right">
                            <template #default="scope">
                                <el-button type="primary" link>编辑</el-button>
                                <el-button v-if="scope.row.role_status" type="danger" link>停用</el-button>
                                <el-button v-else type="success" link>启用</el-button>
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