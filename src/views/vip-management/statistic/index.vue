<script setup lang="ts">
import { onMounted, ref } from "vue";
import RankStatisticHeader from "./components/RankStatisticHeader.vue";
import RankStatisticTable from "./components/RankStatisticTable.vue";
import LevelStatisticHeader from "./components/LevelStatisticHeader.vue";
import LevelStatisticTable from "./components/LevelStatisticTable.vue";
import DateRangeSelector from "./components/DateRangeSelector.vue";

import useStore from "@/store";
const { vip } = useStore();

const DateRangeSelectorRef = ref();
const RankStatisticTableRef = ref();
const LevelStatisticTableRef = ref();

const tab_index = ref(0);

const select_tab = (index: number) => {
  tab_index.value = index;
};

const get_rank_statistic_data = async (form_data: any) => {
  RankStatisticTableRef.value.set_table_loading(true);
  await vip.dispatchVIPRankStatisticTableData({
    start_date: new Date(DateRangeSelectorRef.value.dateRange[0]).getTime() / 1000,
    end_date: new Date(DateRangeSelectorRef.value.dateRange[1]).getTime() / 1000,
    vip_rank: form_data.vip_rank,
    vip_rank_people_count: form_data.rank_clients_number,
    vip_rank_people_count_operator_type: form_data.rank_clients_op,
  });
  RankStatisticTableRef.value.set_table_loading(false);
};

const get_level_statistic_data = async (form_data: any) => {
  LevelStatisticTableRef.value.set_table_loading(true);
  await vip.dispatchVIPLevelStatisticTableData({
    start_date: new Date(DateRangeSelectorRef.value.dateRange[0]).getTime() / 1000,
    end_date: new Date(DateRangeSelectorRef.value.dateRange[1]).getTime() / 1000,
    vip_rank: form_data.vip_rank,
    vip_level: form_data.level_number,
    vip_level_operator_type: form_data.level_op,
    vip_level_people_count: form_data.level_clients_number,
    vip_level_people_count_operator_type: form_data.level_clients_op,
  });
  LevelStatisticTableRef.value.set_table_loading(false);
};
</script>

<template>
  <div class="app-container">
    <el-col :span="24" :xs="24">
      <RankStatisticHeader
        v-if="tab_index == 0"
        @get_rank_statistic_data="get_rank_statistic_data"
      />
      <LevelStatisticHeader
        v-if="tab_index == 1"
        @get_level_statistic_data="get_level_statistic_data"
      />
      <DateRangeSelector ref="DateRangeSelectorRef" />
    </el-col>
    <div style="margin-top: 20px">
      <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
        >段位人数分布</el-button
      >
      <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
        >等级人数分布</el-button
      >
    </div>
    <div>
      <el-card :span="24" :xs="24">
        <RankStatisticTable v-if="tab_index == 0" ref="RankStatisticTableRef" />
        <LevelStatisticTable v-if="tab_index == 1" ref="LevelStatisticTableRef" />
      </el-card>
    </div>
  </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  height: 100px;
}
</style>
