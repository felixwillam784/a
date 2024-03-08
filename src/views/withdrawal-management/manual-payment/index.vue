<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Search, Refresh, Upload, Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { getManualPaymentList, addManualPayment } from "@/api/withdraw-management";
import useStore from "@/store";
import { formatDate } from '@/utils/index';
import { copyText } from '@/utils/copy';
const { withdrawal } = useStore();
import { ElMessage } from 'element-plus';

const { user } = useStore();

interface GetManualPayment {
  nick_name: string;
  user_account: string;
  order_amount: number | string;
  change_type: number;
  code_ratio: string;
  operator: string;
  invitation_code: string;
  user_type: string;
  submission_time: string;
  remark: string;
  amount_type: string | number;
  user_id: string | number;
  amount: string | number;
  bet_rate: string;
  order_time: string;
  operator_id: string;
  notes: string;
  id: string;
}

const router = useRouter();

const formData = ref<any>({
  // id: "",
  // uid: "",
  order_time_start: "",
  order_time_end: "",
  // change_type: 2,
  // operator_id: "",
  page_num: 1,
  page_size: 20,
});

const loading = ref<boolean>(false);
const manualDialogVisible = ref<boolean>(false);
const manualPaymentDetailDialogVisible = ref<boolean>(false);
const manualDialogTitle = ref<string>("添加订单");
const total = ref<number>(5);
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");
const ruleFormRef = ref<FormInstance>();

const rules = ref<FormRules<GetManualPayment>>({
  id: [{ required: true, message: "请输入用户账号。", trigger: "blur" }],
  amount: [{ required: true, message: "请输入订单金额。", trigger: "blur" }],
  change_type: [{ required: true, message: "请选择变动类型。", trigger: "blur" }],
  bet_rate: [{ required: true, message: "请输入打码倍率。", trigger: "blur" }],
  amount_type: [{ required: true, message: "请选择货币类型。", trigger: "blur" }],
  notes: [{ required: true, message: "请输入备注。", trigger: "blur" }],
});

// const manualPaymentList = ref<Array<GetManualPayment>>([
//   {
//     nick_name: "UserName10001",
//     user_account: "test77@gmail.com",
//     order_amount: "999",
//     change_type: "平台内链",
//     code_ratio: "1倍",
//     operator: "UserName",
//     invitation_code: "SJSHdkdk012",
//     user_type: "KOL用户",
//     submission_time: "2023-6-30 13:00:00",
//     remark: "desc desc desc",
//   },
// ]);

const orderTime = ref(['', '']);

const manualPaymentItem = ref<GetManualPayment>({
    nick_name: "",
    user_account: "",
    order_amount: "",
    change_type: 1,
    code_ratio: "",
    operator: "",
    invitation_code: "",
    user_type: "",
    submission_time: "",
    remark: "",
    amount_type: 'MXN',
    user_id: "",
    amount: "",
    bet_rate: "",
    order_time: "",
    operator_id: "",
    notes: "",
    id: ""
});

const typeOptions = ref<Array<any>>([
  {
    label: "平台内链",
    value: "平台内链",
  },
]);

// 变动类型
const changeTypeOptions = ref<Array<any>>([
  {
    id: 1,
    value: '人工充值'
  },
  {
    id: 2,
    value: '主播加金'
  },
  {
    id: 3,
    value: '异常补金'
  },
  {
    id: 4,
    value: '手动赠金'
  },
  {
    id: 5,
    value: '虚拟账号加金'
  }
])

// 货币类型
const amountTypeOption = ref<Array<any>>([
  {
    id: 1,
    value: 'MXN'
  }
])

// 变动类型匹配
const changeTypeText = (value: number) => {
  return changeTypeOptions.value.filter((item: any) => item.id == value)[0]?.value;
}

// 人工入款列表
const manualPaymentList = computed(() => {
  return withdrawal.getManualAddListData;
})

// 查询
const handleQuery = async () => {
  if (formData.value.id && formData.value.id.length < 3) {
    return ElMessage.warning('查询不得少于3个字符串');
  }
  if (!orderTime.value) {
    initSubmissionTime();
  }
  let submissionStart = new Date(orderTime.value[0]);
  let submissionEnd = new Date(orderTime.value[1]);
  submissionStart.setHours(0, 0, 0, 0);
  submissionEnd.setDate(submissionEnd.getDate() + 1);
  submissionEnd.setHours(0, 0, 0, 0);
  formData.value.order_time_start = submissionStart.getTime() / 1000;
  formData.value.order_time_end = submissionEnd.getTime() / 1000;
  await withdrawal.dispatchManualAddList(formData.value);
};

const initSubmissionTime = () => {
  orderTime.value = ['', ''];
  let orderTimeStart = new Date();
  let orderTimeEnd = new Date();
  orderTimeStart.setDate(orderTimeStart.getDate() - 7);
  orderTimeEnd.setDate(orderTimeEnd.getDate() + 1);
  orderTime.value[0] = new Date(orderTimeStart).toISOString().split('T')[0];
  orderTime.value[1] = new Date(orderTimeEnd).toISOString().split('T')[0];
}

onMounted(() => {
  initSubmissionTime();
  handleQuery();
});

const getData = async () => {
  //let res = await getManualPaymentList(user.token, formData.value);
  //manualPaymentList.value = res.data.data;
};

const addManualPaymentDialog = () => {
  manualPaymentItem.value = {
      nick_name: "",
      user_account: "",
      order_amount: "",
      change_type: 1,
      code_ratio: "",
      operator: "",
      invitation_code: "",
      user_type: "",
      submission_time: "",
      remark: "",
      amount_type: 'MXN',
      user_id: "",
      amount: "",
      bet_rate: "",
      order_time: "",
      operator_id: "",
      notes: "",
      id: ""
  };
  manualDialogVisible.value = true;
  manualDialogTitle.value = "添加订单";
  submitBtnText.value = "确认";
  closeBtnText.value = "取消";
};

const detailManualPaymentDialog = (item: GetManualPayment) => {
  manualPaymentItem.value = item;
  manualPaymentDetailDialogVisible.value = true;
};

const closeDialog = () => {
  manualDialogVisible.value = false;
  manualPaymentDetailDialogVisible.value = false;
};

// 新增提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let params = {
        id: manualPaymentItem.value.id,
        amount: manualPaymentItem.value.amount,
        amount_type: manualPaymentItem.value.amount_type + '',
        change_type: manualPaymentItem.value.change_type,
        bet_rate: manualPaymentItem.value.bet_rate,
        notes: manualPaymentItem.value.notes
      }
      await withdrawal.dispatchManualAddCreate(params);
      manualDialogVisible.value = false;
      handleQuery();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  manualDialogVisible.value = false;
};

const number_formatter = (value: string) =>
  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const number_parser = (value: string) => value.replace(/\$\s?|(,*)/g, "");
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search">
          <el-form
            ref="formDataRef"
            :model="formData"
            :inline="true"
            label-width="120"
            style="display: flex; justify-content: space-between"
          >
            <div>
              <el-form-item label="用户账户" prop="id">
                <el-input v-model="formData.id" placeholder="请输入用户账户" />
              </el-form-item>
              <el-form-item label="订单提交时间" prop="orderTime">
                <el-date-picker
                  range-separator="到"
                  v-model="orderTime"
                  type="daterange"
                  start-placeholder="订单提交时间"
                  end-placeholder="订单提交时间"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
              <!-- <el-form-item label="客户昵称" prop="nick_name">
                <el-input v-model="formData.nick_name" placeholder="请输入客户昵称" />
              </el-form-item>
              <el-form-item label="邀请码" prop="invitation_code">
                <el-input v-model="formData.invitation_code" placeholder="请输入邀请码" />
              </el-form-item> -->
            </div>
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="handleQuery"
                >搜索</el-button
              >
              <el-button :icon="Plus" @click="addManualPaymentDialog">添加订单</el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-card>
          <el-table v-loading="loading" :data="manualPaymentList" style="width: 100%">
            <!-- <el-table-column label="用户昵称" align="center" prop="nick_name">
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                  @click="router.push({ name: 'User Detail' })"
                  >{{ scope.row.nick_name }}</el-link
                >
              </template>
            </el-table-column> -->
            <el-table-column label="用户账号" align="center" prop="user_id">
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                  @click="router.push({ name: 'UserDetail', params: { id: scope.row.id } })"
                  >{{ scope.row.user_id }}</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="订单金额" align="center" prop="amount">
              <template #default="scope">
                <p>${{ scope.row.amount }}</p>
              </template>
            </el-table-column>
            <el-table-column label="货币类型" align="center" prop="amount_type">
              <template #default="scope">
                <p>{{ scope.row.amount_type }}</p>
              </template>
            </el-table-column>
            <el-table-column label="变动类型" align="center" prop="change_type">
              <template #default="scope">
                <p>{{ changeTypeText(scope.row.change_type) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="打码倍率" align="center" prop="bet_rate">
              <template #default="scope">
                <p>{{ scope.row.bet_rate }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作人员" align="center" prop="operator_id">
              <template #default="scope">
                <p>{{ scope.row.operator_id }}</p>
              </template>
            </el-table-column>
            <el-table-column label="订单提交时间" align="center" prop="order_time">
              <template #default="scope">
                <p>{{ formatDate(scope.row.order_time )}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" width="120">
              <template #default="scope">
                <el-button
                  type="danger"
                  link
                  @click="detailManualPaymentDialog(scope.row)"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="float: right">
            <pagination
              v-if="total > 0"
              :total="total"
              v-model:page="formData.page_num"
              v-model:limit="formData.page_size"
              @pagination="handleQuery"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="manualDialogTitle"
      v-model="manualDialogVisible"
      width="600px"
      append-to-body
      @close="closeDialog"
    >
      <el-form
        label-width="auto"
        ref="ruleFormRef"
        :rules="rules"
        :model="manualPaymentItem"
        class="manual-payment-form"
      >
        <el-form-item label="用户账号:" prop="id">
          <el-input v-model="manualPaymentItem.id" />
        </el-form-item>
        <el-form-item label="打款金额:" prop="amount">
          <el-input
            v-model="manualPaymentItem.amount"
            :formatter="number_formatter"
            :parser="number_parser"
          />
        </el-form-item>
        <el-form-item label="打款类型:" prop="change_type">
          <el-select v-model="manualPaymentItem.change_type">
            <el-option
              v-for="(item, index) in changeTypeOptions"
              :label="item.value"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货币类型:" prop="amount_type">
          <el-select v-model="manualPaymentItem.amount_type">
            <el-option
              v-for="(item, index) in amountTypeOption"
              :label="item.value"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打码倍率:" prop="bet_rate">
          <el-input v-model="manualPaymentItem.bet_rate" />
        </el-form-item>
        <!-- <el-row style="align-items: center">
          <Font color="red" style="font-size: 20px">*</Font>
          <h3>备注</h3>
        </el-row> -->
        <el-form-item label="备注:" prop="notes" class="remark-form">
          <el-input type="textarea" :rows="6" v-model="manualPaymentItem.notes" />
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
      title="人工入款详情"
      v-model="manualPaymentDetailDialogVisible"
      width="600px"
      append-to-body
      @close="closeDialog"
    >
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">用户账号:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ manualPaymentItem.user_id }}</span>
          <el-button type="primary" link style="margin-left: auto" @click="copyText(manualPaymentItem.user_id)">复制</el-button>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="6" class="detail-item-left-bg">用户名:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <el-input v-model="manualPaymentItem.nick_name"></el-input>
          <el-button type="primary" link style="margin-left: auto">复制</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">邀请码:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <el-input v-model="manualPaymentItem.invitation_code" />
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">用户类型:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ manualPaymentItem.user_type }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">货币类型:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ manualPaymentItem.amount_type }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">打款金额:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ manualPaymentItem.amount }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">打款类型:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ changeTypeText(manualPaymentItem.change_type) }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">打码倍率:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ manualPaymentItem.bet_rate }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">打款时间:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          {{ formatDate(manualPaymentItem.order_time) }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">操作人员:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ manualPaymentItem.operator_id }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="detail-item-left-bg">备注:</el-col>
        <el-col :span="18" class="detail-item-right-bg">
          <span>{{ manualPaymentItem.notes }}</span>
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
  padding: 0px 0px;
  height: 36px;
  padding-left: 10px !important;
}

.remark-form {
  .el-form-item__content {
    margin-left: 0px !important;
  }
}
.manual-payment-form .el-select {
  width: 100%;
}
.app-container .el-form-item__label {
  font-weight: 700;
}
</style>
