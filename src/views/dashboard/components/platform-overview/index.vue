<script setup lang="ts">
import { ref } from 'vue';

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
    new_player_number: "",
    recharge_code_rate: "",
})
</script>

<template>
    <el-card>
        <h2>平台总览</h2>
        <el-row :gutter="12" style="justify-content: center;" class="platform-card">
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台余额</div>
                    <div class="platform-text">$9999999.99</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总充值金额</div>
                    <div class="platform-text">$9999999.99</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总提现金额</div>
                    <div class="platform-text">$9999999.99</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总充提差</div>
                    <div class="platform-text">$9999999.99</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总提现收费</div>
                    <div class="platform-text">$9999999.99</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="platform-card">
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台代理总提现</div>
                    <div class="platform-text">$9999999.99</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>彩金总金额</div>
                    <div class="platform-text">$9999999.99</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总注册数</div>
                    <div class="platform-text">999999</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总充值人数</div>
                    <div class="platform-text">999999</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>重提比</div>
                    <div class="platform-text">1 : 0.8</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 20px;" class="platform-card">
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总代理数</div>
                    <div class="platform-text">999999</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台总拉新玩家数</div>
                    <div class="platform-text">999999</div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card shadow="always">
                    <div>平台充值打码率</div>
                    <div class="platform-text">×15.8</div>
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