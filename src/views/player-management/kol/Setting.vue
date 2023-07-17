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

const kolConfiguration = ref<any>({
    new_recruit_number: 10,
    ordinary_agent_rebate_rate_1: 100,
    ordinary_agent_rebate_rate_2: 100,
    ordinary_agent_rebate_rate_3: 100,
    a_level_agent_rebate_rate_1: 100,
    a_level_agent_rebate_rate_2: 90,
    a_level_agent_rebate_rate_3: 80,
    b_level_agent_rebate_rate_1: 90,
    b_level_agent_rebate_rate_2: 80,
    b_level_agent_rebate_rate_3: 70,
    c_level_agent_rebate_rate_1: 80,
    c_level_agent_rebate_rate_2: 65,
    c_level_agent_rebate_rate_3: 50,
    d_level_agent_rebate_rate_1: 70,
    d_level_agent_rebate_rate_2: 50,
    d_level_agent_rebate_rate_3: 30,
})

const formatPercentage = (value: string) => {
    if (value === null || value === '') {
        return '';
    }
    return `${value}%`;
}
const parsePercentage = (value: string) => {
    const strippedValue = value.replace('%', '');
    const parsedValue = parseFloat(strippedValue);
    if (isNaN(parsedValue)) {
        return null;
    }
    return parsedValue;
}
</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>

        <el-card>
            <el-form style="margin-top: 20px;">
                <el-row>
                    <h2>人数设定</h2>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">每周需基础拉新人数:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.new_recruit_number" placeholder="请输入需要设置的每周需基础拉新人数" />
                    </el-col>
                </el-row>
                <el-row>
                    <h2>评级返佣设定</h2>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">普通级一级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.ordinary_agent_rebate_rate_1" placeholder="请输入需要设置的普通级一级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">普通级二级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.ordinary_agent_rebate_rate_2" placeholder="请输入需要设置的普通级二级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">普通级三级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.ordinary_agent_rebate_rate_3" placeholder="请输入需要设置的普通级三级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">A级一级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.a_level_agent_rebate_rate_1" placeholder="请输入需要设置的A级一级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">A级二级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.a_level_agent_rebate_rate_2" placeholder="请输入需要设置的A级二级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">A级三级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.a_level_agent_rebate_rate_3" placeholder="请输入需要设置的A级三级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">B级一级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.b_level_agent_rebate_rate_1" placeholder="请输入需要设置的B级一级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">B级二级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.b_level_agent_rebate_rate_2" placeholder="请输入需要设置的B级二级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">B级三级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.b_level_agent_rebate_rate_3" placeholder="请输入需要设置的B级三级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">C级一级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.c_level_agent_rebate_rate_1" placeholder="请输入需要设置的C级一级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">C级二级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.c_level_agent_rebate_rate_2" placeholder="请输入需要设置的C级二级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">C级三级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.c_level_agent_rebate_rate_3" placeholder="请输入需要设置的C级三级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">D级一级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.d_level_agent_rebate_rate_1" placeholder="请输入需要设置的D级一级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">D级二级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.d_level_agent_rebate_rate_2" placeholder="请输入需要设置的D级二级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="detail-item-left-bg">D级三级代理返佣比率:</el-col>
                    <el-col :span="18" class="detail-item-right-bg">
                        <el-input v-model="kolConfiguration.d_level_agent_rebate_rate_3" placeholder="请输入需要设置的D级三级代理返佣比率"
                            :formatter="formatPercentage" :parser="parsePercentage" />
                    </el-col>
                </el-row>
                <el-row style="justify-content: center; margin-top: 20px;">
                    <el-col :span="8" style="text-align: left;">
                        <el-button type="primary">关闭暗扣</el-button>
                    </el-col>
                    <el-col :span="16" style="text-align: right;">
                        <el-button type="primary">保存修改</el-button>
                        <el-button>取消修改</el-button>
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
