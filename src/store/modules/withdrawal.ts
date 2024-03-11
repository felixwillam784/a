import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Withdrawal from "@/interface/withdrawal";
import { stringify } from 'querystring';
import { number } from 'echarts';
import { stat } from 'fs';
import { ElMessage } from 'element-plus';

export const withdrawalStore = defineStore({
    id: 'withdrawal',
    state: () => ({
      success: false as boolean,
      errMessage: '' as string,

      DepositList: [] as Array<Withdrawal.GetDepositOrder>,
      TotalNumber: 1 as number,
      withdrawalReviewData: [] as Array<Withdrawal.GetWithdrawalReviewList>,
      manualAddListData: [] as Array<Withdrawal.GetManualAddListOrder>,
      withdrawalReviewNumber: 0,
      manualReduceListData: [] as Array<Withdrawal.GetManualAddListOrder>,
      manualAddListNumber: 0,
      manualReduceListNumber: 0
    }),
    
    getters: {
      getSuccess: (state) => state.success,
      getErrMessage: (state) => state.errMessage,

      getDepositList: (state) => state.DepositList,
      getTotalNumber: (state) => state.TotalNumber,
      getWithdrawalReviewData: (state) => state.withdrawalReviewData,
      getManualAddListData: (state) => state.manualAddListData,
      getWithdrawalReviewNumber: (state) => state.withdrawalReviewNumber,
      getManualReduceListData: (state) => state.manualReduceListData,
      getManualAddListNumber: (state) => state.manualAddListNumber,
      getManualReduceListNumber: (state) => state.manualReduceListNumber
    },
  
    actions: {
      setSuccess(success: boolean) {
        this.success = success
      },
      setErrorMessage(message: string) {
        this.errMessage = message
      },

      setDepositList(data:Array<Withdrawal.GetDepositOrder>) {
        this.DepositList = data;
      },
      setTotalNumber(data:number) {
        this.TotalNumber = data;
      },
      setWithdrawalReviewData(data: Array<Withdrawal.GetWithdrawalReviewList>) {
        this.withdrawalReviewData = data;
      },
      setWithdrawalReviewNumber(value: number) {
        this.withdrawalReviewNumber = value;
      },
      setManualAddListData(data: Array<Withdrawal.GetManualAddListOrder>) {
        this.manualAddListData = data;
      }, 
      setManualReduceListData(data: Array<Withdrawal.GetManualAddListOrder>) {
        this.manualReduceListData = data;
      },
      setManualAddListNumber(value: number) {
        this.manualAddListNumber = value;
      },
      setManualReduceListNumber(value: number) {
        this.manualReduceListNumber = value;
      },

      async dispatchDepositList(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.DEPOSITLIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetDepositOrderResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setDepositList(response.data.order_list);
            this.setTotalNumber(response.data.total_num);
          }
        }
        await network.sendMsg(route, {params:formData}, next, 1, 4);
      },
      async dispatchUpdateSupply(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.UPDATE_SUPPLIMENT;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.PostRequestResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
          }
        }
        await network.sendMsg(route, formData, next, 1);
      },
      /**
         * 提现审核列表
         * Withdrawal review list
         */
      async dispatchWithdrawalReviewList(form_data: Withdrawal.WithdrawalForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.WITHDRAWAL_REVIEW_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetWithdrawalReview) => {
            if (response.code == "00") {
                this.setSuccess(true);
                this.setWithdrawalReviewData(response.data.order_list);
                this.setWithdrawalReviewNumber(response.data.total_num);
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
      /**
         * 提现审核锁定
         * Withdrawal review lock
         */
      async dispatchWithdrawalReviewLock(form_data: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.WITHDRAWAL_REVIEW_LOCK;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetWithdrawalReview) => {
            if (response.code == "00") {
                this.setSuccess(true);
                ElMessage.success('操作成功');
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
      /**
         * 提现审核操作
         * Withdrawal review operation
         */
      async dispatchWithdrawalReviewOperation(form_data: any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.WITHDRAWAL_REVIEW_OPERATION;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetWithdrawalReview) => {
            if (response.code == "00") {
                this.setSuccess(true);
                ElMessage.success('操作成功');
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
      /**
         * 人工入款列表
         * Manual deposit list
         */
      async dispatchManualAddList(form_data: Withdrawal.ManualAddListForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.MANUAL_ADD_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetManualAddListReview) => {
            if (response.code == "00") {
                this.setSuccess(true);
                this.setManualAddListData(response.data.order_list);
                this.setManualAddListNumber(response.data.total_num);
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
      /**
       * 人工入款新增
       * deposit added
       */
      async dispatchManualAddCreate(form_data: Withdrawal.ManualAddCreateForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.MANUAL_ADD_CREATE;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.PostRequestResponse) => {
            if (response.code == "00") {
                this.setSuccess(true);
                ElMessage.success('新增成功');
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
      /**
         * 人工扣款列表
         * Manual deposit list
         */
      async dispatchManualReduceList(form_data: Withdrawal.ManualAddListForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.MANUAL_REDUCE_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetManualAddListReview) => {
            if (response.code == "00") {
                this.setSuccess(true);
                this.setManualReduceListData(response.data.order_list);
                this.setManualReduceListNumber(response.data.total_num);
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
      /**
       * 人工扣款新增
       * Manual deduction added
       */
      async dispatchManualReduceCreate(form_data: Withdrawal.ManualAddCreateForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.MANUAL_REDUCE_CREATE;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.PostRequestResponse) => {
            if (response.code == "00") {
                this.setSuccess(true);
                ElMessage.success('新增成功');
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
    }
  })
