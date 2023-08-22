<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown, UploadProps, UploadUserFile, Plus  } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

import * as _ from "lodash";


const router = useRouter();

const activeButton = ref<number>(0);

const formData = ref<any>({
    game_id: "",
    game_supplier: "",
    game_maker: "",
    game_trial: "",
    game_name: "",
    game_state: "",
    game_group: "",
    game_label: "",
    card_number: "",
    pageNum: 1,
    pageSize: 20,
})

const loading = ref<boolean>(false);

const total = ref<number>(2);

interface GetGameData {
    id: string;
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

const gameList = ref<Array<GetGameData>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
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
        id: "8e8fd8fsdfd8fe8f8df8ef",
        game_index: 2,
        game_skin: "picture",
        game_name: "DICE",
        game_id: 2626832,
        game_distributor: "PGGame",
        game_maker: "PGGame",
        game_type: "DICE",
        game_state: "启用",
        rtp_value: 96.2,
    },
])

const goBack = () => {
    router.push({ name: "Game Distribution" });
}

const handleButtonActive = ( name: string) => {
    router.push({ name: name });
}

</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>
        <el-card>
            <div style="display: flex">
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
                    <el-row style="float:right; ">
                        <el-form-item style="float: right; ">
                            <el-button class="search-btn" @click="handleQuery" >批量添加</el-button>
                        </el-form-item>
                    </el-row>
                </el-col>
            </div>
            <el-table v-loading="loading" :data="gameList" style="width: 100%;">
                <el-table-column type="selection" width="30" />
                <el-table-column label="游戏皮肤" align="left" prop="game_skin" width="140">
                    <template #default="scope">
                        <p class="game-skin">{{ scope.row.game_skin }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏名称" align="left" prop="game_name" width="220">
                    <template #default="scope">
                        <p>{{ scope.row.game_name }}</p>
                    </template>
                </el-table-column>                        
                <el-table-column label="游戏ID" align="left" prop="game_id" width="220">
                    <template #default="scope">
                        <p>{{ scope.row.game_id }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏渠道商" align="left" prop="game_distributor" width="220">
                    <template #default="scope">
                        <p>{{ scope.row.game_distributor }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏厂商" align="left" prop="game_maker" width="220">
                    <template #default="scope">
                        <p>{{ scope.row.game_maker }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏类型" align="left" prop="game_type" width="220">
                    <template #default="scope">
                        <p>{{ scope.row.game_type }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏状态" align="left" prop="game_state" width="220">
                    <template #default="scope">
                        <p class="game-running" v-if="scope.row.game_state == '维护中'">{{ scope.row.game_state }}</p>

                        <p v-if="scope.row.game_state != '维护中'">{{ scope.row.game_state }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="RTP" align="left" prop="rtp_value" width="220">
                    <template #default="scope">
                        <p>{{ scope.row.rtp_value }}</p>
                    </template>
                </el-table-column>
            </el-table>

            <div style="float: right;">
                <pagination v-if="total > 0" :total="total" v-model:page="formData.pageNum"
                    v-model:limit="formData.pageSize" @pagination="handleQuery" />
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.user-detail-header {
    padding: 20px;
    display: flex;
    align-items: center;
}


.game-skin {
    border: 1px solid;
    padding: 10px;
    border-color: #797979;
    background-color: #cccccc;
}
</style>
