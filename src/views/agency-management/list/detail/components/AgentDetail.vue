<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
</script>

<template>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="所有下级人数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="归属上级:">
        <el-link :underline="false" class="el-link-decoration">
          aaaaaaaaaa
        </el-link>
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="账号风控状态:">
        <font color="red">警告</font>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理充值金额总和:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="下级提现总和:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理总盈亏:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="充值人数总和:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="下级投注总金额:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="投注返利总金额:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理邀请奖励:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理成就奖励:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理状态:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="昨日返佣金额:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理最后取款间隔天数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理最后邀请间隔天数:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理注册人数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理注册人数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理注册人数:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理充值人数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理充值人数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理充值人数:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理充值金额:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理充值金额:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理充值金额:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理提现金额:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理提现金额:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理提现金额:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理充提差:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理充提差:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理充提差:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理投注返佣:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理投注返佣:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理投注返佣:">8888</el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理风控人数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理风控人数:">8888</el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理风控人数:">8888</el-form-item>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.agent-detail-row-1 {
  margin-bottom: 10px;
  background: #aaa;
  align-items: center;
  height: 50px;
  .el-form-item--default {
    margin-bottom: 0px !important;
  }
  .el-form-item__label {
    font-size: 16px;
    font-weight: 700;
  }
}
.agent-detail-row-2 {
  margin-bottom: 10px;
  background: #ccc;
  align-items: center;
  height: 50px;
  .el-form-item--default {
    margin-bottom: 0px !important;
  }
  .el-form-item__label {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
