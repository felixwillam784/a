<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { fa } from 'element-plus/es/locale';
import { NumberFormatProps } from 'vue-i18n';

interface GetVIPRankData {
    vip_level:number,
    vip_rank:string,
    recharge_vip_upgrade:number,
    coding_vip_upgrade:number,
    withdrawal_fee:number,
    free_amount_month:number,
    maximum_amount_amount:number,
    daily_limit_amount:number,
    monthly_limit_amount:number,
    daily_limit_time:number,
    monthly_limit_time:number,
    recharge_vip_up:number,
    coding_vip_relegation:number,
    vip_limit_days:number,
    vip_and_was_lowered:number,

    rebate_way:string,
    protect_vip:string,
    rebate_mode:string,

    game_types:Array<rebateGameType>,
    rebate_order_time:string,
    rebate_order_time_amount:string,
    rebate_fund_time:string,
    rebate_fund_time_amount:string,

    client_lost_rebate_amount:number,
    client_lost_rebate_mode:string,
    client_lost_rebate_order_time:string,
    client_lost_rebate_order_time_amount:string,
    clien_lost_rebate_fund_time:string,
    clien_lost_rebate_fund_time_amount:string,
}
interface rebateGameType {
    game_type: string,
    rebate_amount: number,
}

const router = useRouter();

const formData = ref<any>({
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);
const vipDialogVisible = ref<boolean>(false);
const vipDialogTitle = ref<string>("VIP信息修改");
const total = ref<number>(2);
const modifyReason = ref<string>("");
const submitBtnText = ref<string>("");
const closeBtnText = ref<string>("");

const vipList = ref<Array<GetVIPRankData>>([{
        vip_level:0,
        vip_rank:"Iron",
        recharge_vip_upgrade:0,
        coding_vip_upgrade:0,
        withdrawal_fee:2.00,
        free_amount_month:0.00,
        maximum_amount_amount:20000.00,
        daily_limit_amount:20000.00,
        monthly_limit_amount:10,
        daily_limit_time:30,
        monthly_limit_time:0,
        recharge_vip_up:0,
        coding_vip_relegation:0,
        vip_limit_days:30,
        vip_and_was_lowered:0,
        rebate_way:'',
        protect_vip:'',
        game_types: [    
            {
                game_type:"Casino",
                rebate_amount:3.0,
            },
            {
                game_type:"Sports",
                rebate_amount:3.0,
            },
            {
                game_type:"Racing",
                rebate_amount:4.0,
            },
            {
                game_type:"Trading",
                rebate_amount:4.0,
            },
            {
                game_type:"Futures",
                rebate_amount:3.0,
            },
            {
                game_type:"Lottery",
                rebate_amount:3.0,
            },
            {
                game_type:"Bingo",
                rebate_amount:3.5,
            }
        ],
        rebate_mode:'',
        rebate_order_time:'',
        rebate_order_time_amount:'',
        rebate_fund_time:'',
        rebate_fund_time_amount:'',
        
        client_lost_rebate_amount:0,
        client_lost_rebate_mode:'',
        client_lost_rebate_order_time:'',
        client_lost_rebate_order_time_amount:'',
        clien_lost_rebate_fund_time:'',
        clien_lost_rebate_fund_time_amount:'',
    },
    {
        vip_level:1,
        vip_rank:"Bronze",
        recharge_vip_upgrade:0,
        coding_vip_upgrade:0,
        withdrawal_fee:1.95,
        free_amount_month:0.00,
        maximum_amount_amount:20000.00,
        daily_limit_amount:20000.00,
        monthly_limit_amount:10,
        daily_limit_time:30,
        monthly_limit_time:0,
        recharge_vip_up:100,
        coding_vip_relegation:100,
        vip_limit_days:30,
        vip_and_was_lowered:1,

        rebate_way:'',
        protect_vip:'',
        game_types: [],
        rebate_mode:'',
        rebate_order_time:'',
        rebate_order_time_amount:'',
        rebate_fund_time:'',
        rebate_fund_time_amount:'',

        client_lost_rebate_amount:0,
        client_lost_rebate_mode:'',
        client_lost_rebate_order_time:'',
        client_lost_rebate_order_time_amount:'',
        clien_lost_rebate_fund_time:'',
        clien_lost_rebate_fund_time_amount:'',
    },
])
const vipItem = ref<GetVIPRankData>(vipList.value[0])

const vip_maintain_switch = ref(true)

onMounted(()=>{
    rank_options = [];
    for(let i = 0; i < vip_ranks.value.length; i ++)
        rank_options.push({value:vip_ranks.value[i], label:vip_ranks.value[i]})

})

// vip_rank_dialog
const vip_level_rank = ref(false);
const show_vip_rank_dialog = () =>{
    vip_level_rank.value = true;
}
const vip_ranks = ref<Array<string>>(['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'])
const add_vip_rank = ref(false);
const new_vip_rank_txt = ref('');
const operate_new_vip_rank = (op :boolean) =>{
    add_vip_rank.value = op;
}

//vip_rank_detail
const tab_index=ref(0);
const select_tab = (index:number) => {
    tab_index.value = index;
}

const vip_rank_detail_dialog = ref(false);
const show_vip_rank_detail_dialog = (param:GetVIPRankData) =>{
    vip_rank_detail_dialog.value = true;
    vipItem.value = param;
}
const vip_rank_detail_label = ref<Array<string>>(['VIP等级', 'VIP段位', 'VIP升级所需充值', 'VIP升级所需打码量', '提现手续费', '免提现手续费额度/月', '单笔最高提现金额','每日可提现额度', '每月可提现额度', '每日可提现次数', '每月可提现次数', 'VIP保级所需充值', 'VIP保级所需打码','VIP保级时效','VIP保级失败降低等级']);
let rank_options:any[] = [];

const slice_item_object = () =>{
    if(vipItem.value){
        const {
            vip_level,
            vip_rank,
            recharge_vip_upgrade,
            coding_vip_upgrade,
            withdrawal_fee,
            free_amount_month,
            maximum_amount_amount,
            daily_limit_amount,
            monthly_limit_amount,
            daily_limit_time,
            monthly_limit_time,
            recharge_vip_up,
            coding_vip_relegation,
            vip_limit_days,
            vip_and_was_lowered,
        } = vipItem.value;
        const wrappedObject = {
            vip_level,
            vip_rank,
            recharge_vip_upgrade,
            coding_vip_upgrade,
            withdrawal_fee,
            free_amount_month,
            maximum_amount_amount,
            daily_limit_amount,
            monthly_limit_amount,
            daily_limit_time,
            monthly_limit_time,
            recharge_vip_up,
            coding_vip_relegation,
            vip_limit_days,
            vip_and_was_lowered,
        };
        
        return wrappedObject;
    }
    return undefined;

}

//coderebate_setting
const new_rebate_type=ref<rebateGameType>({
    game_type:"",
    rebate_amount:0,
});
const delete_rebate_type = (index:number) => {
    if(index === 1000)
        add_new_rebate.value = false;
    else
        vipItem.value?.game_types.splice(index, 1);
}
const add_rebate_type = () =>{
    add_new_rebate.value = true;
}
const add_new_rebate = ref<boolean>(false);

const is_disabled_rebate_fund_time_amount = () => {
    if(vipItem.value?.rebate_fund_time == '释放')
        return false;
    return true;
}

//clientlost_setting
const is_disabled_clien_lost_rebate_fund_time_amount = () =>{
    if(vipItem.value?.clien_lost_rebate_fund_time == '释放')
        return false;
    return true;
}
</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120" class="right_position">
                        <el-form-item>
                            <el-button >新增VIP等级</el-button>
                            <el-button @click="show_vip_rank_dialog()">VIP段位</el-button>
                            <el-button>模板导出</el-button>
                            <el-button>Excel导入</el-button>
                            <el-button>Excel导出</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="right_position switch_div" style="margin-right:20px">
                        <p>
                            VIP保级功能
                        </p>
                        <el-switch
                            size = "large"
                            v-model="vip_maintain_switch"
                            inline-prompt
                            active-text="开启"
                            inactive-text="关闭"
                            class="switch"
                        />
                    </div>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="vipList" style="width: 100%;">
                        <el-table-column label="VIP等级" align="center" prop="vip_level" width="160" />
                        <el-table-column label="VIP段位" align="center" prop="vip_rank" width="160" />
                        <el-table-column label="VIP升级所需充值" align="center" prop="recharge_vip_upgrade" width="160" />
                        <el-table-column label="VIP升级所需打码" align="center" prop="coding_vip_upgrade" width="160" />
                        <el-table-column label="提现手续费" align="center" prop="withdrawal_fee" width="160" />
                        <el-table-column label="提现免手续费 额度/月" align="center" prop="free_amount_month" width="160" />
                        <el-table-column label="单笔最高提现金额" align="center" prop="maximum_amount_amount" width="160" />
                        <el-table-column label="每日可提现额度" align="center" prop="daily_limit_amount" width="160" />
                        <el-table-column label="每月可提现额度" align="center" prop="monthly_limit_amount" width="160" />
                        <el-table-column label="每日提现次数限制" align="center" prop="daily_limit_time" width="160" />
                        <el-table-column label="每月提现次数限制" align="center" prop="monthly_limit_time" width="160" />
                        <el-table-column label="VIP保级所需充值" align="center" prop="recharge_vip_up" width="160" />
                        <el-table-column label="VIP保级所需打码" align="center" prop="coding_vip_relegation" width="160" />
                        <el-table-column label="VIP保级时效(天)" align="center" prop="vip_limit_days" width="160" />
                        <el-table-column label="VIP保级失败降低等级" align="center" prop="vip_and_was_lowered" width="160" />
                        
                        <el-table-column label="操作" align="center" fixed="right" width="120">
                            <template #default="scope">
                                <el-button type="primary" link @click="show_vip_rank_detail_dialog(scope.row)">详情</el-button>
                                <el-button type="danger" link>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="float: right;">
                        <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
                            v-model:limit="formData.pageSize" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        
        <el-dialog v-model='vip_level_rank' title="VIP段位">
            <div style="margin-bottom:200px">
                <div v-for="(item, index) in vip_ranks" :key="index" class="dl_row">
                    <p>
                        {{`段位 ${index}`}}
                    </p>
                    <el-input v-model="vip_ranks[index]" placeholder="Please input" style="width:70%; margin-left:20px"/>
                    <button v-if="index === vip_ranks.length - 1" style="margin-left:100px; width:25px" @click="operate_new_vip_rank(true)">
                        +
                    </button>
                </div>

                <div v-if="add_vip_rank == true" class="dl_row">
                    <p>
                        {{`段位 ${vip_ranks.length}`}}
                    </p>
                    <el-input v-model="new_vip_rank_txt" placeholder="请输入新增段位的名字" style="width:70%; margin-left:20px"/>
                    <button style="margin-left:100px; width:25px" @click='operate_new_vip_rank(false)'>
                        -
                    </button>
                </div>
            </div>

            <template #footer>
                <div style="display:flex; justify-content:center">             
                    <el-button type="primary">确认</el-button>
                    <el-button>取消</el-button>
                </div>
           </template>
        </el-dialog>

        <el-dialog v-model='vip_rank_detail_dialog' title="VIP详情" :top="'5px'">
            <div style="margin-bottom:10px">
                <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)">基本详情</el-button>
                <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)">打码返利设置</el-button>
                <el-button :type="tab_index == 2 ? 'warning' : ''" @click="select_tab(2)">客损返利设置</el-button>
            </div>
            <div v-if="tab_index === 0" style="display:flex; flex-direction:column">            
                <div v-for="(item, key, index) in slice_item_object()" :key="key" class="dl_row" :style="`order:${index}`" >
                    <p style="width:20%">
                        {{`${vip_rank_detail_label[index]}`}}
                    </p>
                    <div v-if='index===1' style="display:flex; width: 78.5%" >
                        <el-select v-model="vipItem[key]" placeholder="Select" style="width:100%; margin-left:20px">
                            <el-option
                                v-for="item in rank_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                            <button style="margin-left:100px; width:25px" @click="show_vip_rank_dialog()">
                            +
                        </button>
                    </div>
                    <el-input v-else v-model="vipItem[key]" placeholder="Please input" style="width:60%; margin-left:20px"/>
                    <p v-if="index === 4">%</p>
                </div>
                <div class="dl_row" style="order:10">
                    <p style="width:20%">
                        VIP返利类型
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px">
                        <el-radio-group v-model="vipItem.rebate_way" class="ml-4">
                            <el-radio label="打码返利" size="large">打码返利</el-radio>
                            <el-radio label="客损返利" size="large">客损返利</el-radio>
                            <el-radio label="无返利" size="large">无返利</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="dl_row" style="order:10">
                    <p style="width:20%">
                        是否保级
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px">
                        <el-radio-group v-model="vipItem.protect_vip" class="ml-4">
                            <el-radio label="开启保级" size="large">开启保级</el-radio>
                            <el-radio label="关闭保级" size="large">关闭保级</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <div v-if="tab_index === 1">
                <div v-for="(item, index) in vipItem.game_types" :key="index" class="dl_row">
                    <p style="width:20%">
                        {{`${item.game_type}`}}
                    </p>
                    <el-input v-model="vipItem.game_types[index].rebate_amount" :value="vipItem.game_types[index].rebate_amount.toFixed(1)" placeholder="Please input" style="width:50%; margin-left:20px"/>
                    <p>
                        %
                    </p>
                    <button v-if="index !== 0" style="margin-left:100px; width:25px" @click="delete_rebate_type(index)">
                        -
                    </button>
                    <button v-if="index === vipItem.game_types.length - 1" style="margin-left:10px; width:25px" @click="add_rebate_type()">
                        +
                    </button>
                </div>
                <div v-if="add_new_rebate === true" class="dl_row">
                    <p style="width:20%">
                        <el-input v-model="new_rebate_type.game_type" placeholder="请输入新的类型"/>
                    </p>
                    <el-input v-model="new_rebate_type.rebate_amount" placeholder="请输入返利百分比" style="width:50%; margin-left:20px"/>
                    <p>
                        %
                    </p>
                    <button style="margin-left:100px; width:25px" @click="delete_rebate_type(1000)">
                        -
                    </button>
                </div>
                <div class="dl_row">
                    <p style="width:20%">
                        返利领取方式
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px">
                        <el-radio-group v-model="vipItem.rebate_mode" class="ml-4">
                            <el-radio label="玩家手动领取" size="large">玩家手动领取</el-radio>
                            <el-radio label="结算时自动到账" size="large">结算时自动到账</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="dl_row" style="order:10; height:80px">
                    <p style="width:20%">
                        返利结算周期
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px">
                        <el-radio-group v-model="vipItem.rebate_order_time" class="ml-4">
                            <el-radio label="实时结算" size="large">实时结算</el-radio>
                            <el-radio label="每日刷新结算" size="large">每日刷新结算</el-radio>
                            <el-radio label="每周刷新结算" size="large">每周刷新结算</el-radio>
                            <el-radio label="每月刷新结算" size="large">每月刷新结算</el-radio>
                            <el-radio label="天后刷新结算" size="large"><el-input v-model='vipItem.rebate_order_time_amount' style="width:80px" placeholder="请输入天数"/>天后刷新结算</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="dl_row">
                    <p style="width:20%">
                        奖励释放周期
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px; align-items:center">
                        <el-radio-group v-model="vipItem.rebate_fund_time" class="ml-4">
                            <el-radio label="不释放" size="large">不释放</el-radio>
                            <el-radio label="释放" size="large">释放</el-radio>
                        </el-radio-group>
                         <div style="display:flex; margin-left: 20px; height:30px; align-items:center">                               
                            <el-input style="width:200px;" placeholder="请输入自动释放天数" v-model="vipItem.rebate_fund_time_amount" :disabled="is_disabled_rebate_fund_time_amount()"/>
                            <label style="display:block;">天后释放</label>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tab_index === 2">
                <div class="dl_row">
                    <p style="width:20%">
                        客损返利比例
                    </p>
                    <div style="display:flex; width: 60%; margin-left:20px; align-items:center">
                        <el-input style="height:30px;" v-model="vipItem.client_lost_rebate_amount" :value="vipItem.client_lost_rebate_amount.toFixed(1)"/>
                        <p>
                            %
                        </p>
                    </div>
                </div>
                 <div class="dl_row">
                    <p style="width:20%">
                        返利领取方式
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px; align-items:center">
                        <el-radio-group v-model="vipItem.client_lost_rebate_mode" class="ml-4">
                            <el-radio label="不释放" size="large">玩家手动领取</el-radio>
                            <el-radio label="释放" size="large">结算时自动到账</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="dl_row" style="order:10; height:80px">
                    <p style="width:20%">
                        返利结算周期
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px">
                        <el-radio-group v-model="vipItem.client_lost_rebate_order_time" class="ml-4">
                            <el-radio label="实时结算" size="large">实时结算</el-radio>
                            <el-radio label="每日刷新结算" size="large">每日刷新结算</el-radio>
                            <el-radio label="每周刷新结算" size="large">每周刷新结算</el-radio>
                            <el-radio label="每月刷新结算" size="large">每月刷新结算</el-radio>
                            <el-radio label="天后刷新结算" size="large"><el-input v-model='vipItem.client_lost_rebate_order_time_amount' style="width:80px" placeholder="请输入天数"/>天后刷新结算</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="dl_row">
                    <p style="width:20%">
                        奖励释放周期
                    </p>
                    <div style="display:flex; width: 78.5%; margin-left:20px; align-items:center">
                        <el-radio-group v-model="vipItem.clien_lost_rebate_fund_time" class="ml-4">
                            <el-radio label="不释放" size="large">不释放</el-radio>
                            <el-radio label="释放" size="large">释放</el-radio>
                        </el-radio-group>
                         <div style="display:flex; margin-left: 20px; height:30px; align-items:center">                               
                            <el-input style="width:200px;" placeholder="请输入自动释放天数" v-model="vipItem.clien_lost_rebate_fund_time_amount" :disabled="is_disabled_clien_lost_rebate_fund_time_amount()"/>
                            <label style="display:block;">天后释放</label>
                        </div>
                    </div>
                </div>

            </div>
            <template #footer>
                <div style="display:flex; justify-content:center">             
                    <el-button type="primary">确认</el-button>
                    <el-button>取消</el-button>
                </div>
           </template>
        </el-dialog>
    </div>

</template>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa !important;
    height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
    height: 80px;
}

.right_position {
    display: flex;
    justify-content: right;
}

.switch{
    height: 100%;
    margin-left: 10px;
}

.switch_div{
    display: flex;
    align-items: center;
}
.dl_row{
    height: 40px;
    padding: 20px;
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
.el-radio__input.is-checked+.el-radio__label {
    color: inherit;
}
</style>