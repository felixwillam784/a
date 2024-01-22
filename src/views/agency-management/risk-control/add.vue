<script setup lang="ts">
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.push({ name: "AgencyRiskControl" });
};
</script>
<template>
  <div class="app-container">
    <div class="user-detail-header" style="margin-bottom: 15px">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
    <el-card>
      <el-row :gutter="20" style="display: flex; justify-content: space-between">
        <el-form :inline="true" label-width="120">
          <div>
            <el-form-item label="用户账号">
              <el-input placeholder="请输入代理用户账号" />
            </el-form-item>
            <el-form-item label="邮箱账号">
              <el-input placeholder="请输入代理邮箱账号" />
            </el-form-item>
            <el-form-item label="身份信息">
              <el-input placeholder="请输入身份信息号" />
            </el-form-item>
          </div>
        </el-form>
        <div>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </div>
      </el-row>
      <el-row :gutter="20" style="display: flex; justify-content: space-between">
        <el-form :inline="true" label-width="120">
          <el-form-item label="IP地址">
            <el-input placeholder="请输入IP地址" />
          </el-form-item>
          <el-form-item label="设备ID">
            <el-input placeholder="请输入设备ID" />
          </el-form-item>
          <el-form-item label="支付账号">
            <el-input placeholder="请输入支付账号" />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row :gutter="20" style="display: flex; justify-content: space-between">
        <el-form :inline="true" label-width="120">
          <el-form-item label="标签">
            <el-input placeholder="请输入代理用户标签" />
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table>
        <el-table-column label="代理用户账号" align="center">
          <template #header>
            <el-checkbox></el-checkbox>
            代理用户账号
          </template>
        </el-table-column>
        <el-table-column label="用户标签" align="center" />
        <el-table-column label="IP地址" align="center">
          <template #defaul>
            <p class="color-red"></p>
          </template>
        </el-table-column>
        <el-table-column label="设备ID" align="center" />
        <el-table-column label="支付账号" align="center" />
        <el-table-column label="代理人数" align="center" />
        <el-table-column label="一级充值率" align="center" />
        <el-table-column label="一级复充率" align="center" />
        <el-table-column label="一级充值金额" align="center" />
        <el-table-column label="备注" align="center" />
      </el-table>
    </el-card>
    <div style="justify-content: center; display: flex; margin-top: 30px">
      <el-button type="primary">确认</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>
<style lang="scss">
.color-red {
  color: red;
}
</style>
