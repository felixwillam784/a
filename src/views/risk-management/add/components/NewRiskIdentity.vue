<script lang="ts" setup>
import { ref, onMounted, computed, onUpdated } from "vue";

const newRiskIdentityList = ref<any>([
  {
    item_1: "",
    item_2: "",
  },
]);
const loading = ref<boolean>(false);
</script>

<template>
  <el-card style="margin-top: 10px">
    <el-form :inline="true" class="d-flex">
      <el-form-item label="身份信息号">
        <el-input placeholder="请输入风控身份信息" />
      </el-form-item>
      <el-form-item style="margin-left: auto">
        <el-button>查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px">
    <el-table
      :data="newRiskIdentityList"
      style="width: 100%"
      v-loading="loading"
      v-horizontal-scroll
    >
      <el-table-column
        label="身份信息号"
        align="center"
        prop="item_1"
        width="160"
      ></el-table-column>
      <el-table-column
        label="相同身份信息账户数量"
        align="center"
        prop="item_2"
        width="200"
      ></el-table-column>
      <el-table-column></el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  height: 100px !important;
}

.el-table:not(.el-table--border) .el-table__cell {
  border-right: none;
  height: 50px;
}
</style>
