<script setup lang="ts">
import { fa } from "element-plus/es/locale";
import { ref } from "vue";

interface MailTriggerCodition {
  is_active: boolean;
  trigger_name: string;
  op: Array<boolean>;
  amount: string;
}
const is_show_dialog = ref(false);
const show_dialog = (op: boolean) => {
  is_show_dialog.value = op;
};

const trigger_condition_list = ref<Array<MailTriggerCodition>>([
  {
    is_active: true,
    trigger_name: "VIP等级",
    op: [true, false, false],
    amount: "",
  },
  {
    is_active: false,
    trigger_name: "提款次数",
    op: [false, false, false],
    amount: "",
  },
  {
    is_active: false,
    trigger_name: "存款次数",
    op: [false, false, false],
    amount: "",
  },
  {
    is_active: false,
    trigger_name: "存款金额",
    op: [false, false, false],
    amount: "",
  },
  {
    is_active: false,
    trigger_name: "提款金额",
    op: [false, false, false],
    amount: "",
  },
  {
    is_active: false,
    trigger_name: "客损金额",
    op: [false, false, false],
    amount: "",
  },
  {
    is_active: false,
    trigger_name: "注册时间",
    op: [false, false, false],
    amount: "",
  },
]);

const op_select_btn_clicked = (group: number, small: number) => {
  trigger_condition_list.value[group].op[small] = !trigger_condition_list.value[group].op[
    small
  ];
  if (trigger_condition_list.value[group].op[small] && small != 1) {
    trigger_condition_list.value[group].op[Math.abs(2 - small)] = false;
  }
};

defineExpose({
  show_dialog,
});
</script>
<template>
  <el-dialog v-model="is_show_dialog" title="添加消息发送限制条件" align-center>
    <el-row>
      <span style="display: flex; align-items: center">限制条件</span>
      <div class="drp-box">
        <div v-for="(item, index) in trigger_condition_list" :key="index">
          <el-tag v-if="item.is_active">{{ item.trigger_name }}</el-tag>
        </div>
      </div>
    </el-row>
    <el-row class="big-box" v-for="(item, index) in trigger_condition_list" :key="index">
      <div class="right-box">
        <el-checkbox v-model="item.is_active"></el-checkbox>
        <p style="margin-left: 10px; font-weight: bold">{{ item.trigger_name }}</p>
      </div>
      <div class="right-box">
        <p style="width: 20%">{{ item.trigger_name }}</p>
        <div v-if="index != 6" style="width: 30%">
          <el-button
            :type="item.op[0] ? 'warning' : ''"
            @click="op_select_btn_clicked(index, 0)"
            >&lt;</el-button
          >
          <el-button
            :type="item.op[1] ? 'warning' : ''"
            @click="op_select_btn_clicked(index, 1)"
            >=</el-button
          >
          <el-button
            :type="item.op[2] ? 'warning' : ''"
            @click="op_select_btn_clicked(index, 2)"
            >&gt;</el-button
          >
        </div>
        <el-input
          v-if="index != 6"
          placeholder="请输入VIP等级，默认为0"
          style="width: 50%"
          v-model="item.amount"
        ></el-input>
        <el-date-picker
          v-else
          type="daterange"
          range-separator="-"
          value-format="YYYY-MM-DD"
          v-model="item.amount"
        ></el-date-picker>
      </div>
    </el-row>

    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary"> 确认添加 </el-button>
        <el-button> 取消添加 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.drp-box {
  border: 1px solid #999;
  width: 90%;
  height: 33px;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 5px;
}
.right-box {
  border: 1px solid #999;
  width: 100%;
  height: 33px;
  display: flex;
  align-items: center;
  padding: 20px;
}
.right-box:nth-child(2) {
  margin-top: 5px;
}
.big-box {
  border: 1px solid #999;
  padding: 5px;
  width: 90%;
  margin-left: 56px;
  margin-top: 10px;
}
.custom-tag {
  background-color: #ff0000; /* specify your desired color */
  color: #ffffff; /* specify the text color */
}
</style>
