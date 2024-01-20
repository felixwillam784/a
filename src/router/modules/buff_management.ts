import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const BuffManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/buff",
        component: Layout,
        redirect: "/buff/management",
        meta: {
            title: "道具及BUFF管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN", "EDITOR"],
            keepAlive: true
        },
        children: [
            {
                path: "management",
                component: () => ChildrenLayout,
                name: "Buff Management",
                meta: {
                    hidden: true,
                    roles: ["ADMIN", "EDITOR"],
                    keepAlive: true
                }
            },
        ]
    },
];

export default BuffManagementRoutes;