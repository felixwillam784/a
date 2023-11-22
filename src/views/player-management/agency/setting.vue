<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import {getUserDetailTable, getUserDetailApi, getUserDetailDepositWithdrawl, getUserDetailAgent} from '@/api/Players'
import useStore from '@/store';
import {useRoute} from 'vue-router';
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(1);

const loading = ref<boolean>(false);
const editDialogShow = ref<boolean>(false);
const editData = ref<any>({
    account: "",
    comment: "",
})
const formData = ref<any>({
    user_account: "",
})
const userAccountList = ref<Array<any>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        customer_account: "test77@gmail.com",
        customer_name: "UserName10001",
        customer_label: "用户备注",
        flow_amount: -999,
        flow_type: "下注",
        flow_time: "2023-07-12 10:23:24",
    },
])
const handleChange = () => {

}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

onMounted(()=>{
    getData();
})

const getData = async () =>{
}

const showEditDialog = () => {
    editDialogShow.value = true;
}
</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <div style="margin-right: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'AgencyDetail')">用户详情</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'AgencySetting')">资金明细</el-button>
            </div>
        </div>
        <el-card>
            <el-table v-loading="loading" :data="userAccountList" style="width: 100%;">
                <el-table-column label="用户ID" align="center" prop="id" width="200" />
                <el-table-column label="用户账号" align="center" prop="customer_account" width="200" />
                <el-table-column align="center">
                    <template #default="scope">
                        <el-button type="danger" link @click="showEditDialog()">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog title="编辑用户" v-model="editDialogShow" width="500px" append-to-body align-center>
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">账号</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.account" placeholder="请输入账号" style="pediting: 0;"></el-input> </el-col>
           </el-row> 
            <el-row>
                <el-col :span="6" class="edit-item-left-bg">账号</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.account" placeholder="请输入账号" style="pediting: 0;"></el-input> </el-col>
           </el-row> 
            <el-row>
                <el-col :span="6" class="edit-item-left-bg">账号</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.account" placeholder="请输入账号" style="pediting: 0;"></el-input> </el-col>
           </el-row> 
           
           <el-row style="margin-top: 50%;">
                <div>备注</div>
                <el-input :rows="5" type="textarea" v-model="editData.comment"></el-input>
           </el-row>
           <template #footer>
                <el-button type="primary">确认新增</el-button>
                <el-button @click="closeeditDialog">取消新增</el-button>
           </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}

:deep(.el-form-item__label) {
    font-size: 16px !important;
    font-weight: bold !important;
}

:deep(.el-table thead th.el-table__cell) {
    background: #f5f7fa;
    height: 60px;
}

.add-item-left-bg {
    background-color: #f5f7fa;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 36px;
}

.add-item-right-bg {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 0px;
    height: 36px;
}
.edit-item-left-bg {
    background-color: #f5f7fa;
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 36px;
}

.edit-item-right-bg {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    padding: 0px 0px;
    height: 36px;
}
.el-table thead th.el-table__cell {
    background: #f5f7fa !important;
    height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
    height: 80px;
}
</style>
