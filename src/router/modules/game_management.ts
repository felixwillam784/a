import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const gameManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/game/management",
        component: Layout,
        redirect: "",
        meta: {
            title: "游戏管理",
            icon: "system",
            hidden: false,
            alwaysShow: true,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "",
                component: () => import('@/views/system/user/index.vue'),
                name: "Game Management",
                meta: {
                    title: "游戏管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "bet/management",
                component: () => import('@/views/system/role/index.vue'),
                name: "Bet Management",
                meta: {
                    title: "下注管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "pool/management",
                component: () => import('@/views/system/role/index.vue'),
                name: "Pool Management",
                meta: {
                    title: "奖池管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "robot/configuration",
                component: () => import('@/views/system/role/index.vue'),
                name: "Robot Configuration",
                meta: {
                    title: "机器人配置",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
        ]
    },
];

export default gameManagementRoutes;