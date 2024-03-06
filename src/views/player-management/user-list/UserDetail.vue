<script setup lang="ts">
import { ref } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const customerItem = ref<any>({
  id: "8e8fd8fsdfd8fe8f8df8ef",
  customer_account: "test77@gmail.com",
  customer_name: "UserName10001",
  customer_type: "一般用户",
  kol_user: 0,
  vip_level: "LV0",
  account_status: 0,
  prohibited_withdrawal: 0,
  frozen_state: 0,
  label: "用户备注",
  register_ip: "168.191.1.1",
  register_time: "2023-06-30 19:30:30",
  login_time: "2023-06-30 19:30:30",
  invitation_code: "QweRdtd",
});

const accountInformation = ref<any>({
  accountBalance: 9.99,
  withdrawableAmount: 9.99,
  rechargeRate: 10.99,
  differenceRate: 10.99,
  totalRecharge: 9999,
  totalWithdrawals: 999,
  withdrawalDifference: 9999,
  totalBetAmount: 9999,
  totalWiningAmount: 9999,
  freeRemainingAmount: 9999,
  rechargePrincipalAmount: 9999,
  rehargeTimes: 9999,
  withdrawalTimes: 9999,
  operatedGameNumbers: 9999,
  totalGameNumbers: 9999,
  activityBonus: 9999,
});

const agentInformation = ref<any>({
  superiorAgent: "test3455@gmail.com",
  totalAgentNumbers: 88,
  totalRechargeAmount: 9999,
  totalWithdrawalAmount: 9999,
  depositAndWithdrawalAmount: 9999,
  totalBettingAmount: 9999,
});

const withdrawalInformation = ref<any>({
  phoneNumber: "+86 1111 1111 1111",
  cpf: "",
  pix: "",
});

const typeOptions = ref([
  {
    label: "否",
    value: 0,
  },
  {
    label: "是",
    value: 1,
  },
]);

const accountTypeOptions = ref([
  {
    label: "正常",
    value: 0,
  },
  {
    label: "异常",
    value: 1,
  },
]);

const customerDialogVisible = ref<boolean>(false);

const showCustomerDialog = () => {
  customerDialogVisible.value = true;
};

const goBack = () => {
  router.go(-1);
};

const closeDialog = () => {
  customerDialogVisible.value = false;
};

const goBettingRecordPage = () => {
  router.push({ name: "Betting Record" });
};

const goWinningRecordPage = () => {
  router.push({ name: "Winning Record" });
};

const goRechargeRecordPage = () => {
  router.push({ name: "Recharge Record" });
};

const goWithdrawalRecordPage = () => {
  router.push({ name: "Withdrawal Record" });
};

const goActivityRecord = () => {
  router.push({ name: "Activity Record" });
};

const goFundingDetails = () => {
  router.push({ name: "Funding Details" });
};

const goAgentDetails = () => {
  router.push({ name: "Agent Details" });
};
const submitForm = () => {};
</script>

<template>
  <div class="app-container">
    <div class="user-detail-header">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
      <el-button type="primary" style="margin-left: auto" @click="showCustomerDialog"
        >修改信息</el-button
      >
    </div>
    <el-card>
      <el-form>
        <el-row>
          <h3>个人信息:</h3>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">客户ID：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.id }}</p>
            <el-button type="primary" link style="margin-left: auto">复制</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">用户账号：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.customer_account }}</p>
            <el-button type="primary" link style="margin-left: auto">复制</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">用户名：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.customer_name }}</p>
            <el-button type="primary" link style="margin-left: auto">复制</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">客户类型：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <el-button type="success" plain>{{ customerItem.customer_type }}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">KOL用户：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <el-button type="success" plain>否</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">标签：</el-col>
          <el-col :span="18" class="detail-item-right-bg"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">VIP等级：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.vip_level }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">账号状态：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <el-button type="success" plain>正常</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">冻结状态：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <el-button type="success" plain>否</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">是否禁止提现：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <el-button type="success" plain>否</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">注册IP：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.register_ip }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">注册时间：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.register_time }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">最后登录时间：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.login_time }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">渠道：</el-col>
          <el-col :span="18" class="detail-item-right-bg"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">邀请码：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ customerItem.invitation_code }}</p>
            <el-button type="primary" link style="margin-left: auto">复制</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-form>
        <el-row>
          <h3>账户信息:</h3>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">账户余额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>$ {{ accountInformation.accountBalance }}</p>
            <el-button
              type="danger"
              link
              style="margin-left: auto"
              @click="goFundingDetails"
              >详情</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">可提现金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>$ {{ accountInformation.withdrawableAmount }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">投注充值比率（%）：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.rechargeRate }} %</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">充提差比率：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.differenceRate }} %</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">总充值：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.totalRecharge }}</p>
            <el-button
              type="danger"
              link
              style="margin-left: auto"
              @click="goRechargeRecordPage"
              >详情</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">总提现：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.totalWithdrawals }}</p>
            <el-button
              type="danger"
              link
              style="margin-left: auto"
              @click="goWithdrawalRecordPage"
              >详情</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">充提差：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.withdrawalDifference }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">总下注金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.totalBetAmount }}</p>
            <el-button
              type="danger"
              link
              style="margin-left: auto"
              @click="goBettingRecordPage"
              >详情</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">总中奖金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.totalWiningAmount }}</p>
            <el-button
              type="danger"
              link
              style="margin-left: auto"
              @click="goWinningRecordPage"
              >详情</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">免手续费剩余金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.freeRemainingAmount }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">充值本金金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.rechargePrincipalAmount }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">充值次数：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.rehargeTimes }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">提现次数：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.withdrawalTimes }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">自营游戏次数：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.operatedGameNumbers }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">游戏总次数：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.totalGameNumbers }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">活动奖金：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ accountInformation.activityBonus }}</p>
            <el-button
              type="danger"
              link
              style="margin-left: auto"
              @click="goActivityRecord"
              >详情</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-form>
        <el-row>
          <h3>代理信息:</h3>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">上级代理：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>$ {{ agentInformation.superiorAgent }}</p>
            <el-button
              type="danger"
              link
              style="margin-left: auto"
              @click="goAgentDetails"
              >详情</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">代理总人数：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ agentInformation.totalAgentNumbers }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">代理总充值金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>$ {{ agentInformation.totalRechargeAmount }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">代理总提现金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>$ {{ agentInformation.totalWithdrawalAmount }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">代理充提差金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>$ {{ agentInformation.depositAndWithdrawalAmount }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">代理总投注金额：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>$ {{ agentInformation.totalBettingAmount }}</p>
          </el-col>
        </el-row>
      </el-form>
      <el-form>
        <el-row>
          <h3>提款信息:</h3>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">手机号：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ withdrawalInformation.phoneNumber }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">CPF：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ withdrawalInformation.cpf }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="detail-item-left-bg">PIX：</el-col>
          <el-col :span="18" class="detail-item-right-bg">
            <p>{{ withdrawalInformation.pix }}</p>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 用户信息修改 -->
    <el-dialog
      title="用户信息修改"
      v-model="customerDialogVisible"
      width="600px"
      append-to-body
      @close="closeDialog"
    >
      <el-form ref="dataFormRef" label-width="140px">
        <el-form-item label="客户ID:">
          <el-input v-model="customerItem.id" />
        </el-form-item>
        <el-form-item label="用户账号:">
          <el-input v-model="customerItem.customer_account" />
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input v-model="customerItem.customer_name" />
        </el-form-item>
        <el-form-item label="客户类型:">
          <el-select v-model="customerItem.customer_type">
            <el-option label="一般用户" value="一般用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="KOL用户:">
          <el-select v-model="customerItem.kol_user">
            <el-option
              v-for="(item, index) in typeOptions"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签:">
          <el-select v-model="customerItem.label">
            <el-option label="用户备注" value="用户备注"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态:">
          <el-select v-model="customerItem.account_status">
            <el-option
              v-for="(item, index) in accountTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="冻结状态:">
          <el-select v-model="customerItem.frozen_state">
            <el-option
              v-for="(item, index) in typeOptions"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否禁止提现:">
          <el-select v-model="customerItem.prohibited_withdrawal">
            <el-option
              v-for="(item, index) in typeOptions"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="withdrawalInformation.phoneNumber" />
        </el-form-item>
        <el-form-item label="CPF:">
          <el-input v-model="withdrawalInformation.cpf" />
        </el-form-item>
        <el-form-item label="PIX:">
          <el-input v-model="withdrawalInformation.pix" />
        </el-form-item>
      </el-form>
      <el-form>
        <el-row style="align-items: center">
          <Font color="red" style="font-size: 20px">*</Font>
          <h3>修改原因:</h3>
        </el-row>
        <el-input type="textarea" :rows="6" />
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">保存修改</el-button>
          <el-button @click="closeDialog">取消修改</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
  padding: 20px;
  display: flex;
  align-items: center;
}

.detail-item-left-bg {
  background-color: #d5cfcf;
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
</style>
