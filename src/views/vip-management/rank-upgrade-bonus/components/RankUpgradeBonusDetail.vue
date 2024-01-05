<script setup lang="ts">
import { ref } from "vue";
//import { VIPRankUpgradeBonusData } from "../../../../interface/vipmanagement";
import { VIPRankUpgradeBonusData } from "@/interface/vip";
const vip_rank_upgrade_bonus_detail_list = ref<Array<VIPRankUpgradeBonusData>>([
  {
    id: 1,
    vip_rank: "Iron",
    vip_reward_amount: 9999.999,
    aunt_magnification: 99.99,
  },
]);

defineExpose({
  vip_rank_upgrade_bonus_detail_list,
});
</script>

<template>
  <el-table style="width: 100%" :data="vip_rank_upgrade_bonus_detail_list">
    <el-table-column label="ID" align="center" prop="id" />
    <el-table-column label="VIP段位" align="center" prop="vip_rank" />
    <el-table-column label="奖励金额" align="center" prop="vip_reward_amount" />
    <el-table-column label="大妈倍率" align="center" prop="aunt_magnification" />
    <el-table-column label="操作" align="center" fixed="right" width="120">
      <template #default="scope">
        <el-button type="primary" link @click="$emit('showDetail', scope.row)"
          >详情</el-button
        >
        <el-button type="danger" link>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
../../../../interface/vip