<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { CopyDocument } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import useStore from "@/store";

const { player } = useStore();
const route = useRoute();

const activeNames = ref(["1", "2"]);
const account_status = ref<boolean>(true);

onMounted(async () => {
  await player.dispatchGetTestUserBasicDetail({ id: route.params.id });
});

const testDetail = computed(() => {
  return player.getTestUserBasicDetail;
});
</script>

<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="基础信息" name="1">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="UserID: ">
              {{ testDetail.id }}
              <el-icon class="ms-2"><CopyDocument /></el-icon>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="用户密码: ">
              {{ testDetail.password }}
              <el-icon class="ms-2"><CopyDocument /></el-icon>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="生成时间: ">
              {{
                new Date(testDetail.create_time * 1000).toLocaleString("en-US", {
                  timeZone: "UTC",
                })
              }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生成人员: "> {{ testDetail.operator_id }} </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最后登录时间: ">
              {{
                new Date(testDetail.update_time * 1000).toLocaleString("en-US", {
                  timeZone: "UTC",
                })
              }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号状态: " class="align-center">
              <el-switch
                size="large"
                v-model="testDetail.account_prohibit"
                inline-prompt
                active-text="启用"
                inactive-text="禁用"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="在线状态: ">
              <span
                :class="testDetail.online_status == 1 ? 'text-green-500' : 'text-red-500'"
                >{{ testDetail.online_status == 1 ? "在线" : "离线" }}</span
              >
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最后登录IP: ">
              {{ testDetail.last_login_ip }}
              <span class="text-green-500 ms-6">{{ testDetail.ip_location }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注: ">
              <el-input
                :rows="4"
                type="textarea"
                placeholder="给XX平台用的专用测试号"
                class="w-4/5"
                v-model="testDetail.notes"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="账户信息" name="2">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账户总余额: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真金总余额: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="奖金总余额: "> 999999999 </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="初始真金: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="初始奖金: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投注次数: "> 999999999 </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="投注盈亏: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人工发放真金: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人工发放奖金: "> 999999999 </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="VIP等级: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="VIP打码返利: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="VIP周奖励总计: "> 999999999 </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="VIP月奖励总计: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="VIP会员日奖励总计: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="VIP签到奖励总计: "> 999999999 </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="VIP福利转盘奖励总计: "> 999999999 </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="VIP任务奖励总计: "> 999999999 </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss"></style>
