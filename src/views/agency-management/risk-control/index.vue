<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import DateRangeSelector from "./components/DateRangeSelector.vue";

import BlackListTable from "./components/BlackListTable.vue";
import WhiteListTable from "./components/WhitelistTable.vue";

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};

const router = useRouter();
const add_new = () => {
  router.push({ name: "NewAgencyRisk" });
};
const go_setting = () => {
  router.push({ name: "AgencyRiskSetting" });
};

const is_show_group_release_dialog = ref(false);
const show_group_release_dialog = () => {
  is_show_group_release_dialog.value = true;
};

const is_show_group_remove_white_dialog = ref(false);
const show_group_remove_white_dialog = () => {
  is_show_group_remove_white_dialog.value = true;
};
</script>

<template>
  <el-card>
    <el-row :gutter="20" style="display: flex; justify-content: space-between">
      <el-form :inline="true" label-width="120">
        <div>
          <el-form-item label="UserID">
            <el-input placeholder="请输入UserID" />
          </el-form-item>
          <el-form-item label="邮箱账号">
            <el-input placeholder="请输入代理邮箱账号" />
          </el-form-item>
          <el-form-item label="身份信息">
            <el-input placeholder="请输入身份信息号" />
          </el-form-item>
        </div>
      </el-form>

      <div>
        <el-button>查询</el-button>
        <el-button>重置</el-button>
      </div>
    </el-row>
    <el-row :gutter="20" style="display: flex; justify-content: space-between">
      <el-form :inline="true" label-width="120">
        <div>
          <el-form-item label="风控等级">
            <el-select placeholder="请选择风控等级"></el-select>
          </el-form-item>
          <el-form-item label="风控行为">
            <el-select placeholder="请选择风控行为"></el-select>
          </el-form-item>
          <el-form-item label="操作人员">
            <el-select placeholder="请选择风控人员"></el-select>
          </el-form-item>
        </div>
      </el-form>

      <div>
        <el-button @click="add_new">新增风控代理</el-button>
        <el-button @click="go_setting">代理风控设置</el-button>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-form :inline="true" label-width="120">
        <div>
          <el-form-item label="IP地址">
            <el-input placeholder="请输入IP地址" />
          </el-form-item>
          <el-form-item label="设备ID">
            <el-input placeholder="请输入设备ID" />
          </el-form-item>
          <el-form-item label="支付账号">
            <el-input placeholder="请输入支付账号" />
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-row :gutter="20">
      <el-form :inline="true" label-width="120">
        <el-form-item label="标签">
          <el-input placeholder="请输入代理用户标签" />
        </el-form-item>
      </el-form>
    </el-row>
  </el-card>

  <DateRangeSelector />

  <el-row style="padding: 15px; display: flex; justify-content: space-between">
    <div>
      <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
        >代理风控列表<br />（黑名单）</el-button
      >
      <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
        >代理风控白名单</el-button
      >
    </div>
    <el-button v-if="tab_index == 0" @click="show_group_release_dialog"
      >批量解除风控</el-button
    >
    <el-button v-if="tab_index == 1" @click="show_group_remove_white_dialog"
      >批量移除白名单</el-button
    >
  </el-row>

  <el-card>
    <BlackListTable v-if="tab_index == 0" />
    <WhiteListTable v-if="tab_index == 1" />
  </el-card>

  <el-dialog v-model="is_show_group_release_dialog">
    <div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <p style="font-size: 20px; font-weight: bold">批量删除风控</p>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <p style="font-size: 15px">确认后，选中的代理将会被解除风控</p>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <div style="width: 100%">
          <p>备注</p>
        </div>
        <el-input type="textarea" :rows="6"></el-input>
      </div>
    </div>
    <template #footer>
      <div style="justify-content: center; display: flex">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="is_show_group_remove_white_dialog">
    <div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <p style="font-size: 20px; font-weight: bold">批量移除白名单</p>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <p style="font-size: 15px">所有选中的代理将会被移除白名单</p>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <div style="width: 100%">
          <p>备注</p>
        </div>
        <el-input type="textarea" :rows="6"></el-input>
      </div>
    </div>
    <template #footer>
      <div style="justify-content: center; display: flex">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
  height: 80px;
}
</style>
