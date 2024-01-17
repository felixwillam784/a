<script setup lang="ts">
import { ref } from "vue";
import GameType from "./usage-scope/GameType.vue";
import GameChannel from "./usage-scope/GameChannel.vue";
import IndividualGame from "./usage-scope/IndividualGame.vue";

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};
</script>
<template>
  <div style="border: 1px solid black; padding: 10px; margin-bottom: 50px">
    <div style="display: flex">
      <p>已选择的使用分类</p>
      <div style="display: flex; align-items: center; margin-left: 20px">Originals</div>
    </div>
    <div style="display: flex">
      <p>已选择的使用渠道</p>
      <div style="display: flex; align-items: center; margin-left: 20px">PGSoft</div>
    </div>
    <div style="display: flex">
      <p>已选择的使用游戏</p>
      <div style="display: flex; align-items: center; margin-left: 20px">1001</div>
    </div>
  </div>

  <div>
    <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
      >游戏分类</el-button
    >
    <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
      >游戏渠道</el-button
    >
    <el-button :type="tab_index == 2 ? 'warning' : ''" @click="select_tab(2)"
      >具体游戏</el-button
    >
  </div>
  <div>
    <GameType v-if="tab_index == 0" />
    <GameChannel v-if="tab_index == 1" />
    <IndividualGame v-if="tab_index == 2" />
  </div>
</template>
<style lang="scss"></style>
