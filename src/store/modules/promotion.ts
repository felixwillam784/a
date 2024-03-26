import { defineStore } from "pinia";
import { NETWORKCFG } from "@/net/NetworkCfg";
import { Network } from "@/net/Network";
import * as Promotion from '@/interface/promotion';

export const promotionStore = defineStore({
  id: 'promotion',
  state: () =>({
    success: false,
    errMessage: '',
    promotionList: [] as Array<Promotion.PromotionListData>,
    promotionDetail: {} as Promotion.PromotionListData,
    promotionGroupList: [] as Array<Promotion.PromotionGroupData>
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getPromotionList: (state) => state.promotionList,
    getPromotionDetail: (state) => state.promotionDetail,
    getPromotionGroupList: (state) => state.promotionGroupList
  },
  actions: {
    //set functions
    setSuccess(success: boolean) {
      this.success = success;
    },
    setErrorMessage(message: string) {
      this.errMessage = message;
    },
    setPromotionList(data: Array<Promotion.PromotionListData>) {
      this.promotionList = data;
    },
    setPromotionDetail(data: Promotion.PromotionListData) {
      this.promotionDetail = data;
    },
    setPromotionGroupList(data: Array<Promotion.PromotionGroupData>) {
      this.promotionGroupList = data;
    },
    //dispatch functions
    async dispatchPromotionList() {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_LIST;
      const network = Network.getInstance();

      const next = (response: Promotion.GetPromotionListResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
          this.setPromotionList(response.data.list);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    async dispatchPromotionDetail(formData: any) {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_DETAIL;
      const network = Network.getInstance();
      const next = (response: Promotion.GetPromotionDetailResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
          this.setPromotionDetail(response.data);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {params: formData}, next, 1, 4);
    },
    async dispatchPromotionAdd(formData: any) {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_ADD;
      const network = Network.getInstance();
      const next = (response: Promotion.GetPromotionGroupDeleteRes) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchPromotionUpdate(formData: any) {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_UPDATE;
      const network = Network.getInstance();
      const next = (response: Promotion.GetPromotionGroupDeleteRes) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchPromotionDelete(formData: any) {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_DELETE;
      const network = Network.getInstance();
      const next = (response: Promotion.GetPromotionGroupDeleteRes) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchPromotionGroupList() {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_GROUP_LIST;
      const network = Network.getInstance();

      const next = (response: Promotion.GetPromotionGroupListResponse) => {
        if (response.code == '00') {
          this.setSuccess(true);
          this.setPromotionGroupList(response.data.list);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, {}, next, 1, 4);
    },
    async dispatchPromotionGroupAdd(formData: Promotion.PromotionGroupData) {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_GROUP_ADD;
      const network = Network.getInstance();

      const next = (response: Promotion.GetPromotionGroupDeleteRes) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchPromotionGroupUpdate(formData: Array<Promotion.PromotionGroupData>) {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_GROUP_UPDATE;
      const network = Network.getInstance();

      const next = (response: Promotion.GetPromotionGroupDeleteRes) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    },
    async dispatchPromotionGroupDelete(formData: Promotion.GetPromotionDeleteReq) {
      this.setSuccess(false);
      this.setErrorMessage('');
      const route = NETWORKCFG.WEBPAGE.PROMOTION_GROUP_DELETE;
      const network = Network.getInstance();

      const next = (response: Promotion.GetPromotionGroupDeleteRes) => {
        if (response.code == '00') {
          this.setSuccess(true);
        }
        else {
          this.setErrorMessage(response.message);
        }
      }
      await network.sendMsg(route, formData, next, 1);
    }
  }
})