<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { title } from 'process';

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

interface GetGameReport {
  id: string;
  game_date_time: string;
  game_type: string;
  game_platform: string;
  game_company: string;
  game_bet_amount: number;
  game_bonus_amount: number;
  game_platform_revenue: number;
  game_better_count: number;
  game_count: number;
  game_advantage: number;
  game_play_rate: number;
  game_revenue_rate: number;
}

interface RejectInterface {
  reject_reason: string
  remark: string
}

const router = useRouter();

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(5);

const gameReportList = ref<Array<GetGameReport>>([
  {
    id: "8e8fd8fsdfd8fe8f8df8ef",
    game_date_time: "2020-06-30",
    game_type: "Dice",
    game_platform: "自研",
    game_company: "自研",
    game_bet_amount: 999999.99,
    game_bonus_amount: 999999.99,
    game_platform_revenue: -111.11,
    game_better_count: 999,
    game_count: 99999,
    game_advantage: -0.5,
    game_play_rate: 99.99,
    game_revenue_rate: 99.99
  },
  {
    id: "8e8fd8fsdfd8fe8f8df8eg",
    game_date_time: "2020-06-30",
    game_type: "Crash",
    game_platform: "自研",
    game_company: "自研",
    game_bet_amount: 999999.99,
    game_bonus_amount: 999999.99,
    game_platform_revenue: 111.11,
    game_better_count: 999,
    game_count: 99999,
    game_advantage: 5.0,
    game_play_rate: 99.99,
    game_revenue_rate: 99.99
  },
  {
    id: "8e8fd8fsdfd8fe8f8df8eh",
    game_date_time: "2020-06-30",
    game_type: "Crash",
    game_platform: "Fundist",
    game_company: "PG",
    game_bet_amount: 999999.99,
    game_bonus_amount: 999999.99,
    game_platform_revenue: 111.11,
    game_better_count: 999,
    game_count: 99999,
    game_advantage: 5.0,
    game_play_rate: 99.99,
    game_revenue_rate: 99.99
  }
])

const gameTypes = ref<Array<any>>([
  {
    label: "Dice",
    value: "1"
  },
  {
    label: "Crash",
    value: "2"
  }
])

const handleDateRange = (date: string) => {
  switch (date) {
    case "before yesterday":
      dateRange.value[0] = moment().subtract(2, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(2, 'day').format('YYYY-MM-DD');
      buttonIndex.value = 2;
      break;
    case "yesterday":
      dateRange.value[0] = moment().subtract(1, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(1, 'day').format('YYYY-MM-DD');
      buttonIndex.value = 1;
      break;
    case "today":
      dateRange.value[0] = moment().format('YYYY-MM-DD');
      dateRange.value[1] = moment().format('YYYY-MM-DD');
      buttonIndex.value = 0;
      break;
    case "this week":
      dateRange.value[0] = moment().clone().startOf('week').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().endOf('week').format('YYYY-MM-DD');
      buttonIndex.value = 3;
      break;
    case "last week":
      dateRange.value[0] = moment().clone().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
      buttonIndex.value = 4;
      break;
    case "this month":
      dateRange.value[0] = moment().clone().startOf('month').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().endOf('month').format('YYYY-MM-DD');
      buttonIndex.value = 5;
      break;
    case "last month":
      dateRange.value[0] = moment().clone().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
      buttonIndex.value = 6;
      break;
    case "this year":
      dateRange.value[0] = moment().clone().startOf('year').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().endOf('year').format('YYYY-MM-DD');
      buttonIndex.value = 7;
      break;
    case "last year":
      dateRange.value[0] = moment().clone().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
      buttonIndex.value = 8;
      break;
    case "last 7days":
      dateRange.value[0] = moment().subtract(7, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(0, 'day').format('YYYY-MM-DD');
      buttonIndex.value = 9;
      break;
    case "last 30days":
      dateRange.value[0] = moment().subtract(30, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(0, 'day').format('YYYY-MM-DD');
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

      dateRange.value[0] = moment(date1).subtract(1, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment(date2).subtract(1, 'day').format('YYYY-MM-DD');
      break;
    case "next day":
      var date1 = new Date(dateRange.value[0]);
      var date2 = new Date(dateRange.value[1]);

      dateRange.value[0] = moment(date1).subtract(-1, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment(date2).subtract(-1, 'day').format('YYYY-MM-DD');
      break;
  }
}

const handleQuery = () => {
}

const handleReset = () => {
}

const handleSearch = () => {
}

</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card style="margin-top: 10px;">
          <el-row>
            <el-button :type="buttonIndex == 0 ? 'primary' : ''" @click="handleDateRange('today')">今日</el-button>
            <el-button :type="buttonIndex == 1 ? 'primary' : ''" @click="handleDateRange('yesterday')">昨日</el-button>
            <el-button :type="buttonIndex == 2 ? 'primary' : ''" @click="handleDateRange('before yesterday')">前日</el-button>
            <el-button :type="buttonIndex == 3 ? 'primary' : ''" @click="handleDateRange('this week')">本周</el-button>
            <el-button :type="buttonIndex == 4 ? 'primary' : ''" @click="handleDateRange('last week')">上周</el-button>
            <el-button :type="buttonIndex == 5 ? 'primary' : ''" @click="handleDateRange('this month')">本月</el-button>
            <el-button :type="buttonIndex == 6 ? 'primary' : ''" @click="handleDateRange('last month')">上月</el-button>
            <el-button :type="buttonIndex == 7 ? 'primary' : ''" @click="handleDateRange('this year')">今年</el-button>
            <el-button :type="buttonIndex == 8 ? 'primary' : ''" @click="handleDateRange('last year')">去年</el-button>
            <el-button :type="buttonIndex == 9 ? 'primary' : ''" @click="handleDateRange('last 7days')">过去7天</el-button>
            <el-button :type="buttonIndex == 10 ? 'primary' : ''" @click="handleDateRange('last 30days')">过去30天</el-button>
            <el-button :type="buttonIndex == 11 ? 'primary' : ''" @click="handleDateRange('all')">全部</el-button>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-form ref="formDataRef" :inline="true" style="width: 100%;">
              <el-form-item>
                <el-button  @click="handleDateRange('previous day')">前一天</el-button>
              </el-form-item>
              <el-form-item label="选择周期:">
                <el-date-picker type="daterange" v-model="dateRange" range-separator="至"
                  value-format="YYYY-MM-DD"></el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-button  @click="handleDateRange('next day')">后一天</el-button>
              </el-form-item>
              <el-form-item label="选择游戏">
                <el-select>
                  <el-option v-for="(item, index) in gameTypes" :label="item.label"
                    :value="item.value" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: right;">
                <el-button @click="handleReset" :icon="Refresh">重置</el-button>
                <el-button @click="handleSearch" :icon="Search">查新</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="12" :xs="12">
            
          </el-col>
          <el-col :span="12" :xs="12" style="display: flex; justify-content: center;">
            <span class = "game-report-overview game-report-bg1">游戏局数: 99999</span>
            <span class = "game-report-overview game-report-bg1">打码量: 99999.99</span>
            <span class = "game-report-overview game-report-bg2">派奖: 99999.99</span>
            <span class = "game-report-overview game-report-bg2">庄家优势: -0.5277777</span>
          </el-col>
        </el-row>
        <el-card style="margin-top: 20px;">
          <el-table v-loading="loading" :data="gameReportList" style="width: 100%;">
            <el-table-column label="时间" align="center" prop="game_date_time" width="160">
              <template #default="scope">
                <p>{{ scope.row.game_date_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏名称" align="center" prop="game_type" width="160">
              <template #default="scope">
                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;"
                  @click="router.push({ name: 'GameReportDetail'})">
                  {{ scope.row.game_type }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="平台" align="center" prop="game_platform" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_platform }}</p>
              </template>
            </el-table-column>
            <el-table-column label="研发公司" align="center" prop="game_company" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_company}}</p>
              </template>
            </el-table-column>
            <el-table-column label="投注金额" align="center" prop="game_bet_amount" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_bet_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="派奖金额" align="center" prop="game_bonus_amount" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_bonus_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="平台盈亏" align="center" prop="game_platform_revenue" width="120">
              <template #default="scope">
                <Font color="red"
                  v-if="scope.row.game_platform_revenue < 0">{{
                    scope.row.game_platform_revenue }}</Font>
                <Font v-else>{{ scope.row.game_platform_revenue }}</Font>
              </template>
            </el-table-column>
            <el-table-column label="投注人数" align="center" prop="game_better_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_better_count.toFixed(0) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="投注局数" align="center" prop="game_count" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_count.toFixed(0) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="庄家优势" align="center" prop="game_advantage" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_advantage.toFixed(1) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏留存率" align="center" prop="game_play_rate" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_play_rate.toFixed(2) }}%</p>
              </template>
            </el-table-column>
            <el-table-column label="营收占比" align="center" prop="game_revenue_rate" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_revenue_rate.toFixed(2) }}%</p>
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