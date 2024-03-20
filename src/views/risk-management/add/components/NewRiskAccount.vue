<script lang="ts" setup>
import { ref, onMounted, computed, onUpdated } from "vue";
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const newRiskAccountList = ref<any>([
  {
    item_1: "",
    item_2: "",
    item_3: "",
    item_4: "",
    item_5: "",
    item_6: "",
    item_7: "",
    item_8: "",
  },
]);
const loading = ref<boolean>(false);
</script>

<template>
  <el-card style="margin-top: 10px">
    <el-form :inline="true" class="d-flex">
      <el-form-item label="UserID">
        <el-input placeholder="请输入用户账号" />
      </el-form-item>
      <el-form-item label="邮箱账号">
        <el-input placeholder="请输入邮箱账号" />
      </el-form-item>
      <el-form-item label="身份信息">
        <el-input placeholder="请输入身份信息号" />
      </el-form-item>
      <el-form-item style="margin-left: auto">
        <el-button>查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px">
    <el-table
      :data="newRiskAccountList"
      style="width: 100%"
      v-loading="loading"
      v-horizontal-scroll
    >
      <el-table-column label="UserID" align="center" prop="item_1"></el-table-column>
      <el-table-column label="用户IP地址" align="center" prop="item_2"></el-table-column>
      <el-table-column label="注册IP地址" align="center" prop="item_3"></el-table-column>
      <el-table-column label="用户设备ID" align="center" prop="item_4"></el-table-column>
      <el-table-column label="注册设备ID" align="center" prop="item_5"></el-table-column>
      <el-table-column label="用户手机号" align="center" prop="item_6"></el-table-column>
      <el-table-column
        label="用户银行账号"
        align="center"
        prop="item_7"
      ></el-table-column>
      <el-table-column
        label="用户身份信息"
        align="center"
        prop="item_8"
      ></el-table-column>
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
