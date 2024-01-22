<script setup lang="ts">
import { ref } from "vue";
import DateRangeSelector from "./components/DateRangeSelector.vue";
import DetailDialog from "./components/detail.vue";

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};

const temp_list = ref<Array<any>>([{}]);

const DetailDialogRef = ref();
const show_detail_dialog = () => {
  DetailDialogRef.value.set_dialog_show(true);
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
        <el-button>新增风控代理</el-button>
        <el-button>代理风控设置</el-button>
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
    <el-button>大量解除風控</el-button>
  </el-row>

  <el-card>
    <el-table :data="temp_list">
      <el-table-column align="center" label="UserID">
        <template #header>
          <el-checkbox />
          UserID
        </template>
        <template #default>
          <el-checkbox></el-checkbox>
          User1001
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户标签"></el-table-column>
      <el-table-column align="center" label="风控等级">
        <template #default>
          <el-select></el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="风控行为"></el-table-column>
      <el-table-column align="center" label="风控时间"></el-table-column>
      <el-table-column align="center" label="操作人员"></el-table-column>
      <el-table-column align="center" label="备注"></el-table-column>
      <el-table-column align="center" label="操作">
        <el-button type="primary" link @click="show_detail_dialog">详情</el-button>
        <el-button type="primary" link>解除风控</el-button>
        <el-button type="primary" link>日志</el-button>
      </el-table-column>
    </el-table>
  </el-card>

  <DetailDialog ref="DetailDialogRef" />
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
