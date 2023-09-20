<script setup lang="ts">
import { ref } from "vue";

const activeNames = ref(['1', '2', '3']);











const userRetention = ref({
    first_charge_user: "",
    charge_user_3: "",
    charge_user_7: "",
    charge_user_15: "",
    charge_user_30: "",
})
const agentData = ref({
    actived_agent_number: "",
    new_agent_number: "",
    new_level_agent_registration_number: "",
    new_agent_first_charge_number: "",
    new_level_payment: "",
    agent_level_total_recharge: "",
    agent_level_total_withdrawal: "",
    first_level_agent_deposit_withdrawal_difference: "",
    first_level_agent_per_recharge: "",
    agent_total_commission: "",
    subordinate_recharge_bonus_commission: "",
    affiliate_reward_total_commission: "",
    subordinate_betting_total_commission: "",
    artificial_gold_amount: "",
    successfully_withdraw_amount: "",
})
const agentRetention = ref({
    actived_agent_number_in_7_days: "",
    lost_agent_number_in_30_days: "",
    lost_agency_rate_in_30_days: "",
})
const gameData = ref({
    betting_players: "",
    total_bet_amount: "",
    total_bonus_amount: "",
    total_profit_and_loss: "",
    total_bet_number: "",
    original_game_advantage: "",
    original_game_profit_loss: "",
    slot_game_advantage: "",
    slot_profit_loss: "",
    live_game_advantage: "",
    live_profit_loss: "",
    sport_game_advantage: "",
    sport_profit_loss: "",
})



const depositWithdrawalData = ref({
    recharge_amount: "",
    first_charge_amount: "",
    first_charge_number: "",
    charge_amount: "",
    refill_number: "",
    per_first_charge_amount: "",
    per_recharge_amount: "",
    total_withdrawal_amount: "",
    agent_withdrawal_amount: "",
    player_withdrawal_amount: "",
    total_charge_difference: "",
    deposit_withdrawal_difference: "",
    withdrawal_per_player: "",
    winning_amount: "",
    new_user_of_total_deposit_amount: "",
    new_user_of_average_deposit_amount: "",
})



const userData = ref({
    new_registration: "",
    first_charge_user_number: "",
    payment_conversion_rate: "",
    recharge_user_number: "",
    recharge_actived_user_number: "",
    agent_number: "",
    withdrawal_applied_player_number: "",
    successful_withdrawal_number: "",
    attract_new_player: "",
    new_increased_payment_level: "",
})

const handleChange = () => {

}
</script>

<template>
    <el-card style="margin-top: 10px;">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="充提数据" name="1">
                <template #title>
                    <h2>充提数据</h2>
                </template>
                <el-row :gutter="12" style="justify-content: center;" class="deposit-withdrawal-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>充值金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>首充金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>首充人数</div>
                            <div class="deposit-withdrawal-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>复充金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>复充人数</div>
                            <div class="deposit-withdrawal-text">999999</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="deposit-withdrawal-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>人均首充金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>人均复充金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>提现总金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理提现金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>玩家提现金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="deposit-withdrawal-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>总充提差</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>玩家充提差</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>玩家人均提现</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>领取的彩金金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>新用户首日存款总金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="margin-top: 20px;" class="deposit-withdrawal-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>新用户首日人均存款金额</div>
                            <div class="deposit-withdrawal-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>

            <el-collapse-item title="用户数据分析" name="2">
                <template #title>
                    <h2>用户数据分析</h2>
                </template>
                <el-row :gutter="12" style="justify-content: center;" class="user-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>新增注册</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>新增首充用户数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>新用户付费转换率</div>
                            <div class="user-data-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>复充用户数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>充值活跃用户数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                </el-row>
                
                <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="user-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>申请提现代理数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>申请提现玩家数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>提现成功用户数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>主动拉新玩家数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>拉新增长一级付费数</div>
                            <div class="user-data-text">999999</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="用户留存数据" name="3">
                <template #title>
                    <h2>用户留存数据</h2>
                </template>
                <el-row :gutter="12" style="justify-content: center;" class="user-retention-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>首充用户次留</div>
                            <div class="user-retention-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>首充用户3留</div>
                            <div class="user-retention-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>首充用户7留</div>
                            <div class="user-retention-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>首充用户15留</div>
                            <div class="user-retention-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>首充用户30留</div>
                            <div class="user-retention-text">99.99%</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="代理数据分析" name="4">
                <template #title>
                    <h2>代理数据分析</h2>
                </template>
                <el-row :gutter="12" style="justify-content: center;" class="proxy-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>活跃代理人数</div>
                            <div class="proxy-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>新增代理人数</div>
                            <div class="proxy-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理新增一级注册数</div>
                            <div class="proxy-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理新增一级首充数</div>
                            <div class="proxy-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>人均新增一级付费数</div>
                            <div class="proxy-data-text">999999</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="proxy-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理一级用户总充值</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理一级用户总提款</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理一级用户总充提差</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理一级用户人均充值</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理总佣金</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="proxy-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>下级充值奖励总佣金</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理等级奖励总佣金</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>下级投注总佣金</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理人工加金金额</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>代理成功提现金额</div>
                            <div class="proxy-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="代理留存" name="5">
                <template #title>
                    <h2>代理留存</h2>
                </template>
                <el-row :gutter="12" style="margin-top: 20px;" class="agent-retention-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>近7日活跃代理数</div>
                            <div class="agent-retention-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>近30日流失代理数</div>
                            <div class="agent-retention-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>近30日流失代理率</div>
                            <div class="agent-retention-text">99.99%</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="游戏数据" name="6">
                <template #title>
                    <h2>游戏数据</h2>
                </template>
                <el-row :gutter="12" style="justify-content: center;" class="game-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>下注玩家数</div>
                            <div class="game-data-text">999999</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>总下注金额</div>
                            <div class="game-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>总派奖金额</div>
                            <div class="game-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>总盈亏</div>
                            <div class="game-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>总下注局数</div>
                            <div class="game-data-text">999999</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="justify-content: center; margin-top: 20px;" class="game-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>原创游戏优势</div>
                            <div class="game-data-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>原创游戏盈亏</div>
                            <div class="game-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>SLOT优势</div>
                            <div class="game-data-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>SLOT盈亏</div>
                            <div class="game-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>LIVE优势</div>
                            <div class="game-data-text">99.99%</div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" style="margin-top: 20px;" class="game-data-card">
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>LIVE盈亏</div>
                            <div class="game-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>SPORTS优势</div>
                            <div class="game-data-text">99.99%</div>
                        </el-card>
                    </el-col>
                    <el-col :span="4">
                        <el-card shadow="always">
                            <div>SPORTS盈亏</div>
                            <div class="game-data-text">$9999999.99</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>

<style lang="scss" scoped>
.el-col-4 {
    max-width: 20%;
    flex: 0 0 20%;
}

.deposit-withdrawal-card {
    .el-card {
        border: none !important;
        background-color: #E4E4E4 !important;

        .el-card__body {
            .deposit-withdrawal-text {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}

.user-data-card {
    .el-card {
        border: none !important;
        background-color: #66FF99 !important;

        .el-card__body {
            .user-data-text {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}

.user-retention-card {
    .el-card {
        border: none !important;
        background-color: #E4E4E4 !important;

        .el-card__body {
            .user-retention-text {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}

.proxy-data-card {
    .el-card {
        border: none !important;
        background-color: #66FF99 !important;

        .el-card__body {
            .proxy-data-text {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}

.agent-retention-card {
    .el-card {
        border: none !important;
        background-color: #E4E4E4 !important;

        .el-card__body {
            .agent-retention-text {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}

.game-data-card {
    .el-card {
        border: none !important;
        background-color: #66FF99 !important;

        .el-card__body {
            .game-data-text {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}
</style>