<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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
import { nextTick } from "vue";
import { ElInput } from "element-plus";

//import { watch } from "fs";

const { user } = useStore();
const router = useRouter();
const route = useRoute();

const { game } = useStore();

const baseURL = import.meta.env.VITE_APP_BASE_API;
const upLoadURL = baseURL + "/upload/image/game";

const activeButton = ref<number>(0);

const gameStateOptions = [
  {
    value: 1,
    label: "启用",
  },
  {
    value: 2,
    label: "禁用",
  },
];

const coverFileList = ref<UploadUserFile[]>([]);

const hdFileList = ref<UploadUserFile[]>([]);

const dialogCoverImageUrl = ref("");
const dialogCoverVisible = ref(false);

const handleCoverRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handleCoverPictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogCoverImageUrl.value = uploadFile.url!;
  dialogCoverVisible.value = true;
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

const handleShowTab = async () => {
  isTabPanelShow.value = !isTabPanelShow.value;

  if (isTabPanelShow.value == false) {
    let tags: Array<string> = [];
    for (let i = 0; i < tag_status.value.length; i++) {
      if (tag_status.value[i] == true) tags.push(dynamicGameTags.value[i]);
    }
    await game.dispatchGameDetailUpdateGameTag({
      game_id: route.params.id,
      game_tag: tags,
    });

    await game.dispatchGameDetail(route.params.id);
  }
};

const gameInformation = computed(() => {
  return game.getGameDetailData;
});

const maintenance_date_range = ref<Array<any>>([]);

const goBack = () => {
  router.push({ name: "Channel Management" });
};

const handleButtonActive = (name: string) => {
  router.push({ name: name, params: { id: route.params.id } });
};

onMounted(async () => {
  await game.dispatchGameDetail(route.params.id);
  await game.dispatchGameTabList();
  maintenance_date_range.value = [
    new Date(gameInformation.value.next_maintanence_start_time * 1000)
      .toISOString()
      .split("T")[0],
    new Date(gameInformation.value.next_maintanence_end_time * 1000)
      .toISOString()
      .split("T")[0],
  ];

  gameTabList.value.forEach((element) => {
    dynamicGameTags.value.push(element.name);
  });

  gameInformation.value.game_tag.forEach((element) => {
    let index = dynamicGameTags.value.findIndex((item) => item == element);
    tag_status.value[index] = true;
  });
});

const handlegameStatusChange = async () => {
  await game.dispatchGameDetailChangeStatus({
    game_id: route.params.id,
    game_status: gameInformation.value.game_status,
  });
};

const handleGameTrialStatusChange = async () => {
  console.log(gameInformation.value.trial_play);
  await game.dispatchGameDetailChangeTrialStatus({
    game_id: route.params.id,
    trial_play: gameInformation.value.trial_play,
  });
};

const gameTabList = computed(() => {
  return game.getGameTabList;
});

const inputGameTagValue = ref("");
const dynamicGameTags = ref<Array<string>>([]);
const inputGameTagVisible = ref(false);
const inputGameTagRef = ref<InstanceType<typeof ElInput>>();

const showInput = () => {
  inputGameTagVisible.value = true;
  nextTick(() => {
    inputGameTagRef.value!.input!.focus();
  });
};

const handleInputConfirm = async () => {
  if (inputGameTagValue.value) {
    dynamicGameTags.value.push(inputGameTagValue.value);
    tag_status.value.push(false);

    await game.dispatchAddGameTag({ game_tag: inputGameTagValue.value });
  }
  inputGameTagVisible.value = false;
  inputGameTagValue.value = "";
};

const tag_status = ref<Array<boolean>>([]);

const handleGameTagSelectionChange = (index: number) => {
  tag_status.value[index] = !tag_status.value[index];
};
const copyText = (str: any) => {
  navigator.clipboard.writeText(str);
};
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
              <el-button link @click="copyText(gameInformation.game_id)">
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
            <el-button link @click="copyText(gameInformation.game_name)">
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
              <el-text>{{ gameInformation.api_provider }}</el-text>
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
            <el-text>{{ gameInformation.rtp }}%</el-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="最大下注:">
              <el-text>{{ gameInformation.max_bet_limit }}</el-text>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最小下注:">
            <el-text>{{ gameInformation.min_bet_limit }}</el-text>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最大赔率:">
            <el-text>{{ gameInformation.max_magnification }}</el-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="限制国家:">
            <el-text
              class="restricted-country"
              v-for="(item, index) in gameInformation.limit_country"
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
                  :style="'background-color:' + item.color"
                  >{{ item.name }}</el-text
                >
              </div>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开启试玩:">
            <el-switch
              v-model="gameInformation.trial_play"
              style="margin-right: 10px"
              @click="handleGameTrialStatusChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="试玩次数:">
            <el-text class="trial-count">{{ gameInformation.trial_count }}</el-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="游戏状态:">
              <el-select
                v-model="gameInformation.game_status"
                class="m-2"
                placeholder="Select"
                size="large"
                @change="handlegameStatusChange()"
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
              v-model="maintenance_date_range"
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
                :on-preview="handleCoverPictureCardPreview"
                :on-remove="handleCoverRemove"
                :headers="{ Authorization: user.token }"
              >
                <div style="display: grid; justify-items: center">
                  <el-icon><Plus /></el-icon>
                  <el-text>添加300*300</el-text>
                  <el-text>小于150K图片</el-text>
                </div>
              </el-upload>

              <el-dialog v-model="dialogCoverVisible">
                <img w-full :src="dialogCoverImageUrl" alt="Preview Image" />
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
                  v-for="(item, index) in gameInformation.game_tag"
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
              <el-check-tag
                v-for="(tag, index) in dynamicGameTags"
                :key="tag"
                size="large"
                style="margin-left: 15px"
                :checked="tag_status[index]"
                @change="handleGameTagSelectionChange(index)"
                type="warning"
              >
                {{ tag }}
              </el-check-tag>
              <el-input
                v-if="inputGameTagVisible"
                ref="inputGameTagRef"
                v-model="inputGameTagValue"
                class="w-20"
                size="large"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
                style="margin-left: 15px"
              />
            </div>
            <div class="add-tag-btn">
              <el-button
                class="tab-button"
                :type="isTabPanelShow == true ? 'warning' : ''"
                @click="showInput"
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
