<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";

import useStore from '@/store';
import {useRoute} from 'vue-router';
import {getUserBettingRecordDetail} from '@/api/Players'
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(8);

const formData = ref<any>({
    dateRange: [
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    ],
    game: "",
    winning_odds: "",
    min_amount: 0,
    max_amount: 0,
    winning_min_amount:0,
    winning_max_amount: 0,
})

const gameOptions = [
  {
    value: '1',
    label: '全部',
  },
]
const loading = ref<boolean>(false);
const disabled = ref<boolean>(false);
const bettingRecordList = ref([
    {
        game: "DICE",
        period: 47311717773882,
        win_lose: "WIN",
        bet_amount: 999.99,
        winning_amount: 999.99,
        settlement_amount: 999.99,
        cost: 0,
        cash_out: "__",
        result: "__",
        magnification: 1.985,
        betting_time: "2023-07-02 23:00:00",
        settlement_time: "2023-07-02 23:00:00",
    },
])
const totalData = ref<any>({
    bonus: "99999.99",
    code_amount: "99999.99",
    game_round: "99999.99",
    revenue_rate: "-0.52777"
})
const handleQuery = () => {
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    });
}

const resetQuery = () => {
    formData.value = {
        dateRange: [
            moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
            moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
        ],
        game: "",
        winning_odds: "",
        min_amount: 0,
        max_amount: 0,
        winning_min_amount:0,
        winning_max_amount: 0,
    };
}
onMounted(()=>{
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    }).catch(()=>{
    localStorage.clear();
    router.push({ name: "Login" });
    user.token = '';
  });
})

const getData = async () =>{
    let temp = await getUserBettingRecordDetail(user.token, route.params.id, formData.value);
    bettingRecordList.value = temp.data.data.table_data;
    totalData.value = temp.data.data.total_data;
}
const goBack = () => {
    router.push({ name: "User List" });
}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name, params:{id:route.params.id}});
}

</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
            <div style="margin-left: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'UserDetail')">用户详情</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'FundingDetails')">资金明细</el-button>
                <el-button :type="activeButton == 2 ? 'warning' : ''"
                    @click="handleButtonActive(2, 'AgentRebate')">代理返利</el-button>
                <el-button :type="activeButton == 3 ? 'warning' : ''"
                    @click="handleButtonActive(3, 'PromotionRecord')">推广记录</el-button>
                <el-button :type="activeButton == 4 ? 'warning' : ''"
                    @click="handleButtonActive(4, 'RechargeRecord')">充值记录</el-button>
                <el-button :type="activeButton == 5 ? 'warning' : ''"
                    @click="handleButtonActive(5, 'WithdrawalRecord')">提现记录</el-button>
                <el-button :type="activeButton == 6 ? 'warning' : ''"
                    @click="handleButtonActive(6, 'ManualDeduction')">人工扣款</el-button>
                <el-button :type="activeButton == 7 ? 'warning' : ''"
                    @click="handleButtonActive(7, 'ManualRecharge')">人工充值</el-button>
                <el-button :type="activeButton == 8 ? 'warning' : ''"
                    @click="handleButtonActive(8, 'BettingRecord')">投注记录</el-button>
                <el-button :type="activeButton == 9 ? 'warning' : ''"
                    @click="handleButtonActive(9, 'RegistrationRecord')">登录记录</el-button>
            </div>
        </div>

        <el-card>
            <el-form :model="formData" :inline="true" label-width="120">
                <el-form-item label="选择时间:">
                    <el-date-picker type="daterange" v-model="formData.dateRange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="游戏:">
                    <el-select v-model="formData.game">
                        <el-option v-for="item in gameOptions" :key="item.value" :label="item.label" :value="item.value"/>                    </el-select>
                </el-form-item>
                <el-form-item label="中奖倍率:大于">
                    <el-input v-model="formData.winning_odds" placeholder="请输入中奖倍率"/>
                </el-form-item>
            </el-form>
            <el-form :model="formData" :inline="true" label-width="120">
                <el-form-item label="金额范围:">
                    <el-input v-model="formData.min_amount" placeholder="最小金额"></el-input>
                    <font style="margin: 0px 6px;">至</font>
                    <el-input v-model="formData.max_amount" placeholder="最大金额"></el-input>
                </el-form-item>
                <el-form-item label="中奖金额:">
                    <el-input v-model="formData.winning_min_amount" placeholder="最小金额"></el-input>
                    <font style="margin: 0px 6px;">至</font>
                    <el-input v-model="formData.winning_max_amount" placeholder="最大金额"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
                    <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 10px;">
            <div style="display: flex;">
                <div style="border: 1px solid red; margin-left: auto; padding: 10px 20px; background: #ffccff;">
                    <span style="color: red">游戏局数:</span>
                    <span style="color: red; margin-left: 10px;">{{totalData.bonus}}</span>
                </div>
                <div style="border: 1px solid red; margin-left: 10px; padding: 10px 20px; background: #ffccff;">
                    <span style="color: red">打码量:</span>
                    <span style="color: red; margin-left: 10px;">{{totalData.code_amount}}</span>
                </div>
                <div style="border: 1px solid red; margin-left: 10px; padding: 10px 20px; background: #fff7e6;">
                    <span style="color: red">派奖:</span>
                    <span style="color: red; margin-left: 10px;">{{totalData.game_round}}</span>
                </div>
                <div style="border: 1px solid red; margin-left: 10px; padding: 10px 20px; background: #fff7e6;">
                    <span style="color: red">庄家优势:</span>
                    <span style="color: red; margin-left: 10px;">{{totalData.revenue_rate}}</span>
                </div>
            </div>

            <el-table v-loading="loading"  :data="bettingRecordList" style="width: 100%; margin-top: 10px; height: 535px; overflow: auto;">

                <el-table-column label="游戏" align="center" prop="game" />
                <el-table-column label="期数" align="center" prop="period" width="160"/>
                <el-table-column label="输赢" align="center" prop="win_lose">
                    <template #default="scope">
                        <p>{{ scope.row.win_lose }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="投注金额" align="center" prop="bet_amount">
                    <template #default="scope">
                        <p>{{ scope.row.bet_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="中奖金额" align="center" prop="winning_amount">
                    <template #default="scope">
                        <p>{{ scope.row.winning_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="结算金额" align="center" prop="settlement_amount">
                    <template #default="scope">
                        <p>{{ scope.row.settlement_amount }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="费用" align="center" prop="cost">
                    <template #default="scope">
                        <p>{{ scope.row.cost }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="Cashout" align="center" prop="cash_out">
                    <template #default="scope">
                        <p>{{ scope.row.cash_out }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="结果" align="center" prop="result">
                    <template #default="scope">
                        <p>{{ scope.row.result }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="倍率" align="center" prop="magnification">
                    <template #default="scope">
                        <p>{{ scope.row.magnification }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="投注时间" align="center" prop="betting_time" width="200">
                    <template #default="scope">
                        <p>{{ scope.row.betting_time }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="结算时间" align="center" prop="settlement_time" width="200">
                    <template #default="scope">
                        <p>{{ scope.row.settlement_time }}</p>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}
</style>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa;
    height: 80px;
}
</style>
