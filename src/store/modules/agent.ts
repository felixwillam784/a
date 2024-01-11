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
    agentData: {} as Agent.AgentDetailData,
    agentRiskControlStatusList: [] as Array<Agent.AgentRiskControlStatusData>,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getAgentList: (state) => state.agentList,
    getAgentData: (state) => state.agentData,
    getAgentRiskControlStatusList: (state) => state.agentRiskControlStatusList
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
    setAgentDetailData(agentData: Agent.AgentDetailData) {
      this.agentData = agentData
    },
    setAgentRiskControlStatusList(agentRiskControlStatusList: Array<Agent.AgentRiskControlStatusData>) {
      this.agentRiskControlStatusList = agentRiskControlStatusList;
    },
    // get agent list data
    async dispatchAgentList(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AGENT.AGENT_LIST;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Agent.GetAgentListDataResponse) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setAgentList(response.data);
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
  }
})
