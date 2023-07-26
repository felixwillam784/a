<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'

interface GetDepositOrder {
    id: string,
    user_account: string
    nick_name: string
    user_name: string
    order_number: string
    platform_order_number: string
    channel_order_number: string
    upstream_order_number: string
    order_status: string
    amount_type: string
    order_amount: number | string
    actual_amount: number
    submission_time: string
    order_update_time: string
    recharge_method: string
    tax_number: string
    payment_channel: string
    recharge_type: string
    first_charge_status: string,
    upstream_channel: string,
    gaia_order_number: string,
    deposit_type: string,
}

const router = useRouter();

const formData = ref<any>({
    user_account: "",
    nick_name: "",
    user_id: "",
    submission_time: "",
    order_update_time: "",
    order_status: "",
    order_number: "",
    channel_order_number: "",
    upstream_order_number: "",
    first_charge_status: "",
    upstream_channel: "",
    gaia_order_number: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const depositOrderDialogVisible = ref<boolean>(false);
const depositOrderDetailDialogVisible = ref<boolean>(false);
const depositOrderDialogTitle = ref<string>("补单");
const ruleFormRef = ref<FormInstance>()
const total = ref<number>(4);
const submitBtnText = ref<string>("确定");
const closeBtnText = ref<string>("取消");

const rules = ref<FormRules<GetDepositOrder>>({
    order_amount: [
        { required: true, message: '请输入补单金额。', trigger: 'blur' },
    ],
});

const depositOrderList = ref<Array<GetDepositOrder>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "566756756756768568",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "TP202324434546565656656",
        order_status: "支付中",
        amount_type: "充值",
        order_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "理财活动",
        first_charge_status: "是",
        upstream_channel: "P2Champspay_daishou",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        deposit_type: "充值",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "566756756756768568",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "TP202324434546565656656",
        order_status: "支付中",
        amount_type: "充值",
        order_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "充值类型",
        first_charge_status: "是",
        upstream_channel: "P2Champspay_daishou",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        deposit_type: "充值",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "566756756756768568",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "TP202324434546565656656",
        order_status: "支付成功",
        amount_type: "充值",
        order_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "充值类型",
        first_charge_status: "是",
        upstream_channel: "P2Champspay_daishou",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        deposit_type: "充值",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "566756756756768568",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "TP202324434546565656656",
        order_status: "支付失败",
        amount_type: "充值",
        order_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "理财活动",
        first_charge_status: "是",
        upstream_channel: "P2Champspay_daishou",
        gaia_order_number: "65rttfer5qweqwedsfsdf",
        deposit_type: "充值",
    },
])

const depositOrderItem = ref<GetDepositOrder>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_account: "test777@gmail.com",
    nick_name: "UserName10001",
    user_name: "Faker",
    order_number: "566756756756768568",
    platform_order_number: "XXXXXXXXXXXXX",
    channel_order_number: "YYYYYYYYYYYYY",
    upstream_order_number: "ZZZZZZZZZZZZZ",
    order_status: "支付失败",
    amount_type: "充值",
    order_amount: "",
    actual_amount: 999,
    submission_time: "2020-07-12 23:00:00",
    order_update_time: "2020-07-12 23:00:00",
    recharge_method: "NNNNNNNNN",
    tax_number: "MMMMMMMM",
    payment_channel: "gaia",
    recharge_type: "理财活动",
    first_charge_status: "是",
    upstream_channel: "P2Champspay_daishou",
    gaia_order_number: "65rttfer5qweqwedsfsdf",
    deposit_type: "充值",
});

const orderStatusOptions = ref<Array<any>>([
    {
        label: "待处理",
        value: "待处理"
    }
])

const handleQuery = () => {
}

const detailManualPaymentDialog = (item: GetDepositOrder) => {
    depositOrderItem.value = item;
    depositOrderDetailDialogVisible.value = true;
}

const closeDialog = () => {
    depositOrderDialogVisible.value = false;
    depositOrderDetailDialogVisible.value = false;
}

const submitForm = async (formEl: FormInstance | undefined) => {
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

const makeOrder = (item: GetDepositOrder) => {
    depositOrderDialogVisible.value = true;
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <el-card>
                    <el-form :model="formData" :inline="true" label-width="100">
                        <el-form-item label="用户昵称" prop="nick_name">
                            <el-input v-model="formData.nick_name" placeholder="请输入用户昵称" />
                        </el-form-item>
                        <el-form-item label="用户账户" prop="user_account">
                            <el-input v-model="formData.user_account" placeholder="请输入用户账户" />
                        </el-form-item>
                        <el-form-item label="用户ID" prop="user_id">
                            <el-input v-model="formData.user_id" placeholder="请输入用户ID" />
                        </el-form-item>
                        <el-form-item label="是否首充" prop="first_charge_status">
                            <el-select v-model="formData.first_charge_status" placeholder="请选择是否首充">
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form :model="formData" :inline="true" label-width="100">
                        <el-form-item label="订单提交时间" prop="submission_time">
                            <el-date-picker v-model="formData.submission_time" type="date" placeholder="请选择提交时间"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-form-item>
                        <el-form-item label="订单更新时间" prop="order_update_time">
                            <el-date-picker v-model="formData.order_update_time" type="date" placeholder="选择更新时间"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-form-item>
                        <el-form-item label="订单状态" prop="order_status">
                            <el-select v-model="formData.order_status" placeholder="选择订单状态">
                                <el-option v-for="(item, index) in orderStatusOptions" :label="item.label"
                                    :value="item.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上游通道" prop="upstream_channel">
                            <el-select v-model="formData.upstream_channel" placeholder="请选择上游通道">
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="handleQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-form :model="formData" :inline="true" label-width="100">
                        <el-form-item label="订单号" prop="order_number">
                            <el-input v-model="formData.order_number" placeholder="请输入订单号" />
                        </el-form-item>
                        <el-form-item label="通道订单号" prop="platform_order_number">
                            <el-input v-model="formData.platform_order_number" placeholder="请输入通道订单号" />
                        </el-form-item>
                        <el-form-item label="上游订单号" prop="upstream_order_number">
                            <el-input v-model="formData.upstream_order_number" placeholder="请输入上游订单号" />
                        </el-form-item>
                        <el-form-item label="gaia订单号" prop="gaia_order_number">
                            <el-input v-model="formData.gaia_order_number" placeholder="请输入gaia" />
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card style="margin-top: 10px;">
                    <el-table v-loading="loading" :data="depositOrderList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name" width="160">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">
                                    {{ scope.row.nick_name }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户账户" align="center" prop="user_account" width="160">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">
                                    {{ scope.row.user_account }}
                                </el-link>
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
                        <el-table-column label="gaia订单号" align="center" prop="gaia_order_number" width="220">
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
                        <el-table-column label="上游通道" align="center" prop="upstream_channel" width="220">
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
                        <el-table-column label="上游订单号" align="center" prop="upstream_order_number" width="240">
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
                        <el-table-column label="订单状态" align="center" prop="order_status" width="160">
                            <template #default="scope">
                                <font v-if="scope.row.order_status == '支付中'" style="font-weight: bold;">{{
                                    scope.row.order_status }}</font>
                                <font color="green" v-else-if="scope.row.order_status == '支付成功'" style="font-weight: bold;">
                                    {{ scope.row.order_status }}
                                </font>
                                <font color="red" v-else style="font-weight: bold;">{{ scope.row.order_status }}</font>
                            </template>
                        </el-table-column>
                        <el-table-column label="存款类型" align="center" prop="deposit_type">
                            <template #default="scope">
                                <p>{{ scope.row.deposit_type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单金额" align="center" prop="order_amount">
                            <template #default="scope">
                                <p>${{ scope.row.order_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="实际到账" align="center" prop="actual_amount">
                            <template #default="scope">
                                <p>${{ scope.row.actual_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否首充" align="center" prop="first_charge_status">
                            <template #default="scope">
                                <p>{{ scope.row.first_charge_status }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单提交时间" align="center" prop="submission_time" width="200">
                            <template #default="scope">
                                <p>{{ scope.row.submission_time }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" fixed="right" width="180">
                            <template #default="scope">
                                <el-button type="danger" link @click="detailManualPaymentDialog(scope.row)">详情</el-button>
                                <el-button type="success" link @click="makeOrder(scope.row)">补单</el-button>
                                <el-button type="primary" link
                                    :class="scope.row.order_status != '支付中' && scope.row.order_status != '支付失败' ? 'hidden' : ''">同步订单</el-button>
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

        <el-dialog :title="depositOrderDialogTitle" v-model="depositOrderDialogVisible" width="600px" append-to-body
            @close="closeDialog">
            <el-form label-width="160px" ref="ruleFormRef" :rules="rules" :model="depositOrderItem">
                <el-form-item label="补单金额:" prop="order_amount">
                    <el-input v-model="depositOrderItem.order_amount" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">{{ submitBtnText }}</el-button>
                    <el-button @click="resetForm(ruleFormRef)">{{ closeBtnText }}</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog title="充值订单详情" v-model="depositOrderDetailDialogVisible" width="600px" append-to-body
            @close="closeDialog">
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户ID:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.id }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.user_account }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户昵称:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.nick_name }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户名字:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.user_name }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">平台订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.platform_order_number }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">通道订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.channel_order_number }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">上游订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.upstream_order_number }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">订单状态:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <Font color="green" v-if="depositOrderItem.order_status == '支付成功'">
                        {{ depositOrderItem.order_status }}
                    </Font>
                    <p v-else>{{ depositOrderItem.order_status }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">金额类型:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.amount_type }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">订单金额:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.order_amount }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">实到金额:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.actual_amount }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">订单提交时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.submission_time }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">订单更新时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.order_update_time }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">充值方式:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.recharge_method }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">税号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.tax_number }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">支付渠道:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.payment_channel }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">充值类型:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.recharge_type }}</p>
                </el-col>
            </el-row>
            <template #footer>
                <div class="dialog-footer">
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
</style>