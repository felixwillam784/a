<script setup lang="ts"></script>
<template>
  <div style="margin-top: 30px">
    <div class="dl_row">
      <el-input value="预警" style="width: 10%"></el-input>
    </div>
    <div class="dl_row" style="justify-content: space-between">
      <el-checkbox-group>
        <el-checkbox label="禁止领取优惠" />
        <el-checkbox label="禁止参与存款活动" />
        <el-checkbox label="禁止进入游戏" />
        <el-checkbox label="禁止提现" />
        <el-checkbox label="禁止登录" />
      </el-checkbox-group>
      <el-button>+</el-button>
    </div>

    <div class="dl_row">
      <el-input value="禁止提现" style="width: 10%"></el-input>
    </div>
    <div class="dl_row" style="justify-content: space-between">
      <el-checkbox-group>
        <el-checkbox label="禁止领取优惠" />
        <el-checkbox label="禁止参与存款活动" />
        <el-checkbox label="禁止进入游戏" />
        <el-checkbox label="禁止提现" />
        <el-checkbox label="禁止登录" />
      </el-checkbox-group>
      <el-button>+</el-button>
    </div>

    <div class="dl_row">
      <el-input value="禁止登录" style="width: 10%"></el-input>
    </div>
    <div class="dl_row" style="justify-content: space-between">
      <el-checkbox-group>
        <el-checkbox label="禁止领取优惠" />
        <el-checkbox label="禁止参与存款活动" />
        <el-checkbox label="禁止进入游戏" />
        <el-checkbox label="禁止提现" />
        <el-checkbox label="禁止登录" />
      </el-checkbox-group>
      <el-button>+</el-button>
    </div>

    <div class="dl_row">
      <el-input placeholder="请输入新增等级名称" style="width: 10%"></el-input>
    </div>
    <div class="dl_row" style="justify-content: space-between">
      <el-checkbox-group>
        <el-checkbox label="禁止领取优惠" />
        <el-checkbox label="禁止参与存款活动" />
        <el-checkbox label="禁止进入游戏" />
        <el-checkbox label="禁止提现" />
        <el-checkbox label="禁止登录" />
        <el-checkbox label="禁止登录"
          ><el-input placeholder="请输入新增处罚机制"></el-input
        ></el-checkbox>
      </el-checkbox-group>
      <el-button>+</el-button>
    </div>
  </div>
  <div style="justify-content: center; display: flex; margin-top: 30px">
    <el-button type="primary">确认</el-button>
    <el-button>取消</el-button>
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
.dl_row:nth-child(2n) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n + 1) {
  /* Style for even elements in the group */
  background-color: #ccc;
}
</style>
