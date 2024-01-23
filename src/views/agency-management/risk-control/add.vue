<script setup lang="ts">
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const goBack = () => {
  router.push({ name: "AgencyRiskControl" });
};

const op_options = ref<Array<any>>([
  {
    label: "≥",
    value: 1,
  },
  {
    label: "＞",
    value: 2,
  },
  {
    label: "≤",
    value: 3,
  },
  {
    label: "＜",
    value: 4,
  },
  {
    label: "＝",
    value: 5,
  },
]);

const temp_list = ref<Array<any>>([{ id: "User1001" }]);

const is_add_dlg = ref(false);
const show_add_dlg = () => {
  is_add_dlg.value = true;
};
</script>
<template>
  <div class="app-container">
    <div style="margin-bottom: 15px">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>

    <el-card>
      <el-row :gutter="20" style="display: flex; justify-content: space-between">
        <el-form :inline="true" label-width="130">
          <div>
            <el-form-item label="UserID">
              <el-input placeholder="请输入UserID" />
            </el-form-item>
            <el-form-item label="邮箱账号">
              <el-input placeholder="请输入代理邮箱账号" />
            </el-form-item>
            <el-form-item label="身份信息">
              <el-input placeholder="请输入身份信息号" />
            </el-form-item>
          </div>
        </el-form>

        <div>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </div>
      </el-row>

      <el-row :gutter="20">
        <el-form :inline="true" label-width="130">
          <div>
            <el-form-item label="IP地址">
              <el-input placeholder="请输入IP地址" />
            </el-form-item>
            <el-form-item label="设备ID">
              <el-input placeholder="请输入设备ID" />
            </el-form-item>
            <el-form-item label="支付账号">
              <el-input placeholder="请输入支付账号" />
            </el-form-item>
          </div>
        </el-form>
      </el-row>

      <el-row :gutter="20">
        <el-form :inline="true" label-width="130">
          <el-form-item label="标签">
            <el-input placeholder="请输入代理用户标签" />
          </el-form-item>
          <el-form-item label="一级充值率">
            <el-input placeholder="请输入一级充值率" class="input-with-select">
              <template #prepend>
                <el-select placeholder="" style="width: 60px">
                  <el-option
                    v-for="item in op_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="一级复充率">
            <el-input placeholder="请输入一级复充率" class="input-with-select">
              <template #prepend>
                <el-select placeholder="" style="width: 60px">
                  <el-option
                    v-for="item in op_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-row>

      <el-row :gutter="20">
        <el-form :inline="true" label-width="130">
          <el-form-item label="一级平均充值金额">
            <el-input placeholder="请输入一级平均充值金额" class="input-with-select">
              <template #prepend>
                <el-select placeholder="" style="width: 60px">
                  <el-option
                    v-for="item in op_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>

    <el-card>
      <el-table :data="temp_list">
        <el-table-column label="UserID" align="center">
          <template #header>
            <el-checkbox></el-checkbox>
            UserID
          </template>
          <template #default="scope">
            <el-checkbox></el-checkbox>
            <el-button type="primary" link> {{ scope.row.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="用户标签" align="center" />
        <el-table-column label="IP地址" align="center" prop="id">
          <p class="color-red">66.249.69.0</p>
        </el-table-column>
        <el-table-column label="设备ID" align="center" />
        <el-table-column label="支付账号" align="center" />
        <el-table-column label="代理人数" align="center" />
        <el-table-column label="一级充值率" align="center" />
        <el-table-column label="一级复充率" align="center" />
        <el-table-column label="一级充值金额" align="center" />
        <el-table-column label="备注" align="center" />
      </el-table>
    </el-card>

    <div style="justify-content: center; display: flex; margin-top: 30px">
      <el-button type="primary" @click="show_add_dlg">确认</el-button>
      <el-button>取消</el-button>
    </div>
  </div>

  <el-dialog v-model="is_add_dlg" title="新增风控代理">
    <div style="padding: 0px 20px">
      <h3>确认后会将选择中的代理加入风控列表</h3>
      <div class="dl_row">
        <p style="width: 20%">风控等级</p>
        <div>
          <el-radio-group>
            <el-radio :label="1">预警</el-radio>
            <el-radio :label="2">禁止提现</el-radio>
            <el-radio :label="3">禁止登录</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="dl_row">
        <p style="width: 20%">备注</p>
        <div>
          <el-input placeholder="用户风控行为过多，手动改为【禁止提现】"></el-input>
        </div>
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

<style lang="scss">
.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.dl_row:nth-child(2n) {
  /* Style for odd elements in the group */
  background-color: #aaa;
}

.dl_row:nth-child(2n + 1) {
  /* Style for even elements in the group */
  background-color: #ccc;
}

.color-red {
  color: red;
}

.input-with-select {
  width: 220px;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  .el-select {
    .el-input {
      width: 60px;
    }
  }
}
</style>
