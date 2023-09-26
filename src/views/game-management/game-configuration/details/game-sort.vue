<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown, Plus  } from '@element-plus/icons-vue';
import {UploadProps, UploadUserFile} from 'element-plus';
import { useRouter } from 'vue-router';
import moment from 'moment-timezone';

import * as _ from "lodash";

const handleQuery = ()=>{
    
}
const router = useRouter();

const activeButton = ref<number>(1);
const activeNames = ref(['1', '2', '3', '4']);
const subActiveNames = ref(['1', '2', '3', '4']);
const vipBonusHeight = ref(0);
const vipBonusShow = ref<boolean>(false);


const dynamicTags = ref([{label: "HOT", color: "#ffcc99"}, {label: "NEW", color: "#80cccc"}, {label: "PG", color: "#b3e6ff"}])

const dynamicTags1 = ref([{label: "HOT", color: "#ffcc99"}, {label: "NEW", color: "#80cccc"}, {label: "SLOT", color: "#f8f8f8"}, {label: "PG", color: "#b3e6ff"}, {label: "Dice", color: "#f8f8f8"}, {label: "Pop", color: "#f8f8f8"}, {label: "Poker", color: "#f8f8f8"}])

const handleClose = (tag: any) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}



const isTabPanelShow = ref(true)

const handleShowTab = () => {
    isTabPanelShow.value = !isTabPanelShow.value
}

const tabList = ref<any>(["Classic", "EvoPlay", "Club"])
const total = ref<number>(5);
const formData = ref<any>({
    pageNum: 1,
    pageSize: 20,
})

const isClassic = ref(true)
const isEvoPlay = ref(true)
const isClub = ref(true)
const isAAA = ref(false)
const isBBB = ref(false)
const isCCC = ref(false)

const handleSelectTab = (tabName:any) => {
    switch (tabName) {
        case "Classic":
            isClassic.value  = !isClassic.value;
            break;
        case "EvoPlay":
            isEvoPlay.value  = !isEvoPlay.value;
            break;
        case "Club":
            isClub.value  = !isClub.value;
            break;
        case "AAA":
            isAAA.value  = !isAAA.value;
            break;
        case "BBB":
            isBBB.value  = !isBBB.value;
            break;
        case "CCC":
            isCCC.value  = !isCCC.value;
            break;
        default:
            break;
    }
}

const handleAddTab = () => {

}

interface GetGameData {
    id: string;
    game_index: number;
    game_id: string;
    game_name: string;
    game_state: string;
    game_type: string;
    game_distributor: string;
    game_maker: string;
}

const gameList = ref<Array<GetGameData>>([
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        game_index: 1,
        game_id: "ABCD1234",
        game_name: "DICE",
        game_state: "启用",
        game_type: "DICE",
        game_distributor: "自研游戏",
        game_maker: "自研游戏",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        game_index: 2,
        game_id: "ABCD1234",
        game_name: "DICE",
        game_state: "启用",
        game_type: "DICE",
        game_distributor: "XXXGame",
        game_maker: "XXXGame",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        game_index: 3,
        game_id: "ABCD1234",
        game_name: "DICE",
        game_state: "维护中",
        game_type: "DICE",
        game_distributor: "XXXGame",
        game_maker: "XXXGame",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        game_index: 4,
        game_id: "ABCD1234",
        game_name: "DICE",
        game_state: "启用",
        game_type: "DICE",
        game_distributor: "XXXGame",
        game_maker: "XXXGame",
    },
    {
        id: "8e8fd8fsdfd8fe8f8df8ef",
        game_index: 5,
        game_id: "ABCD1234",
        game_name: "DICE",
        game_state: "启用",
        game_type: "DICE",
        game_distributor: "XXXGame",
        game_maker: "XXXGame",
    },
])

const goBack = () => {
    router.push({ name: "Game Configuration" });
}

const handleButtonActive = (name: string) => {
    router.push({ name: name });
}

const setTop = () => {
}

const setLow = () => {
}

const loading = ref<boolean>(false);

</script>

<template>
    <div class="app-container">
        <div class="user-detail-header">
            <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
        </div>
        <el-card>
            
            <div style="margin-left: auto;">
                <el-button :type="activeButton == 0 ? 'warning' : ''"
                    @click="handleButtonActive('Game Information')">游戏信息</el-button>
                <el-button :type="activeButton == 1 ? 'warning' : ''"
                    @click="handleButtonActive('Game Sort')">分组排序</el-button>
            </div>
            <el-divider />
            <el-row :gutter="20" >
                <el-col :span="8">
                    <el-form >
                        <el-form-item label="游戏分组:">
                            <el-tag
                                v-for="tag in dynamicTags"
                                :key="tag.label"
                                class="game-group"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)"
                                :style = "{'background-color': tag.color}"
                            >
                                {{ tag.label }}
                            </el-tag>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row :gutter="20" >
                <el-col>
                    <div v-if = "isTabPanelShow == true" class="tab-container">
                        <div style = "display: flex; margin-left: 10px;">
                            <p class="game-group1" v-for="(item, index) in dynamicTags1" :key="index" :style = "{'background-color': item.color}">{{ item.label }}</p>
                        </div>                       
                    </div>
                </el-col>
            </el-row>
            <el-divider style="margin-bottom: 0px;"/>
            <div style = "display: flex">
                <el-text class="tag-table-sel" style="background-color: #e6e6e6">HOT</el-text>
                <el-text class="tag-table-sel">NEW</el-text>
                <el-text class="tag-table-sel" style="background-color: #e6e6e6">PG</el-text>
            </div>
            <el-table v-loading="loading" :data="gameList" style="width: 100%;">
                <el-table-column label="排序" align="left" prop="game_index" width="200">
                    <template #default="scope">
                        <p >{{ scope.row.game_index }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏ID" align="left" prop="game_id" width="200">
                    <template #default="scope">
                        <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;"
                            @click="router.push({ name: 'Game Information' })">
                            {{ scope.row.game_id }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="游戏名字" align="left" prop="game_name" width="200">
                    <template #default="scope">
                        <p >{{ scope.row.game_name }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏状态" align="left" prop="game_state" width="200">
                    <template #default="scope">
                        <p >{{ scope.row.game_state }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏类型" align="left" prop="game_type" width="200">
                    <template #default="scope">
                        <p >{{ scope.row.game_type }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏渠道商" align="left" prop="game_distributor" width="200">
                    <template #default="scope">
                        <p >{{ scope.row.game_distributor }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="游戏厂商" align="left" prop="game_maker" width="200">
                    <template #default="scope">
                        <p >{{ scope.row.game_maker }}</p>
                    </template>
                </el-table-column>

                <el-table-column label="" align="left" width="200" fixed="right">
                    <template #default>
                        <el-button type="primary" link @click="setTop">置顶</el-button>
                        <el-button  link @click="setLow">置低</el-button>
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

.game-group {
    text-align: center;
    width: 60px;
    margin-right: 5px;
    height: 30px;
    border-radius: 0;
    border: 1px solid black;
}
.game-group1 {
    text-align: center;
    padding: 10px 15px;
    margin-right: 15px;
    border-radius: 0;
    border: 1px solid;
}
.tab-container {
    height: 150px;
    border: 1px solid;
    background-color:#f8f8f8;
    padding-top:10px;
}
.tag-table-sel {
    border: 1px solid;
    padding: 10px;
}
</style>
