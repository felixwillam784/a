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

export interface StatisticsChartData {
    date: string
    visitor_rate: number
}

export interface StatisticsChartList {
    total_active_user_count: Array<StatisticsChartData>
    total_realtime_online_count: Array<StatisticsChartData>
    total_recharge_count: Array<StatisticsChartData>
    total_visit_count: Array<StatisticsChartData>
}

export type GetStatisticsChartListResponse = {
    code: number | string
    data: StatisticsChartList
    message: string
}

export type GetPlatformOverviewResponse = {
    code: number | string
    data: PlatformOverviewData
    message: string
}