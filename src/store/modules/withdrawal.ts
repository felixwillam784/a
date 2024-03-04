import { defineStore } from 'pinia'
import { NETWORKCFG } from '@/net/NetworkCfg';
import { Network } from "@/net/Network";
import type * as Withdrawal from "@/interface/withdrawal";
import { stringify } from 'querystring';
import { ElMessage } from 'element-plus';

export const withdrawalStore = defineStore({
    id: 'withdrawal',
    state: () => ({
        success: false as boolean,
        errMessage: '' as string,
        withdrawalReviewData: [] as Array<Withdrawal.GetWithdrawalReviewData>
    }),
    getters: {
        getWithdrawalReviewData: (state) => state.withdrawalReviewData
    },
    actions: {
        setSuccess(success: boolean) {
            this.success = success
        },
        setErrorMessage(message: string) {
            this.errMessage = message
        },
        setWithdrawalReviewData(data: Array<Withdrawal.GetWithdrawalReviewData>) {
            this.withdrawalReviewData = data;
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
            }
            }
            await network.sendMsg(route, { params: form_data }, next, 1);
        },
    }
})