export interface GetUserData{
    id:	string
    uid:	string
    nickname:	string
    created_at:	number
    user_type:	number
    vip_level:	number
    user_status:	number
    account_withdrawal_prohibit: number
    account_suspend: number
    account_prohibit: number
    mark:	string
}
export interface GetUserDataReq{
    uid:	string
    nickname:	string
    user_type:	number
    invitation_code:	string
    tags: string
    vip_level:	number
    phone:	string
    cpf:	number
    account_number: string
    create_start: number
    create_end: number
    page_num:	number
    page_size: number
}

export type GetUserDataResponse = {
    code: number | string
    data: {
        total:number, 
        list:Array<GetUserData>
    }
    message:string
}

export interface GetBaseDetailData{
    id: string
    uid: string
    nickname: string
    created_at: number
    updated_at: number
    sir_user_id: string
    invitation_code: string
    phone: string
    email: string
    register_ip: string
    ip_location: string
    user_type: number
    mark: string
    user_status: number
    account_withdrawal_prohibit: number
    account_suspend: number
    account_prohibit: number
    notes: string
}

export interface DepositWithrawDetailData {
    account_balance: string,
    withdraw_amount: string,
    frozen_balance: string,
    principal_balance: string,
    bonus_balance: string,
    bonus_amount: string,
    total_recharge: string,
    total_withdrawal: string,
    charge_withdrawal_difference: string,
    bet_amount: string,
    profit_and_loss: string,
    activity_bonus: string,
    vip_level: string,
    vip_rebate: number,
    vip_no_handling_fee: number,
    vip_upgrade_rewards: number,
    vip_deposit_progress: string,
    vip_betting_progress: string,
    total_vip_bonus: string,
    vip_weekly_rewards: string,
    vip_monthly_rewards: string,
    vip_day_rewards: string,
    vip_sign_rewards: string,
    vip_spinner_rewards: string,
    vip_task_rewards: string,
    recharge_rebate: string,
    vip_event_bonus: string,
  
    recharge_amount: string,
    deduction_amount: string,
    bet_count: string,   
}
export interface PaypalData {
    bank_id: string
    username: string
    email: string
    phone: string
    bank_number: string
}

export interface PixData {
    bank_id: string
    username: string
    email: string
    phone: string
    bank_number: string
    cpf: string
}

export interface SPEIData {
    bank_id: string
    username: string,
    email: string
    phone: string
    bank_number: string
    rfc: string
}
export interface WithdrawalDetailData {
    paypal_list: Array<PaypalData>
    pix_list: Array<PixData>
    spei_list: Array<SPEIData>
}
export type GetDepositWithrawDetailDataResponse = {
    code: number | string
    data: DepositWithrawDetailData
    message: string
}
export type GetDepositWithdrawalDetailDataResponse = {
    code: number | string
    data: WithdrawalDetailData
    message: string
}
export type GetBaseDetailDataResponse = {
    code: number | string
    data: GetBaseDetailData
    message:string
}

export interface PlayerPostRequestResponse {
    code: number | string
    message:string
}

export type GetTestUserData = {
    id:string	
    vip_level:string	
    account_amount: number	
    real_amount: number	
    bonus_amount: number	
    bet_times:	number
    bet_pnl: number	
    wagering_amount: number	
    vip_reward: number	
    create_time:	number
    operator_id:string	
    notes:string	
    account_prohibit: number
    switch_value: boolean
}

export interface GetTestUserDataResponse {
    code: number | string
    data: {data_list:Array<GetTestUserData>,  total_count:number}
    message: string
}

export type GetTestUserBasicDetailData = {
    id: number	
    password: string	
    create_time: number	
    operator_id: string	
    update_time: number	
    account_prohibit: number
    online_status: number
    last_login_ip: string	
    ip_location: string	
    notes: string

    account_status: boolean
}
export interface GetTestUserBasicDetailDataResponse {
    code: number | string
    data: GetTestUserBasicDetailData
    message: string
}

export type getUserAccountResponse = {
    code: number | string
    data: getUserAccountData
    message: string
}

export interface getUserAccountData {
    activity_bonus: string
    balance: string
    bet_amount: string
    bet_pl: string
    bet_times: string
    bonus: string
    desirable_amount: string
    diff_dw: string
    frozen_amount: string
    manual_deduct_amount: string
    manual_deposit_amount: string
    principal_amount: string
    prize_amount: string
    total_deposit_amount: string
    total_withdraw_amount: string
    vip_bet_award: string
    vip_bet_exp: string
    vip_deposit_exp: string
    vip_free_withdrawal_amount: string
    vip_level: string
    vip_level_up_award: string
    vip_rank_bet_exp: string
    vip_rank_deposit_exp: string
    vip_withdrawal_amount: string
    vip_total_reward: vipTotalRewardData
}

export interface vipTotalRewardData {
    activity_reward: string
    day_reward: string
    deposit_reward: string
    month_reward: string
    sign_reward: string
    spin_reward: string
    task_reward: string
    total_reward: string
    week_reward: string
}