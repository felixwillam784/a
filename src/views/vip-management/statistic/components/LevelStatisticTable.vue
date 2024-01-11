<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { LevelClientDistribution } from "@/interface/vip";
import useStore from "@/store";

const { vip } = useStore();
const loading = ref(false);

const level_client_distribution_list = computed(() => {
  return vip.getVIPLevelStatisticTableData;
});

const set_table_loading = (data: boolean) => {
  loading.value = data;
};
defineExpose({
  set_table_loading,
});
</script>

<template>
  <el-table
    :data="level_client_distribution_list"
    style="width: 100%"
    v-loading="loading"
  >
    <el-table-column label="VIP等级" align="left" prop="vip_level" width="120">
      <template #default="scope">
        <p>{{ scope.row.vip_level }}</p>
      </template>
    </el-table-column>
    <el-table-column label="VIP段位" align="left" prop="vip_rank" width="120">
      <template #default="scope">
        <p>{{ scope.row.vip_rank }}</p>
      </template>
    </el-table-column>
    <el-table-column label="VIP等级内人数" align="left" prop="vip_level_people_count">
      <template #default="scope">
        <p>{{ scope.row.vip_level_people_count }}</p>
      </template>
    </el-table-column>
  </el-table>
</template>
