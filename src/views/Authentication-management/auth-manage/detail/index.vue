<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

import Custom from './Custom.vue';


const router = useRouter();

const activeButton = ref<number>(0);

const loading = ref<boolean>(false);

const goBack = () => {
    router.push({ name: "AuthorityManagement" });
}
const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

interface treeNode{
  label:string,
  state:boolean,
  indeterminate:boolean,
  child:Array<treeNode>,
}

const labels = ref<Array<treeNode>>([
  {
    label:"权限管理",
    state:false,
    indeterminate:false,
    child:[{
      label:"权限管理",
      state:false,
      indeterminate:false,
      child:[{label:"新增角色", state:false, indeterminate:false,child:[]},{label:"删除角色", state:false, indeterminate:false,child:[]},{label:"编辑角色", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"用户管理",
      state:false,
      indeterminate:false,
      child:[{label:"新增角色", state:false, indeterminate:false,child:[]},{label:"编辑角色",  state:false,indeterminate:false, child:[]},{label:"停用/启用角色", state:false, indeterminate:false,child:[]},{label:"删除角色", state:false, indeterminate:false, child:[]}]
    },]
  },
  {
    label:"数据分析",
    state:false,
    indeterminate:false,
    child:[{
      label:"充提报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"留存报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"平台用户质量报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"代理报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"游戏报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false,indeterminate:false, child:[]},{label:"数据查询", state:false,indeterminate:false, child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"彩金报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"活动报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"数据总表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"渠道报表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false, child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]}]
    },]
  },
  {
    label:"玩家管理",
    state:false,
    indeterminate:false,
    child:[{
      label:"用户列表",
      state:false,
      indeterminate:false,
      child:[{label:"用户详情数据查看", state:false, indeterminate:false,child:[]},{label:"资金明细数据查看", state:false, indeterminate:false,child:[]},{label:"代理返利数据查看", state:false, indeterminate:false,child:[]},{label:"推广记录数据查看", state:false, indeterminate:false,child:[]},{label:"充值记录数据查看", state:false, indeterminate:false,child:[]},{label:"提现记录数据查看", state:false, indeterminate:false,child:[]},{label:"人工扣款数据查看", state:false, indeterminate:false,child:[]},{label:"人工充值数据查看", state:false, indeterminate:false,child:[]},{label:"投注记录数据查看", state:false,indeterminate:false, child:[]},{label:"登录记录数据查看", state:false,indeterminate:false, child:[]},{label:"用户详情数据查看", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"用户流水",
      state:false,
      indeterminate:false,
      child: [{label:"", state:false, indeterminate:false,child:[]},],
    },
    {
      label:"VIP管理",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"数据导出", state:false, indeterminate:false,child:[]},{label:"VIP配置修改", state:false, indeterminate:false,child:[]},{label:"新增VIP等级", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"代理管理",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false,indeterminate:false, child:[]},{label:"查看代理管理", state:false,indeterminate:false, child:[]},{label:"修改代理返利设定", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"预警管理",
      state:false,
      indeterminate:false,
      child: [{label:"", state:false, indeterminate:false,child:[]},],
    },
    {
      label:"消息推送",
      state:false,
      indeterminate:false,
      child: [{label:"", state:false, indeterminate:false,child:[]},],
    },
    {
      label:"KOL管理",
      state:false,
      indeterminate:false,
      child: [{label:"", state:false, indeterminate:false,child:[]},],
    },]
  },
  {
    label:"充提管理",
    state:false,
    indeterminate:false,
    child:[{
      label:"人工入款",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"查看订单详情", state:false, indeterminate:false,child:[]},{label:"添加订单", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"体现审核",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"查看订单详情", state:false, indeterminate:false,child:[]},{label:"订单锁定", state:false, indeterminate:false,child:[]},{label:"订单同意", state:false, indeterminate:false,child:[]},{label:"订单拒绝", state:false, indeterminate:false,child:[]},{label:"订单批量同意", state:false, indeterminate:false,child:[]},{label:"订单批量拒绝", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"提现封禁",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"封禁详情", state:false, indeterminate:false,child:[]},{label:"新增封禁", state:false,indeterminate:false, child:[]},{label:"封禁解除", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"黑名单",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"黑名单详情", state:false,indeterminate:false, child:[]},{label:"新增黑名单", state:false,indeterminate:false, child:[]},{label:"封禁黑名单", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"存款订单列表",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"存款订单详情", state:false, indeterminate:false,child:[]},{label:"补单", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"支付配置",
      state:false,
      indeterminate:false,
      child:[{label:"", state:false, indeterminate:false,child:[]},]
    },
    {
      label:"存款渠道配置",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"新增存款渠道", state:false, indeterminate:false,child:[]},{label:"修改存款渠道", state:false,indeterminate:false, child:[]}, {label:"删除存款渠道", state:false,indeterminate:false, child:[]}]
    },
    ]
  },
  {
    label:"网页管理",
    state:false,
    indeterminate:false,
    child:[{
      label:"",
      state:false,
      indeterminate:false,
      child:[]
    }]
  },
  {
    label:"活动管理",
    state:false,
    indeterminate:false,
    child:[{
      label:"签到活动配置",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false,indeterminate:false, child:[]},{label:"活动配置导入", state:false, indeterminate:false,child:[]},{label:"新增签到等级", state:false,indeterminate:false, child:[]},{label:"修改签到等级", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"理财活动配置",
      state:false,
      indeterminate:false,
      child:[{label:"", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"代理直邀活动配置",
      state:false,
      indeterminate:false,
      child:[{label:"", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"代理成就活动配置",
      state:false,
      indeterminate:false,
      child:[{label:"", state:false,indeterminate:false, child:[]}]
    },
    {
      label:"代理任务活动配置",
      state:false,
      indeterminate:false,
      child:[{label:"", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"打码返利配置",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"活动配置导入", state:false, indeterminate:false,child:[]},{label:"新增打码方案", state:false,indeterminate:false, child:[]},{label:"修改打码方案", state:false,indeterminate:false, child:[]},{label:"删除打码方案", state:false, indeterminate:false,child:[]}]
    },
    ]
  },
  {
    label:"游戏管理",
    state:false,
    indeterminate:false,
    child:[{
      label:"自研游戏配置",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false,indeterminate:false, child:[]},{label:"数据查询", state:false,indeterminate:false, child:[]},{label:"游戏配置导入", state:false, indeterminate:false,child:[]},{label:"新增自研游戏", state:false,indeterminate:false, child:[]},{label:"修改自研游戏", state:false,indeterminate:false, child:[]},{label:"删除自研游戏", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"渠道游戏管理",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false, indeterminate:false,child:[]},{label:"游戏配置导入", state:false,indeterminate:false, child:[]},{label:"游戏配置导出", state:false, indeterminate:false,child:[]},{label:"游戏下架", state:false,indeterminate:false, child:[]},{label:"游戏配置修改", state:false, indeterminate:false,child:[]},{label:"批量下架游戏", state:false, indeterminate:false,child:[]},{label:"批量维护游戏", state:false, indeterminate:false,child:[]},{label:"批量启用游戏", state:false,indeterminate:false, child:[]},{label:"批量开启试玩", state:false, indeterminate:false,child:[]}]
    },
    {
      label:"游戏分组管理",
      state:false,
      indeterminate:false,
      child:[{label:"数据查看", state:false, indeterminate:false,child:[]},{label:"数据查询", state:false,indeterminate:false, child:[]},{label:"游戏配置导入", state:false,indeterminate:false, child:[]},{label:"游戏配置导出", state:false,indeterminate:false, child:[]},{label:"新增分组类型", state:false, indeterminate:false,child:[]},{label:"批量删除", state:false, indeterminate:false,child:[]},{label:"批量添加", state:false, indeterminate:false,child:[]}]
    },
    ]
  },
  {
    label:"网页管理",
    state:false,
    indeterminate:false,
    child:[{
      label:"平台界面管理",
      state:false,
      indeterminate:false,
      child:[{label:"基础配置查看", state:false,indeterminate:false, child:[]},{label:"基础配置修改", state:false,indeterminate:false, child:[]},{label:"注册配置查看", state:false, indeterminate:false,child:[]},{label:"注册配置修改", state:false,indeterminate:false, child:[]},{label:"短信配置查看", state:false,indeterminate:false, child:[]},{label:"短信配置修改", state:false,indeterminate:false, child:[]},
      {label:"运营配置查看", state:false,indeterminate:false, child:[]},{label:"运营配置修改", state:false, indeterminate:false,child:[]},{label:"维护公告查看", state:false, indeterminate:false,child:[]},{label:"维护公告修改", state:false,indeterminate:false, child:[]},{label:"代理设置查看", state:false, indeterminate:false,child:[]},{label:"代理设置修改", state:false, indeterminate:false,child:[]}]
    },]
  },
]
);

const handleChange = () => {
  for(let i = 0; i < labels.value.length; i ++)
    checktCheckboxStatus(labels.value[i]);
}
const checktCheckboxStatus = (label : any) =>{
  if(label.child.length == 0)
    return label.state?1:0;
  let flag_0 = false;
  let flag_1 = false;
  let flag_2 = false;
  for(let i = 0; i < label.child.length; i ++)
  {
    let res = checktCheckboxStatus(label.child[i]);
    if(res == 0)
      flag_0 = true;
    if(res == 1)
      flag_1 = true;
    if(res == 2)
      flag_2 = true;
  }
  if(flag_0 && !flag_1 && !flag_2)
  {
    label.state = false;
    label.indeterminate = false;
    return 0;
  }
  if(flag_1 && !flag_0 && !flag_2)
  {
    label.state = true;
    label.indeterminate = false;
    return 1;
  }
  label.state = false;
  label.indeterminate = true;
  return 2;
}
</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
            <div style="margin-left: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'AuthorityDetail')">权限管理</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'FundingDetails')">数据分析</el-button>
                <el-button :type="activeButton == 2 ? 'warning' : ''"
                    @click="handleButtonActive(2, 'AgentRebate')">玩家管理</el-button>
                <el-button :type="activeButton == 3 ? 'warning' : ''"
                    @click="handleButtonActive(3, 'PromotionRecord')">充提管理</el-button>
                <el-button :type="activeButton == 4 ? 'warning' : ''"
                    @click="handleButtonActive(4, 'RechargeRecord')">网页管理</el-button>
                <el-button :type="activeButton == 5 ? 'warning' : ''"
                    @click="handleButtonActive(5, 'WithdrawalRecord')">活动管理</el-button>
                <el-button :type="activeButton == 6 ? 'warning' : ''"
                    @click="handleButtonActive(6, 'ManualDeduction')">游戏管理</el-button>
                <el-button :type="activeButton == 7 ? 'warning' : ''"
                    @click="handleButtonActive(7, 'ManualRecharge')">平台设置</el-button>
            </div>
        </div>
        <el-card>
          <Custom v-for="(child, index) in labels" :labels="child" :key="index + 10000" @checkboxChanged="handleChange"/>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}

:deep(.el-form-item__label) {
    font-size: 16px !important;
    font-weight: bold !important;
}

:deep(.el-table thead th.el-table__cell) {
    background: #f5f7fa;
    height: 60px;
}

.vip-bonus-collapse {
    // transition: height 0.3s ease-out;
    display: none;
}

.vip-bonus-show {
    // transition: height 0.3s ease-out;
    display: block;
}
</style>
