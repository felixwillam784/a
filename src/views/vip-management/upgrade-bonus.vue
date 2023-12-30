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
  realtion_bonus: Array<RelationBonusData>;
  real_bonus: Array<RealBonusData>;
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
    realtion_bonus: [
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
    realtion_bonus: [],
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

    realtion_bonus: [
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
        realtion_bonus:[],
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
}

const insert_row = (field:string) =>{
  if(field === 'prop')
  {
     is_new_prop.value = true;
     console.log('asdf');
  }
}

</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
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
                <el-tooltip v-for="(item, index) in scope.row.realtion_bonus"
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
              <div v-for="(item, index) in scope.row.realtion_bonus" :key="index">
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
    </el-card>

    <el-dialog v-model="show_dialog" :title="dialog_title">
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
                <div v-if="is_new_prop" style="display:flex; align-items:center; justify-content:space-between">
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
                    <el-input v-model="item.id" placeholder="请输入Buff ID"/>
                    <p style="width:40%; margin-left:30px">Buff数量</p>
                    <el-input v-model="item.amount" style="margin-left:0px;" placeholder="请输入奖励数量"/>
                    <p style="width:40%; margin-left:30px" aria-placeholder="请输入奖励权重">Buff权重</p>
                    <el-input v-model="item.weight"/>
                </div>
            </div>
        </div>
        <div class="dl_row">
            <p style="width:20%">奖金ID</p>
            <div style="width:80%">
                <div v-for="(item, index) in upgrade_bonus_item.realtion_bonus" :key="index" style="display:flex; align-items:center; justify-content:space-between">
                    <el-input v-model="item.id" placeholder="请输入奖金ID"/>
                    
                    <p style="width:145%; margin-left:30px"></p>

                    <p style="width:40%; margin-left:30px">奖金权重</p>
                    <el-input v-model="item.weight" placeholder="请输入奖励权重"/>
                </div>
            </div>
        </div>
        <div class="dl_row">
            <p style="width:20%">真金</p>
            <div style="width:80%">
                <div v-for="(item, index) in upgrade_bonus_item.real_bonus" :key="index" style="display:flex; align-items:center; justify-content:space-between">
                    <el-input v-model="item.amount" placeholder="请输入真金"/>
                    <p style="width:40%; margin-left:30px">打码倍率</p>
                    <el-input v-model="item.code_magnification" style="margin-left:0px;" placeholder="请输入打码倍率"/>
                    <p style="width:40%; margin-left:30px" >真金权重</p>
                    <el-input v-model="item.weight" placeholder="请输入奖励权重"/>
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
