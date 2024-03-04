import useUserStore from './modules/user';
import useAppStore from './modules/app';
import usePermissionStore from './modules/permission';
import useSettingStore from './modules/settings';
import useTagsViewStore from './modules/tagsView';
import { authStore } from './modules/auth';
import { dashboardStore } from './modules/dashboard';
import { vipStore } from './modules/vip';
import { agentStore } from './modules/agent';
import { gameStore } from './modules/game';
import { playerStore } from './modules/player';
import { withdrawalStore } from './modules/withdrawal';

const useStore = () => ({
  auth: authStore(),
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore(),
  dashboard: dashboardStore(),
  vip: vipStore(),
  agent: agentStore(),
  game: gameStore(),
  player: playerStore(),
  withdrawal: withdrawalStore()
});


export default useStore;
