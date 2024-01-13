<script setup lang="ts">
import { onMounted, ref } from "vue";
import useStore from "@/store";
import VIPManagementTable from "./components/VIPManagementTable.vue";
import VIPRankDialog from "./components/VIPLevelRankDialog.vue";
import VIPRankDetailDialogBasicTab from "./components/VIPRankDetailDialogBasicTab.vue";
import VIPRankDetailDialogCodeRebateTab from "./components/VIPRankDetailDialogCodeRebateTab.vue";
import VIPRankDetailDialogClientLostRebateTab from "./components/VIPRankDetailDialogClientLostRebateTab.vue";

const { vip } = useStore();
const vipItemLevel = ref(-1);

const vip_maintain_switch = ref(true);

const VIPRankDailogRef = ref();
const VIPBasicDetailDataRef = ref();
const VIPCodeRebateDetailDataRef = ref();
const VIPClientLostRebateDetailDataRef = ref();

// vip_rank_dialog
const show_vip_rank_dialog = () => {
  vip.dispatchVIPRanks();
  VIPRankDailogRef.value.show_vip_rank_dialog();
};

//vip_rank_detail
const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};

const vip_rank_detail_dialog = ref(false);
const show_vip_rank_detail_dialog = (param: number) => {
  vip_rank_detail_dialog.value = true;
  vipItemLevel.value = param;
};

const detail_dialog_ok_btn_clicked = () => {
  if (tab_index.value == 0) {
    VIPBasicDetailDataRef.value.update_basic_detail();
  } else if (tab_index.value == 1) {
    VIPCodeRebateDetailDataRef.value.update_code_rebate_detail();
  } else if (tab_index.value == 2) {
    VIPClientLostRebateDetailDataRef.value.update_client_lost_detail();
  }

  vip_rank_detail_dialog.value = false;
};

const detail_dialog_cancel_btn_clicked = () => {
  vip_rank_detail_dialog.value = false;
};
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search">
          <el-form :inline="true" label-width="120" class="right_position">
            <el-form-item>
              <el-button>新增VIP等级</el-button>
              <el-button @click="show_vip_rank_dialog()">VIP段位</el-button>
              <el-button>模板导出</el-button>
              <el-button>Excel导入</el-button>
              <el-button>Excel导出</el-button>
            </el-form-item>
          </el-form>
          <div class="right_position switch_div" style="margin-right: 20px">
            <p>VIP保级功能</p>
            <el-switch
              size="large"
              v-model="vip_maintain_switch"
              inline-prompt
              active-text="开启"
              inactive-text="关闭"
              class="switch"
            />
          </div>
        </div>
        <VIPManagementTable @show_vip_rank_detail_dialog="show_vip_rank_detail_dialog" />
      </el-col>
    </el-row>

    <VIPRankDialog ref="VIPRankDailogRef" />
    <el-dialog v-model="vip_rank_detail_dialog" title="VIP详情" :top="'5px'">
      <div style="margin-bottom: 10px">
        <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
          >基本详情</el-button
        >
        <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
          >打码返利设置</el-button
        >
        <el-button :type="tab_index == 2 ? 'warning' : ''" @click="select_tab(2)"
          >客损返利设置</el-button
        >
      </div>
      <VIPRankDetailDialogBasicTab
        v-if="tab_index === 0"
        @show_vip_rank_dialog="show_vip_rank_dialog"
        :vip_level="vipItemLevel"
        ref="VIPBasicDetailDataRef"
      />
      <VIPRankDetailDialogCodeRebateTab
        v-if="tab_index === 1"
        :vip_level="vipItemLevel"
        ref="VIPCodeRebateDetailDataRef"
      />
      <VIPRankDetailDialogClientLostRebateTab
        v-if="tab_index === 2"
        :vip_level="vipItemLevel"
        ref="VIPClientLostRebateDetailDataRef"
      />
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button type="primary" @click="detail_dialog_ok_btn_clicked()"
            >确认</el-button
          >
          <el-button @click="detail_dialog_cancel_btn_clicked()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
  height: 80px;
}

.right_position {
  display: flex;
  justify-content: right;
}

.switch {
  height: 100%;
  margin-left: 10px;
}

.switch_div {
  display: flex;
  align-items: center;
}
.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}
.dl_row:nth-child(2n + 1) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n) {
  /* Style for even elements in the group */
  background-color: #ccc;
}
.el-radio__input.is-checked + .el-radio__label {
  color: inherit;
}
</style>
