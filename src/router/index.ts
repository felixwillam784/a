import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import useStore from '@/store';
import playerManagementRoutes from "@/router/modules/player_management";
import eventManagementRoutes from "@/router/modules/event_management";
import withdrawalManagementRoutes from "@/router/modules/withdrawal_management";
import dataAnalysisManagementRoutes from "@/router/modules/data_analysis_management";
import webpageManagementRoutes from "@/router/modules/webpage_management";
import gameManagementRoutes from "@/router/modules/game_management";
import thirdpartyManagementRoutes from "@/router/modules/thirdparty_management";
import authorityManagementRoutes from "@/router/modules/authority_management";
import platformSettingRoutes from "@/router/modules/platform_setting";
import vipManagementRoutes from "@/router/modules/VIP_management";
import agencyManagementRoutes from '@/router/modules/agency_management';
import riskManagementRoutes from '@/router/modules/risk_management';
import newsManagementRoutes from '@/router/modules/news_management';
import bonusManagementRoutes from './modules/bonus-management';
import BuffManagementRoutes from './modules/buff_management';

export const Layout = () => import('@/layout/index.vue');

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'homepage', affix: true },
      },
      {
        path: '401',
        name:'401page',
        component: () => import('@/views/error-page/401.vue'),
        meta: { hidden: true },
      }
    ],
  },
];

export const asyncRoutes: Array<RouteRecordRaw> = [
  ...dataAnalysisManagementRoutes,
  ...playerManagementRoutes,
  ...riskManagementRoutes,
  ...vipManagementRoutes,
  ...agencyManagementRoutes,
  ...bonusManagementRoutes,
  ...authorityManagementRoutes,

  ...withdrawalManagementRoutes,
  ...eventManagementRoutes,
  ...webpageManagementRoutes,
  ...gameManagementRoutes,
  
  ...newsManagementRoutes,
  ...thirdpartyManagementRoutes,
  ...platformSettingRoutes,
  ...BuffManagementRoutes,
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
  const { permission } = useStore();
  permission.routes.forEach((route) => {
    const name = route.name;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
}

export default router;
