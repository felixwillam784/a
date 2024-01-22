<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div class="my-2">
    <el-row class="bg-neutral-300 pa-2 h-12 align-center">
      <el-col :span="6">VIP等级设定</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入账号初始VIP等级" class="w-4/5" />
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 pa-2 h-12 align-center mt-2">
      <el-col :span="6">真金</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入真金数量" class="w-4/5" />
      </el-col>
    </el-row>
    <el-row class="bg-neutral-300 pa-2 h-12 align-center mt-2">
      <el-col :span="6">奖金</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入奖金数量" class="w-4/5" />
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 pa-2 h-12 align-center mt-2">
      <el-col :span="6">真金</el-col>
      <el-col :span="18">
        <el-radio-group>
          <el-radio :label="1">允许</el-radio>
          <el-radio :label="2"> 禁止 </el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss"></style>
