<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

interface GetVIPData {
    id: string,
    vip_level: string,
    required_recharge: number,
    required_bet: number,
    required_people_number: number,
    bonus: number,
    betting_rebate: number,
    withdrawal_fee: number,
    free_fee_quota: number,
}

const router = useRouter();

const formData = ref<any>({
    vip_level: "",
    customer_name: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const vipDialogVisible = ref<boolean>(false);
const vipDialogTitle = ref<string>("VIP信息修改");
const total = ref<number>(3);
const modifyReason = ref<string>("");
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");

const vipList = ref<Array<GetVIPData>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        vip_level: "VIP0",
        required_recharge: 0,
        required_bet: 0,
        required_people_number: 0,
        bonus: 0,
        betting_rebate: 0,
        withdrawal_fee: 4,
        free_fee_quota: 100,
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        vip_level: "VIP1",
        required_recharge: 100,
        required_bet: 100,
        required_people_number: 1,
        bonus: 100,
        betting_rebate: 1,
        withdrawal_fee: 3,
        free_fee_quota: 100,
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        vip_level: "VIP2",
        required_recharge: 200,
        required_bet: 200,
        required_people_number: 3,
        bonus: 200,
        betting_rebate: 2,
        withdrawal_fee: 2,
        free_fee_quota: 1000,
    },
])

const vipItem = ref<GetVIPData>({
    id: "",
    vip_level: "",
    required_recharge: 0,
    required_bet: 0,
    required_people_number: 0,
    bonus: 0,
    betting_rebate: 0,
    withdrawal_fee: 0,
    free_fee_quota: 0,
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

const addVIPDialog = () => {
    vipItem.value = {
        id: "",
        vip_level: "",
        required_recharge: 0,
        required_bet: 0,
        required_people_number: 0,
        bonus: 0,
        betting_rebate: 0,
        withdrawal_fee: 0,
        free_fee_quota: 0,
    }
    vipDialogVisible.value = true;
    vipDialogTitle.value = "VIP信息添加";
    submitBtnText.value = "保存新增";
    closeBtnText.value = "取消新增";
}

const editVIPDialog = (item: GetVIPData) => {
    vipItem.value = item;
    vipDialogVisible.value = true;
    vipDialogTitle.value = "VIP信息修改";
    submitBtnText.value = "保存修改";
    closeBtnText.value = "取消修改";
}

const closeDialog = () => {
    vipDialogVisible.value = false;
}

const submitForm = () => {

}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="VIP等级" prop="vip_level">
                            <el-input v-model="formData.vip_level" placeholder="请输入VIP等级" clearable />
                        </el-form-item>
                        <el-form-item label="客户名字" prop="customer_name">
                            <el-input v-model="formData.customer_name" placeholder="请输入客户名字" clearable />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                            <el-button :icon="Upload" @click="importExcel">excel导入</el-button>
                            <el-button :icon="Plus" @click="addVIPDialog">添加</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="vipList" style="width: 100%;">
                        <el-table-column label="VIP等级" align="center" prop="vip_level" width="200" />
                        <el-table-column label="所需充值（$）" align="center" prop="required_recharge" width="160" />
                        <el-table-column label="所需下注（$）" width="160" align="center" prop="required_bet" />
                        <el-table-column label="所需要求人数" width="120" align="center" prop="required_people_number" />
                        <el-table-column label="赠送彩金（$）" align="center" prop="bonus" width="120"></el-table-column>
                        <el-table-column label="投注返利（%）" align="center" prop="betting_rebate">
                            <template #default="scope">
                                <p>{{ scope.row.betting_rebate }}%</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="提现手续费（%）" align="center" prop="withdrawal_fee">
                            <template #default="scope">
                                <p>{{ scope.row.withdrawal_fee }}%</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="免手续费额度（$/月）" align="center" prop="free_fee_quota"></el-table-column>
                        <el-table-column align="center">
                            <template #default="scope">
                                <el-button type="success" link @click="editVIPDialog(scope.row)">修改</el-button>
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

        <!-- VIP信息修改 -->
        <el-dialog :title="vipDialogTitle" v-model="vipDialogVisible" width="600px" append-to-body @close="closeDialog">
            <el-form ref="dataFormRef" label-width="140px">
                <el-form-item label="VIP等级:">
                    <el-input v-model="vipItem.vip_level" />
                </el-form-item>
                <el-form-item label="所需充值（$）:">
                    <el-input v-model="vipItem.required_recharge" />
                </el-form-item>
                <el-form-item label="所需下注（$）:">
                    <el-input v-model="vipItem.required_bet" />
                </el-form-item>
                <el-form-item label="所需邀请人数:">
                    <el-input v-model="vipItem.required_people_number" />
                </el-form-item>
                <el-form-item label="赠送彩金（$）:">
                    <el-input v-model="vipItem.bonus" />
                </el-form-item>
                <el-form-item label="投注返利（%）:">
                    <el-input v-model="vipItem.betting_rebate" 
                        :formatter="(value: number) => `${value}%`" />
                </el-form-item>
                <el-form-item label="提现手续费（%）:">
                    <el-input v-model="vipItem.withdrawal_fee"
                        :formatter="(value: number) => `${value}%`" />
                </el-form-item>
                <el-form-item label="免手续费提现额度:">
                    <el-input v-model="vipItem.free_fee_quota" />
                </el-form-item>
            </el-form>
            <el-form v-if="vipItem.id != '' && vipItem.id != null">
                <el-row style="align-items: center;">
                    <Font color="red" style="font-size: 20px;">*</Font>
                    <h3>修改原因:</h3>
                </el-row>
                <el-input type="textarea" :rows="6" v-model="modifyReason" />
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitForm">{{ submitBtnText }}</el-button>
                    <el-button @click="closeDialog">{{ closeBtnText }}</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>