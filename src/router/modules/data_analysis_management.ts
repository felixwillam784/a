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
        path: "user-quality/report",
        component: import('@/views/data-analysis/user-quality-report/index.vue'),
        meta: {
            title: "user_quality_report",
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
        redirect:"list",
        component: ChildrenLayout,
        meta: {
            title: "",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
         children: [
             {
                 path: "list",
                 component: import('@/views/data-analysis/game-report/index.vue'),
                 name: "Game Report",
                 meta: {
                     title: "game_report",
                     hidden: false,
                     roles: ["ADMIN"],
                     keepAlive: true
                 },
             },
             {
                 path: "detail/:name",
                 component: import('@/views/data-analysis/game-report/detail.vue'),
                 name: "GameReportDetail",
                 meta: {
                     title: "",
                     hidden: true,
                     roles: ["ADMIN"],
                     keepAlive: true
                 },
             },
         ]
      },
      {
        path: "data/summary",
        component: import('@/views/data-analysis/data-summary/index.vue'),
        name: "Data Summary",
        meta: {
          title: "data_summary",
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