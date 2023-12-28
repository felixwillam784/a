import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const vipManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/vip",
        component: Layout,
        redirect: "manage",
        meta: {
            title: "VIP管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "manage",
                component: () => import('@/views/vip-management/manage.vue'),
                name: "VIPManagement",
                meta: {
                    title:"VIP管理",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },  
            },
            {
                path: "statistics",
                component: () => import('@/views/vip-management/statistic.vue'),
                name: "VIPStatistics",
                meta: {
                    title:"VIP统计",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
            {
                path: "signinbonus",
                component: ChildrenLayout,
                redirect:"all",
                meta: {
                    title:"VIP签到奖励",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
                children:[
                    {
                        path: "all",
                        component: () => import('@/views/vip-management/singin-bonus/index.vue'),
                        name: "VIPSigninBonus",
                        meta: {
                            title: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true
                        },
                    },
                    {
                        path: "statistic",
                        component: () => import('@/views/vip-management/singin-bonus/statistic.vue'),
                        name: "VIPSigninBonusStatistic",
                        meta: {
                            title: "VIP签到数据统计",
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

export default vipManagementRoutes;