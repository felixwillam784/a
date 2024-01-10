<script setup lang="ts">
import { onMounted, ref } from "vue";
import { LevelClientDistribution } from "@/interface/vip";
const level_client_distribution_list = ref<Array<LevelClientDistribution>>();
</script>

<template>
  <el-table :data="level_client_distribution_list" style="width: 100%">
    <el-table-column label="VIP等级" align="left" prop="level" width="120">
      <template #default="scope">
        <p>{{ scope.row.level }}</p>
      </template>
    </el-table-column>
    <el-table-column label="VIP段位" align="left" prop="vip_rank" width="120">
      <template #default="scope">
        <p>{{ scope.row.vip_rank }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="VIP等级内人数"
      align="left"
      prop="vip_level_client_distribution"
    >
      <template #default="scope">
        <p>{{ scope.row.vip_level_client_distribution }}</p>
      </template>
    </el-table-column>
  </el-table>
</template>
