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
          component: () => import('@/views/system/user/index.vue'),
          name: "User Data",
          meta: {
            title: "user_data",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
          }
        },
        // {
        //   path: "user/active",
        //   component: () => import('@/views/system/role/index.vue'),
        //   name: "Active User",
        //   meta: {
        //     title: "active_user",
        //     hidden: false,
        //     roles: ["ADMIN"],
        //     keepAlive: true
        //   }
        // },
        // {
        //   path: "pay/rate",
        //   component: () => import('@/views/system/role/index.vue'),
        //   name: "Pay Rate",
        //   meta: {
        //     title: "pay_rate",
        //     hidden: false,
        //     roles: ["ADMIN"],
        //     keepAlive: true
        //   }
        // },
        // {
        //   path: "user/retention",
        //   component: () => import('@/views/system/role/index.vue'),
        //   name: "User Retention",
        //   meta: {
        //     title: "user_retention",
        //     hidden: false,
        //     roles: ["ADMIN"],
        //     keepAlive: true
        //   }
        // },
        {
          path: "customer/habbit",
          component: () => import('@/views/system/role/index.vue'),
          name: "Customer Habbit",
          meta: {
            title: "customer_habbit",
            hidden: false,
            // alwaysShow: false,
            roles: ["ADMIN"],
            keepAlive: true
          }
        },
        {
          path: "game/report",
          component: () => import('@/views/system/role/index.vue'),
          name: "Game Report",
          meta: {
            title: "game_report",
            hidden: false,
            // alwaysShow: false,
            roles: ["ADMIN"],
            keepAlive: true
          }
        },
        {
          path: "platform/report",
          component: () => import('@/views/system/role/index.vue'),
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
          path: "activity/statement",
          component: () => import('@/views/system/role/index.vue'),
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
          component: () => import('@/views/system/role/index.vue'),
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
          component: () => import('@/views/system/role/index.vue'),
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
          component: () => import('@/views/system/role/index.vue'),
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