import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const webpageManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/webpage/",
        component: Layout,
        redirect: "/webpage/banner/",
        meta: {
            title: "网页管理",
            icon: "system",
            hidden: false,
            alwaysShow: true,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "banner/",
                component: () => import('@/views/webpage-management/banner/index.vue'),
                meta: {
                    title: "banner图配置",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "promotion/",
                component: () => import('@/views/webpage-management/promotion/index.vue'),
                meta: {
                    title: "广告页面配置",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            },
            {
                path: "pop-up/management",
                component: () => import('@/views/withdrawal-management/review/index.vue'),
                meta: {
                    title: "弹窗管理",
                    hidden: false,
                    // alwaysShow: false,
                    roles: ["ADMIN"],
                    keepAlive: true
                }
            }
        ]
    },
];

export default webpageManagementRoutes;