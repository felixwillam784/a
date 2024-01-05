import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as VIP from "@/interface/vip";


export const vipStore = defineStore({
  id: 'vip',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,

    VIPManagementTableData: [] as Array<VIP.GetVIPManagementTableData>,
  }),
  
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getVIPManagementTable: (state) => state.VIPManagementTableData,
  },

  actions: {
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },

    setVIPManagementTable(tableData: Array<VIP.GetVIPManagementTableData>) {
      this.VIPManagementTableData = tableData
    },
    // get platform overview data
    async dispatchVIPManagementTable() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.DASHBOARD.PLATFORM_OVERVIEW;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPManagementTableDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPManagementTable(response.data);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
  }
})
