<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import BasicSetting from "./components/BasicSetting.vue";
import GameSetting from "./components/UsageScope.vue";

const router = useRouter();

const dateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const switch_value = ref<boolean>(false);

const loading = ref<boolean>(false);

const total_count = ref<number>(0);

const activeIndex = ref<number>(0);

const agencyTerminateDialogVisible = ref<boolean>(false);
const addTestNumberDialogVisible = ref<boolean>(false);

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

const handleQuery = () => {
  loading.value = true;
};

const resetQuery = () => {
  handleDateRange("this week");
};

const showAgencyTerminateDialog = () => {
  agencyTerminateDialogVisible.value = true;
};

const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};

onMounted(() => {
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
                    v-model="formData.user_id"
                    placeholder="请输入User ID"
                    style="width: 252px"
                  />
                </el-form-item>
                <el-form-item label="操作人员" prop="email_address">
                  <el-select
                    v-model="formData.user_id"
                    placeholder="请选择操作人员"
                    style="min-width: 252px"
                  >
                  </el-select>
                </el-form-item>
                <el-form-item style="float: right">
                  <el-button @click="addTestNumberDialogVisible = true">
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
                <el-form-item label="账户余额" prop="invitee_total_number">
                  <el-input
                    v-model="formData.invitee_total_number"
                    placeholder="请输入余额"
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
                <el-form-item label="真金余额" prop="invitee_total_number">
                  <el-input
                    v-model="formData.invitee_total_number"
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
                <el-form-item label="奖金余额" prop="invitee_total_number">
                  <el-input
                    v-model="formData.invitee_total_number"
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
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                label-position="left"
              >
                <el-form-item label="投注次数" prop="invitee_total_number">
                  <el-input
                    v-model="formData.invitee_total_number"
                    placeholder="请输入次数"
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
                <el-form-item label="VIP返利" prop="invitee_total_number">
                  <el-input
                    v-model="formData.invitee_total_number"
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
                <el-form-item label="投注盈亏" prop="invitee_total_number">
                  <el-input
                    v-model="formData.invitee_total_number"
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
          <el-table v-loading="loading" :data="agencyList" style="width: 100%">
            <el-table-column label="UserID" align="center" prop="item_1" width="160">
              <template #default="scope">
                <el-link :underline="false" class="el-link-decoration">
                  {{ scope.row.item_1 }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="VIP等级"
              align="center"
              prop="item_2"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_2 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="账户总余额"
              align="center"
              prop="item_3"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_3 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="真金余额"
              align="center"
              prop="item_4"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_4 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="奖金余额"
              align="center"
              prop="item_5"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_5 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="投注次数"
              align="center"
              prop="item_6"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_6 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="投注盈亏"
              align="center"
              prop="item_7"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_7 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="总打码量"
              align="center"
              prop="item_8"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_8 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="VIP返利"
              align="center"
              prop="item_9"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_9 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="账号生成时间"
              align="center"
              prop="item_10"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_10 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="操作人员"
              align="center"
              prop="item_11"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_11 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              align="center"
              prop="item_11"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_11 }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="账号状态"
              align="center"
              prop="item_11"
              width="160"
              sortable
            >
              <template #default="scope">
                <p>{{ scope.row.item_11 }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200" fixed="right">
              <template #default="scope">
                <el-switch v-model="switch_value" size="large" class="mr-2" />
                <el-button
                  type="primary"
                  link
                  @click="router.push({ name: 'TestAccountDetail' })"
                >
                  详情
                </el-button>
                <el-button type="danger" link @click="showAgencyTerminateDialog">
                  删除
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
    <el-dialog title="新增测试号" v-model="addTestNumberDialogVisible">
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
        <el-button @click="addTestNumberDialogVisible = false">取消添加</el-button>
      </el-footer>
    </el-dialog>

    <el-dialog title="解除代理关系" v-model="agencyTerminateDialogVisible">
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
