import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as DATA_ANALYSIS from '@/interface/data_analysis';


export const dataAnalysisStore = defineStore({
  id: 'data_analysis',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    gameReportList: {} as DATA_ANALYSIS.GameReportList
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getGameReportList: (state) => state.gameReportList
  },
  actions: {
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setGameReportList(gameReportList: DATA_ANALYSIS.GameReportList) {
        this.gameReportList = gameReportList
    },
    // get game report data for data analysis
    async dispatchGameReportList(formData: any) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.DATA_ANALYSIS.GAME_REPORT;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: DATA_ANALYSIS.GetGameReportList) => {
        if (response.code == "00") {
          this.setSuccess(true);
          this.setGameReportList(response.data);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
  }
})
