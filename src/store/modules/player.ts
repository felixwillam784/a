import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Player from "@/interface/player";

export const playerStore = defineStore({
    id: 'player',
    state: () => ({
      success: false as boolean,
      errMessage: '' as string,
      
      UserList: [] as Array<Player.GetUserData>,
      TotalNumber: 1 as number,
      
      BasicDetail: {} as Player.GetBaseDetailData,
      DepositWithrawDetail: {} as Player.DepositWithrawDetailData,
      WithdrawalDetailData: {} as Player.WithdrawalDetailData,
      TestAccountList: [] as Array<Player.GetTestUserData>,
      TestUserBasicDetail: {} as Player.GetTestUserBasicDetailData,
      userAccountList: {} as Player.getUserAccountData,
      userInviteList: {} as Player.getUserInviteData
    }),
    
    getters: {
      getSuccess: (state) => state.success,
      getErrMessage: (state) => state.errMessage,

      getUserList: (state) => state.UserList,
      getTotalNumber: (state) => state.TotalNumber,

      getBasicDetail: (state) => state.BasicDetail,
      getDepositWithrawDetail: (state) => state.DepositWithrawDetail,
      getWithdrawalDetailData: (state) => state.WithdrawalDetailData,
      getTestAccountList: (state) => state.TestAccountList,
      getTestUserBasicDetail: (state) => state.TestUserBasicDetail,
      getUserAccountList: (state) => state.userAccountList,
      getuserInviteList: (state) => state.userInviteList
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
      setDepositWithrawDetail(data: Player.DepositWithrawDetailData) {
        this.DepositWithrawDetail = data;
      },
      setWithdrawalDetailData(data: Player.WithdrawalDetailData) {
        this.WithdrawalDetailData = data; 
      },
      setTestAccountList(data:Array<Player.GetTestUserData>) {
        this.TestAccountList = data;
        this.TestAccountList.forEach(element => {
          element.switch_value = element.account_prohibit == 1 ? false :true;
        });
      },
      setTestUserBasicDetail(data:Player.GetTestUserBasicDetailData) {
        this.TestUserBasicDetail = data;
        this.TestUserBasicDetail.account_status = this.TestUserBasicDetail.account_prohibit == 1 ? true : false;
      },
      setUserAccountList(data: Player.getUserAccountData) {
        this.userAccountList = data;
      },
      setUserInviteList(data: Player.getUserInviteData) {
        this.userInviteList = data;
      },

      async dispatchGetUserList(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.USERLIST;
        const network: Network = Network.getInstance();
        // response call back function
        const ref: any = {};
        Object.assign(ref, formData);
        if (ref.user_type === '') {
          ref.user_type = 0;
        }
        if (ref.vip_level === '') {
          ref.vip_level = -1;
        }
        const next = (response: Player.GetUserDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setUserList(response.data.list);
            this.setTotalNumber(response.data.total);
          }
        }
        await network.sendMsg(route, {params: ref}, next, 1, 4);
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
      async dispatchDepositWithrawDetailData(formData: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.DEPOSIT_WITHDRAWAL;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.GetDepositWithrawDetailDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setDepositWithrawDetail(response.data);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },
      async dispatchWithdrawalDetailData(formData: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.WITHDRAWAL_DETAIL;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.GetDepositWithdrawalDetailDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setWithdrawalDetailData(response.data);
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
      async dispatchUpdateNote(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_NOTE;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      async dispatchUpdateMail(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_MAIL;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },

      async dispatchGetTestUserList(formData: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.TEST_USER_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.GetTestUserDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setTestAccountList(response.data.data_list);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },
      async dispatchUpdatebankData(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_BANK;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      async dispatchDeletebankData(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.DLELETE_BANK;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      async dispatchUpdatewalletData(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_WALLET;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      async dispatchUpdatePixData(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_PIX;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      async dispatchUpdateMexData(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_MEX;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      async dispatchGetTestUserBasicDetail(formData: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.TEST_USER_BASIC_DETAIL;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.GetTestUserBasicDetailDataResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setTestUserBasicDetail(response.data);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },
      async dispatchUpdateTestUserStatus(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.UPDATE_NOTE;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.PlayerPostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      /**
       * 查询账户信息
       * Query account information 
       */
      async dispatchUserAccountList(formData: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.USER_ACCOUNT;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.getUserAccountResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setUserAccountList(response.data);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },
      /**
       * 查询代理信息
       * Query agent information 
       */
      async dispatchUserInviteList(formData: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.PLAYER.USER_INVITE;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Player.getUserInviteResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setUserInviteList(response.data);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },
    }
  })