<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
</script>

<template>
  <el-row class="bg-neutral-300 punishment-measure-row">
    <el-col :span="4">ID</el-col>
    <el-col :span="4">风控处罚等级</el-col>
    <el-col :span="16">风控处罚等级说明</el-col>
  </el-row>
  <!-- <el-row class="bg-neutral-100 punishment-measure-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      登录IP风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row> -->
</template>

<style lang="scss">
.punishment-measure-row {
  margin: 8px 0px;
  padding: 10px;
}
</style>
