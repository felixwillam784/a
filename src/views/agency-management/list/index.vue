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

const selectedAgentId = ref<number>();
const remark = ref<string>("");

const formData = ref<any>({
  user_id: "",
  email_address: "",
  identity_information: "",
  agent_status: "",
  risk_control_status: "",
  total_invite_count: "",
  total_invite_count_operator_type: "",
  level1_paid_user_count: "",
  level1_paid_user_count_operator_type: "",
  agent_betting_rebate_amount: "",
  agent_betting_rebate_amount_operator_type: "",
  start_date: "",
  end_date: "",
  invitee_comparator: "＞",
  pageNum: 1,
  pageSize: 20,
});

const loading = ref<boolean>(false);

const total_count = ref<number>(0);

const agencyTerminateDialogVisible = ref<boolean>(false);

const comparatorOptions = ref<Array<any>>([
  {
    label: "≥",
    value: "≥",
  },
  {
    label: "＞",
    value: "＞",
  },
  {
    label: "≤",
    value: "≤",
  },
  {
    label: "＜",
    value: "＜",
  },
  {
    label: "＝",
    value: "＝",
  },
]);

const agentList = computed(() => {
  return agent.agentList;
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
  formData.value.end_date = moment(dateRange.value[0] + " 23:59:59").valueOf();
  await agent.dispatchAgentList(formData.value);
  loading.value = false;
};

const resetQuery = () => {
  handleDateRange("this week");
};

const showAgencyTerminateDialog = (id: number) => {
  agencyTerminateDialogVisible.value = true;
  selectedAgentId.value = id;
};

const terminateAgent = async () => {
  await agent.dispatchTerminateAgent({
    user_id: selectedAgentId.value,
    remarK: remark.value,
  });
  agencyTerminateDialogVisible.value = false;
  loading.value = true;
  await agent.dispatchAgentList(formData.value);
  loading.value = false;
};

onMounted(async () => {
  formData.value.start_date = moment(dateRange.value[0] + " 00:00:00").valueOf();
  formData.value.end_date = moment(dateRange.value[0] + " 23:59:59").valueOf();
  loading.value = true;
  handleDateRange("this week");
  await agent.dispatchAgentList(formData.value);
  loading.value = false;
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
                    v-model="formData.user_id"
                    placeholder="请输入User ID"
                    style="width: 252px"
                  />
                </el-form-item>
                <el-form-item label="邮箱账号" prop="email_address">
                  <el-input
                    v-model="formData.email_address"
                    placeholder="请输入邮箱账号"
                    style="width: 252px"
                  />
                </el-form-item>
                <el-form-item label="身份信息" prop="identity_information">
                  <el-input
                    v-model="formData.identity_information"
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
                <el-form-item label="代理状态" prop="agent_status">
                  <el-select
                    v-model="formData.agent_status"
                    placeholder="请选择代理状态"
                    style="min-width: 252px"
                  >
                  </el-select>
                </el-form-item>
                <el-form-item label="风控状态" prop="risk_control_status">
                  <el-select
                    v-model="formData.risk_control_status"
                    placeholder="请选择风控状态"
                    style="width: 252px"
                  >
                  </el-select>
                </el-form-item>
                <el-form-item label="总邀请人数" prop="total_invite_count">
                  <el-input
                    v-model="formData.total_invite_count"
                    placeholder="请输入总邀请人数"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        v-model="formData.invitee_comparator"
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
                    v-model="formData.level1_paid_user_count"
                    placeholder="亲输入人数"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        v-model="formData.invitee_comparator"
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
                <el-form-item label="投注返佣金额" prop="agent_betting_rebate_amount">
                  <el-input
                    v-model="formData.agent_betting_rebate_amount"
                    placeholder="请输入金额"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        v-model="formData.invitee_comparator"
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
          <el-table v-loading="loading" :data="agentList" style="width: 100%">
            <el-table-column label="UserID" align="center" prop="user_id" width="160">
              <template #default="scope">
                <el-link :underline="false" class="el-link-decoration">
                  {{ scope.row.user_id }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="总充值金额"
              align="center"
              prop="total_recharge_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_recharge_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总提现金额"
              align="center"
              prop="total_withdrawal_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_withdrawal_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总邀请人数"
              align="center"
              prop="total_invite_count"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.total_invite_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="一级充提差"
              align="center"
              prop="level1_charge_withdraw_difference"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.level1_charge_withdraw_difference }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="一级付费金额"
              align="center"
              prop="level1_payment_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.level1_payment_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总邀请人数"
              align="center"
              prop="level1_withdrawal_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.level1_withdrawal_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总邀请人数-操作符类型"
              align="center"
              prop="agent_betting_rebate_amount"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.agent_betting_rebate_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="一级付费人数"
              align="center"
              prop="level1_paid_user_count"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.level1_paid_user_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="风控代理人数"
              align="center"
              prop="risk_control_agent_count"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.risk_control_agent_count }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理平均充值"
              align="center"
              prop="average_agent_recharge"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.average_agent_recharge }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理成就奖励"
              align="center"
              prop="agent_achievement_rewards"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.agent_achievement_rewards }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理邀请奖励"
              align="center"
              prop="agent_invitation_rewards"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.agent_invitation_rewards }}%</p>
              </template>
            </el-table-column>
            <el-table-column
              label="代理状态"
              align="center"
              prop="agent_status"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.agent_status }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="账号风控状态"
              align="center"
              prop="account_risk_countrol_status"
              width="160"
            >
              <template #default="scope">
                <p>{{ scope.row.account_risk_countrol_status }}</p>
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
              :total="total_count"
              v-model:page="formData.pageNum"
              v-model:limit="formData.pageSize"
              @pagination="handlePagination"
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
