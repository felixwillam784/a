<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Upload, Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

interface GetAdminData {
    role_account: string,
    role_user: string,
    role_level: string,
    role_type: string,
    role_name: string,
    role_status: boolean,
}

const router = useRouter();

const formData = ref<any>({
    role_account: "",
    role_level: "",
    user:"",
    pageNum: 1,
    pageSize: 20,
})

const total = ref<number>(4);
const loading = ref<boolean>(false);
const adminList = ref<Array<GetAdminData>>([
    {
        role_account: "admin_A",
        role_user: "admin_A",
        role_level: "M1",
        role_type: "senior director",
        role_name: "高级总监",
        role_status: true,
    },
    {
        role_account: "admin_B",
        role_user: "admin_B",
        role_level: "M2",
        role_type: "director",
        role_name: "总监",
        role_status: false,
    },
    {
        role_account: "admin_C",
        role_user: "admin_C",
        role_level: "P1",
        role_type: "Manager",
        role_name: "经理",
        role_status: true,
    },
    {
        role_account: "admin_D",
        role_user: "admin_D",
        role_level: "P2",
        role_type: "supervisors",
        role_name: "主管",
        role_status: true,
    },
])
const handleQuery = () => {
}

const addDialogShow = ref<boolean>(false);
const handleAdd = () =>{
    addDialogShow.value=true;
}
const addData = ref<any>({
    account:"",
    password:"",
    user:"",
    group_id:"",
    group_type:"",
    group_name:"",
    comment:"",

})
const closeAddDialog = ()=>{
    addDialogShow.value=false;
}
const groupIdOptions = ref<Array<any>>([
    {
        label: "M1",
        value: "M1"
    }
])

const editDialogShow = ref<boolean>(false);
const handleedit = (item:GetAdminData) =>{
    editData.value.account = item.role_account;
    editData.value.user = item.role_user;
    editDialogShow.value=true;
}
const editData = ref<any>({
    account:"",
    password:"",
    user:"",
    group_id:"M1",
    group_type:"",
    group_name:"",
    comment:"",

})
const closeeditDialog = ()=>{
    editDialogShow.value=false;
}

</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">

                <div class="search">
                    <el-form ref="formDataRef" :model="formData" :inline="true" label-width="120">
                        <el-form-item label="角色账号" prop="role_account">
                            <el-input v-model="formData.role_account" placeholder="请输入角色账号" clearable />
                        </el-form-item>
                        <el-form-item label="角色级别" prop="role_level">
                            <el-input v-model="formData.role_level" placeholder="请输入角色级别" clearable />
                        </el-form-item>
                        <el-form-item label="使用者" prop="user">
                            <el-input v-model="formData.user" placeholder="请输入用户使用者" clearable />
                        </el-form-item>
                        <el-form-item style="float:right">
                            <el-button type="primary" @click="handleAdd">新增角色</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-card>
                    <el-table v-loading="loading" :data="adminList" style="width: 100%;">
                        <el-table-column label="角色账号" align="center" prop="role_account"/>
                        <el-table-column label="角色使用者" align="center" prop="role_user"/>
                        <el-table-column label="角色级别" width="140" align="center" prop="role_level" />
                        <el-table-column label="角色类型" width="140" align="center" prop="role_type" />
                        <el-table-column label="角色名称" align="center" prop="role_name"></el-table-column>
                        <el-table-column label="角色状态" align="center" prop="role_status">
                            <template #default="scope">
                                <p v-if="scope.row.role_status" style="color:green">启用</p>
                                <p v-else style="color:red">禁用</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" fixed="right">
                            <template #default="scope">
                                <el-button type="primary" link @click="handleedit(scope.row)">编辑</el-button>
                                <el-button v-if="scope.row.role_status" type="danger" link>停用</el-button>
                                <el-button v-else type="success" link>启用</el-button>
                                <el-button type="danger" link>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="float: right;">
                        <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
                            v-model:limit="formData.pageSize" @pagination="handleQuery" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="新增用户" v-model="addDialogShow" width="500px" append-to-body align-center>
           <el-row>
                <el-col :span="6" class="add-item-left-bg">账号</el-col>
                <el-col :span="18" class ="add-item-right-bg"><el-input v-model="addData.account" placeholder="请输入账号" style="padding: 0;"></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="add-item-left-bg">密码</el-col>
                <el-col :span="18" class ="add-item-right-bg"><el-input v-model="addData.password" placeholder="请输入密码" style="padding: 0;"></el-input> </el-col>
           </el-row>            
           <el-row>
                <el-col :span="6" class="add-item-left-bg">使用者</el-col>
                <el-col :span="18" class ="add-item-right-bg"><el-input v-model="addData.user" placeholder="请输入使用者" style="padding: 0;"></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="add-item-left-bg">分组标识</el-col>
                <el-col :span="18" class="add-item-right-bg">                   
                    <el-select v-model="addData.group_id" placeholder="请选择分组标识" style="width: 100%;">
                        <el-option v-for="(item, index) in groupIdOptions" :label="item.label" :value="item.value"
                                    :key="index"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="add-item-left-bg">分组类型</el-col>
                <el-col :span="18" class ="add-item-right-bg"><el-input v-model="addData.group_type" placeholder="" style="padding: 0;" disabled></el-input> </el-col>
           </el-row>            
           <el-row>
                <el-col :span="6" class="add-item-left-bg">分组名称</el-col>
                <el-col :span="18" class ="add-item-right-bg"><el-input v-model="addData.group_name" placeholder="" style="padding: 0;" disabled></el-input> </el-col>
           </el-row> 
           <el-row style="margin-top: 50%;">
                <div>备注</div>
                <el-input :rows="5" type="textarea" v-model="addData.comment"></el-input>
           </el-row>
           <template #footer>
                <el-button type="primary">确认新增</el-button>
                <el-button @click="closeAddDialog">取消新增</el-button>
           </template>
        </el-dialog>

        <el-dialog title="编辑用户" v-model="editDialogShow" width="500px" append-to-body align-center>
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">账号</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.account" placeholder="请输入账号" style="pediting: 0;" disabled></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">密码</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.password" type="password" show-password placeholder="请输入密码" style="pediting: 0;"></el-input> </el-col>
           </el-row>            
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">使用者</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.user" placeholder="请输入使用者" style="pediting: 0;" disabled></el-input> </el-col>
           </el-row> 
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">分组标识</el-col>
                <el-col :span="18" class="edit-item-right-bg">                   
                    <el-select v-model="editData.group_id" placeholder="请选择拒绝原因" style="width: 100%;">
                        <el-option v-for="(item, index) in groupIdOptions" :label="item.label" :value="item.value"
                                    :key="index"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="edit-item-left-bg">分组类型</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.group_type" placeholder="" style="pediting: 0;" disabled></el-input> </el-col>
           </el-row>            
           <el-row>
                <el-col :span="6" class="edit-item-left-bg">分组名称</el-col>
                <el-col :span="18" class ="edit-item-right-bg"><el-input v-model="editData.group_name" placeholder="" style="pediting: 0;" disabled></el-input> </el-col>
           </el-row> 
           <el-row style="margin-top: 50%;">
                <div>备注</div>
                <el-input :rows="5" type="textarea" v-model="editData.comment"></el-input>
           </el-row>
           <template #footer>
                <el-button type="primary">确认编辑</el-button>
                <el-button @click="closeeditDialog">取消编辑</el-button>
           </template>
        </el-dialog>
    </div>
</template>

<style lang="scss">
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