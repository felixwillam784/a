import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as VIP from "@/interface/vip";
import { stringify } from 'querystring';
import { ElMessage } from 'element-plus';


export const vipStore = defineStore({
  id: 'vip',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,

    VIPRanks: [] as Array<VIP.GetVIPRanksData>,
    VIPLevelData: [] as Array<VIP.GetVIPLevelData>,

    VIPRankStatisticTableData: [] as Array<VIP.RankClientDistribution>,
    VIPLevelStatisticTableData: [] as Array<VIP.LevelClientDistribution>,
    VIPSigninData: [] as Array<VIP.GetVIPSigninData>,
    VIPSigninDetailsData: [] as Array<VIP.GetVIPSigninData>,
    VIPUpgradeRewardData: [] as Array<VIP.GetVIPUpgradeRewardData>,
    VIPWeeklyRewardData: [] as Array<VIP.GetVIPUpgradeRewardData>,
    VIPWeeklyRewardDetailData: [] as Array<VIP.GetVIPUpgradeRewardData>,
    VIPRankUpgradeRewardData: [] as Array<VIP.GetVIPUpgradeRewardData>,
  }),
  
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,

    getVIPRanks: (state) => state.VIPRanks,

    getVIPLevelData:(state) => state.VIPLevelData,

    getVIPRankStatisticTableData: (state) => state.VIPRankStatisticTableData,
    getVIPLevelStatisticTableData: (state) => state.VIPLevelStatisticTableData,
    getVIPSigninData: (state) => state.VIPSigninData,
    getVIPSigninDetailsData: (state) => state.VIPSigninDetailsData,
    getVIPUpgradeRewardData: (state) => state.VIPUpgradeRewardData,
    getVIPWeeklyRewardData: (state) => state.VIPWeeklyRewardData,
    getVIPWeeklyRewardDetailData: (state) => state.VIPWeeklyRewardDetailData,
    getVIPRankUpgradeRewardData: (state) => state.VIPRankUpgradeRewardData,
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
    setVIPSigninData(data: Array<VIP.GetVIPSigninData>) {
      this.VIPSigninData = data;
    },
    setVIPSigninDetailsData(data: Array<VIP.GetVIPSigninData>) {
      this.VIPSigninDetailsData = data;
    },
    setVIPUpgradeRewardData(data: any) {
      this.VIPUpgradeRewardData = data.list;
    },
    setVIPRankUpgradeRewardData(data: any) {
      this.VIPRankUpgradeRewardData = data.list;
    },
    setVIPWeeklyRewardData(data: Array<VIP.GetVIPUpgradeRewardData>) {
      this.VIPWeeklyRewardData = data;
    },
    setVIPWeeklyRewardDetailData(data: any) {
      this.VIPWeeklyRewardDetailData = data;
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
          this.setVIPRanks(response.data.list);

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

    /**
     * VIP签到奖励列表
     * VIP sign-in reward list
     */
    async dispatchVIPSignin() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_SIGNIN_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPSigninData(response.data);
        }
      }
      await network.sendMsg(route, { params: { page_num: 1, page_size: 99999 } }, next, 1, 4);
    },
    /**
     * VIP签到奖励详情
     * VIP sign-in reward details
     */
    async dispatchVIPSigninDetails(form_data: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_SIGNIN_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPSigninDetailsData(response.data);
        }
      }
      await network.sendMsg(route, { params: form_data }, next, 1, 4);
    },
    /**
     * VIP签到奖励更新
     * VIP sign-in reward update
     */
    async dispatchVIPSigninUpdate(form_data: VIP.GetVIPSigninData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_SIGNIN_UPDATE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.dispatchVIPSignin();
          ElMessage.success('更新成功');
        }
      }
      await network.sendMsg(route, form_data, next, 1);
    },
    /**
     * VIP升级奖励列表
     * VIP upgrade reward list
     */
    async dispatchVIPUpgradeReward() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_UPGRADE_BONUS_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPUpgradeRewardResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPUpgradeRewardData(response.data);
        }
      }
      await network.sendMsg(route, { params: { page_num: 1, page_size: 99999 } }, next, 1, 4);
    },
    /**
     * VIP升级奖励详情
     * VIP upgrade reward details
     */
    async dispatchVIPUpgradeBonusDetails(form_data: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_UPGRADE_BONUS_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPSigninDetailsData(response.data);
        }
      }
      await network.sendMsg(route, { params: form_data }, next, 1, 4);
    },
    /**
     * VIP升级奖励更新
     * VIP upgrade reward update
     */
    async dispatchVIPUpgradeBonusUpdate(form_data: VIP.GetVIPSigninData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_UPGRADE_BONUS_UPDATE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.dispatchVIPUpgradeReward();
          ElMessage.success('更新成功');
        }
      }
      await network.sendMsg(route, form_data, next, 1);
    },
    /**
     * VIP升段奖励列表
     * VIP rank upgrade reward list
     */
    async dispatchVIPRankUpgradeReward() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_RANK_UPGRADEAWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPUpgradeRewardResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPRankUpgradeRewardData(response.data);
        }
      }
      await network.sendMsg(route, { params: { page_num: 1, page_size: 99999 } }, next, 1, 4);
    },
    /**
     * VIP升段奖励详情
     * VIP rank upgrade reward details
     */
    async dispatchVIPRankUpgradeBonusDetails(form_data: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_RANK_UPGRADEAWARD_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPSigninDetailsData(response.data);
        }
      }
      await network.sendMsg(route, { params: form_data }, next, 1, 4);
    },
    /**
     * VIP升段奖励更新
     * VIP rank upgrade reward update
     */
    async dispatchVIPRankUpgradeBonusUpdate(form_data: VIP.GetVIPSigninData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_RANK_UPGRADEAWARD_UPDATE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.dispatchVIPRankUpgradeReward();
          ElMessage.success('更新成功');
        }
      }
      await network.sendMsg(route, form_data, next, 1);
    },
    /**
     * 周奖励列表
     * Weekly reward list
     */
    async dispatchVIPWeeklyRewardList() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_WEEKAWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPRankUpgradeRewardResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPWeeklyRewardData(response.data);
        }
      }
      await network.sendMsg(route, { params: { page_num: 1, page_size: 99999 } }, next, 1, 4);
    },
    /**
     * 周奖励详情
     * Weekly reward details
     */
    async dispatchVIPWeeklyRewardDetails(form_data: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_WEEKAWARD_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setVIPWeeklyRewardDetailData(response.data);
        }
      }
      await network.sendMsg(route, { params: form_data }, next, 1, 4);
    },
    /**
     * 周奖励更新
     * Weekly reward updates
     */
    async dispatchVIPWeeklyRewardUpdate(form_data: VIP.GetVIPSigninData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.VIP.VIP_WEEKAWARD_UPDATE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: VIP.GetVIPSinginResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.dispatchVIPWeeklyRewardList();
          ElMessage.success('更新成功');
        }
      }
      await network.sendMsg(route, form_data, next, 1);
    },
  }
})
