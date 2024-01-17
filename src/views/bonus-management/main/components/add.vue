<script setup lang="ts">
import { ref } from "vue";
import Basic from "./BasicSetting.vue";
import UsageScope from "./UsageScope.vue";

const is_show_dialog = ref(false);
const show_dialog = (op: boolean) => {
  is_show_dialog.value = op;
};

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};

defineExpose({
  show_dialog,
});

const get_primary_button_text = () => {
  if (tab_index.value == 0) return "下一页";
  return "确认添加";
};

const primary_btn_clicked = () => {
  if (tab_index.value == 0) tab_index.value++;
};
</script>
<template>
  <el-dialog v-model="is_show_dialog" align-center>
    <div style="border-bottom: 2px solid grey">
      <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
        >基本设置</el-button
      >
      <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
        >奖金使用范围</el-button
      >
    </div>

    <div style="margin-top: 10px">
      <Basic v-if="tab_index == 0" />
      <UsageScope v-if="tab_index == 1" />
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary" @click="primary_btn_clicked">{{
          get_primary_button_text()
        }}</el-button>
        <el-button>取消添加</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss"></style>
