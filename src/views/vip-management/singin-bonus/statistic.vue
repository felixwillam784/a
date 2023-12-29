<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { fa } from 'element-plus/es/locale';
import { NumberFormatProps } from 'vue-i18n';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';

interface VIPSignInBonusRankStatistic{
    vip_rank:string,
    vip_rank_account_count:number,
    vip_signin_account_count:number,
    vip_checkin_count:number,
    vip_claim_reward_amount:number,
}

interface VIPSignInBonusLevelStatistic{
    vip_level:string,
    vip_level_account_count:number,
    vip_signin_account_count:number,
    vip_checkin_count:number,
    vip_claim_reward_amount:number,
}

const vip_signin_bonus_rank_statistic_list = ref<Array<VIPSignInBonusRankStatistic>>()
const vip_signin_bonus_level_statistic_list = ref<Array<VIPSignInBonusLevelStatistic>>()

const router = useRouter();
const goBack = () => {
    router.push({ name: "VIPSigninBonus"});
}

const formDataRank = ref({
    vip_rank:'',
    vip_rank_count_op:'≥',
    vip_rank_count_number:'',
    vip_singin_count_op:'≥',
    vip_singin_count_number:'',
    check_ins_count_op:'≥',
    check_ins_count_number:'',
    claim_bonus_account_op:'≥',
    claim_bonus_account_number:''
})
const formDataLevel = ref({
    vip_rank_op:'≥',
    vip_rank_number:'',
    vip_rank_count_op:'≥',
    vip_rank_count_number:'',
    vip_singin_count_op:'≥',
    vip_singin_count_number:'',
    check_ins_count_op:'≥',
    check_ins_count_number:'',
    claim_bonus_account_op:'≥',
    claim_bonus_account_number:''
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

const tab_index=ref(0);
const select_tab = (index:number) => {
    tab_index.value = index;
}

const vip_ranks = ref<Array<string>>(['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'])
</script>

<template>
    <div class="app-container">
        <el-button type="danger" :icon="ArrowLeft" @click="goBack" style="margin-bottom:20px;">返回</el-button>
        <el-col :span="24" :xs="24">
            <div v-if="tab_index == 0" class="search">
                <el-form class="left_position" style="display:flex">
                    <el-form-item label="VIP段位">
                        <el-select v-model="formDataRank.vip_rank" placeholder="请选择VIP段位" clearable>
                            <el-option
                                v-for="item in vip_ranks"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="VIP段位账号数" style="display:flex">
                        <el-select v-model="formDataRank.vip_rank_count_op" style="width: 80px;">
                            <el-option
                                v-for="item in op_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="formDataRank.vip_rank_count_number" placeholder="请输入人数" style="width:200px"/>
                    </el-form-item>

                    <el-form-item label="签到账号数量" style="display:flex">
                        <el-select v-model="formDataRank.vip_singin_count_op" style="width: 80px;">
                            <el-option
                                v-for="item in op_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="formDataRank.vip_singin_count_number" placeholder="请输入人数" style="width:200px"/>
                    </el-form-item>
                </el-form>
                <el-form class="left_position" style="display:flex;justify-content:space-between; padding-right:20px;">
                    <div style="display:flex">
                        <el-form-item label="签到次数" style="display:flex">
                            <el-select v-model="formDataRank.check_ins_count_op" style="width: 80px;">
                                <el-option
                                    v-for="item in op_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="formDataRank.check_ins_count_number" placeholder="请输入次数" style="width:200px"/>
                        </el-form-item>

                        <el-form-item label="领取奖金金额" style="display:flex">
                            <el-select v-model="formDataRank.claim_bonus_account_op" style="width: 80px;">
                                <el-option
                                    v-for="item in op_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="formDataRank.claim_bonus_account_number" placeholder="请输入金数" style="width:200px"/>
                        </el-form-item>
                    </div>
                    <div>
                        <el-button  :icon="Refresh">重置</el-button>
                        <el-button  :icon="Search">查新</el-button>
                    </div>
                </el-form>
            </div>

            <div v-if="tab_index == 1" class="search">
                <el-form class="left_position" style="display:flex">
                    <el-form-item label="VIP段位账号数" style="display:flex">
                        <el-select v-model="formDataLevel.vip_rank_op" style="width: 80px;">
                            <el-option
                                v-for="item in op_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="formDataLevel.vip_rank_number" placeholder="请输入人数" style="width:200px"/>
                    </el-form-item>
                    
                    <el-form-item label="VIP段位账号数" style="display:flex">
                        <el-select v-model="formDataLevel.vip_rank_count_op" style="width: 80px;">
                            <el-option
                                v-for="item in op_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="formDataLevel.vip_rank_count_number" placeholder="请输入人数" style="width:200px"/>
                    </el-form-item>

                    <el-form-item label="签到账号数量" style="display:flex">
                        <el-select v-model="formDataLevel.vip_singin_count_op" style="width: 80px;">
                            <el-option
                                v-for="item in op_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="formDataLevel.vip_singin_count_number" placeholder="请输入人数" style="width:200px"/>
                    </el-form-item>
                </el-form>
                <el-form class="left_position" style="display:flex;justify-content:space-between; padding-right:20px;">
                    <div style="display:flex">
                        <el-form-item label="签到次数" style="display:flex">
                            <el-select v-model="formDataLevel.check_ins_count_op" style="width: 80px;">
                                <el-option
                                    v-for="item in op_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="formDataLevel.check_ins_count_number" placeholder="请输入次数" style="width:200px"/>
                        </el-form-item>

                        <el-form-item label="领取奖金金额" style="display:flex">
                            <el-select v-model="formDataLevel.claim_bonus_account_op" style="width: 80px;">
                                <el-option
                                    v-for="item in op_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="formDataLevel.claim_bonus_account_number" placeholder="请输入金数" style="width:200px"/>
                        </el-form-item>
                    </div>
                    <div>
                        <el-button  :icon="Refresh">重置</el-button>
                        <el-button  :icon="Search">查新</el-button>
                    </div>
                </el-form>
            </div>
            <el-card style="margin-top: 10px;">
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
        </el-col>
        <div style="margin-top:20px; display:flex; justify-content:space-between">
            <div>
                <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)">段位</el-button>
                <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)">等级</el-button>
            </div>
            <div style="display: flex;">
                <div class="data-pane">签到账号数量: 9999999</div>
                <div class="data-pane">签到次数: 9999999</div>
                <div class="data-pane">领取奖励金额: 9999999</div>
            </div>
        </div>
        <div>              
            <el-card :span="24" :xs="24">
                <el-table v-if="tab_index == 0" :data="vip_signin_bonus_rank_statistic_list" style="width: 100%;">
                    <el-table-column label = "VIP段位" align="left" prop="vip_rank">
                    </el-table-column>
                    <el-table-column label = "段位内总账号数量" sortable  align="left" prop="vip_rank_account_count">
                    </el-table-column>
                    <el-table-column label="签到账号数量" sortable  align="left" prop="vip_signin_account_count">
                    </el-table-column>
                    <el-table-column label="签到次数" sortable  align="left" prop="vip_checkin_count">
                    </el-table-column>
                    <el-table-column label="领取奖励金额" sortable  align="left" prop="vip_claim_reward_amount">
                    </el-table-column>
                </el-table>

                <el-table v-if="tab_index == 1" :data="vip_signin_bonus_level_statistic_list" style="width: 100%;">
                    <el-table-column label = "VIP等级"  align="left" prop="vip_level">
                    </el-table-column>
                    <el-table-column label = "等级内总账号数量" sortable  align="left" prop="vip_level_account_count">
                    </el-table-column>
                    <el-table-column label="签到账号数量"  sortable  align="left" prop="vip_signin_account_count">
                    </el-table-column>
                    <el-table-column label="签到次数" sortable  align="left" prop="vip_checkin_count">
                    </el-table-column>
                    <el-table-column label="领取奖励金额" sortable  align="left" prop="vip_claim_reward_amount">
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>

</template>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa !important;
    height: 100px;
}

.data-pane{
    border: 1px solid #666;
    border-radius: 5px;
    padding: 5px 10px;
    margin:0px 5px;
    color: #666;
}
</style>
