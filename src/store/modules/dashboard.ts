import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Dashboard from "@/interface/dashboard";


export const dashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    platformOverview: {} as Dashboard.PlatformOverviewData,
    statisticChartList: {} as Dashboard.StatisticsChartList
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getPlatformOverview: (state) => state.platformOverview,
    getStatisticChartList: (state) => state.statisticChartList
  },
  actions: {
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setPlatformOverview(platformOverview: Dashboard.PlatformOverviewData) {
        this.platformOverview = platformOverview
    },
    setStatisticChartList(statisticChartList: Dashboard.StatisticsChartList) {
      this.statisticChartList = statisticChartList
    },
    // get platform overview data
    async dispatchPlatformOverview() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.DASHBOARD.PLATFORM_OVERVIEW;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Dashboard.GetPlatformOverviewResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setPlatformOverview(response.data);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // get platform overview data
    async dispatchStatisticsChartList() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.DASHBOARD.STATISTIC_CHART_DATA;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Dashboard.GetStatisticsChartListResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setStatisticChartList(response.data);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
  }
})
