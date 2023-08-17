import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const dataAnalysisManagementRoutes: RouteRecordRaw[] = [
  {
    path: "/data/analysis",
    component: Layout,
    redirect: "/user/list",
    meta: {
      title: "data_analysis",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "user/list",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "User Data",
        meta: {
          title: "user_data",
          hidden: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "customer/habbit",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "Customer Habbit",
        meta: {
          title: "customer_habbit",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      // {
      //   path: "game/report",
      //   component: () => import('@/views/data-analysis/game-report/index.vue'),
      //   name: "Game Report",
      //   meta: {
      //     title: "game_report",
      //     hidden: false,
      //     // alwaysShow: false,
      //     roles: ["ADMIN"],
      //     keepAlive: true
      //   },
      // },
      {
        path: "platform/report",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "Platform Report",
        meta: {
          title: "platform_report",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "charge-withdraw/report",
        component: import('@/views/data-analysis/charge-withdraw-report/index.vue'),
        meta: {
            title: "charge_withdraw_report",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        }
      },
      {
        path: "retention/report",
        component: import('@/views/data-analysis/retention-report/index.vue'),
        meta: {
            title: "retention_report",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        }
      },
      {
        path: "agent/report",
        component: import('@/views/data-analysis/agent-report/index.vue'),
        meta: {
            title: "agent_report",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        }
      },
      {
        path: "game/report",
        component: ChildrenLayout,
        meta: {
            title: "game_report",
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
      {
        path: "activity/statement",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "Activity Statement",
        meta: {
          title: "activity_statement",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "withdrawal/report",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "Withdrawal Report",
        meta: {
          title: "withdrawal_report",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "data/summary",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "Data Summary",
        meta: {
          title: "data_summary",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "pool/report",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "Prize Pool Report",
        meta: {
          title: "pool_report",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
];

export default dataAnalysisManagementRoutes;