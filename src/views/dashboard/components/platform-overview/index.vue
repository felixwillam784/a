<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { platformOverviewApi } from '@/api/dashboard';
import useStore from '@/store';
import { useRouter, useRoute } from 'vue-router';

const { user } = useStore();
const router = useRouter();

const platformOverview = ref({
    platform_balance: "",
    total_recharge_amount: "",
    total_withdrawal_amount: "",
    charge_withdrawal_difference: "",
    withdrawal_fee: "",
    total_withdrawal: "",
    bonus_amount: "",
    registration_number: "",
    depositor_number: "",
    lifting_ratio: "",
    agent_number: "",
    total_recharge_number: "",
    total_acive_user_number: "",
    new_player_number: "",
    recharge_code_rate: "",
})


onMounted(() => {
    platformOverviewApi(user.token).then((res:any)=>{
        platformOverview.value  = res.data.data;
    }).catch(()=>{
        localStorage.clear();
        user.token = '';
        router.push({ name: "Login" });
    });
    
});

</script>

<template>
    <el-card style="margin-top: 10px;">
        <h2>平台总览</h2>
        <el-row :gutter="12" style="justify-content: center;" class="platform-card">
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台余额</div>
                    <div class="platform-text">${{platformOverview.platform_balance}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总充值金额</div>
                    <div class="platform-text">${{platformOverview.total_recharge_amount}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总提现金额</div>
                    <div class="platform-text">${{platformOverview.total_withdrawal_amount}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总充提差</div>
                    <div class="platform-text">${{platformOverview.charge_withdrawal_difference}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总提现收费</div>
                    <div class="platform-text">${{platformOverview.withdrawal_fee}}</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="platform-card">
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台代理总提现</div>
                    <div class="platform-text">${{platformOverview.total_withdrawal}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>彩金总金额</div>
                    <div class="platform-text">${{platformOverview.bonus_amount}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总注册数</div>
                    <div class="platform-text">{{platformOverview.registration_number}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总充值人数</div>
                    <div class="platform-text">{{platformOverview.depositor_number}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>充提比</div>
                    <div class="platform-text">{{platformOverview.lifting_ratio}}</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 20px;" class="platform-card">
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总代理数</div>
                    <div class="platform-text">{{platformOverview.agent_number}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总复充人数</div>
                    <div class="platform-text">{{platformOverview.total_recharge_number}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总活跃人数</div>
                    <div class="platform-text">{{platformOverview.total_acive_user_number}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总拉新玩家数</div>
                    <div class="platform-text">{{platformOverview.new_player_number}}</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台充值打码率</div>
                    <div class="platform-text">×{{platformOverview.recharge_code_rate}}</div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.el-col-4 {
    max-width: 20%;
    flex: 0 0 20%;
}

.platform-card {
    .el-card {
        border: none !important;
        background-color: #E4E4E4 !important;

        .el-card__body {
            .platform-text {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}
</style>