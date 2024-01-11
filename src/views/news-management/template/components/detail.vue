<script setup lang="ts">
import { ref } from "vue";
const dialog_mode = ref(false);

interface GetNewsTemplate {
  news_id: number;
  news_name: string;
  news_type: number;
  news_event: number;
  news_content: string;
  news_remark: string;
}

const template_item = ref<GetNewsTemplate>({
  news_id: 1111,
  news_name: "存款短信",
  news_type: 1,
  news_event: 2,
  news_content: "恭喜您在存款成功…",
  news_remark: "备注",
});

let type_last_number: Array<number>;
let original_id: number;

const set_dialog_mode = (op: boolean, type_last: Array<number>, id: number) => {
  dialog_mode.value = op;
  type_last_number = type_last;
  original_id = id;
  if (original_id == -1) {
    template_item.value.news_id =
      template_item.value.news_type * 1000 +
      type_last_number[template_item.value.news_type] +
      1;
  } else {
    template_item.value.news_id = original_id;
  }
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

const handle_type_option_change = (value: number) => {
  if (original_id == -1) {
    template_item.value.news_id = value * 1000 + type_last_number[value] + 1;
  } else {
    if (Math.floor(original_id / 1000) == value)
      template_item.value.news_id = original_id;
    else template_item.value.news_id = value * 1000 + type_last_number[value] + 1;
  }
};
defineExpose({
  set_dialog_mode,
});
</script>

<template>
  <el-dialog v-model="dialog_mode" title="修改消息模版">
    <el-row>
      <el-col :span="6" class="detail-item-left-bg">消息ID</el-col>
      <el-col :span="18" class="detail-item-right-bg">
        <el-input v-model="template_item.news_id" disabled />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="detail-item-left-bg">消息名称</el-col>
      <el-col :span="18" class="detail-item-right-bg">
        <el-input v-model="template_item.news_name" placeholder="请输入消息名称" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6" class="detail-item-left-bg">消息分组</el-col>
      <el-col :span="18" class="detail-item-right-bg">
        <el-select
          v-model="template_item.news_type"
          placeholder="请选择消息分组"
          style="width: 100%"
          @change="handle_type_option_change"
        >
          <el-option
            v-for="(item, i) in type_options"
            :label="item"
            :value="i + 1"
            :key="i"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="detail-item-left-bg">消息事件</el-col>
      <el-col :span="18" class="detail-item-right-bg">
        <el-select
          v-model="template_item.news_event"
          placeholder="请选择消息事件"
          style="width: 100%"
        >
          <el-option
            v-for="(item, i) in event_options[template_item.news_type]"
            :label="item"
            :value="i + 1"
            :key="i"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6" class="detail-item-left-bg">消息内容</el-col>
    </el-row>
    <el-row>
      <el-input
        type="textarea"
        v-model="template_item.news_content"
        :rows="5"
        placeholder="请输入消息内容"
      >
      </el-input>
    </el-row>
    <el-row style="font-size: 20px; margin-top: 50px"> 备注 </el-row>
    <el-row>
      <el-input type="textarea" v-model="template_item.news_remark" :rows="5"> </el-input>
    </el-row>

    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary">确认修改</el-button>
        <el-button>取消修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.detail-item-left-bg {
  background-color: #f5f7fa;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  height: 36px;
}

.detail-item-right-bg {
  border: 1px solid gray;
  display: flex;
  align-items: center;
  padding: 0px 0px;
  height: 36px;
}
</style>
