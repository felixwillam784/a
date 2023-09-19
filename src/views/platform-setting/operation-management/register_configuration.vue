<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeButton = ref<number>(1);
const activeNames = ref(['1', '2', '3', '4']);
const subActiveNames = ref(['1', '2', '3', '4']);
const vipBonusHeight = ref(0);
const vipBonusShow = ref<boolean>(false);

const bankList = ref([
    {
        content: "Facebook登录开关",
        description: "",
        value: false,
    },
    {
        content: "找回密码设置",
        description: "",
        value: false,
    },
    {
        content: "限制同一个IP注册会员数量",
        description: "同一个IP注册用户数 (0表示不限制)",
        value: 0,
    },
    {
        content: "限制同一个设备注册会员数量",
        description: "同一个设备注册用户数 (0表示不限制)",
        value: 0,
    },
    {
        content: "注册赠送",
        description: "注册账号赠送的金币, 注意, 这个钱可直接体现",
        value: 0,
    },
    {
        content: "短信验证码开关",
        description: "",
        value: false,
    },
    {
        content: "注册绑定CPF",
        description: "开启后, 注册成功必须绑定CPF才能进入大厅",
        value: true,
    },
    {
        content: "注册绑定邮箱",
        description: "开启后, 注册成功必须绑定邮箱才能进入大厅",
        value: false,
    },
    {
        content: "开启图形验证码",
        description: "开启后, 登录客户端需要进行图像验证",
        value: false,
    },
    {
        content: "注册方式选择",
        description: "选择可以用于注册的方式",
        value: [true, true],
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
                        <el-input v-if="typeof(scope.row.value) == 'number'" v-model="scope.row.value" placeholder="" style = "width: 120px;" />
                        <el-switch
                            v-if="typeof(scope.row.value) == 'boolean'"
                            v-model="scope.row.value"
                            inline-prompt
                            active-text="开启"
                            inactive-text="关闭"
                            size="large"
                        />
                        <template v-if="typeof(scope.row.value) == 'object'">
                            <el-checkbox label="手机号注册" v-model="scope.row.value[0]" size="large"></el-checkbox>
                            <el-checkbox label="邮箱注册" v-model="scope.row.value[1]" size="large"></el-checkbox>
                        </template>
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
