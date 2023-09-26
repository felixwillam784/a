<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";

const router = useRouter();

const activeButton = ref<number>(9);

const formData = ref<any>({
    dateRange: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(5);
const loading = ref<boolean>(false);
const disabled = ref<boolean>(false);
const totalPage = ref<number>(5);
const registrationRecordList = ref([
    {
        login_time: "2023-07-01 15:23:00",
        register_ip: "123.123.11.1",
        login_ip: "123.123.11.1",
        attribution: "巴西 圣保罗",
        login_platform: "IOS",
        login_device: "IPHONE_14",
        device_no: "XXXXXXXXXX",
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

const handleScrollLoad = () => {

    if (disabled.value) return;

    formData.value.pageNum++;
    if (formData.value.pageNum <= totalPage.value) {
    }

    if (formData.value.pageNum === totalPage.value) {
        disabled.value = true;
    }
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
                <el-form-item style="float: right;">
                    <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 10px;">
            <el-table v-loading="loading" v-el-table-infinite-scroll="handleScrollLoad" :data="registrationRecordList"
                :infinite-scroll-disabled="disabled" style="width: 100%; margin-top: 10px; height: 535px; overflow: auto;">

                <el-table-column label="登录时间" align="center" prop="login_time" width="200" />
                <el-table-column label="注册IP" align="center" prop="register_ip">
                    <template #default="scope">
                        <p>{{ scope.row.register_ip }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="登录IP" align="center" prop="login_ip">
                    <template #default="scope">
                        <p>{{ scope.row.login_ip }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="归属地" align="center" prop="attribution">
                    <template #default="scope">
                        <p>{{ scope.row.attribution }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="登录平台" align="center" prop="login_platform">
                    <template #default="scope">
                        <p>{{ scope.row.login_platform }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="登录设备" align="center" prop="login_device">
                    <template #default="scope">
                        <p>{{ scope.row.login_device }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="设备号" align="center" prop="device_no">
                    <template #default="scope">
                        <p>{{ scope.row.device_no }}</p>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}
</style>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>
