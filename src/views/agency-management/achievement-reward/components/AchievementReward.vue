<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";

const props = defineProps<{
  achievementRewardDialog: boolean;
  achievementRewardCollectionDialog: boolean;
}>();
const { achievementRewardDialog, achievementRewardCollectionDialog } = toRefs(props);

const emit = defineEmits<{
  (e: "closeAchievementRewardDialog"): void;
  (e: "closeAchievementRewardCollectionDialog"): void;
}>();

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const loading = ref<boolean>(false);

const achievementRewardDialogVisible = ref<boolean>(false);

const achievementRewardCollectionDialogVisible = ref<boolean>(false);

const total_count = ref<number>(0);

const firstLevelAgentList = ref<Array<any>>([
  {
    item_1: 1,
    item_2: 9999,
    item_3: 9999,
    item_4: 9999,
  },
]);

const dialogTitle = ref<string>("代理成就详情");

const handlePagination = () => {};

const showAchievementRewardDialog = () => {
  dialogTitle.value = "代理成就详情";
  achievementRewardDialogVisible.value = true;
};

watch(achievementRewardDialog, (value) => {
  dialogTitle.value = "新增代理成就";
  achievementRewardDialogVisible.value = value;
});

watch(achievementRewardDialogVisible, (value) => {
  if (!value) {
    emit("closeAchievementRewardDialog");
  }
});

watch(achievementRewardCollectionDialog, (value) => {
  achievementRewardCollectionDialogVisible.value = value;
});

watch(achievementRewardCollectionDialogVisible, (value) => {
  if (!value) {
    emit("closeAchievementRewardCollectionDialog");
  }
});
</script>

<template>
  <el-table
    v-loading="loading"
    :data="firstLevelAgentList"
    style="width: 100%"
    class="mt-2"
  >
    <el-table-column label="ID" align="center" prop="item_1">
      <template #default="scope">
        <el-link :underline="false" class="el-link-decoration">
          {{ scope.row.item_1 }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="邀请人数条件" align="center" prop="item_2">
      <template #default="scope">
        <p>{{ scope.row.item_2 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="邀请奖励金额" align="center" prop="item_3">
      <template #default="scope">
        <p>{{ scope.row.item_3 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="打码倍率" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" link @click="showAchievementRewardDialog">
          详情
        </el-button>
        <el-button type="danger" link> 删除 </el-button>
        <el-button type="primary" link> 日志 </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="float: right">
    <pagination
      :total="total_count"
      v-model:page="formData.pageNum"
      v-model:limit="formData.pageSize"
      @pagination="handlePagination"
    />
  </div>
  <el-dialog :title="dialogTitle" v-model="achievementRewardDialogVisible">
    <el-form label-width="200">
      <el-row class="bg-neutral-200 achievement-reward-dialog">
        <el-form-item label="ID">
          <el-input class="w-400" />
        </el-form-item>
      </el-row>
      <el-row class="bg-neutral-400 achievement-reward-dialog">
        <el-form-item label="邀请人数条件">
          <el-input class="w-200" placeholder="请输入邀请人数条件" />
        </el-form-item>
      </el-row>
      <el-row class="bg-neutral-400 achievement-reward-dialog">
        <el-form-item label="邀请奖励金额">
          <el-input class="w-400" placeholder="请输入邀请奖励金额" />
        </el-form-item>
      </el-row>
      <el-row class="bg-neutral-400 achievement-reward-dialog">
        <el-form-item label="需求打码倍率">
          <el-input class="w-400" placeholder="请输入需求打码倍率" />
        </el-form-item>
      </el-row>
    </el-form>
    <el-footer class="text-center mt-6">
      <el-button type="primary">确认</el-button>
      <el-button @click="achievementRewardDialogVisible = false">取消</el-button>
    </el-footer>
  </el-dialog>
  <el-dialog
    title="代理成就阶段奖励设置"
    v-model="achievementRewardCollectionDialogVisible"
  >
    <el-form label-width="200">
      <el-row class="bg-neutral-200 achievement-reward-dialog pa-2">
        <el-form-item label="返利领取方式">
          <el-radio-group>
            <el-radio :label="1">玩家手动领取</el-radio>
            <el-radio :label="2">结算时自动到账</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row class="bg-neutral-400 achievement-reward-dialog pa-2" style="height: 80px">
        <el-form-item label="返利结算周期">
          <el-radio-group>
            <el-radio :label="1">实时结算</el-radio>
            <el-radio :label="2">每日刷新结算</el-radio>
            <el-radio :label="3">每周刷新结算</el-radio>
            <el-radio :label="4">每月刷新结算</el-radio>
            <el-radio :label="5">
              <el-input placeholder="请输入天数" />天后刷新结算
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row class="bg-neutral-400 achievement-reward-dialog pa-2">
        <el-form-item label="奖励释放周期">
          <el-radio-group>
            <el-radio :label="1">不释放</el-radio>
            <el-radio :label="5">
              释放
              <el-input placeholder="请输入自动释放天数" />
              天后释放
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <div class="bg-neutral-400 achievement-reward-dialog pa-2" style="height: 88px">
        <el-form-item label="有效用户条件">
          <el-row>
            完成充值
            <el-input placeholder="请输入充值金额" class="w-64 mx-1" />
            后认为是有效用户
          </el-row>
        </el-form-item>
        <el-form-item label=" " class="mt-2">
          完成打码
          <el-input placeholder="请输入打码量" class="w-64 mx-1" />
          后认为是有效用户
        </el-form-item>
      </div>
    </el-form>
    <el-footer class="text-center mt-6">
      <el-button type="primary">确认</el-button>
      <el-button @click="achievementRewardCollectionDialogVisible = false"
        >取消</el-button
      >
    </el-footer>
  </el-dialog>
</template>

<style lang="scss">
.achievement-reward-dialog {
  margin-bottom: 10px;
  align-items: center;
  height: 50px;
  .el-form-item--default {
    margin-bottom: 0px !important;
  }
  .el-form-item__label {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
