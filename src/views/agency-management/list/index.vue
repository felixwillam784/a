<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { AgentListReqParameter } from "@/interface/agent/index";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import useStore from "@/store";

const { agent } = useStore();
const router = useRouter();

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const selectedAgentId = ref<string>("");
const remark = ref<string>("");

const formData = ref<any>({
  id: "",
  email: "",
  id_number: "",
  invite_status: 0,
  invite_risk_status: 0,
  total_invited_friends: "",
  total_invited_friends_op: "",
  one_pay_role: "",
  one_pay_role_op: "",
  bet_reward: "",
  bet_reward_op: "",
  start_time: 0,
  end_time: 0,
  start: 0,
  page_size: 20,
  page_num: 1,
});
const loading = ref<boolean>(false);

const agentStatusOptions = [
  {
    value: 0,
    label: "正常",
  },
  {
    value: 1,
    label: "预警 ",
  },
  {
    value: 2,
    label: "停止",
  },
];
const riskControlStatus = [
  {
    value: 0,
    label: "正常",
  },
  {
    value: 1,
    label: "预警 ",
  },
  {
    value: 2,
    label: "停止",
  },
];

const agencyTerminateDialogVisible = ref<boolean>(false);

const comparatorOptions = ref<Array<any>>([
  {
    label: "≥",
    value: "1",
  },
  {
    label: "＞",
    value: "3",
  },
  {
    label: "≤",
    value: "2",
  },
  {
    label: "＜",
    value: "4",
  },
  {
    label: "＝",
    value: "5",
  },
]);

const agentList = computed(() => {
  return agent.agentList;
});
const total_count = computed(() => {
  return Math.ceil(agent.getAentTotalNumber / 20);
});
const buttonIndex = ref<number>(1);

const handleDateRange = async (date: string) => {
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
  if (dateRange.value) {
    formData.value.start_time = moment(dateRange.value[0]).valueOf() / 1000;
    formData.value.end_time = moment(dateRange.value[1]).valueOf() / 1000;
  }
  loading.value = true;
  await agent.dispatchAgentList(formData.value);
  loading.value = false;
};

const handleQuery = async () => {
  console.log(typeof formData.value.user_id);
  loading.value = true;
  await agent.dispatchAgentList(formData.value);
  loading.value = false;
};

const handleSizeChange = async ({ page, limit }: any) => {
  formData.value.page_num = page;
  formData.value.page_size = limit;
  loading.value = true;
  await agent.dispatchAgentList(formData.value);
  loading.value = false;
};

const resetQuery = () => {
  handleDateRange("this week");
};

const showAgencyTerminateDialog = (id: string) => {
  agencyTerminateDialogVisible.value = true;
  selectedAgentId.value = String(id);
};

const terminateAgent = async () => {
  if (!remark.value) return;
  await agent.dispatchTerminateAgent({
    user_id: selectedAgentId.value as string,
    remarK: remark.value,
  });
  agencyTerminateDialogVisible.value = false;
  loading.value = true;
  await agent.dispatchAgentList(formData.value);
  loading.value = false;
  remark.value = "";
};

onMounted(async () => {
  handleDateRange("this week");
});
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card style="margin-top: 10px">
          <el-row style="align-items: center">
            <el-col :md="12" :lg="24" class="agency-management-list-form">
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                label-position="left"
              >
                <el-form-item label="User ID" prop="user_id">
                  <el-input
                    v-model="formData.id"
                    placeholder="请输入User ID"
                    style="width: 252px"
                    type="text"
                  />
                </el-form-item>
                <el-form-item label="邮箱账号" prop="email_address">
                  <el-input
                    v-model="formData.email"
                    placeholder="请输入邮箱账号"
                    style="width: 252px"
                  />
                </el-form-item>
                <el-form-item label="身份信息" prop="identity_information">
                  <el-input
                    v-model="formData.id_number"
                    placeholder="请输入身份信息号"
                    style="width: 252px"
                  />
                </el-form-item>
              </el-form>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                label-position="left"
              >
                <el-form-item label="代理状态" prop="invite_status">
                  <el-select
                    v-model="formData.invite_status"
                    placeholder="请选择代理状态"
                    style="min-width: 252px"
                  >
                    <el-option
                      v-for="item in agentStatusOptions"
                      :label="item.label"
                      :key="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="风控状态" prop="invite_risk_status">
                  <el-select
                    v-model="formData.invite_risk_status"
                    placeholder="请选择风控状态"
                    style="width: 252px"
                  >
                    <el-option
                      v-for="item in riskControlStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="总邀请人数" prop="total_invited_friends">
                  <el-input
                    v-model="formData.total_invited_friends"
                    placeholder="请输入总邀请人数"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        v-model="formData.total_invited_friends_op"
                        style="width: 60px"
                        placeholder=" "
                      >
                        <el-option
                          v-for="item in comparatorOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item style="float: right">
                  <el-button type="primary" :icon="Search" @click="handleQuery">
                    搜索
                  </el-button>
                  <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
              </el-form>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                label-position="left"
              >
                <el-form-item label="一级付费人数" prop="level1_paid_user_count">
                  <el-input
                    v-model="formData.one_pay_role"
                    placeholder="亲输入人数"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        v-model="formData.one_pay_role_op"
                        style="width: 60px"
                        placeholder=" "
                      >
                        <el-option
                          v-for="item in comparatorOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="投注返佣金额" prop="agent_betting_rebate_amount">
                  <el-input
                    v-model="formData.bet_reward"
                    placeholder="请输入金额"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        placeholder=" "
                        v-model="formData.bet_reward_op"
                        style="width: 60px"
                      >
                        <el-option
                          v-for="item in comparatorOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
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
            </el-form>
          </el-row>
        </el-card>
        <el-card style="margin-top: 20px">
          <el-table
            v-loading="loading"
            v-horizontal-scroll
            :data="agentList"
            style="width: 100%"
          >
            <el-table-column label="UserID" align="center" prop="user_id" width="160">
              <template #default="scope">
                <el-link :underline="false" class="el-link-decoration">
                  {{ scope.row.id }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="总充值金额"
              align="center"
              prop="total_deposit"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_deposit }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总提现金额"
              align="center"
              prop="total_withdraw"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_withdraw }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总邀请人数"
              align="center"
              prop="total_invited_friends"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_invited_friends }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="一级充提差"
              align="center"
              prop="one_gold"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.one_gold }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="一级付费金额"
              align="center"
              prop="one_pay_num"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.one_pay_num }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="投注返佣金额"
              align="center"
              prop="one_diamond"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.one_diamond }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="一级付费人数"
              align="center"
              prop="one_pay_role"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.one_pay_role }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="风控代理人数"
              align="center"
              prop="risk_invite_role"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.risk_invite_role }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理平均充值"
              align="center"
              prop="invite_average_deposit"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.invite_average_deposit }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理成就奖励"
              align="center"
              prop="invite_achieve_award"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.invite_achieve_award }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理邀请奖励"
              align="center"
              prop="invite_award"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.invite_award }}%</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理状态"
              align="center"
              prop="agent_status"
              width="160"
            >
              <template #default="scope">
                <p>
                  {{
                    agentStatusOptions.find(
                      (item) => item.value === scope.row.invite_status
                    )?.label
                  }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="账号风控状态"
              align="center"
              prop="account_risk_countrol_status"
              width="160"
            >
              <template #default="scope">
                <p>
                  {{
                    riskControlStatus.find((item) => item.value === scope.row.risk_level)
                      ?.label
                  }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200" fixed="right">
              <template #default="scope">
                <el-button
                  type="primary"
                  link
                  @click="
                    router.push({
                      name: 'AgentDetail',
                      query: { user_id: scope.row.user_id },
                    })
                  "
                >
                  详情
                </el-button>
                <el-button
                  type="danger"
                  link
                  @click="showAgencyTerminateDialog(scope.row.user_id)"
                >
                  解除代理关系
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="float: right">
            <pagination
              v-model:total="agent.getAentTotalNumber"
              v-model:page="formData.page_num"
              v-model:limit="formData.page_size"
              @pagination="handleSizeChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="解除代理关系" v-model="agencyTerminateDialogVisible">
      <h4 class="text-center">确认后将会解除代理与其上级的关系</h4>
      <h4 class="text-center">确认要解除代理关系？</h4>
      <el-form ref="ruleFormRef">
        <el-row style="align-items: center">
          <h3>备注:</h3>
        </el-row>
        <el-form-item>
          <el-input type="textarea" :rows="4" v-model="remark" />
        </el-form-item>
      </el-form>
      <el-footer class="text-center">
        <el-button type="primary" @click="terminateAgent">确认</el-button>
        <el-button @click="agencyTerminateDialogVisible = false">取消</el-button>
      </el-footer>
    </el-dialog>
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
