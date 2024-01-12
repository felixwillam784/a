// Event Macro Definition
export namespace NETWORKCFG {
  // auth related api
  export class AUTH {
    static LOGIN: string = '/admin/login' // login api
    static REGISTER: string = '/admin/register' // registration api
    static LOGOUT: string = '/admin/logout' // logout api
  }

  // Business logic api after entering the dashboard page
  export class DASHBOARD {
    static PLATFORM_OVERVIEW: string = '/dashboard/platform-overview' // platform overview api
    static DEPOSIT_WITHDRAWAL: string = '/dashboard/deposit-withdrawal' // deposit withdrawal api
    static USER_DATA: string = '/dashboard/user-data' // user data api
    static USER_RETENTION: string = '/dashboard/user-retention' // user retention api
    static AGENT_DATA: string = '/dashboard/agent-data' // agent data api
    static AGENT_RETENTION: string = '/dashboard/agent-retention' // agent retention api
    static GAME_DATA: string = '/dashboard/game-data' // game data api
    static STATISTIC_CHART_DATA: string = '/dashboard/statistic-chart-data' // statistic chart api
  }

  
  export class VIP {

    static VIPRanks: string = '/vip/rank/list'
    static VIPUpdateRanks: string = '/vip/rank/update'

    static VIPMANAGEMENT_TABLE: string = '/vip/list' // Vip Management getlist api
    //VIPManagement BasicDetail data
    static VIPMANAGEMENT_BASIC_DETAIL: string = '/vip/detail/basic-detail'
    static VIPMANAGEMENT_UPDATE_BASIC_DETAIL: string = '/vip/update/basic-detail'

    //VIPManagement CodeRebate Data
    static VIPMANAGEMENT_CODE_REBATE_DETAIL: string = '/vip/detail/code-rebate-setting'
    static VIPMANAGEMENT_UPDATE_CODE_REBATE_DETAIL: string = '/vip/update/code-rebate-setting'

    //VIPManagement ClientLostRebate Data
    static VIPMANAGEMENT_CLIENT_LOST_REBATE_DETAIL: string = '/vip/detail/client-lost-rebate-setting'
    static VIPMANAGEMENT_UPDATE_CLIENT_LOST_REBATE_DETAIL: string = '/vip/update/client-lost-rebate-setting'

    //StatisticDatas
    static VIPRankStatistic_Table: string = '/vip/rank-count-list'
    static VIPLevelStatistic_Table: string = '/vip/level-count-list'
  }

  export class AGENT {
    // agent list api
    static AGENT_LIST: string = '/agent/list';
    static AGENT_DETAIL: string = '/agent/detail';
    static AGENT_DELETE: string = '/agent/delete-relation';
    static AGENT_RISK_CONTROL_STATUS_LIST = 'agent/risk-control/status-list'
    
    // agent channel api
    static AGENT_CHANNEL_MANAGEMENT_LIST: string = '/agent/channel/management-list';
    static AGENT_CHANNEL_LIST: string = '/agent/channel/agent-list';
    static AGENT_CHANNEL_STATISTIC_LIST: string = '/agent/channel/statistic-list';
    static AGENT_CHANNEL_CREATE_GROUP: string = '/agent/channel-group';
    static AGENT_CHANNEL_UPDATE_GROUP: string = '/agent/channel-group/id1';

    // agent rebate api
    static AGENT_REBATE_SETTING: string = '/agent/rebate/setting';
    static AGENT_REBATE_STATISTIC_LIST: string = '/agent/rebate/statistic-list';

    // agent statistic report api
    static AGENT_STATISTIC_REPORT_LIST = '/agent/statistic-report/list';
  }

  //Listening events sent actively
  export class UNSOLICITED {}
}