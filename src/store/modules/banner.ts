import { defineStore } from "pinia";
import { NETWORKCFG } from "@/net/NetworkCfg";
import { Network } from "@/net/Network";
import  type * as Banner from '@/interface/banner';

export const bannerStore = defineStore({
  id: 'banner',
  state: () =>({
    success: false,
    errMessage: '',
    bannerList: [] as Array<Banner.BannerListData>,
    bannerDetail: {} as Banner.BannerListData
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getBannerList: (state) => state.bannerList,
    getBannerDetail: (state) => state.bannerDetail,
  },
  actions: {
    //set functions
    setSuccess(success: boolean) {
      this.success = success;
    },
    setErrorMessage(message: string) {
      this.errMessage = message;
    },
    setBannerList(data: Array<Banner.BannerListData>) {
      this.bannerList = data;
    },
    setBannerDetail(data: Banner.BannerListData) {
      this.bannerDetail = data;
    },
    //dispatch functions
    async dispatchBannerList() {
      this.setSuccess(false);
      const route = NETWORKCFG.WEBPAGE.BANNER_LIST;
      const network = Network.getInstance();

      const next = (response: Banner.GetBannerListResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
          this.setBannerList(response.data.list);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    //get detail
    async dispatchBannerDetail(formData: any) {
      this.setSuccess(false);
      const route = NETWORKCFG.WEBPAGE.BANNER_DETAIL;
      const network = Network.getInstance();

      const next = (response: Banner.GetBannerDetailResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
          this.setBannerDetail(response.data);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {formData}, next, 1, 4);
    },
    async dispatchBannerAdd(formData: any) {
      this.setSuccess(false);
      const route = NETWORKCFG.WEBPAGE.BANNER_ADD;
      const network = Network.getInstance();

      const next = (response: Banner.GetBannerAddResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchBannerUpdate(formData: any) {
      this.setSuccess(false);
      const route = NETWORKCFG.WEBPAGE.BANNER_UPDATE;
      const network = Network.getInstance();

      const next = (response: Banner.GetBannerUpdateResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchBannerDelete(formData: any) {
      this.setSuccess(false);
      const route = NETWORKCFG.WEBPAGE.BANNER_DELETE;
      const network = Network.getInstance();

      const next = (response: Banner.GetBannerDeleteResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },  
  }
})