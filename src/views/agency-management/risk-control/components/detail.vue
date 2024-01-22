<script setup lang="ts">
import { ref } from "vue";
const is_dialog_show = ref(false);
const set_dialog_show = (op: boolean) => {
  is_dialog_show.value = op;
};

defineExpose({
  set_dialog_show,
});
</script>
<template>
  <el-dialog v-model="is_dialog_show">
    <div>
      <div></div>
      <div></div>
    </div>
  </el-dialog>
</template>
<style lang="scss">
.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.dl_row:nth-child(2n + 1) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n) {
  /* Style for even elements in the group */
  background-color: #ccc;
}
</style>
