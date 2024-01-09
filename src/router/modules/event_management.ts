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
        path: "list",
        component: () => import('@/views/event-management/active-management/index.vue'),
        name: "EventManagement",
        meta: {
            hidden: false,
            title: "活动管理",
            roles: ["ADMIN"],
            keepAlive: true
        },
      },
      {
        path: "a",
        component: () => import('@/views/event-management/active-management/index.vue'),
        name: "aaa",
        meta: {
            hidden: false,
            title: "aaa",
            roles: ["ADMIN"],
            keepAlive: true
        },
      },
    ]
  },
];

export default eventManagementRoutes;