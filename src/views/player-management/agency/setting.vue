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
    ratio1:"",
    ratio2:"",
    ratio3:""
})
const formData = ref<any>({
    user_account: "",
})
const userAccountList = ref<Array<any>>([
    {
        type:"一级代理",
        ratio:3.0
    },
    {
        type:"二级代理",
        ratio:1.5
    },
    {
        type:"三级代理",
        ratio:0.5
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
    editData.value.ratio1 = userAccountList.value[0].ratio;
    editData.value.ratio2 = userAccountList.value[1].ratio;
    editData.value.ratio3 = userAccountList.value[2].ratio;
}
</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <div style="margin-right: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive(0, 'AgencyDetail')">代理详情</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive(1, 'AgencySetting')">代理设置</el-button>
            </div>
        </div>
        <el-card>
            <el-table v-loading="loading" :data="userAccountList" style="width: 100%;">
                <el-table-column label="类型" align="center" prop="type"/>
                <el-table-column label="返利比例" align="center" prop="ratio">
                    <template #default="scope">
                        {{scope.row.ratio}}%
                    </template>
                </el-table-column>
                <el-table-column align="center">
                    <template #default="scope">
                        <el-button type="primary" link @click="showEditDialog()">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog title="代理修改" v-model="editDialogShow" width="500px" append-to-body align-center>
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">一级代理</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.ratio1" style="pediting: 0;"></el-input> </el-col>
           </el-row> 
            <el-row>
                <el-col :span="6" class="edit-item-left-bg">二级代理</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.ratio2"  style="pediting: 0;"></el-input> </el-col>
           </el-row> 
            <el-row>
                <el-col :span="6" class="edit-item-left-bg">三级代理</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.ratio3" style="pediting: 0;"></el-input> </el-col>
           </el-row> 
           
           <el-row style="margin-top: 50%;">
                <div>备注</div>
                <el-input :rows="5" type="textarea" v-model="editData.comment"></el-input>
           </el-row>
           <template #footer>
                <el-button type="primary">确认修改</el-button>
                <el-button @click="closeeditDialog">取消修改</el-button>
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
