import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const withdrawalManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/withdrawal/management",
        component: Layout,
        redirect: "/review",
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
                path: "review",
                component: () => import('@/views/system/user/index.vue'),
                name: "Withdrawal Review",
                meta: {
                    title: "提现审核",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
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
                path: "channel",
                component: () => import('@/views/system/role/index.vue'),
                name: "Cash Withdrawal Channel",
                meta: {
                    title: "提现渠道",
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
                path: "payment/configuration",
                component: () => import('@/views/system/role/index.vue'),
                name: "payment Configuration",
                meta: {
                    title: "支付配置",
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