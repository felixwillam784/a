export interface GetUserData{
    nickname:	string
    uid:	string
    id:	number
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