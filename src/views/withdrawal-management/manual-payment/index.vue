<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'
import {getManualPaymentList, addManualPayment} from '@/api/withdraw-management'
import useStore from '@/store';
import axios, { AxiosPromise } from 'axios';

const { user } = useStore();

interface GetManualPayment {
    id: string,
    nick_name: string
    user_account: string
    order_amount: number | string
    change_type: string
    code_ratio: string
    operator: string
    invitation_code: string
    user_type: string,
    submission_time: string
    remark: string
}

const router = useRouter();

const formData = ref<any>({
    user_account: "",
    nick_name: "",
    invitation_code: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const manualDialogVisible = ref<boolean>(false);
const manualPaymentDetailDialogVisible = ref<boolean>(false);
const manualDialogTitle = ref<string>("添加订单");
const total = ref<number>(5);
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");
const ruleFormRef = ref<FormInstance>()

const rules = ref<FormRules<GetManualPayment>>({
    user_account: [
        { required: true, message: '请输入用户账号。', trigger: 'blur' },
    ],
    order_amount: [
        { required: true, message: '请输入订单金额。', trigger: 'blur' },
    ],
    change_type: [
        { required: true, message: '请输入变动类型。', trigger: 'blur' },
    ],
    code_ratio: [
        { required: true, message: '请输入打码倍率。', trigger: 'blur' },
    ],
    remark: [
        { required: true, message: '请输入备注。', trigger: 'blur' },
    ],
});

const manualPaymentList = ref<Array<GetManualPayment>>([
])

const manualPaymentItem = ref<GetManualPayment>({
    id: "",
    nick_name: "",
    user_account: "",
    order_amount: "",
    change_type: "平台内链",
    code_ratio: "",
    operator: "",
    invitation_code: "",
    user_type: "",
    submission_time: "",
    remark: "",
})

const typeOptions = ref<Array<any>>([
    {
        label: "平台内链",
        value: "平台内链"
    }
])

const handleQuery = () => {
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    }).catch(()=>{
        localStorage.clear();
        router.push({ name: "Login" });
        user.token = '';
    });
}

onMounted(()=>{
    loading.value = true;
    getData().then(()=>{
        loading.value =false;
    }).catch(()=>{
        localStorage.clear();
        router.push({ name: "Login" });
        user.token = '';
    });
})

const getData = async () =>{

    let res = await getManualPaymentList(user.token, formData.value);
    manualPaymentList.value = res.data.data;
}


const addManualPaymentDialog = () => {
    manualPaymentItem.value = {
        id: "",
        nick_name: "",
        user_account: "",
        order_amount: "",
        change_type: "平台内链",
        code_ratio: "",
        operator: "",
        invitation_code: "",
        user_type: "",
        submission_time: "",
        remark: "",
    }
    manualDialogVisible.value = true;
    manualDialogTitle.value = "添加订单";
    submitBtnText.value = "确认添加";
    closeBtnText.value = "取消添加";
}

const detailManualPaymentDialog = (item: GetManualPayment) => {
    manualPaymentItem.value = item;
    manualPaymentDetailDialogVisible.value = true;
}

const closeDialog = () => {
    manualDialogVisible.value = false;
    manualPaymentDetailDialogVisible.value = false;
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let res = await addManualPayment(user.token, manualPaymentItem);

            if(res.data.code === "00")
                console.log('success');
            else
                console.log('failed');
            manualDialogVisible.value = false;
        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    manualDialogVisible.value = false;
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="用户账户" prop="user_account">
                            <el-input v-model="formData.user_account" placeholder="请输入用户账户" />
                        </el-form-item>
                        <el-form-item label="客户昵称" prop="nick_name">
                            <el-input v-model="formData.nick_name" placeholder="请输入客户昵称" />
                        </el-form-item>
                        <el-form-item label="邀请码" prop="invitation_code">
                            <el-input v-model="formData.invitation_code" placeholder="请输入邀请码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Plus" @click="addManualPaymentDialog">添加订单</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="manualPaymentList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">{{ scope.row.nick_name }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户账号" align="center" prop="user_account">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">{{ scope.row.user_account }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单金额" align="center" prop="order_amount">
                            <template #default="scope">
                                <p>${{ scope.row.order_amount }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="变动类型" align="center" prop="change_type">
                            <template #default="scope">
                                <p>{{ scope.row.change_type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="打码倍率" align="center" prop="code_ratio">
                            <template #default="scope">
                                <p>{{ scope.row.code_ratio }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人员" align="center" prop="operator">
                            <template #default="scope">
                                <p>{{ scope.row.operator }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单提交时间" align="center" prop="submission_time">
                            <template #default="scope">
                                <p>{{ scope.row.submission_time }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed="right" width="120">
                            <template #default="scope">
                                <el-button type="danger" link @click="detailManualPaymentDialog(scope.row)">详情</el-button>
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

        <el-dialog :title="manualDialogTitle" v-model="manualDialogVisible" width="600px" append-to-body
            @close="closeDialog">
            <el-form label-width="160px" ref="ruleFormRef" :rules="rules" :model="manualPaymentItem">
                <el-form-item label="用户账号:" prop="user_account">
                    <el-input v-model="manualPaymentItem.user_account" />
                </el-form-item>
                <el-form-item label="打款金额:" prop="order_amount">
                    <el-input v-model="manualPaymentItem.order_amount"
                        :formatter="(value: string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')" />
                </el-form-item>
                <el-form-item label="打款类型:" prop="change_type">
                    <el-select v-model="manualPaymentItem.change_type">
                        <el-option v-for="(item, index) in typeOptions" :label="item.label" :value="item.value"
                            :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="打码倍率:" prop="code_ratio">
                    <el-input v-model="manualPaymentItem.code_ratio" />
                </el-form-item>
                <el-row style="align-items: center;">
                    <Font color="red" style="font-size: 20px;">*</Font>
                    <h3>备注</h3>
                </el-row>
                <el-form-item prop="remark" class="remark-form">
                    <el-input type="textarea" :rows="6" v-model="manualPaymentItem.remark" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">{{ submitBtnText }}</el-button>
                    <el-button @click="resetForm(ruleFormRef)">{{ closeBtnText }}</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog title="人工打款详情" v-model="manualPaymentDetailDialogVisible" width="600px" append-to-body
            @close="closeDialog">
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.user_account }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户名:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.nick_name }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">邀请码:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.invitation_code }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户类型:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.user_type }}</p>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-col :span="6" class="detail-item-left-bg">打款金额:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>${{ Number(manualPaymentItem.order_amount) }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">打款类型:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.change_type }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">打码倍率:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.code_ratio }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">打款时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.submission_time }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">操作人员:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.operator }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">备注:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ manualPaymentItem.remark }}</p>
                </el-col>
            </el-row>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="closeDialog">关闭详情</el-button>
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