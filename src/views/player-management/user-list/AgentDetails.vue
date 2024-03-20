<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';

const router = useRouter();

const goBack = () => {
    router.go(-1);
}

const customerName = ref<string>("UserName10001");

const agentInformation = ref<any>({
    totalNumber: 999,
    rechargeNumber: 999,
    totalRebate: 999,
    totalRechargeAmount: 999,
    totalWithdrawalAmount: 999,
    totalChargeDifference: 999,
    firstLevelAgentNumber: 999,
    withdrawalDifference: 999,
    secondaryAgentNumber: 999,
    secondayWithdrawalDifference: 999,
    thirdLevelAgentNumber: 999,
    thirdWithdrawalDifference: 999,
})

const goPrimaryAgentDetailsPage = () => {
    router.push({name: "Primary Agent Details"})
}

</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>

        <el-card>
            <el-row >
                <el-col :span="8">
                    <el-row>
                        <el-col :span="8" class="betting-record-left-bg">用户名：</el-col>
                        <el-col :span="16" class="betting-record-right-bg">
                            {{ customerName }}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="16">
                </el-col>
            </el-row>
            <el-form style="margin-top: 20px;">
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">代理总人数：</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ agentInformation.totalNumber }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">代理充值人数：</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ agentInformation.rechargeNumber }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">总返佣：</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>$ {{ agentInformation.totalRebate }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">代理总充值金额：</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>$ {{ agentInformation.totalRechargeAmount }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">代理总提现金额:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>$ {{ agentInformation.totalWithdrawalAmount }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">代理总充提差:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>$ {{ agentInformation.totalChargeDifference }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">一级代理人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ agentInformation.firstLevelAgentNumber }}</p>
                        <el-button type="danger" link style="margin-left: auto;" @click="goPrimaryAgentDetailsPage">详情</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">一级代理充提差:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>$ {{ agentInformation.withdrawalDifference }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">二级代理人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ agentInformation.secondaryAgentNumber }}</p>
                        <el-button type="danger" link style="margin-left: auto;" @click="goPrimaryAgentDetailsPage">详情</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">二级代理充提差:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>$ {{ agentInformation.secondayWithdrawalDifference }}</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">三级代理人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>{{ agentInformation.thirdLevelAgentNumber }}</p>
                        <el-button type="danger" link style="margin-left: auto;" @click="goPrimaryAgentDetailsPage">详情</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">三级代理充提差:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <p>$ {{ agentInformation.thirdWithdrawalDifference }}</p>
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


.betting-record-left-bg {
    background-color: #f5f7fa;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 32px;
}

.betting-record-right-bg {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 32px;
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
