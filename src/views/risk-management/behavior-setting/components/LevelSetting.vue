<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
</script>

<template>
  <el-row class="level-setting-row-1">
    <el-input value="注册IP风控（1）" style="width: 200px" />
  </el-row>
  <el-row class="level-setting-row-2">
    <el-checkbox-group>
      <el-checkbox label="禁止领取奖金" />
      <el-checkbox label="禁止进入游戏" />
      <el-checkbox label="禁止提现" />
      <el-checkbox label="禁止登录" />
    </el-checkbox-group>
  </el-row>
  <el-row class="level-setting-row-1">
    <el-input value="设备IP风控" style="width: 200px" />
  </el-row>
  <el-row class="level-setting-row-2">
    <el-checkbox-group>
      <el-checkbox label="禁止领取奖金" />
      <el-checkbox label="禁止进入游戏" />
      <el-checkbox label="禁止提现" />
      <el-checkbox label="禁止登录" />
    </el-checkbox-group>
  </el-row>
  <el-row class="level-setting-row-1">
    <el-input value="同登录密码风控" style="width: 200px" />
  </el-row>
  <el-row class="level-setting-row-2">
    <el-checkbox-group>
      <el-checkbox label="禁止领取奖金" />
      <el-checkbox label="禁止进入游戏" />
      <el-checkbox label="禁止提现" />
      <el-checkbox label="禁止登录" />
    </el-checkbox-group>
  </el-row>
  <el-row class="level-setting-row-1">
    <el-input value="注册IP风控（2）" style="width: 200px" />
  </el-row>
  <el-row class="level-setting-row-2">
    <el-checkbox-group>
      <el-checkbox label="禁止领取奖金" />
      <el-checkbox label="禁止进入游戏" />
      <el-checkbox label="禁止提现" />
      <el-checkbox label="禁止登录" />
    </el-checkbox-group>
  </el-row>
  <el-row class="level-setting-row-1">
    <el-input placeholder="请输入新增等级名字" style="width: 200px" />
  </el-row>
  <el-row class="level-setting-row-2">
    <el-checkbox-group>
      <el-checkbox label="禁止领取奖金" />
      <el-checkbox label="禁止进入游戏" />
      <el-checkbox label="禁止提现" />
      <el-checkbox label="禁止登录" />
      <el-checkbox>
        <el-input placeholder="请输入新增处罚机制"></el-input>
      </el-checkbox>
    </el-checkbox-group>
  </el-row>
  <div class="text-center mt-4">
    <el-button type="primary"> 确认 </el-button>
    <el-button>取消</el-button>
  </div>
</template>

<style lang="scss">
.level-setting-row-1 {
  margin: 8px 0px;
  padding: 10px;
  background: gray;
}

.level-setting-row-2 {
  margin: 8px 0px;
  padding: 10px;
  background: #e4e4e4;
}
</style>
