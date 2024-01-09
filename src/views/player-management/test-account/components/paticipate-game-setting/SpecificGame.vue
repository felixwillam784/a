<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { CopyDocument } from "@element-plus/icons-vue";

const activeNames = ref(["1"]);
const account_status = ref<boolean>(true);
const check_list = ref<Array<string>>(["Originals"]);
</script>

<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1" class="bg-neutral-400">
      <template #title>
        <el-checkbox
          label="游戏厂商（游戏数量）"
          size="large"
          class="font-bold text-base"
        />
      </template>
      <el-checkbox-group v-model="check_list">
        <el-checkbox label="游戏ID" />
        <el-checkbox label="游戏名字" />
        <el-checkbox label="游戏厂商" />
        <el-checkbox label="游戏平台" />
        <el-checkbox label="游戏状态" />
      </el-checkbox-group>
      <el-checkbox-group v-model="check_list">
        <el-checkbox label="1001" />
        <el-checkbox label="Dice" />
        <el-checkbox label="Casino" />
        <el-checkbox label="自研" />
        <el-checkbox label="启用" />
      </el-checkbox-group>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <el-checkbox label="Ezugi(10)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <el-checkbox label="Evolution(100)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template #title>
        <el-checkbox label="Wazudan(215)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="5">
      <template #title>
        <el-checkbox label="Gamomat(100)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="6">
      <template #title>
        <el-checkbox label="Microgaming(358)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss"></style>
