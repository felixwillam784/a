<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { CopyDocument } from "@element-plus/icons-vue";

const activeNames = ref(["1", "2"]);
const account_status = ref<boolean>(true);
const check_list = ref<Array<string>>(["Originals"]);
</script>

<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1" class="bg-neutral-400">
      <template #title>
        <el-checkbox label="Casino" size="large" class="font-bold text-base" />
      </template>
      <el-checkbox-group v-model="check_list">
        <el-checkbox label="Originals" />
        <el-checkbox label="Slots" />
        <el-checkbox label="Live Casino" />
        <el-checkbox label="Table Games" />
      </el-checkbox-group>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <el-checkbox label="Sports" size="large" class="font-bold text-base" />
      </template>
      <el-checkbox-group v-model="check_list">
        <el-checkbox label="Live Events" />
        <el-checkbox label="Soccer" />
        <el-checkbox label="Tennis" />
        <el-checkbox label="BasketBall" />
        <el-checkbox label="Cricket" />
        <el-checkbox label="FIFA" />
        <el-checkbox label="American Football" />
        <el-checkbox label="Ice Hokey" />
        <el-checkbox label="Baseball" />
        <el-checkbox label="Handball" />
      </el-checkbox-group>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <el-checkbox label="Racing" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template #title>
        <el-checkbox label="Trading" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss"></style>
