<script setup lang="ts">
import { ref } from "vue";
import {
  GetActiveManagementDetailData,
  ActiveCondition,
  ActiveBonus,
} from "@/interface/event";
import { tr } from "element-plus/es/locale";

const props = defineProps({
  event_id: Number,
});

const active_item = ref<GetActiveManagementDetailData>({
  event_id: "",
  event_type: "",
  event_name: "",
  event_description: "",
  trigger_condition: [
    { condition: "1", amount: 0 },
    { condition: "2", amount: 0 },
  ],
  takin_condition: [
    { condition: "1", amount: 0 },
    { condition: "2", amount: 0 },
  ],
  event_weight: -1,
  code_rebate: -1,
  deposite_threshold: -1,
  bonus_id: [
    { deposite_minimum: 1, deposite_maximum: 1, bonus_id: 1 },
    { deposite_minimum: 1, deposite_maximum: 1, bonus_id: 1 },
  ],
  event_takin_time: "",
  event_takin_cycle: "",
  times_in_cycle: -1,
  event_active_time: "",
  event_time: "",
  reamrk: "",
  event_status: "",
});

const trigger_condition_options = ref<Array<string>>(["e", "f"]);
const is_add_new_trigger_condition = ref(false);
const new_trigger_condition = ref<ActiveCondition>({
  condition: "",
  amount: "",
});

const trigger_condition_operate = (op: boolean, id: number) => {
  if (op == true) {
    is_add_new_trigger_condition.value = true;
  } else {
    if (id == 1000) {
      is_add_new_trigger_condition.value = false;
    } else {
      active_item.value.trigger_condition.splice(id, 1);
    }
  }
};

const takin_condition_options = ref<Array<string>>(["e", "f"]);
const is_add_new_takin_condition = ref(false);
const new_takin_condition = ref<ActiveCondition>({
  condition: "",
  amount: -1,
});

const takin_condition_operate = (op: boolean, id: number) => {
  if (op == true) {
    is_add_new_takin_condition.value = true;
  } else {
    if (id == 1000) {
      is_add_new_takin_condition.value = false;
    } else {
      active_item.value.takin_condition.splice(id, 1);
    }
  }
};

const bonus_id_options = ref<Array<string>>(["aa", "nb"]);
const is_add_new_bonus_id = ref(false);
const new_bonus_id = ref<ActiveBonus>({
  deposite_minimum: "",
  deposite_maximum: "",
  bonus_id: "",
});

const bonus_id_operate = (op: boolean, id: number) => {
  if (op == true) {
    is_add_new_bonus_id.value = true;
  } else {
    if (id == 1000) {
      is_add_new_bonus_id.value = false;
    } else {
      active_item.value.bonus_id.splice(id, 1);
    }
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div class="dl_row">
      <p style="width: 20%">活动类型</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input v-model="active_item.event_type" disabled />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">活动名称</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input v-model="active_item.event_name" placeholder="请输入活动名称" />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">活动描述</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input v-model="active_item.event_description" placeholder="请输入活动描述" />
      </div>
    </div>

    <div class="dl_row">
      <p style="width: 20%">活动触发条件<br />（默认无条件）</p>
      <div style="width: 78.5%; margin-left: 20px">
        <div
          v-for="(item, index) in active_item.trigger_condition"
          :key="index"
          style="
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          <div style="display: flex; width: 75%">
            <el-select v-model="item.condition" placeholder="请选择活动触发条件">
              <el-option
                v-for="(item, i) in trigger_condition_options"
                :label="item"
                :value="i + 1"
                :key="i"
              ></el-option>
            </el-select>
            <el-input
              v-model="item.amount"
              placeholder="请输入条件值"
              style="margin-left: 20px"
            ></el-input>
          </div>

          <el-button
            style="margin-left: 20px"
            v-if="index == active_item.trigger_condition.length - 1"
            @click="trigger_condition_operate(true, 1000)"
            >+</el-button
          >
          <el-button
            style="margin-left: 20px"
            v-if="index != 0"
            @click="trigger_condition_operate(false, index)"
            >-</el-button
          >
        </div>
        <div
          v-if="
            is_add_new_trigger_condition == true ||
            active_item.trigger_condition.length == 0
          "
          style="display: flex; justify-content: space-between; width: 100%"
        >
          <div style="display: flex; width: 75%">
            <el-select
              v-model="new_trigger_condition.condition"
              placeholder="请选择活动触发条件"
            >
              <el-option
                v-for="(item, index) in trigger_condition_options"
                :label="item"
                :value="index + 1"
                :key="index"
              ></el-option>
            </el-select>
            <el-input
              v-model="new_trigger_condition.amount"
              placeholder="请输入条件值"
              style="margin-left: 20px"
            ></el-input>
          </div>

          <el-button
            style="margin-left: 20px"
            @click="trigger_condition_operate(false, 1000)"
            >-</el-button
          >
        </div>
      </div>
    </div>

    <div class="dl_row">
      <p style="width: 20%">活动参与条件</p>
      <div style="width: 78.5%; margin-left: 20px">
        <div
          v-for="(item, index) in active_item.takin_condition"
          :key="index"
          style="
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          <div style="display: flex; width: 75%">
            <el-select v-model="item.condition" placeholder="请选择活动参与条件">
              <el-option
                v-for="(item, i) in takin_condition_options"
                :label="item"
                :value="i + 1"
                :key="i"
              ></el-option>
            </el-select>
            <el-input
              v-model="item.amount"
              placeholder="请输入条件值"
              style="margin-left: 20px"
            ></el-input>
          </div>

          <div style="display: flex">
            <el-button
              style="margin-left: 20px"
              v-if="index == active_item.takin_condition.length - 1"
              @click="takin_condition_operate(true, 1000)"
              >+</el-button
            >
            <el-button
              style="margin-left: 20px"
              v-if="index != 0"
              @click="takin_condition_operate(false, index)"
              >-</el-button
            >
          </div>
        </div>
        <div
          v-if="
            is_add_new_takin_condition == true || active_item.takin_condition.length == 0
          "
          style="display: flex; justify-content: space-between; width: 100%"
        >
          <div style="display: flex; width: 75%">
            <el-select
              v-model="new_takin_condition.condition"
              placeholder="请选择活动参与条件"
            >
              <el-option
                v-for="(item, index) in takin_condition_options"
                :label="item"
                :value="index + 1"
                :key="index"
              ></el-option>
            </el-select>
            <el-input
              v-model="new_takin_condition.amount"
              placeholder="请输入条件值"
              style="margin-left: 20px"
            ></el-input>
          </div>
          <div>
            <el-button
              style="margin-left: 20px"
              @click="takin_condition_operate(false, 1000)"
              >-</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="dl_row">
      <p style="width: 20%">活动权重</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input v-model="active_item.event_weight" placeholder="请输入活动权重" />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">本金打码倍率</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input
          v-model="active_item.code_rebate"
          placeholder="请输入本金打码倍率，默认为1"
        />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">充值门槛</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input v-model="active_item.deposite_threshold" placeholder="请输入充值门槛" />
      </div>
    </div>

    <div class="dl_row">
      <p style="width: 20%">奖金ID</p>
      <div style="width: 78.5%; margin-left: 20px">
        <div
          v-for="(item, index) in active_item.bonus_id"
          :key="index"
          style="
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          <div style="display: flex; width: 75%">
            <span style="width: 60%; text-align: center; margin: auto auto"
              >充值范围</span
            >
            <el-input
              v-model="item.deposite_minimum"
              placeholder="请输入最小值"
            ></el-input>
            <el-input
              v-model="item.deposite_maximum"
              placeholder="请输入最大值"
              style="margin-left: 10px"
            ></el-input>
            <el-select
              v-model="item.bonus_id"
              placeholder="请选择奖金ID"
              style="margin-left: 10px"
            >
              <el-option
                v-for="(it, ind) in bonus_id_options"
                :label="it"
                :value="ind + 1"
                :key="ind"
              ></el-option>
            </el-select>
          </div>

          <div style="display: flex">
            <el-button
              style="margin-left: 20px"
              v-if="index == active_item.bonus_id.length - 1"
              @click="bonus_id_operate(true, 1000)"
              >+</el-button
            >
            <el-button
              style="margin-left: 20px"
              v-if="index != 0"
              @click="bonus_id_operate(false, index)"
              >-</el-button
            >
          </div>
        </div>
        <div
          v-if="is_add_new_bonus_id == true || active_item.bonus_id.length == 0"
          style="display: flex; justify-content: space-between; width: 100%"
        >
          <div style="display: flex; width: 75%">
            <span style="width: 60%; text-align: center; margin: auto auto"
              >充值范围</span
            >
            <el-input
              v-model="new_bonus_id.deposite_minimum"
              placeholder="请输入最小值"
            ></el-input>
            <el-input
              v-model="new_bonus_id.deposite_maximum"
              placeholder="请输入最大值"
              style="margin-left: 10px"
            ></el-input>
            <el-select
              v-model="new_bonus_id.bonus_id"
              placeholder="请选择奖金ID"
              style="margin-left: 10px"
            >
              <el-option
                v-for="(it, ind) in bonus_id_options"
                :label="it"
                :value="ind + 1"
                :key="ind"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-button style="margin-left: 20px" @click="bonus_id_operate(false, 1000)"
              >-</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="dl_row">
      <p style="width: 20%">活动参与次数</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="active_item.event_takin_time" class="ml-4">
          <el-radio :label="1" size="large">单次</el-radio>
          <el-radio :label="2" size="large">多次</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">活动参与周期</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="active_item.event_takin_cycle" class="ml-4">
          <el-radio :label="1" size="large">每天循环</el-radio>
          <el-radio :label="2" size="large">每周循环</el-radio>
          <el-radio :label="3" size="large">每月循环</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">周期内可参与次数</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input
          v-model="active_item.times_in_cycle"
          placeholder="请输入周哦期内可参与次数，默认不限制参与次数"
        />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">活动有效天数</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input
          v-model="active_item.event_active_time"
          placeholder="请输入天数，默认为0表示活动长期有效"
        />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">活动有效时间</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-date-picker
          v-model="active_item.event_time"
          type="date"
          placeholder="请选择活动有效时间"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          :size="large"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">活动备注</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-input v-model="active_item.remark" placeholder="请输入备注" />
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">活动状态</p>
      <div style="display: flex; width: 78.5%; margin-left: 20px">
        <el-radio-group v-model="active_item.event_status" class="ml-4">
          <el-radio :label="1" size="large">开启</el-radio>
          <el-radio :label="2" size="large">关闭</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.right_position {
  display: flex;
  justify-content: right;
}

.dl_row {
  padding: 1px 20px;
  margin-bottom: 4px;
  display: flex;
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
