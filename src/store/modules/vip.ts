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
    VIPManagementBasicDetailData: {} as VIP.GetVipRankBasicDetailData,
  }),
  
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getVIPManagementTable: (state) => state.VIPManagementTableData,
    getVIPManagementBasicDetailData: (state) => state.VIPManagementBasicDetailData,
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
    setVIPManagementBasicDetailData(data: VIP.GetVipRankBasicDetailData) {
      this.VIPManagementBasicDetailData = data
    },

    // get table data
    async dispatchVIPManagementTable() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_TABLE;
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

    // get basic detail data
    async dispatchVIPManagementBasicDetailData(vip_level:number) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_BASIC_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVipRankBasicDetailDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPManagementBasicDetailData(response.data);
        }
      }
      await network.sendMsg(route, {'vip_level':vip_level}, next, 1, 4);
    },
  }
})
