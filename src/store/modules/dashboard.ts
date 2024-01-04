import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Dashboard from "@/interface/dashboard";


export const dashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    platformOverview: {} as Dashboard.PlatformOverviewData
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getPlatformOverview: (state) => state.platformOverview
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
  }
})
