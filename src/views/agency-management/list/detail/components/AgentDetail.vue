<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import useStore from "@/store";
import { useRoute } from "vue-router";

const { agent } = useStore();
const route = useRoute();

const agentDetailItem = computed(() => {
  return agent.agentData;
});

const agentRiskControlStatusList = computed(() => {
  return agent.agentRiskControlStatusList;
});

onMounted(async () => {
  await agent.dispatchDetailAgent({ user_id: route.query.user_id });
  await agent.dispatchAgentRiskControlStatusList({});
});
</script>

<template>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="所有下级人数:">
        {{ agentDetailItem.all_subordinates }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="归属上级:">
        <el-link :underline="false" class="el-link-decoration">
          {{ agentDetailItem.agent_belong_to_superior }}
        </el-link>
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理风控状态:">
        <span class="text-red-500">
          {{
            agentRiskControlStatusList.find(
              (obj) => obj.id === agentDetailItem.account_risk_control_status
            )?.name
          }}
        </span>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理充值金额总和:">
        {{ agentDetailItem.recharge_amount_of_sum }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="下级提现总和:">
        {{ agentDetailItem.subordinate_withdrawal_sum }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理总盈亏:">
        {{ agentDetailItem.total_profit_and_loss }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="充值人数总和:">
        {{ agentDetailItem.recharger_number }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="下级投注总金额:">
        {{ agentDetailItem.subordinate_total_betting_amount }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="投注返利总金额:">
        {{ agentDetailItem.betting_rebate_amount }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理邀请奖励:">
        {{ agentDetailItem.agent_direct_rewards }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理成就奖励:">
        {{ agentDetailItem.agent_achievement_rewards }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理状态:">
        {{
          agentDetailItem.agent_status == 0
            ? "正常"
            : agentDetailItem.agent_status == 1
            ? "预警"
            : "停止"
        }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="昨日返佣金额:">
        {{ agentDetailItem.yesterday_rebate_amount }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理最后取款间隔天数:">
        {{ agentDetailItem.last_withdrawal_days_number }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="代理最后邀请间隔天数:">
        {{ agentDetailItem.last_invite_days_number }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理注册人数:">
        {{ agentDetailItem.first_level_registration_number }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理注册人数:">
        {{ agentDetailItem.second_level_registration_number }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理注册人数:">
        {{ agentDetailItem.third_level_registration_number }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理充值人数:">
        {{ agentDetailItem.first_level_recharge_number }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理充值人数:">
        {{ agentDetailItem.second_level_recharge_number }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理充值人数:">
        {{ agentDetailItem.third_level_recharge_number }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理充值金额:">
        {{ agentDetailItem.first_level_recharge_amount }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理充值金额:">
        {{ agentDetailItem.second_level_recharge_amount }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理充值金额:">
        {{ agentDetailItem.third_level_recharge_amount }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理提现金额:">
        {{ agentDetailItem.first_level_withdrawal_amount }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理提现金额:">
        {{ agentDetailItem.second_level_withdrawal_amount }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理提现金额:">
        {{ agentDetailItem.third_level_withdrawal_amount }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理充提差:">
        {{ agentDetailItem.first_level_charge_withdrawal_difference }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理充提差:">
        {{ agentDetailItem.second_level_charge_withdrawal_difference }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理充提差:">
        {{ agentDetailItem.third_level_charge_withdrawal_difference }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-1">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理投注返佣:">
        {{ agentDetailItem.first_level_betting_rebate }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理投注返佣:">
        {{ agentDetailItem.second_level_betting_rebate }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理投注返佣:">
        {{ agentDetailItem.third_level_betting_rebate }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="agent-detail-row-2">
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="一级代理风控人数:">
        {{ agentDetailItem.first_level_risk_control_count }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="二级代理风控人数:">
        {{ agentDetailItem.second_level_risk_control_count }}
      </el-form-item>
    </el-col>
    <el-col :span="8" class="d-flex align-center justify-center">
      <el-form-item label="三级代理风控人数:">
        {{ agentDetailItem.third_level_risk_control_count }}
      </el-form-item>
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
