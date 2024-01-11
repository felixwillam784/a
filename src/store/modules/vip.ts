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

    VIPRanks: [] as Array<string>,

    VIPManagementTableData: [] as Array<VIP.GetVIPManagementTableData>,
    VIPManagementBasicDetailData: {} as VIP.GetVIPManagementRankBasicDetailData,
    VIPManagementCodeRebateDetailData: {} as VIP.GetVIPManagementRankCodeRebateDetailData,
    VIPMAnagementClientLostRebateDetailData: {} as VIP.GetVIPMAnagementRankClientLostRebateDetailData,

    VIPRankStatisticTableData: [] as Array<VIP.RankClientDistribution>,
    VIPLevelStatisticTableData: [] as Array<VIP.LevelClientDistribution>,

  }),
  
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getVIPRanks: (state) => state.VIPRanks,

    getVIPManagementTable: (state) => state.VIPManagementTableData,
    getVIPManagementBasicDetailData: (state) => state.VIPManagementBasicDetailData,
    getVIPManagementCodeRebateDetailData: (state) => state.VIPManagementCodeRebateDetailData,
    getVIPManagementClientLostRebateDetailData: (state) => state.VIPMAnagementClientLostRebateDetailData,

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

    setVIPRanks(data:Array<string>) {
      this.VIPRanks = data;
    },

    setVIPManagementTable(tableData: Array<VIP.GetVIPManagementTableData>) {
      this.VIPManagementTableData = tableData
    },
    setVIPManagementBasicDetailData(data: VIP.GetVIPManagementRankBasicDetailData) {
      this.VIPManagementBasicDetailData = data
    },
    setVIPManagementCodeRebateDetailData(data: VIP.GetVIPManagementRankCodeRebateDetailData) {
      this.VIPManagementCodeRebateDetailData = data
    },
    setVIPManagementClientLostRebateDetailData(data: VIP.GetVIPMAnagementRankClientLostRebateDetailData) {
      this.VIPMAnagementClientLostRebateDetailData = data
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
          this.setVIPRanks(response.data.data);

        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    async dispatchUpdateVIPRanks() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPUpdateRanks;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.ResponseData) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, {data:this.getVIPRanks}, next, 1);
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

    // basic detail data
    async dispatchVIPManagementBasicDetailData(vip_level:number) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_BASIC_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPManagementRankBasicDetailDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPManagementBasicDetailData(response.data);

        }
      }
      await network.sendMsg(route, {'vip_level':vip_level}, next, 1, 4);
    },
    async dispatchUpdateVIPManagementBasicDetailData() {
      console.log(this.getVIPManagementBasicDetailData);
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_UPDATE_BASIC_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.ResponseData) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, this.getVIPManagementBasicDetailData, next, 1);
    },

    // code rebate detail data
    async dispatchVIPManagementCodeRebateDetailData(vip_level:number) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_CODE_REBATE_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPManagementRankCodeRebateDetailDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPManagementCodeRebateDetailData(response.data);
        }
      }
      await network.sendMsg(route, {'vip_level':vip_level}, next, 1, 4);
    },
    async dispatchUpdateVIPManagementCodeRebateDetailData() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_UPDATE_CODE_REBATE_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.ResponseData) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      console.log(this.getVIPManagementCodeRebateDetailData);
      await network.sendMsg(route, this.getVIPManagementCodeRebateDetailData, next, 1);
    },

    //client lost rebate detail data
    async dispatchVIPManagementClientLostRebateDetailData(vip_level:number) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_CLIENT_LOST_REBATE_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPMAnagementRankClientLostRebateDetailDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPManagementClientLostRebateDetailData(response.data);
        }
      }
      await network.sendMsg(route, {'vip_level':vip_level}, next, 1, 4);
    },
    async dispatchUpdateVIPManagementClientLostRebateDetailData() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_UPDATE_CLIENT_LOST_REBATE_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.ResponseData) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, this.getVIPManagementClientLostRebateDetailData , next, 1);
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
