<script setup lang="ts">
import { ref } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import AgentDetail from "./components/AgentDetail.vue";
import FirstLevelAgentList from "./components/FirstLevelAgentList.vue";

const router = useRouter();

const activeIndex = ref<number>(0);

const goBack = () => {
  router.go(-1);
};

const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <div class="app-container">
    <div class="go-back-header">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
    <el-card>
      <div>
        <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)"
          >代理详情</el-button
        >
        <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)"
          >一级代理名单</el-button
        >
      </div>
      <div class="mt-2">
        <AgentDetail v-if="activeIndex == 0" />
        <FirstLevelAgentList v-if="activeIndex == 1" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
