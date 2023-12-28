<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

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
    item_5: 9999,
    item_6: 9999,
    item_7: 9999,
    item_8: "正常",
  },
]);
</script>

<template>
  <el-card>
    <el-form :model="formData" :inline="true" label-width="100" label-position="left">
      <el-form-item label="User ID" prop="user_id">
        <el-input v-model="formData.user_id" placeholder="请输入User ID" />
      </el-form-item>
      <el-form-item label="邮箱账号" prop="email_address">
        <el-input v-model="formData.email_address" placeholder="请输入邮箱账号" />
      </el-form-item>
      <el-form-item label="身份信息" prop="identity_information">
        <el-input
          v-model="formData.identity_information"
          placeholder="请输入身份信息号"
        />
      </el-form-item>
    </el-form>
    <el-form :model="formData" :inline="true" label-width="100" label-position="left">
      <el-form-item label="风控状态" prop="user_id">
        <el-select v-model="formData.user_id" placeholder="请选择风控状态"> </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" :icon="Search" @click="handleQuery"> 搜索 </el-button>
        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-table v-loading="loading" :data="firstLevelAgentList" style="width: 100%" class="mt-2">
    <el-table-column label="UserID" align="left" prop="item_1">
      <template #default="scope">
        <el-link :underline="false" class="el-link-decoration">
          {{ scope.row.item_1 }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="充值总额" align="left" prop="item_2" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_2 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="提现总额" align="left" prop="item_3" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_3 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="账户余额" align="left" prop="item_4" width="160" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="累计下注金额" align="left" prop="item_5" width="160" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_5 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="累计下注次数" align="left" prop="item_6" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_6 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="累计带来收益金额" align="left" prop="item_7" sortable>
      <template #default="scope">
        <p>{{ scope.row.item_7 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="账号状态" align="left" prop="item_8">
      <template #default="scope">
        <p>{{ scope.row.item_8 }}</p>
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
