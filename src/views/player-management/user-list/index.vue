<script setup lang="ts">
import { ref, computed } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

import useStore from "@/store";

import { onMounted } from "vue";
import type * as Player from "@/interface/player";

const router = useRouter();
const { player } = useStore();

const formData = ref<any>({
  uid: "",
  nickname: "",
  user_type: "",
  invitation_code: "",
  tags: "",
  vip_level: 0,
  phone: "",
  cpf: "",
  account_number: "",
  page_num: 1,
  page_size: 10,
});

const loading = ref<boolean>(false);

const total = computed(() => {
  return Math.ceil(player.getTotalNumber / 10);
});

const customerList = computed(() => {
  return player.getUserList;
});

const { user } = useStore();

onMounted(async () => {});

const handleQuery = async () => {
  formData.page_num = 1;
  formData.page_size = 20;
  data.value = [];
  disabled.value = false;
  page.value = 0;
  await load();
};

const resetQuery = async () => {
  for (let property in formData.value) {
    if (formData.value.hasOwnProperty(property)) {
      formData.value[property] = "";
    }
  }
  formData.value.vip_level = 0;
  formData.value.page_num = 1;
  formData.value.page_size = 20;
  data.value = [];
  await player.dispatchGetUserList(formData.value);
  data.value = data.value.concat(customerList.value);
};

const prohibitWithdrawal = async (id: number) => {
  await player.dispatchProhibitWithdrawal({ user_id: id });
  formData.value.vip_level = 0;
  formData.value.page_num = 1;
  formData.value.page_size = 20;
  data.value = [];
  await player.dispatchGetUserList(formData.value);
  data.value = data.value.concat(customerList.value);
};

const addBlackList = async (id: number) => {
  await player.dispatchAddBlackList({ user_id: id });
  formData.value.vip_level = 0;
  formData.value.page_num = 1;
  formData.value.page_size = 20;
  data.value = [];
  await player.dispatchGetUserList(formData.value);
  data.value = data.value.concat(customerList.value);
};

const goCustomerDetailPage = (id: string) => {
  router.push({ name: "UserDetail", params: { id: id } });
};

const disabled = ref(false);
const page = ref(0);
const data = ref<Array<Player.GetUserData>>([]);
const load = async () => {
  if (disabled.value) return;
  loading.value = true;
  page.value++;
  console.log(page.value);
  if (page.value <= total.value || !total.value) {
    formData.value.page_num = page.value;
    await player.dispatchGetUserList(formData.value);
    data.value = data.value.concat(customerList.value);
  }

  if (page.value === total.value) {
    disabled.value = true;
  }
  loading.value = false;
};
// @click="router.push({ name: 'User Detail' })"
</script>
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search">
          <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
            <el-form-item label="客户账号" prop="uid">
              <el-input v-model="formData.uid" placeholder="请输入客户账号" clearable />
            </el-form-item>
            <el-form-item label="客户昵称" prop="nickname">
              <el-input
                v-model="formData.nickname"
                placeholder="请输入客户昵称"
                clearable
              />
            </el-form-item>
            <el-form-item label="客户类型" prop="user_type">
              <el-select
                v-model="formData.user_type"
                placeholder="请选择客户类型"
                clearable
              >
                <el-option label="普通玩家" value="1" />
                <el-option label="测试账号" value="2" />
                <el-option label="推广账号" value="3" />
                <el-option label="KOL" value="4" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
            <el-form-item label="邀请码" prop="invitation_code">
              <el-input
                v-model="formData.invitation_code"
                placeholder="请输入用户邀请码"
                clearable
              />
            </el-form-item>
            <el-form-item label="客户标签" prop="tags">
              <el-input v-model="formData.tags" placeholder="请输入客户标签" clearable />
            </el-form-item>
            <el-form-item label="VIP等级" prop="vip_level">
              <el-input
                v-model="formData.vip_level"
                placeholder="请输入VIP等级"
                clearable
                :value="formData.vip_level == 0 ? '' : formData.vip_level"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="handleQuery"
                >搜索</el-button
              >
              <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入手机号" clearable />
            </el-form-item>
            <el-form-item label="CPF" prop="cpf">
              <el-input v-model="formData.cpf" placeholder="请输入用户CPF" clearable />
            </el-form-item>
            <el-form-item label="银行卡号" prop="account_number">
              <el-input
                v-model="formData.account_number"
                placeholder="请输入银行卡号"
                clearable
              />
            </el-form-item>
          </el-form>
        </div>
        <el-card>
          <el-table
            v-el-table-infinite-scroll="load"
            :infinite-scroll-disabled="disabled"
            :data="data"
            style="width: 100%; height: 650px"
            v-loading="loading"
          >
            <el-table-column label="用户昵称" align="center" prop="nickname" width="160">
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                >
                  {{ scope.row.nickname }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="用户账号" align="center" prop="uid" width="160">
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                  @click="goCustomerDetailPage(scope.row.id)"
                >
                  {{ scope.row.uid }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="用户ID" align="center" prop="id" width="200">
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                  @click="goCustomerDetailPage(scope.row.id)"
                >
                  {{ scope.row.id }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="用户类型" width="100" align="center" prop="user_type">
              <template #default="scope">
                {{
                  scope.row.user_type == 1
                    ? "普通玩家"
                    : scope.row.user_type == 2
                    ? "测试账号"
                    : scope.row.user_type === 3
                    ? "推广账号"
                    : "KOL"
                }}
              </template>
            </el-table-column>
            <el-table-column label="VIP等级" width="120" align="center" prop="vip_level">
              <template #default="scope">
                {{ "VIP" + scope.row.vip_level }}
              </template>
            </el-table-column>
            <el-table-column label="账号状态" align="center" prop="user_status">
              <template #default="scope">
                {{
                  scope.row.user_status == 1
                    ? "激活"
                    : scope.row.user_status == 2
                    ? " 禁用"
                    : "删除"
                }}
              </template>
            </el-table-column>
            <el-table-column
              label="禁止提现"
              align="center"
              prop="account_withdrawal_prohibit"
            >
              <template #default="scope">
                {{ scope.row.account_withdrawal_prohibit == 1 ? "提现正常" : "提现封禁" }}
              </template>
            </el-table-column>
            <el-table-column
              label="冻结状态"
              align="center"
              prop="idnumber_withdrawal_prohibit"
            >
              <template #default="scope">
                {{
                  scope.row.idnumber_withdrawal_prohibit == 1
                    ? "正常"
                    : scope.row.idnumber_withdrawal_prohibit == 2
                    ? "冻结"
                    : "自我冻结"
                }}
              </template>
            </el-table-column>
            <el-table-column label="用户标记" align="center" prop="mark" width="180">
            </el-table-column>
            <el-table-column
              label="注册时间"
              align="center"
              prop="created_at"
              width="180"
            >
              <template #default="scope">
                {{
                  new Date(scope.row.created_at * 1000)
                    .toISOString()
                    .replace(/T/, " ")
                    .replace(/\..+/, "")
                }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250" fixed="right">
              <template #default="scope">
                <el-button type="primary" link @click="goCustomerDetailPage(scope.row.id)"
                  >详情</el-button
                >
                <el-button
                  :type="
                    scope.row.account_withdrawal_prohibit == 1 ? 'danger' : 'success'
                  "
                  link
                  @click="prohibitWithdrawal(scope.row.id)"
                  >{{
                    scope.row.account_withdrawal_prohibit == 1 ? "提现封禁" : "提现正常"
                  }}</el-button
                >
                <el-button
                  :type="scope.row.user_status == 1 ? 'danger' : 'success'"
                  link
                  @click="addBlackList(scope.row.id)"
                  >{{ scope.row.user_status == 1 ? "拉黑" : "取消拉黑" }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
  background: #f5f7fa !important;
  height: 100px !important;
}

.el-table:not(.el-table--border) .el-table__cell {
  border-right: none;
  height: 50px;
}
.el-scrollbar__wrap {
  ///height: 500px !important;
}
</style>
