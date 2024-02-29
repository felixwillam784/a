import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Player from "@/interface/player";
import { stringify } from 'querystring';
import { number } from 'echarts';
import { stat } from 'fs';

export const playerStore = defineStore({
    id: 'player',
    state: () => ({
      success: false as boolean,
      errMessage: '' as string,
      
      UserList: [] as Array<Player.GetUserData>,
      TotalNumber: 1 as number,
      
      BasicDetail: {} as Player.GetBaseDetailData,

    }),
    
    getters: {
      getSuccess: (state) => state.success,
      getErrMessage: (state) => state.errMessage,

      getUserList: (state) => state.UserList,
      getTotalNumber: (state) => state.TotalNumber,

      getBasicDetail: (state) => state.BasicDetail,
        
    },
  
    actions: {
      setSuccess(success: boolean) {
        this.success = success
      },
      setErrorMessage(message: string) {
        this.errMessage = message
      },

      setUserList(data:Array<Player.GetUserData>) {
        this.UserList = data;
      },
      setTotalNumber(data:number) {
        this.TotalNumber = data;
      },

      setBasicDetail(data:Player.GetBaseDetailData) {
        this.BasicDetail = data;
      },

      async dispatchGetUserList(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.USERLIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.GetUserDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setUserList(response.data.data_list);
            this.setTotalNumber(response.data.total_count);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },

      async dispatchAddBlackList(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.SET_BLACKLIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },

      async dispatchProhibitWithdrawal(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.PROHIBIT_WITHDRAWAL;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },

      async dispatchPlayerBasicDetail(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.BASIC_DETAIL;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.GetBaseDetailDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setBasicDetail(response.data);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },

      async dispatchUpdatePhoneNumber(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_PHONE;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },

      async dispatchUpdateMark(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_MARK;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
    }
  })