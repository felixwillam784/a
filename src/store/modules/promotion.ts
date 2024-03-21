import { defineStore } from "pinia";
import { NETWORKCFG } from "@/net/NetworkCfg";
import { Network } from "@/net/Network";
import  type * as Promotion from '@/interface/promotion';

export const promotionStore = defineStore({
  id: 'promotion',
  state: () =>({
    success: false,
    errMessage: '',
    promotionList: [] as Array<Promotion.PromotionListData>,
    
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getPromotionList: (state) => state.promotionList,
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
  }
})