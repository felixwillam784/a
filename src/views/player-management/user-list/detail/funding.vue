<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';

const router = useRouter();

const activeButton = ref<number>(1);

const formData = ref<any>({
    dateRange: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    min_amount: "",
    max_amount: "",
    event_type: "",
    record_id: "",
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(5);
const loading = ref<boolean>(false);
const fundingDetailList = ref([
    {
        time: "2023-07-01 15:23:00",
        event: "派奖",
        details: "Crash",
        change_amount: 100,
        before_change_amount: 100,
        after_change_amount: 200,
        record_id: "XXXXXXXXXXXX",
        remark: "",
    },
    {
        time: "2023-07-01 15:23:00",
        event: "提现",
        details: "User",
        change_amount: 100,
        before_change_amount: 100,
        after_change_amount: 200,
        record_id: "XXXXXXXXXXXX",
        remark: "",
    },
    {
        time: "2023-07-01 15:23:00",
        event: "充值",
        details: "User",
        change_amount: -100,
        before_change_amount: 100,
        after_change_amount: 200,
        record_id: "XXXXXXXXXXXX",
        remark: "",
    },
    {
        time: "2023-07-01 15:23:00",
        event: "下注",
        details: "Crash",
        change_amount: -100,
        before_change_amount: 100,
        after_change_amount: 200,
        record_id: "XXXXXXXXXXXX",
        remark: "",
    },
    {
        time: "2023-07-01 15:23:00",
        event: "活动",
        details: "Login",
        change_amount: 100,
        before_change_amount: 100,
        after_change_amount: 200,
        record_id: "XXXXXXXXXXXX",
        remark: "",
    },
])

const handleQuery = () => {

}

const resetQuery = () => {

}

const goBack = () => {
    router.push({ name: "User List" });
}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}
</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
            <div style="margin-left: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'UserDetail')">用户详情</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'FundingDetails')">资金明细</el-button>
                <el-button :type="activeButton == 2 ? 'warning' : ''"
                    @click="handleButtonActive(2, 'AgentRebate')">代理返利</el-button>
                <el-button :type="activeButton == 3 ? 'warning' : ''"
                    @click="handleButtonActive(3, 'PromotionRecord')">推广记录</el-button>
                <el-button :type="activeButton == 4 ? 'warning' : ''"
                    @click="handleButtonActive(4, 'RechargeRecord')">充值记录</el-button>
                <el-button :type="activeButton == 5 ? 'warning' : ''"
                    @click="handleButtonActive(5, 'WithdrawalRecord')">提现记录</el-button>
                <el-button :type="activeButton == 6 ? 'warning' : ''"
                    @click="handleButtonActive(6, 'ManualDeduction')">人工扣款</el-button>
                <el-button :type="activeButton == 7 ? 'warning' : ''"
                    @click="handleButtonActive(7, 'ManualRecharge')">人工充值</el-button>
                <el-button :type="activeButton == 8 ? 'warning' : ''"
                    @click="handleButtonActive(8, 'BettingRecord')">投注记录</el-button>
                <el-button :type="activeButton == 9 ? 'warning' : ''"
                    @click="handleButtonActive(9, 'RegistrationRecord')">登录记录</el-button>
            </div>
        </div>

        <el-card>
            <el-form :model="formData" :inline="true" label-width="120">
                <el-form-item label="选择时间:">
                    <el-date-picker type="daterange" v-model="formData.dateRange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="金额范围:">
                    <el-input v-model="formData.min_amount" placeholder="最小金额"></el-input>
                    <font style="margin: 0px 6px;">至</font>
                    <el-input v-model="formData.max_amount" placeholder="最大金额"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
            <el-form :model="formData" :inline="true" label-width="120">
                <el-form-item label="事件类型:">
                    <el-select v-model="formData.event_type" placeholder="请选择事件类型"></el-select>
                </el-form-item>
                <el-form-item label="记录ID:">
                    <el-input v-model="formData.min_amount" placeholder="请输入记录ID"></el-input>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 10px;">
            <el-table v-loading="loading" :data="fundingDetailList" style="width: 100%; margin-top: 10px;">

                <el-table-column label="时间" align="center" prop="time" width="200" />
                <el-table-column label="事件" align="center" prop="event" />
                <el-table-column label="详情" align="center" prop="details">
                    <template #default="scope">
                        <p>{{ scope.row.details }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="变动金额" align="center" prop="change_amount">
                    <template #default="scope">
                        <p>{{ scope.row.change_amount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="变动前" align="center" prop="before_change_amount">
                    <template #default="scope">
                        <p>{{ scope.row.before_change_amount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="变动后" align="center" prop="after_change_amount">
                    <template #default="scope">
                        <p>{{ scope.row.after_change_amount.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="记录ID" align="center" prop="record_id">
                    <template #default="scope">
                        <p>{{ scope.row.record_id }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center" prop="remark">
                    <template #default="scope">
                        <p>{{ scope.row.remark }}</p>
                    </template>
                </el-table-column>
            </el-table>

            <div style="float: right;">
                <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
                    v-model:limit="formData.pageSize" @pagination="handleQuery" />
            </div>
        </el-card>
    </div>
</template>

<style lang="scss">
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}


.betting-record-left-bg {
    background-color: #f5f7fa;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 32px;
}

.betting-record-right-bg {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 32px;
}

.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>
