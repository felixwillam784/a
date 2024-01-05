<script setup lang="ts">
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { Search, Refresh, Upload, Plus, CopyDocument } from "@element-plus/icons-vue";

const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const activeIndex = ref<number>(0);

const loading = ref<boolean>(false);
const riskControlDetailDialogVisible = ref<boolean>(false);
const riskControlRemoveDialogVisible = ref<boolean>(false);

const total_count = ref<number>(0);

const firstLevelAgentList = ref<Array<any>>([
  {
    item_1: "User001",
    item_2: 9999,
    item_3: 9999,
    item_4: 9999,
  },
]);

const handlePagination = () => {};

const handleRiskControlDetailShow = () => {
  riskControlDetailDialogVisible.value = true;
};

const handleBtnTab = (index: number) => {
    activeIndex.value = index;
}
</script>

<template>
  <el-table
    v-loading="loading"
    :data="firstLevelAgentList"
    style="width: 100%"
    class="mt-2"
  >
    <el-table-column label="设备ID列表" align="center" prop="item_1">
      <template #default="scope">
        {{ scope.row.item_1 }}
      </template>
    </el-table-column>
    <el-table-column label="风控等级" align="center" prop="item_2">
      <template #default="scope">
        <p>{{ scope.row.item_2 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="处罚范围" align="center" prop="item_3">
      <template #default="scope">
        <p>{{ scope.row.item_3 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="同设备ID下注册账户数量" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="同设备ID下登录账户数量" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="风控时间" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作人员" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="备注" align="center" prop="item_4">
      <template #default="scope">
        <p>{{ scope.row.item_4 }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="200" fixed="right">
      <template #default="scope">
        <el-button type="primary" link @click="handleRiskControlDetailShow">
          详情
        </el-button>
        <el-button type="danger" link @click="riskControlRemoveDialogVisible = true">
          解除风控
        </el-button>
        <el-button type="primary" link> 日志 </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="float: right">
    <pagination
      :total="total_count"
      v-model:page="formData.pageNum"
      v-model:limit="formData.pageSize"
      @pagination="handlePagination"
    />
  </div>
  <el-dialog title="设备ID关联账号" v-model="riskControlDetailDialogVisible">
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">风控设备ID</el-col>
      <el-col :span="18"> 28KN-FG67-YMNV4-J3DY-GDG90 </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">风控等级</el-col>
      <el-col :span="18">
        <el-select placeholder="请选择风控等级">
          <!-- <el-option>同注册设备ID风控</el-option> -->
        </el-select>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">处罚范围</el-col>
      <el-col :span="18">
        <el-select placeholder="请选择处罚范围"> </el-select>
      </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">风控时间</el-col>
      <el-col :span="18" class="flex align-center"> 2023-12-19 23:09:09 </el-col>
    </el-row>
    <el-row class="bg-neutral-100 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">操作员</el-col>
      <el-col :span="18" class="flex align-center"> User001 </el-col>
    </el-row>
    <el-row class="bg-neutral-300 align-center mb-1 h-12">
      <el-col :span="6" class="ps-4">备注</el-col>
      <el-col :span="18" class="flex align-center">
        <el-input placeholder="请输入备注" class="w-96" />
      </el-col>
    </el-row>
    <el-row>
      <el-button :type="activeIndex == 0 ? 'warning' : ''" @click="handleBtnTab(0)">
        此设备下注册账号        
      </el-button>
      <el-button :type="activeIndex == 1 ? 'warning' : ''" @click="handleBtnTab(1)">
        此设备下登录账号
      </el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :data="firstLevelAgentList"
      style="width: 100%"
      class="mt-2"
    >
      <el-table-column label="UserID" align="center" prop="item_1" />
      <el-table-column label="风控时间" align="center" prop="item_4" />
    </el-table>
    <el-footer class="text-center mt-6">
      <el-button type="primary">确认</el-button>
      <el-button @click="riskControlDetailDialogVisible = false">取消</el-button>
    </el-footer>
  </el-dialog>
  <el-dialog title="解除风控" v-model="riskControlRemoveDialogVisible">
    <h4 class="text-center">解除风控后， 所有选中的玩家将会被移除个人风控列表</h4>
    <h4 class="text-center">确认解除风控？</h4>
    <el-form ref="ruleFormRef">
      <el-row style="align-items: center">
        <span class="text-red-600 font-bold text-lg">*</span>
        <h3>备注:</h3>
      </el-row>
      <el-form-item>
        <el-input type="textarea" :rows="4" />
      </el-form-item>
    </el-form>
    <el-footer class="text-center">
      <el-button type="primary">确认</el-button>
      <el-button @click="riskControlRemoveDialogVisible = false">取消</el-button>
    </el-footer>
  </el-dialog>
</template>

<style lang="scss"></style>
