<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import TestAccountDetail from "./components/TestAccountDetail.vue";
import ParticipateGameSetting from "./components/ParticipateGameSetting.vue";
import FundDetail from "./components/FundDetail.vue";
import BettingRecord from "./components/BettingRecord.vue";
import RegistrationRecord from "./components/RegistrationRecord.vue";

const router = useRouter();

const activeNames = ref(["1"]);
const activeIndex = ref<number>(0);
const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <div class="app-container">
    <el-row class="justify-between">
      <el-button type="danger" :icon="ArrowLeft" @click="router.go(-1)">返回</el-button>
      <div>
        <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
          测试账号详情
        </el-button>
        <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
          参与游戏设定
        </el-button>
        <el-button :type="activeIndex == 2 ? 'warning' : ''" @click="handleBtnTab(2)">
          资金明细
        </el-button>
        <el-button :type="activeIndex == 3 ? 'warning' : ''" @click="handleBtnTab(3)">
          投注记录
        </el-button>
        <el-button :type="activeIndex == 4 ? 'warning' : ''" @click="handleBtnTab(4)">
          登录记录
        </el-button>
      </div>
    </el-row>
    <el-card class="mt-2">
      <TestAccountDetail v-if="activeIndex == 0" />
      <ParticipateGameSetting v-if="activeIndex == 1" />
      <FundDetail v-if="activeIndex == 2" />
      <BettingRecord v-if="activeIndex == 3" />
      <RegistrationRecord v-if="activeIndex == 4" />
    </el-card>
  </div>
</template>

<style lang="scss"></style>
