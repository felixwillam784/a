export interface GetVIPManagementTableData {
  vip_level: number;
  vip_rank: string;
  recharge_vip_upgrade: number;
  coding_vip_upgrade: number;
  withdrawal_fee: number;
  free_amount_month: number;
  maximum_amount_amount: number;
  daily_limit_amount: number;
  monthly_limit_amount: number;
  daily_limit_time: number;
  monthly_limit_time: number;
  recharge_vip_up: number;
  coding_vip_relegation: number;
  vip_limit_days: number;
  vip_and_was_lowered: number;
}
export type GetVIPManagementTableDataResponse = {
  code: number | string
  data: Array<GetVIPManagementTableData>
  message: string
}

//VIPRank
export type GetVIPRanksDataResponse = {
  code: number | string
  data: {data:Array<string>},
  message: string
}


//VIPManagement Basic Detail
export interface GetVIPManagementRankBasicDetailData {
  vip_level: number;
  vip_rank: string;
  recharge_vip_upgrade: number;
  coding_vip_upgrade: number;
  withdrawal_fee: number;
  free_amount_month: number;
  maximum_amount_amount: number;
  daily_limit_amount: number;
  monthly_limit_amount: number;
  daily_limit_time: number;
  monthly_limit_time: number;
  recharge_vip_up: number;
  coding_vip_relegation: number;
  vip_limit_days: number;
  vip_and_was_lowered: number;

  rebate_way: number;
  protect_vip: number;
}
export type GetVIPManagementRankBasicDetailDataResponse = {
  code: number | string
  data: GetVIPManagementRankBasicDetailData
  message: string
}

//VIPManagement Code Rebate Detail
export interface GetVIPManagementRankCodeRebateDetailData {
  vip_level: number;

  game_types: Array<rebateGameType>;

  rebate_mode: number;
  rebate_order_time: number;
  rebate_order_time_amount: number;
  rebate_fund_time: number;
  rebate_fund_time_amount: number;
}
export interface rebateGameType {
  game_type: string;
  rebate_amount: number;
}
export type GetVIPManagementRankCodeRebateDetailDataResponse = {
  code: number | string
  data: GetVIPManagementRankCodeRebateDetailData
  message: string
}

//VIPManagement Client Lost Rebate Detail
export interface GetVIPMAnagementRankClientLostRebateDetailData {
  vip_level: number;

  client_lost_rebate_amount: number;
  client_lost_rebate_mode: number;
  client_lost_rebate_order_time: number;
  client_lost_rebate_order_time_amount: number;
  client_lost_rebate_fund_time: number;
  client_lost_rebate_fund_time_amount: number;
}
export type GetVIPMAnagementRankClientLostRebateDetailDataResponse = {
  code: number | string
  data: GetVIPMAnagementRankClientLostRebateDetailData
  message: string
}



export interface VIPRankUpgradeBonusData {
    id: number;
    vip_rank: string;
    vip_reward_amount: number;
    aunt_magnification: number;
}

export interface VIPRankUpgradeBonusDetailData {
  id: number;
  vip_rank: string;
  vip_next_rank:string;
  vip_reward_amount: number;
  aunt_magnification: number;

  rebate_mode: string;
  rebate_order_time: string;
  rebate_order_time_amount: number;
  rebate_fund_time: string;
  rebate_fund_time_amount: number;
}

export type ResponseData = {
  code: number | string
  message: string
}

