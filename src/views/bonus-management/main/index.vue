<script setup lang="ts">
import { ref } from "vue";
import AddDialog from "./components/add.vue";

interface GetBonusData {
  bonus_id: number;
  bonus_type: string;
  bonus_name: string;
  bonus_descript: string;
  bonus_amount: string;
  bonus_cap: number;
  bonus_code_magnification: number;
  bonus_code_failure_condition: number;
  bonus_code_time_limit: number;
  bonus_expiration_time: string;
  bonus_VIP_restriction: string;
  bonus_usage_scope: Array<string>;
  bonus_code_condition: string;
}

const bonus_data_list = ref<Array<GetBonusData>>([
  {
    bonus_id: 1001,
    bonus_type: "存款奖金",
    bonus_name: "首存100+100%",
    bonus_descript: "首存100+100%",
    bonus_amount: "100%",
    bonus_cap: 800,
    bonus_code_magnification: 20,
    bonus_code_failure_condition: 5,
    bonus_code_time_limit: 30,
    bonus_expiration_time: "2023-12-30 00:00:00",
    bonus_VIP_restriction: "VIP5",
    bonus_usage_scope: ["无限制"],
    bonus_code_condition: "Multiplier>=1.8",
  },
  {
    bonus_id: 1002,
    bonus_type: "任务奖金",
    bonus_name: "周任务奖金",
    bonus_descript: "周任务奖金",
    bonus_amount: "5",
    bonus_cap: 800,
    bonus_code_magnification: 10,
    bonus_code_failure_condition: 5,
    bonus_code_time_limit: 0,
    bonus_expiration_time: "",
    bonus_VIP_restriction: "",
    bonus_usage_scope: ["游戏分类"],
    bonus_code_condition: "无限制",
  },
  {
    bonus_id: 1004,
    bonus_type: "会员日奖金",
    bonus_name: "会员日奖金",
    bonus_descript: "会员日奖金",
    bonus_amount: "50",
    bonus_cap: 800,
    bonus_code_magnification: 20,
    bonus_code_failure_condition: 5,
    bonus_code_time_limit: 30,
    bonus_expiration_time: "2023-12-30 00:00:00",
    bonus_VIP_restriction: "",
    bonus_usage_scope: [
      "游戏分类",
      "游戏渠道",
      "游戏ID",
      "游戏ID",
      "游戏ID",
      "游戏ID",
      "游戏ID",
      "游戏ID",
    ],
    bonus_code_condition: "无限制",
  },
]);

const get_class_name_for_usage_scope = (param: string) => {
  if (param == "游戏分类") return "orange-background";
  if (param == "游戏渠道") return "yellow-background";
  if (param == "游戏ID") return "green-background";
  return "";
};

const filter_usage_scope = (data: Array<string>, standard: string) => {
  let res: string[] = [];
  data.forEach((element) => {
    if (element == standard) res.push(element);
  });
  return res;
};

const AddDialogRef = ref();

const add_new = () => {
  AddDialogRef.value.show_dialog(true);
};
</script>

<template>
  <div class="app-container">
    <div class="search">
      <el-form :inline="true" label-width="120" class="form_row">
        <div style="display: flex; justify-content: space-between; padding: 0px 10px">
          <div>
            <el-form-item label="奖金名称">
              <el-input placeholder="请输入奖金名称" />
            </el-form-item>
            <el-form-item label="奖金类型">
              <el-select placeholder="请选择奖金类型"></el-select>
            </el-form-item>
            <el-form-item label="奖金上限">
              <el-input placeholder="请输入奖金上限" />
            </el-form-item>
          </div>
          <div>
            <el-button>查询</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0px 10px">
          <div>
            <el-form-item label="打码倍率">
              <el-input placeholder="请输入打码倍率" />
            </el-form-item>
            <el-form-item label="任务失败条件">
              <el-input placeholder="请输入打码任务失败条件" />
            </el-form-item>
            <el-form-item label="打码任务时效">
              <el-input placeholder="请输入打码任务时效" />
            </el-form-item>
          </div>
          <div>
            <el-button @click="add_new">新增奖金</el-button>
            <el-button>Excel导入</el-button>
            <el-button>Excel导出</el-button>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0px 10px">
          <div>
            <el-form-item label="VIP限制">
              <el-input placeholder="请输入奖金使用VIP限制" />
            </el-form-item>
            <el-form-item label="奖金数额">
              <el-input placeholder="请输入奖金数额" />
            </el-form-item>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0px 10px">
          <div>
            <el-form-item label="奖金使用范围">
              <el-input placeholder="请选择游戏厂商" />
            </el-form-item>
            <el-form-item label="奖金使用范围">
              <el-select placeholder="请选择游戏平台"> </el-select>
            </el-form-item>
            <el-form-item label="奖金使用范围">
              <el-input placeholder="请输入游戏名字或ID" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <el-card>
      <el-table :data="bonus_data_list">
        <el-table-column label="奖金ID" width="200px" align="center" prop="bonus_id" />
        <el-table-column
          label="奖金类型"
          width="200px"
          align="center"
          prop="bonus_type"
        />
        <el-table-column
          label="奖金名称"
          width="200px"
          align="center"
          prop="bonus_name"
        />
        <el-table-column
          label="奖金描述"
          width="200px"
          align="center"
          prop="bonus_descript"
        />
        <el-table-column
          label="奖金数额"
          width="200px"
          align="center"
          prop="bonus_amount"
        />
        <el-table-column label="奖金上限" width="200px" align="center" prop="bonus_cap" />
        <el-table-column
          label="打码倍率"
          width="200px"
          align="center"
          prop="bonus_code_magnification"
        />
        <el-table-column
          label="打码任务失败条件"
          width="200px"
          align="center"
          prop="bonus_code_failure_condition"
          ><template #default="scope"
            >{{ scope.row.bonus_code_failure_condition }}%</template
          ></el-table-column
        >
        <el-table-column
          label="打码任务时效（0表示无限制"
          width="200px"
          align="center"
          prop="bonus_code_time_limit"
        />
        <el-table-column
          label="奖金失效时间"
          width="200px"
          align="center"
          prop="bonus_expiration_time"
        >
          <template #default="scope">
            <p v-if="scope.row.bonus_expiration_time != ''">
              {{ scope.row.bonus_expiration_time }}
            </p>
            <p v-if="scope.row.bonus_expiration_time == ''">------------------</p>
          </template>
        </el-table-column>
        <el-table-column
          label="奖金使用VIP限制"
          width="200px"
          align="center"
          prop="bonus_VIP_restriction"
        >
          <template #default="scope">
            <p v-if="scope.row.bonus_VIP_restriction != ''">
              {{ scope.row.bonus_VIP_restriction }}
            </p>
            <p v-if="scope.row.bonus_VIP_restriction == ''">------------------</p>
          </template>
        </el-table-column>

        <el-table-column
          label="奖金使用范围"
          width="350px"
          align="center"
          prop="bonus_usage_scope"
        >
          <template #default="scope">
            <div style="display: flex; flex-wrap: wrap">
              <div
                v-for="(item, index) in scope.row.bonus_usage_scope.slice(0, 4)"
                :key="index"
                :class="get_class_name_for_usage_scope(item)"
              >
                {{ item }}
              </div>
              <div
                v-if="scope.row.bonus_usage_scope[0] != '无限制'"
                style="display: flex; justify-content: center; align-items: center"
              >
                <el-tooltip effect="light">
                  <template #default>
                    <el-button> ... </el-button>
                  </template>
                  <template #content>
                    <div style="padding: 5px; width: 400px">
                      <div class="dl_row">游戏分类</div>
                      <div
                        class="dl_row"
                        style="display: flex; justify-content: start; flex-wrap: wrap"
                      >
                        <div
                          v-for="(item, index) in filter_usage_scope(
                            scope.row.bonus_usage_scope,
                            '游戏分类'
                          )"
                          :key="index"
                          :class="get_class_name_for_usage_scope(item)"
                        >
                          {{ item }}
                        </div>
                      </div>
                      <div class="dl_row">游戏渠道</div>
                      <div
                        class="dl_row"
                        style="display: flex; justify-content: start; flex-wrap: wrap"
                      >
                        <div
                          v-for="(item, index) in filter_usage_scope(
                            scope.row.bonus_usage_scope,
                            '游戏渠道'
                          )"
                          :key="index"
                          :class="get_class_name_for_usage_scope(item)"
                        >
                          {{ item }}
                        </div>
                      </div>
                      <div class="dl_row">游戏</div>
                      <div
                        class="dl_row"
                        style="display: flex; justify-content: start; flex-wrap: wrap"
                      >
                        <div
                          v-for="(item, index) in filter_usage_scope(
                            scope.row.bonus_usage_scope,
                            '游戏ID'
                          )"
                          :key="index"
                          :class="get_class_name_for_usage_scope(item)"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </div>
                  </template>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="打码有效条件"
          width="200px"
          align="center"
          prop="bonus_code_condition"
        >
          <template #default="scope">
            <p
              :class="
                scope.row.bonus_code_condition == '无限制' ? '' : 'yellow-background'
              "
            >
              {{ scope.row.bonus_code_condition }}
            </p>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200px" align="center" prop="bonus_id">
          <template #default>
            <el-button link type="success">修改</el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <AddDialog ref="AddDialogRef" />
  </div>
</template>

<style lang="scss">
.yellow-background {
  background-color: yellow;
  padding: 5px;
  margin: 5px;
}
.orange-background {
  background-color: orange;
  padding: 5px;
  margin: 5px;
}
.green-background {
  background-color: green;
  padding: 5px;
  margin: 5px;
}

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
</style>
