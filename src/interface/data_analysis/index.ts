export interface GameReportData {    
  id: string;
  game_date_time: string;
  game_activity_name: string;
  game_bonus_type: string;
  game_recharge_amount: number | string;
  game_participant_count: number;
  game_received_count: number;
  game_capita_bonus: string;
  game_bonus_ratio: string;
  game_statistics: string;
}

export interface GameReportList {
    dataList: Array<GameReportData>
    total_win_count: number
    recipient_count: number
    received_count: number
    people_bonus_amount: number
}

export type GetGameReportList = {
    code: number | string
    data: GameReportList
    message: string
}