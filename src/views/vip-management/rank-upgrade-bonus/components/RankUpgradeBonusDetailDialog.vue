<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VIPRankUpgradeBonusDetailData } from "@/interface/vip";

const is_show_dialog = ref(false);
const dialog_title = ref("");
const dialog_data = ref<VIPRankUpgradeBonusDetailData>({
  id: -1,
  vip_rank: "",
  vip_next_rank: "",
  vip_reward_amount: -1,
  aunt_magnification: -1,

  rebate_mode: "",
  rebate_order_time: "",
  rebate_order_time_amount: -1,
  rebate_fund_time: "",
  rebate_fund_time_amount: -1,
});

const show_detail_dialog = (id: number) => {
  is_show_dialog.value = true;
  dialog_data.value.id = id;
  dialog_title.value = "VIP段位提升奖励";
};

const show_add_dialog = (id: number) => {
  is_show_dialog.value = true;
  dialog_title.value = "新增VIP段位提升奖励";
  dialog_data.value = {
    id: -1,
    vip_rank: "",
    vip_next_rank: "",
    vip_reward_amount: -1,
    aunt_magnification: -1,

    rebate_mode: "",
    rebate_order_time: "",
    rebate_order_time_amount: -1,
    rebate_fund_time: "",
    rebate_fund_time_amount: -1,
  };

  dialog_data.value.id = id;
};

const is_disabled_rebate_fund_time_amount = () => {
  if (dialog_data.value?.rebate_fund_time == "释放") return false;
  return true;
};

const is_rebate_order_order_time_amount_disabled = () => {
  if (dialog_data.value?.rebate_order_time == "天后刷新结算") return false;
  return true;
};

const vip_ranks = ref<Array<string>>([
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
]);

defineExpose({
  show_detail_dialog,
  show_add_dialog,
});
</script>
<template>
  <el-dialog v-model="is_show_dialog" :title="dialog_title">
    <div>
      <div v-if="dialog_title === '新增VIP段位提升奖励'" class="dl_row">
        <p style="width: 20%">ID</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
          <el-input disabled v-model="dialog_data.id" style="width: 40%"></el-input>
        </div>
      </div>
      <div class="dl_row">
        <p style="width: 20%">VIP段位</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
          <el-select
            v-model="dialog_data.vip_rank"
            placeholder="请选择VIP段位"
            style="width: 40%"
          >
            <el-option v-for="item in vip_ranks" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="dl_row">
        <p style="width: 20%">VIP提升后段位</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
          <el-select
            v-model="dialog_data.vip_next_rank"
            placeholder="请选择提升后的段位"
            style="width: 40%"
          >
            <el-option v-for="item in vip_ranks" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="dl_row">
        <p style="width: 20%">段位提升后获得的奖金</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
          <el-input
            v-model="dialog_data.vip_reward_amount"
            style="width: 40%"
            :value="
              dialog_data.vip_reward_amount == -1 ? '' : dialog_data.vip_reward_amount
            "
            placeholder="请输入奖金金额"
          ></el-input>
        </div>
      </div>
      <div class="dl_row">
        <p style="width: 20%">大妈倍率</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
          <el-input
            v-model="dialog_data.aunt_magnification"
            style="width: 40%"
            :value="
              dialog_data.aunt_magnification == -1 ? '' : dialog_data.aunt_magnification
            "
            placeholder="请输入打码倍率"
          ></el-input>
        </div>
      </div>
      <!--here--->

      <div class="dl_row">
        <p style="width: 20%">返利领取方式</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
          <el-radio-group v-model="dialog_data.rebate_mode" class="ml-4">
            <el-radio label="不释放" size="large">玩家手动领取</el-radio>
            <el-radio label="释放" size="large">结算时自动到账</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="dl_row" style="order: 10; height: 80px">
        <p style="width: 20%">返利结算周期</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px">
          <el-radio-group v-model="dialog_data.rebate_order_time" class="ml-4">
            <el-radio label="实时结算" size="large">实时结算</el-radio>
            <el-radio label="每日刷新结算" size="large">每日刷新结算</el-radio>
            <el-radio label="每周刷新结算" size="large">每周刷新结算</el-radio>
            <el-radio label="每月刷新结算" size="large">每月刷新结算</el-radio>
            <el-radio label="天后刷新结算" size="large"
              ><el-input
                v-model="dialog_data.rebate_order_time_amount"
                style="width: 80px"
                placeholder="请输入天数"
                :value="
                  dialog_data.rebate_order_time_amount == -1
                    ? ''
                    : dialog_data.rebate_order_time_amount
                "
                :disabled="is_rebate_order_order_time_amount_disabled()"
              />天后刷新结算</el-radio
            >
          </el-radio-group>
        </div>
      </div>
      <div class="dl_row">
        <p style="width: 20%">奖励释放周期</p>
        <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
          <el-radio-group v-model="dialog_data.rebate_fund_time" class="ml-4">
            <el-radio label="不释放" size="large">不释放</el-radio>
            <el-radio label="释放" size="large">释放</el-radio>
          </el-radio-group>
          <div
            style="display: flex; margin-left: 20px; height: 30px; align-items: center"
          >
            <el-input
              style="width: 200px"
              placeholder="请输入自动释放天数"
              v-model="dialog_data.rebate_fund_time_amount"
              :value="
                dialog_data.rebate_fund_time_amount == -1
                  ? ''
                  : dialog_data.rebate_fund_time_amount
              "
              :disabled="is_disabled_rebate_fund_time_amount()"
            />
            <label style="display: block">天后释放</label>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
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
</style>
../../../../interface/vip