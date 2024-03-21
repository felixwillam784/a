<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :sx="24">
        <div class="flex justify-end items-center">
          <el-button @click="dialogGroupVisible = true">活动分组管理</el-button>
          <el-button>新增活动广告页面配置</el-button>
          <el-button>Excel导入</el-button>
          <el-button>Excel导出</el-button>
        </div>
        <el-card class="mt-4">
          <el-table
            :data="promotionList"
            style="width: 100%;"
            v-loading="loading"
            v-horizontal-scroll
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              label="活动广告页面ID"
              align="center"
              prop="id"
            />
            <el-table-column
              label="活动名称"
              align="center"
              prop="name"
            />
            <el-table-column
              label="活动描述"
              align="center"
              prop="desc"
            />
            <el-table-column
              label="活动分组"
              align="center"
              prop="group_name"
            />
            <el-table-column
              label="关联活动管理的ID"
              align="center"
              prop="activity_id"
            />
            <el-table-column
              label="广告图资源"
              align="center"
              prop="id"
              width="100"
            >
              <template #default="scope">
                <div class="relative">
                  <p class="px-4 py-2 border border-black bg-white">
                    图片
                  </p>
                  <el-icon 
                    class="absolute right-1 cursor-pointer bottom-1"
                    @click="openPreview(scope.row.image)"  
                  ><View /></el-icon>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="广告图资源"
              align="center"
              prop="id"
              width="100"
            >
              <template #default="scope">
                <div class="relative">
                  <p class="px-4 py-2 border border-black bg-white">
                    图片
                  </p>
                  <el-icon 
                    class="absolute right-1 cursor-pointer bottom-1"
                    @click="openPreview(scope.row.image)"  
                  ><View /></el-icon>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="广告图资源"
              align="center"
              prop="id"
              width="100"
            >
              <template #default="scope">
                <div class="relative">
                  <p class="px-4 py-2 border border-black bg-white">
                    图片
                  </p>
                  <el-icon 
                    class="absolute right-1 cursor-pointer bottom-1"
                    @click="openPreview(scope.row.image)"  
                  ><View /></el-icon>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="活动名称"
              align="center"
              prop="name"
            />
            <el-table-column
              label="内容"
              align="center"
              prop="content"
            />
            <el-table-column
              label="备注"
              align="center"
              prop="remark"
            />
            <el-table-column label="状态" align="center">
              <template #default="scope">
                <el-switch
                  size="large"
                  :value="scope.row.status"
                  inline-prompt
                  disabled
                  active-text="开"
                  inactive-text="关"
                  class="ms-2 mr-2"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              align="center"
              prop=""
              width="180"
            >
              <template #default="scope">
                <el-button>详情</el-button>
                <el-button>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogCoverVisible">
      <img w-full :src="dialogCoverImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-dialog title="活动分组管理" v-model="dialogGroupVisible">
      <el-form
        label-width="120px"
        label-position="left"
        class="h-200"
      >
        <el-form-item label="广告图ID" class="w-full">
          <el-row :gutter="20" class="w-full">
            <el-col :span="18">
              <el-input
                label="First Name"
                placeholder="First Name"
              />
            </el-col>
            <el-col :span="6" class="flex justify-between">
              <el-button>更新</el-button>
              <el-button>删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import { computed, onMounted, ref } from 'vue';
import * as Promotion from '@/interface/promotion';
import { tableRowClassName } from './utils';
import { ElMessage } from 'element-plus';
import { View } from '@element-plus/icons-vue';

const { promotion } = useStore();

//ref and reactive variables
const loading = ref(false);
const dialogCoverVisible = ref(false);
const dialogCoverImageUrl = ref('');
const dialogGroupVisible = ref(false);
//computed variables
const success = computed<boolean>(() => {
  return promotion.getSuccess;
})

const errMsg = computed<string>(() => {
  return promotion.getErrMessage;
})

const promotionList = computed<Array<Promotion.PromotionListData>>(() => {
  return promotion.getPromotionList;
})

//actions
const getPromotionList = async () => {
  loading.value = true;
  await promotion.dispatchPromotionList();
  if (!success.value)
    ElMessage.error(errMsg.value);
  loading.value = false;
}

const openPreview = (img: string) => {
  dialogCoverImageUrl.value = img;
  dialogCoverVisible.value = true;
}
//lifeCycle
onMounted(() => {
  getPromotionList();
})
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>