<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus, Setting, Download } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

interface GetKOLData {
    id: string
    account: string
    name: string
    type: string
    label: string
    rating: string
    growth_rate: number
    new_recruit_number: number
    compliance_rate: number
    agent_number: number
}

const router = useRouter();

const formData = ref<any>({
    customer_account: "",
    customer_name: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const kolDialogVisible = ref<boolean>(false);
const total = ref<number>(2);
const modifyReason = ref<string>("");

const kolList = ref<Array<GetKOLData>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        account: "test777@gmail.com",
        name: "UserName10001",
        type: "KOL用户",
        label: "KOL",
        rating: "正常",
        growth_rate: 10,
        new_recruit_number: 11,
        compliance_rate: 110,
        agent_number: 198,
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        account: "test777@gmail.com",
        name: "UserName10001",
        type: "KOL用户",
        label: "二级KOL",
        rating: "A级",
        growth_rate: 10,
        new_recruit_number: 10,
        compliance_rate: 90,
        agent_number: 198,
    },
])

const kolItem = ref<GetKOLData>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    account: "test777@gmail.com",
    name: "UserName10001",
    type: "KOL用户",
    label: "KOL",
    rating: "正常",
    growth_rate: 10,
    new_recruit_number: 11,
    compliance_rate: 110,
    agent_number: 198,
})

const typeOptions = ref<any[]>([
    {
        label: "KOL用户",
        value: "KOL用户"
    }
])

const labelOptions = ref<Array<any>>([
    {
        label: "KOL",
        value : "KOL"
    },
    {
        label: "二级KOL",
        value : "二级KOL"
    },
])

const handleQuery = () => {
}

const resetQuery = () => {
}

const editKOLDialog = (item: GetKOLData) => {
    kolItem.value = item;
    kolDialogVisible.value = true;
}

const closeDialog = () => {
    kolDialogVisible.value = false;
}

const goKOLSettingPage = () => {
    router.push({name: "KOL General Settings"});
}

const submitForm = () => {

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
                            <el-button type="primary" :icon="Download">导出报表</el-button>
                            <el-button type="primary" :icon="Setting" @click="goKOLSettingPage">KOL设置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="kolList" style="width: 100%;">
                        <el-table-column label="KOL账号" align="center" prop="account" width="200" />
                        <el-table-column label="KOL名字" align="center" prop="name" width="200" />
                        <el-table-column label="标签" width="200" align="center" prop="label" />
                        <el-table-column label="KOL评级" width="200" align="center" prop="rating" />
                        <el-table-column label="环比新增率" align="center" prop="growth_rate" width="200">
                            <template #default="scope">
                                <p>{{ scope.row.growth_rate }}%</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="本周新增" align="center" prop="new_recruit_number">
                        </el-table-column>
                        <el-table-column label="达标率" align="center" prop="compliance_rate">
                            <template #default="scope">
                                <p>{{ scope.row.compliance_rate }}%</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="总代理人数" align="center" prop="agent_number"></el-table-column>
                        <el-table-column align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="success" @click="editKOLDialog(scope.row)" plain>设置</el-button>
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

        <!-- KOL信息修改 -->
        <el-dialog v-model="kolDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-form ref="dataFormRef" label-width="140px">
                <el-form-item label="客户ID:">
                    <el-input v-model="kolItem.id" />
                </el-form-item>
                <el-form-item label="用户账号:">
                    <el-input v-model="kolItem.account" />
                </el-form-item>
                <el-form-item label="用户名:">
                    <el-input v-model="kolItem.name" />
                </el-form-item>
                <el-form-item label="客户类型:">
                    <el-select v-model="kolItem.type">
                        <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="KOL标签:">
                    <el-select v-model="kolItem.label">
                        <el-option v-for="(item, index) in labelOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="每周新增需求设定:">
                    <el-input v-model="kolItem.new_recruit_number"/>
                </el-form-item>
            </el-form>
            <el-form>
                <el-row style="align-items: center;">
                    <Font color="red" style="font-size: 20px;">*</Font>
                    <h3>修改原因:</h3>
                </el-row>
                <el-input type="textarea" :rows="6" v-model="modifyReason" />
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">保存修改</el-button>
                    <el-button @click="closeDialog">取消修改</el-button>
                </div>
            </template>
        </el-dialog>
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