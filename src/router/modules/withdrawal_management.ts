import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const withdrawalManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/withdrawal/management",
        component: Layout,
        meta: {
            title: "withdrawal_management",
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
                    title: "manual_payment",
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
                // component: () => import('@/views/system/role/index.vue'),
                component: ChildrenLayout,
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
                path: "deposit-order/list",
                component: () => import('@/views/withdrawal-management/deposit-order/index.vue'),
                name: "Deposit Order List",
                meta: {
                    title: "存款订单列表",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "payment/configuration",
                // component: () => import('@/views/system/role/index.vue'),
                component: ChildrenLayout,
                name: "Payment Configuration",
                meta: {
                    title: "支付配置",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "deposit/channel",
                component: () => import('@/views/withdrawal-management/deposit-channel/index.vue'),
                name: "Deposit Channel",
                meta: {
                    title: "存款渠道配置",
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