<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import { Search, Refresh, } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import useStore from '@/store';

import {getGameDistributionList, deleteBatch} from '@/api/GameManagement'
import { ElInput } from 'element-plus'

const router = useRouter();
const { user } = useStore();

interface GetGameData {
    game_index: number;
    game_skin: string;
    game_name: string;
    game_id: number;
    game_distributor: string;
    game_maker: string;
    game_type: string;
    game_state: string;
    rtp_value: number;
}

const formData = ref<any>({
    game_id: "",
    game_supplier: "",
    game_maker: "",
    game_name: "",
    game_state: "",
    game_group: "Hot",
    game_label: "",
    page_num: 1,
    page_size: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(3);

const gameList = ref<Array<GetGameData>>([
    {
        game_index: 1,
        game_skin: "picture",
        game_name: "DICE",
        game_id: 2626832,
        game_distributor: "自研",
        game_maker: "自研",
        game_type: "DICE",
        game_state: "启用",
        rtp_value: 96.2,
    },
    {
        game_index: 2,
        game_skin: "picture",
        game_name: "Crash",
        game_id: 2626832,
        game_distributor: "XXGame",
        game_maker: "XXGame",
        game_type: "Crash",
        game_state: "维护中",
        rtp_value: 96.2,
    },
    {
        game_index: 3,
        game_skin: "picture",
        game_name: "Black Jack",
        game_id: 2626832,
        game_distributor: "YYGame",
        game_maker: "YYGame",
        game_type: "Poker",
        game_state: "下架",
        rtp_value: 96.2,
    }
])

const handleQuery = () => {
    getData();

}



const resetQuery = () => {
    
}


const getData = async () =>{
    let res = await getGameDistributionList(user.token, formData.value, 1);
    gameList.value = res.data.data;
}

onMounted(()=>{
    getData();
})
const goGameDetailPage = () => {
    router.push({ name: "Game Information" });
}

const inputValue = ref('')
const dynamicTags = ref([{label:'Hot', selected:true}, {label:'New', selected:false}, {label:'Baccart', selected:false}, {label:'Popular', selected:false}, {label:'BlackJack', selected:false}, {label:'Other', selected:false}])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: any) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const handleClick = (tag: any) => {
    let searchIndex = dynamicTags.value.indexOf(tag);
    for(let i = 0; i < dynamicTags.value.length; i ++)
    {
        if(i != searchIndex)   
            dynamicTags.value[i].selected = false;
    }

    if(dynamicTags.value[searchIndex].selected == false)
    {
        dynamicTags.value[searchIndex].selected = !dynamicTags.value[searchIndex].selected;
        formData.value.game_group = dynamicTags.value[searchIndex].label;
    }
}
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push({label:inputValue.value, selected:false})
  }
  inputVisible.value = false
  inputValue.value = ''
}

const handleSetTop = () => {

}

const handleSetLow = () => {
    
}

const handleAddBatch = () => {
    router.push({ name: "Game Add Batch", params:{game_group:formData.value.game_group} });
}

const handleDeleteBatch = async () => {
    let game_ids : number[] = [];
    for(let i = 0; i <multipleSelection.value.length; i ++)
    {
        game_ids.push(multipleSelection.value[i].game_id);
    }
    let res = await deleteBatch(user.token, formData.value.game_group, game_ids);
}

const multipleSelection = ref<GetGameData[]>([])
const handleSelectionChange = (val: GetGameData[]) => {
  multipleSelection.value = val;
}

</script>

<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <div class="search" style="display: flex">
                    <el-col :span="18" :xs="18">
                        <el-form ref="formDataRef" :model="formData" :inline="true" label-width="70">
                            <el-form-item label="游戏ID" prop="game_id">
                                <el-input v-model="formData.game_id" placeholder="请输入游戏ID" clearable />
                            </el-form-item>
                            <el-form-item label="供应商" prop="game_supplier">
                                <el-select v-model="formData.game_supplier" placeholder="请选择供应商" clearable>
                                    <el-option label="选项1" value="0" />
                                    <el-option label="选项2" value="1" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="游戏厂商" prop="game_maker">
                                <el-select v-model="formData.game_maker" placeholder="请选择游戏厂商" clearable>
                                    <el-option label="选项1" value="0" />
                                    <el-option label="选项2" value="1" />
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-form ref="formDataRef" :model="formData" :inline="true" label-width="70">
                            <el-form-item label="游戏名称" prop="game_name">
                                <el-input v-model="formData.game_name" placeholder="请输入游戏名称" clearable />
                            </el-form-item>
                            <el-form-item label="游戏状态" prop="game_state">
                                <el-select v-model="formData.game_state" placeholder="请选择游戏状态" clearable>
                                    <el-option label="选项1" value="0" />
                                    <el-option label="选项2" value="1" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="游戏标签" prop="game_label">
                                <el-select v-model="formData.game_label" placeholder="请选择游戏选项卡" clearable>
                                    <el-option label="选项1" value="0" />
                                    <el-option label="选项2" value="1" />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <el-col :span="6" :xs="6">
                        <el-form-item>
                            <el-button class="search-btn" @click="handleQuery">搜索</el-button>
                            <el-button class="search-btn" @click="handleQuery">重置</el-button>
                            <el-button class="search-btn" @click="handleQuery">同步</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn" @click="handleQuery">导出Excel</el-button>
                            <el-button class="search-btn" @click="handleQuery">导入Excel</el-button>
                        </el-form-item>                    
                    </el-col>
                    
                   
                </div>
                <el-card style="margin-bottom: 10px;">
                    <el-check-tag
                        v-for="tag in dynamicTags"
                        :key="tag"
                        class="mx-1 game-tag"
                        closable
                        :disable-transitions="false"
                        :checked="tag.selected"
                        @close="handleClose(tag)"
                        @click="handleClick(tag)"
                    >
                        {{ tag.label }}
                    </el-check-tag>
                    <el-input
                        v-if="inputVisible"
                        ref="InputRef"
                        v-model="inputValue"
                        class="ml-1 w-20"
                        size="small"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                    />
                    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                        +
                    </el-button>
                </el-card>
                <div style="float: right; width: 100%;">
                    <div style="display: flex; float: right; margin-bottom: 10px;">
                        <el-button @click="handleDeleteBatch">批量删除</el-button>
                        <el-button @click="handleAddBatch">批量添加</el-button>
                    </div>
                </div>
                
                <el-card>
                    <el-table v-loading="loading" :data="gameList" style="width: 100%;" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="30" />
                        <el-table-column label="排序" align="left" prop="game_index" width="70">
                            <template #default="scope">
                                <p >{{ scope.row.game_index }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="游戏皮肤" align="left" prop="game_skin" width="140">
                            <template #default="scope">
                                <p class="game-skin">{{ scope.row.game_skin }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="游戏名称" align="left" prop="game_name" width="170">
                            <template #default="scope">
                                <p>{{ scope.row.game_name }}</p>
                            </template>
                        </el-table-column>                        
                        <el-table-column label="游戏ID" align="left" prop="game_id" width="170">
                            <template #default="scope">
                                <p>{{ scope.row.game_id }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="游戏渠道商" align="left" prop="game_distributor" width="170">
                            <template #default="scope">
                                <p>{{ scope.row.game_distributor }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="游戏厂商" align="left" prop="game_maker" width="170">
                            <template #default="scope">
                                <p>{{ scope.row.game_maker }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="游戏类型" align="left" prop="game_type" width="170">
                            <template #default="scope">
                                <p>{{ scope.row.game_type }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="游戏状态" align="left" prop="game_state" width="170">
                            <template #default="scope">
                                <p class="game-running" v-if="scope.row.game_state == '维护中'">{{ scope.row.game_state }}</p>

                                <p v-if="scope.row.game_state != '维护中'">{{ scope.row.game_state }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="RTP" align="left" prop="rtp_value" width="170">
                            <template #default="scope">
                                <p>{{ scope.row.rtp_value }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="left" width="200" fixed="right">
                            <template #default="scope">
                                <el-button type="primary" link @click="handleSetTop">置顶</el-button>
                                <el-button link @click="handleSetLow">置低</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="float: right;">
                        <pagination v-if="total > 0" :total="total" v-model:page="formData.page_num"
                            v-model:limit="formData.page_size" @pagination="handleQuery" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
.el-table thead th.el-table__cell {
    background: #f5f7fa !important;
    height: 100px;
}

.el-table--enable-row-transition .el-table__body td.el-table__cell {
    height: 80px;
}
.el-form-item {
    margin-right: 10px !important;
}
.search-btn {
    width: 100px;
}
.game-skin {
    border: 1px solid;
    padding: 10px;
    border-color: #797979;
    background-color: #cccccc;
}
.game-running {
    color: #66ccff;
}
.game-group {
    text-align: center;
    width: 50px;
    margin-right: 5px;
}
.game-tag {
    text-align: center;
    padding:20px 25px;
    margin-right: 5px;
}
.button-new-tag {
    text-align: center;
    padding:10px 10px;
    margin-right: 5px;
}
</style>