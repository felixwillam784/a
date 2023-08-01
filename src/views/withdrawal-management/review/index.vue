<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
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
    gaia_order_number: string,
    successful_recharge_times: number | string
    withdrawal_status: number | string
    withdrawal_times: number | string
    kol_user: string
    platform_order_number: string
    upstream_order_number: string
    upstream_channel: string
    handling_fee: number | string
    free_charge: number | string
    order_update_time: string
    total_recharge: number | string
    total_withdrawal: number | string
    withdrawal_channel: string
    withdrawal_method: string
    review_status: number
    operator: string
    submission_time: string
}

interface RejectInterface {
    reject_reason: string
    remark: string
}

const router = useRouter();

const formData = ref<any>({
    user_account: "",
    nick_name: "",
    invitation_code: "",
    submission_time: "",
    wick_time: "",
    platform_order_number: "",
    upstream_order_number: "",
    order_status: "待处理",
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
const total = ref<number>(5);

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
        order_number: "566756756756768568",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        successful_recharge_times: 99,
        withdrawal_status: "否",
        withdrawal_times: 11,
        kol_user: "KOL用户",
        platform_order_number: "P2Champspay_daishou",
        upstream_order_number: "TP212334234234234234",
        upstream_channel: "P2Champspay_daishou",
        handling_fee: 1,
        free_charge: 1,
        order_update_time: "2023-07-12 19:00:00",
        total_recharge: 1000,
        total_withdrawal: 999,
        withdrawal_channel: "XXXXXXXXXXX",
        withdrawal_method: "GCASH.MAYA.BANK",
        operator: "UserName",
        review_status: 0,
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
        order_number: "566756756756768568",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        successful_recharge_times: 99,
        withdrawal_status: "是",
        withdrawal_times: 0,
        kol_user: "KOL用户",
        platform_order_number: "P2Champspay_daishou",
        upstream_order_number: "TP212334234234234234",
        upstream_channel: "P2Champspay_daishou",
        handling_fee: 1,
        free_charge: 1,
        order_update_time: "2023-07-12 19:00:00",
        total_recharge: 1000,
        total_withdrawal: 999,
        withdrawal_channel: "XXXXXXXXXXX",
        withdrawal_method: "GCASH.MAYA.BANK",
        operator: "UserName",
        review_status: 0,
        submission_time: "2023-07-10 19:00:00",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        nick_name: "UserName10001",
        user_account: "test777@gmail.com",
        withdrawal_amount: 999,
        actual_amount: 999,
        order_status: "已拒绝",
        risk_control_hint: "IP风控",
        order_number: "566756756756768568",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        successful_recharge_times: 99,
        withdrawal_status: "否",
        withdrawal_times: 11,
        kol_user: "KOL用户",
        platform_order_number: "P2Champspay_daishou",
        upstream_order_number: "TP212334234234234234",
        upstream_channel: "P2Champspay_daishou",
        handling_fee: 1,
        free_charge: 1,
        order_update_time: "2023-07-12 19:00:00",
        total_recharge: 1000,
        total_withdrawal: 999,
        withdrawal_channel: "XXXXXXXXXXX",
        withdrawal_method: "GCASH.MAYA.BANK",
        review_status: 1,
        operator: "UserName",
        submission_time: "2023-07-10 19:00:00",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        nick_name: "UserName10001",
        user_account: "test777@gmail.com",
        withdrawal_amount: 999,
        actual_amount: 999,
        order_status: "已退款",
        risk_control_hint: "一级风控",
        order_number: "566756756756768568",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        successful_recharge_times: 99,
        withdrawal_status: "否",
        withdrawal_times: 11,
        kol_user: "KOL用户",
        platform_order_number: "P2Champspay_daishou",
        upstream_order_number: "TP212334234234234234",
        upstream_channel: "P2Champspay_daishou",
        handling_fee: 1,
        free_charge: 1,
        order_update_time: "2023-07-12 19:00:00",
        total_recharge: 1000,
        total_withdrawal: 999,
        withdrawal_channel: "XXXXXXXXXXX",
        withdrawal_method: "GCASH.MAYA.BANK",
        review_status: 0,
        operator: "UserName",
        submission_time: "2023-07-10 19:00:00",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        nick_name: "UserName10001",
        user_account: "test777@gmail.com",
        withdrawal_amount: 999,
        actual_amount: 999,
        order_status: "已打款",
        risk_control_hint: "未风控",
        order_number: "566756756756768568",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        successful_recharge_times: 99,
        withdrawal_status: "否",
        withdrawal_times: 11,
        kol_user: "KOL用户",
        platform_order_number: "P2Champspay_daishou",
        upstream_order_number: "TP212334234234234234",
        upstream_channel: "P2Champspay_daishou",
        handling_fee: 1,
        free_charge: 1,
        order_update_time: "2023-07-12 19:00:00",
        total_recharge: 1000,
        total_withdrawal: 999,
        withdrawal_channel: "XXXXXXXXXXX",
        withdrawal_method: "GCASH.MAYA.BANK",
        review_status: 1,
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
    order_number: "566756756756768568",
    gaia_order_number: "65rttfer5qweqwedsfsdf",
    successful_recharge_times: 99,
    withdrawal_status: "否",
    withdrawal_times: 11,
    kol_user: "KOL用户",
    platform_order_number: "P2Champspay_daishou",
    upstream_order_number: "TP212334234234234234",
    upstream_channel: "P2Champspay_daishou",
    handling_fee: 1,
    free_charge: 1,
    order_update_time: "2023-07-12 19:00:00",
    total_recharge: 1000,
    total_withdrawal: 999,
    withdrawal_channel: "XXXXXXXXXXX",
    withdrawal_method: "GCASH.MAYA.BANK",
    review_status: 0,
    operator: "UserName",
    submission_time: "2023-07-10 19:00:00",
})

const orderStatusOptions = ref<Array<any>>([
    {
        label: "待处理",
        value: "待处理"
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

const goBulkPassPage = () => {
    // router.push({name: "Bulk Pass"});
}

const goBulkRejectPage = () => {
    // router.push({name: "Bulk Reject"});
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <el-card>
                    <el-row style="align-items: center;">
                        <el-col :span="24" :md="12" :lg="18">
                            <el-form :model="formData" :inline="true" label-width="100">
                                <el-form-item label="用户账号" prop="user_account">
                                    <el-input v-model="formData.user_account" placeholder="请输入用户账号" />
                                </el-form-item>
                                <el-form-item label="客户昵称" prop="nick_name">
                                    <el-input v-model="formData.nick_name" placeholder="请输入客户昵称" />
                                </el-form-item>
                                <el-form-item label="邀请码" prop="invitation_code">
                                    <el-input v-model="formData.invitation_code" placeholder="请输入客户邀请码" />
                                </el-form-item>
                            </el-form>
                            <el-form :model="formData" :inline="true" label-width="100">
                                <el-form-item label="订单提交时间" prop="submission_time">
                                    <el-date-picker v-model="formData.submission_time" type="date" placeholder="选择提交时间"
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                                </el-form-item>
                                <el-form-item label="订单更新时间" prop="wick_time">
                                    <el-date-picker v-model="formData.wick_time" type="date" placeholder="选择更新时间"
                                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                                </el-form-item>
                                <el-form-item label="订单状态" prop="order_status">
                                    <el-select v-model="formData.order_status" placeholder="选择订单状态">
                                        <el-option v-for="(item, index) in orderStatusOptions" :label="item.label"
                                            :value="item.value" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <el-form :model="formData" :inline="true" label-width="100">
                                <el-form-item label="平台订单号" prop="platform_order_number">
                                    <el-input v-model="formData.platform_order_number" placeholder="请输入平台订单号" />
                                </el-form-item>
                                <el-form-item label="上游订单号" prop="upstream_order_number">
                                    <el-input v-model="formData.upstream_order_number" placeholder="请输入上游订单号" />
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="24" :md="12" :lg="6">
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                            <el-button @click="goBulkPassPage">批量同意</el-button>
                            <el-button @click="goBulkRejectPage">批量拒绝</el-button>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card style="margin-top: 20px;">
                    <el-table v-loading="loading" :data="withdrawalReviewList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name" width="160">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;"
                                    @click="router.push({ name: 'UserDetail' })">
                                    {{ scope.row.nick_name }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户账号" align="center" prop="user_account" width="160">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;"
                                    @click="router.push({ name: 'UserDetail' })">
                                    {{ scope.row.user_account }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="提现金额" align="center" prop="withdrawal_amount" width="120">
                            <template #default="scope">
                                <p>${{ scope.row.withdrawal_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="实到金额" align="center" prop="actual_amount" width="120">
                            <template #default="scope">
                                <p>${{ scope.row.actual_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="免手续费" align="center" prop="free_charge" width="120">
                            <template #default="scope">
                                <p>${{ scope.row.free_charge.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单状态" align="center" prop="order_status" width="120">
                            <template #default="scope">
                                <Font color="green" v-if="scope.row.order_status == '已打款'">{{ scope.row.order_status }}
                                </Font>
                                <Font color="red" v-else-if="scope.row.order_status == '已拒绝'">{{ scope.row.order_status }}
                                </Font>
                                <Font v-else>{{ scope.row.order_status }}</Font>
                            </template>
                        </el-table-column>
                        <el-table-column label="风控提示" align="center" prop="risk_control_hint" width="160">
                            <template #default="scope">
                                <Font color="red"
                                    v-if="scope.row.risk_control_hint == 'IP风控' || scope.row.risk_control_hint == '一级风控'">{{
                                        scope.row.risk_control_hint }}</Font>
                                <Font v-else>{{ scope.row.risk_control_hint }}</Font>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单号" align="center" prop="order_number" width="220">
                            <template #default="scope">
                                <div style="display: flex; align-items: center;">
                                    <p>{{ scope.row.order_number }}</p>
                                    <el-button link>
                                        <el-icon>
                                            <CopyDocument />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Gaia订单号" align="center" prop="gaia_order_number" width="220">
                            <template #default="scope">
                                <div style="display: flex; align-items: center;">
                                    <p>{{ scope.row.gaia_order_number }}</p>
                                    <el-button link>
                                        <el-icon>
                                            <CopyDocument />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="上游订单号" align="center" prop="upstream_order_number" width="220">
                            <template #default="scope">
                                <div style="display: flex; align-items: center;">
                                    <p>{{ scope.row.upstream_order_number }}</p>
                                    <el-button link>
                                        <el-icon>
                                            <CopyDocument />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="上游渠道" align="center" prop="upstream_channel" width="220">
                            <template #default="scope">
                                <div style="display: flex; align-items: center;">
                                    <p>{{ scope.row.upstream_channel }}</p>
                                    <el-button link>
                                        <el-icon>
                                            <CopyDocument />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="成功充值次数" align="center" prop="successful_recharge_times" width="120">
                            <template #default="scope">
                                <p>{{ scope.row.successful_recharge_times }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否首次提现" align="center" prop="withdrawal_status" width="120">
                            <template #default="scope">
                                <p :class="scope.row.withdrawal_status == '是' ? 'red' : ''">{{ scope.row.withdrawal_status
                                }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="提现次数" align="center" prop="withdrawal_times" width="120">
                            <template #default="scope">
                                <p>{{ scope.row.withdrawal_times }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="KOL用户" align="center" prop="kol_user" width="120">
                            <template #default="scope">
                                <p>{{ scope.row.kol_user }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单提交时间" align="center" prop="submission_time" width="220">
                            <template #default="scope">
                                <p>{{ scope.row.submission_time }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" fixed="right" width="200">
                            <template #default="scope">
                                <el-button type="danger" link
                                    @click="detailWithdrawalReviewDialog(scope.row)">详情</el-button>
                                <el-button type="primary" link v-if="scope.row.order_status == '待处理'">锁定</el-button>
                                <el-button type="danger" link v-else-if="scope.row.order_status == '已拒绝'">已锁定</el-button>
                                <el-button type="success" link v-else>同意</el-button>
                                <el-button type="danger" link
                                    :class="scope.row.order_status != '已打款' ? 'hidden' : ''">拒绝</el-button>
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
                <el-col :span="6" class="detail-item-left-bg">Gaia订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.gaia_order_number }}</p>
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
                <el-col :span="6" class="detail-item-left-bg">免手续费:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>${{ Number(withdrawalReviewItem.free_charge).toFixed(2) }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">订单提交时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.submission_time }}</p>
                </el-col>
            </el-row>
            <el-row v-if="withdrawalReviewItem.review_status == 1">
                <el-col :span="6" class="detail-item-left-bg">订单更新时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.order_update_time }}</p>
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
            <el-row v-if="withdrawalReviewItem.review_status == 1">
                <el-col :span="6" class="detail-item-left-bg">操作人员:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ withdrawalReviewItem.operator }}</p>
                </el-col>
            </el-row>
            <template #footer>
                <div class="dialog-footer" v-if="withdrawalReviewItem.review_status == 0">
                    <el-button type="primary" @click="passDialogShow">通过</el-button>
                    <el-button type="warning" @click="rejectDialogShow">拒绝</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </div>
                <div class="dialog-footer" v-else>
                    <el-button @click="closeDialog">确认</el-button>
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

.remark-form {
    .el-form-item__content {
        margin-left: 0px !important;
    }
}

.hidden {
    visibility: hidden;
}

.red {
    color: red;
}
</style>