<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import useStore from "@/store";
import { fa } from "element-plus/es/locale";

const loading = ref<boolean>(false);

const vipList = computed(() => {
  return vip.getVIPLevelData;
});
const { vip } = useStore();
onMounted(async () => {
  loading.value = true;
  await vip.dispatchVIPLevel();
  loading.value = false;
});
</script>

<template>
  <el-card>
    <el-table v-loading="loading" :data="vipList" style="width: 100%">
      <el-table-column label="VIP等级" align="center" prop="level" width="160" />
      <el-table-column label="VIP段位" align="center" prop="rank_name" width="160" />
      <el-table-column
        label="VIP升级所需充值"
        align="center"
        prop="deposit_exp"
        width="160"
      />
      <el-table-column
        label="VIP升级所需打码"
        align="center"
        prop="bet_exp"
        width="160"
      />
      <el-table-column
        label="提现手续费"
        align="center"
        prop="withdrawal_fee"
        width="160"
      />
      <el-table-column
        label="提现免手续费 额度/月"
        align="center"
        prop="free_withdrawals"
        width="160"
      />
      <el-table-column
        label="单笔最高提现金额"
        align="center"
        prop="withdrawals_max"
        width="160"
      />
      <el-table-column
        label="每日可提现额度"
        align="center"
        prop="withdrawals_amonut"
        width="160"
      />
      <el-table-column
        label="每月可提现额度"
        align="center"
        prop="month_withdrawals_amount"
        width="160"
      />
      <el-table-column
        label="每日提现次数限制"
        align="center"
        prop="withdrawals_times"
        width="160"
      />
      <el-table-column
        label="每月提现次数限制"
        align="center"
        prop="month_withdrawals_times"
        width="160"
      />
      <el-table-column
        label="VIP保级所需充值"
        align="center"
        prop="protection_deposit_amount"
        width="160"
      />
      <el-table-column
        label="VIP保级所需打码"
        align="center"
        prop="protection_bet_amount"
        width="160"
      />
      <el-table-column
        label="VIP保级时效(天)"
        align="center"
        prop="protection_days"
        width="160"
      />
      <el-table-column
        label="VIP保级失败降低等级"
        align="center"
        prop="downgrade_level"
        width="160"
      />

      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="$emit('show_vip_rank_detail_dialog', scope.row.vip_level)"
            >详情</el-button
          >
          <el-button type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
