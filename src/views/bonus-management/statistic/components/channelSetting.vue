<script setup lang="ts">
import { ref } from "vue";
const is_dialog_show = ref(false);
const dialog_mode = ref(0);
const show_dialog = (op: boolean) => {
  is_dialog_show.value = op;
};
const set_dialog_mode = (op: number) => {
  dialog_mode.value = op;
};

const tab_index = ref(0);

const select_tab = (index: number) => {
  tab_index.value = index;
};

defineExpose({
  show_dialog,
  set_dialog_mode,
});
</script>
<template>
  <el-dialog v-model="is_dialog_show" title="Email更换渠道">
    <div class="group-box">
      <div class="dl_row">
        <p style="width: 20%">邮件渠道</p>
        <el-radio-group class="ml-4">
          <el-radio :label="1" size="large">关闭邮件通知</el-radio>
          <el-radio :label="2" size="large">Gmail</el-radio>
          <el-radio :label="3" size="large"
            ><el-input placeholder="输入新增渠道名"></el-input
          ></el-radio>
        </el-radio-group>
      </div>
      <div class="dl_row">
        <p style="width: 20%">每日发送数量限制</p>
        <el-input style="width: 70%" placeholder="请输入限制数量，默认不限制" />
      </div>
    </div>
    <div style="margin-top: 25px">
      <el-button
        v-if="dialog_mode == 0"
        :type="tab_index == 0 ? 'warning' : ''"
        @click="select_tab(0)"
        >Gmail</el-button
      >
      <el-button
        v-if="dialog_mode == 1"
        :type="tab_index == 0 ? 'warning' : ''"
        @click="select_tab(0)"
        >Buke</el-button
      >
      <el-button
        v-if="dialog_mode == 1"
        :type="tab_index == 1 ? 'warning' : ''"
        @click="select_tab(1)"
        >Indiahm</el-button
      >
    </div>
    <div class="group-box">
      <div class="dl_row">
        <p style="width: 20%">ApiKey</p>
        <el-input style="width: 70%" placeholder="请输入限制数量，默认不限制" />
      </div>
      <div class="dl_row">
        <p style="width: 20%">ApiSecret</p>
        <el-input style="width: 70%" placeholder="请输入限制数量，默认不限制" />
      </div>
      <div class="dl_row">
        <p style="width: 20%">Apild</p>
        <el-input style="width: 70%" placeholder="请输入限制数量，默认不限制" />
      </div>
      <div class="dl_row">
        <p style="width: 20%">From</p>
        <el-input style="width: 70%" placeholder="请输入限制数量，默认不限制" />
      </div>
      <div class="dl_row">
        <p style="width: 20%">Url</p>
        <el-input style="width: 70%" placeholder="请输入限制数量，默认不限制" />
      </div>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary"> 确认 </el-button>
        <el-button> 取消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.group-box {
  border: 1px solid black;
  width: 100%;
  padding: 5px;
}
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
