import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const riskManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/risk",
        component: Layout,
        redirect: "/risk/list",
        meta: {
            title: "风控管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true,
            alwaysShow:true,
        },
        children: [
            {
                path: "list",
                component: () => import('@/views/risk-management/list/index.vue'),
                name: "RiskList",
                meta: {
                    title: "用户风控列表",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
            {
                path: "add",
                component: () => import('@/views/risk-management/add/index.vue'),
                name: "RiskAdd",
                meta: {
                    title: "新增个人风控",
                    hidden: true,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
        ]
    },
];

export default riskManagementRoutes;
