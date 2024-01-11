<script setup lang="ts">
import { Search, Refresh, Upload, Plus } from "@element-plus/icons-vue";
import { onMounted, ref, computed, provide } from "vue";
import useStore from "@/store";

const { vip } = useStore();
const formDataRank = ref({
  vip_rank: "",
  rank_clients_op: 1,
  rank_clients_number: 0,
});

const vip_ranks = computed(() => {
  return vip.getVIPRanks;
});

const emit = defineEmits(["get_rank_statistic_data"]);
onMounted(() => {
  vip.dispatchVIPRanks();
  emit("get_rank_statistic_data", formDataRank);
});

const op_options = ref<Array<any>>([
  {
    label: "≥",
    value: 1,
  },
  {
    label: "＞",
    value: 2,
  },
  {
    label: "≤",
    value: 3,
  },
  {
    label: "＜",
    value: 4,
  },
  {
    label: "＝",
    value: 5,
  },
]);
</script>
<template>
  <div class="search">
    <el-form
      class="left_position"
      style="display: flex; justify-content: space-between; padding: 0px 10px"
    >
      <div style="display: flex">
        <el-form-item label="VIP段位">
          <el-select
            v-model="formDataRank.vip_rank"
            placeholder="请选择VIP段位"
            clearable
          >
            <el-option v-for="item in vip_ranks" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="VIP段位内人数" style="display: flex">
          <el-select
            v-model="formDataRank.rank_clients_op"
            placeholder="请选择"
            style="width: 80px"
          >
            <el-option
              v-for="item in op_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-model="formDataRank.rank_clients_number"
            placeholder="请输入人数"
            style="width: 200px"
            :value="
              formDataRank.rank_clients_number == 0
                ? ''
                : formDataRank.rank_clients_number
            "
          />
        </el-form-item>
      </div>

      <div>
        <el-button :icon="Refresh">重置</el-button>
        <el-button :icon="Search" @click="$emit('get_rank_statistic_data', formDataRank)"
          >查新</el-button
        >
      </div>
    </el-form>
  </div>
</template>
