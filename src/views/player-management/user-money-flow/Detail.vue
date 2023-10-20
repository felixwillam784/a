<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import useStore from '@/store';

import {getUserMoneyFlowDetail} from '@/api/Players'

import {useRoute} from 'vue-router';

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const goBack = () => {
    router.go(-1);
}

const userFlowInformation = ref<any>({
    customer_account: "test77@gmail.com",
    customer_name: "UserName10001",
    id: "8e8fd8fsdfd8fe8f8df8ef",
    flow_amount: 999,
    flow_type: "下注",
    game_name: "test",
    game_issue_number: 999999999999,
    bet_amount: 999,
    betting_odds: 0.99,
    game_result: -999,
    event_name: "",
    flow_channel: "Self",
    handling_fee: 999,
    flow_time: "2023-07-12 09-10-11",
})

onMounted(async ()=>{
    let res = await getUserMoneyFlowDetail(user.token, route.params.id);
    userFlowInformation.value = res.data.data;
    console.log(res.data.data);
})
</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>

        <el-card>
            <el-form style="margin-top: 20px;">
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">用户账号:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.customer_account }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">用户名:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.customer_name }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">用户ID:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.id }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">流水金额:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p v-if="userFlowInformation.flow_amount > 0">
                            ${{ userFlowInformation.flow_amount }}
                        </p>
                        <p v-else>
                            -${{ userFlowInformation.flow_amount }}
                        </p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">流水类型:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.flow_type }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">游戏名称:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.game_name }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">游戏期号:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.game_issue_number }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">下注金额:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>${{ userFlowInformation.bet_amount }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">下注赔率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.betting_odds }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">游戏结果:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p v-if="userFlowInformation.game_result > 0">
                            ${{ userFlowInformation.game_result }}
                        </p>
                        <p v-else>
                            -${{ Math.abs(userFlowInformation.game_result) }}
                        </p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">活动名称:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.event_name }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">流水渠道:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.flow_channel }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">手续费:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>${{ userFlowInformation.handling_fee }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">流水时间:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ userFlowInformation.flow_time }}</p>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}

.detail-item-left-bg {
    background-color: #f5f7fa;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 36px;
}

.detail-item-right-bg {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 36px;
}
</style>
