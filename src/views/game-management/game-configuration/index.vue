<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import useStore from "@/store";
import { useRouter } from "vue-router";

import axios, { AxiosPromise } from "axios";
import type * as Game from "@/interface/game";

//import { watch } from "fs";

const { game } = useStore();

const { user } = useStore();
const router = useRouter();

const formData = ref<any>({
  game_id: "",
  game_manufacturer: "",
  game_maker: "",
  start_trial: "",
  game_name: "",
  game_status: "",
  game_group: "",
  game_tab: "",
});

const loading = ref<boolean>(false);

const groupTagColor = {
  BBBGame: "#80cccc",
  CCCGame: "#ffcc99",
  DDDGame: "#b3e6ff",
};

const gameList = computed(() => {
  return game.getGameDatas;
});

const gameManufacturerList = computed(() => {
  return game.getGameManufactureList;
});

const gameMakerList = computed(() => {
  return game.getGameMakerList;
});

const gameGroupList = computed(() => {
  return game.getGameGroupList;
});

const gameTabList = computed(() => {
  return game.getGameTabList;
});

const handleQuery = async () => {
  await game.dispatchGameDatas(formData.value);
};

const resetQuery = () => {};

onMounted(async () => {
  await game.dispatchGameDatas(formData.value);
  await game.dispatchGameGameManufactureList();
  await game.dispatchGameMakerList();
  await game.dispatchGameGroupList();
  await game.dispatchGameTabList();
});

const handleBatchAction = async (type: number) => {
  let game_ids: number[] = [];
  for (let i = 0; i < multipleSelection.value.length; i++) {
    game_ids.push(multipleSelection.value[i].game_id);
  }
  await game.dispatchBatchAction({ action_type: type, game_id_list: game_ids });
};

const goGameDetailPage = (game_id: any) => {
  router.push({ name: "Game Information", params: { id: game_id } });
};

const multipleSelection = ref<Game.GetGameData[]>([]);

const handleSelectionChange = (val: Game.GetGameData[]) => {
  multipleSelection.value = val;
};

const gameStatusChange = async (data: Game.GetGameData) => {
  await game.dispatchGameStatusChange({
    game_id: data.game_id,
    game_enabled: data.game_enabled,
  });
};
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search" style="display: flex">
          <el-col :span="18" :xs="18">
            <el-form ref="formDataRef" :model="formData" :inline="true" label-width="70">
              <el-form-item label="游戏ID" prop="game_id">
                <el-input
                  v-model="formData.game_id"
                  placeholder="请输入游戏ID"
                  clearable
                />
              </el-form-item>
              <el-form-item label="供应商" prop="game_manufacturer">
                <el-select
                  v-model="formData.game_manufacturer"
                  placeholder="请选择供应商"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in gameManufacturerList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="游戏厂商" prop="game_maker">
                <el-select
                  v-model="formData.game_maker"
                  placeholder="请选择游戏厂商"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in gameMakerList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开启试玩" prop="start_trial">
                <el-select
                  v-model="formData.start_trial"
                  placeholder="请选择是否开启试玩儿"
                  clearable
                >
                  <el-option label="开启" value="1" />
                  <el-option label="关闭" value="2" />
                </el-select>
              </el-form-item>
            </el-form>
            <el-form ref="formDataRef" :model="formData" :inline="true" label-width="70">
              <el-form-item label="游戏名称" prop="game_name">
                <el-input
                  v-model="formData.game_name"
                  placeholder="请输入游戏名称"
                  clearable
                />
              </el-form-item>
              <el-form-item label="游戏状态" prop="game_status">
                <el-select
                  v-model="formData.game_status"
                  placeholder="请选择游戏状态"
                  clearable
                >
                  <el-option label="启用" value="1" />
                  <el-option label="禁用" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="游戏组" prop="game_group">
                <el-select
                  v-model="formData.game_group"
                  placeholder="请选择游戏组"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in gameGroupList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="游戏标签" prop="game_tab">
                <el-select
                  v-model="formData.game_tab"
                  placeholder="请选择游戏选项卡"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in gameTabList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
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
        <el-card style="margin-bottom: 10px">
          <el-button @click="handleBatchAction(1)">批量维护</el-button>
          <el-button @click="handleBatchAction(2)">批量下架</el-button>
          <el-button @click="handleBatchAction(3)">批量启用</el-button>
          <el-button @click="handleBatchAction(4)">批量开启试玩</el-button>
        </el-card>
        <el-card>
          <el-table
            v-loading="loading"
            :data="gameList"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="30" />
            <el-table-column label="游戏皮肤" align="left" prop="game_skin" width="120">
              <template #default="scope">
                <p class="game-skin">{{ scope.row.game_skin }}</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏ID" align="left" prop="game_id" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_id }}</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏名字" align="left" prop="game_name" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏分组" align="left" prop="game_group" width="200">
              <template #default="scope">
                <div style="display: flex">
                  <p
                    class="game-group"
                    v-for="(item, index) in scope.row.game_group"
                    :key="index"
                    :style="{
                      'background-color': groupTagColor[gameGroupList[item].name],
                    }"
                  >
                    {{ gameGroupList[item].name }}
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="游戏类型" align="left" prop="game_type" width="120">
              <template #default="scope">
                <p>{{ scope.row.game_type }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="游戏供应商"
              align="left"
              prop="game_provider"
              width="120"
            >
              <template #default="scope">
                <p>{{ gameManufacturerList[scope.row.game_provider].name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏厂商" align="left" prop="game_maker" width="120">
              <template #default="scope">
                <p>{{ gameMakerList[scope.row.game_maker].name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏状态" align="left" prop="game_status" width="120">
              <template #default="scope">
                <p class="game-running" v-if="scope.row.game_status == '维护中'">
                  {{ scope.row.game_status }}
                </p>

                <p v-if="scope.row.game_status != '维护中'">
                  {{ scope.row.game_status }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="维护时间"
              align="left"
              prop="maintenance_time"
              width="170"
            >
              <template #default="scope">
                <p>{{ scope.row.maintenance_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label="RTP值" align="left" prop="rtp_value" width="120">
              <template #default="scope">
                <p>{{ scope.row.rtp_value }}</p>
              </template>
            </el-table-column>
            <el-table-column label="游戏页签" align="left" prop="game_tab" width="500">
              <template #default="scope">
                <div style="display: flex">
                  <p
                    class="game-tab"
                    v-for="(item, index) in scope.row.game_tab"
                    :key="index"
                  >
                    {{ gameTabList[item].name }}
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="left" width="120" fixed="right">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.game_enabled"
                  style="margin-right: 10px"
                  @change="gameStatusChange(scope.row)"
                />
                <el-button type="danger" link @click="goGameDetailPage(scope.row.game_id)"
                  >修改</el-button
                >
              </template>
            </el-table-column>
          </el-table>
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
.game-tab {
  text-align: center;
  width: 70px;
  margin-right: 5px;
}
</style>
