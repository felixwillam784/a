import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const webpageManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/webpage/management",
        component: Layout,
        redirect: "/top/management",
        meta: {
            title: "网页管理",
            icon: "system",
            hidden: false,
            alwaysShow: true,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "top/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Top Management",
                meta: {
                    title: "顶部管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "sidebar/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Sidebar Management",
                meta: {
                    title: "侧边栏管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "pop-up/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Popup Management",
                meta: {
                    title: "弹窗管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "tag/mangement",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Tag Management",
                meta: {
                    title: "标签管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "service/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Customer Service Management",
                meta: {
                    title: "客服管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
        ]
    },
];

export default webpageManagementRoutes;