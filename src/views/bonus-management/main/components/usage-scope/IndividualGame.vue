<script setup lang="ts">
import { ref } from "vue";

interface GameGroup {
  channel_name: string;
  games: Array<GameInChannel>;
}
interface GameInChannel {
  game_id: number;
  game_name: string;
  game_category: string;
  game_provider: string;
  game_state: string;
}

const game_group_list = ref<Array<GameGroup>>([
  {
    channel_name: "PGSoft",
    games: [
      {
        game_id: 1002,
        game_name: "Dice",
        game_category: "Casino",
        game_provider: "自研",
        game_state: "启用",
      },
    ],
  },
  {
    channel_name: "PragmaticPlay",
    games: [
      {
        game_id: 1003,
        game_name: "Dice",
        game_category: "Casino",
        game_provider: "自研",
        game_state: "启用",
      },
      {
        game_id: 1004,
        game_name: "Dice",
        game_category: "Casino",
        game_provider: "自研",
        game_state: "启用",
      },
    ],
  },
]);
</script>
<template>
  <el-collapse>
    <el-collapse-item v-for="(item, index) in game_group_list" :key="index">
      <template #title>
        <el-checkbox style="margin-right: 10px"> </el-checkbox>
        {{ item.channel_name }} ({{ item.games.length }})
      </template>
      <template #default>
        <div style="padding-left: 30px">
          <div
            style="display: flex; align-items: center; gap: 5px"
            v-for="(it, ind) in item.games"
            :key="ind"
          >
            <el-checkbox></el-checkbox>
            <p v-for="(value, field) in it" :key="field">{{ value }}</p>
          </div>
        </div>
      </template>
    </el-collapse-item>
  </el-collapse>
</template>
<style lang="scss"></style>
