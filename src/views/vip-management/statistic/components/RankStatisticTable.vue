<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RankClientDistribution } from "@/interface/vip";

const rank_client_distribution_list = ref<Array<RankClientDistribution>>();
</script>

<template>
  <el-table :data="rank_client_distribution_list" style="width: 100%">
    <el-table-column label="ID" align="left" prop="id" width="120">
      <template #default="scope">
        <p>{{ scope.row.id }}</p>
      </template>
    </el-table-column>
    <el-table-column label="VIP段位" align="left" prop="vip_rank" width="120">
      <template #default="scope">
        <p>{{ scope.row.vip_rank }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="VIP段位内人数"
      align="left"
      prop="vip_rank_client_distribution"
    >
      <template #default="scope">
        <p>{{ scope.row.vip_rank_client_distribution }}</p>
      </template>
    </el-table-column>
  </el-table>
</template>
