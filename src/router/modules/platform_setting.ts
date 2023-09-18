import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const platformSettingRoutes: RouteRecordRaw[] = [
  {
    path: "/platform/setting",
    component: Layout,
    redirect: "/operation/management",
    meta: {
      title: "platform_setting",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "operation/management",
        component: ChildrenLayout,
        meta: {
            title: "operation_management",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "",
                component: () => import('@/views/data-analysis/game-report/index.vue'),
                name: "Game Report",
                meta: {
                    hidden: true,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
            {
                path: "detail",
                component: () => import('@/views/data-analysis/game-report/detail.vue'),
                name: "GameReportDetail",
                meta: {
                    title: "Dice",
                    hidden: true,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
        ]
      },
    ]
  },
];

export default platformSettingRoutes;