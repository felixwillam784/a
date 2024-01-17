<script setup lang="ts">
import { ref } from "vue";

interface GameType {
  type_name: string;
  games: Array<string>;
}

const game_type_list = ref<Array<GameType>>([
  {
    type_name: "Casino",
    games: ["Originals", "Slots", "Live Casino", "Table Games"],
  },
  {
    type_name: "Sports",
    games: [
      "Live Events",
      "Soccer",
      "Tennis",
      "Basket",
      "Cricket",
      "FIFA",
      "American Football",
      "Ice Hockey",
      "Baseball",
      "Handball",
    ],
  },
]);
</script>
<template>
  <el-collapse>
    <el-collapse-item v-for="(item, index) in game_type_list" :key="index">
      <template #title>
        <el-checkbox style="margin-right: 10px"> </el-checkbox>
        {{ item.type_name }}
      </template>
      <template #default>
        <div style="display: flex; flex-wrap: wrap; gap: 15px; padding-left: 30px">
          <div
            style="display: flex; align-items: center; gap: 5px"
            v-for="(it, ind) in item.games"
            :key="ind"
          >
            <el-checkbox></el-checkbox>
            <p>{{ it }}</p>
          </div>
        </div>
      </template>
    </el-collapse-item>
  </el-collapse>
</template>
<style lang="scss"></style>
