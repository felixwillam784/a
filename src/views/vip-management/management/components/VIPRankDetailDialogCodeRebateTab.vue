<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

interface GetVIPRankData {
  vip_level: number;

  game_types: Array<rebateGameType>;

  rebate_mode: string;
  rebate_order_time: string;
  rebate_order_time_amount: string;
  rebate_fund_time: string;
  rebate_fund_time_amount: string;
}
interface rebateGameType {
  game_type: string;
  rebate_amount: number;
}

const vipItem = ref<GetVIPRankData>({
  vip_level: -1,

  game_types: [],

  rebate_mode: "",
  rebate_order_time: "",
  rebate_order_time_amount: "",
  rebate_fund_time: "",
  rebate_fund_time_amount: "",
});

const new_rebate_type = ref<rebateGameType>({
  game_type: "",
  rebate_amount: -1,
});
const delete_rebate_type = (index: number) => {
  if (index === 1000) add_new_rebate.value = false;
  else vipItem.value?.game_types.splice(index, 1);
};
const add_rebate_type = () => {
  add_new_rebate.value = true;
};
const add_new_rebate = ref<boolean>(false);

const is_disabled_rebate_fund_time_amount = () => {
  if (vipItem.value?.rebate_fund_time == "释放") return false;
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
    <div v-for="(item, index) in vipItem.game_types" :key="index" class="dl_row">
      <p style="width: 20%">
        {{ `${item.game_type}` }}
      </p>
      <el-input
        v-model="vipItem.game_types[index].rebate_amount"
        :value="vipItem.game_types[index].rebate_amount.toFixed(1)"
        placeholder="Please input"
        style="width: 50%; margin-left: 20px"
      />
      <p>%</p>
      <button
        v-if="index !== 0"
        style="margin-left: 100px; width: 25px"
        @click="delete_rebate_type(index)"
      >
        -
      </button>
      <button
        v-if="index === vipItem.game_types.length - 1"
        style="margin-left: 10px; width: 25px"
        @click="add_rebate_type()"
      >
        +
      </button>
    </div>
    <div v-if="add_new_rebate === true || vipItem.game_types.length == 0" class="dl_row">
      <p style="width: 20%">
        <el-input v-model="new_rebate_type.game_type" placeholder="请输入新的类型" />
      </p>
      <el-input
        v-model="new_rebate_type.rebate_amount"
        :value="new_rebate_type.rebate_amount == -1 ? '' : new_rebate_type.rebate_amount"
        placeholder="请输入返利百分比"
        style="width: 50%; margin-left: 20px"
      />
      <p>%</p>
      <button
        v-if="vipItem.game_types.length != 0"
        style="margin-left: 100px; width: 25px"
        @click="delete_rebate_type(1000)"
      >
        -
      </button>
    </div>

    <div class="dl_row">
      <p style="width: 20%">返利领取方式</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="vipItem.rebate_mode" class="ml-4">
          <el-radio label="玩家手动领取" size="large">玩家手动领取</el-radio>
          <el-radio label="结算时自动到账" size="large">结算时自动到账</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="dl_row" style="order: 10; height: 80px">
      <p style="width: 20%">返利结算周期</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="vipItem.rebate_order_time" class="ml-4">
          <el-radio label="实时结算" size="large">实时结算</el-radio>
          <el-radio label="每日刷新结算" size="large">每日刷新结算</el-radio>
          <el-radio label="每周刷新结算" size="large">每周刷新结算</el-radio>
          <el-radio label="每月刷新结算" size="large">每月刷新结算</el-radio>
          <el-radio label="天后刷新结算" size="large"
            ><el-input
              v-model="vipItem.rebate_order_time_amount"
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
        <el-radio-group v-model="vipItem.rebate_fund_time" class="ml-4">
          <el-radio label="不释放" size="large">不释放</el-radio>
          <el-radio label="释放" size="large">释放</el-radio>
        </el-radio-group>
        <div style="display: flex; margin-left: 20px; height: 30px; align-items: center">
          <el-input
            style="width: 200px"
            placeholder="请输入自动释放天数"
            v-model="vipItem.rebate_fund_time_amount"
            :disabled="is_disabled_rebate_fund_time_amount()"
          />
          <label style="display: block">天后释放</label>
        </div>
      </div>
    </div>
  </div>
</template>
