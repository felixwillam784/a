import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const authorityManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/authority",
        component: Layout,
        redirect: "/authority/management",
        meta: {
            title: "权限管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Authority Management",
                meta: {
                    hidden: true,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
        ]
    },
];

export default authorityManagementRoutes;