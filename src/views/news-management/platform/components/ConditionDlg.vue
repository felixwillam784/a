<script setup lang="ts">
import { ref } from "vue";

const is_show_dialog = ref(false);
const show_dialog = (op: boolean) => {
  is_show_dialog.value = op;
};

defineExpose({
  show_dialog,
});

let tag_names = [
  "VIP等级",
  "提款次数",
  "存款次数",
  "存款金额",
  "提款金额",
  "客损金额",
  "注册时间",
];
</script>
<template>
  <el-dialog v-model="is_show_dialog" title="添加消息发送限制条件" align-center>
    <el-row>
      <span style="display: flex; align-items: center">限制条件</span>
      <div class="drp-box"></div>
    </el-row>
    <el-row class="big-box" v-for="(item, index) in tag_names" :key="index">
      <div class="right-box">
        <el-checkbox></el-checkbox>
        <p style="margin-left: 10px; font-weight: bold">{{ item }}</p>
      </div>
      <div class="right-box">
        <p style="width: 20%">{{ item }}</p>
        <div v-if="index != 6" style="width: 30%">
          <el-button>&lt;</el-button>
          <el-button>=</el-button>
          <el-button>&gt;</el-button>
        </div>
        <el-input
          v-if="index != 6"
          placeholder="请输入VIP等级，默认为0"
          style="width: 50%"
        ></el-input>
        <el-date-picker
          v-else
          type="daterange"
          range-separator="-"
          value-format="YYYY-MM-DD"
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
</style>
