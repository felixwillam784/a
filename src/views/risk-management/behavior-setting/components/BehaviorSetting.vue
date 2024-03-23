<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
</script>

<template>
  <el-row class="behavior-setting-row-1">同注册IP</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">同一个IP注册账号</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select style="margin-left: 10px"></el-select>
    </el-col>
  </el-row>
  <el-row class="behavior-setting-row-1">同登录IP</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">同一个IP登录账号</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入账号数量" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px" placeholder="请选择处罚范围"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select
        style="margin-left: 10px"
        placeholder="请选择处罚方式，默认不处罚"
      ></el-select>
    </el-col>
  </el-row>
  <el-row class="behavior-setting-row-1">同设备ID</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">同设备ID登录账号</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入账号数量" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px" placeholder="请选择处罚范围"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select
        style="margin-left: 10px"
        placeholder="请选择处罚方式，默认不处罚"
      ></el-select>
    </el-col>
  </el-row>
  <el-row class="behavior-setting-row-1">同登录密码</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">使用同一个登录密码登录账号</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入账号数量" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px" placeholder="请选择处罚范围"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select
        style="margin-left: 10px"
        placeholder="请选择处罚方式，默认不处罚"
      ></el-select>
    </el-col>
  </el-row>
  <el-row class="behavior-setting-row-1">同姓名</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">用户信息使用相同的姓名</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入账号数量" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px" placeholder="请选择处罚范围"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select
        style="margin-left: 10px"
        placeholder="请选择处罚方式，默认不处罚"
      ></el-select>
    </el-col>
  </el-row>
  <el-row class="behavior-setting-row-1">同身份信息</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">用户信息的cpf号相同</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入账号数量" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px" placeholder="请选择处罚范围"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select
        style="margin-left: 10px"
        placeholder="请选择处罚方式，默认不处罚"
      ></el-select>
    </el-col>
  </el-row>
  <el-row class="behavior-setting-row-1">同手机号</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">用户信息的手机号相同</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入账号数量" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px" placeholder="请选择处罚范围"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select
        style="margin-left: 10px"
        placeholder="请选择处罚方式，默认不处罚"
      ></el-select>
    </el-col>
  </el-row>
  <el-row class="behavior-setting-row-1">同银行卡号</el-row>
  <el-row class="behavior-setting-row-2">
    <el-col :span="6">用户信息的银行卡号相同</el-col>
    <el-col :span="6" class="d-flex align-center">
      数量大于
      <el-input style="width: 200px; margin-left: 10px" placeholder="请输入账号数量" />
    </el-col>
    <el-col :span="6" class="d-flex align-center">
      处罚范围
      <el-select style="margin-left: 10px" placeholder="请选择处罚范围"></el-select>
    </el-col>
    <el-col :span="6">
      处罚方式
      <el-select
        style="margin-left: 10px"
        placeholder="请选择处罚方式，默认不处罚"
      ></el-select>
    </el-col>
  </el-row>
  <div class="text-center mt-4">
    <el-button type="primary"> 确认 </el-button>
    <el-button>取消</el-button>
  </div>
</template>

<style lang="scss">
.behavior-setting-row-1 {
  margin: 8px 0px;
  padding: 10px;
  background: gray;
}

.behavior-setting-row-2 {
  margin: 8px 0px;
  padding: 10px;
  background: #e4e4e4;
}
</style>
