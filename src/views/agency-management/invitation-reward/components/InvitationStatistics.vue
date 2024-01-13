import { deepEqual } from 'assert'; import { deepEqual } from 'assert';
<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import moment from "moment-timezone";
import { type AgentInvitationStatisticList } from "@/interface/agent";

const props = defineProps<{loading: boolean, agentInvitationStatisticList: AgentInvitationStatisticList}>();

const {loading, agentInvitationStatisticList} = toRefs(props);

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const total_count = ref<number>(0);

const handlePagination = () => {};
</script>

<template>
  <el-table
    v-loading="loading"
    :data="agentInvitationStatisticList.data_list"
    style="width: 100%"
    class="mt-2 invitation-reward-statistics-table"
  >
    <el-table-column label="ID" align="center" prop="id">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="邀请人数范围" align="center">
      <el-table-column
        label="邀请人数下线"
        align="center"
        prop="minimum_invite_number"
        sortable
      >
        <template #default="scope">
          <p>{{ scope.row.minimum_invite_number }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="邀请人数上限"
        align="center"
        prop="maximum_invite_number"
        sortable
      >
        <template #default="scope">
          <p>{{ scope.row.maximum_invite_number }}</p>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column
      label="达成条件总人数"
      align="center"
      prop="condition_satisfaction_total_count"
      sortable
    >
      <template #default="scope">
        <p>{{ scope.row.condition_satisfaction_total_count }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="提现总金额"
      align="center"
      prop="total_withdraw_amount"
      sortable
    >
      <template #default="scope">
        <p>{{ scope.row.total_withdraw_amount }}</p>
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
