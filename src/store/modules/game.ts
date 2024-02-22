import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Game from "@/interface/game";
import { stringify } from 'querystring';

export const gameStore = defineStore({
    id: 'game',
    state: () => ({
      success: false as boolean,
      errMessage: '' as string,
  
      GameDatas: [] as Array<Game.GetGameData>,
    }),
    
    getters: {
      getSuccess: (state) => state.success,
      getErrMessage: (state) => state.errMessage,
        
      getGameDatas: (state) => state.GameDatas,
    },
  
    actions: {
      setSuccess(success: boolean) {
        this.success = success
      },
      setErrorMessage(message: string) {
        this.errMessage = message
      },
  
      setGameDatas(data:Array<Game.GetGameData>) {
        this.GameDatas = data;
      },

      async dispatchGameDatas(form_data:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_CONFIG;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GetGameDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setGameDatas(response.data);
          }
        }
        await network.sendMsg(route, {params:form_data}, next, 1, 4);
      },
    }
  })