export interface AgentListData {
    user_id: number
    total_recharge_amount: number
    total_withdrawal_amount: number
    total_invite_count: number
    level1_charge_withdraw_difference: number
    level1_payment_amount: number
    level1_withdrawal_amount: number
    agent_betting_rebate_amount: number
    level1_paid_user_count: number
    risk_control_agent_count: number
    average_agent_recharge: number
    agent_achievement_rewards: number
    agent_invitation_rewards: number
    agent_status: number
    account_risk_countrol_status: number
}

export interface AgentDetailData {
    account_risk_control_status: number
    all_subordinates: number
    agent_belong_to_superior: number
    agent_type: number
    agent_status: number
    rating: number
    recharge_amount_of_sum: number
    subordinate_withdrawal_sum: number
    total_profit_and_loss: number
    recharger_number: number
    subordinate_total_betting_amount: number
    betting_rebate_amount: number
    agent_direct_rewards: number
    agent_achievement_rewards: number
    agent_task_rewards: number
    yesterday_rebate_amount: number
    last_withdrawal_days_number: number
    last_invite_days_number: number
    first_level_registration_number: number
    second_level_registration_number: number
    third_level_registration_number: number
    first_level_recharge_number: number
    second_level_recharge_number: number
    third_level_recharge_number: number
    first_level_recharge_amount: number
    second_level_recharge_amount: number
    third_level_recharge_amount: number
    first_level_withdrawal_amount: number
    second_level_withdrawal_amount: number
    third_level_withdrawal_amount: number
    first_level_charge_withdrawal_difference: number
    second_level_charge_withdrawal_difference: number
    third_level_charge_withdrawal_difference: number
    first_level_betting_rebate: number
    second_level_betting_rebate: number
    third_level_betting_rebate: number
    first_level_risk_control_count: number
    second_level_risk_control_count: number
    third_level_risk_control_count: number
}

export interface AgentRiskControlStatusData {
    id: number
    name: string
}

export type GetAgentListDataResponse = {
    code: number | string
    data: Array<AgentListData>
    message: string
}

export type GetAgentTerminateResponse = {
    code: number | string
    message: string
}

export type GetAgentDetailResponse = {
    code: number | string
    data: AgentDetailData,
    message: string
}

export type GetAgentRiskControlStatusListResponse = {
    code: number | string
    data: Array<AgentRiskControlStatusData>
    message: string
}