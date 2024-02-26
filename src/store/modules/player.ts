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
      

    }),
    
    getters: {
      getSuccess: (state) => state.success,
      getErrMessage: (state) => state.errMessage,

      getUserList: (state) => state.UserList,
      getTotalNumber: (state) => state.TotalNumber,
        
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
    }
  })