<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
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
    recharge_amount: number
    actual_amount: number
    submission_time: string
    order_update_time: string
    recharge_method: string
    tax_number: string
    payment_channel: string
    recharge_type: string
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
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const depositOrderDialogVisible = ref<boolean>(false);
const depositOrderDetailDialogVisible = ref<boolean>(false);
const depositOrderDialogTitle = ref<string>("");
const total = ref<number>(4);
const submitBtnText = ref<string>("确定");
const closeBtnText = ref<string>("取消");

const depositOrderList = ref<Array<GetDepositOrder>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "123456789",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "ZZZZZZZZZZZZZ",
        order_status: "支付中",
        amount_type: "USD",
        recharge_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "理财活动"
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "123456789",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "ZZZZZZZZZZZZZ",
        order_status: "支付中",
        amount_type: "USD",
        recharge_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "充值类型"
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "123456789",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "ZZZZZZZZZZZZZ",
        order_status: "支付成功",
        amount_type: "USD",
        recharge_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "充值类型"
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        user_name: "Faker",
        order_number: "123456789",
        platform_order_number: "XXXXXXXXXXXXX",
        channel_order_number: "YYYYYYYYYYYYY",
        upstream_order_number: "ZZZZZZZZZZZZZ",
        order_status: "支付失败",
        amount_type: "USD",
        recharge_amount: 999,
        actual_amount: 999,
        submission_time: "2020-07-12 23:00:00",
        order_update_time: "2020-07-12 23:00:00",
        recharge_method: "NNNNNNNNN",
        tax_number: "MMMMMMMM",
        payment_channel: "gaia",
        recharge_type: "理财活动"
    },
])

const depositOrderItem = ref<GetDepositOrder>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_account: "test777@gmail.com",
    nick_name: "UserName10001",
    user_name: "Faker",
    order_number: "123456789",
    platform_order_number: "XXXXXXXXXXXXX",
    channel_order_number: "YYYYYYYYYYYYY",
    upstream_order_number: "ZZZZZZZZZZZZZ",
    order_status: "支付失败",
    amount_type: "USD",
    recharge_amount: 999,
    actual_amount: 999,
    submission_time: "2020-07-12 23:00:00",
    order_update_time: "2020-07-12 23:00:00",
    recharge_method: "NNNNNNNNN",
    tax_number: "MMMMMMMM",
    payment_channel: "gaia",
    recharge_type: "理财活动"
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

const submitForm = () => {
}
const resetForm = () => {
    depositOrderDialogVisible.value = false;
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
                    <el-row style="align-items: center;">
                        <el-col :span="24" :md="16" :lg="20">
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
                            </el-form>
                        </el-col>
                        <el-col :span="24" :md="8" :lg="4">
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card>
                    <el-table v-loading="loading" :data="depositOrderList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name" />
                        <el-table-column label="用户账户" align="center" prop="user_account">
                            <template #default="scope">
                                <p>{{ scope.row.user_account }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单号" align="center" prop="order_number">
                            <template #default="scope">
                                <p>{{ scope.row.order_number }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单状态" align="center" prop="order_status">
                            <template #default="scope">
                                <Font v-if="scope.row.order_status == '支付中'">{{ scope.row.order_status }}</Font>
                                <Font color="green" v-else-if="scope.row.order_status == '支付成功'">{{ scope.row.order_status
                                }}</Font>
                                <Font color="red" v-else>{{ scope.row.order_status }}</Font>
                            </template>
                        </el-table-column>
                        <el-table-column label="存款类型" align="center" prop="code_ratio">
                            <template #default="scope">
                                <p>{{ scope.row.amount_type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="充值金币" align="center" prop="recharge_amount">
                            <template #default="scope">
                                <p>${{ scope.row.recharge_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="实到金币" align="center" prop="actual_amount">
                            <template #default="scope">
                                <p>${{ scope.row.actual_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="充值类型" align="center" prop="recharge_type">
                            <template #default="scope">
                                <p>{{ scope.row.recharge_type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单提交时间" align="center" prop="submission_time">
                            <template #default="scope">
                                <p>{{ scope.row.submission_time }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed="right" width="240">
                            <template #default="scope">
                                <el-button type="danger" link @click="detailManualPaymentDialog(scope.row)">详情</el-button>
                                <el-button type="success" link @click="makeOrder(scope.row)">补单</el-button>
                                <el-button type="primary" plain
                                    :class="scope.row.order_status != '支付中' ? 'hidden' : ''">同步订单</el-button>
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
            @close="closeDialog" style="text-align: center;">
            <h3>确认补单通过</h3>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">{{ submitBtnText }}</el-button>
                    <el-button @click="resetForm">{{ closeBtnText }}</el-button>
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
                    <Font color="green" v-if="depositOrderItem.order_status == '支付成功'">{{ depositOrderItem.order_status }}
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
                <el-col :span="6" class="detail-item-left-bg">充值金额:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.recharge_amount }}</p>
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
}</style>