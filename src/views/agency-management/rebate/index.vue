<script setup lang="ts">
import { ref } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import RebateSetting from "./components/RebateSetting.vue";
import RebateWithdrawalStatistics from "./components/RebateWithdrawalStatistics.vue";

const router = useRouter();

const activeIndex = ref<number>(0);

const goBack = () => {
  router.go(-1);
};

const handleBtnTab = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
          代理返利设置
        </el-button>
        <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
          代理返利提现统计
        </el-button>
        <el-button class="float-right" v-if="activeIndex == 0">修改日志</el-button>
      </div>
      <div class="mt-2">
        <RebateSetting v-if="activeIndex == 0" />
        <RebateWithdrawalStatistics v-if="activeIndex == 1" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
