<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus, ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'

interface GetWithdrawalReview {
    id: string,
    nick_name: string
    user_account: string
    withdrawal_amount: number | string
    actual_amount: number | string
    order_status: string
    risk_control_hint: string
    order_number: string
    platform_order_number: string
    upstream_order_number: string
    handling_fee: number | string
    operation_time: string
    total_recharge: number | string
    total_withdrawal: number | string
    withdrawal_channel: string
    withdrawal_method: string
    operator: string
    submission_time: string
}

interface RejectInterface {
    reject_reason: string
    remark: string
}

const router = useRouter();

const formData = ref<any>({
    invitation_code: "",
    risk_control_status: "未风控",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const withdrawalReviewDetailDialogVisible = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>()
const passDialogVisible = ref<boolean>(false);
const rejectDialogVisible = ref<boolean>(false);
const rejectItem = ref<RejectInterface>({
    reject_reason: "",
    remark: ""
})
const total = ref<number>(2);

const rules = ref<FormRules<RejectInterface>>({
    remark: [
        { required: true, message: '请输入备注。', trigger: 'blur' },
    ],
});

const withdrawalReviewList = ref<Array<GetWithdrawalReview>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        nick_name: "UserName10001",
        user_account: "test777@gmail.com",
        withdrawal_amount: 999,
        actual_amount: 999,
        order_status: "待处理",
        risk_control_hint: "未风控",
        order_number: "123456789",
        platform_order_number: "XXXXXXXXXXXXXXXXXXXXXXX",
        upstream_order_number: "YYYYYYYYYYYYYYYYYYYYYYY",
        handling_fee: 1,
        operation_time: "2023-07-12 19:00:00",
        total_recharge: 1000,
        total_withdrawal: 999,
        withdrawal_channel: "XXXXXXXXXXX",
        withdrawal_method: "GCASH.MAYA.BANK",
        operator: "UserName",
        submission_time: "2023-07-10 19:00:00",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        nick_name: "UserName10001",
        user_account: "test777@gmail.com",
        withdrawal_amount: 999,
        actual_amount: 999,
        order_status: "启动代付",
        risk_control_hint: "未风控",
        order_number: "123456789",
        platform_order_number: "XXXXXXXXXXXXXXXXXXXXXXX",
        upstream_order_number: "YYYYYYYYYYYYYYYYYYYYYYY",
        handling_fee: 1,
        operation_time: "2023-07-12 19:00:00",
        total_recharge: 1000,
        total_withdrawal: 999,
        withdrawal_channel: "XXXXXXXXXXX",
        withdrawal_method: "GCASH.MAYA.BANK",
        operator: "UserName",
        submission_time: "2023-07-10 19:00:00",
    },
])

const withdrawalReviewItem = ref<GetWithdrawalReview>({
    id: "",
    nick_name: "UserName10001",
    user_account: "test777@gmail.com",
    withdrawal_amount: 999,
    actual_amount: 999,
    order_status: "待处理",
    risk_control_hint: "未风控",
    order_number: "123456789",
    platform_order_number: "XXXXXXXXXXXXXXXXXXXXXXX",
    upstream_order_number: "YYYYYYYYYYYYYYYYYYYYYYY",
    handling_fee: 1,
    operation_time: "2023-07-12 19:00:00",
    total_recharge: 1000,
    total_withdrawal: 999,
    withdrawal_channel: "XXXXXXXXXXX",
    withdrawal_method: "GCASH.MAYA.BANK",
    operator: "UserName",
    submission_time: "2023-07-10 19:00:00",
})

const riskControlOptions = ref<Array<any>>([
    {
        label: "未风控",
        value: "未风控"
    }
])

const rejectOptions = ref<Array<any>>([
    {
        label: "",
        value: ""
    }
])

const handleQuery = () => {
}

const resetQuery = () => {
}

const detailWithdrawalReviewDialog = (item: GetWithdrawalReview) => {
    withdrawalReviewItem.value = item;
    withdrawalReviewDetailDialogVisible.value = true;
}

const closeDialog = () => {
    withdrawalReviewDetailDialogVisible.value = false;
}

const passDialogShow = () => {
    passDialogVisible.value = true;
}

const closePassDialog = () => {
    passDialogVisible.value = false;
}

const rejectDialogShow = () => {
    rejectDialogVisible.value = true;
}

const closeRejectDialog = () => {
    rejectDialogVisible.value = false;
}

const rejectSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const goBack = () => {
    router.go(-1);
}
</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
            <el-button type="primary" style="margin-left: auto;">批量同意</el-button>
        </div>
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <el-card>
                    <el-row style="align-items: center;">
                        <el-col :span="24">
                            <h4 style="margin-left: 40px;">筛选条件</h4>
                        </el-col>
                        <el-col :span="24" :md="12" :lg="18">
                            <el-form :model="formData" :inline="true" label-width="100">
                                <el-form-item label="邀请码" prop="invitation_code">
                                    <el-input v-model="formData.invitation_code" placeholder="请输入客户邀请码" />
                                </el-form-item>
                                <el-form-item label="风控状态" prop="risk_control_status">
                                    <el-select v-model="formData.risk_control_status" placeholder="请选择风控状态">
                                        <el-option v-for="(item, index) in riskControlOptions" :label="item.label"
                                            :value="item.value" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card style="margin-top: 20px;">
                    <el-table v-loading="loading" :data="withdrawalReviewList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name" />
                        <el-table-column label="用户账号" align="center" prop="user_account">
                            <template #default="scope">
                                <p>{{ scope.row.user_account }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="提现金额" align="center" prop="withdrawal_amount">
                            <template #default="scope">
                                <p>${{ scope.row.withdrawal_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="实到金额" align="center" prop="actual_amount">
                            <template #default="scope">
                                <p>${{ scope.row.actual_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单状态" align="center" prop="order_status">
                            <template #default="scope">
                                <Font color="green" v-if="scope.row.order_status == '已打款'">{{ scope.row.order_status }}
                                </Font>
                                <Font color="red" v-else-if="scope.row.order_status == '已拒绝'">{{ scope.row.order_status }}
                                </Font>
                                <Font v-else>{{ scope.row.order_status }}</Font>
                            </template>
                        </el-table-column>
                        <el-table-column label="风控提示" align="center" prop="risk_control_hint">
                            <template #default="scope">
                                <Font color="red"
                                    v-if="scope.row.risk_control_hint == 'IP风控' || scope.row.risk_control_hint == '一级风控'">{{
                                        scope.row.risk_control_hint }}</Font>
                                <Font v-else>{{ scope.row.risk_control_hint }}</Font>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单号" align="center" prop="order_number">
                            <template #default="scope">
                                <p>{{ scope.row.order_number }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单提交时间" align="center" prop="submission_time">
                            <template #default="scope">
                                <p>{{ scope.row.submission_time }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="primary" plain
                                    @click="detailWithdrawalReviewDialog(scope.row)">详情</el-button>
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

        <el-dialog title="提现审核详情" v-model="withdrawalReviewDetailDialogVisible" width="600px" append-to-body
            @close="closeDialog">
            <el-dialog v-model="passDialogVisible" width="500px" title="确认提现通过" append-to-body
                style="text-align: center; margin-top: 400px;">
                <p>订单审核提现通过，订单进入启动代付状态?</p>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button type="primary">通过</el-button>
                        <el-button @click="closePassDialog">取消</el-button>
                    </div>
                </template>
            </el-dialog>
            <el-dialog v-model="rejectDialogVisible" width="500px" title="确认拒绝提现" append-to-body
                style="text-align: center; margin-top: 400px;">
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">拒绝原因:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-select v-model="rejectItem.reject_reason" placeholder="请选择拒绝原因">
                            <el-option v-for="(item, index) in rejectOptions" :label="item.label" :value="item.value"
                                :key="index"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-form ref="ruleFormRef" :rules="rules" :model="rejectItem">
                    <el-row style="align-items: center;">
                        <Font color="red" style="font-size: 20px;">*</Font>
                        <h3>备注</h3>
                    </el-row>
                    <el-form-item prop="remark">
                        <el-input type="textarea" :rows="4" v-model="rejectItem.remark" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button type="warning" @click="rejectSubmit(ruleFormRef)">拒绝</el-button>
                        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                    </div>
                </template>
            </el-dialog>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户ID:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.id }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.user_account }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户名:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.nick_name }}</p>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-col :span="6" class="detail-item-left-bg">订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.order_number }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">通道订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.platform_order_number }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">上游订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.upstream_order_number }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">提现金额:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>${{ Number(withdrawalReviewItem.withdrawal_amount).toFixed(2) }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">实到金额:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>${{ Number(withdrawalReviewItem.actual_amount).toFixed(2) }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">手续费:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>${{ Number(withdrawalReviewItem.handling_fee).toFixed(2) }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">订单提交时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.submission_time }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">订单操作时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.operation_time }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户总充值:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>${{ Number(withdrawalReviewItem.total_recharge).toFixed(2) }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户总提现:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>${{ Number(withdrawalReviewItem.total_withdrawal).toFixed(2) }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">提现渠道:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.withdrawal_channel }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">提现方式:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.withdrawal_method }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">风控提示:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <Font color="red"
                        v-if="withdrawalReviewItem.risk_control_hint == 'IP风控' || withdrawalReviewItem.risk_control_hint == '一级风控'">
                        {{ withdrawalReviewItem.risk_control_hint }}
                    </Font>
                    <Font v-else>{{ withdrawalReviewItem.risk_control_hint }}</Font>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">操作人员:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.operator }}</p>
                </el-col>
            </el-row>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="passDialogShow">通过</el-button>
                    <el-button type="warning" @click="rejectDialogShow">拒绝</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </div>
                <!-- <div class="dialog-footer">
                    <el-button @click="closeDialog">确认</el-button>
                </div> -->
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss">
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}

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

.remark-form {
    .el-form-item__content {
        margin-left: 0px !important;
    }
}
</style>