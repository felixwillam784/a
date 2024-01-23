<script setup lang="ts">
import { ref } from "vue";
const temp_list = ref<Array<any>>([{}]);

const is_show_release_dialog = ref(false);
const show_release_dialog = () => {
  is_show_release_dialog.value = true;
};
</script>

<template>
  <el-table :data="temp_list">
    <el-table-column align="center" label="UserID">
      <template #header>
        <el-checkbox />
        UserID
      </template>
      <template #default>
        <el-checkbox></el-checkbox>
        User1001
      </template>
    </el-table-column>
    <el-table-column align="center" label="用户标签"></el-table-column>
    <el-table-column align="center" label="风控等级">
      <template #default>
        <el-select></el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="风控行为"></el-table-column>
    <el-table-column align="center" label="风控时间"></el-table-column>
    <el-table-column align="center" label="移入白名单时间"></el-table-column>
    <el-table-column align="center" label="操作人员"></el-table-column>
    <el-table-column align="center" label="备注"></el-table-column>
    <el-table-column align="center" label="操作" width="180px">
      <el-button type="primary" link>详情</el-button>
      <el-button type="danger" link @click="show_release_dialog">解除风控</el-button>
      <el-button type="primary" link>日志</el-button>
    </el-table-column>
  </el-table>

  <el-dialog v-model="is_show_release_dialog">
    <div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <p style="font-size: 20px; font-weight: bold">移除白名单</p>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <p style="font-size: 15px">代理将会被移除白名单</p>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: center; width: 100%"
      >
        <div style="width: 100%">
          <p>备注</p>
        </div>
        <el-input type="textarea" :rows="6"></el-input>
      </div>
    </div>
    <template #footer>
      <div style="justify-content: center; display: flex">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss"></style>
