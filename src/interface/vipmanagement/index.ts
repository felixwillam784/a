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