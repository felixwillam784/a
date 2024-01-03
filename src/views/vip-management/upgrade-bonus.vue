<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search, Refresh, Upload, Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import { fa } from "element-plus/es/locale";
import { NumberFormatProps } from "vue-i18n";

interface PropAndBUFFBonusData {
  id: string;
  amount: number;
  weight: number;
}

interface RelationBonusData {
  id: string;
  weight: number;
}

interface RealBonusData {
  amount: number;
  code_magnification: number;
  weight: number;
}

interface UpgradeBonusData {
  vip_level: number;
  prop_bonus: Array<PropAndBUFFBonusData>;
  buff_bonus: Array<PropAndBUFFBonusData>;
  relation_bonus: Array<RelationBonusData>;
  real_bonus: Array<RealBonusData>;
}

interface UpgradeBonusStatisticData{
  vip_level:number,
  vip_level_count:number,
  vip_bonus_recevier_count:number,
  real_money_amount:number,
  bonus_amount:number,
  props_count:number,
  props_used_count:number,
  buff_quantity:number,
  buff_usage_quantity:number,
}
const upgrade_bonus_list = ref<Array<UpgradeBonusData>>([
  {
    vip_level: 1,
    prop_bonus: [
      {
        id: "1001",
        amount: 1,
        weight: 5000,
      },
    ],
    buff_bonus: [],
    relation_bonus: [
      {
        id: "1001",
        weight: 3000,
      },
    ],
    real_bonus: [
      {
        amount: 1,
        code_magnification: 0,
        weight: 2000,
      },
    ],
  },
  {
    vip_level: 2,
    prop_bonus: [
      {
        id: "1001",
        amount: 1,
        weight: 5000,
      },
    ],
    buff_bonus: [      
      {
        id: "1002",
        amount: 2,
        weight: 3000,
      },
      {
        id: "1003",
        amount: 4,
        weight: 2000,
      },
    ],
    relation_bonus: [],
    real_bonus: [],
  },
  {
    vip_level: 3,
    prop_bonus: [
      {
        id: "1001",
        amount: 1,
        weight: 5000,
      },
    ],
    buff_bonus:[
        
      {
        id: "1002",
        amount: 2,
        weight: 3000,
      },
    ],

    relation_bonus: [
      {
        id: "1001",
        weight: 2000,
      },
    ],
    real_bonus: [],
  },
]);

const vip_upgrade_bonus_switch = ref(true);

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};

const prop_buff_tooltip_html = (id:string)=>{
    let res:string =''
    res = res + '道具及BUFF奖励ID:' + id + '<br/>';
    res = res + 'XXX';
    return res;
}

const relation_tooltip_html = (id:string)=>{
    let res:string =''
    res = res + '奖金ID:' + id + '<br/>';
    res = res + 'XXX';
    return res;
}

const upgrade_bonus_item = ref<UpgradeBonusData>(
    {
        vip_level:0,
        prop_bonus:[],
        buff_bonus:[],
        relation_bonus:[],
        real_bonus:[],
    }
);
const show_dialog = ref(false);
const dialog_title = ref<string>('');

const show_detail = (data:UpgradeBonusData) =>{
    upgrade_bonus_item.value = data;
    show_dialog.value = true;
    dialog_title.value = 'VIP升级奖励详情';
}

const new_prop = ref<PropAndBUFFBonusData>({  id: "", amount: -1, weight: -1,});
const new_buff = ref<PropAndBUFFBonusData>({  id: "", amount: -1, weight: -1,});
const new_relation = ref<RelationBonusData>({  id: "", weight: -1,});
const new_real = ref<RealBonusData>({ amount: -1, code_magnification:-1, weight: -1,});

const is_new_prop = ref(false);
const is_new_buff = ref(false);
const is_new_relation = ref(false);
const is_new_real = ref(false);

const delete_row = (field:string, index:number) =>{
  if(field === 'prop'){
    if(index === 1000)
      is_new_prop.value = false;
    else
      upgrade_bonus_item.value.prop_bonus.splice(index, 1);
  }
  if(field === 'buff'){
    if(index === 1000)
      is_new_buff.value = false;
    else
      upgrade_bonus_item.value.buff_bonus.splice(index, 1);
  }
  if(field === 'relation'){
    if(index === 1000)
      is_new_relation.value = false;
    else
      upgrade_bonus_item.value.relation_bonus.splice(index, 1);
  }
  if(field === 'real'){
    if(index === 1000)
      is_new_real.value = false;
    else
      upgrade_bonus_item.value.real_bonus.splice(index, 1);
  }
}

const insert_row = (field:string) =>{
  if(field === 'prop')
  {
     is_new_prop.value = true;
  }
  if(field === 'buff')
  {
     is_new_buff.value = true;
  }
  if(field === 'relation')
  {
     is_new_relation.value = true;
  }
  if(field === 'real')
  {
     is_new_real.value = true;
  }
}

const formData = ref({
    vip_level_op:'≥',
    vip_level_number:'',
    vip_reward_receive_op:'≥',
    vip_reward_receive_number:'',
    buff_quantity_op:'≥',
    buff_quantity_number:'',
    bonus_amount_op:'≥',
    bonus_amount_number:'',
    real_money_amount_op:'≥',
    real_money_amount_number:'',
    props_amount_op:'≥',
    props_amount_number:'',
    vip_rank:''
})

const buttonIndex = ref<number>(0);
const dateRange = ref<Array<any>>([
      moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
      moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const handledateRange = (date: string) => {
  switch (date) {
    case "before yesterday":
      dateRange.value[0] = moment().subtract(2, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(2, 'day').format('YYYY-MM-DD');
      buttonIndex.value = 2;
      break;
    case "yesterday":
      dateRange.value[0] = moment().subtract(1, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(1, 'day').format('YYYY-MM-DD');
      buttonIndex.value = 1;
      break;
    case "today":
      dateRange.value[0] = moment().format('YYYY-MM-DD');
      dateRange.value[1] = moment().format('YYYY-MM-DD');
      buttonIndex.value = 0;
      break;
    case "this week":
      dateRange.value[0] = moment().clone().startOf('week').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().endOf('week').format('YYYY-MM-DD');
      buttonIndex.value = 3;
      break;
    case "last week":
      dateRange.value[0] = moment().clone().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
      buttonIndex.value = 4;
      break;
    case "this month":
      dateRange.value[0] = moment().clone().startOf('month').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().endOf('month').format('YYYY-MM-DD');
      buttonIndex.value = 5;
      break;
    case "last month":
      dateRange.value[0] = moment().clone().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
      buttonIndex.value = 6;
      break;
    case "this year":
      dateRange.value[0] = moment().clone().startOf('year').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().endOf('year').format('YYYY-MM-DD');
      buttonIndex.value = 7;
      break;
    case "last year":
      dateRange.value[0] = moment().clone().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
      dateRange.value[1] = moment().clone().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
      buttonIndex.value = 8;
      break;
    case "last 7days":
      dateRange.value[0] = moment().subtract(7, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(0, 'day').format('YYYY-MM-DD');
      buttonIndex.value = 9;
      break;
    case "last 30days":
      dateRange.value[0] = moment().subtract(30, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment().subtract(0, 'day').format('YYYY-MM-DD');
      buttonIndex.value = 10;
      break;
    case "all":
      dateRange.value[0] = "";
      dateRange.value[1] = "";
      buttonIndex.value = 11;
      break;
    case "previous day":
      var date1 = new Date(dateRange.value[0]);
      var date2 = new Date(dateRange.value[1]);

      dateRange.value[0] = moment(date1).subtract(1, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment(date2).subtract(1, 'day').format('YYYY-MM-DD');
      break;
    case "next day":
      var date1 = new Date(dateRange.value[0]);
      var date2 = new Date(dateRange.value[1]);

      dateRange.value[0] = moment(date1).subtract(-1, 'day').format('YYYY-MM-DD');
      dateRange.value[1] = moment(date2).subtract(-1, 'day').format('YYYY-MM-DD');
      break;
  }
}

const op_options = ref<Array<any>>([
    {
        label: "≥",
        value: "≥"
    },
    {
        label: "＞",
        value: "＞"
    },
    {
        label: "≤",
        value: "≤"
    },
    {
        label: "＜",
        value: "＜"
    },
    {
        label: "＝",
        value: "＝"
    }
])
const vip_ranks = ref<Array<string>>(['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'])

const upgrade_bonus_statistic_list = ref<Array<UpgradeBonusStatisticData>>();
</script>

<template>
  <div class="app-container">
    <el-row v-if="tab_index == 0" :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search">
          <el-form :inline="true" label-width="120" class="right_position">
            <el-form-item>
              <el-button>新增升级奖励</el-button>
              <el-button>模版导出</el-button>
              <el-button>Excel导入</el-button>
              <el-button>Excel导出</el-button>
            </el-form-item>
          </el-form>
          <div class="right_position switch_div" style="margin-right: 20px">
            <p>VIP升级奖励功能开启/关闭</p>
            <el-switch
              size="large"
              v-model="vip_upgrade_bonus_switch"
              inline-prompt
              active-text="开"
              inactive-text="关"
              class="switch"
            />
          </div>
        </div>
      </el-col>
    </el-row>

    <div v-if="tab_index == 1" class="search">
      <el-form class="left_position" style="display:flex">
          <el-form-item label="VIP等级" style="display:flex">
              <el-select v-model="formData.vip_level_op" style="width: 80px;">
                  <el-option
                      v-for="item in op_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
              </el-select>
              <el-input v-model="formData.vip_level_number" placeholder="请输入VIP等级" style="width:200px"/>
          </el-form-item>
          
          <el-form-item label="领取VIP奖励人数" style="display:flex">
              <el-select v-model="formData.vip_reward_receive_op" style="width: 80px;">
                  <el-option
                      v-for="item in op_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
              </el-select>
              <el-input v-model="formData.vip_reward_receive_number" placeholder="请输入人数" style="width:200px"/>
          </el-form-item>

          <el-form-item label="BUFF数量" style="display:flex">
              <el-select v-model="formData.buff_quantity_op" style="width: 80px;">
                  <el-option
                      v-for="item in op_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
              </el-select>
              <el-input v-model="formData.buff_quantity_number" placeholder="请输入BUFF数量" style="width:200px"/>
          </el-form-item>
      </el-form>
      <el-form class="left_position" style="display:flex;justify-content:space-between; padding-right:20px;">
          <div style="display:flex">
              <el-form-item label="奖金金额" style="display:flex">
                  <el-select v-model="formData.bonus_amount_op" style="width: 80px;">
                      <el-option
                          v-for="item in op_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
                  <el-input v-model="formData.bonus_amount_number" placeholder="请输入奖金金额" style="width:200px"/>
              </el-form-item>

              <el-form-item label="真金金额" style="display:flex">
                  <el-select v-model="formData.real_money_amount_op" style="width: 80px;">
                      <el-option
                          v-for="item in op_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
                  <el-input v-model="formData.real_money_amount_number" placeholder="请输入真金金额" style="width:200px"/>
              </el-form-item>

              <el-form-item label="道具数量" style="display:flex">
                  <el-select v-model="formData.props_amount_op" style="width: 80px;">
                      <el-option
                          v-for="item in op_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
                  <el-input v-model="formData.props_amount_number" placeholder="请输入道具数量" style="width:200px"/>
              </el-form-item>
          </div>
          <div>
              <el-button  :icon="Refresh">重置</el-button>
              <el-button  :icon="Search">查新</el-button>
          </div>
      </el-form>
      <el-form class="left_position" style="display:flex">
          <el-form-item label="VIP等级" style="display:flex">
            <el-select v-model="formData.vip_rank" placeholder="请选择VIP段位" clearable>
                <el-option
                    v-for="item in vip_ranks"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
          </el-form-item>
      </el-form>
    </div>
    <el-card v-if="tab_index == 1" style="margin-top: 10px;">
        <el-row style="justify-content: space-between;">
            <div>              
                <el-button :type="buttonIndex == 11 ? 'primary' : ''" @click="handledateRange('all')">全部</el-button>
                <el-button :type="buttonIndex == 0 ? 'primary' : ''" @click="handledateRange('today')">今日</el-button>
                <el-button :type="buttonIndex == 1 ? 'primary' : ''" @click="handledateRange('yesterday')">昨日</el-button>
                <el-button :type="buttonIndex == 2 ? 'primary' : ''" @click="handledateRange('before yesterday')">前日</el-button>
                <el-button :type="buttonIndex == 3 ? 'primary' : ''" @click="handledateRange('this week')">本周</el-button>
                <el-button :type="buttonIndex == 4 ? 'primary' : ''" @click="handledateRange('last week')">上周</el-button>
                <el-button :type="buttonIndex == 5 ? 'primary' : ''" @click="handledateRange('this month')">本月</el-button>
                <el-button :type="buttonIndex == 6 ? 'primary' : ''" @click="handledateRange('last month')">上月</el-button>
                <el-button :type="buttonIndex == 7 ? 'primary' : ''" @click="handledateRange('this year')">今年</el-button>
                <el-button :type="buttonIndex == 8 ? 'primary' : ''" @click="handledateRange('last year')">去年</el-button>
                <el-button :type="buttonIndex == 9 ? 'primary' : ''" @click="handledateRange('last 7days')">过去7天</el-button>
                <el-button :type="buttonIndex == 10 ? 'primary' : ''" @click="handledateRange('last 30days')">过去30天</el-button>
            </div>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-form :inline="true" style="width: 100%;">
                <el-form-item>
                    <el-button  @click="handledateRange('previous day')">前一天</el-button>
                </el-form-item>
                <el-form-item label="选择周期:">
                    <el-date-picker type="daterange" v-model="dateRange" range-separator="至"
                    value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button  @click="handledateRange('next day')">后一天</el-button>
                </el-form-item>
                <el-form-item style="float: right;">

                </el-form-item>
            </el-form>
        </el-row>
    </el-card>
    


    <div style="margin-top: 20px">
      <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
        >奖励详情</el-button
      >
      <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
        >统计数据</el-button
      >
    </div>

    <el-card>
      <el-table v-if="tab_index == 0" style="width: 100%" :data="upgrade_bonus_list">
        <el-table-column label="VIP等级" align="center" width="160" prop="vip_level" />
        <el-table-column label="道具及BUFF奖励ID" align="center">
          <template #header>
            <span class="yellow_t_header"> 道具及BUFF奖励ID </span>
          </template>
          <el-table-column label="道具或BUFF的ID" align="center" prop="prop_buff_bonus">
            <template #header>
              <span class="yellow_t_header"> 道具或BUFF的ID </span>
            </template>
            <template #default="scope">
              <div style="display: flex; flex-direction: column">
                <el-tooltip v-for="(item, index) in scope.row.prop_bonus"
                  :key="index" :content="prop_buff_tooltip_html(item.id)" raw-content
                >
                  <template #content>
                    
                  </template>
                  <el-button type="text" class="underline-link">
                    {{ `${item.id}` }}
                  </el-button>
                </el-tooltip>

                <el-tooltip v-for="(item, index) in scope.row.buff_bonus"
                  :key="index" :content="prop_buff_tooltip_html(item.id)" raw-content
                >
                  <template #content>
                    
                  </template>
                  <el-button type="text" class="underline-link">
                    {{ `${item.id}` }}
                  </el-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template #header>
              <span class="yellow_t_header"> 数量 </span>
            </template>
            <template #default="scope">
              <div v-for="(item, index) in scope.row.prop_bonus" :key="index">
                {{ `${item.amount}` }}
              </div>
              <div v-for="(item, index) in scope.row.buff_bonus" :key="index">
                {{ `${item.amount}` }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="权重（万分比）" align="center">
            <template #header>
              <span class="yellow_t_header"> 权重（万分比） </span>
            </template>
            <template #default="scope">
              <div v-for="(item, index) in scope.row.prop_bonus" :key="index">
                {{ `${item.weight}` }}
              </div>
              <div v-for="(item, index) in scope.row.buff_bonus" :key="index">
                {{ `${item.weight}` }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="奖金ID" align="center">
          <template #header>
            <span class="pink_t_header"> 奖金ID </span>
          </template>
          <el-table-column label="奖金ID" align="center">
            <template #header>
              <span class="pink_t_header"> 奖金ID </span>
            </template>
            <template #default="scope">
              <div style="display: flex; flex-direction: column">
                <el-tooltip v-for="(item, index) in scope.row.relation_bonus"
                  :key="index" :content="relation_tooltip_html(item.id)" raw-content
                >
                  <template #content>
                    
                  </template>
                  <el-button type="text" class="underline-link">
                    {{ `${item.id}` }}
                  </el-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="权重（万分比）" align="center">
            <template #header>
              <span class="pink_t_header"> 权重（万分比） </span>
            </template>
            <template #default="scope">
              <div v-for="(item, index) in scope.row.relation_bonus" :key="index">
                {{ `${item.weight}` }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="真金" align="center">
          <template #header>
            <span class="blue_t_header"> 真金 </span>
          </template>
          <el-table-column label="金额" align="center">
            <template #header>
              <span class="blue_t_header"> 金额 </span>
            </template>
            <template #default="scope">
              <div v-for="(item, index) in scope.row.real_bonus" :key="index">
                {{ `${item.amount.toFixed(2)}` }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="打码倍率" align="center">
            <template #header>
              <span class="blue_t_header"> 打码倍率 </span>
            </template>
            <template #default="scope">
              <div v-for="(item, index) in scope.row.real_bonus" :key="index">
                {{ `${item.code_magnification.toFixed(2)}` }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="权重（万分比" align="center">
            <template #header>
              <span class="blue_t_header"> 权重（万分比） </span>
            </template>
            <template #default="scope">
              <div v-for="(item, index) in scope.row.real_bonus" :key="index">
                {{ `${item.weight}` }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="120">
          <template #default="scope">
            <el-button type="primary" link @click="show_detail(scope.row)">详情</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="tab_index == 1" style="width: 100%" :data="upgrade_bonus_statistic_list">
        <el-table-column label="VIP等级" align="center" width="160" prop="vip_level" />
        <el-table-column sortable label="等级内账号数" align="center" prop="vip_level_count" />
        <el-table-column sortable label="领取人数" align="center" prop="vip_bonus_recevier_count" />
        <el-table-column sortable label="真金金额" align="center"  prop="real_money_amount" />
        <el-table-column sortable label="奖金金额" align="center" prop="bonus_amount" />
        <el-table-column sortable label="道具数量" align="center" prop="props_count" />
        <el-table-column sortable label="道具使用数量" align="center" prop="props_used_count" />
        <el-table-column sortable label="BUFF数量" align="center" prop="buff_quantity" />
        <el-table-column sortable label="BUFF使用数量" align="center" prop="buff_usage_quantity" />
      </el-table>
    </el-card>

    <el-dialog v-model="show_dialog" :title="dialog_title" style="width:60%;">
        <div class="dl_row">
            <p style="width:20%">VIP等级</p>
            <div style="width:80%">
                <el-input v-model="upgrade_bonus_item.vip_level" disabled style="width:50%"></el-input>
            </div>
        </div>
        <div class="dl_row">            
            <p style="width:20%">道具 ID</p>
            <div style="width:80%">
                <div v-for="(item, index) in upgrade_bonus_item.prop_bonus" :key="index" style="display:flex; align-items:center; justify-content:space-between">
                    <div style="display:flex; align-items:center; justify-content:space-between; width: 80%">
                      <el-input v-model="item.id" placeholder="请输入道具ID"/>
                      <p style="width:60%; margin-left:30px">道具数量</p>
                      <el-input v-model="item.amount" style="margin-left:0px;" placeholder="请输入奖励数量"/>
                      <p style="width:60%; margin-left:30px">道具权重</p>
                      <el-input v-model="item.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="index != 0" @click="delete_row('prop', index)"> - </el-button>
                        <el-button v-if="index == upgrade_bonus_item.prop_bonus.length -1" @click="insert_row('prop')"> + </el-button>
                    </div>
                </div>
                <div v-if="is_new_prop || upgrade_bonus_item.prop_bonus.length == 0" style="display:flex; align-items:center; justify-content:space-between">
                  <div style="display:flex; align-items:center; justify-content:space-between; width: 80%">
                      <el-input v-model="new_prop.id" placeholder="请输入道具ID"/>
                      <p style="width:60%; margin-left:30px">道具数量</p>
                      <el-input v-model="new_prop.amount" :value="new_prop.amount === -1 ? '':new_prop.amount" style="margin-left:0px;" placeholder="请输入奖励数量"/>
                      <p style="width:60%; margin-left:30px">道具权重</p>
                      <el-input v-model="new_prop.weight" :value="new_prop.weight===-1?'':new_prop.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="upgrade_bonus_item.prop_bonus.length != 0" @click="delete_row('prop', 1000)"> - </el-button>
                        <el-button v-else @click="insert_row('prop')"> + </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="dl_row">            
            <p style="width:20%">Buff ID</p>
            <div style="width:80%">
                <div v-for="(item, index) in upgrade_bonus_item.buff_bonus" :key="index" style="display:flex; align-items:center; justify-content:space-between">
                    <div style="display:flex; align-items:center; justify-content:space-between; width: 80%">
                      <el-input v-model="item.id" placeholder="请输入道具ID"/>
                      <p style="width:60%; margin-left:30px">Buff数量</p>
                      <el-input v-model="item.amount" style="margin-left:0px;" placeholder="请输入奖励数量"/>
                      <p style="width:60%; margin-left:30px">Buff权重</p>
                      <el-input v-model="item.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="index != 0" @click="delete_row('buff', index)"> - </el-button>
                        <el-button v-if="index == upgrade_bonus_item.buff_bonus.length -1" @click="insert_row('buff')"> + </el-button>
                    </div>
                </div>
                <div v-if="is_new_buff || upgrade_bonus_item.buff_bonus.length == 0" style="display:flex; align-items:center; justify-content:space-between">
                  <div style="display:flex; align-items:center; justify-content:space-between; width: 80%">
                      <el-input v-model="new_buff.id" placeholder="请输入道具ID"/>
                      <p style="width:60%; margin-left:30px">Buff数量</p>
                      <el-input v-model="new_buff.amount" :value="new_buff.amount === -1 ? '':new_buff.amount" style="margin-left:0px;" placeholder="请输入奖励数量"/>
                      <p style="width:60%; margin-left:30px">Buff权重</p>
                      <el-input v-model="new_buff.weight" :value="new_buff.weight===-1?'':new_buff.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="upgrade_bonus_item.buff_bonus.length != 0" @click="delete_row('buff', 1000)"> - </el-button>
                        <el-button v-else @click="insert_row('buff')"> + </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="dl_row">            
            <p style="width:20%">奖金ID</p>
            <div style="width:80%">
                <div v-for="(item, index) in upgrade_bonus_item.relation_bonus" :key="index" style="display:flex; align-items:center; justify-content:space-between">
                    <div style="display:flex; align-items:center; justify-content:space-between; width: 80%">
                        <el-input v-model="item.id" placeholder="请输入奖金ID"/>
            
                        <p style="width:145%; margin-left:30px"></p>
            
                        <p style="width:40%; margin-left:30px">奖金权重</p>
                        <el-input v-model="item.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="index != 0" @click="delete_row('relation', index)"> - </el-button>
                        <el-button v-if="index == upgrade_bonus_item.relation_bonus.length -1" @click="insert_row('relation')"> + </el-button>
                    </div>
                </div>
                <div v-if="is_new_relation || upgrade_bonus_item.relation_bonus.length == 0" style="display:flex; align-items:center; justify-content:space-between">
                  <div style="display:flex; align-items:center; justify-content:space-between; width: 90%">
                      <el-input v-model="new_relation.id" placeholder="请输入道具ID"/>
                      <p style="width:60%; margin-left:30px">奖金权重</p>
                      <el-input v-model="new_relation.weight" :value="new_relation.weight===-1?'':new_relation.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="upgrade_bonus_item.relation_bonus.length != 0" @click="delete_row('relation', 1000)"> - </el-button>
                        <el-button v-else @click="insert_row('relation')"> + </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="dl_row">            
            <p style="width:20%">真金</p>
            <div style="width:80%">
                <div v-for="(item, index) in upgrade_bonus_item.real_bonus" :key="index" style="display:flex; align-items:center; justify-content:space-between">
                    <div style="display:flex; align-items:center; justify-content:space-between; width: 80%">
                        <el-input v-model="item.amount" placeholder="请输入真金"/>
                        <p style="width:40%; margin-left:30px">打码倍率</p>
                        <el-input v-model="item.code_magnification" style="margin-left:0px;" placeholder="请输入打码倍率"/>
                        <p style="width:40%; margin-left:30px" >真金权重</p>
                        <el-input v-model="item.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="index != 0" @click="delete_row('real', index)"> - </el-button>
                        <el-button v-if="index == upgrade_bonus_item.real_bonus.length -1" @click="insert_row('real')"> + </el-button>
                    </div>
                </div>
                <div v-if="is_new_real || upgrade_bonus_item.real_bonus.length == 0" style="display:flex; align-items:center; justify-content:space-between">
                  <div style="display:flex; align-items:center; justify-content:space-between; width: 90%">
                        <el-input v-model="new_real.amount" :value="new_real.amount===-1?'':new_real.amount" placeholder="请输入真金"/>
                        <p style="width:40%; margin-left:30px">打码倍率</p>
                        <el-input v-model="new_real.code_magnification" :value="new_real.code_magnification===-1?'':new_real.code_magnification" style="margin-left:0px;" placeholder="请输入打码倍率"/>
                        <p style="width:40%; margin-left:30px" >真金权重</p>
                        <el-input v-model="new_real.weight" :value="new_real.weight===-1?'':new_real.weight" placeholder="请输入奖励权重"/>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-around; width: 20%">
                        <el-button v-if="upgrade_bonus_item.real_bonus.length != 0" @click="delete_row('real', 1000)"> - </el-button>
                        <el-button v-else @click="insert_row('real')"> + </el-button>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <div style="display:flex; justify-content:center">             
                <el-button type="primary" @click="console.log(upgrade_bonus_item.prop_bonus[0].id)">确认</el-button>
                <el-button>取消</el-button>
            </div>
        </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.el-input{
    padding: 0px 1px;
}
.el-table--default .cell {
    padding: 0 0px;
}
.dl_row{
    padding: 1px 20px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
}
.dl_row:nth-child(2n+1) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n) {
  /* Style for even elements in the group */
  background-color: #ccc;
}
.underline-link {
  text-decoration: underline;
  margin-left: 0px !important;
}
.el-table thead th.el-table__cell {
    background: #f5f7fa !important;
    padding: 0px !important;
    height: 100px;
}
.el-table--enable-row-transition .el-table__body td.el-table__cell {
  height: 80px;
}

.right_position {
  display: flex;
  justify-content: right;
}

.el-radio__input.is-checked + .el-radio__label {
  color: inherit;
}

.yellow_t_header {
  background-color: #b8ae23; // Example: Set the text color to red
  font-weight: bold; // Example: Set the font weight to bold
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  color: black;
  margin: 0px;
}

.pink_t_header {
  background-color: pink; // Example: Set the text color to red
  font-weight: bold; // Example: Set the font weight to bold
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  color: black;
  margin: 0px;
}

.blue_t_header {
  background-color: lightblue; // Example: Set the text color to red
  font-weight: bold; // Example: Set the font weight to bold
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  color: black;
  margin: 0px;
}
.switch{
    height: 100%;
    margin-left: 10px;
}

.switch_div{
    display: flex;
    align-items: center;
}
</style>
