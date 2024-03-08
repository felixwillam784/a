<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import type { FormInstance, FormRules } from "element-plus";

import { getWithdrawlReviewList } from "@/api/withdraw-management";
import useStore from "@/store";
import { copyText } from '@/utils/copy';
import { formatDate } from '@/utils/index';
const { withdrawal } = useStore();
import { ElMessage } from 'element-plus';

const { auth } = useStore();
interface GetWithdrawalReview {
  nick_name: string;
  user_account: string;
  withdrawal_amount: number | string;
  actual_amount: number | string;
  order_status: number;
  risk_control_hint: string;
  order_number: string;
  gaia_order_number: string;
  successful_recharge_times: number | string;
  withdrawal_status: number | string;
  withdrawal_times: number | string;
  kol_user: string;
  platform_order_number: string;
  upstream_order_number: string;
  upstream_channel: string;
  handling_fee: number | string;
  fee: number | string;
  total_recharge: number | string;
  total_withdrawal: number | string;
  withdrawal_channel: string;
  withdrawal_method: string;
  order_id: string | number;
  review_status: number;
  operator_id: string;
  operator_name: string;
  submission_time: string;
  order_update_time: string;
  user_id: number | string;
  lock: boolean;
}

interface RejectInterface {
  reject_reason: string;
  remark: string;
}

const router = useRouter();
const submission_time = ref(['', '']);
const order_update_time = ref(['', '']);
const defaultTime: [Date: any, Date: any] = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]

const formData = ref<any>({
  submission_start: +(new Date("2020-12-31").getTime() / 1000).toFixed(0),
  submission_end: +(new Date().getTime() / 1000).toFixed(0),
  page_num: 1,
  page_size: 20,
  order_status: -1
});

const loading = ref<boolean>(false);
const withdrawalReviewDetailDialogVisible = ref<boolean>(false);
const passDialogVisible = ref<boolean>(false);
const rejectDialogVisible = ref<boolean>(false);
const rejectItem = ref<RejectInterface>({
  reject_reason: "",
  remark: "",
});
const total = ref<number>(5);

const rules = ref<FormRules<RejectInterface>>({
  remark: [{ required: true, message: "请输入备注。", trigger: "blur" }],
});

const rejectItemRemark = ref("")

// const withdrawalReviewList = ref<Array<GetWithdrawalReview>>([]);

const withdrawalReviewItem = ref<GetWithdrawalReview>();

const orderStatusOptions = ref<Array<any>>([
  {
    label: '全部',
    value: -1
  },
  {
    label: '待处理',
    value: 0
  },
  {
    label: "处理中",
    value: 1,
  },
  {
    label: "成功",
    value: 2,
  },
  {
    label: "失败",
    value: 3,
  },
  {
    label: "待人工处理",
    value: 4,
  },
  {
    label: "已退款",
    value: 5,
  },
]);

const rejectOptions = ref<Array<any>>([
  {
    label: "",
    value: "",
  },
]);

// const handleQuery = () => {
//   loading.value = true;
//   getData()
//     .then(() => {
//       loading.value = false;
//     })
//     .catch(() => {
//       localStorage.clear();
//       router.push({ name: "Login" });
//       //user.token = '';
//     });
// };

// 重置
const resetQuery = () => {
  formData.value = {
    submission_start: +(new Date("2020-12-31").getTime() / 1000).toFixed(0),
    submission_end: +(new Date().getTime() / 1000).toFixed(0),
    page_num: 1,
    page_size: 20,
    order_status: -1
  }
  order_update_time.value = ['', ''];
  delete formData.value.order_update_start;
  delete formData.value.order_update_end;
  initSubmissionTime();
  handleQuery();
};

const detailWithdrawalReviewDialog = (item: GetWithdrawalReview) => {
  withdrawalReviewItem.value = item;
  withdrawalReviewDetailDialogVisible.value = true;
};

const closeDialog = () => {
  withdrawalReviewDetailDialogVisible.value = false;
};

const reviewParams = ref({
  id: '',
  operator: 0,
  remark: ''
})

const passDialogShow = (row: any) => {
  passDialogVisible.value = true;
  reviewParams.value = {
    id: row.order_id,
    operator: 1,
    remark: ''
  }
};

const closePassDialog = () => {
  passDialogVisible.value = false;
};

const rejectDialogShow = (row: any) => {
  rejectDialogVisible.value = true;
  reviewParams.value = {
    id: row.order_id,
    operator: 0,
    remark: rejectItemRemark.value ? rejectItemRemark.value : ''
  }
};

const closeRejectDialog = () => {
  rejectDialogVisible.value = false;
};

const rejectSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 锁定
const withdrawalLock = async (row: any) => {
  const params = {
    id: row.order_id
  };
  await withdrawal.dispatchWithdrawalReviewLock(params);
  await handleQuery();
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const goBulkPassPage = () => {
  router.push({ name: "Bulk Pass" });
};

const goBulkRejectPage = () => {
  router.push({ name: "Bulk Reject" });
};

const withdrawalReviewList = computed(() => {
  return withdrawal.getWithdrawalReviewData;
})

// 总条数
const totalNumber = computed(() => {
  return withdrawal.getWithdrawalReviewNumber;
})

/**
 * 查询
 */
const handleQuery = async () => {
  if (formData.value.user_account && formData.value.user_account.length < 3) {
    return ElMessage.warning('查询不得少于3个字符串');
  }
  if (!submission_time.value) {
    initSubmissionTime();
  }
  if (order_update_time.value) {
    if (order_update_time.value[0]) {
      let updateStart = new Date(order_update_time.value[0]);
      let updateEnd = new Date(order_update_time.value[1]);
      updateStart.setHours(0, 0, 0, 0);
      updateEnd.setDate(updateEnd.getDate() + 1);
      updateEnd.setHours(0, 0, 0, 0);
      formData.value.order_update_start = updateStart.getTime() / 1000;
      formData.value.order_update_end = updateEnd.getTime() / 1000;
    }
  } else {
    order_update_time.value = ['', ''];
    delete formData.value.order_update_start;
    delete formData.value.order_update_end;
  }
  let submissionStart = new Date(submission_time.value[0]);
  let submissionEnd = new Date(submission_time.value[1]);
  submissionStart.setHours(0, 0, 0, 0);
  submissionEnd.setDate(submissionEnd.getDate() + 1);
  submissionEnd.setHours(0, 0, 0, 0);
  formData.value.submission_start = submissionStart.getTime() / 1000;
  formData.value.submission_end = submissionEnd.getTime() / 1000;
  await withdrawal.dispatchWithdrawalReviewList(formData.value);
}

/**
 * 审核操作
 */
const withdrawalReviewOperation = async () => {
  if (rejectItemRemark.value) {
    reviewParams.value.remark = rejectItemRemark.value
  }
  await withdrawal.dispatchWithdrawalReviewOperation(reviewParams.value);
  rejectItemRemark.value = '';
  closeDialog();
  closePassDialog();
  closeRejectDialog();
  await handleQuery();
}

const initSubmissionTime = () => {
  submission_time.value = ['', ''];
  submission_time.value[0] = new Date('2020-12-31 00:00:00').toISOString().split('T')[0];
  submission_time.value[1] = new Date().toISOString().split('T')[0];
}


onMounted(() => {
  initSubmissionTime();
  handleQuery();
});
const getData = async () => {
  //let res = await getWithdrawlReviewList("Bearer" + auth.userInfo.token, formData.value);
};

const order_status = ["待处理", "处理中", "成功", "失败", "待人工处理", "已退款"];

const getFontStyle = (orderStatus: number) => {
  let color = "";
  // Determine the color based on the order status value
  if (orderStatus !== 3) {
    color = "green";
  } else {
    color = "red";
  }
  return `color: ${color}; font-weight: bold;`;
};

const operate = (action: number) => {};
const lock = () => {};
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <el-row style="align-items: center">
            <el-col>
              <el-form :model="formData" :inline="true" label-width="100">
                <el-form-item label="用户账号" prop="user_account">
                  <el-input
                    v-model="formData.user_account"
                    placeholder="请输入用户账号"
                  />
                </el-form-item>
              </el-form>
              <el-form :model="formData" :inline="true" label-width="100">
                <el-form-item label="订单提交时间" prop="submission_time">
                  <el-date-picker
                    range-separator="到"
                    v-model="submission_time"
                    type="daterange"
                    start-placeholder="选择提交时间"
                    end-placeholder="选择提交时间"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    :default-time="defaultTime"
                  />
                </el-form-item>
                <el-form-item label="订单更新时间" prop="order_update_time">
                  <el-date-picker
                    range-separator="到"
                    v-model="order_update_time"
                    type="daterange"
                    start-placeholder="选择更新时间"
                    end-placeholder="选择更新时间"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    :default-time="defaultTime"
                  />
                </el-form-item>
                <el-form-item label="订单状态" prop="order_status">
                  <el-select v-model="formData.order_status" placeholder="选择订单状态">
                    <el-option
                      v-for="(item, index) in orderStatusOptions"
                      :label="item.label"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                style="display: flex; justify-content: space-between"
              >
                <div>
                  <el-form-item label="平台订单号" prop="order_id">
                    <el-input
                      v-model="formData.order_id"
                      placeholder="请输入平台订单号"
                    />
                  </el-form-item>
                  <el-form-item label="Gaia订单号" prop="gaia_order_number">
                    <el-input
                      v-model="formData.gaia_order_number"
                      placeholder="请输入Gaia订单号"
                    />
                  </el-form-item>
                </div>
                <div>
                  <el-button type="primary" :icon="Search" @click="handleQuery"
                    >搜索</el-button
                  >
                  <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                  <!-- <el-button @click="goBulkPassPage">批量同意</el-button> -->
                  <!-- <el-button @click="goBulkRejectPage">批量拒绝</el-button> -->
                </div>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin-top: 20px">
          <el-table v-loading="loading" :data="withdrawalReviewList" style="width: 100%; height: 600px">
            <el-table-column
              label="用户账号"
              align="center"
              prop="user_id"
              width="160"
            >
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                  @click="router.push({ name: 'UserDetail', params: { id: scope.row.id } })"
                >
                  {{ scope.row.user_id }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="提现金额"
              align="center"
              prop="withdrawal_amount"
              width="120"
            >
              <template #default="scope">
                <p>${{ scope.row.withdrawal_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="实到金额"
              align="center"
              prop="actual_amount"
              width="120"
            >
              <template #default="scope">
                <p>${{ scope.row.actual_amount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="免手续费"
              align="center"
              prop="fee"
              width="120"
            >
              <template #default="scope">
                <p>${{ scope.row.fee }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="订单状态"
              align="center"
              prop="order_status"
              width="120"
            >
              <template #default="scope">
                <font
                  :style="getFontStyle(parseInt(scope.row.order_status))"
                  style="font-weight: bold"
                  >{{ order_status[parseInt(scope.row.order_status)] }}</font
                >
              </template>
            </el-table-column>
            <el-table-column
              label="风控提示"
              align="center"
              prop="risk_control_hint"
              width="160"
            >
              <template #default="scope">
                <Font
                  color="red"
                  v-if="
                    scope.row.risk_control_hint == 'IP风控' ||
                    scope.row.risk_control_hint == '一级风控'
                  "
                  >{{ scope.row.risk_control_hint }}</Font
                >
                <Font v-else>{{ scope.row.risk_control_hint }}</Font>
              </template>
            </el-table-column>
            <el-table-column
              label="订单号"
              align="center"
              prop="order_id"
              width="220"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.order_id }}</p>
                  <el-button link v-if="scope.row.order_id">
                    <el-icon @click="copyText(scope.row.order_id)">
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Gaia订单号"
              align="center"
              prop="gaia_order_number"
              width="240"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.gaia_order_number }}</p>
                  <el-button link v-if="scope.row.gaia_order_number">
                    <el-icon @click="copyText(scope.row.gaia_order_number)">
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
              width="220"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.upstream_order_number }}</p>
                  <el-button link v-if="scope.row.upstream_order_number">
                    <el-icon @click="copyText(scope.row.upstream_order_number)">
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="上游渠道"
              align="center"
              prop="upstream_channel"
              width="220"
            >
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <p>{{ scope.row.upstream_channel }}</p>
                  <el-button link v-if="scope.row.upstream_channel">
                    <el-icon @click="copyText(scope.row.upstream_channel)">
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="成功充值次数"
              align="center"
              prop="success_recharge_times"
              width="120"
            >
              <template #default="scope">
                <p>{{ scope.row.success_recharge_times }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="是否首次提现"
              align="center"
              prop="first_withdrawal_status"
              width="120"
            >
              <template #default="scope">
                <p :class="scope.row.first_withdrawal_status == false ? 'red' : 'green'">
                  {{ scope.row.first_withdrawal_status == false ? '否' : '是' }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="提现次数"
              align="center"
              prop="withdrawal_times"
              width="120"
            >
              <template #default="scope">
                <p>{{ scope.row.withdrawal_times }}</p>
              </template>
            </el-table-column>
            <el-table-column label="KOL用户" align="center" prop="kol_user" width="120">
              <template #default="scope">
                <p :class="scope.row.kol_user == false ? 'red' : 'green'">
                  {{ scope.row.kol_user == false ? '否' : '是' }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="订单提交时间"
              align="center"
              prop="submission_time"
              width="220"
            >
              <template #default="scope">
                <p>{{ formatDate(scope.row.submission_time) }}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="260">
              <template #default="scope">
                <el-button
                  type="danger"
                  link
                  @click="detailWithdrawalReviewDialog(scope.row)"
                  >详情</el-button
                >
                <el-button
                  type="primary"
                  link
                  v-if="scope.row.order_status !== 1 && scope.row.order_status == 0 && scope.row.lock == false"
                  @click="withdrawalLock(scope.row)"
                  >锁定</el-button
                >
                <el-button
                  type="success"
                  link
                  v-if="
                    scope.row.order_status !== 1 &&
                    scope.row.order_status == 0 &&
                    scope.row.operator_id == 1 &&
                    scope.row.lock == true
                  "
                  @click="passDialogShow(scope.row)"
                  >同意</el-button
                >
                <el-button
                  type="danger"
                  link
                  v-if="
                    scope.row.order_status !== 1 &&
                    scope.row.order_status == 0 &&
                    scope.row.operator_id == 1 &&
                    scope.row.lock == true
                  "
                  @click="rejectDialogShow(scope.row)"
                  >拒绝</el-button
                >
                <el-button
                  type="danger"
                  link
                  v-if="
                    scope.row.order_status !== 1 &&
                    scope.row.order_status == 0 &&
                    scope.row.operator_id == 1 &&
                    scope.row.lock == true
                  "
                  @click="lock()"
                  >已锁定</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="float: right">
            <pagination
              v-if="totalNumber > 0"
              :total="totalNumber"
              v-model:page="formData.page_num"
              v-model:limit="formData.page_size"
              @pagination="handleQuery"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="passDialogVisible"
      width="500px"
      title="确认提现通过"
      append-to-body
      style="text-align: center; margin-top: 200px"
    >
      <p>订单审核提现通过，订单进入启动代付状态?</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="withdrawalReviewOperation">通过</el-button>
          <el-button @click="closePassDialog">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="rejectDialogVisible"
      width="500px"
      title="确认拒绝提现"
      append-to-body
      style="text-align: center; margin-top: 200px"
    >
      <!-- <el-row>
        <el-col :span="6" class="detail-item-left-bg">拒绝原因:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <el-select v-model="rejectItem.reject_reason" placeholder="请选择拒绝原因">
            <el-option
              v-for="(item, index) in rejectOptions"
              :label="item.label"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>
      </el-row> -->
      <el-form>
        <el-row style="align-items: center">
          <!-- <Font color="red" style="font-size: 20px">*</Font> -->
          <h3>备注</h3>
        </el-row>
        <el-form-item prop="remark">
          <el-input type="textarea" :rows="4" v-model="rejectItemRemark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="warning" @click="withdrawalReviewOperation">拒绝</el-button>
          <el-button @click="closeRejectDialog">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      title="提现审核详情"
      v-model="withdrawalReviewDetailDialogVisible"
      width="600px"
      append-to-body
      @close="closeDialog"
    >
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">用户账号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.user_id }}</p>
        </el-col>
      </el-row>
      <el-row v-if="withdrawalReviewItem?.review_status == 1">
        <el-col :span="6" class="detail-item-left-bg">用户名:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.nick_name }}</p>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="6" class="detail-item-left-bg">订单号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.order_id }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">Gaia订单号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.gaia_order_number }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">提现金额:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>${{ Number(withdrawalReviewItem?.withdrawal_amount) }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">实到金额:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>${{ Number(withdrawalReviewItem?.actual_amount) }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">手续费:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>${{ Number(withdrawalReviewItem?.handling_fee) }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">免手续费:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>${{ Number(withdrawalReviewItem?.fee) }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">订单提交时间:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ formatDate(withdrawalReviewItem?.submission_time) }}</p>
        </el-col>
      </el-row>
      <el-row v-if="withdrawalReviewItem?.review_status == 1">
        <el-col :span="6" class="detail-item-left-bg">订单更新时间:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.order_update_time }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">用户总充值:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>${{ Number(withdrawalReviewItem?.total_recharge) }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">用户总提现:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>${{ Number(withdrawalReviewItem?.total_withdrawal) }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">提现渠道:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.withdrawal_channel }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">提现方式:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.withdrawal_method }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">风控提示:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <Font
            color="red"
            v-if="
              withdrawalReviewItem?.risk_control_hint == 'IP风控' ||
              withdrawalReviewItem?.risk_control_hint == '一级风控'
            "
          >
            {{ withdrawalReviewItem?.risk_control_hint }}
          </Font>
          <Font v-else>{{ withdrawalReviewItem?.risk_control_hint }}</Font>
        </el-col>
      </el-row>
      <el-row v-if="withdrawalReviewItem?.review_status == 1">
        <el-col :span="6" class="detail-item-left-bg">操作人员:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <p>{{ withdrawalReviewItem?.operator_name }}</p>
        </el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer"
             v-if="withdrawalReviewItem?.order_status !== 1 &&
             withdrawalReviewItem?.order_status == 0 &&
             withdrawalReviewItem?.operator_id == 1 &&
             withdrawalReviewItem?.lock == true">
          <el-button type="primary" @click="passDialogShow(withdrawalReviewItem)">通过</el-button>
          <el-button type="warning" @click="rejectDialogShow(withdrawalReviewItem)">拒绝</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
        <div class="dialog-footer" v-else>
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
  padding-left: 10px !important;
}

.remark-form {
  .el-form-item__content {
    margin-left: 0px !important;
  }
}

.hidden {
  visibility: hidden;
}

.red {
  color: red;
}

.app-container .el-form-item__label {
  font-weight: 700;
}
</style>
