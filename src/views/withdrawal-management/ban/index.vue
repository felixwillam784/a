<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'
import useStore from '@/store';
import { formatDate } from '@/utils/index';
//import { watch } from "fs";
const { withdrawal } = useStore();

interface GetBan {
    prohibit_id: string
    id: string
    user_id: string
    id_number: string
    origin: string
    notes: string
    operator_name: string
    created_at: number | string
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
    // unblock_remark: [
    //     { required: true, message: '请输入解封备注。', trigger: 'blur' },
    // ],
});

const banItem = ref<GetBan>({
    prohibit_id: "",
    id: "",
    user_id: "",
    id_number: "",
    origin: "",
    notes: "",
    operator_name: "",
    created_at: ""
})


// 提现封禁列表
const fundsprohibitList = computed(() => {
  return withdrawal.getFundsprohibitListData;
})

// 查询
const handleQuery = async () => {
    const params = {
        page_num: 1,
        page_size: 20
    }
    await withdrawal.dispatchFundsprohibitList(params);
}

onMounted (()=>{
    handleQuery();
})

const addBanDialog = () => {
    banItem.value = {
        prohibit_id: "",
        id: "",
        user_id: "",
        id_number: "",
        origin: "",
        notes: "",
        operator_name: "",
        created_at: ""
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
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const params = {
                user_id: banItem.value.user_id,
                id_number: banItem.value.id_number,
                origin: banItem.value.origin,
                notes: banItem.value.notes
            }
            await withdrawal.dispatchFundsprohibitCreate(params);
            handleQuery();
            banDialogVisible.value = false;
        } else {
            console.log('error submit!', fields)
        }
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    banDialogVisible.value = false;
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
                    <el-table v-loading="loading" :data="fundsprohibitList" style="width: 100%;">
                        <!-- <el-table-column label="用户昵称" align="center" prop="nick_name">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;" @click="router.push({name: 'User Detail'})">{{ scope.row.nick_name }}</el-link>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="用户账号" align="center" prop="user_id">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;" @click="router.push({ name: 'UserDetail', params: { id: scope.row.id } })">{{ scope.row.user_id }}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="提款账号" align="center" prop="prohibit_id">
                            <template #default="scope">
                                <p>{{ scope.row.prohibit_id }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" align="center" prop="created_at">
                            <template #default="scope">
                                <p>{{ formatDate(scope.row.created_at) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="封禁原因" align="center" prop="origin">
                            <template #default="scope">
                                <p>{{ scope.row.origin }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人员" align="center" prop="operator_name">
                            <template #default="scope">
                                <p>{{ scope.row.operator_name }}</p>
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
                    <el-input v-model="banItem.user_id" />
                    <el-button type="primary" link style="position: absolute; right: 10px;">复制</el-button>
                </el-form-item>
                <!-- <el-form-item label="客户昵称:">
                    <el-input v-model="banItem.nick_name" />
                    <el-button type="primary" link style="position: absolute; right: 10px;">复制</el-button>
                </el-form-item> -->
                <el-form-item label="客户提款账号:">
                    <el-input v-model="banItem.id_number" />
                    <el-button type="primary" link style="position: absolute; right: 10px;">复制</el-button>
                </el-form-item>
                <el-form-item label="封禁原因:">
                    <el-input v-model="banItem.origin" />
                </el-form-item>
                <el-form-item label="封禁人员:" v-if="banItem.id != '' && banItem.id != null">
                    <el-input v-model="banItem.operator_name" />
                </el-form-item>
                <el-form-item label="封禁时间:" v-if="banItem.id != '' && banItem.id != null">
                    <el-input v-model="banItem.created_at" />
                </el-form-item>
            </el-form>
            <el-form v-if="banItem.id != '' && banItem.id != null">
                <el-row style="align-items: center;">
                    <p style="font-weight: bold;">封禁备注</p>
                </el-row>
                <el-form-item>
                    <el-input type="textarea" :rows="6" v-model="banItem.notes" />
                </el-form-item>
            </el-form>
            <el-form ref="ruleFormRef" :rules="rules" :model="banItem">
                <el-row style="align-items: center;">
                    <p style="font-size: 20px; color: red;">*</p>
                    <h3>备注</h3>
                </el-row>
                <el-form-item prop="notes">
                    <el-input type="textarea" :rows="6" v-model="banItem.notes" />
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
                    <p>{{ banItem.user_id }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户昵称:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.nick_name }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户提款账号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.id_number }}</p>
                    <el-button type="primary" link style="margin-left: auto;">复制</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁原因:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.origin }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁人员:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ banItem.operator_name }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">封禁时间:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ formatDate(banItem.created_at) }}</p>
                </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
                <el-col :span="6" class="detail-item-left-bg">封禁备注:</el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="detail-item-right-bg" style="height: 120px;">
                    <el-input v-model="banItem.notes" type="textarea" :row="10"/>
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