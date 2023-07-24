<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'

interface GetBan {
    id: string,
    user_account: string
    nick_name: string
    withdrawal_account: string
    creation_time: string
    ban_reason: string
    operator: string
    ban_remark: string
    unblock_remark: string
}

const router = useRouter();

const formData = ref<any>({
    user_account: "",
    nick_name: "",
    withdrawal_account: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const banDialogVisible = ref<boolean>(false);
const banDetailDialogVisible = ref<boolean>(false);
const banDialogTitle = ref<string>("新增封禁");
const total = ref<number>(1);
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");
const ruleFormRef = ref<FormInstance>()

const rules = ref<FormRules<GetBan>>({
    unblock_remark: [
        { required: true, message: '请输入解封备注。', trigger: 'blur' },
    ],
});

const banList = ref<Array<GetBan>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        withdrawal_account: "XXXXXXXXXXXXXXXXXX",
        creation_time: "2023-07-10 19:00:00",
        ban_reason: "违规行为XXX",
        operator: "UserName",
        ban_remark: "",
        unblock_remark: ""
    },
])

const banItem = ref<GetBan>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_account: "test777@gmail.com",
    nick_name: "UserName10001",
    withdrawal_account: "XXXXXXXXXXXXXXXXXX",
    creation_time: "2023-07-10 19:00:00",
    ban_reason: "违规行为XXX",
    operator: "UserName",
    ban_remark: "",
    unblock_remark: ""
})

const handleQuery = () => {
}

const addBanDialog = () => {
    banItem.value = {
        id: "",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        withdrawal_account: "XXXXXXXXXXXXXXXXXX",
        creation_time: "2023-07-10 19:00:00",
        ban_reason: "违规行为XXX",
        operator: "UserName",
        ban_remark: "",
        unblock_remark: ""
    }
    banDialogVisible.value = true;
    banDialogTitle.value = "新增封禁";
    submitBtnText.value = "确认添加";
    closeBtnText.value = "取消添加";
}

const editBanDialog = (item: GetBan) => {
    banItem.value = item;
    banDialogVisible.value = true;
    banDialogTitle.value = "解除封禁";
    submitBtnText.value = "确认解除";
    closeBtnText.value = "取消";
}

const detailBanDialog = (item: GetBan) => {
    banItem.value = item;
    banDetailDialogVisible.value = true;
}

const closeDialog = () => {
    banDialogVisible.value = false;
    banDetailDialogVisible.value = false;
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
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="用户账号" prop="user_account">
                            <el-input v-model="formData.user_cpf" placeholder="请输入用户账号" />
                        </el-form-item>
                        <el-form-item label="客户昵称" prop="nick_name">
                            <el-input v-model="formData.user_cpf" placeholder="请输入客户昵称" />
                        </el-form-item>
                        <el-form-item label="提款账号" prop="withdrawal_account">
                            <el-input v-model="formData.user_cpf" placeholder="请输入提款账号" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Plus" @click="addBanDialog">新增封禁</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="banList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;">{{ scope.row.nick_name }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户账号" align="center" prop="user_account">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;">{{ scope.row.user_account }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="提款账号" align="center" prop="withdrawal_account">
                            <template #default="scope">
                                <p>{{ scope.row.withdrawal_account }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" align="center" prop="creation_time">
                            <template #default="scope">
                                <p>{{ scope.row.creation_time }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建原因" align="center" prop="ban_reason">
                            <template #default="scope">
                                <p>{{ scope.row.ban_reason }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人员" align="center" prop="operator">
                            <template #default="scope">
                                <p>{{ scope.row.operator }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="danger" link @click="detailBanDialog(scope.row)">详情</el-button>
                                <el-button type="success" link @click="editBanDialog(scope.row)">解除封禁</el-button>
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

        <el-dialog :title="banDialogTitle" v-model="banDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-form label-width="160px">
                <el-form-item label="客户账号:">
                    <el-input v-model="banItem.user_account" />
                    <el-button type="primary" link style="position: absolute; right: 10px;">复制</el-button>
                </el-form-item>
                <el-form-item label="客户昵称:">
                    <el-input v-model="banItem.nick_name" />
                    <el-button type="primary" link style="position: absolute; right: 10px;">复制</el-button>
                </el-form-item>
                <el-form-item label="客户提款账号:">
                    <el-input v-model="banItem.withdrawal_account" />
                    <el-button type="primary" link style="position: absolute; right: 10px;">复制</el-button>
                </el-form-item>
                <el-form-item label="封禁原因:">
                    <el-input v-model="banItem.ban_reason" />
                </el-form-item>
                <el-form-item label="封禁人员:" v-if="banItem.id != '' && banItem.id != null">
                    <el-input v-model="banItem.operator" />
                </el-form-item>
                <el-form-item label="封禁时间:" v-if="banItem.id != '' && banItem.id != null">
                    <el-input v-model="banItem.creation_time" />
                </el-form-item>
            </el-form>
            <el-form v-if="banItem.id != '' && banItem.id != null">
                <el-row style="align-items: center;">
                    <p style="font-weight: bold;">封禁备注</p>
                </el-row>
                <el-form-item>
                    <el-input type="textarea" :rows="6" v-model="banItem.ban_remark" />
                </el-form-item>
            </el-form>
            <el-form ref="ruleFormRef" :rules="rules" :model="banItem">
                <el-row style="align-items: center;">
                    <p style="font-size: 20px; color: red;">*</p>
                    <h3>解封备注</h3>
                </el-row>
                <el-form-item prop="unblock_remark">
                    <el-input type="textarea" :rows="6" v-model="banItem.unblock_remark" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">{{ submitBtnText }}</el-button>
                    <el-button @click="resetForm(ruleFormRef)">{{ closeBtnText }}</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog title="封禁详情" v-model="banDetailDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.user_account }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户昵称:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.nick_name }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户提款账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.withdrawal_account }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁原因:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.ban_reason }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁人员:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.operator }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.creation_time }}</p>
                </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
                <el-col :span="6" class="detail-item-left-bg">封禁备注:</el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="detail-item-right-bg" style="height: 120px;">
                    <p>{{ banItem.ban_remark }}</p>
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
</style>