<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { Search, Refresh, Upload, Plus, CopyDocument } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { number } from 'echarts';
import useStore from '@/store';
import {getRetentionReport} from '@/api/DataAnalysis'
const { user } = useStore();
const router = useRouter();
const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const buttonIndex = ref<number>(0);

const activeButton = ref<number>(0);

interface GetRetentionReport {
  id: string;
  retention_date_time: string;
  retention_new_register_count: number;
  retention_new_active_count: number;
  retention_active_conversion_rate: number;
  retention_recharge_nextday: number;
  retention_recharge_3day: number;
  retention_active_retention_rate_1: number;
  retention_active_retention_rate_3: number;
  retention_active_retention_rate_7: number;
  retention_active_retention_rate_15: number;
  retention_active_retention_rate_30: number;
  retention_agent_retention_rate_1: number;
  retention_agent_retention_rate_3: number;
  retention_agent_retention_rate_7: number;
  retention_agent_retention_rate_15: number;
  retention_agent_retention_rate_30: number;
  retention_first_charge_retention_rate_1: number;
  retention_first_charge_retention_rate_3: number;
  retention_first_charge_retention_rate_7: number;
  retention_first_charge_retention_rate_15: number;
  retention_first_charge_retention_rate_30: number;
  retention_active_retention_value_1: number;
  retention_active_retention_value_3: number;
  retention_active_retention_value_7: number;
  retention_active_retention_value_15: number;
  retention_active_retention_value_30: number;
  retention_agent_retention_value_1: number;
  retention_agent_retention_value_3: number;
  retention_agent_retention_value_7: number;
  retention_agent_retention_value_15: number;
  retention_agent_retention_value_30: number;
  retention_first_charge_retention_value_1: number;
  retention_first_charge_retention_value_3: number;
  retention_first_charge_retention_value_7: number;
  retention_first_charge_retention_value_15: number;
  retention_first_charge_retention_value_30: number;
}

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(1);

const retentionReportList = ref<Array<GetRetentionReport>>([
  
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

const handleButtonActive = (index: number) => {
    activeButton.value = index;
}

const handlePagination = () => {
  handleSearch();
}

const handleReset = () => {
  handleDateRange('today');
}

const handleSearch = () => {
  loading.value = true;
  getData().then(() =>{
    loading.value = false;
  }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
}
onMounted(()=>{
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
  
  let retentionReportListDataRes = await getRetentionReport(user.token, dateRange.value, formData.value);
  retentionReportList.value  = retentionReportListDataRes.data.data;
  total.value = retentionReportListDataRes.data.data.length;
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
              <el-form-item style="float: right;">
                <el-button @click="handleReset" :icon="Refresh">重置</el-button>
                <el-button @click="handleSearch" :icon="Search">查新</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
        <div class="user-detail-header">
          <div >
            <el-button :type="activeButton == 0 ? 'warning' : ''"
              @click="handleButtonActive(0)">活跃率</el-button>           
          </div>
        </div>
        <el-card style="margin-top: 20px;" v-if="activeButton == 0">
          <el-table v-loading="loading" :data="retentionReportList" style="width: 100%;" >
            <el-table-column label = "时间" align="left" prop="retention_date_time" width="100">
              <template #default="scope">
                <p>{{ scope.row.retention_date_time }}</p>
              </template>
            </el-table-column> 
            <el-table-column label = "新增注册" align="left" prop="retention_new_register_count" width="100">
              <template #default="scope">
                <p>{{ scope.row.retention_new_register_count }}</p>
              </template>
            </el-table-column> 
            <el-table-column label = "新增活跃" align="left" prop="retention_new_active_count" width="100">
              <template #default="scope">
                <p>{{ scope.row.retention_new_active_count }}</p>
              </template>
            </el-table-column> 
            <el-table-column label = "活跃转换比" align="left" prop="retention_active_conversion_rate" width="100">
              <template #default="scope">
                <p>{{ scope.row.retention_active_conversion_rate }}%</p>
              </template>
            </el-table-column> 
            <el-table-column label = "次日充值" align="left" prop="retention_recharge_nextday" width="100">
              <template #default="scope">
                <p>{{ scope.row.retention_recharge_nextday }}%</p>
              </template>
            </el-table-column> 
            <el-table-column label = "三日充值" align="left" prop="retention_recharge_3day" width="100">
              <template #default="scope">
                <p>{{ scope.row.retention_recharge_3day }}%</p>
              </template>
            </el-table-column>
            <el-table-column label = "活跃留存率" align="center" >
              <el-table-column label = "次日" align="left" prop="retention_active_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_active_retention_rate_1 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_active_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="retention_active_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_active_retention_rate_3 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_active_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="retention_active_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_active_retention_rate_7 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_active_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="retention_active_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_active_retention_rate_15 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_active_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="retention_active_retention_rate_30" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_active_retention_rate_30 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_active_retention_value_30 }}</p>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label = "代理留存率" align="center"  >
              <el-table-column label = "次日" align="left" prop="retention_agent_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_agent_retention_rate_1 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_agent_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="retention_agent_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_agent_retention_rate_3 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_agent_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="retention_agent_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_agent_retention_rate_7 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_agent_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="retention_agent_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_agent_retention_rate_15 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_agent_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="retention_agent_retention_rate_30" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_agent_retention_rate_30 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_agent_retention_value_30 }}</p>
                </template>
              </el-table-column>  
            </el-table-column>
            <el-table-column label = "首充留存率" align="center"  >
              <el-table-column label = "次日" align="left" prop="retention_first_charge_retention_rate_1" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_first_charge_retention_rate_1 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_first_charge_retention_value_1 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "3日" align="left" prop="retention_first_charge_retention_rate_3" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_first_charge_retention_rate_3 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_first_charge_retention_value_3 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "7日" align="left" prop="retention_first_charge_retention_rate_7" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_first_charge_retention_rate_7 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_first_charge_retention_value_7 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "15日" align="left" prop="retention_first_charge_retention_rate_15" width="90">
                <template #default="scope">
                  <p>{{ scope.row.retention_first_charge_retention_rate_15 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_first_charge_retention_value_15 }}</p>
                </template>
              </el-table-column>
              <el-table-column label = "30日" align="left" prop="retention_first_charge_retention_rate_30" width="90">
                <template #default="scope">
                  <p >{{ scope.row.retention_first_charge_retention_rate_30 }}%</p>
                  <p style="text-align: right; font-size: 12px;">{{ scope.row.retention_first_charge_retention_value_30 }}</p>
                </template>
              </el-table-column>  
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
.user-detail-header {
  padding-top: 20px;
  display: flex;
  align-items: center;
}
</style>