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

      GameManufactureList: [] as Array<Game.GameConfigData>,
      GameMakerList: [] as Array<Game.GameConfigData>, 
      GameGroupList: [] as Array<Game.GameConfigData>,
      GameTabList: [] as Array<Game.GameConfigData>,

      GameDetailData: {} as Game.GetGameDetailData,
    }),
    
    getters: {
      getSuccess: (state) => state.success,
      getErrMessage: (state) => state.errMessage,
        
      getGameDatas: (state) => state.GameDatas,
      getGameManufactureList: (state) => state.GameManufactureList,
      getGameMakerList: (state) => state.GameMakerList,
      getGameGroupList: (state) => state.GameGroupList,
      getGameTabList: (state) => state.GameTabList,

      getGameDetailData: (state) => state.GameDetailData,
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
      setGameManufactureList(data:Array<Game.GameConfigData>) {
        this.GameManufactureList = data;
      },
      setGameMakerList(data:Array<Game.GameConfigData>) {
        this.GameMakerList = data;
      },
      setGameGroupList(data:Array<Game.GameConfigData>) {
        this.GameGroupList = data;
      },
      setGameTabList(data:Array<Game.GameConfigData>) {
        this.GameTabList = data;
      },

      setGameDetailData(data:Game.GetGameDetailData) {
        this.GameDetailData = data;
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

      async dispatchGameGameManufactureList() {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_MANUFACTURE_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GameConfigDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setGameManufactureList(response.data);
          }
        }
        await network.sendMsg(route, {}, next, 1, 4);
      },

      async dispatchGameMakerList() {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_MAKER_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GameConfigDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setGameMakerList(response.data);
          }
        }
        await network.sendMsg(route, {}, next, 1, 4);
      },

      async dispatchGameGroupList() {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_GROUP_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GameConfigDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setGameGroupList(response.data);
          }
        }
        await network.sendMsg(route, {}, next, 1, 4);
      },

      async dispatchGameTabList() {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_TAB_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GameConfigDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setGameTabList(response.data);
          }
        }
        await network.sendMsg(route, {}, next, 1, 4);
      },

      async dispatchGameStatusChange(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_STATUS_CHANGE;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GameStatusChangeResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },

      async dispatchBatchAction(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_CONFIG_BATCH_ACTiON;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GameBatchActionResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },

      async dispatchGameDetail(game_id:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.Game.GAME_DETAIL;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Game.GetGameDetailDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setGameDetailData(response.data);
          }
        }
        await network.sendMsg(route, {params:{game_id:game_id}}, next, 1, 4);
      }
    }
  })