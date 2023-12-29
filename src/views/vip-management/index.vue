<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { fa } from 'element-plus/es/locale';

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
const vip_rank_detail_dialog = ref(false);
const show_vip_rank_detail_dialog = (param:GetVIPRankData) =>{
    vip_rank_detail_dialog.value = true;
    vipItem.value = param;
}
const vip_rank_detail_label = ref<Array<string>>(['VIP等级', 'VIP段位', 'VIP升级所需充值', 'VIP升级所需打码量', '提现手续费', '免提现手续费额度/月', '单笔最高提现金额','每日可提现额度', '每月可提现额度', '每日可提现次数', '每月可提现次数', 'VIP保级所需充值', 'VIP保级所需打码','VIP保级时效','VIP保级失败降低等级']);
let rank_options:any[] = [ ];

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
            <div style="display:flex; flex-direction:column">            
                <div v-for="(item, key, index) in vipItem" :key="key" class="dl_row" :style="`order:${index}`">
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
                            <button style="margin-left:100px; width:25px" @click="operate_new_vip_rank(true)">
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
</style>