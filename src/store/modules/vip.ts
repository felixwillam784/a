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
    VIPManagementBasicDetailData: {} as VIP.GetVIPManagementRankBasicDetailData,
    VIPManagementCodeRebateDetailData: {} as VIP.GetVIPManagementRankCodeRebateDetailData,
    VIPMAnagementClientLostRebateDetailData: {} as VIP.GetVIPMAnagementRankClientLostRebateDetailData,
  }),
  
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getVIPManagementTable: (state) => state.VIPManagementTableData,
    getVIPManagementBasicDetailData: (state) => state.VIPManagementBasicDetailData,
    getVIPManagementCodeRebateDetailData: (state) => state.VIPManagementCodeRebateDetailData,
    getVIPManagementClientLostRebateDetailData: (state) => state.VIPMAnagementClientLostRebateDetailData,
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
    setVIPManagementBasicDetailData(data: VIP.GetVIPManagementRankBasicDetailData) {
      this.VIPManagementBasicDetailData = data
    },
    setVIPManagementCodeRebateDetailData(data: VIP.GetVIPManagementRankCodeRebateDetailData) {
      this.VIPManagementCodeRebateDetailData = data
    },
    setVIPManagementClientLostRebateDetailData(data: VIP.GetVIPMAnagementRankClientLostRebateDetailData) {
      this.VIPMAnagementClientLostRebateDetailData = data
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
      const next = (response: VIP.GetVIPManagementRankBasicDetailDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPManagementBasicDetailData(response.data);
          let rebate_way_letter = ['', '打码返利', '客损返利', '无返利'];
          let protect_vip_letter = ['', '开启保级', '关闭保级'];

          let t : any = response.data.rebate_way;
          response.data.rebate_way = rebate_way_letter[t];
          t = response.data.protect_vip;
          response.data.protect_vip = protect_vip_letter[t];
        }
      }
      await network.sendMsg(route, {'vip_level':vip_level}, next, 1, 4);
    },

    async dispatchVIPManagementCodeRebateDetailData(vip_level:number) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_CODE_REBATE_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPManagementRankCodeRebateDetailDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          let fund_letter = ['', '不释放', '释放'];
          let order_letter = ['', '实时结算', '每日刷新结算', '每周刷新结算', '每月刷新结算', '天后刷新结算'];
          let rebate_mode_letter = ['', '玩家手动领取', '结算时自动到账'];
          let t : any = response.data.rebate_fund_time;
          response.data.rebate_fund_time = fund_letter[t];
          t = response.data.rebate_order_time
          response.data.rebate_order_time = order_letter[t];
          t = response.data.rebate_mode
          response.data.rebate_mode = rebate_mode_letter[t];
          this.setVIPManagementCodeRebateDetailData(response.data);
        }
      }
      await network.sendMsg(route, {'vip_level':vip_level}, next, 1, 4);
    },

    async dispatchVIPManagementClientLostRebateDetailData(vip_level:number) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIPMANAGEMENT_CLIENT_LOST_REBATE_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPMAnagementRankClientLostRebateDetailDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          let fund_letter = ['', '不释放', '释放'];
          let order_letter = ['', '实时结算', '每日刷新结算', '每周刷新结算', '每月刷新结算', '天后刷新结算'];
          let rebate_mode_letter = ['', '玩家手动领取', '结算时自动到账'];
          let t : any = response.data.client_lost_rebate_fund_time;
          response.data.client_lost_rebate_fund_time = fund_letter[t];
          t = response.data.client_lost_rebate_order_time;
          response.data.client_lost_rebate_order_time = order_letter[t];
          t = response.data.client_lost_rebate_mode;
          response.data.client_lost_rebate_mode = rebate_mode_letter[t];
          this.setVIPManagementClientLostRebateDetailData(response.data);
        }
      }
      await network.sendMsg(route, {'vip_level':vip_level}, next, 1, 4);
    },
  }
})
