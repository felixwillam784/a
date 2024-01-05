<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import useStore from "@/store";

const loading = ref<boolean>(false);
const formData = ref<any>({
  pageNum: 1,
  pageSize: 20,
});

const total = ref<number>(2);

const vipList = computed(() => {
  return vip.getVIPManagementTable;
});
const { vip } = useStore();
onMounted(async ()=>{
  //await vip.dispatchVIPManagementTable();
})
</script>

<template>
  <el-card>
    <el-table v-loading="loading" :data="vipList" style="width: 100%">
      <el-table-column label="VIP等级" align="center" prop="vip_level" width="160" />
      <el-table-column label="VIP段位" align="center" prop="vip_rank" width="160" />
      <el-table-column
        label="VIP升级所需充值"
        align="center"
        prop="recharge_vip_upgrade"
        width="160"
      />
      <el-table-column
        label="VIP升级所需打码"
        align="center"
        prop="coding_vip_upgrade"
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
        prop="free_amount_month"
        width="160"
      />
      <el-table-column
        label="单笔最高提现金额"
        align="center"
        prop="maximum_amount_amount"
        width="160"
      />
      <el-table-column
        label="每日可提现额度"
        align="center"
        prop="daily_limit_amount"
        width="160"
      />
      <el-table-column
        label="每月可提现额度"
        align="center"
        prop="monthly_limit_amount"
        width="160"
      />
      <el-table-column
        label="每日提现次数限制"
        align="center"
        prop="daily_limit_time"
        width="160"
      />
      <el-table-column
        label="每月提现次数限制"
        align="center"
        prop="monthly_limit_time"
        width="160"
      />
      <el-table-column
        label="VIP保级所需充值"
        align="center"
        prop="recharge_vip_up"
        width="160"
      />
      <el-table-column
        label="VIP保级所需打码"
        align="center"
        prop="coding_vip_relegation"
        width="160"
      />
      <el-table-column
        label="VIP保级时效(天)"
        align="center"
        prop="vip_limit_days"
        width="160"
      />
      <el-table-column
        label="VIP保级失败降低等级"
        align="center"
        prop="vip_and_was_lowered"
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

    <div style="float: right">
      <pagination
        v-if="total > 0"
        :total="total"
        v-model:page="formData.pageNum"
        v-model:limit="formData.pageSize"
      />
    </div>
  </el-card>
</template>
