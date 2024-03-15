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

    static VIPMANAGEMENT_TABLE: string = '/vip/level/list' // Vip Management getlist api

    //StatisticDatas
    static VIPRankStatistic_Table: string = '/vip/rank-count-list'
    static VIPLevelStatistic_Table: string = '/vip/level-count-list'
    static VIP_SIGNIN_LIST: string = '/vip/signinaward/list'  // VIP签到奖励列表  VIP sign-in reward list
    static VIP_SIGNIN_DETAIL: string = '/vip/signinaward/detail' // VIP签到奖励详情  VIP sign-in reward details
    static VIP_SIGNIN_UPDATE: string = '/vip/signinaward/update'  // VIP签到奖励更新  VIP sign-in reward update
    static VIP_UPGRADE_BONUS_LIST: string = '/vip/upgradeaward/list'  // VIP升级奖励列表  VIP upgrade reward list
    static VIP_UPGRADE_BONUS_DETAIL: string = '/vip/upgradeaward/detail'  // VIP升级奖励详情  VIP upgrade reward details
    static VIP_UPGRADE_BONUS_UPDATE: string = '/vip/upgradeaward/update'  // VIP升级奖励更新  VIP upgrade reward update
    static VIP_LEVEL_LIST: string = '/vip/level/list'  // VIP等级列表  VIP level list
    static VIP_LEVEL_DETAIL: string = '/vip/level/detail'  // VIP等级详情  VIP level details
    static VIP_LEVEL_ADD: string = '/vip/level/add'  // VIP等级新增  VIP level add
    static VIP_LEVEL_UPDATE: string = '/vip/level/update'  // VIP等级更新  VIP level update
    static VIP_LEVEL_DELETE: string = '/vip/level/delete'  // VIP等级删除  VIP level delete
    static VIP_RANK_UPGRADEAWARD_LIST = '/vip/rank-upgradeaward/list'  // VIP升段奖励列表  VIP rank upgrade reward list
    static VIP_RANK_UPGRADEAWARD_DETAIL = '/vip/rank-upgradeaward/detail'  // VIP升段奖励详情  VIP rank upgrade reward details
    static VIP_RANK_UPGRADEAWARD_UPDATE = '/vip/rank-upgradeaward/update'  // VIP升段奖励更新  VIP rank upgrade reward update
    static VIP_WEEKAWARD_LIST = '/vip/weekaward/list'  // 周奖励列表  Weekly reward list
    static VIP_WEEKAWARD_DETAIL = '/vip/weekaward/detail'  // 周奖励详情  Weekly reward details
    static VIP_WEEKAWARD_UPDATE = '/vip/weekaward/update'  // 周奖励更新  Weekly reward updates
  }
  export class Game {

    static GAME_CONFIG: string = '/game/config'
    static GAME_MANUFACTURE_LIST: string = '/game/manufacturer-list'
    static GAME_MAKER_LIST: string = '/game/maker-list'
    static GAME_GROUP_LIST: string = '/game/group-list'
    static GAME_TAB_LIST: string = '/game/tag-list'

    static GAME_STATUS_CHANGE: string = '/game/config/update'
    static GAME_CONFIG_BATCH_ACTiON: string = '/game/config/batch-action'

    static GAME_DETAIL: string = '/game/config/detail'
    static GAME_DETAIL_STATUS_CHANGE: string = '/game/config/update/game-status'
    static GAME_DETAIL_TRIAL_STATUS_CHANGE: string = '/game/config/update/trial-play'
    static GAME_DETAIL_GAME_TAG_UPDATE: string = '/game/config/update/game-tag'

    static GAME_TAG_ADD: string ='/game/tag'
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

    // agent invitaion reward api
    static AGENT_INVITAION_REWARD_LIST = '/agent/invitation/reward/list';
    static AGENT_INVITAION_REWARD_DETAIL = '/agent/invitation/reward/detail';
    static AGENT_INVITAION_REWARD_DELETE = '/agent/invitation/reward/delete';

    static AGENT_INVITAION_STATISTIC_LIST = '/agent/invitation/statistic/list';

    // agent achievement reward api
    static AGENT_ACHIEVEMENT_REWARD_LIST = '/agent/achievement/reward/list';
    static AGENT_ACHIEVEMENT_REWARD_DETAIL = '/agent/achievement/reward/detail';
    static AGENT_ACHIEVEMENT_REWARD_DELETE = '/agent/achievement/reward/delete';
    static AGENT_ACHIEVEMENT_REWARD_UPDATE = '/agent/achievement/reward/update';
    static AGENT_ACHIEVEMENT_REWARD_ADD = '/agent/achievement/reward/add';
    
    static AGENT_ACHIEVEMENT_STAGE_REWARD_LIST = '/agent/achievement/stage-reward-list';
    static AGENT_ACHIEVEMENT_STATISTIC_LIST = '/agent/achievement/statistic-list';
    static AGENT_ACHIEVEMENT_STAGE_STATISTIC_LIST = '/agent/achievement/stage-statistic-list';
  }

  export class PLAYER{
    static USERLIST:string = "/user/list"
    static BASIC_DETAIL:string = "/user/base"
    static DEPOSIT_WITHDRAWAL:string = "/user/detail/deposit-withdrawal"
    static WITHDRAWAL_DETAIL:string = "/user/bank"

    static SET_BLACKLIST: string = "/user/status"
    static PROHIBIT_WITHDRAWAL: string = "/user/withdraw-status"

    static UPDATE_PHONE: string = "/user/phone"
    static UPDATE_MARK: string = "/user/mark"
    static UPDATE_NOTE: string = "/user/notes"
    static UPDATE_MAIL: string = "/user/email"
    static UPDATE_BANK: string = "/user/bank"

    static UPDATE_PIX: string = "/user/withdraw/update/pix"
    static UPDATE_MEX: string = "/user/withdraw/update/mex"
    static UPDATE_WALLET: string = "/user/withdraw/update/wallet"
    
    static DLELETE_BANK: string = "/user/bank/delete"

    static TEST_USER_LIST:string = "/user/test/list"
    static TEST_USER_BASIC_DETAIL:string = "/user/test/detail"
    static TEST_USER_UPDATE_STATUS:string = "/user/test/status"
    static USER_ACCOUNT: string = '/user/account'  // 查询账户信息  Query account information
    static USER_INVITE: string = '/user/invite'  // 查询代理信息  Query agent information
  }

  export class WITHDRAWAL{
    static DEPOSITLIST:string = "/deposit-order/list"
    static UPDATE_SUPPLIMENT:string = "/deposit/suppliment"
    static WITHDRAWAL_REVIEW_LIST = '/withdrawal/list'   // 提现审核列表 Withdrawal review list
    static WITHDRAWAL_REVIEW_LOCK = '/withdrawal/lock'  // 提现审核锁定  Withdrawal review lock
    static WITHDRAWAL_REVIEW_OPERATION = '/withdrawal/operate'  // 提现审核操作  Withdrawal review operation
    static MANUAL_ADD_LIST = '/manual/add/list'  // 人工入款列表  Manual deposit list
    static MANUAL_ADD_CREATE = 'manual/add/create'  // 人工入款新增  Manual deposit added
    static MANUAL_REDUCE_LIST = '/manual/reduce/list'  // 人工扣款列表  Manual deduction list
    static MANUAL_REDUCE_CREATE = '/manual/reduce/create'  // 人工扣款新增  Manual deduction added
    static FUNDSPROHIBIT_LIST = '/fundsprohibit/list'  // 提现封禁列表  Withdrawal ban list
    static FUNDSPROHIBIT_CREATE = '/fundsprohibit/create'  // 提现封禁新增  Withdrawal ban added
    static FUNDSPROHIBIT_LIFT = '/fundsprohibit/lift'  // 提现封禁解除  Withdrawal ban lifted
  }
  //Listening events sent actively
  export class UNSOLICITED {}
}