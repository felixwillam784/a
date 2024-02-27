  export interface GetGameData {
    game_skin: string;
    game_id: number;
    game_name: string;
    game_group: Array<any>;
    game_type: string;
    game_provider: string;
    game_maker: string;
    game_status: string;
    maintenance_time: string;
    rtp_value: number;
    game_tab: Array<any>;
    game_enabled: number;
  }

  export type GetGameDataResponse = {
    code: number | string
    data: Array<GetGameData>,
    message: string
  }

  export interface GameConfigData {
    id:number,
    name:string,
  }

  export type GameConfigDataResponse = {
    code: number | string
    data: Array<GameConfigData>,
    message: string
  }

  export type GameStatusChangeResponse = {
    code: number | string
    message:string
  }

  export type GameBatchActionResponse = {
    code: number | string
    message:string
  }

  export interface GetGameDetailData {
    game_id	:string
    api_provider	:string
    max_bet_limit	:number
    limit_country	:Array<string>
    game_group	:Array<any>
    game_status	:number
    cover_image	:string
    game_tag	:Array<string>
    game_name	:string
    game_maker :string
    min_bet_limit	:number
    trial_play	:number
    next_maintanence_start_time	:number
    next_maintanence_end_time	:number
    game_hd_picture	:string
    game_type	:string
    rtp	:string    
    max_magnification :number
    trial_count :number
  }

  export type GetGameDetailDataResponse = {
    code: number | string
    data: GetGameDetailData
    message:string
  }

  export type GamePostRequestResponse = {
    code: number | string
    message:string
  }