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
    id: Number
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
}
export interface GetTestUserBasicDetailDataResponse {
    code: number | string
    data: GetTestUserBasicDetailData
    message: string
}