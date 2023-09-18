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

export const Layout = () => import('@/layout/index.vue');

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
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
        component: () => import('@/views/error-page/401.vue'),
        meta: { hidden: true },
      }
    ],
  },
];

export const asyncRoutes: Array<RouteRecordRaw> = [
  ...dataAnalysisManagementRoutes,
  ...playerManagementRoutes,
  ...webpageManagementRoutes,
  ...withdrawalManagementRoutes,
  ...eventManagementRoutes,
  ...gameManagementRoutes,
  ...thirdpartyManagementRoutes,
  ...authorityManagementRoutes,
  ...platformSettingRoutes
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
