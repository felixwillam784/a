<script setup lang="ts">
import { onMounted, ref } from "vue";

import { GetActiveManagementData } from "@/interface/event";
import ActivityManagementDetail from "./components/detail.vue";

const formData = ref({
  event_id: "",
  event_name: "",
  event_type: "",
  event_status: "",
  trigger_condition: "",
  takein_condition: "",
  bonus_id: "",
  event_takin_times: "",
  event_takin_cycle: "",
  event_active_time: "",
  event_time: "",
});

const event_type_options = ref<Array<string>>(["a", "b"]);
const event_status_options = ref<Array<string>>(["c", "d"]);
const trigger_condition_options = ref<Array<string>>(["e", "f"]);
const takein_condition_options = ref<Array<string>>(["g", "h"]);
const bonus_id_options = ref<Array<string>>(["aa", "nb"]);
const event_takin_times_options = ref<Array<string>>(["cc", "dd"]);
const event_takin_cycle_options = ref<Array<string>>(["de", "ff"]);

const add_new_event = () => {
  console.log(formData.value.event_type);
};

const active_management_list = ref<Array<GetActiveManagementData>>([
  {
    event_id: "1001",
    event_type: "存款活动",
    event_name: "存100送100%",
    event_description: "存100送100%",
    trigger_condition: "首次充值",
    takin_condition: "",
    event_weight: "1",
    code_rebate: "1",
    bonus_id: "1001",
    event_takin_time: "单次",
    event_takin_cycle: "",
    times_in_cycle: "",
    event_active_time: "30",
    event_time: "",
    event_status: "进行中",
  },
  {
    event_id: "1002",
    event_type: "存款活动",
    event_name: "存100送100%",
    event_description: "存100送100%",
    trigger_condition: "首次充值",
    takin_condition: "",
    event_weight: "1",
    code_rebate: "1",
    bonus_id: "1001",
    event_takin_time: "单次",
    event_takin_cycle: "",
    times_in_cycle: "",
    event_active_time: "30",
    event_time: "",
    event_status: "未开启",
  },
]);

const detail_dialog = ref(false);

const event_id = ref(-1);
const show_detail_dialog = (data: GetActiveManagementData) => {
  detail_dialog.value = true;
  event_id.value = parseInt(data.event_id);
};
</script>
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <el-row style="align-items: center">
            <el-col>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                style="display: flex; justify-content: space-between"
              >
                <div>
                  <el-form-item label="活动ID" prop="event_id">
                    <el-input v-model="formData.event_id" placeholder="请输入活动ID" />
                  </el-form-item>
                  <el-form-item label="活动名称" prop="event_name">
                    <el-input
                      v-model="formData.event_name"
                      placeholder="请输入活动名称"
                    />
                  </el-form-item>
                  <el-form-item label="活动类型" prop="event_type">
                    <el-select v-model="formData.event_type" placeholder="请选择活动类型">
                      <el-option
                        v-for="(item, index) in event_type_options"
                        :label="item"
                        :value="index + 1"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div>
                  <el-button>查询</el-button>
                  <el-button>重置</el-button>
                </div>
              </el-form>
            </el-col>
          </el-row>
          <el-row style="align-items: center">
            <el-col>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                style="display: flex; justify-content: space-between"
              >
                <div>
                  <el-form-item label="活动状态" prop="event_status">
                    <el-select
                      v-model="formData.event_status"
                      placeholder="请选择活动状态"
                    >
                      <el-option
                        v-for="(item, index) in event_status_options"
                        :label="item"
                        :value="index + 1"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="触发条件" prop="trigger_condition">
                    <el-select
                      v-model="formData.trigger_condition"
                      placeholder="请选择触发条件"
                    >
                      <el-option
                        v-for="(item, index) in trigger_condition_options"
                        :label="item"
                        :value="index + 1"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="参与条件" prop="takein_condition">
                    <el-select
                      v-model="formData.takein_condition"
                      placeholder="请选择参与条件"
                    >
                      <el-option
                        v-for="(item, index) in takein_condition_options"
                        :label="item"
                        :value="index + 1"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div>
                  <el-button @click="add_new_event()">新增活动</el-button>
                  <el-button>Excel导入</el-button>
                  <el-button>Excel导出</el-button>
                </div>
              </el-form>
            </el-col>
          </el-row>
          <el-row style="align-items: center">
            <el-col>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                style="display: flex; justify-content: space-between"
              >
                <div>
                  <el-form-item label="奖金ID" prop="bonus_id">
                    <el-select v-model="formData.bonus_id" placeholder="请输入奖金方案ID">
                      <el-option
                        v-for="(item, index) in bonus_id_options"
                        :label="item"
                        :value="index + 1"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动参与次数" prop="event_takin_times">
                    <el-select
                      v-model="formData.event_takin_times"
                      placeholder="请选择活动参与次数"
                    >
                      <el-option
                        v-for="(item, index) in event_takin_times_options"
                        :label="item"
                        :value="index + 1"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动参与周期" prop="event_takin_cycle">
                    <el-select
                      v-model="formData.event_takin_cycle"
                      placeholder="请选择活动参与周期"
                    >
                      <el-option
                        v-for="(item, index) in event_takin_cycle_options"
                        :label="item"
                        :value="index + 1"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form>
            </el-col>
          </el-row>
          <el-row style="align-items: center">
            <el-col>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                style="display: flex; justify-content: space-between"
              >
                <el-form-item label="活动有效期" prop="event_active_time">
                  <el-input
                    placeholder="请输入活动时效，0为长期"
                    v-model="formData.event_active_time"
                  />
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row style="align-items: center">
            <el-col>
              <el-form
                :model="formData"
                :inline="true"
                label-width="100"
                style="display: flex; justify-content: space-between"
              >
                <el-form-item label="活动时间" prop="event_time">
                  <el-date-picker
                    range-separator="至"
                    v-model="formData.event_time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  />
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin-top: 20px">
          <el-table :data="active_management_list" style="width: 100%">
            <el-table-column label="活动ID" align="center" prop="event_id" width="160">
            </el-table-column>
            <el-table-column
              label="活动类型"
              align="center"
              prop="event_type"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动名称"
              align="center"
              prop="event_name"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动描述"
              align="center"
              prop="event_description"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动触发条件"
              align="center"
              prop="trigger_condition"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动参与条件"
              align="center"
              prop="takin_condition"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动权重"
              align="center"
              prop="event_weight"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="本金打码倍率"
              align="center"
              prop="code_rebate"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="关联奖金ID"
              align="center"
              prop="bonus_id"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动参与次数"
              align="center"
              prop="event_takin_times"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动参与周期"
              align="center"
              prop="event_takin_cycle"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="周期内次数"
              align="center"
              prop="times_in_cycle"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动有效期"
              align="center"
              prop="event_active_time"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动有效时间"
              align="center"
              prop="event_time"
              width="160"
            >
            </el-table-column>
            <el-table-column
              label="活动状态"
              align="center"
              prop="event_status"
              width="160"
            >
              <template #default="scope">
                <p v-if="scope.row.event_status == '未开启'" style="color: red">
                  {{ scope.row.event_status }}
                </p>
                <p v-else style="color: green">{{ scope.row.event_status }}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="200">
              <template #default="scope">
                <el-button type="primary" link @click="show_detail_dialog(scope.row)"
                  >详情</el-button
                >
                <el-button type="danger" link>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="detail_dialog" title="活动详情" align-center>
    <ActivityManagementDetail :active_id="event_id" />
    <template #footer>
      <div style="display: flex; justify-content: center">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss"></style>
