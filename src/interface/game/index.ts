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