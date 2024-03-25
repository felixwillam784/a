<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const loading = ref<boolean>(false);
const riskControlDetailDialogVisible = ref<boolean>(false);
const riskControlRemoveDialogVisible = ref<boolean>(false);

const total_count = ref<number>(0);

const firstLevelAgentList = ref<Array<any>>([
  {
    item_1: "User001",
    item_2: 9999,
    item_3: 9999,
    item_4: 9999,
  },
]);

const handlePagination = () => {};

const handleRiskControlDetailShow = () => {
  riskControlDetailDialogVisible.value = true;
};

const handleSelectionChange = (val: Array<any>) => {};
</script>

<template>
  <el-table
    v-loading="loading"
    :data="firstLevelAgentList"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    class="mt-2"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="用户ID" align="center" prop="item_1">
      <template #default="scope">
        <el-link :underline="false" class="el-link-decoration">
          {{ scope.row.item_1 }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="用户标签" align="center" prop="item_2">
      <template #default="scope">
        <p>{{ scope.row.item_2 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控行为" align="center" prop="item_3">
      <template #default="scope">
        <p>{{ scope.row.item_3 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控处罚措施" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="VIP等级 VIP段位" align="center" prop="item_4" width="80">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="充值次数 提现次数" align="center" prop="item_4" width="80">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="货币类型" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="充值金额 提现金额" align="center" prop="item_4" width="80">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="充提差" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="累计投注金额" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作人员" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控时间" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控备注" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="200" fixed="right">
      <template #default="scope">
        <el-button type="primary" link @click="handleRiskControlDetailShow">
          详情
        </el-button>
        <el-dropdown>
          <el-button
            type="primary"
            link
            style="width: 40px"
            class="personal-risk-control-dropdown"
          >
            修改风控
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>禁止领取奖金</el-dropdown-item>
              <el-dropdown-item>提现拒绝</el-dropdown-item>
              <el-dropdown-item>禁止提现</el-dropdown-item>
              <el-dropdown-item>禁止提现（扣款不打款）</el-dropdown-item>
              <el-dropdown-item>禁止游戏</el-dropdown-item>
              <el-dropdown-item>禁止登录（黑名单）</el-dropdown-item>
              <el-dropdown-item>解除所有风控</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="primary" link> 日志 </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="float: right">
    <pagination
      :total="total_count"
      v-model:page="formData.pageNum"
      v-model:limit="formData.pageSize"
      @pagination="handlePagination"
    />
  </div>
  <el-dialog title="个人风控详情" v-model="riskControlDetailDialogVisible">
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">UserID</el-col>
      <el-col :span="18">
        <el-link :underline="false" class="el-link-decoration"> User001 </el-link>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">账号风控状态</el-col>
      <el-col :span="18">
        <el-select placeholder="请选择同注册IP风控">
          <!-- <el-option>同注册IP风控</el-option> -->
        </el-select>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">邮箱账号</el-col>
      <el-col :span="8" class="flex align-center">
        <el-link :underline="false" class="el-link-decoration"> 12346@gmail.com </el-link>
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        同邮箱注册账号数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">身份信息</el-col>
      <el-col :span="8" class="flex align-center">
        123234234234
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        同身份信息账号数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">玩家真实姓名</el-col>
      <el-col :span="8" class="flex align-center">
        James Bond
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8"> 相同姓名账号数量: <span class="text-red-400">999</span> </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">注册IP地址</el-col>
      <el-col :span="8" class="flex align-center">
        192.181.1.10
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        相同注册IP地址账户数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">登录IP地址（最近）</el-col>
      <el-col :span="8" class="flex align-center">
        192.181.1.10
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        相同IP地址登录账户数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">注册设备ID</el-col>
      <el-col :span="8" class="flex align-center">
        192.181.1.10
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        相同设备ID注册账户数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">登录设备ID（最近）</el-col>
      <el-col :span="8" class="flex align-center">
        192.181.1.10
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        相同设备ID登录账户数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">登录密码</el-col>
      <el-col :span="8" class="flex align-center">
        *********
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        相同登录密码账户数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">手机号码</el-col>
      <el-col :span="8" class="flex align-center">
        13245455567
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8"> 相同手机账户数量: <span class="text-red-400">999</span> </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">银行卡号</el-col>
      <el-col :span="8" class="flex align-center">
        1324545556756565
        <el-button :icon="CopyDocument" class="ms-1" link></el-button>
      </el-col>
      <el-col :span="8">
        相同银行卡号账户数量: <span class="text-red-400">999</span>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">充值次数</el-col>
      <el-col :span="18" class="flex align-center"> 10 </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">提现次数</el-col>
      <el-col :span="18" class="flex align-center"> 20 </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">充提差</el-col>
      <el-col :span="18" class="flex align-center"> -200 </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">充值金额</el-col>
      <el-col :span="18" class="flex align-center"> 200 </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">提现金额</el-col>
      <el-col :span="18" class="flex align-center"> 300 </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">风控时间</el-col>
      <el-col :span="18" class="flex align-center"> 2023-09-09 23:09:09 </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">备注</el-col>
      <el-col :span="18" class="flex align-center">
        <el-input placeholder="请输入备注" class="w-96" />
      </el-col>
    </el-row>
    <el-footer class="text-center mt-6">
      <el-button type="primary">确认</el-button>
      <el-button @click="riskControlDetailDialogVisible = false">取消</el-button>
    </el-footer>
  </el-dialog>
  <el-dialog title="解除风控" v-model="riskControlRemoveDialogVisible">
    <h4 class="text-center">解除风控后， 所有选中的玩家将会被移除个人风控列表</h4>
    <h4 class="text-center">确认解除风控？</h4>
    <el-form ref="ruleFormRef">
      <el-row style="align-items: center">
        <span class="text-red-600 font-bold text-lg">*</span>
        <h3>备注:</h3>
      </el-row>
      <el-form-item>
        <el-input type="textarea" :rows="4" />
      </el-form-item>
    </el-form>
    <el-footer class="text-center">
      <el-button type="primary">确认</el-button>
      <el-button @click="riskControlRemoveDialogVisible = false">取消</el-button>
    </el-footer>
  </el-dialog>
</template>

<style lang="scss">
.personal-risk-control-dropdown {
  span {
    text-wrap: initial;
  }
}
</style>
