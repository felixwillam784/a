<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import { Search, Refresh } from "@element-plus/icons-vue";
import PersonalRiskControl from "./components/PersonalRiskControl.vue";
import RiskControlWhiteList from "./components/RiskControlWhiteList.vue";
import RiskControlIPList from "./components/RiskControlIPList.vue";
import RiskControlDeviceList from "./components/RiskControlDeviceList.vue";

const router = useRouter();

const activeIndex = ref<number>(0);

const formData = ref<any>({});

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
</script>

<template>
  <div class="app-container">
    <el-card v-if="activeIndex == 0 || activeIndex == 1">
      <el-row style="align-items: center">
        <el-col :md="12" :lg="16">
          <el-form :model="formData" :inline="true" label-width="100">
            <el-form-item label="UserID" prop="user_id">
              <el-input v-model="formData.user_id" placeholder="请输入UserID" />
            </el-form-item>
            <el-form-item label="邮箱账号" prop="email_address">
              <el-input
                v-model="formData.email_address"
                placeholder="请输入代理邮箱账号"
              />
            </el-form-item>
            <el-form-item label="身份信息" prop="identity_information">
              <el-input
                v-model="formData.identity_information"
                placeholder="请输入身份信息号"
              />
            </el-form-item>
          </el-form>
          <el-form :model="formData" :inline="true" label-width="100">
            <el-form-item label="风控等级" prop="user_id">
              <el-select v-model="formData.user_id" placeholder="请选择风控等级">
              </el-select>
            </el-form-item>
            <el-form-item label="风控行为" prop="user_id">
              <el-select v-model="formData.user_id" placeholder="请选择风控行为">
              </el-select>
            </el-form-item>
            <el-form-item label="操作人员" prop="invitee_total_number">
              <el-select v-model="formData.user_id" placeholder="请选择操作人员">
              </el-select>
            </el-form-item>
            <el-form-item style="float: right"> </el-form-item>
          </el-form>
          <el-form :model="formData" :inline="true" label-width="100">
            <el-form-item label="IP地址" prop="invitee_total_number">
              <el-select v-model="formData.user_id" placeholder="请输入IP地址">
              </el-select>
            </el-form-item>
            <el-form-item label="设备ID" prop="invitee_total_number">
              <el-select v-model="formData.user_id" placeholder="请输入设备ID">
              </el-select>
            </el-form-item>
            <el-form-item label="支付账号" prop="invitee_total_number">
              <el-select v-model="formData.user_id" placeholder="请输入支付账号">
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :md="12" :lg="8" class="text-right">
          <div>
            <el-button :icon="Search" size="large" @click="handleQuery" class="w-32">
              搜索
            </el-button>
            <el-button :icon="Refresh" size="large" @click="resetQuery" class="w-32">
              重置
            </el-button>
          </div>
          <div class="mt-2">
            <el-button @click="handleQuery" size="large" class="w-32">
              新增个人风控
            </el-button>
            <el-button @click="resetQuery" size="large" class="w-32">
              个人风控设置
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="risk-control-search-other" v-else>
      <el-row style="align-items: center">
        <el-col :md="12" :lg="18">
          <el-form :model="formData" :inline="true" label-width="100">
            <el-form-item label="风控等级" prop="user_id">
              <el-select
                v-model="formData.user_id"
                placeholder="请选择风控等级"
                style="min-width: 252px"
              >
              </el-select>
            </el-form-item>
            <el-form-item label="处罚范围" prop="user_id">
              <el-select
                v-model="formData.user_id"
                placeholder="请选择风控行为"
                style="min-width: 252px"
              >
              </el-select>
            </el-form-item>
            <el-form-item label="操作人员" prop="invitee_total_number">
              <el-select
                v-model="formData.user_id"
                placeholder="请选择操作人员"
                style="min-width: 252px"
              >
              </el-select>
            </el-form-item>
            <el-form-item style="float: right"> </el-form-item>
          </el-form>
          <el-form :model="formData" :inline="true" label-width="100">
            <el-form-item label="IP地址" prop="invitee_total_number">
              <el-input placeholder="请输入IP地址" style="min-width: 252px" />
            </el-form-item>
            <el-form-item label="同IP注册人数" prop="invitee_total_number">
              <el-input
                v-model="formData.invitee_total_number"
                placeholder="请输入人数"
                class="input-with-select"
              >
                <template #prepend>
                  <el-select v-model="formData.invitee_comparator" style="width: 60px">
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
            <el-form-item label="同IP登录人数" prop="invitee_total_number">
              <el-input
                v-model="formData.invitee_total_number"
                placeholder="请输入人数"
                class="input-with-select"
              >
                <template #prepend>
                  <el-select v-model="formData.invitee_comparator" style="width: 60px">
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
        <el-col :md="12" :lg="6" class="text-right">
          <div>
            <el-button :icon="Search" size="large" @click="handleQuery" class="w-32">
              搜索
            </el-button>
            <el-button :icon="Refresh" size="large" @click="resetQuery" class="w-32">
              重置
            </el-button>
          </div>
          <div class="mt-2">
            <el-button @click="handleQuery" size="large" class="w-32">
              新增个人风控
            </el-button>
            <el-button @click="resetQuery" size="large" class="w-32">
              个人风控设置
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt-1">
      <el-row>
        <el-button
          :type="buttonIndex == 0 ? 'primary' : ''"
          @click="handleDateRange('today')"
        >
          今日
        </el-button>
        <el-button
          :type="buttonIndex == 1 ? 'primary' : ''"
          @click="handleDateRange('yesterday')"
        >
          昨日
        </el-button>
        <el-button
          :type="buttonIndex == 2 ? 'primary' : ''"
          @click="handleDateRange('before yesterday')"
        >
          前日
        </el-button>
        <el-button
          :type="buttonIndex == 3 ? 'primary' : ''"
          @click="handleDateRange('this week')"
        >
          本周
        </el-button>
        <el-button
          :type="buttonIndex == 4 ? 'primary' : ''"
          @click="handleDateRange('last week')"
        >
          上周
        </el-button>
        <el-button
          :type="buttonIndex == 5 ? 'primary' : ''"
          @click="handleDateRange('this month')"
        >
          本月
        </el-button>
        <el-button
          :type="buttonIndex == 6 ? 'primary' : ''"
          @click="handleDateRange('last month')"
        >
          上月
        </el-button>
        <el-button
          :type="buttonIndex == 7 ? 'primary' : ''"
          @click="handleDateRange('this year')"
        >
          今年
        </el-button>
        <el-button
          :type="buttonIndex == 8 ? 'primary' : ''"
          @click="handleDateRange('last year')"
        >
          去年
        </el-button>
        <el-button
          :type="buttonIndex == 9 ? 'primary' : ''"
          @click="handleDateRange('last 7days')"
        >
          过去7天
        </el-button>
        <el-button
          :type="buttonIndex == 10 ? 'primary' : ''"
          @click="handleDateRange('last 30days')"
        >
          过去30天
        </el-button>
        <el-button
          :type="buttonIndex == 11 ? 'primary' : ''"
          @click="handleDateRange('all')"
        >
          全部
        </el-button>
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
        </el-form>
      </el-row>
    </el-card>
    <el-card class="mt-4">
      <div class="flex items-center">
        <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
          <div>个人风控列表</div>
          <div>（黑名单）</div>
        </el-button>
        <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
          个人风控白名单
        </el-button>
        <el-button :type="activeIndex == 2 ? 'warning' : ''" @click="handleBtnTab(2)">
          风控IP列表
        </el-button>
        <el-button :type="activeIndex == 3 ? 'warning' : ''" @click="handleBtnTab(3)">
          风控设备ID列表
        </el-button>
        <el-button :type="activeIndex == 4 ? 'warning' : ''" @click="handleBtnTab(4)">
          风控手机号
        </el-button>
        <el-button :type="activeIndex == 5 ? 'warning' : ''" @click="handleBtnTab(5)">
          风控银行账号
        </el-button>
        <el-button :type="activeIndex == 6 ? 'warning' : ''" @click="handleBtnTab(6)">
          风控身份信息
        </el-button>
        <div class="d-flex justify-end risk-management-card ms-auto">
          <el-button type="info">批量解除风控</el-button>
        </div>
      </div>
      <div class="mt-2">
        <PersonalRiskControl v-if="activeIndex == 0" />
        <RiskControlWhiteList v-if="activeIndex == 1" />
        <RiskControlIPList v-if="activeIndex == 2" />
        <RiskControlDeviceList v-if="activeIndex == 3"/>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss">
.risk-management-card {
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

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  .el-select {
    .el-input {
      width: 60px;
    }
  }
}
.risk-control-search-other {
  .el-select {
    .el-input {
      width: 252px;
    }
  }
}
</style>
