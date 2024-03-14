<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { CopyDocument } from "@element-plus/icons-vue";
import { ElInput, ElMessage } from "element-plus";

import useStore from "@/store";
import moment from "moment-timezone";

import { onMounted } from "vue";
import type * as Player from "@/interface/player";

const router = useRouter();
const { player } = useStore();
//ref
const loading = ref<boolean>(false);

const formData = reactive<any>({
  uid: "",
  nickname: "",
  user_type: "",
  invitation_code: "",
  tags: "",
  vip_level: "",
  phone: "",
  cpf: "",
  account_number: "",
  create_start: "",
  create_end: "",
  page_num: 1,
  page_size: 20,
});
//computed
const userList = computed(() => {
  return player.getUserList;
});
const copyText = (str: any) => {
  navigator.clipboard.writeText(str);
  ElMessage.success("复制成功");
};
const UserTypeOptions = [
  {
    label: "普通玩家",
    value: 1,
  },
  {
    label: "测试账号",
    value: 2,
  },
  {
    label: "推广账号",
    value: 3,
  },
  {
    label: "KOL",
    value: 4,
  },
];

const handleQuery = async () => {
  loading.value = true;
  formData.page_num = 1;
  formData.page_size = 20;
  await player.dispatchGetUserList(formData);
  loading.value = false;
};

const resetQuery = async () => {
  loading.value = true;
  for (let property in formData) {
    if (formData.hasOwnProperty(property)) {
      formData[property] = "";
    }
  }
  formData.page_num = 1;
  formData.page_size = 20;
  await player.dispatchGetUserList(formData);
  loading.value = false;
};

const prohibitWithdrawal = async (id: number, account_withdrawal_prohibit: number) => {
  if (account_withdrawal_prohibit === 1)
    await player.dispatchProhibitWithdrawal({
      id: id,
      account_withdrawal_prohibit: 2,
    });
  else
    await player.dispatchProhibitWithdrawal({
      id: id,
      account_withdrawal_prohibit: 1,
    });

  await player.dispatchGetUserList(formData);
};

const addBlackList = async (id: number, account_prohibit: number) => {
  if (account_prohibit === 1)
    await player.dispatchAddBlackList({ id, account_prohibit: 2 });
  else await player.dispatchAddBlackList({ id: id, account_prohibit: 1 });
  await player.dispatchGetUserList(formData);
};

const goCustomerDetailPage = (id: string) => {
  router.push({ name: "UserDetail", params: { id: id } });
};

const handleSizeChange = async ({ page, limit }: any) => {
  formData.page_num = page;
  formData.page_size = limit;
  loading.value = true;
  await player.dispatchGetUserList(formData);
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await player.dispatchGetUserList(formData);
  loading.value = false;
});
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
                <el-option
                  v-for="item in UserTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
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
            :data="userList"
            style="width: 100%"
            v-loading="loading"
            v-horizontal-scroll
          >
            <el-table-column label="用户昵称" align="center" prop="nickname" width="160">
              <template #default="scope">
                {{ scope.row.nickname }}
                <el-button
                  link
                  v-if="scope.row.nickname"
                  @click="copyText(scope.row.nickname)"
                >
                  <el-icon>
                    <CopyDocument />
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="用户账号" align="center" prop="uid" width="200">
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                  @click="goCustomerDetailPage(scope.row.id)"
                >
                  {{ scope.row.uid }}
                </el-link>
                <el-button link v-if="scope.row.uid" @click="copyText(scope.row.uid)">
                  <el-icon>
                    <CopyDocument />
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="用户ID" align="center" prop="id" width="220">
              <template #default="scope">
                <el-link
                  :underline="false"
                  style="color: #5393e0; text-decoration-line: underline"
                  @click="goCustomerDetailPage(scope.row.id)"
                >
                  {{ scope.row.id }}
                </el-link>
                <el-button link v-if="scope.row.id" @click="copyText(scope.row.id)">
                  <el-icon>
                    <CopyDocument />
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="用户类型" width="100" align="center" prop="user_type">
              <template #default="scope">
                {{
                  UserTypeOptions.find((item) => item.value === scope.row.user_type)
                    ?.label
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
                  scope.row.account_prohibit == 1
                    ? "激活"
                    : scope.row.account_prohibit == 2
                    ? "禁用"
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
                  moment(scope.row.created_at * 1000)
                    .clone()
                    .tz("UTC")
                    .format("YYYY-MM-DD HH:mm:ss")
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
                  @click="
                    prohibitWithdrawal(
                      scope.row.id,
                      scope.row.account_withdrawal_prohibit
                    )
                  "
                  >{{
                    scope.row.account_withdrawal_prohibit == 1 ? "封禁提现" : "解除封禁"
                  }}</el-button
                >
                <el-button
                  :type="scope.row.account_prohibit == 1 ? 'danger' : 'success'"
                  link
                  @click="addBlackList(scope.row.id, scope.row.account_prohibit)"
                  >{{ scope.row.account_prohibit == 1 ? "拉黑" : "解除拉黑" }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="float: right">
            <pagination
              v-model:total="player.getTotalNumber"
              v-model:page="formData.page_num"
              v-model:limit="formData.page_size"
              @pagination="handleSizeChange"
            />
          </div>
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
