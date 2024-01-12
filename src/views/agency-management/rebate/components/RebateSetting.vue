<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { type AgentRebateSettingFormData } from "@/interface/agent";
import useStore from "@/store";
import { ElNotification, ElLoading } from 'element-plus'

const { agent } = useStore();

const formData = ref<AgentRebateSettingFormData>({
  agent_mode: 1,
  level1_agent_rebate: "",
  level2_agent_rebate: "",
  level3_agent_rebate: "",
  rebate_mode: 1,
  rebate_fund_time: 1,
  rebate_fund_time_amount: "",
  rebate_order_time: 1,
  rebate_order_time_amount: "",
  betting_odds: "",
})

const success = computed(() => {
  return agent.getSuccess
})

const cancelAgentRebateSetting = () => {
  formData.value = {
    agent_mode: 1,
    level1_agent_rebate: "",
    level2_agent_rebate: "",
    level3_agent_rebate: "",
    rebate_mode: 1,
    rebate_fund_time: 1,
    rebate_fund_time_amount: "",
    rebate_order_time: 1,
    rebate_order_time_amount: "",
    betting_odds: "",
  }
}

const submitAgentRebateSetting = async () => {
  formData.value.level1_agent_rebate = Number(formData.value.level1_agent_rebate)
  formData.value.level2_agent_rebate = Number(formData.value.level2_agent_rebate)
  formData.value.level3_agent_rebate = Number(formData.value.level3_agent_rebate)
  formData.value.rebate_fund_time_amount = Number(formData.value.rebate_fund_time_amount)
  formData.value.rebate_order_time_amount = Number(formData.value.rebate_order_time_amount)
  formData.value.betting_odds = Number(formData.value.betting_odds)
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await agent.dispatchAgentRebateSetting(formData.value).then(() => {
    loading.close();
    successResult();
  }).catch(() => {
    loading.close();
    successResult();
  });
}

const successResult = () => {
    if (success.value) {
      ElNotification({
        title: 'Success',
        message: '成功',
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Error',
        message: '错误',
        type: 'error',
      })
    }
}
</script>

<template>
  <el-form label-width="200px">
    <el-row class="agent-detail-row-1">
      <el-form-item label="代理使用模式:">
        <el-radio-group v-model="formData.agent_mode">
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
        <el-input placeholder="请输入一级代理返利" v-model="formData.level1_agent_rebate">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="二级代理返利">
        <el-input placeholder="请输入二级代理返利" v-model="formData.level2_agent_rebate">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="三级代理返利">
        <el-input placeholder="请输入三级代理返利" v-model="formData.level3_agent_rebate">
          <template #prepend>%</template>
        </el-input>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="返利领取方式">
        <el-radio-group v-model="formData.rebate_mode">
          <el-radio :label="1">玩家手动领取</el-radio>
          <el-radio :label="2">结算时自动到账</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="返利结算周期">
        <el-radio-group v-model="formData.rebate_order_time">
          <el-radio :label="1">实时结算</el-radio>
          <el-radio :label="2">每日刷新结算</el-radio>
          <el-radio :label="3">每周刷新结算</el-radio>
          <el-radio :label="4">每月刷新结算</el-radio>
          <el-radio :label="5">
            <el-input
              placeholder="请输入天数"
              v-model="formData.rebate_order_time_amount"
            />天后刷新结算
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="奖励释放周期">
        <el-radio-group v-model="formData.rebate_fund_time">
          <el-radio :label="1">不释放</el-radio>
          <el-radio :label="2">
            释放
            <el-input
              placeholder="请输入自动释放天数"
              v-model="formData.rebate_fund_time_amount"
            />
            天后释放
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-2">
      <el-form-item label="打码倍率">
        <el-input placeholder="请输入打码倍率" v-model="formData.betting_odds" />
      </el-form-item>
    </el-row>
    <el-row class="agent-detail-row-1">
      <el-form-item label="客损返利模式"> </el-form-item>
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
      <el-button type="primary" @click="submitAgentRebateSetting">确认</el-button>
      <el-button @click="cancelAgentRebateSetting">取消</el-button>
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
