<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
//import { VIPRankUpgradeBonusData } from "../../../../interface/vipmanagement";
import { VIPRankUpgradeBonusData } from "@/interface/vip";

import useStore from "@/store";
const { vip } = useStore();
// const vip_rank_upgrade_bonus_detail_list = ref<Array<VIPRankUpgradeBonusData>>([
//   {
//     id: 1,
//     vip_rank: "Iron",
//     vip_reward_amount: 9999.999,
//     aunt_magnification: 99.99,
//   },
// ]);

// defineExpose({
//   vip_rank_upgrade_bonus_detail_list,
// });

const vip_rank_upgrade_bonus_detail_list = computed(() => {
  return vip.getVIPRankUpgradeRewardData;
});

/**
 * 查询
 */
 const handleQuery = async () => {
  await vip.dispatchVIPRankUpgradeReward();
}

onMounted(() => {
  handleQuery();
})
</script>

<template>
  <el-table style="width: 100%" :data="vip_rank_upgrade_bonus_detail_list">
    <el-table-column label="ID" align="center" prop="rank_id" />
    <el-table-column label="VIP段位" align="center" prop="rank_name" />
    <el-table-column label="奖励金额" align="center" prop="uprank_award.award" />
    <el-table-column label="大妈倍率" align="center" prop="uprank_award.bet_rate" />
    <el-table-column label="操作" align="center" fixed="right" width="120">
      <template #default="scope">
        <el-button type="primary" link @click="$emit('showDetail', scope.row)"
          >详情</el-button
        >
        <!-- <el-button type="danger" link>删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>
../../../../interface/vip