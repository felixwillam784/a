<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import ActivityManagementDetail from "./detail.vue";

const router = useRouter();
const goBack = () => {
  router.push({ name: "EventManagement" });
};

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};
</script>

<template>
  <div class="app-container">
    <el-button type="danger" :icon="ArrowLeft" @click="goBack" style="margin-bottom: 20px"
      >返回</el-button
    >
    <div style="margin-top: 20px">
      <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
        >存款</el-button
      >
      <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
        >救援金</el-button
      >
      <el-button :type="tab_index == 2 ? 'warning' : ''" @click="select_tab(2)"
        >下载APP</el-button
      >
      <el-button :type="tab_index == 3 ? 'warning' : ''" @click="select_tab(3)"
        >APP用户免费奖金</el-button
      >
    </div>
    <el-card style="margin-top: 20px">
      <ActivityManagementDetail :event_id="-1" v-if="tab_index == 0" />
    </el-card>
  </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  height: 100px;
}

.data-pane {
  border: 1px solid #666;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 5px;
  color: #666;
}
</style>
