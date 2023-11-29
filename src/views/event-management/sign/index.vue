<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    modifyReason: string
}

interface GetSign {
    id: string,
    vip_level: string
    day_1: number
    day_2: number
    day_3: number
    day_4: number
    day_5: number
    day_6: number
    day_7: number
    day_8: number
    required_rewards_amount: number
}

const router = useRouter();

const formData = ref<any>({
    round_activity: "无限期",
    withdrawal_odds: "1倍",
    open: true,
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const signDialogVisible = ref<boolean>(false);
const signDialogTitle = ref<string>("添加代理成就");
const total = ref<number>(3);
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<RuleForm>({
    modifyReason: "",
})

const rules = ref<FormRules<RuleForm>>({
    modifyReason: [
        { required: true, message: '请输入修改原因。', trigger: 'blur' },
    ],
});

const signList = ref<Array<GetSign>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        vip_level: "VIP0",
        day_1: 0,
        day_2: 0,
        day_3: 0,
        day_4: 0,
        day_5: 0,
        day_6: 0,
        day_7: 0,
        day_8: 0,
        required_rewards_amount: 0,
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        vip_level: "VIP1",
        day_1: 1,
        day_2: 1,
        day_3: 1,
        day_4: 1,
        day_5: 1,
        day_6: 1,
        day_7: 1,
        day_8: 0,
        required_rewards_amount: 0,
    },
])

const signItem = ref<GetSign>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    vip_level: "VIP0",
    day_1: 0,
    day_2: 0,
    day_3: 0,
    day_4: 0,
    day_5: 0,
    day_6: 0,
    day_7: 0,
    day_8: 0,
    required_rewards_amount: 0,
})

const handleQuery = () => {
}

const resetQuery = () => {
}

const importExcel = () => {
}

const addSignDialog = () => {
    signItem.value = {
        id: "",
        vip_level: "VIP2",
        day_1: 10,
        day_2: 10,
        day_3: 10,
        day_4: 10,
        day_5: 10,
        day_6: 10,
        day_7: 10,
        day_8: 0,
        required_rewards_amount: 0,
    }
    signDialogVisible.value = true;
    signDialogTitle.value = "添加签到配置";
    submitBtnText.value = "保存添加";
    closeBtnText.value = "取消添加";
}

const editSignDialog = (item: GetSign) => {
    signItem.value = item;
    signDialogVisible.value = true;
    signDialogTitle.value = "修改签到配置";
    submitBtnText.value = "保存修改";
    closeBtnText.value = "取消修改";
}

const closeDialog = () => {
    signDialogVisible.value = false;
}

const roundOptions = ref<Array<any>>([
    {
        label: "无限期",
        value: "无限期"
    }
])

const withdrawalOddsOptions = ref<Array<any>>([
    {
        label: "1倍",
        value: "1倍"
    }
])

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
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="160">
                        <el-form-item label="活动持续轮次" prop="round_activity">
                            <el-select v-model="formData.round_activity">
                                <el-option v-for="(item, index) in roundOptions" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="提现需求打码倍率" prop="withdrawal_odds">
                            <el-select v-model="formData.withdrawal_odds">
                                <el-option v-for="(item, index) in withdrawalOddsOptions" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="open">
                            <el-switch v-model="formData.open"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Upload" @click="importExcel">excel导入</el-button>
                            <el-button :icon="Plus" @click="addSignDialog">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="signList" style="width: 100%;">
                        <el-table-column label="VIP等级" align="center" prop="vip_level" width="100" />
                        <el-table-column label="DAY1" align="center" prop="day_1">
                            <template #default="scope">
                                <p>${{ scope.row.day_1.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="DAY2" align="center" prop="day_2">
                            <template #default="scope">
                                <p>${{ scope.row.day_2.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="DAY3" align="center" prop="day_3">
                            <template #default="scope">
                                <p>${{ scope.row.day_3.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="DAY4" align="center" prop="day_4">
                            <template #default="scope">
                                <p>${{ scope.row.day_4.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="DAY5" align="center" prop="day_5">
                            <template #default="scope">
                                <p>${{ scope.row.day_5.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="DAY6" align="center" prop="day_6">
                            <template #default="scope">
                                <p>${{ scope.row.day_6.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="DAY7" align="center" prop="day_7">
                            <template #default="scope">
                                <p>${{ scope.row.day_7.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="DAY8" align="center" prop="day_8">
                            <template #default="scope">
                                <p>${{ scope.row.day_8.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="领取奖励所需打码量" align="center" prop="required_rewards_amount" />
                        <el-table-column align="center" fixed="right" width="120">
                            <template #default="scope">
                                <el-button type="success" link @click="editSignDialog(scope.row)">修改</el-button>
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

        <el-dialog :title="signDialogTitle" v-model="signDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-form label-width="160px">
                <el-form-item label="VIP等级:">
                    <el-input v-model="signItem.vip_level" />
                </el-form-item>
                <el-form-item label="DAY1 ($):">
                    <el-input v-model="signItem.day_1" />
                </el-form-item>
                <el-form-item label="DAY2 ($):">
                    <el-input v-model="signItem.day_2" />
                </el-form-item>
                <el-form-item label="DAY3 ($):">
                    <el-input v-model="signItem.day_3" />
                </el-form-item>
                <el-form-item label="DAY4 ($):">
                    <el-input v-model="signItem.day_4" />
                </el-form-item>
                <el-form-item label="DAY5 ($):">
                    <el-input v-model="signItem.day_5" />
                </el-form-item>
                <el-form-item label="DAY6 ($):">
                    <el-input v-model="signItem.day_6" />
                </el-form-item>
                <el-form-item label="DAY7 ($):">
                    <el-input v-model="signItem.day_7" />
                </el-form-item>
                <el-form-item label="DAY8 ($):">
                    <el-input v-model="signItem.day_8" />
                </el-form-item>
                <el-form-item label="领取奖励所需打码量:">
                    <el-input v-model="signItem.required_rewards_amount" />
                </el-form-item>
            </el-form>
            <el-form v-if="signItem.id != '' && signItem.id != null" ref="ruleFormRef" :rules="rules" :model="ruleForm">
                <el-row style="align-items: center;">
                    <Font color="red" style="font-size: 20px;">*</Font>
                    <h3>修改原因:</h3>
                </el-row>
                <el-form-item prop="modifyReason">
                    <el-input type="textarea" :rows="6" v-model="ruleForm.modifyReason" />
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
</style>