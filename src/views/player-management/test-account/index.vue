<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import BasicSetting from "./components/BasicSetting.vue";
import GameSetting from "./components/UsageScope.vue";

import useStore from "@/store";
import { number } from "echarts";
const { player } = useStore();

const router = useRouter();

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const formData = ref<any>({
  id: 0,
  operator_id: "",
  account_amount: 0,
  account_amount_op: 1,
  real_amount: 0,
  real_amount_op: 1,
  bonus_amount: 0,
  bonus_amount_op: 1,
  bet_times: 0,
  bet_times_op: 1,
  vip_reward: 0,
  vip_reward_op: 1,
  bet_pnl: 0,
  bet_pnl_op: 1,
  start_time: 0,
  end_time: 0,
  page_num: 1,
  page_size: 10,
});

const loading = ref<boolean>(false);

const activeIndex = ref<number>(0);

const deleteTestUserDialogVisible = ref<boolean>(false);

const addTestUserDialogVisible = ref<boolean>(false);

const comparatorOptions = ref<Array<any>>([
  {
    label: "≥",
    value: 1,
  },
  {
    label: "＞",
    value: 2,
  },
  {
    label: "≤",
    value: 3,
  },
  {
    label: "＜",
    value: 4,
  },
  {
    label: "＝",
    value: 5,
  },
]);

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

const handleQuery = () => {
  loading.value = true;
};

const resetQuery = () => {
  handleDateRange("this week");
};

const showAgencyTerminateDialog = () => {
  deleteTestUserDialogVisible.value = true;
};

const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};

onMounted(async () => {
  handleDateRange("this week");
  formData.value.start_time = new Date(dateRange.value[0]).getTime() / 1000;
  formData.value.end_time = new Date(dateRange.value[1]).getTime() / 1000;
  await player.dispatchGetTestUserList(formData.value);
});

const testUserList = computed(() => {
  return player.getTestAccountList;
});

const changeTestUserStatus = (id: string) => {};
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
                <el-form-item label="User ID" prop="id">
                  <el-input
                    v-model="formData.id"
                    placeholder="请输入User ID"
                    style="min-width: 252px"
                    :value="formData.id == 0 ? '' : formData.id"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="操作人员" prop="operator_id">
                  <el-input
                    v-model="formData.id"
                    placeholder="请选择操作人员"
                    style="min-width: 252px"
                    :value="formData.operator_id == 0 ? '' : formData.id"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item style="float: right">
                  <el-button @click="addTestUserDialogVisible = true">
                    新增测试号
                  </el-button>
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
                <el-form-item label="账户余额" prop="account_amount">
                  <el-input
                    v-model="formData.account_amount"
                    placeholder="请输入余额"
                    class="input-with-select"
                    :value="formData.account_amount == 0 ? '' : formData.account_amount"
                  >
                    <template #prepend>
                      <el-select v-model="formData.account_amount_op" style="width: 60px">
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
                <el-form-item label="真金余额" prop="real_amount">
                  <el-input
                    v-model="formData.real_amount"
                    placeholder="请输入金额"
                    class="input-with-select"
                    :value="formData.real_amount == 0 ? '' : formData.real_amount"
                  >
                    <template #prepend>
                      <el-select v-model="formData.real_amount_op" style="width: 60px">
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
                <el-form-item label="奖金余额" prop="bonus_amount">
                  <el-input
                    v-model="formData.bonus_amount"
                    placeholder="请输入金额"
                    class="input-with-select"
                    :value="formData.bonus_amount == 0 ? '' : formData.bonus_amount"
                  >
                    <template #prepend>
                      <el-select v-model="formData.bonus_amount_op" style="width: 60px">
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
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                label-position="left"
              >
                <el-form-item label="投注次数" prop="bet_times">
                  <el-input
                    v-model="formData.bet_times"
                    placeholder="请输入次数"
                    class="input-with-select"
                    :value="formData.bet_times == 0 ? '' : formData.bet_times"
                  >
                    <template #prepend>
                      <el-select v-model="formData.bet_times_op" style="width: 60px">
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
                <el-form-item label="VIP返利" prop="vip_reward">
                  <el-input
                    v-model="formData.vip_reward"
                    placeholder="请输入金额"
                    class="input-with-select"
                    :value="formData.vip_reward == 0 ? '' : formData.vip_reward"
                  >
                    <template #prepend>
                      <el-select v-model="formData.vip_reward_op" style="width: 60px">
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
                <el-form-item label="投注盈亏" prop="bet_pnl">
                  <el-input
                    v-model="formData.bet_pnl"
                    placeholder="请输入金额"
                    class="input-with-select"
                    :value="formData.bet_pnl == 0 ? '' : formData.bet_pnl"
                  >
                    <template #prepend>
                      <el-select v-model="formData.bet_pnl_op" style="width: 60px">
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
          <div class="d-flex justify-end mb-2 rebate-withdrawal-statistics">
            <el-card>
              <el-form-item label="测试号数量:">99999999</el-form-item>
            </el-card>
            <el-card>
              <el-form-item label="测试号总余额:">9999999</el-form-item>
            </el-card>
            <el-card>
              <el-form-item label="测试号总真金:">999999999999</el-form-item>
            </el-card>
            <el-card>
              <el-form-item label="测试号总奖金:">999999999999</el-form-item>
            </el-card>
          </div>
          <el-table v-loading="loading" :data="testUserList" style="width: 100%">
            <el-table-column label="UserID" align="center" prop="id" width="160">
              <template #default="scope">
                <el-link :underline="false" class="el-link-decoration">
                  {{ scope.row.id }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="VIP等级"
              align="center"
              prop="vip_level"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ "VIP" + scope.row.vip_level }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="账户总余额"
              align="center"
              prop="account_amount"
              width="160"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="真金余额"
              align="center"
              prop="real_amount"
              width="160"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="奖金余额"
              align="center"
              prop="bonus_amount"
              width="160"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="投注次数"
              align="center"
              prop="bet_times"
              width="160"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="投注盈亏"
              align="center"
              prop="bet_pnl"
              width="160"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="总打码量"
              align="center"
              prop="wagering_amount"
              width="160"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="VIP返利"
              align="center"
              prop="vip_reward"
              width="160"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="账号生成时间"
              align="center"
              prop="create_time"
              width="170"
              sortable
            >
              <template #default="scope">
                <p>
                  {{
                    new Date(scope.row.create_time * 1000).toLocaleString("en-US", {
                      timeZone: "UTC",
                    })
                  }}
                </p>
              </template>
            </el-table-column>

            <el-table-column
              label="操作人员"
              align="center"
              prop="operator_id"
              width="160"
              sortable
            >
            </el-table-column>

            <el-table-column
              label="备注"
              align="center"
              prop="notes"
              width="160"
              sortable
            >
            </el-table-column>

            <el-table-column
              label="账号状态"
              align="center"
              prop="account_prohibit"
              width="160"
              sortable
            >
              <template #default="scope">
                <p :style="scope.row.account_prohibit == 2 ? 'color:red' : ''">
                  {{ scope.row.account_prohibit == 1 ? "启用" : "停用" }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200" fixed="right">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.switch_value"
                  size="large"
                  class="mr-2"
                  @change="changeTestUserStatus(scope.row.id)"
                />
                <el-button
                  type="primary"
                  link
                  @click="
                    router.push({
                      name: 'TestAccountDetail',
                      params: { id: scope.row.id },
                    })
                  "
                >
                  详情
                </el-button>
                <el-button type="danger" link @click="showAgencyTerminateDialog">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新增测试号" v-model="addTestUserDialogVisible">
      <el-row v-if="activeIndex != 2 && activeIndex != 3">
        <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
          基本设置
        </el-button>
        <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
          可参与游戏设定
        </el-button>
      </el-row>

      <BasicSetting v-if="activeIndex == 0" />
      <GameSetting v-if="activeIndex == 1" />

      <el-form v-if="activeIndex == 2" class="my-2">
        <el-form-item label="请输入生成测试号数量:">
          <el-input placeholder="不填默认为生成1个测试号" />
        </el-form-item>
      </el-form>
      <div v-if="activeIndex == 3" class="my-2 h-96">
        <el-card>
          <div class="font-bold">测试账号1</div>
          <el-row class="mt-2 align-center">
            <el-col :span="18">
              <el-row class="bg-neutral-300 h-10 pa-2 align-center">
                <el-col :span="6">账号邮箱:</el-col>
                <el-col :span="18"> 123@gmail.com</el-col>
              </el-row>
              <el-row class="bg-neutral-100 h-10 pa-2 align-center mt-1">
                <el-col :span="6">账号密码:</el-col>
                <el-col :span="18"> abcd1234 </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="text-center">
              <el-button class="h-16">
                <div>复制账</div>
                <div class="mt-1">号密码</div>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <div class="text-center mt-4">
          <el-button>添加测试号</el-button>
        </div>
      </div>
      <el-footer class="text-center">
        <el-button
          type="primary"
          @click="activeIndex == 0 ? (activeIndex = 0) : (activeIndex = activeIndex - 1)"
          v-if="activeIndex != 0"
        >
          上一页
        </el-button>
        <el-button
          type="primary"
          @click="
            activeIndex == 3 ? (activeIndex = 3) : (activeIndex = (activeIndex + 1) % 4)
          "
        >
          下一页
        </el-button>
        <el-button @click="addTestUserDialogVisible = false">取消添加</el-button>
      </el-footer>
    </el-dialog>

    <el-dialog title="解除代理关系" v-model="deleteTestUserDialogVisible">
      <h4 class="text-center">确认后将会解除代理与其上级的关系</h4>
      <h4 class="text-center">确认要解除代理关系？</h4>
      <el-form ref="ruleFormRef">
        <el-row style="align-items: center">
          <h3>备注:</h3>
        </el-row>
        <el-form-item>
          <el-input type="textarea" :rows="4" />
        </el-form-item>
      </el-form>
      <el-footer class="text-center">
        <el-button type="primary">确认</el-button>
        <el-button @click="deleteTestUserDialogVisible = false">取消</el-button>
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
.rebate-withdrawal-statistics {
  .el-card__body {
    padding: 4px !important;
  }
  .el-form-item {
    margin-right: 0px !important;
    margin-bottom: 0px !important;
  }
}

.el-button > span {
  display: block;
}
</style>
