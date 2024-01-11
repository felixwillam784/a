<script setup lang="ts">
import { ref } from "vue";
import { Search, Refresh, Upload, Plus } from "@element-plus/icons-vue";
import NewTemplateDetail from "./components/detail.vue";

interface GetNewsTemplate {
  news_id: number;
  news_name: string;
  news_type: number;
  news_event: number;
  news_content: string;
  news_remark: string;
}

const DetailDialogRef = ref();
const news_template_list = ref<Array<GetNewsTemplate>>([
  {
    news_id: 1001,
    news_name: "存款短信",
    news_type: 1,
    news_event: 1,
    news_content: "恭喜您在存款成功…",
    news_remark: "备注",
  },
]);
const formData = ref<any>({
  news_name: "",
  news_type: "",
  news_event: "",
});

const get_news_count_for_type = () => {
  let res = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  news_template_list.value.forEach((element) => {
    res[Math.floor(element.news_id / 1000)] = element.news_id % 1000;
  });
  return res;
};

const edit_detail = (data: GetNewsTemplate) => {
  DetailDialogRef.value.set_dialog_mode(true, get_news_count_for_type(), data.news_id);
};
const add_template = () => {
  DetailDialogRef.value.set_dialog_mode(true, get_news_count_for_type(), -1);
};

const type_options = ref<Array<string>>([
  "充值",
  "提款",
  "注册",
  "个人信息",
  "VIP",
  "Affiliate",
  "Other",
  "Manually",
]);
const event_options = ref<Array<Array<string>>>([
  [],
  ["新存款", "存款完成", "存款失败"],
  [
    "新提款",
    "提款完成",
    "提款失败",
    "退款（提款拒绝等原因",
    "取消提款",
    "提款订单确认，但是未完成",
  ],
  ["邮箱确认", "注册完成", "邮箱验证提醒", "注册信息验证"],
  [
    "密码找回",
    "重置密码邮件",
    "邮箱已变更确认通知邮件",
    "个人信息更改通知邮件",
    "自我禁赌设置提醒",
    "自我禁赌解禁提醒",
    "身份信息验证成功邮件",
    "身份信息验证失败邮件",
    "邮箱变更申请",
    "邮箱验证",
    "异常登录提醒",
    "手机号验证",
    "2FA密钥更改",
  ],
  [
    "VIP升级",
    "VIP 降级",
    "收到VIP奖金",
    "锦标赛结算提醒",
    "VIP打码返利通知",
    "VIP客损补偿返利通知",
    "生日礼包通知",
  ],
  ["推荐奖励", "代理收益", "独立代理后台注册", "独立代理后台密码重置"],
  ["参与客损返利通知", "获得免费次数通知", "奖金打码任务完成", "奖金打码任务完成"],
  ["促销活动", "周年活动", "生日礼包", "客损补偿通知"],
]);
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <div class="search">
          <el-form :model="formData" :inline="true" label-width="120" class="form_row">
            <div>
              <el-form-item label="用户账号" prop="news_name">
                <el-input v-model="formData.news_name" placeholder="请输入消息名称" />
              </el-form-item>
              <el-form-item label="客户昵称" prop="news_type">
                <el-select v-model="formData.news_type" placeholder="请选择消息分组">
                  <el-option
                    v-for="(item, i) in type_options"
                    :label="item"
                    :value="i + 1"
                    :key="i"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="提款账号" prop="news_event">
                <el-select v-model="formData.news_event" placeholder="请选择消息事件">
                  <el-option
                    v-for="(item, i) in event_options[formData.news_type]"
                    :label="item"
                    :value="i + 1"
                    :key="i"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-form-item>
              <el-button :icon="Plus" @click="add_template">新增消息模版</el-button>
            </el-form-item>
          </el-form>
          <div
            style="
              display: flex;
              justify-content: flex-end;
              padding-right: 20px;
              padding-bottom: 15px;
            "
          >
            <el-button>Excel导入</el-button>
            <el-button>Excel导出</el-button>
          </div>
        </div>

        <el-card>
          <el-table :data="news_template_list">
            <el-table-column label="消息ID" align="center" prop="news_id">
            </el-table-column>
            <el-table-column label="消息名称" align="center" prop="news_name">
            </el-table-column>
            <el-table-column label="消息分组" align="center" prop="news_type">
              <template #default="scope">
                {{ type_options[scope.row.news_type] }}
              </template>
            </el-table-column>
            <el-table-column label="消息事件" align="center" prop="news_event">
              <template #default="scope">
                {{ event_options[scope.row.news_type][scope.row.news_event] }}
              </template>
            </el-table-column>
            <el-table-column label="消息内容" align="center" prop="news_content">
            </el-table-column>
            <el-table-column label="备注" align="center" prop="news_remark">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button link type="primary" @click="edit_detail(scope.row)"
                  >修改</el-button
                >
                <el-button link type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <NewTemplateDetail ref="DetailDialogRef" />
  </div>
</template>

<style lang="scss">
.form_row {
  display: flex;
  justify-content: space-between;
}
</style>
