<script setup lang="ts">
import { ref } from "vue";

const for_op = ref<Array<boolean>>([false, false, false]);
const op_select_btn_clicked = (index: number) => {
  for_op.value[index] = !for_op.value[index];
  if (for_op.value[index] && index != 1) for_op.value[Math.abs(2 - index)] = false;
};
</script>
<template>
  <div class="dl_row">
    <p style="width: 20%">奖金类型</p>
    <el-select style="width: 70%" placeholder="请选择奖金类型"></el-select>
  </div>
  <div class="dl_row">
    <p style="width: 20%">奖金名称</p>
    <el-input style="width: 70%" placeholder="请输入奖金名字"></el-input>
  </div>
  <div class="dl_row">
    <p style="width: 20%">奖金描述</p>
    <el-input style="width: 70%" placeholder="请输入奖金描述"></el-input>
  </div>
  <div class="dl_row">
    <p style="width: 20%">奖金数额</p>
    <div style="width: 70%; display: flex">
      <el-radio-group class="ml-4" style="width: 60%">
        <el-radio label="1">固定金额</el-radio>
        <el-radio label="2">百分比</el-radio>
      </el-radio-group>
      <el-input placeholder="请输入奖金金额"></el-input>
    </div>
  </div>
  <div class="dl_row">
    <p style="width: 20%">奖金上限</p>
    <el-input style="width: 70%" placeholder="请输入奖金上限"></el-input>
  </div>
  <div class="dl_row">
    <p style="width: 20%">奖金打码倍率</p>
    <el-input style="width: 70%" placeholder="请输入打码倍率"></el-input>
  </div>
  <div class="dl_row">
    <p style="width: 20%">奖金任务失败条件值</p>
    <el-input style="width: 70%" placeholder="请输入任务失败条件值"></el-input>
    %
  </div>
  <div class="dl_row">
    <p style="width: 20%">打码任务时效</p>
    <el-input style="width: 70%" placeholder="请输入打码任务时效"></el-input>
    天
  </div>
  <div class="dl_row">
    <p style="width: 20%">打码任务失效时间</p>
    <el-date-picker style="width: 70%" placeholder="请输入打码任务时效"></el-date-picker>
  </div>
  <div class="dl_row">
    <p style="width: 20%">奖金使用的VIP限制</p>
    <el-input style="width: 70%" placeholder="请输入奖金使用的VIP限制"></el-input>
  </div>
  <div class="dl_row">
    <p style="width: 20%">打码有效条件</p>
    <div style="width: 70%; display: flex">
      <el-radio-group class="ml-4" style="width: 60%">
        <el-radio label="1">投注倍率</el-radio>
        <el-radio label="2">结算倍率</el-radio>
      </el-radio-group>
      <div style="display: flex">
        <el-button :type="for_op[0] ? 'warning' : ''" @click="op_select_btn_clicked(0)"
          >&lt;</el-button
        >
        <el-button :type="for_op[1] ? 'warning' : ''" @click="op_select_btn_clicked(1)"
          >=</el-button
        >
        <el-button :type="for_op[2] ? 'warning' : ''" @click="op_select_btn_clicked(2)"
          >&gt;</el-button
        >
        <el-input placeholder="请输入条件值" style="margin-left: 10px"></el-input>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.dl_row:nth-child(2n + 1) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n) {
  /* Style for even elements in the group */
  background-color: #ccc;
}
</style>
