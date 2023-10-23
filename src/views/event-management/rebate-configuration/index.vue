<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

interface GetRebate {
    id: string,
    no: string,
    type: string,
    betting_odds: string,
    activity_days: string,
    task_count: string,
    remark: string
}

const router = useRouter();

const formData = ref<any>({

    betting_odds: "",
    activity_days: "",
    activity_time: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    task_count: "",
})

const loading = ref<boolean>(false);
const rebateDetailDialogVisible = ref<boolean>(false);
const rebateRemoveDialogVisible = ref<boolean>(false);
const rebateDialogTitle = ref<string>("打码方案修改");
const total = ref<number>(1);
const submitBtnText = ref<string>("确认修改");
const closeBtnText = ref<string>("取消修改");

const rebateList = ref<Array<GetRebate>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        no: "1",
        type: "时效任务",
        betting_odds: "x15",
        activity_days: "5",
        task_count: "20",
        remark: "xx活动专用",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        no: "2",
        type: "时效任务",
        betting_odds: "x10",
        activity_days: "2023-09-12 - 2023-09-19",
        task_count: "20",
        remark: "",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        no: "3",
        type: "永久任务",
        betting_odds: "x20",
        activity_days: "永久",
        task_count: "20",
        remark: "",
    },
])

const rebateItem = ref<GetRebate>({
    id: "",
    no: "",
    type: "",
    betting_odds: "",
    activity_days: "",
    task_count: "",
    remark: "",
})

const handleQuery = () => {
}

const handleReset = () => {
}

const addrebateDialog = () => {

}

const detailrebateDialog = (item: GetRebate) => {
    rebateItem.value = item;
    rebateDetailDialogVisible.value = true;
}

const closeDialog = () => {
    rebateDetailDialogVisible.value = false;
}

const submitForm = () => {

}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-row>
                        <el-form :model="formData" :inline="true" label-width="120">
                            <el-form-item label="打码赔率" prop="betting_odds">
                                <el-input v-model="formData.betting_odds" placeholder="请输入查询的打码赔率" />
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row>  
                        <el-form :model="formData" :inline="true" label-width="120">
                            <el-form-item label="活动天数" prop="activity_days">
                                <el-input v-model="formData.activity_days" placeholder="请输入查询的活动天数" />
                            </el-form-item>
                            <el-form-item label="活动时间:">
                                <el-date-picker type="daterange" v-model="formData.activity_time" range-separator="至"
                                    start-placeholder="请选择" end-placeholder="请选择" value-format="YYYY-MM-DD">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="任务次数" prop="task_count">
                                <el-input v-model="formData.task_count" placeholder="请输入查询的活动次数" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                                <el-button :icon="Refresh" @click="handleReset">重置</el-button>
                                <el-button  @click="addrebateDialog">Excel导入</el-button>
                                <el-button :icon="Plus" @click="addrebateDialog">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="rebateList" style="width: 100%;">
                        <el-table-column label="打码方案" align="center" prop="nick_name">
                            <template #default="scope">
                                <p>{{ scope.row.no }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="资金任务类型" align="center" prop="user_account">
                            <template #default="scope">
                                <p>{{ scope.row.type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="资金任务转换赔率" align="center" prop="rebateout_time">
                            <template #default="scope">
                                <p>{{ scope.row.betting_odds }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="资金活动周期" align="center" prop="creation_reason">
                            <template #default="scope">
                                <p>{{ scope.row.activity_days }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="资金任务次数" align="center" prop="operator">
                            <template #default="scope">
                                <p>{{ scope.row.task_count }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center" prop="ban_remark">
                            <template #default="scope">
                                <p>{{ scope.row.remark }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="danger" link @click="detailrebateDialog(scope.row)">详情</el-button>
                                <el-button type="success" link @click="removerebateDialog(scope.row)">移除黑名单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog :title="rebateDialogTitle" v-model="rebateDetailDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-form label-width="160px">
                <el-form-item label="打码方案:">
                    <el-input v-model="rebateItem.user_account" />
                </el-form-item>
                <el-form-item label="资金任务类型:">
                    <el-input v-model="rebateItem.creation_reason" />
                </el-form-item>
                <el-form-item label="资金任务类型:">
                    <el-input v-model="rebateItem.creation_reason" />
                </el-form-item>
                <el-form-item label="资金任务天数:">
                    <el-input v-model="rebateItem.creation_reason" />
                </el-form-item>
                <el-form-item prop="creation_reason">
                    <template #label>
                        <span>资金任务具体时间</span>
                    </template>
                    <el-date-picker v-model="rebateItem.creation_reason" type="date" placeholder="请选择活动开启时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item prop="creation_reason">
                    <template #label>
                    </template>
                    <el-date-picker v-model="rebateItem.creation_reason" type="date" placeholder="请选择活动结束时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="资金任务次数:">
                    <el-input v-model="rebateItem.creation_reason" placeholder="请输入资金任务次数，填0表示无限次"/>
                </el-form-item>
                <el-form-item label="原备注:">
                    <el-input v-model="rebateItem.creation_reason" />
                </el-form-item>
            </el-form>
            <el-form :model="rebateItem">
                <el-row style="align-items: center;">
                    <h3>修改备注</h3>
                </el-row>
                <el-form-item prop="ban_remark">
                    <el-input type="textarea" :rows="6" v-model="rebateItem.ban_remark" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">{{ submitBtnText }}</el-button>
                    <el-button @click="resetForm">{{ closeBtnText }}</el-button>
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