<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import useStore from "@/store";

const { vip } = useStore();

const slice_item_object = () => {
  if (vipItem.value) {
    const {
      vip_level,
      vip_rank,
      recharge_vip_upgrade,
      coding_vip_upgrade,
      withdrawal_fee,
      free_amount_month,
      maximum_amount_amount,
      daily_limit_amount,
      monthly_limit_amount,
      daily_limit_time,
      monthly_limit_time,
      recharge_vip_up,
      coding_vip_relegation,
      vip_limit_days,
      vip_and_was_lowered,
    } = vipItem.value;
    const wrappedObject = {
      vip_level,
      vip_rank,
      recharge_vip_upgrade,
      coding_vip_upgrade,
      withdrawal_fee,
      free_amount_month,
      maximum_amount_amount,
      daily_limit_amount,
      monthly_limit_amount,
      daily_limit_time,
      monthly_limit_time,
      recharge_vip_up,
      coding_vip_relegation,
      vip_limit_days,
      vip_and_was_lowered,
    };

    return wrappedObject;
  }
  return undefined;
};
const vip_rank_detail_label = ref<Array<string>>([
  "VIP等级",
  "VIP段位",
  "VIP升级所需充值",
  "VIP升级所需打码量",
  "提现手续费",
  "免提现手续费额度/月",
  "单笔最高提现金额",
  "每日可提现额度",
  "每月可提现额度",
  "每日可提现次数",
  "每月可提现次数",
  "VIP保级所需充值",
  "VIP保级所需打码",
  "VIP保级时效",
  "VIP保级失败降低等级",
]);

const vip_ranks = ref<Array<string>>([
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
]);
let rank_options: any[] = [];

onMounted(async () => {
  rank_options = [];
  for (let i = 0; i < vip_ranks.value.length; i++)
    rank_options.push({ value: vip_ranks.value[i], label: vip_ranks.value[i] });

  if (props.vip_level != undefined){
    vipItem.value.vip_level = props.vip_level;
    await vip.dispatchVIPManagementBasicDetailData(props.vip_level);
  }

  
});

const vipItem = computed(() => {
  return vip.getVIPManagementBasicDetailData;
});

const props = defineProps({
  vip_level: Number,
});

watch(props, async () => {
  if (props.vip_level != undefined){
    vipItem.value.vip_level = props.vip_level;
    await vip.dispatchVIPManagementBasicDetailData(props.vip_level);
  }
});
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div
      v-for="(item, key, index) in slice_item_object()"
      :key="key"
      class="dl_row"
      :style="`order:${index}`"
    >
      <p style="width: 20%">
        {{ `${vip_rank_detail_label[index]}` }}
      </p>
      <div v-if="index === 1" style="display: flex; width: 78.5%">
        <el-select
          v-model="vipItem[key]"
          placeholder="Select"
          style="width: 100%; margin-left: 20px"
        >
          <el-option
            v-for="item in rank_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <button
          style="margin-left: 100px; width: 25px"
          @click="$emit('show_vip_rank_dialog')"
        >
          +
        </button>
      </div>
      <el-input
        v-else
        v-model="vipItem[key]"
        placeholder="Please input"
        style="width: 60%; margin-left: 20px"
      />
      <p v-if="index === 4">%</p>
    </div>
    <div class="dl_row" style="order: 10">
      <p style="width: 20%">VIP返利类型</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="vipItem.rebate_way" class="ml-4">
          <el-radio label="打码返利" size="large">打码返利</el-radio>
          <el-radio label="客损返利" size="large">客损返利</el-radio>
          <el-radio label="无返利" size="large">无返利</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="dl_row" style="order: 10">
      <p style="width: 20%">是否保级</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="vipItem.protect_vip" class="ml-4">
          <el-radio label="开启保级" size="large">开启保级</el-radio>
          <el-radio label="关闭保级" size="large">关闭保级</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
