<script setup lang="ts">
import { ref } from "vue";
import Setting from "./components/setting.vue";

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};
</script>
<template>
  <div class="app-container">
    <el-row style="display: flex; justify-content: space-between">
      <div>
        <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
          >站内信</el-button
        >
        <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
          >Email</el-button
        >
        <el-button :type="tab_index == 2 ? 'warning' : ''" @click="select_tab(2)"
          >SMS</el-button
        >
      </div>
      <div>
        <el-button>更换渠道</el-button>
        <el-button>Excel导入</el-button>
        <el-button>Excel导出</el-button>
      </div>
    </el-row>
    <Setting />
  </div>
</template>
