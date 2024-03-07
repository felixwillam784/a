import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Agent from "@/interface/agent";

export const agentStore = defineStore({
  id: 'agent',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    agentList: [] as Array<Agent.AgentListData>,
    totalNumber: 0 as number,
    agentData: {} as Agent.AgentDetailData,
    agentRiskControlStatusList: [] as Array<Agent.AgentRiskControlStatusData>,
    agentRebateStatisticsData: {} as Agent.AgentRebateStatisticData,
    agentStatisticReportList: [] as Array<Agent.AgentStatisticReportData>,
    agentInvitationRewardList: [] as Array<Agent.AgentInvitationRewardData>,
    agentInvitationRewardDetail: {} as Agent.AgentInvitationRewardData,
    agentInvitaionStatisticList: {} as Agent.AgentInvitationStatisticList,
    agentAchievementRewardList: [] as Array<Agent.AgentAchievementRewardData>,
    agentAchievementRewardDetail: {} as Agent.AgentAchievementRewardData,
    
    agentAchievementStageRewardList: [] as Array<Agent.AgentAchievementStageRewardData>,
    agentAchievementStatisticList: {} as Agent.AgentAchievementStatisticList,
    agentAchievementStageStatisticList: {} as Agent.AgentAchievementStageStatisticList,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getAgentList: (state) => state.agentList,
    getAgentData: (state) => state.agentData,
    getAentTotalNumber: (state) => state.totalNumber,
    getAgentRiskControlStatusList: (state) => state.agentRiskControlStatusList,
    getAgentRebateStatisticsData: (state) => state.agentRebateStatisticsData,
    getAgentStatisticReportList: (state) => state.agentStatisticReportList,
    getAgentInvitaionRewardList: (state) => state.agentInvitationRewardList,
    getAgentInvitaionRewardDetail: (state) => state.agentInvitationRewardDetail,
    getAgentInvitationStatisticList: (state) => state.agentInvitaionStatisticList,
    getAgentAchievementRewardList: (state) => state.agentAchievementRewardList,
    getAgentAchievementRewardDetail: (state) => state.agentAchievementRewardDetail,
    
    getAgentAchievementStageRewardList: (state) => state.agentAchievementStageRewardList,
    getAgentAchievementStatisticList: (state) => state.agentAchievementStatisticList,
    getAgentAchievementStageStatisticList: (state) => state.agentAchievementStageStatisticList,
  },
  actions: {
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setAgentList(agentList: Array<Agent.AgentListData>) {
      this.agentList = agentList;
    },
    setAgentTotalNumber(total: number) {
      this.totalNumber = total;
    },
    setAgentDetailData(agentData: Agent.AgentDetailData) {
      this.agentData = agentData
    },
    setAgentRiskControlStatusList(agentRiskControlStatusList: Array<Agent.AgentRiskControlStatusData>) {
      this.agentRiskControlStatusList = agentRiskControlStatusList;
    },
    setAgentRebateStatisticsData(agentRebateStatisticsData: Agent.AgentRebateStatisticData) {
      this.agentRebateStatisticsData = agentRebateStatisticsData
    },
    setAgentStatisticReportList(agentStatisticReportList: Array<Agent.AgentStatisticReportData>) {
      this.agentStatisticReportList = agentStatisticReportList
    },
    setAgentInvitaionRewardList(agentInvitaionRewardList: Array<Agent.AgentInvitationRewardData>) {
      this.agentInvitationRewardList = agentInvitaionRewardList
    },
    setAgentInvitationRewardDetail(agentInvitationRewardDetail: Agent.AgentInvitationRewardData) {
      this.agentInvitationRewardDetail = agentInvitationRewardDetail;
    },
    setAgentInvitaionStatisticList(agentInvitaionStatisticList: Agent.AgentInvitationStatisticList) {
      this.agentInvitaionStatisticList = agentInvitaionStatisticList
    },
    setAgentAchievementRewardList(agentAchievementRewardList: Array<Agent.AgentAchievementRewardData>) {
      this.agentAchievementRewardList = agentAchievementRewardList
    },
    setAgentAchievementStageRewardList(agentAchievementStageRewardList: Array<Agent.AgentAchievementStageRewardData>) {
      this.agentAchievementStageRewardList = agentAchievementStageRewardList
    },
    setAgentAchievementRewardDetail(agentAchievementRewardDetail: Agent.AgentAchievementRewardData) {
      this.agentAchievementRewardDetail = agentAchievementRewardDetail
    },
    setAgentAchievementStatisticList(agentAchievementStatisticList: Agent.AgentAchievementStatisticList) {
      this.agentAchievementStatisticList = agentAchievementStatisticList
    },
    setAgentAchievementStageStatisticList(agentAchievementStageStatisticList: Agent.AgentAchievementStageStatisticList) {
      this.agentAchievementStageStatisticList = agentAchievementStageStatisticList
    },
    // get agent list data
    async dispatchAgentList(formData: Agent.AgentListReqParameter) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentListDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentList(response.data.data_list);
          this.setAgentTotalNumber(response.data.total_count);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    async dispatchOnLoad(formData: Agent.AgentListReqParameter) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentListDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentList(this.agentList.concat(response.data.data_list));
          this.setAgentTotalNumber(response.data.total_count);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // terminate agent
    async dispatchTerminateAgent(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_DELETE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentTerminateResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    // terminate agent
    async dispatchDetailAgent(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentDetailResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentDetailData(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // get agent riks status control list
    async dispatchAgentRiskControlStatusList(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_RISK_CONTROL_STATUS_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentRiskControlStatusListResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentRiskControlStatusList(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // get agent rebate setting
    async dispatchAgentRebateSetting(formData: Agent.AgentRebateSettingFormData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_REBATE_SETTING;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentRebateSettingResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    // get agent rebate statistic data
    async dispatchAgentRebateStatisticList(formData: any) {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_REBATE_STATISTIC_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentRebateStatisticsResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentRebateStatisticsData(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // get agent statistic report data
    async dispatchAgentStatisticReportList(formData: any) {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_STATISTIC_REPORT_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentStatisticReportResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentStatisticReportList(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // get agent invitation reward data
    async dispatchAgentInvitationReward() {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_INVITAION_REWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentInvitationRewardListResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentInvitaionRewardList(response.data);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    async dispatchAgentInvitationRewardDetail(formData: any) {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_INVITAION_REWARD_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentInvitationRewardDetailResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentInvitationRewardDetail(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    async dispatchAgentInvitationRewardDelete(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_INVITAION_REWARD_DELETE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentInvitationRewardDetailResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // get agent statistic report data
    async dispatchAgentInvitationStatistic(formData: any) {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_INVITAION_STATISTIC_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentInvitationStatisticListResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentInvitaionStatisticList(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // get agent achievement reward data
    async dispatchAgentAchievementRewardList() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_REWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentAchievementRewardListResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentAchievementRewardList(response.data.data_list);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    async dispatchAgentAchievementRewardDetail(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_REWARD_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentAchievementRewardDetailResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentAchievementRewardDetail(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    async dispatchAgentAchievementRewardDelete(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_REWARD_DETAIL;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentAchievementRewardDetailResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentAchievementRewardDetail(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    async dispatchAgentAchievementRewardUpdate(formData: Agent.AgentAchievementRewardData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_REWARD_UPDATE;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentInvitationRewardUpdateResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchAgentAchievementRewardAdd(formData: Agent.AgentAchievementRewardData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_REWARD_ADD;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentInvitationRewardUpdateResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    // get agent achievement reward data
    async dispatchAgentAchievementStageRewardList() {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_STAGE_REWARD_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentAchievementStageRewardResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentAchievementStageRewardList(response.data.data_list);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    // get agent achievement reward data
    async dispatchAgentAchievementStatisticList(formData: any) {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_STATISTIC_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentAchievementStatisticListResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentAchievementStatisticList(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    // get agent achievement reward data
    async dispatchAgentAchievementStageStatisticList(formData: any) {      
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_ACHIEVEMENT_STAGE_STATISTIC_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentAchievementStageStatisticResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentAchievementStageStatisticList(response.data);
        }
      }
      await network.sendMsg(route, {paramas: formData}, next, 1, 4);
    },
  }
})
