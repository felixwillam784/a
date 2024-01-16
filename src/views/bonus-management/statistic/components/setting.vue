<script setup lang="ts">
import { onMounted, ref } from "vue";
import ConditionDialog from "./ConditionDlg.vue";

const dialog_mode = ref(0);

const set_dialog_mode = (op: number) => {
  console.log(op);
  dialog_mode.value = op;
};

const collapse_open = ref([0, 1, 2, 3, 4, 5, 6, 7]);

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

const ConditionDialogRef = ref();
const show_condition_dialog = () => {
  ConditionDialogRef.value.show_dialog(true);
};

defineExpose({
  set_dialog_mode,
});
</script>

<template>
  <el-card style="margin-top: 10px">
    <el-collapse v-model="collapse_open">
      <el-collapse-item
        v-for="(item, index) in type_options"
        :key="index"
        :title="item"
        :name="index"
      >
        <div class="dl_row" v-for="(it, ind) in event_options[index]" :key="ind">
          <p style="width: 20%">
            {{ it }}
          </p>
          <el-select placeholder="请选择消息分组" style="width: 20%">
            <el-option
              v-for="(jtem, j) in type_options"
              :label="jtem"
              :value="j + 1"
              :key="j"
            ></el-option>
          </el-select>
          <div style="width: 20%; display: flex">
            <div class="drop-box">添加发送限制条件</div>
            <el-button class="circular-button" @click="show_condition_dialog"
              >+</el-button
            >
          </div>
          <el-select
            placeholder="请选择发送商户"
            style="width: 20%"
            v-if="dialog_mode != 0"
          >
            <el-option
              v-for="(jtem, j) in type_options"
              :label="jtem"
              :value="j + 1"
              :key="j"
            ></el-option>
          </el-select>
          <el-date-picker
            style="width: 20%"
            type="daterange"
            range-separator="至"
            value-format="YYYY-MM-DD"
            start-placeholder="设定发送时间"
            end-placeholder="设定发送时间"
          ></el-date-picker>
        </div>
      </el-collapse-item>
    </el-collapse>

    <ConditionDialog ref="ConditionDialogRef" />
  </el-card>
</template>

<style lang="scss">
.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.dl_row:nth-child(2n + 1) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n) {
  /* Style for even elements in the group */
  background-color: #ccc;
}
.circular-button {
  border-radius: 50%;
  width: 30px; /* Adjust the size as per your requirement */
  height: 30px; /* Adjust the size as per your requirement */
  padding: 0;
  line-height: 40px;
}
.drop-box {
  border: 1px solid #ccc;
  width: 80%;
  height: 33px;
  background: white;
  border-radius: 4px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
}
</style>
