<script setup lang="ts">
import { ref } from "vue";

interface GetRetentionReport {
  id: string;
  data_summary_date_time: string;
  data_summary_active_user_count: number;
  data_summary_platform_balance: string;
  data_summary_new_user_count: string;
  data_summary_add_active_user_count: number;
  data_summary_login_user_count: number;
  data_summary_active_ratio: string;
  data_summary_recharge_success_count: number;
  data_summary_recharge_success_amount: string;
  data_summary_recharge_success_rate: string;
  data_summary_first_charge_count: number;
  data_summary_first_charge_amount: string;
  data_summary_today_first_deposit_new_user: string;
  data_summary_refill_user_count: number;
  data_summary_refill_new_user_count: number;
  data_summary_refill_count: string;
  data_summary_recharge_amount: string;
  data_summary_recharge_ratio: string;
  data_summary_new_user_payment_rate: string;
  data_summary_cash_withdraw_app_count: number;
  data_summary_success_withdraw_count: number;
  data_summary_success_withdraw_amount: string;
  data_summary_charge_withdraw_difference: string;
  data_summary_deposit_withdraw_difference_rate: string;
  data_summary_manual_confirm_transaction_count: number;
  data_summary_manual_confirm_amount: string;
  data_summary_bet_count: number;
  data_summary_bet_amount: string;
  data_summary_bonus_amount: string;
  data_summary_game_revenue: string;
  data_summary_today_platform_rtp: string;
  data_summary_internal_game_rtp: string;
  data_summary_external_game_rtp: string;
  data_summary_agent_rebate_amount: string;
  data_summary_hidden_commission_rebate_amount: string;
  data_summary_none_withdraw_amount: string;
  data_summary_nextday_recharge_amount: string;
  data_summary_3day_recharge_amount: string;
  data_summary_active_retention_rate_1: string;
  data_summary_active_retention_rate_3: string;
  data_summary_active_retention_rate_7: string;
  data_summary_active_retention_rate_15: string;
  data_summary_active_retention_rate_30: string;
  data_summary_agent_retention_rate_1: string;
  data_summary_agent_retention_rate_3: string;
  data_summary_agent_retention_rate_7: string;
  data_summary_agent_retention_rate_15: string;
  data_summary_agent_retention_rate_30: string;
  data_summary_first_charge_retention_rate_1: string;
  data_summary_first_charge_retention_rate_3: string;
  data_summary_first_charge_retention_rate_7: string;
  data_summary_first_charge_retention_rate_15: string;
  data_summary_first_charge_retention_rate_30: string;
  data_summary_active_retention_value_1: string;
  data_summary_active_retention_value_3: string;
  data_summary_active_retention_value_7: string;
  data_summary_active_retention_value_15: string;
  data_summary_active_retention_value_30: string;
  data_summary_agent_retention_value_1: string;
  data_summary_agent_retention_value_3: string;
  data_summary_agent_retention_value_7: string;
  data_summary_agent_retention_value_15: string;
  data_summary_agent_retention_value_30: string;
  data_summary_first_charge_retention_value_1: string;
  data_summary_first_charge_retention_value_3: string;
  data_summary_first_charge_retention_value_7: string;
  data_summary_first_charge_retention_value_15: string;
  data_summary_first_charge_retention_value_30: string;
}
const retentionReportList = ref<Array<GetRetentionReport>>([]);

const loading = ref<boolean>(false);
</script>
<template>
  <el-card style="margin-top: 20px">
    <el-table v-loading="loading" :data="retentionReportList" style="width: 100%">
      <el-table-column
        label="时间"
        align="left"
        prop="data_summary_date_time"
        width="100"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_date_time }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="活跃用户数"
        align="left"
        prop="data_summary_active_user_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_active_user_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="今日平台余额"
        align="left"
        prop="data_summary_platform_balance"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_platform_balance }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="新增用户数"
        align="left"
        prop="data_summary_new_user_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_new_user_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="新增活跃用户"
        align="left"
        prop="data_summary_add_active_user_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_add_active_user_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="登录用户"
        align="left"
        prop="data_summary_login_user_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_login_user_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="活跃比"
        align="left"
        prop="data_summary_active_ratio"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_active_ratio }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="充值成功笔数"
        align="left"
        prop="data_summary_recharge_success_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_recharge_success_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="充值成功金额"
        align="left"
        prop="data_summary_recharge_success_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_recharge_success_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="充值成功率"
        align="left"
        prop="data_summary_recharge_success_rate"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_recharge_success_rate }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="首充人数"
        align="left"
        prop="data_summary_first_charge_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_first_charge_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="首充金额"
        align="left"
        prop="data_summary_first_charge_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_first_charge_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="新用户今日首充金额"
        align="left"
        prop="data_summary_today_first_deposit_new_user"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_today_first_deposit_new_user }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="复充人数"
        align="left"
        prop="data_summary_refill_user_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_refill_user_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="新用户复充人数"
        align="left"
        prop="data_summary_refill_new_user_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_refill_new_user_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="复充笔数"
        align="left"
        prop="data_summary_refill_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_refill_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="复充金额"
        align="left"
        prop="data_summary_recharge_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_recharge_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="复充占比"
        align="left"
        prop="data_summary_recharge_ratio"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_recharge_ratio }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="新用户付费率"
        align="left"
        prop="data_summary_new_user_payment_rate"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_new_user_payment_rate }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="申请提现笔数"
        align="left"
        prop="data_summary_cash_withdraw_app_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_cash_withdraw_app_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="提现成功笔数"
        align="left"
        prop="data_summary_success_withdraw_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_success_withdraw_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="提现成功金额"
        align="left"
        prop="data_summary_success_withdraw_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_success_withdraw_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="充提差"
        align="left"
        prop="data_summary_charge_withdraw_difference"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_charge_withdraw_difference }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="充提差占今日总充值金额百分比"
        align="left"
        prop="data_summary_deposit_withdraw_difference_rate"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_deposit_withdraw_difference_rate }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="手动确认笔数"
        align="left"
        prop="data_summary_manual_confirm_transaction_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_manual_confirm_transaction_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="手动确认金额"
        align="left"
        prop="data_summary_manual_confirm_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_manual_confirm_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="投注数量"
        align="left"
        prop="data_summary_bet_count"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_bet_count }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="投注金额"
        align="left"
        prop="data_summary_bet_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_bet_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="派奖金额"
        align="left"
        prop="data_summary_bonus_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_bonus_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="游戏收益"
        align="left"
        prop="data_summary_game_revenue"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_game_revenue }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="平台今日RTP"
        align="left"
        prop="data_summary_today_platform_rtp"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_today_platform_rtp }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="内部游戏RTP"
        align="left"
        prop="data_summary_internal_game_rtp"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_internal_game_rtp }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="外部游戏RTP"
        align="left"
        prop="data_summary_external_game_rtp"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_external_game_rtp }}%</p>
        </template>
      </el-table-column>
      <el-table-column
        label="代理返佣金额"
        align="left"
        prop="data_summary_agent_rebate_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_agent_rebate_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="返佣暗扣金额"
        align="left"
        prop="data_summary_hidden_commission_rebate_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_hidden_commission_rebate_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="提现成功不打款金额"
        align="left"
        prop="data_summary_none_withdraw_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_none_withdraw_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="次日复充金额"
        align="left"
        prop="data_summary_nextday_recharge_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_nextday_recharge_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="3日复充金额"
        align="left"
        prop="data_summary_3day_recharge_amount"
        width="130"
      >
        <template #default="scope">
          <p>{{ scope.row.data_summary_3day_recharge_amount }}</p>
        </template>
      </el-table-column>
      <el-table-column label="活跃留存率" align="center">
        <el-table-column
          label="次日"
          align="left"
          prop="data_summary_active_retention_rate_1"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_active_retention_rate_1 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_active_retention_value_1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="3日"
          align="left"
          prop="data_summary_active_retention_rate_3"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_active_retention_rate_3 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_active_retention_value_3 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="7日"
          align="left"
          prop="data_summary_active_retention_rate_7"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_active_retention_rate_7 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_active_retention_value_7 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="15日"
          align="left"
          prop="data_summary_active_retention_rate_15"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_active_retention_rate_15 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_active_retention_value_15 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="30日"
          align="left"
          prop="data_summary_active_retention_rate_30"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_active_retention_rate_30 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_active_retention_value_30 }}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="代理留存率" align="center">
        <el-table-column
          label="次日"
          align="left"
          prop="data_summary_agent_retention_rate_1"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_agent_retention_rate_1 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_agent_retention_value_1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="3日"
          align="left"
          prop="data_summary_agent_retention_rate_3"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_agent_retention_rate_3 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_agent_retention_value_3 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="7日"
          align="left"
          prop="data_summary_agent_retention_rate_7"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_agent_retention_rate_7 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_agent_retention_value_7 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="15日"
          align="left"
          prop="data_summary_agent_retention_rate_15"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_agent_retention_rate_15 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_agent_retention_value_15 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="30日"
          align="left"
          prop="data_summary_agent_retention_rate_30"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_agent_retention_rate_30 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_agent_retention_value_30 }}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="首充留存率" align="center">
        <el-table-column
          label="次日"
          align="left"
          prop="data_summary_first_charge_retention_rate_1"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_first_charge_retention_rate_1 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_first_charge_retention_value_1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="3日"
          align="left"
          prop="data_summary_first_charge_retention_rate_3"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_first_charge_retention_rate_3 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_first_charge_retention_value_3 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="7日"
          align="left"
          prop="data_summary_first_charge_retention_rate_7"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_first_charge_retention_rate_7 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_first_charge_retention_value_7 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="15日"
          align="left"
          prop="data_summary_first_charge_retention_rate_15"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_first_charge_retention_rate_15 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_first_charge_retention_value_15 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="30日"
          align="left"
          prop="data_summary_first_charge_retention_rate_30"
          width="90"
        >
          <template #default="scope">
            <p>{{ scope.row.data_summary_first_charge_retention_rate_30 }}%</p>
            <p style="text-align: right; font-size: 12px">
              {{ scope.row.data_summary_first_charge_retention_value_30 }}
            </p>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<style lang="scss"></style>
