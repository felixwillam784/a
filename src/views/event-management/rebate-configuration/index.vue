<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { getRebateConfiguration, deleteRebateConfiguration } from '@/api/event-management';

import useStore from '@/store';
//import { watch } from "fs";

const { user } = useStore();

interface GetRebate {
    method_id: string,
    method_name: string,
    method_description: string,
    fund_type: string,
    code_magnification: string,
    failure_value: string,
    fixed_value: string,
    remark: string,
}

const router = useRouter();

const formData = ref<any>({
    method_name : "",
    fund_type : "",
    activity_time : "",
    code_magnification : "",
    fixed_value : "",
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(4);
const loading = ref<boolean>(false);

const rebateList = ref<Array<GetRebate>>([
    {
        method_id: "1001",
        method_name: "充值方案一",
        method_description: "越南--充100送100",
        fund_type: "real",
        code_magnification: "",
        failure_value: "",
        fixed_value: "无",
        remark: "",
    },
    {
        method_id: "1002",
        method_name: "充值方案二",
        method_description: "越南--充100送101",
        fund_type: "bonus",
        code_magnification: "",
        failure_value: "",
        fixed_value: "",
        remark: "",
    },

])

const handleQuery = () => {
    getData();
}

const handleReset = () => {
}

const addrebateDialog = () => {
    router.push({ name: "AddCode"});
}

const detailrebateDialog = (data : any) => {
    router.push({ name: "DetailCode", params: {data:JSON.stringify(data)}});
}

const getData = async () =>{
    let res = await getRebateConfiguration(user.token, formData.value);
    rebateList.value = res.data.data;
}

const deleteRebate = async (data : any) =>{
    await deleteRebateConfiguration(user.token, data);
}
onMounted(()=>{
    getData();
})
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="search">
                    <el-row>
                        <el-form :model="formData" :inline="true" label-width="120">
                            <el-form-item label="方案名称" prop="betting_odds">
                                <el-input v-model="formData.method_name" placeholder="请输入活动名称" />
                            </el-form-item>
                            <el-form-item label="资金类型" prop="betting_odds">
                                <el-select v-model="formData.fund_type" placeholder="请选择资金类型" style="width: 100%;">
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动有效期" prop="betting_odds">
                                <el-select v-model="formData.activity_time" placeholder="请选择活动有效期" style="width: 100%;">
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row>  
                        <el-form :model="formData" :inline="true" label-width="120">
                            <el-form-item label="打码倍率" prop="activity_days">
                                <el-input v-model="formData.code_magnification" placeholder="请输入打码倍率" />
                            </el-form-item>
                            <el-form-item label="固定经验值" prop="task_count">
                                <el-input v-model="formData.fixed_value" placeholder="请输入固定经验值" />
                            </el-form-item>
                            
                            <el-form-item>
                                <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                                <el-button :icon="Refresh" @click="handleReset">重置</el-button>
                                <el-button >Excel导入</el-button>
                                <el-button :icon="Plus" @click="addrebateDialog">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="rebateList" style="width: 100%;">
                        <el-table-column label="方案ID" align="center" prop="method_id">
                            <template #default="scope">
                                <p>{{ scope.row.method_id }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="方案名称" align="center" prop="method_name">
                            <template #default="scope">
                                <p>{{ scope.row.method_name }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="方案描述" align="center" prop="method_description">
                            <template #default="scope">
                                <p>{{ scope.row.method_description }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="资金类型" align="center" prop="fund_type">
                            <template #default="scope">
                                <p>{{ scope.row.fund_type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="打码倍率" align="center" prop="code_magnification">
                            <template #default="scope">
                                <p>{{ scope.row.code_magnification }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="打码失败条件值" align="center" prop="failure_value">
                            <template #default="scope">
                                <p>{{ scope.row.failure_value }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="打码任务时效（天）0表示无限时" align="center" prop="fixed_value">
                            <template #default="scope">
                                <p>{{ scope.row.fixed_value }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center" prop="remark">
                            <template #default="scope">
                                <p>{{ scope.row.remark }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="danger" link @click="detailrebateDialog(scope.row)">修改</el-button>
                                <el-button type="success" link @click="deleteRebate(scope.row)">删除</el-button>
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

.detail-item-left-bg {
    background-color: #f5f7fa;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 36px;
}

.detail-item-right-bg {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 36px;
}
</style>