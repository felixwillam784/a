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
          label="渠道商（游戏数量）"
          size="large"
          class="font-bold text-base"
        />
      </template>
      <el-checkbox-group v-model="check_list">
        <el-checkbox label="游戏ID" />
        <el-checkbox label="游戏名字" />
        <el-checkbox label="游戏厂商" />
        <el-checkbox label="游戏状态" />
      </el-checkbox-group>
      <el-checkbox-group v-model="check_list">
        <el-checkbox label="1002" />
        <el-checkbox label="Dice" />
        <el-checkbox label="自研" />
        <el-checkbox label="启用" />
      </el-checkbox-group>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <el-checkbox label="PGSoft(4000)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <el-checkbox
          label="PragmaticPlay(4000)"
          size="large"
          class="font-bold text-base"
        />
      </template>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template #title>
        <el-checkbox label="Baccarat(4000)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="5">
      <template #title>
        <el-checkbox label="Roulette(4000)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
    <el-collapse-item name="6">
      <template #title>
        <el-checkbox label="Habanero(4000)" size="large" class="font-bold text-base" />
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss"></style>
