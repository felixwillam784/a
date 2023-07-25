import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const playerManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/player/management",
        component: Layout,
        redirect: "/user/list",
        meta: {
            title: "player_management",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "user/list",
                component: ChildrenLayout,
                meta: {
                    title: "user_list",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "",
                        component: () => import('@/views/player-management/user-list/index.vue'),
                        name: "User List",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "detail",
                        component: ChildrenLayout,
                        meta: {
                            title: "用户详情",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                        children: [
                            {
                                path: "",
                                component: () => import('@/views/player-management/user-list/UserDetail.vue'),
                                name: "User Detail",
                                meta: {
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                            },
                            {
                                path: "betting/record",
                                component: () => import('@/views/player-management/user-list/BettingRecord.vue'),
                                name: "Betting Record",
                                meta: {
                                    title: "下注记录",
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                            },
                            {
                                path: "winning/record",
                                component: () => import('@/views/player-management/user-list/WinningRecord.vue'),
                                name: "Winning Record",
                                meta: {
                                    title: "中奖记录",
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                            },
                            {
                                path: "recharge/record",
                                component: () => import('@/views/player-management/user-list/RechargeRecord.vue'),
                                name: "Recharge Record",
                                meta: {
                                    title: "充值记录",
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                            },
                            {
                                path: "withdrawal/record",
                                component: () => import('@/views/player-management/user-list/WithdrawalRecord.vue'),
                                name: "Withdrawal Record",
                                meta: {
                                    title: "提现记录",
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                            },
                            {
                                path: "activity/record",
                                component: () => import('@/views/player-management/user-list/ActivityRecord.vue'),
                                name: "Activity Record",
                                meta: {
                                    title: "活动记录",
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                            },
                            {
                                path: "funding/details",
                                component: () => import('@/views/player-management/user-list/FundingDetails.vue'),
                                name: "Funding Details",
                                meta: {
                                    title: "资金明细",
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                            },
                            {
                                path: "agent/details",
                                component: ChildrenLayout,
                                meta: {
                                    title: "代理详情",
                                    hidden: true,
                                    roles: ["ADMIN"],
                                    keepAlive: true
                                },
                                children: [
                                    {
                                        path: "",
                                        component: () => import('@/views/player-management/user-list/AgentDetails.vue'),
                                        name: "Agent Details",
                                        meta: {
                                            hidden: true,
                                            roles: ["ADMIN"],
                                            keepAlive: true
                                        },
                                    },
                                    {
                                        path: "primary",
                                        component: () => import('@/views/player-management/user-list/PrimaryAgentDetails.vue'),
                                        name: "Primary Agent Details",
                                        meta: {
                                            title: "一级代理详情",
                                            hidden: true,
                                            roles: ["ADMIN"],
                                            keepAlive: true
                                        },
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                path: "user/money-flow",
                component: ChildrenLayout,
                meta: {
                    title: "user_money_flow",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "",
                        component: () => import('@/views/player-management/user-money-flow/index.vue'),
                        name: "User Flow",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "detail",
                        component: () => import('@/views/player-management/user-money-flow/Detail.vue'),
                        name: "Flow Detail",
                        meta: {
                            title: "用户流水详情",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
            },
            {
                path: "vip",
                component: () => import('@/views/player-management/vip/index.vue'),
                name: "VIP Management",
                meta: {
                    title: "VIP管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "agent/mangement",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Agent Management",
                meta: {
                    title: "代理管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "warning",
                component: ChildrenLayout,
                meta: {
                    title: "预警管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "",
                        component: () => import('@/views/player-management/warning/index.vue'),
                        name: "Early Warning Managment",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "setting",
                        component: () => import('@/views/player-management/warning/Setting.vue'),
                        name: "Risk Control Settings",
                        meta: {
                            title: "风控设置",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
            },
            {
                path: "information/push",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                name: "Information Push",
                meta: {
                    title: "信息推送",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "kol",
                component: ChildrenLayout,
                meta: {
                    title: "KOL用户管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "",
                        component: () => import('@/views/player-management/kol/index.vue'),
                        name: "KOL Managment",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "setting",
                        component: () => import('@/views/player-management/kol/Setting.vue'),
                        name: "KOL General Settings",
                        meta: {
                            title: "KOL通用设置",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
            },
        ]
    },
];

export default playerManagementRoutes;