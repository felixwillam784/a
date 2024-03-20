<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Chart, Grid, Line, Tooltip, Bar, Marker } from "vue3-charts";
import { Top, Bottom } from "@element-plus/icons-vue";
import useStore from "@/store";
import { useRouter, useRoute } from "vue-router";
import { ChartAxis } from "vue3-charts/dist/types";

const { dashboard } = useStore();
const router = useRouter();

const chart1direction = ref<"horizontal" | "vertical" | "circular">("horizontal");
const chart1margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0,
});
const chart1axis = ref<ChartAxis>({
  primary: {
    format: (domain: string) => {
      return "";
    },
    domain: ["", ""],
    type: "band",
  },
  secondary: {
    format: (domain: any) => {
      if (domain * 1 > 4000) {
        return "";
      } else {
        return "";
      }
    },
    domain: ["", ""],
    type: "band",
  },
});

const statisticChartList = computed(() => {
  return dashboard.getStatisticChartList;
});

onMounted(async () => {
  await dashboard.dispatchStatisticsChartList();
});
</script>

<template>
  <el-card>
    <el-row :gutter="12" style="justify-content: center" class="visitor-card">
      <el-col :span="4">
        <el-card shadow="always">
          <el-row>
            <el-col :span="12">
              <div>今日访问总人数</div>
              <div class="visitor-text">
                {{
                  statisticChartList.total_visit_count[
                    statisticChartList.total_visit_count.length - 1
                  ]?.visitor_rate
                }}
              </div>
              <div style="display: flex">
                <div class="visitor-title">
                  较昨日<span class="visitor-rate">
                    {{
                      (statisticChartList.total_visit_count[
                        statisticChartList.total_visit_count.length - 1
                      ]?.visitor_rate -
                        statisticChartList.total_visit_count[
                          statisticChartList.total_visit_count.length - 2
                        ]?.visitor_rate) /
                      statisticChartList.total_visit_count[
                        statisticChartList.total_visit_count.length - 2
                      ]?.visitor_rate
                    }}%
                  </span>
                </div>
                <el-icon class="visitor-icon" :size="20" color="red">
                  <Top />
                </el-icon>
              </div>
            </el-col>
            <el-col :span="12">
              <Chart
                :size="{ width: 180, height: 110 }"
                :data="statisticChartList.total_visit_count"
                :margin="chart1margin"
                :direction="chart1direction"
                :axis="chart1axis"
              >
                <template #layers>
                  <Line
                    :dataKeys="['date', 'visitor_rate']"
                    :lineStyle="{ stroke: '#000000' }"
                  />
                </template>
              </Chart>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <el-row>
            <el-col :span="12">
              <div>今日活跃用户数</div>
              <div class="visitor-text">
                {{
                  statisticChartList.total_active_user_count[
                    statisticChartList.total_active_user_count.length - 1
                  ]?.visitor_rate
                }}
              </div>
              <div style="display: flex">
                <div class="visitor-title">
                  较昨日<span class="visitor-rate"
                    >{{
                      (statisticChartList.total_active_user_count[
                        statisticChartList.total_active_user_count.length - 1
                      ]?.visitor_rate -
                        statisticChartList.total_active_user_count[
                          statisticChartList.total_active_user_count.length - 2
                        ]?.visitor_rate) /
                      statisticChartList.total_active_user_count[
                        statisticChartList.total_active_user_count.length - 2
                      ]?.visitor_rate
                    }}%
                  </span>
                </div>
                <el-icon class="visitor-icon" :size="20" color="red">
                  <Top />
                </el-icon>
              </div>
            </el-col>
            <el-col :span="12">
              <Chart
                :size="{ width: 180, height: 110 }"
                :data="statisticChartList.total_active_user_count"
                :margin="chart1margin"
                :direction="chart1direction"
                :axis="chart1axis"
              >
                <template #layers>
                  <Line
                    :dataKeys="['date', 'visitor_rate']"
                    :lineStyle="{ stroke: '#000000' }"
                  />
                </template>
              </Chart>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <el-row>
            <el-col :span="12">
              <div>实时在线人数</div>
              <div class="visitor-text">
                {{
                  statisticChartList.total_realtime_online_count[
                    statisticChartList.total_realtime_online_count.length - 1
                  ]?.visitor_rate
                }}
              </div>
              <div style="display: flex">
                <div class="visitor-title">
                  较昨日<span class="visitor-rate"
                    >{{
                      (statisticChartList.total_realtime_online_count[
                        statisticChartList.total_realtime_online_count.length - 1
                      ]?.visitor_rate -
                        statisticChartList.total_realtime_online_count[
                          statisticChartList.total_realtime_online_count.length - 2
                        ]?.visitor_rate) /
                      statisticChartList.total_realtime_online_count[
                        statisticChartList.total_realtime_online_count.length - 2
                      ]?.visitor_rate
                    }}%
                  </span>
                </div>
                <el-icon class="visitor-icon" :size="20" color="red">
                  <Top />
                </el-icon>
              </div>
            </el-col>
            <el-col :span="12">
              <Chart
                :size="{ width: 180, height: 110 }"
                :data="statisticChartList.total_realtime_online_count"
                :margin="chart1margin"
                :direction="chart1direction"
                :axis="chart1axis"
              >
                <template #layers>
                  <Line
                    :dataKeys="['date', 'visitor_rate']"
                    :lineStyle="{ stroke: '#000000' }"
                  />
                </template>
              </Chart>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <el-row>
            <el-col :span="12">
              <div>今日充值成功数</div>
              <div class="visitor-text">
                {{
                  statisticChartList.total_recharge_count[
                    statisticChartList.total_recharge_count.length - 1
                  ]?.visitor_rate
                }}
              </div>
              <div style="display: flex">
                <div class="visitor-title">
                  较昨日<span class="visitor-rate"
                    >{{
                      (statisticChartList.total_recharge_count[
                        statisticChartList.total_recharge_count.length - 1
                      ]?.visitor_rate -
                        statisticChartList.total_recharge_count[
                          statisticChartList.total_recharge_count.length - 2
                        ]?.visitor_rate) /
                      statisticChartList.total_recharge_count[
                        statisticChartList.total_recharge_count.length - 2
                      ]?.visitor_rate
                    }}%
                  </span>
                </div>
                <el-icon class="visitor-icon" :size="20" color="red">
                  <Top />
                </el-icon>
              </div>
            </el-col>
            <el-col :span="12">
              <Chart
                :size="{ width: 180, height: 110 }"
                :data="statisticChartList.total_recharge_count"
                :margin="chart1margin"
                :direction="chart1direction"
                :axis="chart1axis"
              >
                <template #layers>
                  <Line
                    :dataKeys="['date', 'visitor_rate']"
                    :lineStyle="{ stroke: '#000000' }"
                  />
                </template>
              </Chart>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.el-col-4 {
  max-width: 22%;
  flex: 0 0 25%;
  margin-right: 20px;
  margin-left: 20px;
}

.visitor-card {
  .el-card {
    border: none !important;
    background-color: #e4e4e4 !important;

    .el-card__body {
      .visitor-text {
        margin-top: 20px;
        font-weight: bold;
        font-size: 20px;
        margin-left: 20px;
      }

      .visitor-title {
        margin-top: 20px;
      }

      .visitor-rate {
        margin-top: 20px;
        color: red;
      }

      .visitor-icon {
        margin-top: 23px;
        color: red;
      }
    }
  }
}
</style>
