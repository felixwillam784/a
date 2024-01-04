<script setup lang="ts">
import { onMounted, ref } from "vue";

const vip_level_rank = ref(false);
const show_vip_rank_dialog = () => {
  vip_level_rank.value = true;
};
const vip_ranks = ref<Array<string>>([
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
]);
const add_vip_rank = ref(false);
const new_vip_rank_txt = ref("");
const operate_new_vip_rank = (op: boolean) => {
  add_vip_rank.value = op;
};

defineExpose({
  show_vip_rank_dialog,
});
</script>

<template>
  <el-dialog v-model="vip_level_rank" title="VIP段位">
    <div style="margin-bottom: 200px">
      <div v-for="(item, index) in vip_ranks" :key="index" class="dl_row">
        <p>
          {{ `段位 ${index}` }}
        </p>
        <el-input
          v-model="vip_ranks[index]"
          placeholder="Please input"
          style="width: 70%; margin-left: 20px"
        />
        <button
          v-if="index === vip_ranks.length - 1"
          style="margin-left: 100px; width: 25px"
          @click="operate_new_vip_rank(true)"
        >
          +
        </button>
      </div>

      <div v-if="add_vip_rank == true" class="dl_row">
        <p>
          {{ `段位 ${vip_ranks.length}` }}
        </p>
        <el-input
          v-model="new_vip_rank_txt"
          placeholder="请输入新增段位的名字"
          style="width: 70%; margin-left: 20px"
        />
        <button
          style="margin-left: 100px; width: 25px"
          @click="operate_new_vip_rank(false)"
        >
          -
        </button>
      </div>
    </div>

    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
