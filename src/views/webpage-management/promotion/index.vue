<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :sx="24">
        <div class="flex justify-end items-center">
          <el-button @click="openPromotionGroupDlg">活动分组管理</el-button>
          <el-button @click="openPromotionGlg">新增活动广告页面配置</el-button>
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
              label="活动中心广告图资源"
              align="center"
              prop="id"
              width="100"
            >
            <template #default="scope">
                <div class="relative">
                  <div class="w-full">
                    <img class="w-full h-auto" :src="getImagePath(scope.row.image_path)" :alt="scope.row.image_path">
                  </div>
                  <el-icon
                    class="absolute text-black text-lg right-1 cursor-pointer bottom-2"
                    @click="openPreview(scope.row.image_path)"
                    ><View
                  /></el-icon>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="界面内广告图资源"
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
              label="按钮资源"
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
        <el-form-item 
          v-for='groupData in formGroupData'
          :key="groupData.id" 
          :label="`活动分组 ${groupData.id ? groupData.id : ''}：`" 
          class="w-full"
        >
          <el-row :gutter="20" class="w-full">
            <el-col :span="18">
              <el-input
                v-model="groupData.name"                
              />
            </el-col>
            <el-col :span="6" class="flex justify-between">
              <el-button
                @click="handleDeleteGroupData(groupData.id, groupData.name)"
              >
                删除
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          @click="handleNewGroupData"
        >
          新增活动分组
        </el-button>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleUpdateGroupData">确认</el-button>
          <el-button @click="dialogGroupVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogPromotionVisible"
      :title="dialogPromotionTitle"
    >
      <el-form
        label-width="160px"
        label-position="left"
        :modal="formData"
        >
        <el-form-item 
          label="广告页面ID" 
          prop="id"
          :rules="[{ required: true, message: 'Id is required'}]"
        >
          <el-input 
            v-model="formData.id" 
            disabled
          />
        </el-form-item>
        <el-form-item 
          label="活动名称（活动标题）" 
          prop="name"
          :rules="[{ required: true, message: 'Id is required'}]"
        >
          <el-input 
            v-model="formData.name" 
            placeholder="请输入活动名称"
          />
        </el-form-item>
        <el-form-item 
          label="活动描述" 
          :rules="[{ required: true, message: 'Id is required'}]"
        >
          <el-input 
            v-model="formData.desc" 
            placeholder="请输入活动描述"
            />
        </el-form-item>
        <el-form-item 
          label="关联的活动ID" 
          :rules="[{ required: true, message: 'Id is required'}]"
        >
          <el-input 
            v-model="formData.activity_id"
            placeholder="请输入关联的活动ID" 
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store';
import { computed, onMounted, reactive, ref } from 'vue';
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
const dialogPromotionVisible = ref(false);

const formData: Promotion.PromotionListData = reactive({} as Promotion.PromotionListData);
const formGroupData = ref<Array<Promotion.PromotionGroupData>>([] as Array<Promotion.PromotionGroupData>);

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

const dialogPromotionTitle = computed(() => {
  return formData.id ? "广告页面详情" : "新增广告页面";
});
//actions
const getPromotionList = async () => {
  loading.value = true;
  await promotion.dispatchPromotionList();
  if (!success.value)
    ElMessage.error(errMsg.value);
  loading.value = false;
}

const getPromotionGroupList = async () => {
  loading.value = true;
  await promotion.dispatchPromotionGroupList();
  if (!success.value)
    ElMessage.error(errMsg.value);
  formGroupData.value = promotion.getPromotionGroupList;
  loading.value = false;
}

const handleNewGroupData = () => {
  formGroupData.value.push({name: ''})
}

const handleUpdateGroupData = async () => {
  loading.value = true;
  await promotion.dispatchPromotionGroupUpdate(formGroupData.value);
  if (!success.value)
    ElMessage.error(errMsg.value);
  getPromotionGroupList();
  loading.value = false;
}

const handleDeleteGroupData = async (id = 0, name = '') => {
  if(id) {
    formGroupData.value = formGroupData.value.filter(item => item.id !== id);
  }
  else {
    formGroupData.value = formGroupData.value.filter(item => item.name !== name);
  }
}

const getImagePath = (img: string) => {
  const baseURL = import.meta.env.VITE_APP_BASE;
  return  `${baseURL}/res/${img}`;
}

const openPreview = (img: string) => {
  dialogCoverImageUrl.value = img;
  dialogCoverVisible.value = true;
}

const openPromotionGroupDlg = () => {
  getPromotionGroupList();
  dialogGroupVisible.value = true;
}

const openPromotionGlg = (id = 0) => {
  if (id) {

  } 
  dialogPromotionVisible.value = true;
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