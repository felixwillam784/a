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
                component: () => import('@/views/withdrawal-management/review/index.vue'),
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
                path: "game/configuration",
                component: ChildrenLayout,
                meta: {
                    title: "自研游戏配置",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "",
                        component: () => import('@/views/game-management/game-configuration/index.vue'),
                        name: "Game Configuration",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "game/info",
                        component: () => import('@/views/game-management/game-configuration/details/game-info.vue'),
                        name: "Game Information",
                        meta: {
                            title: "游戏信息",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "game/sort",
                        component: () => import('@/views/game-management/game-configuration/details/game-sort.vue'),
                        name: "Game Sort",
                        meta: {
                            title: "分组排序",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
            },
            {
                path: "channel/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Channel Management",
                meta: {
                    title: "渠道游戏管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "game/distribution",
                component: ChildrenLayout,
                meta: {
                    title: "游戏分组排序",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "",
                        component: () => import('@/views/game-management/game-distribution/index.vue'),
                        name: "Game Distribution",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "add/batch",
                        component: () => import('@/views/game-management/game-distribution/details/add-batch.vue'),
                        name: "Game Add Batch",
                        meta: {
                            title: "批量添加",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
            },
            {
                path: "interface/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Interface Management",
                meta: {
                    title: "平台界面管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "bet/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
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
                component: () => import('@/views/withdrawal-management/review/index.vue'),
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
                component: () => import('@/views/withdrawal-management/review/index.vue'),
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