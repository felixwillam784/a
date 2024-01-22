import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const agencyManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/agency",
        component: Layout,
        redirect: "list",
        meta: {
            title: "代理管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "list",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/list/index.vue'),
                        name: "AgencyList",
                        meta: {
                            title: "代理列表",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "detail",
                        component: () => import('@/views/agency-management/list/detail/index.vue'),
                        name: "AgentDetail",
                        meta: {
                            title: "代理详情",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
                
            },
            {
                path: "rebate",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/rebate/index.vue'),
                        name: "AgencyRebate",
                        meta: {
                            title: "代理返利",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
                
            },
            {
                path: "risk-control",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/risk-control/index.vue'),
                        name: "AgencyRiskControl",
                        meta: {
                            title: "代理风控",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "add",
                        component: () => import('@/views/agency-management/risk-control/add.vue'),
                        name: "NewAgencyRisk",
                        meta: {
                            title: "新增风控代理",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    
                ]
                
            },
            {
                path: "statistics-report",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/statistics-report/index.vue'),
                        name: "AgencyStatisticsReport",
                        meta: {
                            title: "代理统计报表",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
                
            },

            {
                path: "invitation-reward",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/invitation-reward/index.vue'),
                        name: "AgentInvitationReward",
                        meta: {
                            title: "代理邀请奖励",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
                
            },
            {
                path: "achievement-reward",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/achievement-reward/index.vue'),
                        name: "AgentAchievementReward",
                        meta: {
                            title: "代理成就奖励",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
                
            },
            {
                path: "channel",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/list/index.vue'),
                        name: "AgentChannelManagement",
                        meta: {
                            title: "代理渠道管理",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
                
            },
            {
                path: "record",
                component: ChildrenLayout,
                redirect: "all",
                meta: {
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "all",
                        component: () => import('@/views/agency-management/list/index.vue'),
                        name: "AgentLog",
                        meta: {
                            title: "代理日志",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
                
            },
        ]
    },
];

export default agencyManagementRoutes;