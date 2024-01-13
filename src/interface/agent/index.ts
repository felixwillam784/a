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

export interface AgentRebateSettingFormData {
    agent_mode: number | string
    level1_agent_rebate: number | string
    level2_agent_rebate: number | string
    level3_agent_rebate: number | string
    rebate_mode: number | string
    rebate_fund_time: number | string
    rebate_fund_time_amount: number | string
    rebate_order_time: number | string
    rebate_order_time_amount: number | string
    betting_odds: number | string
}

export interface AgentRebateStatisticList {
    agent_withdraw_amount: number
    agent_withdraw_count: number
    agent_withdraw_user_count: number
    date: number
}

export interface AgentRebateStatisticData {
    agent_withdraw_total_amount: number
    agent_withdraw_total_count: number
    agent_withdraw_user_total_count: number
    data_list: Array<AgentRebateStatisticList>
}

export interface AgentStatisticReportData {
    date: number
    day15_activity_rate: number
    day30_activity_rate: number
    day3_activity_rate: number
    day7_activity_rate: number
    new_achievement_reward: number
    new_active_agent_count: number
    new_agent_count: number
    new_betting_rebate_amount: number
    new_deposit_reward: number
    new_level_deposit_withdraw_difference: number
    new_level_payment_amount: number
    new_level_payment_count: number
    new_level_register_count: number
    new_level_withdraw_amount: number
    own_risk_control_agent_count: number
    risk_control_agent_count: number
    total_active_agent_count: number
    total_agent_count: number
}

export interface AgentInvitationRewardData {
    id: number
    invite_reward_amount: number
    maximum_invite_number: number
    minimum_invite_number: number
    required_code_magnification: number
}

export type GetAgentInvitationRewardListResponse = {
    code: number | string
    data: Array<AgentInvitationRewardData>
    message: string
}

export interface AgentInvitationStatisticData {
    condition_satisfaction_total_count: number
    id: number
    maximum_invite_number: number
    minimum_invite_number: number
    total_withdraw_amount: number
}

export interface AgentInvitationStatisticList {
    total_invite_count: number
    total_statisitc_withdrawal: number
    data_list: Array<AgentInvitationStatisticData>
}

export interface AgentAchievementRewardData {
    code_magnification: number
    id: number
    invite_number_condition: number
    invite_reward_amount: number
}

export type GetAgentAchievementRewardListResponse = {
    code: number | string
    data: Array<AgentAchievementRewardData>
    message: string
}

export type GetAgentInvitationStatisticListResponse = {
    code: number | string
    data: AgentInvitationStatisticList
    message: string
}

export type GetAgentStatisticReportResponse = {
    code: number | string
    data: Array<AgentStatisticReportData>
    message: string
}

export type GetAgentRebateStatisticsResponse = {
    code: number | string
    data: AgentRebateStatisticData
    message: string
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

export type GetAgentRebateSettingResponse = {
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