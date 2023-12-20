<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

interface GetVIPData {
    vip_level:number,
    vip_rank:string,
    recharge_vip_upgrade:number,
    coding_vip_upgrade:number,
    withdrawal_fee:number,
    free_amount_month:number,
    maximum_amount_amount:number,
    daily_limit_amount:number,
    monthly_limit_amount:number,
    daily_limit_time:number,
    monthly_limit_time:number,
    recharge_vip_up:number,
    coding_vip_relegation:number,
    vip_limit_days:number,
    vip_and_was_lowered:number,
}

const router = useRouter();

const formData = ref<any>({
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const vipDialogVisible = ref<boolean>(false);
const vipDialogTitle = ref<string>("VIP信息修改");
const total = ref<number>(2);
const modifyReason = ref<string>("");
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");

const vipList = ref<Array<GetVIPData>>([{
        vip_level:0,
        vip_rank:"Iron",
        recharge_vip_upgrade:0,
        coding_vip_upgrade:0,
        withdrawal_fee:2.00,
        free_amount_month:0.00,
        maximum_amount_amount:20000.00,
        daily_limit_amount:20000.00,
        monthly_limit_amount:10,
        daily_limit_time:30,
        monthly_limit_time:0,
        recharge_vip_up:0,
        coding_vip_relegation:0,
        vip_limit_days:30,
        vip_and_was_lowered:0,
    },
    {
        vip_level:1,
        vip_rank:"Bronze",
        recharge_vip_upgrade:0,
        coding_vip_upgrade:0,
        withdrawal_fee:1.95,
        free_amount_month:0.00,
        maximum_amount_amount:20000.00,
        daily_limit_amount:20000.00,
        monthly_limit_amount:10,
        daily_limit_time:30,
        monthly_limit_time:0,
        recharge_vip_up:100,
        coding_vip_relegation:100,
        vip_limit_days:30,
        vip_and_was_lowered:1,
    },
])

const vipItem = ref<GetVIPData>()

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

const formatPercentage = (value: string) => {
    if (value === null || value === '') {
        return '';
    }
    return `${value}%`;
}
const parsePercentage = (value: string) => {
    const strippedValue = value.replace('%', '');
    const parsedValue = parseFloat(strippedValue);
    if (isNaN(parsedValue)) {
        return null;
    }
    return parsedValue;
}

const submitForm = () => {

}
const value1 = ref(true)
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120" class="right_position">
                        <el-form-item>
                            <el-button>新增VIP等级</el-button>
                            <el-button>VIP段位</el-button>
                            <el-button>模板导出</el-button>
                            <el-button>Excel导入</el-button>
                            <el-button>Excel导出</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="right_position" style="margin-right:20px">
                        <el-switch
                            size = "large"
                            v-model="value1"
                            inline-prompt
                            active-text="开启"
                            inactive-text="关闭"
                        />
                    </div>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="vipList" style="width: 100%;">
                        <el-table-column label="vip等级" align="center" prop="vip_level" width="160" />
                        <el-table-column label="vip段位" align="center" prop="vip_rank" width="160" />
                        <el-table-column label="vip升级所需充值" align="center" prop="recharge_vip_upgrade" width="160" />
                        <el-table-column label="vip升级所需打码" align="center" prop="coding_vip_upgrade" width="160" />
                        <el-table-column label="提现手续费" align="center" prop="withdrawal_fee" width="160" />
                        <el-table-column label="提现免手续费 额度/月" align="center" prop="free_amount_month" width="160" />
                        <el-table-column label="单笔最高提现金额" align="center" prop="maximum_amount_amount" width="160" />
                        <el-table-column label="每日可提现额度" align="center" prop="daily_limit_amount" width="160" />
                        <el-table-column label="每月可提现额度" align="center" prop="monthly_limit_amount" width="160" />
                        <el-table-column label="每日提现次数限制" align="center" prop="daily_limit_time" width="160" />
                        <el-table-column label="每月提现次数限制" align="center" prop="monthly_limit_time" width="160" />
                        <el-table-column label="vip保级所需充值" align="center" prop="recharge_vip_up" width="160" />
                        <el-table-column label="vip保级所需打码" align="center" prop="coding_vip_relegation" width="160" />
                        <el-table-column label="vip保级时效(天)" align="center" prop="vip_limit_days" width="160" />
                        <el-table-column label="vip保级失败降低等级" align="center" prop="vip_and_was_lowered" width="160" />
                        
                        <el-table-column label="操作" align="center" fixed="right" width="120">
                            <template #default="scope">
                                <el-button type="primary" link>详情</el-button>
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
                    <el-input v-model="vipItem.betting_rebate" :formatter="formatPercentage" :parser="parsePercentage" />
                </el-form-item>
                <el-form-item label="提现手续费（%）:">
                    <el-input v-model="vipItem.withdrawal_fee" :formatter="formatPercentage" :parser="parsePercentage" />
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
    background: #f5f7fa !important;
    height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
    height: 80px;
}

.right_position {
    display: flex;
    justify-content: right;
}
</style>