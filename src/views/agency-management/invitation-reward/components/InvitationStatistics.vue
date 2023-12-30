import { deepEqual } from 'assert'; import { deepEqual } from 'assert';
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import moment from "moment-timezone";

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const loading = ref<boolean>(false);

const total_count = ref<number>(0);

const firstLevelAgentList = ref<Array<any>>([
  {
    item_1: 1,
    item_2: 100,
    item_3: 100,
    item_4: 99999.99,
  },
  {
    item_1: 1,
    item_2: 100,
    item_3: 100,
    item_4: 99999.99,
  },
]);

const handlePagination = () => {};
</script>

<template>
  <el-table
    v-loading="loading"
    :data="firstLevelAgentList"
    style="width: 100%"
    class="mt-2 invitation-reward-statistics-table"
  >
    <el-table-column label="ID" align="center" prop="item_1">
      <template #default="scope">
        {{ scope.row.item_1 }}
      </template>
    </el-table-column>
    <el-table-column label="邀请人数范围" align="center">
      <el-table-column label="邀请人数下线" align="center" prop="item_2" sortable>
        <template #default="scope">
          <p>{{ scope.row.item_2 }}</p>
        </template>
      </el-table-column>
      <el-table-column label="邀请人数上限" align="center" prop="item_3" sortable>
        <template #default="scope">
          <p>{{ scope.row.item_3 }}</p>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="达成条件总人数" align="center" prop="item_4" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="提现总金额" align="center" prop="item_4" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
  </el-table>
  <div style="float: right">
    <pagination
      :total="total_count"
      v-model:page="formData.pageNum"
      v-model:limit="formData.pageSize"
      @pagination="handlePagination"
    />
  </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa;
  height: 60px;
}
</style>
