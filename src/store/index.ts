import useUserStore from './modules/user';
import useAppStore from './modules/app';
import usePermissionStore from './modules/permission';
import useSettingStore from './modules/settings';
import useTagsViewStore from './modules/tagsView';
import { authStore } from './modules/auth';
import { dashboardStore } from './modules/dashboard';
import { vipStore } from './modules/vip';
import { agentStore } from './modules/agent';

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
});


export default useStore;
