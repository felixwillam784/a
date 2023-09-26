import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const authorityManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/authority/management",
        component: Layout,
        redirect: "auth",
        meta: {
            title: "权限管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "auth",
                component: ChildrenLayout,
                //component: () => import('@/views/Authentication-management/auth-manage/index.vue'),
                meta: {
                    title: "权限管理",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children: [
                    {
                        path: "",
                        component: () => import('@/views/Authentication-management/auth-manage/index.vue'),
                        name: "AuthorityManagement",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "detail",
                        component: () => import('@/views/Authentication-management/auth-manage/detail/index.vue'),
                        name: "AuthorityDetail",
                        meta: {
                            title: "用户详情",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    // {
                    //     path: "funding",
                    //     component: () => import('@/views/player-management/user-list/detail/funding.vue'),
                    //     name: "FundingDetails",
                    //     meta: {
                    //         title: "资金明细",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "agent/rebate",
                    //     component: () => import('@/views/player-management/user-list/detail/AgentRebate.vue'),
                    //     name: "AgentRebate",
                    //     meta: {
                    //         title: "代理返利",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "manual/recharge",
                    //     component: () => import('@/views/player-management/user-list/detail/ManualRecharge.vue'),
                    //     name: "ManualRecharge",
                    //     meta: {
                    //         title: "人工充值",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "manual/deduction",
                    //     component: () => import('@/views/player-management/user-list/detail/ManualDeduction.vue'),
                    //     name: "ManualDeduction",
                    //     meta: {
                    //         title: "人工扣款",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "recharge/record",
                    //     component: () => import('@/views/player-management/user-list/detail/RechargeRecord.vue'),
                    //     name: "RechargeRecord",
                    //     meta: {
                    //         title: "充值记录",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "betting/record",
                    //     component: () => import('@/views/player-management/user-list/detail/BettingRecord.vue'),
                    //     name: "BettingRecord",
                    //     meta: {
                    //         title: "投注记录",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "promotion/record",
                    //     component: () => import('@/views/player-management/user-list/detail/PromotionRecord.vue'),
                    //     name: "PromotionRecord",
                    //     meta: {
                    //         title: "推广记录",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "withdrawal/record",
                    //     component: () => import('@/views/player-management/user-list/detail/WithdrawalRecord.vue'),
                    //     name: "WithdrawalRecord",
                    //     meta: {
                    //         title: "提现记录",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                    // {
                    //     path: "registration/record",
                    //     component: () => import('@/views/player-management/user-list/detail/RegistrationRecord.vue'),
                    //     name: "RegistrationRecord",
                    //     meta: {
                    //         title: "登录记录",
                    //         hidden: true,
                    //         roles: ["ADMIN"],
                    //         keepAlive: true
                    //     },
                    // },
                ]
                
            },
            {
                path: "role",
                component: () => import('@/views/Authentication-management/role-manage/index.vue'),
                name: "RoleManagement",
                meta: {
                    title:"角色管理",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            }
        ]
    },
];

export default authorityManagementRoutes;