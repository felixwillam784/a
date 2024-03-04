import { number } from "echarts";
import { string } from "vue-types";


//VIPRank
export interface GetVIPRanksData {
  id:number,
  name:string
}
export type GetVIPRanksDataResponse = {
  code: number | string
  data: Array<GetVIPRanksData>,
  message: string
}

export interface GetVIPLevelData {
  level:number,
  rank:number,
  rank_name:string,
  deposit_exp:number,
  bet_exp:number,
  withdrawal_fee:number,
  free_withdrawals:number,
  withdrawals_max:number,
  withdrawals_amonut:number
  month_withdrawals_amount:number,
  withdrawals_times:number,
  month_withdrawals_times:number,
  award_type:number,
  is_protection:number,
  protection_deposit_amount:number,
  protection_bet_amount:number,
  protection_days:number,
  downgrade_level:number,
  bet_award:BetAward,
}
export interface BetAward{
  custom_interval:number,
  cycle:number,
  rate:any,
  release_cycle:number,
}

export type GetVIPLevelResponse = {
  code: number | string
  data: Array<GetVIPLevelData>,
  message: string
}

//VIP Rank Statistic
export interface RankClientDistribution {
  id: number;
  vip_rank: string;
  vip_rank_people_count: number;
}
export type RankClientDistributionResponseData = {
  code: number | string
  data: Array<RankClientDistribution>,
  message: string
}
//VIP LevelStatistic
export interface LevelClientDistribution {
  vip_level: number;
  vip_rank: string;
  vip_level_people_count: number;
}
export type LevelClientDistributionResponseData = {
  code: number | string
  data: Array<LevelClientDistribution>,
  message: string
}

//VIPRankUpgradeBonus
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

export type GetVIPSinginResponse = {
  code: number | string
  data: Array<GetVIPSigninData>,
  message: string
}

export interface GetVIPSigninData {
  level: number
  rank_id: number
  rank_name: string
  signin_award: Array<GetSigninAwardData>
}

export interface GetSigninAwardData {
  award: string
  bet: string
  bet_rate: string
  pay: number
}

export type GetVIPUpgradeRewardResponse = {
  code: number | string
  data: Array<GetVIPUpgradeRewardList>,
  message: string
}

export interface GetVIPUpgradeRewardList {
  list?: Array<GetVIPUpgradeRewardData>
}

export type GetVIPRankUpgradeRewardResponse = {
  code: number | string
  data: Array<GetVIPUpgradeRewardData>,
  message: string
}

export interface GetVIPUpgradeRewardData {
  level: number
  rank_id: number
  rank_name: string
  upgrade_award: Array<GetUpgradeAwardData>
}

export interface GetUpgradeAwardData {
  bonus: Array<GetUpgradeRewardBonus>
  buff: object
  cash: Array<GetUpgradeRewardCash>
  prop: object
}

export interface GetUpgradeRewardBonus {
  id: number
  weight: string
}

export interface GetUpgradeRewardCash {
  award: string
  bet_rate: string
  weight: string
}