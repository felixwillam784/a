import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const newsManagementRoutes: RouteRecordRaw[] = [
  {
    path: "/news/management",
    component: Layout,
    meta: {
      title: "消息管理",
      icon: "system",
      hidden: false,
      //   alwaysShow: true,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "template",
        component: () => import('@/views/news-management/template/index.vue'),
        name: "NewsTemplate",
        meta: {
            hidden: false,
            title: "消息模板配置",
            roles: ["ADMIN"],
            keepAlive: true
        },
      },
      {
        path: "platform",
        component: () => import('@/views/news-management/platform/index.vue'),
        name: "NewsPlatform",
        meta: {
            hidden: false,
            title: "平台消息配置",
            roles: ["ADMIN"],
            keepAlive: true
        },
      },
    ]
  },
];

export default newsManagementRoutes;