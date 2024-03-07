<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import type { FormInstance, FormRules } from "element-plus";
import { getDepositeOrderList, setDepositeAmount } from "@/api/withdraw-management";

import useStore from "@/store";
import WithdrawalRecord from "@/views/player-management/user-list/WithdrawalRecord.vue";
import type * as Withdrawal from "@/interface/withdrawal";

const { withdrawal } = useStore();
const { user } = useStore();

const router = useRouter();

const formData = ref<any>({
  user_account: "",
  first_charge_status: "",
  upstream_channel: "",
  platform_order_number: "",
  upstream_order_number: "",
  gaia_order_number: "",
  order_status: "",
  submission_start: 0,
  submission_end: 0,
  order_update_start: "",
  order_update_end: "",
  page_num: 1,
  page_size: 20,
});
const submission_time = ref<any>(["2020-12-31", new Date().toISOString().split("T")[0]]);
const order_update = ref<any>([]);

const loading = ref<boolean>(false);
const depositOrderDialogVisible = ref<boolean>(false);
const depositOrderDetailDialogVisible = ref<boolean>(false);
const depositOrderDialogTitle = ref<string>("补单");
const ruleFormRef = ref<FormInstance>();
const submitBtnText = ref<string>("确定");
const closeBtnText = ref<string>("取消");

const rules = ref<FormRules<Withdrawal.GetDepositOrder>>({
  order_amount: [{ required: true, message: "请输入补单金额。", trigger: "blur" }],
});

const depositOrderList = computed(() => {
  return withdrawal.getDepositList;
});

const depositOrderItem = ref<Withdrawal.GetDepositOrder>(
  {} as Withdrawal.GetDepositOrder
);

const handleQuery = async () => {
  data.value = [];
  disabled.value = false;
  page.value = 0;
  formData.value.submission_start = new Date(submission_time.value[0]).getTime() / 1000;
  formData.value.submission_end = new Date(submission_time.value[1]).getTime() / 1000;
  if (order_update.value[0] && order_update.value[0]) {
    formData.value.order_update_start = new Date(order_update.value[0]).getTime() / 1000;
    formData.value.order_update_end = new Date(order_update.value[1]).getTime() / 1000;
  }
  await withdrawal.dispatchDepositList(formData.value);
  await load();
};

const detailManualPaymentDialog = (item: Withdrawal.GetDepositOrder) => {
  depositOrderItem.value = item;
  depositOrderDetailDialogVisible.value = true;
};

const closeDialog = () => {
  depositOrderDialogVisible.value = false;
  depositOrderDetailDialogVisible.value = false;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await withdrawal.dispatchUpdateSupply({
        id: depositOrderItem.value?.platform_order_number,
        order_amount: depositOrderItem.value?.order_amount,
      });
    } else {
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const makeOrder = (item: Withdrawal.GetDepositOrder) => {
  depositOrderItem.value = item;
  depositOrderDialogVisible.value = true;
};

onMounted(async () => {
  formData.value.submission_start = Math.floor(
    new Date(submission_time.value[0]).getTime() / 1000
  );
  formData.value.submission_end = Math.floor(
    new Date(submission_time.value[1]).getTime() / 1000
  );
  await withdrawal.dispatchDepositList(formData.value);
});

const getFontStyle = (orderStatus: number) => {
  let color = "";
  // Determine the color based on the order status value
  if (orderStatus === 0 || orderStatus === 1) {
    color = "green";
  } else {
    color = "red";
  }
  return `color: ${color}; font-weight: bold;`;
};
const order_stats = [
  "订单已关",
  "支付失败",
  "订单生成",
  "支付中",
  "支付成功",
  "业务处理",
  "已退款",
];
const total = computed(() => {
  return Math.ceil(withdrawal.getTotalNumber / 10);
});
const disabled = ref(false);
const page = ref(0);
const data = ref<Array<Withdrawal.GetDepositOrder>>([]);
const changeStatusData = [
  {
    label: "是",
    value: true,
  },
  {
    label: "否",
    value: false,
  },
];
const orderStatusData = [
  {
    label: "支付成功",
    value: 1,
  },
  {
    label: "支付失败",
    value: 2,
  },
  {
    label: "支付中",
    value: 3,
  },
];
const load = async () => {
  if (disabled.value) return;
  loading.value = true;
  page.value++;
  if (page.value <= total.value) {
    formData.value.page_num = page.value;
    await withdrawal.dispatchDepositList(formData.value);
    data.value = data.value.concat(depositOrderList.value);
  }

  if (page.value === total.value) {
    disabled.value = true;
  }
  loading.value = false;
};

const copyText = (str: any) => {
  navigator.clipboard.writeText(str);
};
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <el-form :model="formData" :inline="true" label-width="100">
            <!-- <el-form-item label="用户昵称" prop="nick_name">
                            <el-input v-model="formData.nick_name" placeholder="请输入用户昵称" />
                        </el-form-item> -->
            <el-form-item label="用户账户" prop="user_account">
              <el-input v-model="formData.user_account" placeholder="请输入用户账户" />
            </el-form-item>
            <!-- <el-form-item label="用户ID" prop="user_id">
                            <el-input v-model="formData.user_id" placeholder="请输入用户ID" />
                        </el-form-item> -->
            <el-form-item label="是否首充" prop="first_charge_status">
              <el-select
                v-model="formData.first_charge_status"
                placeholder="请选择是否首充"
                class="width"
              >
                <el-option
                  v-for="item in changeStatusData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态" prop="order_status">
              <el-select v-model="formData.order_status" placeholder="选择订单状态">
                <el-option
                  v-for="(item, index) in orderStatusData"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :model="formData" :inline="true" label-width="100">
            <el-form-item label="订单提交时间" prop="submission_time">
              <el-date-picker
                range-separator="到"
                v-model="submission_time"
                type="daterange"
                placeholder="选择提交时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 220px"
              />
            </el-form-item>
            <el-form-item label="订单更新时间" prop="order_update_time">
              <el-date-picker
                range-separator="到"
                v-model="order_update"
                type="daterange"
                placeholder="选择更新时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 220px"
              />
            </el-form-item>

            <el-form-item label="上游通道" prop="upstream_channel">
              <el-input
                v-model="formData.upstream_channel"
                placeholder="请选择上游通道"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="handleQuery"
                >搜索</el-button
              >
              <el-button :icon="Refresh" @click="handleQuery">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form :model="formData" :inline="true" label-width="100">
            <el-form-item label="订单号" prop="platform_order_number">
              <el-input
                v-model="formData.platform_order_number"
                placeholder="请输入订单号"
              />
            </el-form-item>
            <!-- <el-form-item label="通道订单号" prop="platform_order_number">
                            <el-input v-model="formData.platform_order_number" placeholder="请输入通道订单号" />
                        </el-form-item> -->
            <el-form-item label="上游订单号" prop="upstream_order_number">
              <el-input
                v-model="formData.upstream_order_number"
                placeholder="请输入上游订单号"
              />
            </el-form-item>
            <el-form-item label="gaia订单号" prop="gaia_order_number">
              <el-input v-model="formData.gaia_order_number" placeholder="请输入gaia" />
            </el-form-item>
          </el-form>
        </el-card>

        <el-card style="margin-top: 10px">
          <el-table
            v-el-table-infinite-scroll="load"
            :infinite-scroll-disabled="disabled"
            :data="data"
            style="width: 100%; height: 650px"
            v-loading="loading"
          >
            <!-- <el-table-column label="用户昵称" align="center" prop="nick_name" width="160">
                            <template #default="scope">
                                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;" @click="router.push({ name: 'UserDetail' })">
                                    {{ scope.row.nick_name }}
                                </el-link>
                            </template>
                        </el-table-column> -->
            <el-table-column
              label="用户账号"
              align="center"
              prop="user_account"
              width="160"
            >
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: rgb(83, 147, 224); text-decoration-line: underline"
                  @click="router.push({ name: 'UserDetail' })"
                >
                  {{ scope.row.user_account }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="订单号"
              align="center"
              prop="platform_order_number"
              width="220"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.platform_order_number }}</p>
                  <el-button link @click="copyText(scope.row.platform_order_number)">
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="gaia订单号"
              align="center"
              prop="gaia_order_number"
              width="220"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.gaia_order_number }}</p>
                  <el-button link @click="copyText(scope.row.gaia_order_number)">
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="上游通道"
              align="center"
              prop="upstream_channel"
              width="220"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.upstream_channel }}</p>
                  <el-button link @click="copyText(scope.row.upstream_channel)">
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="上游订单号"
              align="center"
              prop="upstream_order_number"
              width="240"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.upstream_order_number }}</p>
                  <el-button link @click="copyText(scope.row.upstream_order_number)">
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="订单状态"
              align="center"
              prop="order_status"
              width="160"
            >
              <template #default="scope">
                <font
                  :style="getFontStyle(parseInt(scope.row.order_status))"
                  style="font-weight: bold"
                  >{{ order_stats[parseInt(scope.row.order_status) + 2] }}</font
                >
              </template>
            </el-table-column>
            <el-table-column label="存款类型" align="center" prop="amount_type">
              <template #default="scope">
                <p>{{ scope.row.amount_type }}</p>
              </template>
            </el-table-column>
            <el-table-column label="订单金额" align="center" prop="order_amount">
              <template #default="scope">
                <p>${{ scope.row.order_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label="实际到账" align="center" prop="actual_amount	">
              <template #default="scope">
                <p>${{ scope.row.actual_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label="是否首充" align="center" prop="first_charge_status">
              <template #default="scope">
                <p>{{ scope.row.first_charge_status ? "是" : "否" }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="订单提交时间"
              align="center"
              prop="submission_time"
              width="200"
            >
              <template #default="scope">
                <p>{{ scope.row.submission_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="180">
              <template #default="scope">
                <el-button
                  type="danger"
                  link
                  @click="detailManualPaymentDialog(scope.row)"
                  >详情</el-button
                >
                <el-button type="success" link @click="makeOrder(scope.row)"
                  >补单</el-button
                >
                <el-button
                  type="primary"
                  link
                  :class="
                    scope.row.order_status != '支付中' &&
                    scope.row.order_status != '支付失败'
                      ? 'hidden'
                      : ''
                  "
                  >同步订单</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="depositOrderDialogTitle"
      v-model="depositOrderDialogVisible"
      width="600px"
      append-to-body
      @close="closeDialog"
    >
      <el-form
        label-width="160px"
        ref="ruleFormRef"
        :rules="rules"
        :model="depositOrderItem"
      >
        <el-form-item label="补单金额:" prop="order_amount">
          <el-input v-model="depositOrderItem.order_amount" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(ruleFormRef)">{{
            submitBtnText
          }}</el-button>
          <el-button @click="resetForm(ruleFormRef)">{{ closeBtnText }}</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      title="充值订单详情"
      v-model="depositOrderDetailDialogVisible"
      width="600px"
      append-to-body
      @close="closeDialog"
    >
      <!-- <el-row>
                <el-col :span="6" class="detail-item-left-bg">客户ID:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.id }}</p>
                </el-col>
            </el-row> -->
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">用户账号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.user_account }}</p>
        </el-col>
      </el-row>
      <!-- <el-row>
                <el-col :span="6" class="detail-item-left-bg">用户昵称:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.nick_name }}</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="detail-item-left-bg">Gaia订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.gaia_order_number }}</p>
                </el-col>
            </el-row> -->
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">平台订单号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.platform_order_number }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">Gaia订单号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.gaia_order_number }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">上游通道:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.upstream_channel }}</p>
        </el-col>
      </el-row>
      <!-- <el-row>
                <el-col :span="6" class="detail-item-left-bg">通道订单号:</el-col>
                <el-col :span="18" class="detail-item-right-bg">
                    <p>{{ depositOrderItem.channel_order_number }}</p>
                </el-col>
            </el-row> -->
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">上游订单号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.upstream_order_number }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">订单状态:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <Font color="green" v-if="depositOrderItem.order_status == 2">
            {{ depositOrderItem.order_status }}
          </Font>
          <p v-else>{{ depositOrderItem.order_status }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">金额类型:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.amount_type }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">充值金额:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.order_amount }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">实到金额:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.actual_amount }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">订单提交时间:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.submission_time }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">订单更新时间:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.order_update_time }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">充值方式:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.recharge_method }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">税号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.tax_number }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">支付渠道:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.payment_channel }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">充值类型:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ depositOrderItem.recharge_type }}</p>
        </el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
  height: 80px;
}

.detail-item-left-bg {
  background-color: #f5f7fa;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  height: 36px;
}

.detail-item-right-bg {
  border: 1px solid gray;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  height: 36px;
}

.remark-form {
  .el-form-item__content {
    margin-left: 0px !important;
  }
}

.hidden {
  visibility: hidden;
}
</style>
