<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search, Refresh, Upload, Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import { fa } from "element-plus/es/locale";
import { NumberFormatProps } from "vue-i18n";
import { color } from "echarts";

const router = useRouter();

interface DaySignInBonus {
  amount: number | string;
  code_magnification: number | string;
}

interface SignInBonusData {
  vip_level: number;
  vip_rank: string;
  days: Array<DaySignInBonus>;
  requried_charge_amount: number | string;
  required_code_amount: number | string;
}
const auto_signin_popup = ref(true);
const signin_function_switch = ref(true);

const signin_bonous_list = ref<Array<SignInBonusData>>([
  {
    vip_level: 0,
    vip_rank: "Bronze",
    days: [
      {
        amount: 10,
        code_magnification: 10,
      },
      {
        amount: 10,
        code_magnification: 10,
      },
      {
        amount: 10,
        code_magnification: 10,
      },
      {
        amount: 10,
        code_magnification: 10,
      },
      {
        amount: 10,
        code_magnification: 10,
      },
      {
        amount: 10,
        code_magnification: 10,
      },
      {
        amount: 10,
        code_magnification: 10,
      },
      {
        amount: 10,
        code_magnification: 10,
      },
    ],
    requried_charge_amount: 10,
    required_code_amount: 10,
  },
]);

onMounted(() => {});

const getColumnHeaderStyle = (index: number) => {
  // Set the desired style for the header cell
  return index % 2 == 0
    ? {
        backgroundColor: "rgb(197, 204, 71)", // Example: Set the text color to red
        fontWeight: "bold", // Example: Set the font weight to bold
        display: "flex",
        height: "100px",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        margin: "0px",
        // Add more styles as needed
      }
    : {
        backgroundColor: "rgb(106, 196, 88)", // Example: Set the text color to red
        fontWeight: "bold", // Example: Set the font weight to bold
        display: "flex",
        width: "100%",
        height: "100px",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        // Add more styles as needed
      };
};

const dialog_title = ref<string>();
//detail && add new
const showDetailDialog = ref(false);
const signin_bonous_item = ref<SignInBonusData>(signin_bonous_list.value[0]);
const showDetail = (data: SignInBonusData) => {
  showDetailDialog.value = true;
  signin_bonous_item.value = data;
  dialog_title.value = "VIP签到详情";
};

const showAddNew = () => {
  showDetailDialog.value = true;
  let empty: SignInBonusData = {
    vip_level: signin_bonous_list.value.length,
    vip_rank: "Bronze",
    days: [
      {
        amount: "",
        code_magnification: "",
      },
      {
        amount: "",
        code_magnification: "",
      },
      {
        amount: "",
        code_magnification: "",
      },
      {
        amount: "",
        code_magnification: "",
      },
      {
        amount: "",
        code_magnification: "",
      },
      {
        amount: "",
        code_magnification: "",
      },
    ],
    requried_charge_amount: "",
    required_code_amount: "",
  };
  signin_bonous_item.value = empty;
  dialog_title.value = "新增VIP签到奖励";
};

const gotovipsigninstatistic = () => {
  router.push({ name: "VIPSigninBonusStatistic" });
};
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search">
          <el-form :inline="true" label-width="120" class="right_position">
            <el-form-item>
              <el-button @click="gotovipsigninstatistic()">签到数据统计 </el-button>
              <el-button @click="showAddNew()">新增签到奖励</el-button>
              <el-button>模版导出</el-button>
              <el-button>Excel导入</el-button>
              <el-button>Excel导出</el-button>
            </el-form-item>
          </el-form>
          <div class="right_position switch_div" style="margin-right: 20px">
            <div class="switch_div">
              <p>签到界面自动弹出</p>
              <el-switch
                size="large"
                v-model="auto_signin_popup"
                inline-prompt
                active-text="开"
                inactive-text="关"
                class="switch"
              />
            </div>
            <div style="margin-left: 30px" class="switch_div">
              <p>VIP签到功能开启/关闭</p>
              <el-switch
                size="large"
                v-model="signin_function_switch"
                inline-prompt
                active-text="开"
                inactive-text="关"
                class="switch"
              />
            </div>
          </div>
        </div>

        <el-card>
          <el-table :data="signin_bonous_list" style="width: 100%">
            <el-table-column
              label="VIP等级"
              align="center"
              prop="vip_level"
              width="160"
            />
            <el-table-column label="段位" align="center" prop="vip_rank" width="160" />

            <el-table-column
              v-for="(item, index) in signin_bonous_list[0].days"
              :key="index"
              :label="`第${index + 1}天签到`"
              align="center"
              class="headerColor"
            >
              <template #header>
                <span :style="getColumnHeaderStyle(index)">
                  {{ `第${index + 1}天签到` }}
                </span>
              </template>
              <el-table-column
                label="金额"
                align="center"
                :prop="`days[${index}].amount`"
              >
                <template #header>
                  <span :style="getColumnHeaderStyle(index)">
                    {{ `金额` }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="打码倍率"
                align="center"
                :prop="`days[${index}].code_magnification`"
              >
                <template #header>
                  <span :style="getColumnHeaderStyle(index)">
                    {{ `打码倍率` }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="完成签到需求充值量"
                align="center"
                prop="requried_charge_amount"
              >
                <template #header>
                  <span :style="getColumnHeaderStyle(index)">
                    {{ `完成签到需求充值量` }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="完成签到需求打码量"
                align="center"
                prop="required_code_amount"
              >
                <template #header>
                  <span :style="getColumnHeaderStyle(index)">
                    {{ `完成签到需求打码量` }}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="120">
              <template #default="scope">
                <el-button type="primary" link @click="showDetail(scope.row)"
                  >详情</el-button
                >
                <el-button type="danger" link>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-dialog v-model="showDetailDialog" :title="dialog_title">
        <div class="dl_row">
          <p style="width: 30%">VIP等级</p>
          <el-input v-model="signin_bonous_item.vip_level" disabled />
        </div>
        <div class="dl_row">
          <p style="width: 30%">VIP段位</p>
          <el-input v-model="signin_bonous_item.vip_rank" disabled />
        </div>
        <div class="dl_row" v-for="(item, index) in signin_bonous_item.days" :key="index">
          <p v-if="index < 7" style="width: 30%">
            {{ `第${index + 1}天奖励` }}
          </p>
          <p v-else style="width: 30%">第8天及之后奖励</p>
          <p style="width: 20%">奖励金额</p>
          <el-input
            style="width: 25%"
            v-model="signin_bonous_item.days[index].amount"
            placeholder="请输入奖励金额"
          />
          <p style="width: 20%; margin-left: 50px">打码倍率</p>
          <el-input
            style="width: 25%"
            v-model="signin_bonous_item.days[index].code_magnification"
            placeholder="请输入打码l倍率"
          />
        </div>
        <div class="dl_row">
          <p style="width: 30%">完成签到需要的充值金额</p>
          <el-input
            v-model="signin_bonous_item.requried_charge_amount"
            placeholder="请输入完成签到需要的充值金额"
          />
        </div>
        <div class="dl_row">
          <p style="width: 30%">完成签到需要的打码量</p>
          <el-input
            v-model="signin_bonous_item.required_code_amount"
            placeholder="请输入完成签到需要的打码量"
          />
        </div>
        <template #footer>
          <div style="display: flex; justify-content: center">
            <el-button type="primary">确认</el-button>
            <el-button>取消</el-button>
          </div>
        </template>
      </el-dialog>
    </el-row>
  </div>
</template>

<style lang="scss">
.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}
.dl_row:nth-child(2n + 1) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n) {
  /* Style for even elements in the group */
  background-color: #ccc;
}

.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  padding: 0px !important;
  height: 100px;
}
.el-table--default .cell {
  padding: 0 0px;
}
.el-table--enable-row-transition .el-table__body td.el-table__cell {
  height: 80px;
}

.right_position {
  display: flex;
  justify-content: right;
}

.switch {
  height: 100%;
  margin-left: 10px;
}

.switch_div {
  display: flex;
  align-items: center;
}
</style>
