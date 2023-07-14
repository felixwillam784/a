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

const agentConfiguration = ref<any>({
    fist_level_number: 100,
    second_level_number: "",
    third_level_number: 100,
})

const ipConfiguration = ref({
    warning_number: 10
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
                    <h2>刷代理佣金风控配置</h2>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">一级代理预警人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="agentConfiguration.fist_level_number" placeholder="请输入需要设置的一级代理预警人数"/>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">二级代理预警人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="agentConfiguration.second_level_number" placeholder="请输入需要设置的二级代理预警人数"/>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">三级代理预警人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="agentConfiguration.third_level_number" placeholder="请输入需要设置的三级代理预警人数"/>
                    </el-col>
                </el-row>
                <el-row>
                    <h2>IP风控设置</h2>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">同IP下注预警人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="ipConfiguration.warning_number" placeholder="请输入需要设置的同IP下注预警人数"/>
                    </el-col>
                </el-row>
                <el-row style="justify-content: center; margin-top: 20px;">
                    <el-button type="primary">确认设置</el-button>
                    <el-button>取消设置</el-button>
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
