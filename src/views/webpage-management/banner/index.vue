<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :sx="24">
        <div class="flex justify-end items-center">
          <el-button @click="onNewBanner">新增广告图配置</el-button>
          <el-button>Excel导入</el-button>
          <el-button>Excel导出</el-button>
        </div>
        <el-card class="mt-4">
          <el-table
            :data="bannerList"
            style="width: 100%"
            v-loading="loading"
            v-horizontal-scroll
            :row-class-name="tableRowClassName"
          >
            <el-table-column label="广告图ID" align="center" prop="id" />
            <el-table-column label="活动名称" align="center" prop="name" />
            <el-table-column label="活动描述" align="center" prop="desc" />
            <el-table-column label="广告图排序" align="center" prop="sort" />
            <el-table-column
              label="点击反馈"
              align="center"
              prop="click_feedback"
              width="150"
            >
              <template #default="scope">
                {{
                  FeedbackOption.find((item) => item.value === scope.row.click_feedback)
                    ?.label
                }}
              </template>
            </el-table-column>
            <el-table-column label="内容" align="center" prop="content" />
            <el-table-column label="出现条件" align="center" prop="condition" />
            <el-table-column label="广告图资源" align="center" prop="id" width="100">
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
            <el-table-column label="关联活动管理的ID" align="center" prop="activity_id" />
            <el-table-column label="自动上架下架时间" align="center" prop="" width="200">
              <template #default="scope">
                <p>
                  {{ dayjs(scope.row.on_time).format("YYYY-MM-DD HH:mm:ss") }} <br />
                  {{ dayjs(scope.row.off_time).format("YYYY-MM-DD HH:mm:ss") }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remark" />
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
            <el-table-column label="备注" align="center" prop="" width="180">
              <template #default="scope">
                <el-button @click="handleBannerDetail(scope.row.id)">详情</el-button>
                <el-button @click="handleBannerDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="BannerDlgTitle"
      v-model="BannerDlgVisible"
      width="800px"
      append-to-body
      @close="onCloseBannerDlg"
    >
      <el-form
        label-width="160px"
        label-position="left"
        :model="formData"
        ref="formDataRef"
        class="h-200"
        :rules="NewBannerRules"
      >
        <el-form-item 
          label="广告图ID" 
          prop="id"
          :rules="
          [
            { required: true, message: 'Id is required'},
          ]
          "
        >
          <el-input 
            v-model="formData.id" 
            :disabled="!isEdit" 
            :rules="[
              { required: true, message: 'Id is required'},
            ]"
          />
        </el-form-item>
        <el-form-item 
          label="活动名称" 
          prop="name"
          :rules="[
            { required: true, message: 'Id is required'},
          ]"  
        >
          <el-input v-model="formData.name" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item 
          label="活动描述" prop="desc"
          :rules="[
            { required: true, message: 'Id is required'},
          ]"
        >
          <el-input v-model="formData.desc" placeholder="请输入活动描述" />
        </el-form-item>
        <el-form-item 
          label="广告图排序" 
          prop="sort"
          :rules="
          [
            { required: true, message: 'Id is required'},
          ]
          "
        >
          <el-input
            v-model="formData.sort"
            type="number"
            placeholder="请输入广告图排序"
          />
        </el-form-item>
        <!-- <el-form-item label="出现条件">
          <el-input v-model="formData.id" placeholder="请输入广告图排序"/>
          <el-input v-model="formData.id" placeholder="请输入广告图排序"/>
        </el-form-item> -->
        <el-form-item label="点击反馈" prop="click_feedback">
          <el-radio-group v-model="formData.click_feedback">
            <el-radio
              v-for="items in FeedbackOption"
              :key="items.id"
              :label="items.value"
            >
              {{ items.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item 
          label="内容" 
          prop="content"
          :rules="[
            { required: true, message: 'Id is required'},
          ]"
        >
          <el-input
            v-model="formData.content"
            type="textarea"
            placeholder="请输入广告图排序"
          />
        </el-form-item>
        <el-form-item label="链接打开方式" prop="target">
          <el-radio-group v-model="formData.target">
            <el-radio :label="0">当前界面打开</el-radio>
            <el-radio :label="1">新的界面打开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动上架，下架时间" prop="on_time">
          <el-date-picker
            type="daterange"
            v-model="timeVal"
            range-separator="至"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="广告图资源" prop="image">
          <el-upload
            :http-request="handleUpload"
            list-type="picture-card"
            :before-upload="handleBeforeUpload"
          >
            <div style="display: grid; justify-items: center">
              <el-icon><Plus /></el-icon>
              <el-text>点击上传</el-text>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item 
          label="关联活动管理ID" 
          prop="activity_id"
          :rules="
          [
            { required: true, message: 'Id is required'},
          ]
          "  
        >
          <el-input type="number" v-model="formData.activity_id" placeholder="请输入关联活动的ID" />
        </el-form-item>
        <el-form-item label="链接打开方式">
          <el-radio-group v-model="formData.is_disappear">
            <el-radio :label="0">消失</el-radio>
            <el-radio :label="1">不消失</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item 
          label="参与活动广告图消失后替换的广告图ID" 
          prop="replace_id"
          :rules="
          [
            { required: true, message: 'Id is required'},
          ]
          "  
        >
          <el-input
            type="number"
            v-model="formData.replace_id"
            placeholder="请输入关联的广告图ID"
          />
        </el-form-item>
        <el-form-item 
          label="备注" 
          prop="remark"
          :rules="[
            { required: true, message: 'Id is required'},
          ]"
        >
          <el-input v-model="formData.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="广告图状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="false">暂时停用</el-radio>
            <el-radio :label="true">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(formDataRef)">确认</el-button>
          <el-button @click="onCloseBannerDlg">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogCoverVisible">
      <div class="w-full">
        <img class="w-full h-auto" :src="dialogCoverImageUrl" alt="Preview Image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useStore from "@/store";
import * as Banner from "@/interface/banner";
import { computed, onMounted, reactive, ref } from "vue";
import {
  ElMessage,
  dayjs,
  ElRadio,
  ElRadioGroup,
  UploadRequestOptions,
  FormInstance,
} from "element-plus";
import { FeedbackOption } from "./utils";
import { NewBannerRules } from "./utils";
import { Plus, View } from "@element-plus/icons-vue";
import { uploadBannerFileApi } from "@/api/file";

const { banner } = useStore();
//ref and reactive variables
const loading = ref(false);
const isEdit = ref(false);
const BannerDlgVisible = ref(false);
const dialogCoverVisible = ref(false);
const dialogCoverImageUrl = ref("");
const formData: Banner.BannerListData = reactive({} as Banner.BannerListData);
const formDataRef = ref<FormInstance>();
const timeVal = ref<string[]>(["", ""]);
const selectedImage = ref<File | null>(null);
//computed variables
const success = computed<boolean>(() => {
  return banner.getSuccess;
});
const errMsg = computed<string>(() => {
  return banner.errMessage;
});
const bannerList = computed<Array<Banner.BannerListData>>(() => {
  return banner.getBannerList;
});
const BannerDlgTitle = computed<string>(() => {
  return isEdit.value ? "广告页面详情" : "新增广告页面";
});
//actions
const getBannerList = async () => {
  loading.value = true;
  await banner.dispatchBannerList();
  if (!success.value) ElMessage.error(errMsg.value);
  loading.value = false;
};

const openPreview = (img: string) => {
  const baseURL = import.meta.env.VITE_APP_BASE;
  dialogCoverImageUrl.value = `${baseURL}/res/${img}`;
  dialogCoverVisible.value = true;
};
const getImagePath = (img: string) => {
  const baseURL = import.meta.env.VITE_APP_BASE;
  return  `${baseURL}/res/${img}`;
}
const onNewBanner = () => {
  formData.id = 0;
  isEdit.value = false;
  BannerDlgVisible.value = true;
};
const onCloseBannerDlg = () => {
  const empty = {} as Banner.BannerListData;
  Object.assign(formData, empty);
  BannerDlgVisible.value = false;
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      if (!formData.image_path || !timeVal.value[0] || !timeVal.value[1] ) {
        ElMessage.warning('Invalid Form');
        return false;
      }
      handleAddOrUpdateBanner();
    } else {
      return false;
    } 
  })
};

const handleAddOrUpdateBanner = async () => {
  loading.value = true;
  formData.on_time = new Date(timeVal.value[0]).getTime() / 1000;
  formData.off_time = new Date(timeVal.value[1]).getTime() / 1000;
  formData.condition = "";
  formData.sort = Number(formData.sort);
  formData.replace_id = Number(formData.replace_id);
  formData.activity_id = Number(formData.activity_id);
  if (formData.id !== 0) {
    await banner.dispatchBannerUpdate(formData);
  } else {
    await banner.dispatchBannerAdd(formData);
  }
  if (!success.value) ElMessage.error(errMsg.value);
  loading.value = false;
  BannerDlgVisible.value = false;
  getBannerList();
}
const handleBannerDetail = async (id: number) => {
  loading.value = true;
  await banner.dispatchBannerDetail({ id: id });
  if (!success.value) ElMessage.error(errMsg.value);
  else {
    Object.assign(formData, banner.getBannerDetail);
    BannerDlgVisible.value = true;
    isEdit.value = true;
  }
  loading.value = false;
};

const handleBannerDelete = async (id: number) => {
  loading.value = true;

  await banner.dispatchBannerDelete({ id });
  if (!success.value) ElMessage.error(errMsg.value);
  loading.value = false;
  getBannerList();
};

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex % 2 === 1) {
    return "warning-row";
  } else {
    return "success-row";
  }
};

const handleBeforeUpload = (file: File) => {
  if (file.size > 2 * 1028 * 1028) {
    ElMessage.warning("上传图片不能大于2M");
    return false;
  }
  selectedImage.value = file;
};
async function handleUpload(options: UploadRequestOptions) {
  const { data: file_name } = await uploadBannerFileApi(options.file);
  formData.image_path = file_name.file_name;
}
//lifecycle
onMounted(() => {
  getBannerList();
});
</script>

<style lang="scss">
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
