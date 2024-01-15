import { deepEqual } from 'assert'; import { deepEqual } from 'assert';
<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";
import moment from "moment-timezone";
import { type AgentAchievementStageStatisticList } from "@/interface/agent";

const props = defineProps<{ agentAchievementStageStatisticList: AgentAchievementStageStatisticList, loading: boolean }>()

const { agentAchievementStageStatisticList, loading } = toRefs(props);

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const total_count = ref<number>(0);

const handlePagination = () => { };
</script>

<template>
  <el-table
    v-loading="loading"
    :data="agentAchievementStageStatisticList.data_list"
    style="width: 100%"
    class="mt-2 invitation-reward-statistics-table"
  >
    <el-table-column label="ID" align="center" prop="id">
      <template #default="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column
      label="领取阶段奖励个数"
      align="center"
      prop="receive_stage_reward_count"
    >
      <template #default="scope">
        <p>{{ scope.row.receive_stage_reward_count }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="领取总人数"
      align="center"
      prop="receiver_total_count"
      sortable
    >
      <template #default="scope">
        <p>{{ scope.row.receiver_total_count }}</p>
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

<style lang="scss"></style>
