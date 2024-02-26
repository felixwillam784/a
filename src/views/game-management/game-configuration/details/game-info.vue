<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  ArrowLeft,
  CopyDocument,
  ArrowRight,
  ArrowDown,
  Plus,
} from "@element-plus/icons-vue";
import { UploadProps, UploadUserFile } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import moment from "moment-timezone";

import { getGameInfo } from "@/api/GameManagement";
import useStore from "@/store";

import * as _ from "lodash";

//import { watch } from "fs";

const { user } = useStore();
const router = useRouter();
const route = useRoute();

const { game } = useStore();

const baseURL = import.meta.env.VITE_APP_BASE_API;
const upLoadURL = baseURL + "/upload/image/game";

const activeButton = ref<number>(0);
const activeNames = ref(["1", "2", "3", "4"]);
const subActiveNames = ref(["1", "2", "3", "4"]);
const vipBonusHeight = ref(0);
const vipBonusShow = ref<boolean>(false);

const maintenanceDateRange = ref([
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
]);

const gameStateOptions = [
  {
    value: 0,
    label: "启用",
  },
  {
    value: 1,
    label: "维护中",
  },
  {
    value: 2,
    label: "下架",
  },
];

const coverFileList = ref<UploadUserFile[]>([]);

const hdFileList = ref<UploadUserFile[]>([]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const dialogHdImageUrl = ref("");
const dialogHdVisible = ref(false);

const handleHdRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handleHdPictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogHdImageUrl.value = uploadFile.url!;
  dialogHdVisible.value = true;
};

const isTabPanelShow = ref(true);

const handleShowTab = () => {
  isTabPanelShow.value = !isTabPanelShow.value;
};

const tabList = ref<any>(["Classic", "EvoPlay", "Club"]);

const groupTagColor = {
  NEW: "#80cccc",
  HOT: "#ffcc99",
  PG: "#b3e6ff",
};

const isClassic = ref(true);
const isEvoPlay = ref(true);
const isClub = ref(true);
const isAAA = ref(false);
const isBBB = ref(false);
const isCCC = ref(false);

const handleSelectTab = (tabName: string) => {
  switch (tabName) {
    case "Classic":
      isClassic.value = !isClassic.value;
      break;
    case "EvoPlay":
      isEvoPlay.value = !isEvoPlay.value;
      break;
    case "Club":
      isClub.value = !isClub.value;
      break;
    case "AAA":
      isAAA.value = !isAAA.value;
      break;
    case "BBB":
      isBBB.value = !isBBB.value;
      break;
    case "CCC":
      isCCC.value = !isCCC.value;
      break;
    default:
      break;
  }
};

const handleAddTab = () => {};

const gameInformation = ref<any>({
  game_id: "XXX111X2X3",
  game_name: "BlackJack",
  game_type: "Poker",
  api_provier: "Fundist",
  game_maker: "XXXGame",
  rtp_value: 96.5,
  max_bet: 1000000,
  min_bet: 0.01,
  max_odds: 100000,
  restricted_country: ["美国", "墨西哥", "加拿大", "英国"],
  game_group: [
    { label: "HOT", color: "#ffcc99" },
    { label: "NEW", color: "#80cccc" },
    { label: "PG", color: "#b3e6ff" },
  ],
  game_trial_start: true,
  game_trial_count: 10,
  game_state: { value: 0, label: "启用" },
  maintenance_date_range: [
    moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
    moment.tz("Asia/Hong_Kong").format("YYYY-MM-DD"),
  ],

  game_cover: "",
  game_hd_img: "",
  game_tab: ["Classic", "EvoPlay", "Club"],
});

const goBack = () => {
  router.push({ name: "Channel Management" });
};

const handleButtonActive = (name: string) => {
  router.push({ name: name });
};

onMounted(async () => {
  await game.dispatchGameDetail(route.params.id);
  /*let res = await getGameInfo(user.token, route.params.id);

  gameInformation.value = res.data.data;
  gameInformation.value.maintenance_date_range[0] = res.data.data.maintenance_date_range[0].split(
    "T"
  )[0];
  gameInformation.value.maintenance_date_range[1] = res.data.data.maintenance_date_range[1].split(
    "T"
  )[0];

  gameInformation.value.game_cover.forEach((item: string) => {
    coverFileList.value.push({
      name: "item",
      url: `http://45.32.120.156:8020/asset/image/game/${route.params.id}/cover/${item}`,
    });
  });

  gameInformation.value.game_hd.forEach((item: string) => {
    hdFileList.value.push({
      name: "item",
      url: `http://45.32.120.156:8020/asset/image/game/${route.params.id}/hd/${item}`,
    });
  });*/
});
</script>

<template>
  <div class="app-container">
    <div class="user-detail-header">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
    <el-card>
      <div style="margin-left: auto">
        <el-button
          :type="activeButton == 0 ? 'warning' : ''"
          @click="handleButtonActive('Game Information')"
          >游戏信息</el-button
        >
        <el-button
          :type="activeButton == 1 ? 'warning' : ''"
          @click="handleButtonActive('Game Sort')"
          >分组排序</el-button
        >
      </div>
      <el-divider />
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="游戏ID:">
              <el-text>{{ gameInformation.game_id }}</el-text>
              <el-button link>
                <el-icon>
                  <CopyDocument />
                </el-icon>
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游戏名字:">
            <el-text>{{ gameInformation.game_name }}</el-text>
            <el-button link>
              <el-icon>
                <CopyDocument />
              </el-icon>
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游戏类型:">
            <el-text>{{ gameInformation.game_type }}</el-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="API提供商:">
              <el-text>{{ gameInformation.api_provier }}</el-text>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游戏厂商:">
            <el-text>{{ gameInformation.game_maker }}</el-text>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="RTP:">
            <el-text>{{ gameInformation.rtp_value }}%</el-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="最大下注:">
              <el-text>{{ gameInformation.max_bet }}</el-text>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最小下注:">
            <el-text>{{ gameInformation.min_bet }}</el-text>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最大赔率:">
            <el-text>{{ gameInformation.max_odds }}</el-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="限制国家:">
            <el-text
              class="restricted-country"
              v-for="(item, index) in gameInformation.restricted_country"
              :key="index"
              >{{ item }}</el-text
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="游戏分组:">
              <div style="display: flex">
                <el-text
                  class="game-group"
                  v-for="(item, index) in gameInformation.game_group"
                  :key="index"
                  :style="{ 'background-color': groupTagColor[item] }"
                  >{{ item }}</el-text
                >
              </div>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开启试玩:">
            <el-switch
              v-model="gameInformation.game_trial_start"
              style="margin-right: 10px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="试玩次数:">
            <el-text class="trial-count">{{ gameInformation.game_trial_count }}</el-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="游戏状态:">
              <el-select
                v-model="gameInformation.game_state"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in gameStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下次维护时间:">
            <el-date-picker
              type="daterange"
              v-model="gameInformation.maintenance_date_range"
              range-separator="至"
              value-format="YYYY-MM-DD"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="游戏封面:">
              <el-upload
                v-model:file-list="coverFileList"
                :action="`${upLoadURL}?image_type=1&game_id=${route.params.id}`"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="{ Authorization: user.token }"
              >
                <div style="display: grid; justify-items: center">
                  <el-icon><Plus /></el-icon>
                  <el-text>添加300*300</el-text>
                  <el-text>小于150K图片</el-text>
                </div>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游戏高清图:">
            <el-upload
              v-model:file-list="hdFileList"
              :action="`${upLoadURL}?image_type=2p&game_id=${route.params.id}`"
              list-type="picture-card"
              :on-preview="handleHdPictureCardPreview"
              :on-remove="handleHdRemove"
              :headers="{ Authorization: user.token }"
            >
              <div style="display: grid; justify-items: center">
                <el-icon><Plus /></el-icon>
                <el-text>添加300*300</el-text>
                <el-text>小于150K图片</el-text>
              </div>
            </el-upload>

            <el-dialog v-model="dialogHdVisible">
              <img w-full :src="dialogHdImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="游戏标签:">
              <div style="display: flex">
                <el-text
                  class="game-tab"
                  v-for="(item, index) in gameInformation.game_tab"
                  :key="index"
                  >{{ item }}</el-text
                >
                <el-button
                  :type="isTabPanelShow == true ? 'warning' : ''"
                  @click="handleShowTab()"
                  style="margin-left: 20px"
                  >收起</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <div v-if="isTabPanelShow == true" class="tab-container">
            <div>
              <el-button
                class="tab-button"
                :type="isClassic == true ? 'warning' : ''"
                @click="handleSelectTab('Classic')"
                style="margin-left: 20px"
                >Classic</el-button
              >
              <el-button
                class="tab-button"
                :type="isEvoPlay == true ? 'warning' : ''"
                @click="handleSelectTab('EvoPlay')"
                style="margin-left: 20px"
                >EvoPlay</el-button
              >
              <el-button
                class="tab-button"
                :type="isClub == true ? 'warning' : ''"
                @click="handleSelectTab('Club')"
                style="margin-left: 20px"
                >Club</el-button
              >
              <el-button
                class="tab-button"
                :type="isAAA == true ? 'warning' : ''"
                @click="handleSelectTab('AAA')"
                style="margin-left: 20px"
                >AAA</el-button
              >
              <el-button
                class="tab-button"
                :type="isBBB == true ? 'warning' : ''"
                @click="handleSelectTab('BBB')"
                style="margin-left: 20px"
                >BBB</el-button
              >
              <el-button
                class="tab-button"
                :type="isCCC == true ? 'warning' : ''"
                @click="handleSelectTab('CCC')"
                style="margin-left: 20px"
                >CCC</el-button
              >
            </div>
            <div class="add-tag-btn">
              <el-button
                class="tab-button"
                :type="isTabPanelShow == true ? 'warning' : ''"
                @click="handleAddTab()"
                style="margin-left: 20px"
                >添加标签</el-button
              >
            </div>
          </div>
        </el-col>
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

:deep(.el-form-item__label) {
  font-size: 16px !important;
  font-weight: bold !important;
}

:deep(.el-table thead th.el-table__cell) {
  background: #f5f7fa;
  height: 60px;
}

.restricted-country {
  text-align: center;
  margin-right: 10px;
  font-size: 16px;
}
.game-group {
  text-align: center;
  width: 50px;
  margin-right: 5px;
}
.trial-count {
  border: 1px solid;
  width: 100px;
  background-color: #cccccc;
  padding-left: 5px;
}
.game-tab {
  text-align: center;
  width: 70px;
  margin-right: 5px;
  border: 1px solid;
}
.tab-container {
  height: 200px;
  border: 1px solid;
  background-color: #f8f8f8;
  padding-top: 20px;
  position: relative;
}
.tab-button {
  border-radius: 0;
}
.add-tag-btn {
  position: absolute;
  bottom: 10px;
  left: 48%;
}
</style>
