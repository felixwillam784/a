<script lang="ts" setup>
import { ref, onMounted, computed, onUpdated, watch } from "vue";
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import NewRiskAccount from "./components/NewRiskAccount.vue";
import NewRiskIP from "./components/NewRiskIP.vue";
import NewRiskEquipment from "./components/NewRiskEquipment.vue";
import NewRiskPhone from "./components/NewRiskPhone.vue";
import NewRiskBankAccount from "./components/NewRiskBankAccount.vue";
import NewRiskIdentity from "./components/NewRiskIdentity.vue";

const router = useRouter();

const activeButton = ref<number>(0);

const title = ref<string>("账号");

const riskControlAddDialogVisible = ref<boolean>(false);

const handleButtonActive = (index: number) => {
  activeButton.value = index;
};

const goBack = () => {
  router.go(-1);
};

watch(activeButton, (value) => {
  switch (value) {
    case 0:
      title.value = "账号";
      break;
    case 1:
      title.value = "IP";
      break;
    case 2:
      title.value = "设备";
      break;
    case 3:
      title.value = "手机号";
      break;
    case 4:
      title.value = "银行账户";
      break;
    case 5:
      title.value = "身份信息";
      break;
  }
});
</script>

<template>
  <div class="app-container">
    <div class="risk-add-header">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
    <el-card>
      <div class="risk-add-body">
        <div>
          <el-button
            :type="activeButton == 0 ? 'warning' : ''"
            @click="handleButtonActive(0)"
          >
            新增风控账号
          </el-button>
          <el-button
            :type="activeButton == 1 ? 'warning' : ''"
            @click="handleButtonActive(1)"
            >新增风控IP</el-button
          >
          <el-button
            :type="activeButton == 2 ? 'warning' : ''"
            @click="handleButtonActive(2)"
            >新增风控设备</el-button
          >
          <el-button
            :type="activeButton == 3 ? 'warning' : ''"
            @click="handleButtonActive(3)"
            >新增风控手机号</el-button
          >
          <el-button
            :type="activeButton == 4 ? 'warning' : ''"
            @click="handleButtonActive(4)"
            >新增风控银行账号</el-button
          >
          <el-button
            :type="activeButton == 5 ? 'warning' : ''"
            @click="handleButtonActive(5)"
            >新增风控身份信息</el-button
          >
        </div>
        <div style="margin-left: auto">
          <el-button>修改日志</el-button>
          <el-button>Excel导入</el-button>
          <el-button>Excel导出</el-button>
        </div>
      </div>
    </el-card>
    <NewRiskAccount v-if="activeButton == 0" />
    <NewRiskIP v-if="activeButton == 1" />
    <NewRiskEquipment v-if="activeButton == 2" />
    <NewRiskPhone v-if="activeButton == 3" />
    <NewRiskBankAccount v-if="activeButton == 4" />
    <NewRiskIdentity v-if="activeButton == 5" />
    <el-dialog title="确认新增" v-model="riskControlAddDialogVisible">
      <el-body>
        <h4 class="text-center">确认将选中的{{ title }}加入风控列表</h4>
        <div class="text-center">
          风控等级
          <el-select placeholder="请选择风控等级"></el-select>
        </div>
        <el-form ref="ruleFormRef">
          <el-row style="align-items: center">
            <span class="text-red-600 font-bold text-lg">*</span>
            <h3>备注:</h3>
          </el-row>
          <el-form-item>
            <el-input type="textarea" :rows="4" />
          </el-form-item>
        </el-form>
      </el-body>
      <el-footer>
        <el-button type="primary" @click="riskControlAddDialogVisible = true">
          确认
        </el-button>
        <el-button @click="riskControlAddDialogVisible = false">取消</el-button>
      </el-footer>
    </el-dialog>
    <div class="text-center" style="position: fixed; bottom: 20px; left: 50%">
      <el-button type="primary" @click="riskControlAddDialogVisible = true">
        确认
      </el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<style lang="scss">
.risk-add-header {
  padding: 20px;
  display: flex;
  align-items: center;
}

.risk-add-body {
  display: flex;
  align-items: center;
}
</style>
