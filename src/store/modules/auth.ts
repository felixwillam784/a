import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import type * as Auth from "@/interface/auth";
import type * as User from "@/interface/user";
import { Network } from "@/net/Network";
import { NetworkData } from '@/net/NetworkData';

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    token: NetworkData.getInstance().getToken() as string | undefined,
    userInfo: {
      id:0,
      name:"",
      role_id:1,
      token: NetworkData.getInstance().getToken() as string  || '',
      avatar: 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif',
      roles: [],
      perms: ["sys:menu:delete", "sys:dept:edit", "sys:dict_type:add", "sys:dict:edit", "sys:dict:delete", "sys:dict_type:edit", "sys:menu:add", "sys:user:add", "sys:role:edit", "sys:dept:delete", "sys:user:edit", "sys:user:delete", "sys:user:reset_pwd", "sys:dept:add", "sys:role:delete", "sys:dict_type:delete", "sys:menu:edit", "sys:dict:add", "sys:role:add"],
    } as User.GetUserInfo,
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getToken: (state) => state.token,
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
      this.token = token;
    },
    removeToken() {
      this.token = undefined;
      const networkData: NetworkData = NetworkData.getInstance();
      networkData.resetData();
    },
    setUserInfo(userInfo: User.GetUserInfo) {
      this.userInfo = userInfo;
    },
    // dipatch login
    async dispatchSignIn(msg: Auth.SigninRequestData) {
      this.setSuccess(false);
      const route: string = NETWORK.AUTH.LOGIN;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Auth.GetSigninResponseData) => {
        if (response.code == "00") {
          this.setToken(response.data.token);
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, msg, next, 1);
    },
    // dispatch logout function
    async dispatchSignout() {
      this.setSuccess(false);
      const route: string = NETWORK.AUTH.LOGOUT;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: Auth.GetSigninResponseData) => {
        console.log(response);
        if (response.code == "00") {
          this.removeToken();
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, {}, next, 1);
    },
  }
})
