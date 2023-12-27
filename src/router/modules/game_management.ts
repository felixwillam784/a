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
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "game/configuration",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Game Configuration",
                meta: {
                    hidden: false,
                    title: "自研游戏配置",
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "channel/management",
                redirect: "list",
                component: ChildrenLayout,
                meta: {
                    
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "list",
                        component: () => import('@/views/game-management/game-configuration/index.vue'),
                        name: "Channel Management",
                        meta: {
                            hidden: false,
                            title: "渠道游戏管理",
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "game/info/:id",
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
                path: "game/distribution",
                component: ChildrenLayout,
                redirect: "list",
                meta: {
                    title: "游戏分组排序",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "list",
                        component: () => import('@/views/game-management/game-distribution/index.vue'),
                        name: "Game Distribution",
                        meta: {
                            title: "游戏分组排序",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "add/batch/:game_group",
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
        ]
    },
];

export default gameManagementRoutes;