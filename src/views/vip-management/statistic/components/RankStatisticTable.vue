<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import useStore from "@/store";

const { vip } = useStore();
const loading = ref(false);
const rank_client_distribution_list = computed(() => {
  return vip.getVIPRankStatisticTableData;
});

const set_table_loading = (data: boolean) => {
  loading.value = data;
};
defineExpose({
  set_table_loading,
});
</script>

<template>
  <el-table :data="rank_client_distribution_list" style="width: 100%" v-loading="loading">
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
    <el-table-column label="VIP段位内人数" align="left" prop="vip_rank_people_count">
      <template #default="scope">
        <p>{{ scope.row.vip_rank_people_count }}</p>
      </template>
    </el-table-column>
  </el-table>
</template>
