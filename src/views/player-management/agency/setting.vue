<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import {getAgentSettinglist, updateAgentRealtionSetting} from '@/api/Players'
import useStore from '@/store';
import {useRoute} from 'vue-router';
import { fa } from 'element-plus/es/locale';
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();

const activeButton = ref<number>(1);

const loading = ref<boolean>(false);
const editDialogShow = ref<boolean>(false);
const editData = ref<any>({
    ratio1:0,
    ratio2:0,
    ratio3:0,
})
const formData = ref<any>({
    user_account: "",
})
const types = ["一级代理", "二级代理", "三级代理"];
const userAccountList = ref<Array<any>>([

])
const handleChange = () => {

}

const handleButtonActive = (index: number, name: string) => {
    activeButton.value = index;
    router.push({ name: name });
}

onMounted(()=>{
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    });
})

const getData = async () =>{
    let res = await getAgentSettinglist(user.token);
    userAccountList.value = res.data.data;
}

const showEditDialog = () => {
    editDialogShow.value = true;
    editData.value.ratio1 = parseFloat(userAccountList.value[0].ratio);
    editData.value.ratio2 = parseFloat(userAccountList.value[1].ratio);
    editData.value.ratio3 = parseFloat(userAccountList.value[2].ratio);
}

const handleQuery = () =>{
    loading.value = true;
    getData().then(()=>{
        loading.value = false;
    });
}

const updateRelationSetting = () =>{
    let edited = userAccountList.value;
    edited[0].ratio = editData.value.ratio1;
    edited[1].ratio = editData.value.ratio2;
    edited[2].ratio = editData.value.ratio3;
    updateAgentRealtionSetting(user.token, edited);
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
                <el-table-column label="类型" align="center" prop="type">
                    <template #default="scope">
                        {{types[scope.row.type - 1]}}
                    </template>
                </el-table-column>
                <el-table-column label="返利比例" align="center" prop="ratio">
                    <template #default="scope">
                        {{scope.row.ratio}}%
                    </template>
                </el-table-column>
                <el-table-column align="center">
                    <template #default>
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
                <el-button type="primary" @click="updateRelationSetting">确认修改</el-button>
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
