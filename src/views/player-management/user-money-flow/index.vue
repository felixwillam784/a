<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Download } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

const router = useRouter();

const formData = ref<any>({
    customer_account: "",
    customer_name: "",
    customer_label: "",
    flow_date: moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD HH:mm:ss"),
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(4);

const userMoneyFlowList = ref<Array<any>>([
    {
        customer_id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_label: "用户备注",
        flow_amount: -999,
        flow_type: "下注",
        flow_time: "2023-07-12 10:23:24",
    },
    {
        customer_id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_label: "用户备注",
        flow_amount: 50,
        flow_type: "活动",
        flow_time: "2023-07-12 10:23:24",
    },
    {
        customer_id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_label: "用户备注",
        flow_amount: -999,
        flow_type: "体现",
        flow_time: "2023-07-12 10:23:24",
    },
    {
        customer_id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_label: "用户备注",
        flow_amount: 50,
        flow_type: "充值",
        flow_time: "2023-07-12 10:23:24",
    },
])

const handleQuery = () => {

}

const resetQuery = () => {

}

const exportTable = () => {
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

const goUserFlowDetailPage = () => {
    router.push({ name: "Flow Detail" });
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="客户账号" prop="keywords">
                            <el-input v-model="formData.customer_account" placeholder="请输入客户账号" clearable
                                style="width: 200px" />
                        </el-form-item>

                        <el-form-item label="客户名字" prop="customer_name">
                            <el-input v-model="formData.customer_name" placeholder="请输入客户账号" clearable
                                style="width: 200px" />
                        </el-form-item>
                    </el-form>
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="客户标签" prop="customer_label">
                            <el-select v-model="formData.customer_label" placeholder="请选择客户标签" clearable
                                style="width: 200px">
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="流水日期" prop="flow_date">
                            <el-date-picker v-model="formData.flow_date" type="date" placeholder="选择一个日期"
                                format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-form-item>

                        <el-form-item style="float: right;">
                            <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
                            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                            <el-button :icon="Download" @click="exportTable">导出</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="userMoneyFlowList" style="width: 100%;">

                        <el-table-column key="customer_id" label="用户ID" align="center" prop="customer_id" width="200" />
                        <el-table-column key="customer_account" label="用户账号" align="center" prop="customer_account"
                            width="160" />
                        <el-table-column label="用户名" width="160" align="center" prop="customer_name" />
                        <el-table-column label="用户标签" width="120" align="center" prop="customer_label" />
                        <el-table-column label="流水金额" width="120" align="center" prop="flow_amount">
                            <template #default="scope">
                                <Font color="green" v-if="scope.row.flow_amount > 0">
                                    ${{ scope.row.flow_amount.toFixed(2) }}
                                </Font>
                                <Font color="red" v-else>
                                    -${{ scope.row.flow_amount.toFixed(2).substring(1) }}
                                </Font>
                            </template>
                        </el-table-column>
                        <el-table-column label="类型" align="center" prop="flow_type" width="120"></el-table-column>
                        <el-table-column label="时间" align="center" prop="flow_time"></el-table-column>
                        <el-table-column align="center">
                            <template #default="scope">
                                <el-button type="danger" link @click="goUserFlowDetailPage">详情</el-button>
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
    </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>