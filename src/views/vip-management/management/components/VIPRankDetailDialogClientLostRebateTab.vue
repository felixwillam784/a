<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
interface GetVIPRankData {
  vip_level: number;

  client_lost_rebate_amount: number;
  client_lost_rebate_mode: string;
  client_lost_rebate_order_time: string;
  client_lost_rebate_order_time_amount: string;
  clien_lost_rebate_fund_time: string;
  clien_lost_rebate_fund_time_amount: string;
}

const vipItem = ref<GetVIPRankData>({
  vip_level: -1,
  client_lost_rebate_amount: -1,
  client_lost_rebate_mode: "",
  client_lost_rebate_order_time: "",
  client_lost_rebate_order_time_amount: "",
  clien_lost_rebate_fund_time: "",
  clien_lost_rebate_fund_time_amount: "",
});

const is_disabled_clien_lost_rebate_fund_time_amount = () => {
  if (vipItem.value?.clien_lost_rebate_fund_time == "释放") return false;
  return true;
};

onMounted(() => {
  if (props.vip_level != undefined) vipItem.value.vip_level = props.vip_level;
});

const props = defineProps({
  vip_level: Number,
});

watch(props, () => {
  if (props.vip_level != undefined) vipItem.value.vip_level = props.vip_level;
});
</script>
<template>
  <div>
    <div class="dl_row">
      <p style="width: 20%">客损返利比例</p>
      <div style="display: flex; width: 60%; margin-left: 20px; align-items: center">
        <el-input
          style="height: 30px"
          v-model="vipItem.client_lost_rebate_amount"
          :value="vipItem.client_lost_rebate_amount.toFixed(1)"
        />
        <p>%</p>
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">返利领取方式</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
        <el-radio-group v-model="vipItem.client_lost_rebate_mode" class="ml-4">
          <el-radio label="不释放" size="large">玩家手动领取</el-radio>
          <el-radio label="释放" size="large">结算时自动到账</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="dl_row" style="order: 10; height: 80px">
      <p style="width: 20%">返利结算周期</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="vipItem.client_lost_rebate_order_time" class="ml-4">
          <el-radio label="实时结算" size="large">实时结算</el-radio>
          <el-radio label="每日刷新结算" size="large">每日刷新结算</el-radio>
          <el-radio label="每周刷新结算" size="large">每周刷新结算</el-radio>
          <el-radio label="每月刷新结算" size="large">每月刷新结算</el-radio>
          <el-radio label="天后刷新结算" size="large"
            ><el-input
              v-model="vipItem.client_lost_rebate_order_time_amount"
              style="width: 80px"
              placeholder="请输入天数"
            />天后刷新结算</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">奖励释放周期</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px; align-items: center">
        <el-radio-group v-model="vipItem.clien_lost_rebate_fund_time" class="ml-4">
          <el-radio label="不释放" size="large">不释放</el-radio>
          <el-radio label="释放" size="large">释放</el-radio>
        </el-radio-group>
        <div style="display: flex; margin-left: 20px; height: 30px; align-items: center">
          <el-input
            style="width: 200px"
            placeholder="请输入自动释放天数"
            v-model="vipItem.clien_lost_rebate_fund_time_amount"
            :disabled="is_disabled_clien_lost_rebate_fund_time_amount()"
          />
          <label style="display: block">天后释放</label>
        </div>
      </div>
    </div>
  </div>
</template>
