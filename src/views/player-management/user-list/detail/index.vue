<script setup lang="ts">
import { ref, onMounted, computed, onUpdated } from "vue";
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import useStore from "@/store";
import { useRoute } from "vue-router";
import { nextTick } from "vue";
import { ElInput, ElMessage } from "element-plus";
import moment from "moment-timezone";

const route = useRoute();
const { player } = useStore();
const router = useRouter();

const activeButton = ref<number>(0);
const activeNames = ref(["1", "4"]);
const subActiveNames = ref(["1", "2", "3", "4"]);
const vipBonusHeight = ref(0);
const vipBonusShow = ref<boolean>(false);

const basicInformation = computed(() => {
  return player.getBasicDetail;
});

const depositAndWithdrawalData = computed(() => {
  return player.getDepositWithrawDetail;
});

// 账户信息
const userAccountData = computed(() => {
  return player.getUserAccountList;
});

const agentInformation = ref({
  all_subordinates: 999,
  belong_to_superior: "aaaaaaaaaa",
  agent_type: "KOL",
  rating: "A",
  recharge_amount_of_sum: 99999,
  subordinate_withdrawal_sum: 999999,
  total_profit_and_loss: 10000,
  recharger_number: 1000,
  subordinate_total_betting_amount: 100000,
  betting_rebate_amount: 10000,
  agent_direct_rewards: 10000,
  agent_achievement_rewards: 10000,
  agent_task_rewards: 10000,
  yesterday_rebate_amount: 10000,
  last_withdrawal_days_number: "5天3小时",
  last_invite_days_number: "3天2小时",
  first_level_registration_number: 1000,
  second_level_registration_number: 1000,
  third_level_registration_number: 1000,
  first_level_recharge_number: 10000,
  second_level_recharge_number: 10000,
  third_level_recharge_number: 10000,
  first_level_recharge_amount: 10000,
  second_level_recharge_amount: 10000,
  third_level_recharge_amount: 10000,
  first_level_withdrawal_amount: 10000,
  second_level_withdrawal_amount: 10000,
  third_level_withdrawal_amount: 10000,
  first_level_charge_withdrawal_difference: 10000,
  second_level_charge_withdrawal_difference: 10000,
  third_level_charge_withdrawal_difference: 10000,
  first_level_betting_rebate: 10000,
  second_level_betting_rebate: 10000,
  third_level_betting_rebate: 10000,
});

const WithdrawalDetailData = computed(() => {
  return player.getWithdrawalDetailData;
});

const loading = ref<boolean>(false);

const goBack = () => {
  router.go(-1);
};

const handleChange = () => {};

const handleButtonActive = (index: number, name: string) => {
  activeButton.value = index;
  router.push({ name: name });
};

const moreVipBonusShow = () => {
  vipBonusShow.value = !vipBonusShow.value;
  vipBonusHeight.value = vipBonusShow.value ? 150 : 0;
};

onMounted(async () => {
  await player.dispatchPlayerBasicDetail({ id: route.params.id });
  await player.dispatchDepositWithrawDetailData({
    user_id: route.params.id,
  });
  await player.dispatchWithdrawalDetailData({
    id: route.params.id,
  });
  await player.dispatchUserAccountList({ id: route.params.id });
});

onUpdated(async () => {
  await player.dispatchPlayerBasicDetail({ id: route.params.id });
  await player.dispatchDepositWithrawDetailData({
    user_id: route.params.id,
  });
  await player.dispatchWithdrawalDetailData({
    id: route.params.id,
  });
});
const inputPhoneTagValue = ref("");
const inputPhoneTagVisible = ref(false);
const inputPhoneTagRef = ref<InstanceType<typeof ElInput>>();

const showPhoneInput = () => {
  inputPhoneTagVisible.value = true;
  nextTick(() => {
    inputPhoneTagRef.value!.input!.focus();
  });
};

const handlePhoneInputConfirm = async () => {
  if (inputPhoneTagValue.value) {
    await player.dispatchUpdatePhoneNumber({
      id: route.params.id,
      phone: inputPhoneTagValue.value,
    });
    await player.dispatchPlayerBasicDetail({ id: route.params.id });
  }
  inputPhoneTagVisible.value = false;
  inputPhoneTagValue.value = "";
};

const inputUserMarkValue = ref("");
const inputUserMarkVisible = ref(false);
const inputUserMarkRef = ref<InstanceType<typeof ElInput>>();
const BankData = ref<any>({
  user_id: route.params.id,
  bank_id: "",
  email: "",
  phone: "",
  bank_number: "",
  id_number: "",
});

const showUserMarkInput = () => {
  inputUserMarkVisible.value = true;
  nextTick(() => {
    inputUserMarkRef.value!.input!.focus();
  });
};
const goCustomerDetailPage = async (id: string) => {
  if (id !== "0") router.push({ name: "UserDetail", params: { id: id } });
};
const handleUserMarkInputConfirm = async () => {
  if (inputUserMarkValue.value) {
    await player.dispatchUpdateMark({
      id: route.params.id,
      mark: inputUserMarkValue.value,
    });
    await player.dispatchPlayerBasicDetail({ id: route.params.id });
  }
  inputUserMarkVisible.value = false;
  inputUserMarkValue.value = "";
};

const handleNoteInputConfirm = async () => {
  let id: any = route.params.id;
  if (basicInformation.value.notes) {
    await player.dispatchUpdateNote({
      id: route.params.id,
      notes: basicInformation.value.notes,
    });
    await player.dispatchPlayerBasicDetail({ id: route.params.id });
  }
};
const copyText = (str: any) => {
  navigator.clipboard.writeText(str);
  ElMessage.success("复制成功");
};

const inputMailTagValue = ref("");
const inputMailTagVisible = ref(false);
const inputMailTagRef = ref<InstanceType<typeof ElInput>>();

const showMailInput = () => {
  inputMailTagVisible.value = true;
  nextTick(() => {
    inputMailTagRef.value!.input!.focus();
  });
};

const handleMailInputConfirm = async () => {
  if (inputMailTagValue.value) {
    await player.dispatchUpdateMail({
      id: route.params.id,
      email: inputMailTagValue.value,
    });
    await player.dispatchPlayerBasicDetail({ id: route.params.id });
  }
  inputMailTagVisible.value = false;
  inputMailTagValue.value = "";
};
const handleEditBankData = (row: any) => {
  BankData.value = row;
  if (row.rfc) {
    BankData.value.id_number = row.rfc;
    delete BankData.value.rfc;
  }
  if (row.cpf) {
    BankData.value.id_number = row.cpf;
    delete BankData.value.cpf;
  }
  BankData.value.user_id = route.params.id;
};
const handleSaveBankData = async () => {
  await player.dispatchUpdatebankData(BankData.value);
  BankData.value.bank_id = "";
  await player.dispatchWithdrawalDetailData({
    id: route.params.id,
  });
};
const handleDeleteBanKData = async (row: any) => {
  loading.value = true;
  await player.dispatchDeletebankData({
    user_id: route.params.id,
    bank_id: row.bank_id,
  });
  await player.dispatchWithdrawalDetailData({
    id: route.params.id,
  });
  loading.value = false;
};

const addblackList = async () => {
  if (basicInformation.value.account_prohibit === 1)
    await player.dispatchAddBlackList({
      id: route.params.id,
      account_prohibit: 2,
    });
  else
    await player.dispatchAddBlackList({
      id: route.params.id,
      account_prohibit: 1,
    });
  await player.dispatchPlayerBasicDetail({ id: route.params.id });
};

const suspenseWithdraw = async () => {
  if (basicInformation.value.account_withdrawal_prohibit === 1)
    await player.dispatchProhibitWithdrawal({
      id: route.params.id,
      account_withdrawal_prohibit: 2,
    });
  else
    await player.dispatchProhibitWithdrawal({
      id: route.params.id,
      account_withdrawal_prohibit: 1,
    });
  await player.dispatchPlayerBasicDetail({ id: route.params.id });
};
</script>

<template>
  <div class="app-container">
    <div class="user-detail-header">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
      <div style="margin-left: auto">
        <el-button
          :type="activeButton == 0 ? 'warning' : ''"
          @click="handleButtonActive(0, 'UserDetail')"
          >用户详情</el-button
        >
        <el-button
          :type="activeButton == 1 ? 'warning' : ''"
          @click="handleButtonActive(1, 'FundingDetails')"
          >资金明细</el-button
        >
        <el-button
          :type="activeButton == 2 ? 'warning' : ''"
          @click="handleButtonActive(2, 'AgentRebate')"
          >代理返利</el-button
        >
        <el-button
          :type="activeButton == 3 ? 'warning' : ''"
          @click="handleButtonActive(3, 'PromotionRecord')"
          >推广记录</el-button
        >
        <el-button
          :type="activeButton == 4 ? 'warning' : ''"
          @click="handleButtonActive(4, 'RechargeRecord')"
          >充值记录</el-button
        >
        <el-button
          :type="activeButton == 5 ? 'warning' : ''"
          @click="handleButtonActive(5, 'WithdrawalRecord')"
          >提现记录</el-button
        >
        <el-button
          :type="activeButton == 6 ? 'warning' : ''"
          @click="handleButtonActive(6, 'ManualDeduction')"
          >人工扣款</el-button
        >
        <el-button
          :type="activeButton == 7 ? 'warning' : ''"
          @click="handleButtonActive(7, 'ManualRecharge')"
          >人工充值</el-button
        >
        <el-button
          :type="activeButton == 8 ? 'warning' : ''"
          @click="handleButtonActive(8, 'BettingRecord')"
          >投注记录</el-button
        >
        <el-button
          :type="activeButton == 9 ? 'warning' : ''"
          @click="handleButtonActive(9, 'RegistrationRecord')"
          >登录记录</el-button
        >
      </div>
    </div>
    <el-card>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="基础信息" name="1">
          <template #title>
            <h2>基础信息</h2>
          </template>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="用户ID:">
                  {{ basicInformation.id }}
                  <el-button
                    v-if="basicInformation.id"
                    @click="copyText(basicInformation.id)"
                    link
                  >
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户昵称:">
                {{ basicInformation.nickname }}
                <el-button
                  v-if="basicInformation.nickname"
                  @click="copyText(basicInformation.nickname)"
                  link
                >
                  <el-icon>
                    <CopyDocument />
                  </el-icon>
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户账号:">
                <span v-if="!inputMailTagVisible">{{ basicInformation.uid }}</span>
                <el-input
                  v-if="inputMailTagVisible"
                  ref="inputMailTagRef"
                  v-model="inputMailTagValue"
                  class="w-20"
                  size="large"
                  @keyup.enter="handleMailInputConfirm"
                  @blur="handleMailInputConfirm"
                  style="margin-left: 15px"
                />
                <el-button
                  link
                  type="primary"
                  style="margin-left: 20px"
                  @click="showMailInput"
                  v-if="!inputMailTagVisible"
                >
                  修改
                </el-button>
                <el-button
                  @click="copyText(basicInformation.uid)"
                  link
                  v-if="!inputMailTagVisible && basicInformation.uid"
                >
                  <el-icon>
                    <CopyDocument />
                  </el-icon>
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="归属上级:">
                  <el-link
                    :underline="false"
                    style="color: #5393e0; text-decoration-line: underline"
                    @click="goCustomerDetailPage(basicInformation.sir_user_id)"
                  >
                    {{ basicInformation.sir_user_id }}
                  </el-link>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户邀请码:">
                {{ basicInformation.invitation_code }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:">
                <div v-if="!inputPhoneTagVisible">{{ basicInformation.phone }}</div>
                <el-input
                  v-if="inputPhoneTagVisible"
                  ref="inputPhoneTagRef"
                  v-model="inputPhoneTagValue"
                  class="w-20"
                  size="large"
                  @keyup.enter="handlePhoneInputConfirm"
                  @blur="handlePhoneInputConfirm"
                  style="margin-left: 15px"
                />
                <el-button
                  link
                  type="primary"
                  style="margin-left: 20px"
                  @click="showPhoneInput"
                  v-if="!inputPhoneTagVisible"
                >
                  修改
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="注册时间:">
                  {{
                    moment(basicInformation.created_at * 1000)
                      .clone()
                      .tz("UTC")
                      .format("YYYY-MM-DD HH:mm:ss")
                  }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最后登录时间:">
                {{
                  moment(basicInformation.updated_at * 1000)
                    .clone()
                    .tz("UTC")
                    .format("YYYY-MM-DD HH:mm:ss")
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册IP:">
                {{ basicInformation.register_ip }}
                <el-button link type="success" style="margin-left: 20px">
                  {{ basicInformation.ip_location }}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="用户类型:">
                  {{
                    basicInformation.user_type == 1
                      ? "普通玩家"
                      : basicInformation.user_type == 2
                      ? "测试账号"
                      : basicInformation.user_type == 3
                      ? "推广账号"
                      : "KOL"
                  }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户标记:">
                <div v-if="!inputUserMarkVisible">{{ basicInformation.mark }}</div>
                <el-input
                  v-if="inputUserMarkVisible"
                  ref="inputUserMarkRef"
                  v-model="inputUserMarkValue"
                  class="w-20"
                  size="large"
                  @keyup.enter="handleUserMarkInputConfirm"
                  @blur="handleUserMarkInputConfirm"
                  style="margin-left: 15px"
                />
                <el-button
                  link
                  type="primary"
                  style="margin-left: 20px"
                  @click="showUserMarkInput"
                  v-if="!inputUserMarkVisible"
                >
                  修改
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8"> </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="账号状态:">
                  <font :color="basicInformation.user_status == 0 ? 'red' : 'green'">{{
                    basicInformation.user_status == 0
                      ? "無效參數"
                      : basicInformation.user_status == 1
                      ? "正常用戶"
                      : "流失用戶"
                  }}</font>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提现状态:">
                {{
                  basicInformation.account_withdrawal_prohibit == 1
                    ? "提现正常"
                    : "提现封禁"
                }}
                <el-button
                  @click="suspenseWithdraw"
                  link
                  type="danger"
                  style="margin-left: 20px"
                >
                  <font
                    :color="
                      basicInformation.account_withdrawal_prohibit == 1 ? 'red' : 'green'
                    "
                    >{{
                      basicInformation.account_withdrawal_prohibit == 1
                        ? " 提现封禁"
                        : "提现正常"
                    }}</font
                  >
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="冻结状态:">
                {{ basicInformation.account_prohibit == 1 ? "正常" : "黑名单" }}
                <el-button
                  @click="addblackList"
                  link
                  type="danger"
                  style="margin-left: 20px"
                >
                  <font
                    :color="basicInformation.account_prohibit == 1 ? 'red' : 'green'"
                    >{{
                      basicInformation.account_prohibit == 1 ? " 拉黑" : "解除拉黑"
                    }}</font
                  >
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="24">
              <el-form label-width="200">
                <el-form-item label="运营备注:">
                  <el-input
                    type="textarea"
                    size="large"
                    @keyup.enter="handleNoteInputConfirm"
                    @blur="handleNoteInputConfirm"
                    style="margin-left: 15px"
                    v-model="basicInformation.notes"
                  />
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-collapse-item>

        <el-collapse-item title="账户信息" name="2">
          <template #title>
            <h2>账户信息</h2>
          </template>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="账户余额:">
                  {{ userAccountData.balance }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="可提现金额:">
                {{ userAccountData.desirable_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="冻结余额:">
                {{ userAccountData.frozen_amount }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="本金余额:">
                  {{ userAccountData.principal_amount }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="赠金余额:">
                {{ userAccountData.bonus }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="派奖金额:">
                {{ userAccountData.prize_amount }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="总充值:">
                  {{ userAccountData.total_deposit_amount }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总提款:">
                {{ userAccountData.total_withdraw_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="充提差:">
                {{ userAccountData.diff_dw }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="投注次数:">
                  {{ userAccountData.bet_times }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投注盈亏:">
                {{ userAccountData.bet_pl }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动赠金:">
                {{ userAccountData.activity_bonus }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="投注金额:">
                  {{ userAccountData.bet_amount }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="人工充值金额:">
                {{ userAccountData.manual_deposit_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="人工扣款金额:">
                {{ userAccountData.manual_deduct_amount }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="VIP等级:">
                  {{ userAccountData.vip_level }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="VIP打码返利:">
                {{ userAccountData.vip_bet_award }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="VIP升级奖励总计:">
                {{ userAccountData.vip_level_up_award }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="VIP存款进度:">
                  {{ userAccountData.vip_deposit_exp }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="VIP投注进度:">
                {{ userAccountData.vip_bet_exp }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="VIP提现免手续费额度:">
                {{ userAccountData.vip_free_withdrawal_amount }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="VIP总赠金总计:">
                  {{ userAccountData.vip_total_reward?.total_reward }}
                  <el-button link @click="moreVipBonusShow">
                    <el-icon>
                      <ArrowRight v-if="!vipBonusShow" />
                      <ArrowDown v-else />
                    </el-icon>
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8"> </el-col>
            <el-col :span="8"> </el-col>
          </el-row>
          <div :class="vipBonusShow ? 'vip-bonus-show' : 'vip-bonus-collapse'">
            <el-row :gutter="20" style="justify-content: center">
              <el-col :span="8">
                <el-form label-width="200">
                  <el-form-item label="VIP周奖励总计:">
                    {{ userAccountData.vip_total_reward?.week_reward }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8">
                <el-form-item label="VIP月奖励总计:">
                  {{ userAccountData.vip_total_reward?.month_reward }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="VIP会员日奖励总计:">
                  {{ userAccountData.vip_total_reward?.day_reward }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="justify-content: center">
              <el-col :span="8">
                <el-form label-width="200">
                  <el-form-item label="VIP签到奖励总计:">
                    {{ userAccountData.vip_total_reward?.sign_reward }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8">
                <el-form-item label="VIP转盘奖励总计:">
                  {{ userAccountData.vip_total_reward?.spin_reward }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="VIP任务奖励总计:">
                  {{ userAccountData.vip_total_reward?.task_reward }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="justify-content: center">
              <el-col :span="8">
                <el-form label-width="200">
                  <el-form-item label="充值返利:">
                    {{ userAccountData.vip_total_reward?.deposit_reward }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8">
                <el-form-item label="VIP活动赠金:">
                  {{ userAccountData.vip_total_reward?.activity_reward }}
                </el-form-item>
              </el-col>
              <el-col :span="8"> </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="代理信息" name="3">
          <template #title>
            <h2>代理信息</h2>
          </template>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="所有下级人数:">
                  {{ agentInformation.all_subordinates }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="归属上级:">
                <el-link
                  :underline="false"
                  style="color: #3afefe; text-decoration-line: underline"
                  @click="router.push({ name: 'UserDetail' })"
                >
                  {{ agentInformation.belong_to_superior }}
                </el-link>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理类型:">
                {{ agentInformation.agent_type }}
                <Font color="red" style="margin-left: 20px"
                  >评级: {{ agentInformation.rating }}</Font
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="代理充值金额总和:">
                  {{ agentInformation.recharge_amount_of_sum }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下级提现总和:">
                {{ agentInformation.subordinate_withdrawal_sum }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理总盈亏:">
                {{ agentInformation.total_profit_and_loss }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="充值人数总和:">
                  {{ agentInformation.recharger_number }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下级投注总金额:">
                {{ agentInformation.subordinate_total_betting_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投注返利总金额:">
                {{ agentInformation.betting_rebate_amount }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="代理直接奖励:">
                  {{ agentInformation.agent_direct_rewards }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理成就奖励:">
                {{ agentInformation.agent_achievement_rewards }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理任务奖励:">
                {{ agentInformation.agent_task_rewards }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="昨日返佣金额:">
                  {{ agentInformation.yesterday_rebate_amount }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理最后取款间隔天数:">
                {{ agentInformation.last_withdrawal_days_number }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理最后邀请间隔天数:">
                {{ agentInformation.last_invite_days_number }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="一级代理注册人数:">
                  {{ agentInformation.first_level_registration_number }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级代理注册人数:">
                {{ agentInformation.second_level_registration_number }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三级代理注册人数:">
                {{ agentInformation.third_level_registration_number }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="一级代理充值人数:">
                  {{ agentInformation.first_level_recharge_number }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级代理充值人数:">
                {{ agentInformation.second_level_recharge_number }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三级代理充值人数:">
                {{ agentInformation.third_level_recharge_number }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="一级代理充值金额:">
                  {{ agentInformation.first_level_recharge_amount }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级代理充值金额:">
                {{ agentInformation.second_level_recharge_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三级代理充值金额:">
                {{ agentInformation.third_level_recharge_amount }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="一级代理提现金额:">
                  {{ agentInformation.first_level_withdrawal_amount }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级代理提现金额:">
                {{ agentInformation.second_level_withdrawal_amount }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三级代理提现金额:">
                {{ agentInformation.third_level_withdrawal_amount }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="一级代理充提差:">
                  {{ agentInformation.first_level_charge_withdrawal_difference }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级代理充提差:">
                {{ agentInformation.second_level_charge_withdrawal_difference }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三级代理充提差:">
                {{ agentInformation.third_level_charge_withdrawal_difference }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="8">
              <el-form label-width="200">
                <el-form-item label="一级代理投注返佣:">
                  {{ agentInformation.first_level_betting_rebate }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form-item label="二级代理投注返佣:">
                {{ agentInformation.second_level_betting_rebate }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="三级代理投注返佣:">
                {{ agentInformation.third_level_betting_rebate }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="提款信息" name="4">
          <template #title>
            <h2>提款信息</h2>
          </template>
          <div style="width: 90%; margin: auto">
            <el-collapse v-model="subActiveNames">
              <el-collapse-item title="PIX" name="1">
                <template #title>
                  <h3>PIX</h3>
                </template>
                <el-table
                  v-loading="loading"
                  :data="WithdrawalDetailData.pix_list"
                  style="width: 100%"
                >
                  <el-table-column label="收款人" align="center" prop="username">
                    <template #default="scope">
                      <p>{{ scope.row.username }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="邮箱" align="center" prop="email">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.email }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.email" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="手机号" align="center" prop="phone">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.phone }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.phone" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="银行卡号" align="center" prop="bank_number">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.bank_number }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.bank_number" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="CPF" align="center" prop="cpf">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.cpf }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.id_number" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="160" fixed="right">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <el-button
                          type="primary"
                          @click="handleEditBankData(scope.row)"
                          link
                          >修改</el-button
                        >
                        <el-button
                          type="danger"
                          @click="handleDeleteBanKData(scope.row)"
                          link
                          >删除</el-button
                        >
                      </template>
                      <template v-else>
                        <el-button type="primary" @click="handleSaveBankData" link
                          >保存</el-button
                        >
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="SPEI" name="2">
                <template #title>
                  <h3>SPEI</h3>
                </template>
                <el-table
                  v-loading="loading"
                  :data="WithdrawalDetailData.spei_list"
                  style="width: 100%"
                >
                  <el-table-column label="收款人" align="center" prop="username">
                    <template #default="scope">
                      <p>{{ scope.row.username }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="邮箱" align="center" prop="email">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.email }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.email" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="手机号" align="center" prop="phone">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.phone }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.phone" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="银行卡号" align="center" prop="bank_number">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.bank_number }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.bank_number" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="RFC" align="center" prop="rfc">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.rfc }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.id_number" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="160" fixed="right">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <el-button
                          type="primary"
                          @click="handleEditBankData(scope.row)"
                          link
                          >修改</el-button
                        >
                        <el-button
                          type="danger"
                          @click="handleDeleteBanKData(scope.row)"
                          link
                          >删除</el-button
                        >
                      </template>
                      <template v-else>
                        <el-button type="primary" @click="handleSaveBankData" link
                          >保存</el-button
                        >
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="Paypal" name="3">
                <template #title>
                  <h3>Paypal</h3>
                </template>
                <el-table
                  v-loading="loading"
                  :data="WithdrawalDetailData.paypal_list"
                  style="width: 100%"
                >
                  <el-table-column label="收款人" align="center" prop="username">
                    <template #default="scope">
                      <p>{{ scope.row.username }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="邮箱" align="center" prop="email">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.email }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.email" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="手机号" align="center" prop="phone">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.phone }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.phone" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="PayPal账号" align="center" prop="bank_number">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <p>{{ scope.row.bank_number }}</p>
                      </template>
                      <template v-else>
                        <el-input v-model="BankData.bank_number" clearable />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="160" fixed="right">
                    <template #default="scope">
                      <template v-if="scope.row.bank_id !== BankData.bank_id">
                        <el-button
                          type="primary"
                          @click="handleEditBankData(scope.row)"
                          link
                          >修改</el-button
                        >
                        <el-button
                          type="danger"
                          @click="handleDeleteBanKData(scope.row)"
                          link
                          >删除</el-button
                        >
                      </template>
                      <template v-else>
                        <el-button type="primary" @click="handleSaveBankData" link
                          >保存</el-button
                        >
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
  padding: 20px;
  display: flex;
  align-items: center;
}

:deep(.el-form-item__label) {
  font-size: 16px !important;
  font-weight: bold !important;
}

:deep(.el-table thead th.el-table__cell) {
  background: #f5f7fa;
  height: 60px;
}

.vip-bonus-collapse {
  // transition: height 0.3s ease-out;
  display: none;
}

.vip-bonus-show {
  // transition: height 0.3s ease-out;
  display: block;
}
</style>
