import { RouteRecordRaw } from 'vue-router';
export const Layout = () => import('@/layout/index.vue');
const ChildrenLayout = () => import('@/views/layout/index.vue');

const platformSettingRoutes: RouteRecordRaw[] = [
  {
    path: "/platform/setting",
    component: Layout,
    redirect: "/operation/management",
    meta: {
      title: "platform_setting",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "operation/management",
        component: ChildrenLayout,
        meta: {
            title: "operation_management",
            hidden: false,
            roles: ["ADMIN"],
            keepAlive: true
        },
        children: [
            {
                path: "",
                component: () => import('@/views/platform-setting/operation-management/basic_configuration.vue'),
                name: "Basic Configuration",
                meta: {
                    title: "basic_configuration",
                    hidden: true,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
            {
                path: "register/configuration",
                component: () => import('@/views/platform-setting/operation-management/register_configuration.vue'),
                name: "Register Configuration",
                meta: {
                    title: "register_configuration",
                    hidden: true,
                    roles: ["ADMIN"],
                    keepAlive: true
                },
            },
            {
              path: "sms/configuration",
              component: () => import('@/views/platform-setting/operation-management/sms_configuration.vue'),
              name: "SMS Configuration",
              meta: {
                  title: "sms_configuration",
                  hidden: true,
                  roles: ["ADMIN"],
                  keepAlive: true
              },
            },
            {
              path: "operational/configuration",
              component: () => import('@/views/platform-setting/operation-management/operational_configuration.vue'),
              name: "Operational Configuration",
              meta: {
                  title: "operational_configuration",
                  hidden: true,
                  roles: ["ADMIN"],
                  keepAlive: true
              },
            },
            {
              path: "maintenance/announcement",
              component: () => import('@/views/platform-setting/operation-management/maintenance_announcement.vue'),
              name: "Maintenance Announcement",
              meta: {
                  title: "maintenance_announcement",
                  hidden: true,
                  roles: ["ADMIN"],
                  keepAlive: true
              },
            },
            {
              path: "agency/management",
              component: () => import('@/views/platform-setting/operation-management/agency_management.vue'),
              name: "Agency Management",
              meta: {
                  title: "agency_management",
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

export default platformSettingRoutes;