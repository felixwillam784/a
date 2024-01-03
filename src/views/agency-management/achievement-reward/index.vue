<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AchievementReward from "./components/AchievementReward.vue";
import AchievementStatistics from "./components/AchievementStatistics.vue";
import StageReward from "./components/StageReward.vue";
import StageStatistics from "./components/StageStatistics.vue";
import moment from "moment-timezone";
import { Search, Refresh } from "@element-plus/icons-vue";

const router = useRouter();

const activeIndex = ref<number>(0);

const achievementRewardDialog = ref<boolean>(false);
const achievementRewardCollectionDialog = ref<boolean>(false);

const invitation_reward_switch = ref<boolean>(true);

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};

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

const handleQuery = () => {};

const resetQuery = () => {};

const achievementRewardDialogShow = () => {
  achievementRewardDialog.value = true;
};

const achievementRewardCollectionDialogShow = () => {
  achievementRewardCollectionDialog.value = true;
}

const closeAchievementRewardDialog = () => {
  achievementRewardDialog.value = false;
};

const closeAchievementRewardCollectionDialog = () => {
  achievementRewardCollectionDialog.value = false
}
</script>

<template>
  <div class="app-container">
    <el-card v-if="activeIndex == 0 || activeIndex == 1">
      <el-row class="justify-end">
        <el-button @click="achievementRewardCollectionDialogShow">代理成就奖励领取设置</el-button>
        <el-button @click="achievementRewardDialogShow">新增代理成就奖励</el-button>
        <el-button>模版导出</el-button>
        <el-button>Excel导入</el-button>
        <el-button>Excel导出</el-button>
      </el-row>
      <el-row class="justify-end mt-4 align-center">
        代理成就奖励功能开启/关闭
        <el-switch
          size="large"
          v-model="invitation_reward_switch"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
          class="ms-2"
        />
      </el-row>
    </el-card>
    <el-card v-if="activeIndex == 2 || activeIndex == 3">
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
      <el-row class="mt-6">
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
            <el-button type="primary" :icon="Search" @click="handleQuery">
              搜索
            </el-button>
            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="mt-4">
      <div class="flex items-center">
        <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
          代理成就奖励
        </el-button>
        <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
          代理成就阶段奖励
        </el-button>
        <el-button :type="activeIndex == 2 ? 'warning' : ''" @click="handleBtnTab(2)">
          代理成就统计
        </el-button>
        <el-button :type="activeIndex == 3 ? 'warning' : ''" @click="handleBtnTab(3)">
          代理阶段成就统计
        </el-button>
        <div
          class="d-flex justify-end invitation-statistics-card ms-auto"
          v-if="activeIndex == 2 || activeIndex == 3"
        >
          <el-card>
            <el-form-item label="总计达成成就人数:">99999999</el-form-item>
          </el-card>
          <el-card>
            <el-form-item label="总计提现:">9999999</el-form-item>
          </el-card>
        </div>
      </div>
      <div class="mt-2">
        <AchievementReward
          v-if="activeIndex == 0"
          :achievementRewardDialog="achievementRewardDialog"
          :achievementRewardCollectionDialog="achievementRewardCollectionDialog"
          @closeAchievementRewardDialog="closeAchievementRewardDialog"
          @closeAchievementRewardCollectionDialog="closeAchievementRewardCollectionDialog"
        />
        <StageReward
          v-if="activeIndex == 1"
          :achievementRewardDialog="achievementRewardDialog"
          :achievementRewardCollectionDialog="achievementRewardCollectionDialog"
          @closeAchievementRewardDialog="closeAchievementRewardDialog"
          @closeAchievementRewardCollectionDialog="closeAchievementRewardCollectionDialog"
        />
        <AchievementStatistics v-if="activeIndex == 2" />
        <StageStatistics v-if="activeIndex == 3" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
.invitation-statistics-card {
  .el-card__body {
    padding: 4px !important;
  }
  .el-form-item {
    margin-right: 0px !important;
    margin-bottom: 0px !important;
  }
}
</style>
