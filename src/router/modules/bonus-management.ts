import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const bonusManagementRoutes: RouteRecordRaw[] = [
  {
    path: "/bonus/management",
    component: Layout,
    meta: {
      title: "奖金管理",
      icon: "system",
      hidden: false,
      //   alwaysShow: true,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "list",
        component: () => import('@/views/bonus-management/main/index.vue'),
        name: "BonusManagement",
        meta: {
            hidden: false,
            title: "奖金列表",
            roles: ["ADMIN"],
            keepAlive: true
        },
      },
      {
        path: "statistic",
        component: () => import('@/views/bonus-management/statistic/index.vue'),
        name: "BonusStatistic",
        meta: {
            hidden: false,
            title: "奖金统计",
            roles: ["ADMIN"],
            keepAlive: true
        },
      },
    ]
  },
];

export default bonusManagementRoutes;