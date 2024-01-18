<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import useStore from "@/store";
import { GetVIPLevelData } from "@/interface/vip";

const { vip } = useStore();

const slice_item_object = () => {
  if (vipItem.value) {
    const {
      level,
      rank_name,
      deposit_exp,
      bet_exp,
      withdrawal_fee,
      free_withdrawals,
      withdrawals_max,
      withdrawals_amonut,
      month_withdrawals_amount,
      withdrawals_times,
      month_withdrawals_times,
      award_type,
      is_protection,
      protection_days,
      downgrade_level,
    } = vipItem.value;
    const wrappedObject = {
      level,
      rank_name,
      deposit_exp,
      bet_exp,
      withdrawal_fee,
      free_withdrawals,
      withdrawals_max,
      withdrawals_amonut,
      month_withdrawals_amount,
      withdrawals_times,
      month_withdrawals_times,
      award_type,
      is_protection,
      protection_days,
      downgrade_level,
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

const vip_ranks = computed(() => {
  return vip.getVIPRanks;
});

let rank_options: any[] = [];

onMounted(async () => {
  rank_options = [];
  for (let i = 0; i < vip_ranks.value.length; i++)
    rank_options.push({ value: vip_ranks.value[i], label: vip_ranks.value[i] });
  vipItem.value = get_vip_item_from_level();
});

const vipItem = ref<GetVIPLevelData>({
  level: 0,
  rank: 0,
  rank_name: "",
  deposit_exp: 0,
  bet_exp: 0,
  withdrawal_fee: 0,
  free_withdrawals: 0,
  withdrawals_max: 0,
  withdrawals_amonut: 0,
  month_withdrawals_amount: 0,
  withdrawals_times: 0,
  month_withdrawals_times: 0,
  award_type: 0,
  is_protection: 0,
  protection_deposit_amount: 0,
  protection_bet_amount: 0,
  protection_days: 0,
  downgrade_level: 0,
  bet_award: { custom_interval: 0, cycle: 0, rate: {}, release_cycle: 0 },
});

const props = defineProps({
  vip_level: Number,
});

const update_basic_detail = () => {
  //vip.dispatchUpdateVIPManagementBasicDetailData();
};

const get_vip_item_from_level = () => {
  vip.getVIPLevelData.forEach((element) => {
    console.log(element.level, props.vip_level);
    if (element.level == props.vip_level) return element;
  });
  return vip.getVIPLevelData[0];
};
defineExpose({
  update_basic_detail,
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
        <el-radio-group v-model="vipItem.award_type" class="ml-4">
          <el-radio :label="0" size="large">打码返利</el-radio>
          <el-radio :label="1" size="large">客损返利</el-radio>
          <el-radio :label="2" size="large">无返利</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="dl_row" style="order: 10">
      <p style="width: 20%">是否保级</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="vipItem.is_protection" class="ml-4">
          <el-radio :label="0" size="large">开启保级</el-radio>
          <el-radio :label="1" size="large">关闭保级</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
