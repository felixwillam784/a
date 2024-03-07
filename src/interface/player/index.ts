export interface GetUserData{
    nickname:	string
    uid:	string
    id:	string
    user_type:	number
    vip_level:	number
    user_status:	number
    account_withdrawal_prohibit: number
    idnumber_withdrawal_prohibit: number
    mark:	string
    created_at:	number
}

export type GetUserDataResponse = {
    code: number | string
    data: {total_count:number, data_list:Array<GetUserData>}
    message:string
}

export interface GetBaseDetailData{
    id: number
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
    withdraw_prohibit: number
    idnumber_withdrawal_prohibit: number
    account_suspend: number
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
export interface BankData {
    payee: string
    beneficiary_bank: string
    account: string
}

export interface PixData {
    name: string
    mail: string
    phone_number: string
    pix: string
}

export interface ElectronicWallet {
    payee: string
    beneficiary_bank: string
    account: string
}

export interface MexData {
    payee: string
    bank_code: string,
    withdrawal_method: string
    bank_card_number: string
    curp_type: string
    rfc_curp: string
}
export interface WithdrawalDetailData {
    bank_list: Array<BankData>
    pix_list: Array<PixData>
    electronic_wallet: Array<ElectronicWallet>
    mex_list: Array<MexData>
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