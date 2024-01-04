<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const loading = ref<boolean>(false);

const total_count = ref<number>(0);

const firstLevelAgentList = ref<Array<any>>([
  {
    item_1: "User001",
    item_2: 9999,
    item_3: 9999,
    item_4: 9999,
  },
]);

const handlePagination = () => {};
</script>

<template>
  <el-table
    v-loading="loading"
    :data="firstLevelAgentList"
    style="width: 100%"
    class="mt-2"
  >
    <el-table-column label="UserID" align="center" prop="item_1">
      <template #default="scope">
        <el-link :underline="false" class="el-link-decoration">
          {{ scope.row.item_1 }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="用户标签" align="center" prop="item_2">
      <template #default="scope">
        <p>{{ scope.row.item_2 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控等级" align="center" prop="item_3">
      <template #default="scope">
        <p>{{ scope.row.item_3 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控行为" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="充提次数" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="充提金额" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="充提差" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控时间" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作人员" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="备注" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="200" fixed="right">
      <template #default="scope">
        <el-button type="primary" link> 详情 </el-button>
        <el-button type="danger" link> 移除白名单 </el-button>
        <el-button type="primary" link> 日志 </el-button>
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

<style lang="scss"></style>
