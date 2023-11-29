<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    modifyReason: string
}

interface GetAgentAchievement {
    id: string,
    serial_number: number
    agent_number: number,
    award_amount: number,
    big_odds: string,
}

const router = useRouter();

const formData = ref<any>({
    aunt_odds: "1倍",
    open: true,
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const agentAchievementDialogVisible = ref<boolean>(false);
const agentAchievementDialogTitle = ref<string>("添加代理成就");
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

const agentAchievementList = ref<Array<GetAgentAchievement>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        serial_number: 1,
        agent_number: 5,
        award_amount: 10,
        big_odds: "1倍",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        serial_number: 2,
        agent_number: 20,
        award_amount: 40,
        big_odds: "1倍",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        serial_number: 3,
        agent_number: 50,
        award_amount: 100,
        big_odds: "1倍",
    },
])

const agentAchievementItem = ref<GetAgentAchievement>({
    id: "8e8fd8fsdfd8fe8f8df8ef",
    serial_number: 1,
    agent_number: 5,
    award_amount: 10,
    big_odds: "1倍",
})

const handleQuery = () => {
}

const resetQuery = () => {
}

const importExcel = () => {
    // exportUser(queryParams.value).then((response: any) => {
    //     const blob = new Blob([response.data], {
    //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
    //     });
    //     const a = document.createElement('a');
    //     const href = window.URL.createObjectURL(blob); // 下载的链接
    //     a.href = href;
    //     a.download = decodeURI(
    //         response.headers['content-disposition'].split(';')[1].split('=')[1]
    //     ); // 获取后台设置的文件名称
    //     document.body.appendChild(a);
    //     a.click(); // 点击导出
    //     document.body.removeChild(a); // 下载完成移除元素
    //     window.URL.revokeObjectURL(href); // 释放掉blob对象
    // });
}

const addAgentAchievementDialog = () => {
    agentAchievementItem.value = {
        id: "",
        serial_number: 4,
        agent_number: 100,
        award_amount: 200,
        big_odds: "1倍",
    }
    agentAchievementDialogVisible.value = true;
    agentAchievementDialogTitle.value = "添加代理成就";
    submitBtnText.value = "保存添加";
    closeBtnText.value = "取消添加";
}

const editAgentAchievementDialog = (item: GetAgentAchievement) => {
    agentAchievementItem.value = item;
    agentAchievementDialogVisible.value = true;
    agentAchievementDialogTitle.value = "代理成就修改";
    submitBtnText.value = "保存修改";
    closeBtnText.value = "取消修改";
}

const closeDialog = () => {
    agentAchievementDialogVisible.value = false;
}

const auntOptions = ref<Array<any>>([
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
                        <el-form-item label="提现需求打码倍率" prop="aunt_odds">
                            <el-select v-model="formData.aunt_odds">
                                <el-option v-for="(item, index) in auntOptions" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否开启" prop="open">
                            <el-switch v-model="formData.open"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Upload" @click="importExcel">excel导入</el-button>
                            <el-button :icon="Plus" @click="addAgentAchievementDialog">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="agentAchievementList" style="width: 100%;">
                        <el-table-column label="序号" align="center" prop="serial_number" width="100" />
                        <el-table-column label="一级代理数量" align="center" prop="agent_number" />
                        <el-table-column label="奖励" align="center" prop="award_amount">
                            <template #default="scope">
                                <p>${{ scope.row.award_amount.toFixed(2) }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="大妈赔率" align="center" prop="big_odds" />
                        <el-table-column align="center" fixed="right" width="120">
                            <template #default="scope">
                                <el-button type="success" link @click="editAgentAchievementDialog(scope.row)">修改</el-button>
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
        
        <el-dialog :title="agentAchievementDialogTitle" v-model="agentAchievementDialogVisible" width="600px" append-to-body
            @close="closeDialog">
            <el-form label-width="160px">
                <el-form-item label="序号:">
                    <el-input v-model="agentAchievementItem.serial_number" />
                </el-form-item>
                <el-form-item label="需求一级代理数量:">
                    <el-input v-model="agentAchievementItem.agent_number" />
                </el-form-item>
                <el-form-item label="奖励($):">
                    <el-input v-model="agentAchievementItem.award_amount" />
                </el-form-item>
                <el-form-item label="提现需求的打码倍率:">
                    <el-input v-model="agentAchievementItem.big_odds" />
                </el-form-item>
            </el-form>
            <el-form v-if="agentAchievementItem.id != '' && agentAchievementItem.id != null" ref="ruleFormRef"
                :rules="rules" :model="ruleForm">
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