<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'
import {getDepositChannelList} from '@/api/withdraw-management'

import useStore from '@/store';

const { user } = useStore();

interface GetDepositChannel {
    channel_name: string
    product_id: string
    payment_method: string
    currency_type: string
    minium_recharge_amount: number | string
    maxium_recharge_amount: number | string
    handling_fee: number | string
    channel_status: number | boolean,
    channel_remark: string
}

const router = useRouter();

const formData = ref<any>({
    deposit_channel: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const depositChannelDialogVisible = ref<boolean>(false);
const depositChannelDialogTitle = ref<string>("新增存款渠道");
const total = ref<number>(3);
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");
const ruleFormRef = ref<FormInstance>()

const rules = ref<FormRules<GetDepositChannel>>({
    channel_remark: [
        { required: true, message: '请输入渠道备注。', trigger: 'blur' },
    ],
});

const depositChannelList = ref<Array<GetDepositChannel>>([
    {
        channel_name: "PIX",
        product_id: "XXXXXYYYYZZZZ",
        payment_method: "XX Bank",
        currency_type: "USD",
        minium_recharge_amount: 0.01,
        maxium_recharge_amount: 200000,
        handling_fee: 2,
        channel_status: true,
        channel_remark: "",
    },
    {
        channel_name: "PIX",
        product_id: "XXXXXYYYYZZZZ",
        payment_method: "YY Bank",
        currency_type: "USD",
        minium_recharge_amount: 0.01,
        maxium_recharge_amount: 200000,
        handling_fee: 2,
        channel_status: true,
        channel_remark: "",
    },
    {
        channel_name: "PIX2",
        product_id: "ABCDABCD",
        payment_method: "XX Bank",
        currency_type: "USD",
        minium_recharge_amount: 0.01,
        maxium_recharge_amount: 200000,
        handling_fee: 0,
        channel_status: true,
        channel_remark: "",
    },
])

const depositChannelItem = ref<GetDepositChannel>({
    channel_name: "PIX",
    product_id: "XXXXXYYYYZZZZ",
    payment_method: "XX Bank",
    currency_type: "USD",
    minium_recharge_amount: 0.01,
    maxium_recharge_amount: 200000,
    handling_fee: 2,
    channel_status: true,
    channel_remark: "",
})

const paymentMethodOptions = ref<Array<any>>([
    {
        label: "XX Bank",
        value: "XX Bank"
    },
    {
        label: "YY Bank",
        value: "YY Bank"
    },
    {
        label: "ZZ Bank",
        value: "ZZ Bank"
    }
])

const currencyTypeOptions = ref<Array<any>>([
    {
        label: "USD",
        value: "USD"
    },
])

const channelStatusOptions = ref<Array<any>>([
    {
        label: "开启",
        value: 1
    },
    {
        label: "关闭",
        value: 0
    },
])

const handleQuery = () => {
}

const addDepositChannelDialog = () => {
    depositChannelItem.value = {
        channel_name: "",
        product_id: "",
        payment_method: "",
        currency_type: "",
        minium_recharge_amount: "",
        maxium_recharge_amount: "",
        handling_fee: "",
        channel_status: 1,
        channel_remark: "",
    }
    depositChannelDialogVisible.value = true;
    depositChannelDialogTitle.value = "新增存款渠道";
    submitBtnText.value = "确认新增";
    closeBtnText.value = "取消新增";
}

const editDepositChannelDialog = (item: GetDepositChannel) => {
    item.channel_status = item.channel_status ? 1 : 0;
    depositChannelItem.value = item
    depositChannelDialogVisible.value = true;
    depositChannelDialogTitle.value = "存款渠道修改";
    submitBtnText.value = "确认修改";
    closeBtnText.value = "取消修改";
}

const closeDialog = () => {
    depositChannelDialogVisible.value = false;
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

const getData = async () =>{
    let res = await getDepositChannelList(user.token, formData.value);
    depositChannelList.value = res.data.data;
    console.log(res.data.data);
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
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="存款渠道" prop="deposit_channel">
                            <el-input v-model="formData.deposit_channel" placeholder="请输入存款渠道" />
                        </el-form-item>
                        <el-form-item style="float: right;">
                            <el-button type="primary" :icon="Plus" @click="addDepositChannelDialog">新增渠道</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="depositChannelList" style="width: 100%;">
                        <el-table-column label="渠道名字" align="center" prop="channel_name" />
                        <el-table-column label="产品ID" align="center" prop="product_id">
                            <template #default="scope">
                                <p>{{ scope.row.product_id }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="付款方式" align="center" prop="payment_method">
                            <template #default="scope">
                                <p>{{ scope.row.payment_method }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="货币类型" align="center" prop="currency_type">
                            <template #default="scope">
                                <p>{{ scope.row.currency_type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="充值最小金额" align="center" prop="minium_recharge_amount">
                            <template #default="scope">
                                <p>{{ scope.row.minium_recharge_amount }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="充值最大金额" align="center" prop="maxium_recharge_amount">
                            <template #default="scope">
                                <p>{{ scope.row.maxium_recharge_amount }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="手续费" align="center" prop="handling_fee">
                            <template #default="scope">
                                <p>{{ scope.row.handling_fee }}%</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="渠道备注" align="center" prop="channel_remark">
                            <template #default="scope">
                                <p>{{ scope.row.channel_remark }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="channel_status">
                            <template #default="scope">
                                <el-switch v-model="scope.row.channel_status" size="large" />
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="success" link @click="editDepositChannelDialog(scope.row)">修改</el-button>
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

        <el-dialog :title="depositChannelDialogTitle" v-model="depositChannelDialogVisible" width="600px" append-to-body
            @close="closeDialog">
            <el-form label-width="160px" ref="ruleFormRef" :rules="rules" :model="depositChannelItem">
                <el-form-item label="渠道名字:" prop="channel_name">
                    <el-select v-model="depositChannelItem.channel_name" placeholder="请选择新增渠道"></el-select>
                </el-form-item>
                <el-form-item label="产品ID:" prop="product_id">
                    <el-select v-model="depositChannelItem.product_id" placeholder="请选择产品ID"></el-select>
                </el-form-item>
                <el-form-item label="付款方式:" prop="payment_method">
                    <el-select v-model="depositChannelItem.payment_method" placeholder="请选择付款方式">
                        <el-option v-for="(item, index) in paymentMethodOptions" :label="item.label" :value="item.value"
                            :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="货币类型:" prop="currency_type">
                    <el-select v-model="depositChannelItem.currency_type" placeholder="请选择货币类型">
                        <el-option v-for="(item, index) in currencyTypeOptions" :label="item.label" :value="item.value"
                            :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="最小充值金额:" prop="minium_recharge_amount">
                    <el-input v-model="depositChannelItem.minium_recharge_amount" placeholder="请输入最小充值金额" />
                </el-form-item>
                <el-form-item label="最大充值金额:" prop="maxium_recharge_amount">
                    <el-input v-model="depositChannelItem.maxium_recharge_amount" placeholder="请输入最大充值金额" />
                </el-form-item>
                <el-form-item label="手续费(%):" prop="handling_fee">
                    <el-input v-model="depositChannelItem.handling_fee" placeholder="请输入手续费" />
                </el-form-item>
                <el-form-item label="渠道状态:" prop="channel_status">
                    <el-select v-model="depositChannelItem.channel_status" placeholder="请选择渠道状态">
                        <el-option v-for="(item, index) in channelStatusOptions" :label="item.label" :value="item.value"
                            :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row style="align-items: center;">
                    <Font color="red" style="font-size: 20px;">*</Font>
                    <h3>备注</h3>
                </el-row>
                <el-form-item prop="channel_remark" class="remark-form">
                    <el-input type="textarea" :rows="6" v-model="depositChannelItem.channel_remark" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">{{ submitBtnText }}</el-button>
                    <el-button @click="resetForm(ruleFormRef)">{{ closeBtnText }}</el-button>
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
</style>