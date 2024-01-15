import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as VIP from "@/interface/vip";
import { stringify } from 'querystring';


export const vipStore = defineStore({
  id: 'vip',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,

    VIPRanks: [] as Array<VIP.GetVIPRanksData>,
    VIPLevelData: [] as Array<VIP.GetVIPLevelData>,

    VIPRankStatisticTableData: [] as Array<VIP.RankClientDistribution>,
    VIPLevelStatisticTableData: [] as Array<VIP.LevelClientDistribution>,

  }),
  
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getVIPRanks: (state) => state.VIPRanks,

    getVIPLevelData:(state) => state.VIPLevelData,

    getVIPRankStatisticTableData: (state) => state.VIPRankStatisticTableData,
    getVIPLevelStatisticTableData: (state) => state.VIPLevelStatisticTableData,

  },

  actions: {
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },

    setVIPRanks(data:Array<VIP.GetVIPRanksData>) {
      this.VIPRanks = data;
    },

    setVIPLevelData(data:Array<VIP.GetVIPLevelData>){
      this.VIPLevelData = data;
    },

    setVIPRankStatisticTableData(data:Array<VIP.RankClientDistribution>){
      this.VIPRankStatisticTableData = data
    },
    setVIPLevelStatisticTableData(data:Array<VIP.LevelClientDistribution>){
      this.VIPLevelStatisticTableData = data;
    },



    //get VIPRanks Data
    async dispatchVIPRanks() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPRanks;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPRanksDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPRanks(response.data);

        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    async dispatchUpdateVIPRanks() {
      console.log(this.getVIPRanks);
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPUpdateRanks;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.ResponseData) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, this.getVIPRanks, next, 1);
    },

    //VIPLevel
    async dispatchVIPLevel() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_TABLE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPLevelResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPLevelData(response.data);
        }
      }
      await network.sendMsg(route, {params:{page_num:1, page_size:99999}}, next, 1, 4);
    },


    //VIPRankStatisticTableData
    async dispatchVIPRankStatisticTableData(form_data:any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPRankStatistic_Table;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.RankClientDistributionResponseData) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPRankStatisticTableData(response.data);
        }
      }
      await network.sendMsg(route, {params:form_data}, next, 1, 4);
    },

    async dispatchVIPLevelStatisticTableData(form_data:any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPLevelStatistic_Table;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.LevelClientDistributionResponseData) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPLevelStatisticTableData(response.data);
        }
      }
      await network.sendMsg(route, {params:form_data}, next, 1, 4);
    },

  }
})
