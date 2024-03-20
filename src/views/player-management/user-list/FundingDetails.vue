<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';

const router = useRouter();

const goBack = () => {
    router.go(-1);
}

const customerName = ref<string>("UserName10001");
const formData = ref<any>({
    date: moment().tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    pageNum: 1,
    pageSize: 20,
})
const total = ref<number>(1);
const loading = ref<boolean>(false);
const fundingDetailList = ref([
    {
        time: "2023-07-01 15:23:00",
        timeType: "AAAAAAA",
        changeAmount: "+ $99",
        changeBeforeBalance: 900,
        changeAfterBalance: 999
    },
    {
        time: "2023-07-01 15:23:00",
        timeType: "BBBBBBB",
        changeAmount: "- $100",
        changeBeforeBalance: 1000,
        changeAfterBalance: 900
    },
    {
        time: "2023-07-01 15:23:00",
        timeType: "CCCCCCC",
        changeAmount: "+ $1000",
        changeBeforeBalance: 0,
        changeAfterBalance: 1000
    },
    {
        time: "2023-07-01 15:23:00",
        timeType: "DDDDDDD",
        changeAmount: "- $1000",
        changeBeforeBalance: 1000,
        changeAfterBalance: 0
    },
])

const handleQuery = () => {

}

const resetQuery = () => {

}
</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>

        <el-card>
            <el-row >
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8" class="betting-record-left-bg">用户名：</el-col>
                        <el-col :span="16" class="betting-record-right-bg">
                            {{ customerName }}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="16">
                    <el-form :model="formData" :inline="true" label-width="120">
                        <el-form-item label="明细日期:">
                            <el-date-picker v-model="formData.date" type="date" placeholder="Pick a Date"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table v-loading="loading" :data="fundingDetailList" style="width: 100%; margin-top: 10px;">

                <el-table-column label="时间" align="center" prop="time" width="200" />
                <el-table-column label="时间类型" align="center" prop="timeType" />
                <el-table-column label="变动金额" align="center" prop="changeAmount">
                    <template #default="scope">
                        <Font color="green" v-if="scope.row.changeAmount.includes('+')">{{ scope.row.changeAmount }}</Font>
                        <Font color="red" v-else>{{ scope.row.changeAmount }}</Font>
                    </template>
                </el-table-column>
                <el-table-column label="变动前余额" align="center" prop="changeBeforeBalance">
                    <template #default="scope">
                        <p>$ {{ scope.row.changeBeforeBalance.toFixed(2) }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="变动后余额" align="center" prop="changeAfterBalance">
                    <template #default="scope">
                        <p>$ {{ scope.row.changeAfterBalance.toFixed(2) }}</p>
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
