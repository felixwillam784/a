<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";

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

onMounted(() => {
  handleDateRange("this week");
});
</script>

<template>
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
              <el-form-item label="游戏ID" prop="user_id">
                <el-input
                  v-model="formData.user_id"
                  placeholder="请输入游戏ID"
                  style="width: 252px"
                />
              </el-form-item>
              <el-form-item label="游戏名称" prop="email_address">
                <el-select
                  v-model="formData.user_id"
                  placeholder="请选择游戏名字"
                  style="min-width: 252px"
                >
                </el-select>
              </el-form-item>
              <el-form-item label="游戏结果" prop="email_address">
                <el-select
                  v-model="formData.user_id"
                  placeholder="请选择游戏结果"
                  style="min-width: 252px"
                >
                </el-select>
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
              <el-form-item label="金额类型" prop="email_address">
                <el-select
                  v-model="formData.user_id"
                  placeholder="请选择投注金额类型"
                  style="min-width: 252px"
                >
                </el-select>
              </el-form-item>
              <el-form-item label="投注金额" prop="invitee_total_number">
                <el-input
                  v-model="formData.invitee_total_number"
                  placeholder="请输入金额"
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
              <el-form-item label="结算倍率" prop="invitee_total_number">
                <el-input
                  v-model="formData.invitee_total_number"
                  placeholder="请输入倍率"
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
            <el-form
              :model="formData"
              :inline="true"
              label-width="100"
              label-position="left"
            >
              <el-form-item label="结算金额" prop="invitee_total_number">
                <el-input
                  v-model="formData.invitee_total_number"
                  placeholder="请输入余额"
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
            <el-form-item label="游戏局数:">99999999</el-form-item>
          </el-card>
          <el-card>
            <el-form-item label="打码量:">9999999</el-form-item>
          </el-card>
          <el-card>
            <el-form-item label="派奖金额:">999999999999</el-form-item>
          </el-card>
          <el-card>
            <el-form-item label="RTP:">999999999999</el-form-item>
          </el-card>
        </div>
        <el-table v-loading="loading" :data="agencyList" style="width: 100%">
          <el-table-column label="游戏ID" align="center" prop="item_1" width="160">
            <template #default="scope">
              <el-link :underline="false" class="el-link-decoration">
                {{ scope.row.item_1 }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="游戏" align="center" prop="item_2">
            <template #default="scope">
              <p>{{ scope.row.item_2 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="期数" align="center" prop="item_3">
            <template #default="scope">
              <p>{{ scope.row.item_3 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="游戏结果" align="center" prop="item_4">
            <template #default="scope">
              <p>{{ scope.row.item_4 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="投注金额类型" align="center" prop="item_5">
            <template #default="scope">
              <p>{{ scope.row.item_5 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="投注金额" align="center" prop="item_6">
            <template #default="scope">
              <p>{{ scope.row.item_6 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="游戏结算倍率" align="center" prop="item_7">
            <template #default="scope">
              <p>{{ scope.row.item_7 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="结算金额" align="center" prop="item_8">
            <template #default="scope">
              <p>{{ scope.row.item_8 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="投注时间" align="center" prop="item_8">
            <template #default="scope">
              <p>{{ scope.row.item_8 }}</p>
            </template>
          </el-table-column>
          <el-table-column label="结算时间" align="center" prop="item_8">
            <template #default="scope">
              <p>{{ scope.row.item_8 }}</p>
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
</style>
