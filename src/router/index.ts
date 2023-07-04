import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import useStore from '@/store';

export const Layout = () => import('@/layout/index.vue');

// 参数说明: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true },
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'homepage', affix: true },
      },
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: { hidden: true },
      }
    ],
  },
];

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/data/analysis",
    component: Layout,
    redirect: "/user/new",
    meta: {
      title: "data_analysis",
      icon: "system",
      hidden: false,
      alwaysShow: true,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "user/new",
        component: () => import('@/views/system/user/index.vue'),
        name: "New User",
        meta: {
          title: "new_user",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "user/active",
        component: () => import('@/views/system/role/index.vue'),
        name: "Active User",
        meta: {
          title: "active_user",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "pay/rate",
        component: () => import('@/views/system/role/index.vue'),
        name: "Pay Rate",
        meta: {
          title: "pay_rate",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "user/retention",
        component: () => import('@/views/system/role/index.vue'),
        name: "User Retention",
        meta: {
          title: "user_retention",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "customer/habbit",
        component: () => import('@/views/system/role/index.vue'),
        name: "Customer Habbit",
        meta: {
          title: "customer_habbit",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "game/report",
        component: () => import('@/views/system/role/index.vue'),
        name: "Game Report",
        meta: {
          title: "game_report",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "platform/report",
        component: () => import('@/views/system/role/index.vue'),
        name: "Platform Report",
        meta: {
          title: "platform_report",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "activity/statement",
        component: () => import('@/views/system/role/index.vue'),
        name: "Activity Statement",
        meta: {
          title: "activity_statement",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "withdrawal/report",
        component: () => import('@/views/system/role/index.vue'),
        name: "Withdrawal Report",
        meta: {
          title: "withdrawal_report",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "data/summary",
        component: () => import('@/views/system/role/index.vue'),
        name: "Data Summary",
        meta: {
          title: "data_summary",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "pool/report",
        component: () => import('@/views/system/role/index.vue'),
        name: "Prize Pool Report",
        meta: {
          title: "pool_report",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
  {
    path: "/player/management",
    component: Layout,
    redirect: "/user/list",
    meta: {
      title: "player_management",
      icon: "system",
      hidden: false,
      alwaysShow: true,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "user/list",
        component: () => import('@/views/player-management/user-list/index.vue'),
        name: "User List",
        meta: {
          title: "user_list",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "user/flow",
        component: () => import('@/views/system/role/index.vue'),
        name: "User Flow",
        meta: {
          title: "user_flow",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "vip/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "VIP Management",
        meta: {
          title: "VIP管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "agent/mangement",
        component: () => import('@/views/system/role/index.vue'),
        name: "Agent Management",
        meta: {
          title: "代理管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "gift/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "Gift Management",
        meta: {
          title: "赠送管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "warning/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "Early Warning Managment",
        meta: {
          title: "预警管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "information/push",
        component: () => import('@/views/system/role/index.vue'),
        name: "Information Push",
        meta: {
          title: "信息推送",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
  {
    path: "/webpage/management",
    component: Layout,
    redirect: "/top/management",
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
        path: "top/management",
        component: () => import('@/views/system/user/index.vue'),
        name: "Top Management",
        meta: {
          title: "顶部管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "sidebar/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "Sidebar Management",
        meta: {
          title: "侧边栏管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "pop-up/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "Popup Management",
        meta: {
          title: "弹窗管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "tag/mangement",
        component: () => import('@/views/system/role/index.vue'),
        name: "Tag Management",
        meta: {
          title: "标签管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "service/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "Customer Service Management",
        meta: {
          title: "客服管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
  {
    path: "/withdrawal/management",
    component: Layout,
    redirect: "/cash/review",
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
        path: "cash/review",
        component: () => import('@/views/system/user/index.vue'),
        name: "Cash Withdrawal Review",
        meta: {
          title: "提现审核",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "withdrawal/ban",
        component: () => import('@/views/system/role/index.vue'),
        name: "Withdrawal Ban",
        meta: {
          title: "提现封禁",
          hidden: false,
          alwaysShow: false,
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
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "cash/channel",
        component: () => import('@/views/system/role/index.vue'),
        name: "Cash Withdrawal Channel",
        meta: {
          title: "提现渠道",
          hidden: false,
          alwaysShow: false,
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
          alwaysShow: false,
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
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
  {
    path: "/event/management",
    component: Layout,
    redirect: "/top/management",
    meta: {
      title: "活动管理",
      icon: "system",
      hidden: false,
      alwaysShow: true,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "activity/configuration",
        component: () => import('@/views/system/user/index.vue'),
        name: "Check-in Activity Configuration",
        meta: {
          title: "签到活动配置",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "financial/configuration",
        component: () => import('@/views/system/role/index.vue'),
        name: "Financial Management Activity Configuration",
        meta: {
          title: "理财活动配置",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
  {
    path: "/game/management",
    component: Layout,
    redirect: "",
    meta: {
      title: "游戏管理",
      icon: "system",
      hidden: false,
      alwaysShow: true,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "",
        component: () => import('@/views/system/user/index.vue'),
        name: "Game Management",
        meta: {
          title: "游戏管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "bet/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "Bet Management",
        meta: {
          title: "下注管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "pool/management",
        component: () => import('@/views/system/role/index.vue'),
        name: "Pool Management",
        meta: {
          title: "奖池管理",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
      {
        path: "robot/configuration",
        component: () => import('@/views/system/role/index.vue'),
        name: "Robot Configuration",
        meta: {
          title: "机器人配置",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
  {
    path: "/thirdparty",
    component: Layout,
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
        component: () => import('@/views/system/user/index.vue'),
        name: "ThirdParty Management",
        meta: {
          title: "第三方管理",
          icon: "system",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN", "EDITOR"],
          keepAlive: true
        }
      },
    ]
  },
  {
    path: "/authority",
    component: Layout,
    meta: {
      title: "权限管理",
      icon: "system",
      hidden: false,
      roles: ["ADMIN"],
      keepAlive: true
    },
    children: [
      {
        path: "management",
        component: () => import('@/views/system/user/index.vue'),
        name: "Authority Management",
        meta: {
          title: "权限管理",
          icon: "system",
          hidden: false,
          alwaysShow: false,
          roles: ["ADMIN"],
          keepAlive: true
        }
      },
    ]
  },
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
  const { permission } = useStore();
  permission.routes.forEach((route) => {
    const name = route.name;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
}

export default router;
