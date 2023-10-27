<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";

import useStore from '@/store';
import {useRoute} from 'vue-router';
import {updateRebateConfiguration} from '@/api/event-management'
//import { watch } from "fs";

const route = useRoute();
const { user } = useStore();
const router = useRouter();



const handleQuery = () => {
    if(formData.value.remark.length > 0)
        updateRebateConfiguration(user.token, formData.value);
}

const resetQuery = () => {

}
onMounted(()=>{
    const dataString = route.params.data.toString();
    formData.value = JSON.parse(dataString);

})
const goBack = () => {
    router.push({ name: "Rebate Configuration" });
}
const formData = ref<any>({
    method_id: "",
    method_name: "",
    method_description: "",
    fund_type: "",
    code_magnification: "",
    failure_value: "",
    fixed_value: "",
    time_limit: "",
    remark: "",
})

</script>

<template>
    <div class="app-container">

        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>

        <el-card style="margin-top: 10px;">
            <el-row>
                <el-col :span="6" class="edit-item-left-bg">方案ID</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.method_id" placeholder="请输入账号" style="pediting: 0;" disabled> </el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">方案名称</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.method_name" placeholder="请输入方案名称" style="pediting: 0;"></el-input> </el-col>
           </el-row>            
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">方案描述</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.method_description" placeholder="请输入方案描述" style="pediting: 0;" ></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">资金类型</el-col>
                <el-col :span="18" class="edit-item-right-bg">                   
                    <el-select v-model="formData.fund_type" placeholder="请选择资金类型" style="width: 100%;">
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="edit-item-left-bg">打码倍率</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.code_magnification" placeholder="请输入打码倍率，0表示不需要打码即可提现" style="pediting: 0;" ></el-input> </el-col>
           </el-row>            
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">打码失败条件值</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.failure_value" placeholder="请输入条件失败条件值，0%表示不会提前结束打码" style="pediting: 0;" ></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">打码任务固定经验</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.fixed_value" placeholder="请输入固定经验，0表示根据打码量计算经验" style="pediting: 0;" ></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">打码任务时效</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.time_limit" placeholder="请输入活动持续天数，0表示长期有效" style="pediting: 0;" ></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">修改备注<span style="color:red;">*</span></el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="formData.remark" placeholder="请输入修改原因" style="pediting: 0;" ></el-input> </el-col>
           </el-row> 
           <el-row style="margin:20px 0px; float:right">
                <el-button type="primary" @click="handleQuery">确定修改</el-button>
                <el-button @click="goBack">取消修改</el-button>
           </el-row>
           
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}
</style>

<style lang="scss">
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
</style>
