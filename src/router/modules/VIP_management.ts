import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const VIPManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/VIP",
        component: Layout,
        redirect: "manage",
        meta: {
            title: "VIP管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "manage",
                component: () => import('@/views/vip-management/manage.vue'),
                name: "VIPManagement",
                meta: {
                    title:"VIP管理",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },  
            },
            {
                path: "statistics",
                component: () => import('@/views/vip-management/statistic.vue'),
                name: "VIPStatistics",
                meta: {
                    title:"VIP统计",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
        ]
    },
];

export default VIPManagementRoutes;