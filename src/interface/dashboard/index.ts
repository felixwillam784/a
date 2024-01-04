export interface PlatformOverviewData {
    platform_balance: number | string
    total_recharge_amount: number | string
    total_withdrawal_amount: number | string
    charge_withdrawal_difference: number | string
    withdrawal_fee: number | string
    total_withdrawal: number | string
    bonus_amount: number | string
    registration_number: number | string
    depositor_number: number | string
    lifting_ratio: number | string
    agent_number: number | string
    total_recharge_number: number | string
    total_acive_user_number: number | string
    new_player_number: number | string
    recharge_code_rate: number | string
}

export type GetPlatformOverviewResponse = {
    code: number | string
    data: PlatformOverviewData
    message: string
}