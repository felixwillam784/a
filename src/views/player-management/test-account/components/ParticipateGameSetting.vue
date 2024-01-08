<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import GameCategory from "./paticipate-game-setting/GameCategory.vue";
import GameChannel from "./paticipate-game-setting/GameChannel.vue";

const activeIndex = ref<number>(0);
const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <el-card>
    <el-form label-width="180" label-position="left" class="font-bold">
      <el-form-item label="已选择的使用分类: ">
        <span class="bg-yellow-600 px-1">Originals</span>
        <span class="bg-yellow-600 px-1 ms-3">Racing</span>
      </el-form-item>
    </el-form>
    <el-form label-width="180" label-position="left" class="font-bold">
      <el-form-item label="已选择的使用渠道: ">
        <span class="bg-yellow-400 px-1">PGSoft</span>
      </el-form-item>
    </el-form>
    <el-form label-width="180" label-position="left" class="font-bold">
      <el-form-item label="已选择的使用游戏: ">
        <span class="bg-green-400 px-1">1001</span>
      </el-form-item>
    </el-form>
  </el-card>
  <el-row class="mt-2 ps-1">
    <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
      游戏分类
    </el-button>
    <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
      游戏渠道
    </el-button>
    <el-button :type="activeIndex == 2 ? 'warning' : ''" @click="handleBtnTab(2)">
      具体游戏
    </el-button>
  </el-row>
  <el-card>
    <GameCategory v-if="activeIndex == 0" />
    <GameChannel v-if="activeIndex == 1" />
  </el-card>
</template>

<style lang="scss"></style>
