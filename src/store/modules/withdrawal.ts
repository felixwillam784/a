import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Withdrawal from "@/interface/withdrawal";
import { stringify } from 'querystring';
import { number } from 'echarts';
import { stat } from 'fs';

export const withdrawalStore = defineStore({
    id: 'withdrawal',
    state: () => ({
      success: false as boolean,
      errMessage: '' as string,

      DepositList: [] as Array<Withdrawal.GetDepositOrder>,
      TotalNumber: 1 as number,
    }),
    
    getters: {
      getSuccess: (state) => state.success,
      getErrMessage: (state) => state.errMessage,

      getDepositList: (state) => state.DepositList,
      getTotalNumber: (state) => state.TotalNumber,
    },
  
    actions: {
      setSuccess(success: boolean) {
        this.success = success
      },
      setErrorMessage(message: string) {
        this.errMessage = message
      },

      setDepositList(data:Array<Withdrawal.GetDepositOrder>) {
        this.DepositList = data;
      },
      setTotalNumber(data:number) {
        this.TotalNumber = data;
      },

      async dispatchDepositList(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.DEPOSITLIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetDepositOrderResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setDepositList(response.data.order_list);

            this.setTotalNumber(response.data.total_page);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },
      async dispatchUpdateSupply(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.UPDATE_SUPPLIMENT;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.PostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
    }
  })