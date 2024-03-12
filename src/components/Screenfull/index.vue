<template>
  <div>
    <span style="margin-right: 10px;">今天：{{ utcYear }}年{{ utcMonthFormatted }}月{{ utcDate }}日 UTC时间：{{ utcHourFormatted }}:{{ utcMinuteFormatted }}:{{ utcSecondFormatted }}</span>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue';
import { useFullscreen } from '@vueuse/core';
import SvgIcon from '@/components/SvgIcon/index.vue';

const now = new Date();

const utcYear = ref(now.getUTCFullYear());
const utcDate = ref(now.getUTCDate());
const utcMonth = ref(now.getUTCMonth());
const utcHour = ref(now.getUTCHours());
const utcMinute = ref(now.getUTCMinutes());
const utcSecond = ref(now.getUTCSeconds());

// 确保 formatTimeUnit 能够处理 undefined 的情况
const formatTimeUnit = (unit: number | undefined): string => {
  if (typeof unit === 'undefined') {
    return '00'; // 当单位未定义时，返回 '00'
  }
  return unit < 10 ? `0${unit}` : unit.toString();
};

const utcMonthFormatted = computed(() => formatTimeUnit(utcMonth.value + 1));
const utcHourFormatted = computed(() => formatTimeUnit(utcHour.value));
const utcMinuteFormatted = computed(() => formatTimeUnit(utcMinute.value));
const utcSecondFormatted = computed(() => formatTimeUnit(utcSecond.value));

const { isFullscreen, toggle } = useFullscreen();

const updateUTCTime = () => {
  const d = new Date();
  utcYear.value = d.getUTCFullYear();
  utcDate.value = d.getUTCDate();
  utcMonth.value = d.getUTCMonth();
  utcHour.value = d.getUTCHours();
  utcMinute.value = d.getUTCMinutes();
  utcSecond.value = d.getUTCSeconds();
};

const intervalId = setInterval(updateUTCTime, 1000);

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
