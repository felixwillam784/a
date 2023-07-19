import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const withdrawalManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/withdrawal/management",
        component: Layout,
        meta: {
            title: "提充管理",
            icon: "system",
            hidden: false,
            alwaysShow: true,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "manual/payment",
                component: () => import('@/views/withdrawal-management/manual-payment/index.vue'),
                name: "Manual Payment",
                meta: {
                    title: "人工打款",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "review",
                component: ChildrenLayout,
                meta: {
                    title: "提现审核",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },                
                children: [
                    {
                        path: "",
                        component: () => import('@/views/withdrawal-management/review/index.vue'),
                        name: "Withdrawal Review",
                        meta: {
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "bulk-pass",
                        component: () => import('@/views/withdrawal-management/review/BulkPass.vue'),
                        name: "Bulk Pass",
                        meta: {
                            title: "批量同意",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "bulk-reject",
                        component: () => import('@/views/withdrawal-management/review/BulkReject.vue'),
                        name: "Bulk Reject",
                        meta: {
                            title: "批量拒绝",
                            hidden: true,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                ]
            },
            {
                path: "ban",
                component: () => import('@/views/withdrawal-management/ban/index.vue'),
                name: "Withdrawal Ban",
                meta: {
                    title: "提现封禁",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "blacklist",
                component: () => import('@/views/system/role/index.vue'),
                name: "Black List",
                meta: {
                    title: "黑名单",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "deposit-order/detail",
                component: () => import('@/views/system/role/index.vue'),
                name: "Deposit Order Details",
                meta: {
                    title: "存款订单详情",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "recharge/configuration",
                component: () => import('@/views/system/role/index.vue'),
                name: "Recharge Configuration",
                meta: {
                    title: "充值配置",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "deposit/channel",
                component: () => import('@/views/system/role/index.vue'),
                name: "Deposit Channel",
                meta: {
                    title: "存款渠道",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
        ]
    },
];

export default withdrawalManagementRoutes;