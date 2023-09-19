<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeButton = ref<number>(2);
const activeNames = ref(['1', '2', '3', '4']);
const subActiveNames = ref(['1', '2', '3', '4']);
const vipBonusHeight = ref(0);
const vipBonusShow = ref<boolean>(false);

const bankList = ref([
    {
        content: "每日IP限制条数",
        description: "每天每个IP发送短信显示条数",
        value: 10,
    },
    {
        content: "每日设备发放条数",
        description: "每天每个设备发送短信显示条数",
        value: 10,
    },
    {
        content: "短信有效期",
        description: "每条短信有效分钟",
        value: 180,
    },

])

const pixList = ref([
]);

const walletList = ref([
]);

const mexList = ref([
]);

const loading = ref<boolean>(false);

const goBack = () => {
    router.push({ name: "User List" });
}

const handleChange = () => {

}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

const moreVipBonusShow = () => {
    vipBonusShow.value = !vipBonusShow.value;
    vipBonusHeight.value = vipBonusShow.value ? 150 : 0;
}
</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <div >
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'Basic Configuration')">基础配置</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'Register Configuration')">注册配置</el-button>
                <el-button :type="activeButton == 2 ? 'warning' : ''"
                    @click="handleButtonActive(2, 'SMS Configuration')">短信配置</el-button>
                <el-button :type="activeButton == 3 ? 'warning' : ''"
                    @click="handleButtonActive(3, 'Operational Configuration')">运营配置</el-button>
                <el-button :type="activeButton == 4 ? 'warning' : ''"
                    @click="handleButtonActive(4, 'Maintenance Announcement')">维护公告</el-button>
                <el-button :type="activeButton == 5 ? 'warning' : ''"
                    @click="handleButtonActive(5, 'Agency Management')">代理管理</el-button>
            </div>
        </div>
        <el-card class="config-table">
            <el-table v-loading="loading" :data="bankList" style="width: 100%;">
                <el-table-column label="设置内容" align="left" prop="content" />
                <el-table-column label="设置内容说明" align="left" prop="description" />
                <el-table-column label="设置参数值" align="left" prop="value">
                    <template #default="scope">
                        <el-input v-model="scope.row.value" placeholder="" style = "width: 120px;" />
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
}

:deep(.el-form-item__label) {
    font-size: 16px !important;
    font-weight: bold !important;
}

:deep(.el-table thead th.el-table__cell) {
    background: #f5f7fa;
    height: 60px;
}

.vip-bonus-collapse {
    // transition: height 0.3s ease-out;
    display: none;
}

.vip-bonus-show {
    // transition: height 0.3s ease-out;
    display: block;
}
</style>
