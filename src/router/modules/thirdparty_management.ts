import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const thirdpartyManagementRoutes: RouteRecordRaw[] = [
    {
        path: "/thirdparty",
        component: Layout,
        redirect: "/thirdparty/management",
        meta: {
            title: "第三方管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN", "EDITOR"],
            keepAlive: true
        },
        children: [
            {
                path: "management",
                // component: () => import('@/views/system/user/index.vue'),
                component: ChildrenLayout,
                name: "ThirdParty Management",
                meta: {
                    hidden: true,
                    roles: ["ADMIN", "EDITOR"],
                    keepAlive: true
                }
            },
        ]
    },
];

export default thirdpartyManagementRoutes;