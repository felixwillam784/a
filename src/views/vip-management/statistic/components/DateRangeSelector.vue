<script setup lang="ts">
import moment from "moment-timezone";
import { onMounted, ref } from "vue";

const buttonIndex = ref<number>(0);
const dateRange = ref<Array<any>>([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);
const handledateRange = (date: string) => {
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

defineExpose({
  dateRange,
});
</script>

<template>
  <el-card style="margin-top: 10px">
    <el-row style="justify-content: space-between">
      <div>
        <el-button
          :type="buttonIndex == 11 ? 'primary' : ''"
          @click="handledateRange('all')"
          >全部</el-button
        >
        <el-button
          :type="buttonIndex == 0 ? 'primary' : ''"
          @click="handledateRange('today')"
          >今日</el-button
        >
        <el-button
          :type="buttonIndex == 1 ? 'primary' : ''"
          @click="handledateRange('yesterday')"
          >昨日</el-button
        >
        <el-button
          :type="buttonIndex == 2 ? 'primary' : ''"
          @click="handledateRange('before yesterday')"
          >前日</el-button
        >
        <el-button
          :type="buttonIndex == 3 ? 'primary' : ''"
          @click="handledateRange('this week')"
          >本周</el-button
        >
        <el-button
          :type="buttonIndex == 4 ? 'primary' : ''"
          @click="handledateRange('last week')"
          >上周</el-button
        >
        <el-button
          :type="buttonIndex == 5 ? 'primary' : ''"
          @click="handledateRange('this month')"
          >本月</el-button
        >
        <el-button
          :type="buttonIndex == 6 ? 'primary' : ''"
          @click="handledateRange('last month')"
          >上月</el-button
        >
        <el-button
          :type="buttonIndex == 7 ? 'primary' : ''"
          @click="handledateRange('this year')"
          >今年</el-button
        >
        <el-button
          :type="buttonIndex == 8 ? 'primary' : ''"
          @click="handledateRange('last year')"
          >去年</el-button
        >
        <el-button
          :type="buttonIndex == 9 ? 'primary' : ''"
          @click="handledateRange('last 7days')"
          >过去7天</el-button
        >
        <el-button
          :type="buttonIndex == 10 ? 'primary' : ''"
          @click="handledateRange('last 30days')"
          >过去30天</el-button
        >
      </div>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-form :inline="true" style="width: 100%">
        <el-form-item>
          <el-button @click="handledateRange('previous day')">前一天</el-button>
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
          <el-button @click="handledateRange('next day')">后一天</el-button>
        </el-form-item>
        <el-form-item style="float: right"> </el-form-item>
      </el-form>
    </el-row>
  </el-card>
</template>
