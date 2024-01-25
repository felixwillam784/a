<script setup lang="ts">
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ActionSetting from "./components/setting/action.vue";
import LevelSetting from "./components/setting/level.vue";

const router = useRouter();
const goBack = () => {
  router.push({ name: "AgencyRiskControl" });
};

const tab_index = ref(0);
const select_tab = (index: number) => {
  tab_index.value = index;
};
</script>
<template>
  <div class="app-container">
    <div style="margin-bottom: 15px">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
    <el-card>
      <div style="display: flex; justify-content: space-between">
        <div>
          <el-button :type="tab_index == 0 ? 'warning' : ''" @click="select_tab(0)"
            >风控行为设置</el-button
          >
          <el-button :type="tab_index == 1 ? 'warning' : ''" @click="select_tab(1)"
            >风控等级设置</el-button
          >
        </div>
        <div>
          <el-button v-if="tab_index == 1">添加等级</el-button>
          <el-button>修改日志</el-button>
          <el-button>Excel导入</el-button>
          <el-button>Excel导出</el-button>
        </div>
      </div>
      <ActionSetting v-if="tab_index == 0" />
      <LevelSetting v-if="tab_index == 1" />
    </el-card>
  </div>
</template>
<style lang="scss">
.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
  gap: 10px;
  align-items: center;
  .left {
    width: 10%;
  }
  .right {
    width: 90%;
    .line {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      .content {
        display: flex;
        width: 90%;
        .edit {
          width: 50%;
        }
      }
    }
  }
}
.big_row {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.sub_row {
  /* Style for even elements in the group */
  background-color: #ccc;
}
</style>
