<script setup lang="ts">
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const goBack = () => {
  router.push({ name: "AgencyRiskControl" });
};
</script>
<template>
  <div class="app-container">
    <div style="margin-bottom: 15px">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<style lang="scss"></style>
