<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import moment from "moment-timezone";

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const loading = ref<boolean>(false);

const total_count = ref<number>(0);

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const firstLevelAgentList = ref<Array<any>>([
  {
    item_1: "2023-12-20",
    item_2: 100,
    item_3: 100,
    item_4: 99999.99,
  },
  {
    item_1: "2023-12-20",
    item_2: 100,
    item_3: 100,
    item_4: 99999.99,
  },
]);

const buttonIndex = ref<number>(0);

const handleDateRange = (date: string) => {
  switch (date) {
    case "before yesterday":
      dateRange.value[0] = moment().subtract(2, "day").format("YYYY-MM-DD");
      dateRange.value[1] = moment().subtract(2, "day").format("YYYY-MM-DD");
      buttonIndex.value = 2;
      break;
    case "yesterday":
      dateRange.value[0] = moment().subtract(1, "day").format("YYYY-MM-DD");
      dateRange.value[1] = moment().subtract(1, "day").format("YYYY-MM-DD");
      buttonIndex.value = 1;
      break;
    case "today":
      dateRange.value[0] = moment().format("YYYY-MM-DD");
      dateRange.value[1] = moment().format("YYYY-MM-DD");
      buttonIndex.value = 0;
      break;
    case "this week":
      dateRange.value[0] = moment().clone().startOf("week").format("YYYY-MM-DD");
      dateRange.value[1] = moment().clone().endOf("week").format("YYYY-MM-DD");
      buttonIndex.value = 3;
      break;
    case "last week":
      dateRange.value[0] = moment()
        .clone()
        .subtract(1, "week")
        .startOf("week")
        .format("YYYY-MM-DD");
      dateRange.value[1] = moment()
        .clone()
        .subtract(1, "week")
        .endOf("week")
        .format("YYYY-MM-DD");
      buttonIndex.value = 4;
      break;
    case "this month":
      dateRange.value[0] = moment().clone().startOf("month").format("YYYY-MM-DD");
      dateRange.value[1] = moment().clone().endOf("month").format("YYYY-MM-DD");
      buttonIndex.value = 5;
      break;
    case "last month":
      dateRange.value[0] = moment()
        .clone()
        .subtract(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      dateRange.value[1] = moment()
        .clone()
        .subtract(1, "month")
        .endOf("month")
        .format("YYYY-MM-DD");
      buttonIndex.value = 6;
      break;
    case "this year":
      dateRange.value[0] = moment().clone().startOf("year").format("YYYY-MM-DD");
      dateRange.value[1] = moment().clone().endOf("year").format("YYYY-MM-DD");
      buttonIndex.value = 7;
      break;
    case "last year":
      dateRange.value[0] = moment()
        .clone()
        .subtract(1, "year")
        .startOf("year")
        .format("YYYY-MM-DD");
      dateRange.value[1] = moment()
        .clone()
        .subtract(1, "year")
        .endOf("year")
        .format("YYYY-MM-DD");
      buttonIndex.value = 8;
      break;
    case "last 7days":
      dateRange.value[0] = moment().subtract(7, "day").format("YYYY-MM-DD");
      dateRange.value[1] = moment().subtract(0, "day").format("YYYY-MM-DD");
      buttonIndex.value = 9;
      break;
    case "last 30days":
      dateRange.value[0] = moment().subtract(30, "day").format("YYYY-MM-DD");
      dateRange.value[1] = moment().subtract(0, "day").format("YYYY-MM-DD");
      buttonIndex.value = 10;
      break;
    case "all":
      dateRange.value[0] = "";
      dateRange.value[1] = "";
      buttonIndex.value = 11;
      break;
    case "previous day":
      var date1 = new Date(dateRange.value[0]);
      var date2 = new Date(dateRange.value[1]);

      dateRange.value[0] = moment(date1).subtract(1, "day").format("YYYY-MM-DD");
      dateRange.value[1] = moment(date2).subtract(1, "day").format("YYYY-MM-DD");
      break;
    case "next day":
      var date1 = new Date(dateRange.value[0]);
      var date2 = new Date(dateRange.value[1]);

      dateRange.value[0] = moment(date1).subtract(-1, "day").format("YYYY-MM-DD");
      dateRange.value[1] = moment(date2).subtract(-1, "day").format("YYYY-MM-DD");
      break;
  }
};

const handleQuery = () => {
  loading.value = true;
};

const resetQuery = () => {};

const handlePagination = () => {};
</script>

<template>
  <el-card style="margin-top: 10px">
    <el-row>
      <el-button
        :type="buttonIndex == 0 ? 'primary' : ''"
        @click="handleDateRange('today')"
        >今日</el-button
      >
      <el-button
        :type="buttonIndex == 1 ? 'primary' : ''"
        @click="handleDateRange('yesterday')"
        >昨日</el-button
      >
      <el-button
        :type="buttonIndex == 2 ? 'primary' : ''"
        @click="handleDateRange('before yesterday')"
        >前日</el-button
      >
      <el-button
        :type="buttonIndex == 3 ? 'primary' : ''"
        @click="handleDateRange('this week')"
        >本周</el-button
      >
      <el-button
        :type="buttonIndex == 4 ? 'primary' : ''"
        @click="handleDateRange('last week')"
        >上周</el-button
      >
      <el-button
        :type="buttonIndex == 5 ? 'primary' : ''"
        @click="handleDateRange('this month')"
        >本月</el-button
      >
      <el-button
        :type="buttonIndex == 6 ? 'primary' : ''"
        @click="handleDateRange('last month')"
        >上月</el-button
      >
      <el-button
        :type="buttonIndex == 7 ? 'primary' : ''"
        @click="handleDateRange('this year')"
        >今年</el-button
      >
      <el-button
        :type="buttonIndex == 8 ? 'primary' : ''"
        @click="handleDateRange('last year')"
        >去年</el-button
      >
      <el-button
        :type="buttonIndex == 9 ? 'primary' : ''"
        @click="handleDateRange('last 7days')"
        >过去7天</el-button
      >
      <el-button
        :type="buttonIndex == 10 ? 'primary' : ''"
        @click="handleDateRange('last 30days')"
        >过去30天</el-button
      >
      <el-button
        :type="buttonIndex == 11 ? 'primary' : ''"
        @click="handleDateRange('all')"
        >全部</el-button
      >
    </el-row>
    <el-row style="margin-top: 20px">
      <el-form ref="formDataRef" :inline="true" style="width: 100%">
        <el-form-item>
          <el-button @click="handleDateRange('previous day')">前一天</el-button>
        </el-form-item>
        <el-form-item label="选择周期:">
          <el-date-picker
            type="daterange"
            v-model="dateRange"
            range-separator="至"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleDateRange('next day')">后一天</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" :icon="Search" @click="handleQuery"> 搜索 </el-button>
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-card>
  <div class="d-flex justify-end mt-4 rebate-withdrawal-statistics">
    <el-card>
      <el-form-item label="总计提现总人数:">99999999</el-form-item>
    </el-card>
    <el-card>
      <el-form-item label="总计提现总次数:">9999999</el-form-item>
    </el-card>
    <el-card>
      <el-form-item label="总计提现金额:">999999999999</el-form-item>
    </el-card>
  </div>
  <el-table
    v-loading="loading"
    :data="firstLevelAgentList"
    style="width: 100%"
    class="mt-2"
  >
    <el-table-column label="日期" align="center" prop="item_1">
      <template #default="scope">
        {{ scope.row.item_1 }}
      </template>
    </el-table-column>
    <el-table-column label="代理提现人数" align="center" prop="item_2" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_2 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="代理提现次数" align="center" prop="item_3" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_3 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="代理提现金额" align="center" prop="item_4" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
  </el-table>
  <div style="float: right">
    <pagination
      :total="total_count"
      v-model:page="formData.pageNum"
      v-model:limit="formData.pageSize"
      @pagination="handlePagination"
    />
  </div>
</template>

<style lang="scss">
.rebate-withdrawal-statistics {
  .el-card__body {
    padding: 4px !important;
  }
  .el-form-item {
    margin-right: 0px !important;
    margin-bottom: 0px !important;
  }
}
</style>
