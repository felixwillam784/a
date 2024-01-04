<script setup lang="ts">
import { onMounted, ref } from "vue";
import RankUpgradeBonusSwitch from "./components/RankUpgradeBonusSwitch.vue";
import RankUpgradeBonusDetailTable from "./components/RankUpgradeBonusDetail.vue";
import RankUpgradeBonusDetailDialog from "./components/RankUpgradeBonusDetailDialog.vue";
import { VIPRankUpgradeBonusData } from "../../../interface/vipmanagement";

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};

const DialogRef = ref();
const TableRef = ref();
const show_detail = (data: VIPRankUpgradeBonusData) => {
  DialogRef.value.show_detail_dialog(data.id);
};

const add_new_bonus_data = () => {
  DialogRef.value.show_add_dialog(
    TableRef.value.vip_rank_upgrade_bonus_detail_list[
      TableRef.value.vip_rank_upgrade_bonus_detail_list.length - 1
    ].id + 1
  );
};
</script>

<template>
  <div class="app-container">
    <el-row v-if="tab_index == 0" :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search">
          <el-form :inline="true" label-width="120" class="right_position">
            <el-form-item>
              <el-button @click="add_new_bonus_data()">新增段位奖励</el-button>
            </el-form-item>
          </el-form>
          <RankUpgradeBonusSwitch />
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 20px">
      <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
        >奖励详情</el-button
      >
      <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
        >统计数据</el-button
      >
    </div>
    <RankUpgradeBonusDetailTable
      v-if="tab_index == 0"
      @showDetail="show_detail"
      ref="TableRef"
    />
    <RankUpgradeBonusDetailDialog ref="DialogRef" />
  </div>
</template>

<style lang="scss">
.right_position {
  display: flex;
  justify-content: right;
}
</style>
