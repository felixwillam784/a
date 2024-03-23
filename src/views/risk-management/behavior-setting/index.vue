<script lang="ts" setup>
import { ref, onMounted, computed, onUpdated, watch } from "vue";
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import BehaviorSetting from "./components/BehaviorSetting.vue";
import LevelSetting from "./components/LevelSetting.vue";

const router = useRouter();

const activeButton = ref<number>(0);

const handleButtonActive = (index: number) => {
  activeButton.value = index;
};

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="app-container">
    <div class="risk-add-header">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
    <el-card>
      <div class="risk-add-body">
        <div>
          <el-button
            :type="activeButton == 0 ? 'warning' : ''"
            @click="handleButtonActive(0)"
          >
            风控行为设置
          </el-button>
          <el-button
            :type="activeButton == 1 ? 'warning' : ''"
            @click="handleButtonActive(1)"
          >
            风控等级设置
          </el-button>
        </div>
        <div style="margin-left: auto">
          <el-button>修改日志</el-button>
          <el-button>Excel导入</el-button>
          <el-button>Excel导出</el-button>
        </div>
      </div>
      <BehaviorSetting v-if="activeButton == 0" />
      <LevelSetting v-if="activeButton == 1" />
    </el-card>
  </div>
</template>

<style lang="scss">
.risk-add-header {
  padding: 20px;
  display: flex;
  align-items: center;
}

.risk-add-body {
  display: flex;
  align-items: center;
}
</style>
