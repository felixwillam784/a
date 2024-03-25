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
                    title: "风控列表",
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
            {
                path: "behavior-setting",
                component: () => import('@/views/risk-management/behavior-setting/index.vue'),
                name: "BehaviorSetting",
                meta: {
                    title: "风控行为设置",
                    hidden: true,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
            {
                path: "rule/configuration",
                component: () => import('@/views/risk-management/rule-configuration/index.vue'),
                name: "RuleConfiguration",
                meta: {
                    title: "风控规则配置",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
        ]
    },
];

export default riskManagementRoutes;
