<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'
import {getBlacklist, addBlackList, deleteblackList} from '@/api/withdraw-management'

import useStore from '@/store';

const { user } = useStore();

interface GetBan {
    id: string,
    user_account: string
    nick_name: string
    blackout_time: string
    creation_reason: string
    operator: string
    ban_remark: string
}

const router = useRouter();

const formData = ref<any>({
    user_account: "",
    nick_name: "",
    ban_time: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const blackDialogVisible = ref<boolean>(false);
const blackDetailDialogVisible = ref<boolean>(false);
const blackRemoveDialogVisible = ref<boolean>(false);
const blackDialogTitle = ref<string>("新增封禁");
const total = ref<number>(1);
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");
const ruleFormRef = ref<FormInstance>()

const rules = ref<FormRules<GetBan>>({
    ban_remark: [
        { required: true, message: '请输入解封备注。', trigger: 'blur' },
    ],
});

const blackList = ref<Array<GetBan>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        blackout_time: "2023-07-10 19:00:00",
        creation_reason: "违规行为XXX",
        operator: "UserName",
        ban_remark: "违规行为XXX",
    },
])

const blackItem = ref<GetBan>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    user_account: "test777@gmail.com",
    nick_name: "UserName10001",
    blackout_time: "2023-07-10 19:00:00",
    creation_reason: "违规行为XXX",
    operator: "UserName",
    ban_remark: "违规行为XXX",
})

const handleQuery = () => {
    getData();
}

const handleReset = () => {
}

const addBlackDialog = () => {
    blackItem.value = {
        id: "",
        user_account: "test777@gmail.com",
        nick_name: "UserName10001",
        blackout_time: "2023-07-10 19:00:00",
        creation_reason: "违规行为XXX",
        operator: "UserName",
        ban_remark: "",
    }
    blackDialogVisible.value = true;
    blackDialogTitle.value = "新增黑名单";
    submitBtnText.value = "确认添加";
    closeBtnText.value = "取消添加";
}

const removeBlackDialog = (item: GetBan) => {
    blackItem.value = item;
    blackRemoveDialogVisible.value = true;
}

const detailBlackDialog = (item: GetBan) => {
    blackItem.value = item;
    blackDetailDialogVisible.value = true;
}

const closeDialog = () => {
    blackDialogVisible.value = false;
    blackDetailDialogVisible.value = false;
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let res = await addBlackList(user.token, blackItem.value);

        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const getData = async () => {
    let res = await getBlacklist(user.token, formData.value);
    blackList.value = res.data.data;
}

const deleteBlackList = async () =>{
    let res = await deleteblackList(user.token, blackItem.value.id);
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
                        <el-form-item label="用户账号" prop="user_account">
                            <el-input v-model="formData.user_cpf" placeholder="请输入用户账号" />
                        </el-form-item>
                        <el-form-item label="客户昵称" prop="nick_name">
                            <el-input v-model="formData.user_cpf" placeholder="请输入客户昵称" />
                        </el-form-item>
                        <el-form-item label="封禁时间:">
                            <el-date-picker type="daterange" v-model="formData.ban_time" range-separator="至"
                                start-placeholder="请选择" end-placeholder="请选择" value-format="YYYY-MM-DD">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
                            <el-button :icon="Refresh" @click="handleReset">重置</el-button>
                            <el-button :icon="Plus" @click="addBlackDialog">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="blackList" style="width: 100%;">
                        <el-table-column label="用户昵称" align="center" prop="nick_name">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;"
                                    @click="router.push({ name: 'User Detail' })">{{ scope.row.nick_name }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户账号" align="center" prop="user_account">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #3afefe; text-decoration-line: underline;"
                                    @click="router.push({ name: 'User Detail' })">{{ scope.row.user_account }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="拉黑时间" align="center" prop="blackout_time">
                            <template #default="scope">
                                <p>{{ scope.row.blackout_time }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建原因" align="center" prop="creation_reason">
                            <template #default="scope">
                                <p>{{ scope.row.creation_reason }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人员" align="center" prop="operator">
                            <template #default="scope">
                                <p>{{ scope.row.operator }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center" prop="ban_remark">
                            <template #default="scope">
                                <p>{{ scope.row.ban_remark }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" fixed="right" width="160">
                            <template #default="scope">
                                <el-button type="danger" link @click="detailBlackDialog(scope.row)">详情</el-button>
                                <el-button type="success" link @click="removeBlackDialog(scope.row)">移除黑名单</el-button>
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

        <el-dialog :title="blackDialogTitle" v-model="blackDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-form label-width="160px">
                <el-form-item label="客户账号:">
                    <el-input v-model="blackItem.user_account" />
                </el-form-item>
                <el-form-item label="封禁原因:">
                    <el-input v-model="blackItem.creation_reason" />
                </el-form-item>
            </el-form>
            <el-form ref="ruleFormRef" :rules="rules" :model="blackItem">
                <el-row style="align-items: center;">
                    <p style="font-size: 20px; color: red;">*</p>
                    <h3>备注</h3>
                </el-row>
                <el-form-item prop="ban_remark">
                    <el-input type="textarea" :rows="6" v-model="blackItem.ban_remark" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">{{ submitBtnText }}</el-button>
                    <el-button @click="resetForm(ruleFormRef)">{{ closeBtnText }}</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog title="移除黑名单" v-model="blackRemoveDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.user_account }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户昵称:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.nick_name }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户ID:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.id }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁原因:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.creation_reason }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁人员:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.operator }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.blackout_time }}</p>
                </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
                <el-col :span="6" class="detail-item-left-bg">封禁备注:</el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="detail-item-right-bg" style="height: 120px;">
                    <p>{{ blackItem.ban_remark }}</p>
                </el-col>
            </el-row>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="deleteBlackList">确认</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog title="黑名单详情" v-model="blackDetailDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.user_account }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户昵称:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.nick_name }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户ID:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.id }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁原因:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.creation_reason }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁人员:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.operator }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ blackItem.blackout_time }}</p>
                </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
                <el-col :span="6" class="detail-item-left-bg">封禁备注:</el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="detail-item-right-bg" style="height: 120px;">
                    <p>{{ blackItem.ban_remark }}</p>
                </el-col>
            </el-row>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="closeDialog">确认</el-button>
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