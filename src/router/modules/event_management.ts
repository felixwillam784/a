import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const eventManagementRoutes: RouteRecordRaw[] = [
  {
    path: "/event/management",
    component: Layout,
    meta: {
      title: "活动管理",
      icon: "system",
      hidden: false,
      //   alwaysShow: true,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "sign",
        component: () => import('@/views/event-management/sign/index.vue'),
        name: "Sign Activity Configuration",
        meta: {
          title: "签到活动配置",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "financial",
        component: () => import('@/views/withdrawal-management/review/index.vue'),
        name: "Financial Activity Configuration",
        meta: {
          title: "理财活动配置",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "agent/invitation",
        component: () => import('@/views/event-management/agent-achievement/index.vue'),
        name: "Agent Invitation",
        meta: {
          title: "代理直邀活动",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "agent/achievement",
        component: () => import('@/views/event-management/agent-achievement/index.vue'),
        name: "Agent Achievement",
        meta: {
          title: "代理成就活动",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "agent/task",
        component: () => import('@/views/event-management/agent-achievement/index.vue'),
        name: "Agent Task",
        meta: {
          title: "代理任务活动",
          hidden: false,
          // alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
];

export default eventManagementRoutes;