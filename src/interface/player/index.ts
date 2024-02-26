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