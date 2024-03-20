<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import useStore from "@/store";
import { getGameReport } from "@/api/DataAnalysis";
import { tr } from "element-plus/es/locale";

const { user } = useStore();
const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

interface GetGameReport {
  game_time: string;
  game_name: string;
  game_platform: string;
  game_rd_company: string;
  game_bet: number;
  game_prize: number;
  game_platform_profit: number;
  game_bettor: number;
  game_count: number;
  game_house_edge: number;
  game_retention_rate: number;
  game_revenue_proportion: number;
}

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
  gameType: "",
});

const loading = ref<boolean>(false);

const totablBonous = ref<number>(9999);
const recip_count = ref<number>(9999);
const collection_count = ref<number>(9999);
const bonous_count = ref<string>("9999.99");

const gameReportList = ref<Array<GetGameReport>>([
  {
    game_time: "2020-6-30",
    game_name: "DICE",
    game_platform: "自研",
    game_rd_company: "自研",
    game_bet: 999999.99,
    game_prize: 999999.99,
    game_platform_profit: -111.11,
    game_bettor: 999,
    game_count: 99999,
    game_house_edge: -0.5,
    game_retention_rate: 99.99,
    game_revenue_proportion: 99.99,
  },
  {
    game_time: "2020-6-30",
    game_name: "Crash",
    game_platform: "自研",
    game_rd_company: "自研",
    game_bet: 999999.99,
    game_prize: 999999.99,
    game_platform_profit: 111.11,
    game_bettor: 999,
    game_count: 99999,
    game_house_edge: -0.5,
    game_retention_rate: 99.99,
    game_revenue_proportion: 99.99,
  },
]);

const gameTypes = ref<Array<any>>([]);

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

onMounted(() => {
  handleDateRange("this week");
});

const router = useRouter();

const go_to_detail = (name: string) => {
  router.push({ name: "GameReportDetail", params: { name: name } });
};
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
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
              <el-form-item label="选择游戏">
                <el-select v-model="formData.gameType" placeholder="请选择游戏">
                  <el-option
                    v-for="(item, index) in gameTypes"
                    :label="item.label"
                    :value="item.value"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: right">
                <el-button :icon="Refresh">重置</el-button>
                <el-button :icon="Search">查新</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>

        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="12" :xs="12"> </el-col>
          <el-col :span="12" :xs="12" style="display: flex; justify-content: center">
            <span class="game-report-overview game-report-bg1"
              >游戏局数: {{ totablBonous }}</span
            >
            <span class="game-report-overview game-report-bg1"
              >打码量: {{ recip_count }}</span
            >
            <span class="game-report-overview game-report-bg2"
              >派奖: {{ collection_count }}</span
            >
            <span class="game-report-overview game-report-bg2"
              >庄家优势: {{ bonous_count }}</span
            >
          </el-col>
        </el-row>

        <el-card style="margin-top: 20px">
          <el-table v-loading="loading" :data="gameReportList" style="width: 100%">
            <el-table-column label="时间" align="center" prop="game_time" />
            <el-table-column label="游戏名称" align="center" prop="game_name">
              <template #default="scope">
                <el-button
                  type="primary"
                  link
                  @click="go_to_detail(scope.row.game_name)"
                  >{{ scope.row.game_name }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="平台" align="center" prop="game_platform" />
            <el-table-column label="研发公司" align="center" prop="game_rd_company" />
            <el-table-column label="投注金额" align="center" prop="game_bet" />
            <el-table-column label="派奖金额" align="center" prop="game_prize" />
            <el-table-column label="平台盈亏" align="center" prop="game_platform_profit">
              <template #default="scope">
                <div
                  :style="
                    scope.row.game_platform_profit > 0 ? 'color:black' : 'color: red'
                  "
                >
                  {{ scope.row.game_platform_profit }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="投注人数" align="center" prop="game_bettor" />
            <el-table-column label="投注局数" align="center" prop="game_count" />
            <el-table-column label="庄家优势" align="center" prop="game_house_edge">
              <template #default="scope"> {{ scope.row.game_house_edge }}% </template>
            </el-table-column>
            <el-table-column label="游戏留存率" align="center" prop="game_retention_rate">
              <template #default="scope"> {{ scope.row.game_retention_rate }}% </template>
            </el-table-column>
            <el-table-column
              label="营收占比"
              align="center"
              prop="game_revenue_proportion"
            >
              <template #default="scope">
                {{ scope.row.game_revenue_proportion }}%
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.red {
  color: red;
}

.game-report-overview {
  color: red;
  font-size: 18px;
  border: 1px solid;
  border-color: black;
  margin-right: 10px;
  padding: 10px 15px;
}

.game-report-bg1 {
  background-color: #ffccff;
}

.game-report-bg2 {
  background-color: #fff7e6;
}
</style>
