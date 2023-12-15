<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import useStore from '@/store';
import {getGameReport} from '@/api/DataAnalysis'
import { tr } from 'element-plus/es/locale';
const { user } = useStore();
const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

interface GetGameReport {
  id: string;
  game_date_time: string;
  game_activity_name: string;
  game_bonus_type: string;
  game_recharge_amount: number | string;
  game_participant_count: number;
  game_received_count: number;
  game_capita_bonus: string;
  game_bonus_ratio: string;
  game_statistics: string;
}

interface RejectInterface {
  reject_reason: string
  remark: string
}

const router = useRouter();

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
  gameType: ""
})

const loading = ref<boolean>(false);


const totablBonous = ref<number>(9999);
const recip_count = ref<number>(9999);
const collection_count = ref<number>(9999);
const bonous_count = ref<string>("9999.99");
const gameReportList = ref<Array<GetGameReport>>([
])

const total = ref<number>(6);

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

const handlePagination = () => {
  handleSearch();
}

const handleReset = () => {
  handleDateRange('this week');
}

const handleSearch = () => {
  loading.value = true;
  getData().then(()=>{
    loading.value = false;
  }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
}
onMounted(()=>{
  handleDateRange('this week');
  loading.value = true;
  getData().then(()=>{
    loading.value = false;
  }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
})
const getData = async () =>{
  
  let getGameReportListDataRes = await getGameReport(user.token, dateRange.value, formData.value);
  gameReportList.value  = getGameReportListDataRes.data.data.dataList;
  total.value = getGameReportListDataRes.data.data.dataList.length;

  totablBonous.value = getGameReportListDataRes.data.data.total_win_count;
  recip_count.value = getGameReportListDataRes.data.data.recipient_count;
  collection_count.value = getGameReportListDataRes.data.data.received_count;
  bonous_count.value = getGameReportListDataRes.data.data.people_bonus_amount;
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
                <el-select v-model = "formData.gameType" placeholder="请选择游戏">
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
            <span class = "game-report-overview game-report-bg1">彩金总数: {{totablBonous}}</span>
            <span class = "game-report-overview game-report-bg1">领取人数: {{recip_count}}</span>
            <span class = "game-report-overview game-report-bg2">领取次数: {{collection_count}}</span>
            <span class = "game-report-overview game-report-bg2">人数彩金: {{bonous_count}}</span>
          </el-col>
        </el-row>
        <el-card style="margin-top: 20px;">
          <el-table v-loading="loading" :data="gameReportList" style="width: 100%;">
            <el-table-column label="活动名字" align="center" prop="game_activity_name" width="200">
              <template #default="scope">
                <p>{{ scope.row.game_activity_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="赠金类型" align="center" prop="game_bonus_type" width="200">
              <template #default="scope">
                <p>{{ scope.row.game_bonus_type }}</p>
              </template>
            </el-table-column>
            <el-table-column label="充值金额" align="center" prop="game_recharge_amount" width="200">
              <template #default="scope">
                <p v-if="scope.row.game_recharge_amount !=''">{{ scope.row.game_recharge_amount }}</p>
                <p v-else> __</p>
              </template>
            </el-table-column>
            <el-table-column label="参与人数" align="center" prop="game_participant_count" width="200">
              <template #default="scope">
                <p>{{ scope.row.game_participant_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label="领取次数" align="center" prop="game_received_count" width="200">
              <template #default="scope">
                <p>{{ scope.row.game_received_count }}</p>
              </template>
            </el-table-column>
            <el-table-column label="人均彩金" align="center" prop="game_capita_bonus" width="200">
              <template #default="scope">
                <p>{{ scope.row.game_capita_bonus }}</p>
              </template>
            </el-table-column>
            <el-table-column label="彩金占比" align="center" prop="game_bonus_ratio" width="200">
              <template #default="scope">
                <p>{{ scope.row.game_bonus_ratio }}%</p>
              </template>
            </el-table-column>
            <el-table-column label="增进统计" align="center" prop="game_statistics" width="200">
              <template #default="scope">
                <p>{{ scope.row.game_statistics }}</p>
              </template>
            </el-table-column>
          </el-table>
          <div style="float: right;">
            <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize" @pagination="handlePagination" />
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