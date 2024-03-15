import { start } from 'nprogress';
import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Withdrawal from "@/interface/withdrawal";
import { stringify } from 'querystring';
import { number } from 'echarts';
import { stat } from 'fs';
import { ElMessage } from 'element-plus';
import moment from 'moment-timezone';

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
      manualReduceListNumber: 0,
      fundsprohibitListData: [] as Array<Withdrawal.GetFundsprohibitListOrder>
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
      getManualReduceListNumber: (state) => state.manualReduceListNumber,
      getFundsprohibitListData: (state) => state.fundsprohibitListData
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
      setFundsprohibitListData(data: Array<Withdrawal.GetFundsprohibitListOrder>) {
        this.fundsprohibitListData = data;
      },

      async dispatchDepositList(formData:any) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.DEPOSITLIST;
        const network: Network = Network.getInstance();
        // response call back function
        const ref: any = {};
        Object.assign(ref, formData);
        delete ref.submission_time;
        delete ref.order_update_time;
        let tmp;
        if (formData.submission_time && formData.submission_time[0]) {
          tmp = formData.submission_time[0];
          ref.submission_start = new Date(formData.submission_time[0]).getTime() / 1000;
        } else {
          ref.submission_start = 0;
        }

        if (formData.submission_time && formData.submission_time[1]) {
          ref.submission_end = new Date(formData.submission_time[1]).getTime() / 1000;
        } else {
          ref.submission_end = Math.floor(new Date().getTime() / 1000);
        }

        if (formData.order_update_time && formData.order_update_time[0]) {
          ref.order_update_start = new Date(formData.order_update_time[0]).getTime() / 1000;
        } else {
          ref.order_update_start = 0;
        }
        if (formData.order_update_time && formData.order_update_time[1]) {
          ref.order_update_end = new Date(formData.order_update_time[1]).getTime() / 1000;
        } else {
          ref.order_update_end = Math.floor(new Date().getTime() / 1000);
        }
        if (!formData.amonut_start ) {
          ref.amonut_start = 0;
        }
        if (!formData.amount_end ) {
          ref.amount_end = 0;
        }
        const next = (response: Withdrawal.GetDepositOrderResponse) => {
          if (response.code == "00") {
            this.setSuccess(true);
            this.setDepositList(response.data.order_list);
            this.setTotalNumber(response.data.total_num);
          }
        }
        await network.sendMsg(route, {params: ref}, next, 1, 4);
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
      /**
         * 提现封禁列表
         * Withdrawal ban list
         */
      async dispatchFundsprohibitList(form_data: Withdrawal.FundsprohibitListForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.FUNDSPROHIBIT_LIST;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.GetFundsprohibitListReview) => {
            if (response.code == "00") {
                this.setSuccess(true);
                this.setFundsprohibitListData(response.data.user_list);
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
      /**
       * 提现封禁新增
       * Withdrawal ban added
       */
      async dispatchFundsprohibitCreate(form_data: Withdrawal.FundsprohibitCreateForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.FUNDSPROHIBIT_CREATE;
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
       * 提现封禁解除
       * Withdrawal ban lift
       */
      async dispatchFundsprohibitLift(form_data: Withdrawal.FundsprohibitLiftForm) {
        this.setSuccess(false);
        const route: string = NETWORKCFG.WITHDRAWAL.FUNDSPROHIBIT_LIFT;
        const network: Network = Network.getInstance();
        // response call back function
        const next = (response: Withdrawal.PostRequestResponse) => {
            if (response.code == "00") {
                this.setSuccess(true);
                ElMessage.success('解封成功');
            }
        }
        await network.sendMsg(route, form_data, next, 1);
      },
    }
  })
