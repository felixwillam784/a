export interface GetDepositOrder {
    id: string
    user_account: string
    platform_order_number: string
    gaia_order_number: string
    upstream_channel: string
    upstream_order_number: string
    order_status: number
    amount_type: string
    recharge_amount: number
    actual_amount: number
    submission_time: string
    order_update_time: string
    recharge_method: string
    tax_number: string
    payment_channel: string
    recharge_type: number
    order_number: string
    deposit_type: number
    order_amount: string
    first_charge_status:boolean
  }

  export type GetDepositOrderResponse = {
    code: number | string
    data: {total_page: number, order_list:Array<GetDepositOrder>}
    message: string
  }
  export type PostRequestResponse = {
    code: number | string
    message: string
  }

  
export type GetWithdrawalReview = {
    code: number | string
    data: Array<GetWithdrawalReviewData>,
    message: string
}

export interface WithdrawalForm {
    user_account?: string
    submission_start: number
    submission_end: number
    order_update_start?: string
    order_update_end?: string
    platform_order_number?: string
    upstream_order_number?: string
    order_status?: string
    page_num: number
    page_size: number
}

export type GetWithdrawalReviewData = {
    order_list: Array<GetWithdrawalReviewList>
}

export interface GetWithdrawalReviewList {
    order_id: string
    user_account: string
    withdrawal_amount: number | string
    actual_amount: number | string
    fee: string
    order_status: number
    risk_control_hint: string
    gaia_order_number: string
    success_recharge_times: number
    success_withdrawal_times: number
    withdrawal_times: number
    kol_user: string
    platform_order_number: string
    upstream_order_number: string
    upstream_channel: string
    handling_fee: string
    free_charge: string
    operation_time: number
    total_recharge: string
    total_withdrawal: string
    withdrawal_channel: string
    withdrawal_method: string
    operator_id: string
    submission_time: number
}
