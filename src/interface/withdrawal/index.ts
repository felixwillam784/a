export type GetWithdrawalReview = {
    code: number | string
    data: Array<GetWithdrawalReviewData>,
    message: string
}

export interface WithdrawalForm {
    user_account?: string
    submission_start: string
    submission_end: string
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