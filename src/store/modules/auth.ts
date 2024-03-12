import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import type * as Auth from "@/interface/auth";
import type * as User from "@/interface/user";
import { Network } from "@/net/Network";
import { NetworkData } from '@/net/NetworkData';

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    userInfo: {
      id: 0,
      name: "",
      role_id: 1,
      token: NetworkData.getInstance().getToken() as string || '',
      avatar: 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif',
      roles: [],
      perms: [],
    } as User.GetUserInfo,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setToken(token: string) {
      const networkData: NetworkData = NetworkData.getInstance();
      networkData.setToken(token);
    },
    removeToken() {
      const networkData: NetworkData = NetworkData.getInstance();
      networkData.resetData();
    },
    setUserInfo(userInfo: Auth.SigninResponseData) {
      //this.userInfo = userInfo;
      this.userInfo.id = userInfo.id;
      sessionStorage.setItem("id", String(userInfo.id));
      this.userInfo.name = userInfo.name;
      this.userInfo.role_id = userInfo.role_id;
      this.userInfo.token = userInfo.token;
    },
    // dipatch login
    async dispatchSignIn(msg: Auth.SigninRequestData) {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AUTH.LOGIN;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Auth.GetSigninResponseData) => {
        if (response.code == "00") {
          this.setToken(response.data.token);
          this.setUserInfo(response.data);
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, msg, next, 1);
    },
    // dispatch logout function
    async dispatchSignout() {
      this.setSuccess(false);
      const route: string = NETWORKCFG.AUTH.LOGOUT;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Auth.SignOutResponseData) => {
        if (response.code == "00") {
          this.removeToken();
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
  }
})
