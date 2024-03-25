<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BehaviorSetting from "./components/BehaviorSetting.vue";
import PunishmentMeasures from "./components/PunishmentMeasures.vue";

const router = useRouter();

const activeIndex = ref<number>(0);

const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <div class="app-container">
    <el-card class="mt-4">
      <div class="flex items-center">
        <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
          <div>个人风控列表</div>
        </el-button>
        <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
          个人风控白名单
        </el-button>
      </div>
      <div class="mt-2">
        <BehaviorSetting v-if="activeIndex == 0" />
        <PunishmentMeasures v-if="activeIndex == 1" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss"></style>
