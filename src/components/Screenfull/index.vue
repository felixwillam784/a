<template>
  <div>
    <span style="margin-right: 10px;">今天：{{utcYear}}年{{Number(utcMonth)+1}}月{{utcDate}}日 UTC时间：{{ utcHour }}:{{ utcMinute }}:{{ utcSecond }}</span>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggle"
    />
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { ref, watchEffect } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const { isFullscreen, toggle } = useFullscreen();

const utcYear = ref<number>();
const utcDate = ref<number>();
const utcMonth = ref<number>();
const utcHour = ref<number>();
const utcMinute = ref<number>();
const utcSecond = ref<number>();

setInterval(function(){
  const d3 = new Date();
  d3.toUTCString();

  const d4 = new Date( d3.getUTCFullYear(), d3.getUTCMonth(), d3.getUTCDate(), d3.getUTCHours(), d3.getUTCMinutes(), d3.getUTCSeconds() );

  utcYear.value =  d4.getUTCFullYear()
  utcDate.value =  d4.getUTCDate()
  utcMonth.value =  d4.getUTCMonth()
  utcHour.value =  d4.getUTCHours()
  utcMinute.value =  d4.getUTCMinutes()
  utcSecond.value =  d4.getUTCSeconds()
}.bind(this), 1000)
</script>
