<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import useStore from "@/store";

const { agent } = useStore();
const router = useRouter();

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const loading = ref<boolean>(false);

const total_count = ref<number>(0);

const agencyList = ref<Array<any>>([
  {
    item_1: "User001",
    item_2: 9999,
    item_3: 9999,
    item_4: 9999,
    item_5: 9999,
    item_6: 9999,
    item_7: 9999,
    item_8: 9999,
    item_9: 9999,
    item_10: 9999,
    item_11: 9999,
    item_12: 9999,
    item_13: 9999,
    item_14: 9999,
    item_15: 9999,
    item_16: 9999,
    item_17: 9999,
    item_18: 9999,
    item_19: 9999,
    item_20: 9999,
    item_21: 9999,
    item_22: 9999,
    item_23: 9999,
    item_24: 9999,
    item_25: 9999,
    item_26: 9999,
    item_27: 9999,
    item_28: 9999,
    item_29: 9999,
    item_30: 9999,
  },
]);

const agentStatisticReportList = computed(() => {
  return agent.getAgentStatisticReportList;
});

const buttonIndex = ref<number>(1);

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

const handlePagination = () => {
  handleQuery();
};

const handleQuery = async () => {
  loading.value = true;
  formData.value.start_date = moment(dateRange.value[0] + " 00:00:00").valueOf();
  formData.value.end_date = moment(dateRange.value[1] + " 23:59:59").valueOf();
  await agent.dispatchAgentStatisticReportList(formData.value);
  loading.value = false;
};

const resetQuery = () => {
  handleDateRange("this week");
};

onMounted(async () => {
  handleDateRange("this week");
  loading.value = true;
  formData.value.start_date = moment(dateRange.value[0] + " 00:00:00").valueOf();
  formData.value.end_date = moment(dateRange.value[1] + " 23:59:59").valueOf();
  await agent.dispatchAgentStatisticReportList(formData.value);
  loading.value = false;
});
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
              <el-form-item style="float: right">
                <el-button type="primary" :icon="Search" @click="handleQuery">
                  搜索
                </el-button>
                <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
        <el-card style="margin-top: 20px">
          <el-table
            v-loading="loading"
            :data="agentStatisticReportList"
            style="width: 100%"
          >
            <el-table-column label="时间" align="center" prop="date" width="160">
              <template #default="scope">
                {{
                  moment.unix(scope.row.date).tz("Asia/Hong_Kong").format("YYYY-MM-DD")
                }}
              </template>
            </el-table-column>
            <el-table-column
              label="总代理数"
              align="center"
              prop="total_agent_count"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_agent_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总活跃代理数"
              align="center"
              prop="total_active_agent_count"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_active_agent_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增活跃代理数"
              align="center"
              prop="new_active_agent_count"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_active_agent_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增代理数"
              align="center"
              prop="new_agent_count"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_agent_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增一级付费金额"
              align="center"
              prop="new_level_payment_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_level_payment_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增一级提现金额"
              align="center"
              prop="new_level_withdraw_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_level_withdraw_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增一级充提差"
              align="center"
              prop="new_level_deposit_withdraw_difference"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_level_deposit_withdraw_difference }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增充值奖励"
              align="center"
              prop="new_deposit_reward"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_deposit_reward }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增成就奖励"
              align="center"
              prop="new_achievement_reward"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_achievement_reward }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增投注返佣金额"
              align="center"
              prop="new_betting_rebate_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.new_betting_rebate_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增一级注册人数"
              align="center"
              prop="new_level_register_count"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.new_level_register_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="新增一级付费人数"
              align="center"
              prop="new_level_payment_count"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.new_level_payment_count }}%</p>
              </template>
            </el-table-column>
            <el-table-column
              label="风控代理数"
              align="center"
              prop="risk_control_agent_count"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.risk_control_agent_count }}%</p>
              </template>
            </el-table-column>
            <el-table-column
              label="自身风控代理数"
              align="center"
              prop="own_risk_control_agent_count"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.own_risk_control_agent_count }}%</p>
              </template>
            </el-table-column>
            <el-table-column
              label="3日活跃率"
              align="center"
              prop="day3_activity_rate"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.day3_activity_rate }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="7日活跃率"
              align="center"
              prop="day7_activity_rate"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.day7_activity_rate }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="15日活跃率"
              align="center"
              prop="day15_activity_rate"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.day15_activity_rate }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="30日活跃率"
              align="center"
              prop="day30_activity_rate"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.day30_activity_rate }}</p>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.red {
  color: red;
}

.agency-management-list-form {
  .el-select {
    .el-input {
      width: 252px;
    }
  }

  .input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);

    .el-select {
      .el-input {
        width: 60px;
      }
    }
  }
}

.text-center {
  text-align: center;
}
</style>
