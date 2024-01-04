<script setup lang="ts">
import { ref } from "vue";
const vip_rank_upgrade_bonus_switch = ref(true);
</script>

<template>
  <div class="right_position switch_div" style="margin-right: 20px">
    <p>VIP段位提升功能开启/关闭</p>
    <el-switch
      size="large"
      v-model="vip_rank_upgrade_bonus_switch"
      inline-prompt
      active-text="开"
      inactive-text="关"
      class="switch"
    />
  </div>
</template>

<style lang="scss">
.switch {
  height: 100%;
  margin-left: 10px;
}

.switch_div {
  display: flex;
  align-items: center;
}

.right_position {
  display: flex;
  justify-content: right;
}
</style>
