<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
</script>

<template>
  <el-form label-width="200px">
    <el-row class="agent-detail-row-1">
      <el-form-item label="代理使用模式:">
        <el-radio-group>
          <el-radio :label="1">下注返利模式</el-radio>
          <el-radio :label="2">客损返利模式</el-radio>
          <el-radio :label="3">无代理</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="下注返利模式"></el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="一级代理返利">
        <el-input placeholder="请输入一级代理返利">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="二级代理返利">
        <el-input placeholder="请输入二级代理返利">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="三级代理返利">
        <el-input placeholder="请输入三级代理返利">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="返利领取方式">
        <el-radio-group>
          <el-radio :label="1">玩家手动领取</el-radio>
          <el-radio :label="2">结算时自动到账</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="返利结算周期">
        <el-radio-group>
          <el-radio :label="1">实时结算</el-radio>
          <el-radio :label="2">每日刷新结算</el-radio>
          <el-radio :label="3">每周刷新结算</el-radio>
          <el-radio :label="4">每月刷新结算</el-radio>
          <el-radio :label="5">
            <el-input placeholder="请输入天数" />天后刷新结算
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="奖励释放周期">
        <el-radio-group>
          <el-radio :label="1">不释放</el-radio>
          <el-radio :label="5">
            释放
            <el-input placeholder="请输入自动释放天数" />
            天后释放
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="打码倍率">
        <el-input placeholder="请输入打码倍率" />
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="客损返利模式">
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="一级代理返利">
        <el-input placeholder="请输入一级代理返利">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="二级代理返利">
        <el-input placeholder="请输入二级代理返利">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="三级代理返利">
        <el-input placeholder="请输入三级代理返利">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="返利领取方式">
        <el-radio-group>
          <el-radio :label="1">玩家手动领取</el-radio>
          <el-radio :label="2">结算时自动到账</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="返利结算周期">
        <el-radio-group>
          <el-radio :label="1">实时结算</el-radio>
          <el-radio :label="2">每日刷新结算</el-radio>
          <el-radio :label="3">每周刷新结算</el-radio>
          <el-radio :label="4">每月刷新结算</el-radio>
          <el-radio :label="5">
            <el-input placeholder="请输入天数" />天后刷新结算
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="奖励释放周期">
        <el-radio-group>
          <el-radio :label="1">不释放</el-radio>
          <el-radio :label="5">
            释放
            <el-input placeholder="请输入自动释放天数" />
            天后释放
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="打码倍率">
        <el-input placeholder="请输入打码倍率" />
      </el-form-item>
    </el-row>
    <el-row class="justify-center">
      <el-button type="primary">确认</el-button>
      <el-button>取消</el-button>
    </el-row>
  </el-form>
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
