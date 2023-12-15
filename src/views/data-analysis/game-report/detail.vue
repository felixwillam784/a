<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, CopyDocument, ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const activeButton = ref<number>(0);

interface GetMultiRanking {
  id: string;
  ranking: number;
  win_rate: number;
  nick_name: string;
  user_account: string;
  bet_amount: number;
  profit_amount: number;
}

interface GetProfitRanking {
  id: string;
  profit_amount: number;
  nick_name: string;
  user_account: string;
  bet_amount: number;
  win_rate: number;
}

const router = useRouter();

const loading = ref<boolean>(false);

const multiLankingList = ref<Array<GetMultiRanking>>([
])

const goBack = () => {
    router.push({ name: "Game Report" });
}

const handleButtonActive = (index: number) => {
    activeButton.value = index;
}

</script>

<template>
  <div class="app-container">
    <div style="padding: 20px;">
      <el-button type="danger" :icon="ArrowLeft" @click="goBack">返回</el-button>
    </div>
    <div class="user-detail-header">
      <div >
        <el-button :type="activeButton == 0 ? 'warning' : ''"
          @click="handleButtonActive(0)">倍率排名</el-button>
        <el-button :type="activeButton == 1 ? 'warning' : ''"
          @click="handleButtonActive(1)">盈利排名</el-button>
        
      </div>
    </div>
    <el-row :gutter="20" v-if="activeButton == 0">
      <el-col :span="24" :xs="24">
        <el-card style="margin-top: 20px;">
          <el-table v-loading="loading" :data="multiLankingList" style="width: 100%;">
            <el-table-column label="排名" align="left" prop="ranking" width="350">
              <template #default="scope">
                <p>{{ scope.row.ranking }}</p>
              </template>
            </el-table-column>
            <el-table-column label="获胜倍率" align="left" prop="win_rate" width="350">
              <template #default="scope">
                <p>{{ scope.row.win_rate.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="用户账号" align="left" prop="nick_name" width="350">
              <template #default="scope">
                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;"
                    @click="router.push({ name: 'UserDetail' })">
                    {{ scope.row.nick_name }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="本局投注金额" align="left" prop="bet_amount" width="350">
              <template #default="scope">
                <p>{{ scope.row.bet_amount.toFixed(2)}}</p>
              </template>
            </el-table-column>
            <el-table-column label="本局盈利金额" align="left" prop="profit_amount" width="220">
              <template #default="scope">
                <p>{{ scope.row.profit_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="activeButton == 1">
      <el-col :span="24" :xs="24">
        <el-card style="margin-top: 20px;">
          <el-table v-loading="loading" :data="multiLankingList" style="width: 100%;">
            <el-table-column label="排名" align="left" prop="ranking" width="350">
              <template #default="scope">
                <p>{{ scope.row.ranking }}</p>
              </template>
            </el-table-column>
            <el-table-column label="本局盈利金额" align="left" prop="profit_amount" width="350">
              <template #default="scope">
                <p>{{ scope.row.profit_amount.toFixed(2) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="用户账号" align="left" prop="nick_name" width="350">
              <template #default="scope">
                <el-link :underline="false" style="color: #5393e0; text-decoration-line: underline;"
                    @click="router.push({ name: 'UserDetail' })">
                    {{ scope.row.nick_name }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="本局投注金额" align="left" prop="bet_amount" width="350">
              <template #default="scope">
                <p>{{ scope.row.bet_amount.toFixed(2)}}</p>
              </template>
            </el-table-column>
            <el-table-column label="获胜倍率" align="left" prop="win_rate" width="220">
              <template #default="scope">
                <p>{{ scope.row.win_rate.toFixed(2) }}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row>

    </el-row>
  </div>
</template>

<style lang="scss">

.user-detail-header {
  padding-left: 20px;
  display: flex;
  align-items: center;
}
</style>