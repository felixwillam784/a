<script setup lang="ts">
import { ref } from "vue";

import { Chart, Grid, Line, Tooltip, Bar, Marker } from "vue3-charts";
const chart1direction = ref<any>("horizontal");
const chart1margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0,
});
const chart1axis = ref<any>({
  primary: {
    type: "band",
  },
  secondary: {
    domain: ["0", "dataMax + 100"],
    type: "linear",
    format: (domain: any) => {
      if (domain * 1 > 4000) {
        return "";
      } else {
        return (domain * 1) / 1000 + "K";
      }
    },
    tricks: 4,
  },
});

const depositWithdrawlTotal = {
  recharge_amount: 9999.99,
  success_withdrawal_amount: 9999.99,
  agent_withdrawal_amount: 9999.99,
  deposit_and_withdrawal_difference: 9999.99,
};

const gameTotal = {
  bet_amount: 9999.99,
  winning_amount: 9999.99,
  platform_profit_loss: 9999.99,
  dealer_advantage: 9999.99,
};

const chart1Array = [
  {
    date: "6-20",
    chart_recharge_amount: 3700,
    chart_success_withdraw_amount: 2800,
    chart_agent_withdraw_amount: 1800,
    chart_charge_withdraw_difference: 800,
    chart_recharge_success_rate: 99.99,
    chart_new_user_payment_rate: 99.99,
  },
];
const chart2Array = [
  { date: "6-20", chart_first_charge_count: 2100, chart_recharge_count: 2978 },
];
const chart3Array = [
  { date: "6-20", chart_first_charge_amount: 2100, chart_recharge_amount: 2978 },
];
const chart4Array = [
  {
    date: "6-20",
    chart_new_register_count: 3700,
    chart_new_active_count: 3300,
    chart_active_2_stay_count: 2900,
    chart_active_3_stay_count: 2500,
    chart_active_7_stay_count: 2200,
    chart_active_15_stay_count: 1900,
    chart_active_30_stay_count: 1400,
    chart_active_2_retention_rate: 9999,
    chart_active_3_retention_rate: 9999,
    chart_active_7_retention_rate: 9999,
    chart_active_15_retention_rate: 9999,
    chart_active_30_retention_rate: 9999,
  },
];
const chart5Array = [
  {
    date: "6-20",
    chart_new_register_count: 3700,
    chart_new_agent_count: 3300,
    chart_agent_2_stay_count: 2900,
    chart_agent_3_stay_count: 2500,
    chart_agent_7_stay_count: 2200,
    chart_agent_15_stay_count: 1900,
    chart_agent_30_stay_count: 1400,
    chart_agent_2_retention_rate: 9999,
    chart_agent_3_retention_rate: 9999,
    chart_agent_7_retention_rate: 9999,
    chart_agent_15_retention_rate: 9999,
    chart_agent_30_retention_rate: 9999,
  },
];
const chart6Array = [
  {
    date: "6-20",
    chart_new_register_count: 3700,
    chart_first_deposite_count: 3300,
    chart_first_deposite_2_stay_count: 2900,
    chart_first_deposite_3_stay_count: 2500,
    chart_first_deposite_7_stay_count: 2200,
    chart_first_deposite_15_stay_count: 1900,
    chart_first_deposite_30_stay_count: 1400,
    chart_first_deposite_2_retention_rate: 9999,
    chart_first_deposite_3_retention_rate: 9999,
    chart_first_deposite_7_retention_rate: 9999,
    chart_first_deposite_15_retention_rate: 9999,
    chart_first_deposite_30_retention_rate: 9999,
  },
];
const chart7Array = [
  {
    date: "6-20",
    chart_self_bet_amount: 3500,
    chart_self_bonus_amount: 2500,
    chart_self_profit_loss: 1800,
    chart_self_bettor_count: 9999,
    chart_self_game_count: 9999,
    chart_self_game_revenue_rate: 99.99,
  },
];
const chart8Array = [
  {
    date: "6-20",
    chart_third_bet_amount: 3500,
    chart_third_bonus_amount: 2500,
    chart_third_profit_loss: 1800,
    chart_third_bettor_count: 9999,
    chart_third_game_count: 9999,
    chart_third_game_revenue_rate: 99.99,
  },
];

const chart1data = ref(chart1Array);
const chart2data = ref(chart2Array);
const chart3data = ref(chart3Array);
const chart4data = ref(chart4Array);
const chart5data = ref(chart5Array);
const chart6data = ref(chart6Array);
const chart7data = ref(chart7Array);
const chart8data = ref(chart8Array);
const depositWithdrawlTotalData = ref(depositWithdrawlTotal);
const gameTotalData = ref(gameTotal);

const activeRetentionButton = ref<number>(0);
const handleChartRetentionType = (index: number) => {
  activeRetentionButton.value = index;
};

const activeGameAPIButton = ref<number>(0);

const handleGameAPIType = (index: number) => {
  activeGameAPIButton.value = index;
};
</script>
<template>
  <el-row>
    <el-col :span="16">
      <el-card style="margin-top: 20px; width=100%; margin-right:20px;">
        <div class="deposit-withdraw-data-header">
          <p class="p-title">充提数据</p>
        </div>
        <div class="deposit-withdraw-data-body">
          <div class="deposit-withdraw-data-item">
            <p class="p-title">充值金额</p>
            <p class="p-text">{{ depositWithdrawlTotalData.recharge_amount }}</p>
          </div>
          <div class="deposit-withdraw-data-item">
            <p class="p-title">成功提现金额</p>
            <p class="p-text">
              {{ depositWithdrawlTotalData.success_withdrawal_amount }}
            </p>
          </div>
          <div class="deposit-withdraw-data-item">
            <p class="p-title">代理提现金额</p>
            <p class="p-text">
              {{ depositWithdrawlTotalData.agent_withdrawal_amount }}
            </p>
          </div>
          <div class="deposit-withdraw-data-item">
            <p class="p-title">充提差</p>
            <p class="p-text">
              {{ depositWithdrawlTotalData.deposit_and_withdrawal_difference }}
            </p>
          </div>
        </div>

        <Chart
          :size="{ width: 1000, height: 500 }"
          :data="chart1data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line
              :dataKeys="['date', 'chart_recharge_amount']"
              :lineStyle="{ stroke: '#ff99ff' }"
            />
            <Line
              :dataKeys="['date', 'chart_success_withdraw_amount']"
              :lineStyle="{ stroke: '#66ff00' }"
            />
            <Line
              :dataKeys="['date', 'chart_agent_withdraw_amount']"
              :lineStyle="{ stroke: '#ff0000' }"
            />
            <Line
              :dataKeys="['date', 'chart_charge_withdraw_difference']"
              :lineStyle="{ stroke: '#66ccff' }"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                date: { label: '时间', color: '#000000' },
                chart_recharge_amount: { label: '充值金额', color: '#ff99ff' },
                chart_success_withdraw_amount: {
                  label: '成功提现金额',
                  color: '#66ff00',
                },
                chart_agent_withdraw_amount: {
                  label: '代理提现金额',
                  color: '#ff0000',
                },
                chart_charge_withdraw_difference: {
                  label: '充提差',
                  color: '#66ccff',
                },
                chart_recharge_success_rate: {
                  label: '充值成功率',
                  color: '#000000',
                },
                chart_new_user_payment_rate: {
                  label: '新用户付费率',
                  color: '#000000',
                },
              }"
            >
            </Tooltip>
          </template>
        </Chart>
      </el-card>
    </el-col>

    <el-col :span="8">
      <el-card style="margin-top: 20px; width=100%">
        <div class="deposit-withdraw-data-header">
          <p class="p-title">首充复充人数</p>
        </div>
        <div class="deposit-withdraw-data-body" style="float: right">
          <div class="deposit-withdraw-data-item" style="display: flex">
            <p class="p-title">首充</p>
            <div class="p-block1"></div>
          </div>
          <div class="deposit-withdraw-data-item" style="display: flex">
            <p class="p-title">复充</p>
            <div class="p-block2"></div>
          </div>
        </div>

        <Chart
          :size="{ width: 500, height: 190 }"
          :data="chart2data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Bar
              :dataKeys="['date', 'chart_first_charge_count']"
              :barStyle="{ fill: '#66ccff' }"
              :gap="20"
            />
            <Bar
              :dataKeys="['date', 'chart_recharge_count']"
              :barStyle="{ fill: '#ffcc00' }"
              :gap="20"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                chart_first_charge_count: { hide: true },
                chart_recharge_count: { label: '', color: 'black' },
                date: { hide: true },
              }"
            />
          </template>
        </Chart>
      </el-card>

      <el-card style="margin-top: 20px; width=100%">
        <div class="deposit-withdraw-data-header">
          <p class="p-title">首充复充金额</p>
        </div>

        <div class="deposit-withdraw-data-body" style="float: right">
          <div class="deposit-withdraw-data-item" style="display: flex">
            <p class="p-title">首充</p>
            <div class="p-block1"></div>
          </div>
          <div class="deposit-withdraw-data-item" style="display: flex">
            <p class="p-title">复充</p>
            <div class="p-block2"></div>
          </div>
        </div>

        <Chart
          :size="{ width: 500, height: 190 }"
          :data="chart3data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Bar
              :dataKeys="['date', 'chart_first_charge_amount']"
              :barStyle="{ fill: '#66ccff' }"
              :gap="20"
            />
            <Bar
              :dataKeys="['date', 'chart_recharge_amount']"
              :barStyle="{ fill: '#ffcc00' }"
              :gap="20"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                chart_first_charge_amount: { hide: true },
                chart_recharge_amount: { label: '', color: 'black' },
                date: { hide: true },
              }"
            />
          </template>
        </Chart>
      </el-card>
    </el-col>
  </el-row>

  <el-card style="margin-top: 20px">
    <el-row>
      <el-col :span="20">
        <div class="deposit-withdraw-data-header">
          <p class="p-title">留存数据</p>
        </div>
        <Chart
          v-if="activeRetentionButton == 0"
          :size="{ width: 1200, height: 500 }"
          :data="chart4data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line
              :dataKeys="['date', 'chart_new_register_count']"
              :lineStyle="{ stroke: '#ff0000' }"
            />
            <Line
              :dataKeys="['date', 'chart_new_active_count']"
              :lineStyle="{ stroke: '#ff9900' }"
            />
            <Line
              :dataKeys="['date', 'chart_active_2_stay_count']"
              :lineStyle="{ stroke: '#ffff00' }"
            />
            <Line
              :dataKeys="['date', 'chart_active_3_stay_count']"
              :lineStyle="{ stroke: '#008000' }"
            />
            <Line
              :dataKeys="['date', 'chart_active_7_stay_count']"
              :lineStyle="{ stroke: '#0000ff' }"
            />
            <Line
              :dataKeys="['date', 'chart_active_15_stay_count']"
              :lineStyle="{ stroke: '#6699ff' }"
            />
            <Line
              :dataKeys="['date', 'chart_active_30_stay_count']"
              :lineStyle="{ stroke: '#800080' }"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                date: { label: '时间', color: '#000000' },
                chart_new_register_count: { label: '新增注册', color: '#ff99ff' },
                chart_new_active_count: { label: '新增活跃', color: '#66ff00' },
                chart_active_2_stay_count: {
                  label: '活跃2留人数',
                  color: '#ffff00',
                },
                chart_active_3_stay_count: {
                  label: '活跃3留人数',
                  color: '#008000',
                },
                chart_active_7_stay_count: {
                  label: '活跃7留人数',
                  color: '#0000ff',
                },
                chart_active_15_stay_count: {
                  label: '活跃15留人数',
                  color: '#6699ff',
                },
                chart_active_30_stay_count: {
                  label: '活跃30留人数',
                  color: '#800080',
                },
                chart_active_2_retention_rate: {
                  label: '活跃2留率',
                  color: '#ffff00',
                },
                chart_active_3_retention_rate: {
                  label: '活跃3留率',
                  color: '#008000',
                },
                chart_active_7_retention_rate: {
                  label: '活跃7留率',
                  color: '#0000ff',
                },
                chart_active_15_retention_rate: {
                  label: '活跃15留率',
                  color: '#6699ff',
                },
                chart_active_30_retention_rate: {
                  label: '活跃30留率',
                  color: '#800080',
                },
              }"
            >
              <!-- <div>sssssssssss</div> -->
            </Tooltip>
          </template>
        </Chart>
        <Chart
          v-if="activeRetentionButton == 1"
          :size="{ width: 1200, height: 500 }"
          :data="chart5data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line
              :dataKeys="['date', 'chart_new_register_count']"
              :lineStyle="{ stroke: '#ff0000' }"
            />
            <Line
              :dataKeys="['date', 'chart_new_agent_count']"
              :lineStyle="{ stroke: '#ff9900' }"
            />
            <Line
              :dataKeys="['date', 'chart_agent_2_stay_count']"
              :lineStyle="{ stroke: '#ffff00' }"
            />
            <Line
              :dataKeys="['date', 'chart_agent_3_stay_count']"
              :lineStyle="{ stroke: '#008000' }"
            />
            <Line
              :dataKeys="['date', 'chart_agent_7_stay_count']"
              :lineStyle="{ stroke: '#0000ff' }"
            />
            <Line
              :dataKeys="['date', 'chart_agent_15_stay_count']"
              :lineStyle="{ stroke: '#6699ff' }"
            />
            <Line
              :dataKeys="['date', 'chart_agent_30_stay_count']"
              :lineStyle="{ stroke: '#800080' }"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                date: { label: '时间', color: '#000000' },
                chart_new_register_count: { label: '新增注册', color: '#ff99ff' },
                chart_new_agent_count: { label: '新增活跃', color: '#66ff00' },
                chart_agent_2_stay_count: {
                  label: '活跃2留人数',
                  color: '#ffff00',
                },
                chart_agent_3_stay_count: {
                  label: '活跃3留人数',
                  color: '#008000',
                },
                chart_agent_7_stay_count: {
                  label: '活跃7留人数',
                  color: '#0000ff',
                },
                chart_agent_15_stay_count: {
                  label: '活跃15留人数',
                  color: '#6699ff',
                },
                chart_agent_30_stay_count: {
                  label: '活跃30留人数',
                  color: '#800080',
                },
                chart_agent_2_retention_rate: {
                  label: '活跃2留率',
                  color: '#ffff00',
                },
                chart_agent_3_retention_rate: {
                  label: '活跃3留率',
                  color: '#008000',
                },
                chart_agent_7_retention_rate: {
                  label: '活跃7留率',
                  color: '#0000ff',
                },
                chart_agent_15_retention_rate: {
                  label: '活跃15留率',
                  color: '#6699ff',
                },
                chart_agent_30_retention_rate: {
                  label: '活跃30留率',
                  color: '#800080',
                },
              }"
            >
              <!-- <div>sssssssssss</div> -->
            </Tooltip>
          </template>
        </Chart>
        <Chart
          v-if="activeRetentionButton == 2"
          :size="{ width: 1200, height: 500 }"
          :data="chart6data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line
              :dataKeys="['date', 'chart_new_register_count']"
              :lineStyle="{ stroke: '#ff0000' }"
            />
            <Line
              :dataKeys="['date', 'chart_first_deposite_count']"
              :lineStyle="{ stroke: '#ff9900' }"
            />
            <Line
              :dataKeys="['date', 'chart_first_deposite_2_stay_count']"
              :lineStyle="{ stroke: '#ffff00' }"
            />
            <Line
              :dataKeys="['date', 'chart_first_deposite_3_stay_count']"
              :lineStyle="{ stroke: '#008000' }"
            />
            <Line
              :dataKeys="['date', 'chart_first_deposite_7_stay_count']"
              :lineStyle="{ stroke: '#0000ff' }"
            />
            <Line
              :dataKeys="['date', 'chart_first_deposite_15_stay_count']"
              :lineStyle="{ stroke: '#6699ff' }"
            />
            <Line
              :dataKeys="['date', 'chart_first_deposite_30_stay_count']"
              :lineStyle="{ stroke: '#800080' }"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                date: { label: '时间', color: '#000000' },
                chart_new_register_count: { label: '新增注册', color: '#ff99ff' },
                chart_first_deposite_count: {
                  label: '新增活跃',
                  color: '#66ff00',
                },
                chart_first_deposite_2_stay_count: {
                  label: '活跃2留人数',
                  color: '#ffff00',
                },
                chart_first_deposite_3_stay_count: {
                  label: '活跃3留人数',
                  color: '#008000',
                },
                chart_first_deposite_7_stay_count: {
                  label: '活跃7留人数',
                  color: '#0000ff',
                },
                chart_first_deposite_15_stay_count: {
                  label: '活跃15留人数',
                  color: '#6699ff',
                },
                chart_first_deposite_30_stay_count: {
                  label: '活跃30留人数',
                  color: '#800080',
                },
                chart_first_deposite_2_retention_rate: {
                  label: '活跃2留率',
                  color: '#ffff00',
                },
                chart_first_deposite_3_retention_rate: {
                  label: '活跃3留率',
                  color: '#008000',
                },
                chart_first_deposite_7_retention_rate: {
                  label: '活跃7留率',
                  color: '#0000ff',
                },
                chart_first_deposite_15_retention_rate: {
                  label: '活跃15留率',
                  color: '#6699ff',
                },
                chart_first_deposite_30_retention_rate: {
                  label: '活跃30留率',
                  color: '#800080',
                },
              }"
            >
              <!-- <div>sssssssssss</div> -->
            </Tooltip>
          </template>
        </Chart>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-button
            :type="activeRetentionButton == 0 ? 'warning' : ''"
            @click="handleChartRetentionType(0)"
            >活跃</el-button
          >
          <el-button
            :type="activeRetentionButton == 1 ? 'warning' : ''"
            @click="handleChartRetentionType(1)"
            >代理</el-button
          >
          <el-button
            :type="activeRetentionButton == 2 ? 'warning' : ''"
            @click="handleChartRetentionType(2)"
            >首充</el-button
          >
        </el-row>
      </el-col>
    </el-row>
  </el-card>

  <el-card style="margin-top: 20px">
    <el-row>
      <el-col :span="20">
        <div class="deposit-withdraw-data-header">
          <p class="p-title">游戏数据</p>
        </div>
        <div class="deposit-withdraw-data-body">
          <div class="deposit-withdraw-data-item" style="margin-left: 30px">
            <p class="p-title">投注金额</p>
            <p class="p-text">{{ gameTotalData.bet_amount }}</p>
          </div>
          <div class="deposit-withdraw-data-item">
            <p class="p-title">派奖金额</p>
            <p class="p-text">{{ gameTotalData.winning_amount }}</p>
          </div>
          <div class="deposit-withdraw-data-item">
            <p class="p-title">平台盈亏</p>
            <p class="p-text">{{ gameTotalData.platform_profit_loss }}</p>
          </div>
          <div class="deposit-withdraw-data-item">
            <p class="p-title">庄家优势</p>
            <p class="p-text">{{ gameTotalData.dealer_advantage }}%</p>
          </div>
        </div>

        <Chart
          v-if="activeGameAPIButton == 0"
          :size="{ width: 1200, height: 500 }"
          :data="chart7data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line
              :dataKeys="['date', 'chart_self_bet_amount']"
              :lineStyle="{ stroke: '#ff0000' }"
            />
            <Line
              :dataKeys="['date', 'chart_self_bonus_amount']"
              :lineStyle="{ stroke: '#ff9900' }"
            />
            <Line
              :dataKeys="['date', 'chart_self_profit_loss']"
              :lineStyle="{ stroke: '#ffff00' }"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                date: { label: '时间', color: '#000000' },
                chart_self_bet_amount: { label: '投注金额', color: '#000000' },
                chart_self_bonus_amount: { label: '派奖金额', color: '#000000' },
                chart_self_profit_loss: { label: '平添盈亏', color: '#000000' },
                chart_self_bettor_count: { label: '投注人数', color: '#000000' },
                chart_self_game_count: { label: '投注局数', color: '#000000' },
                chart_self_game_revenue_rate: {
                  label: '庄家优势',
                  color: '#000000',
                },
              }"
            >
              <!-- <div>sssssssssss</div> -->
            </Tooltip>
          </template>
        </Chart>
        <Chart
          v-if="activeGameAPIButton == 1"
          :size="{ width: 1200, height: 500 }"
          :data="chart8data"
          :margin="chart1margin"
          :direction="chart1direction"
          :axis="chart1axis"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line
              :dataKeys="['date', 'chart_third_bet_amount']"
              :lineStyle="{ stroke: '#ff0000' }"
            />
            <Line
              :dataKeys="['date', 'chart_third_bonus_amount']"
              :lineStyle="{ stroke: '#ff9900' }"
            />
            <Line
              :dataKeys="['date', 'chart_third_profit_loss']"
              :lineStyle="{ stroke: '#ffff00' }"
            />
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                date: { label: '时间', color: '#000000' },
                chart_third_bet_amount: { label: '投注金额', color: '#000000' },
                chart_third_bonus_amount: { label: '派奖金额', color: '#000000' },
                chart_third_profit_loss: { label: '平添盈亏', color: '#000000' },
                chart_third_bettor_count: { label: '投注人数', color: '#000000' },
                chart_third_game_count: { label: '投注局数', color: '#000000' },
                chart_third_game_revenue_rate: {
                  label: '庄家优势',
                  color: '#000000',
                },
              }"
            >
              <!-- <div>sssssssssss</div> -->
            </Tooltip>
          </template>
        </Chart>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-button
            :type="activeGameAPIButton == 0 ? 'warning' : ''"
            @click="handleGameAPIType(0)"
            >自研</el-button
          >
          <el-button
            :type="activeGameAPIButton == 1 ? 'warning' : ''"
            @click="handleGameAPIType(1)"
            >三方</el-button
          >
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<style lang="scss"></style>
