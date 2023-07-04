import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import type * as SignIn from "@/interface/signin";
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
      uid: "User6696608024",
      name: "Little Planes",
      avatar: new URL("@/assets/public/image/ua_public_10.png", import.meta.url).href,
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
    async dispatchSignIn(msg: SignIn.SigninRequestData) {
      this.setSuccess(false);
      const route: string = NETWORK.LOGIN.LOGIN;
      const network: Network = Network.getInstance();
      // response call back function
      const next = (response: SignIn.GetSigninResponseData) => {
        if (response.code == 200) {
          this.setToken(response.token);
          this.setSuccess(true);
        }
      }
      await network.sendMsg(route, msg, next, 1);
    },
    // dispatch logout function
    dispatchSignout() {
      this.removeToken();
    },
  }
})
