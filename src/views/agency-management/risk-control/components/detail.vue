<script setup lang="ts">
import { ref } from "vue";
import { CopyDocument } from "@element-plus/icons-vue";
const is_dialog_show = ref(false);
const set_dialog_show = (op: boolean) => {
  is_dialog_show.value = op;
};

defineExpose({
  set_dialog_show,
});
</script>
<template>
  <el-dialog v-model="is_dialog_show" align-center title="代理风控详情">
    <div class="dl_row">
      <p style="width: 20%">UserID</p>
      <div><el-button type="primary" link>User001</el-button></div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">上级代理账号</p>
      <div>无</div>
    </div>

    <div class="dl_row" style="flex-direction: column; align-items: self-start">
      <p style="width: 20%">代理信息</p>
    </div>
    <div>
      <div class="sub_row" style="margin-left: 20%; width: 80%">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 30%; display: flex">
            <p style="width: 60%">一级代理数量:</p>
            <p>600</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">二级代理数量:</p>
            <p>300</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">三级代理数量:</p>
            <p>99</p>
          </div>
        </div>
      </div>
      <div class="sub_row" style="margin-left: 20%; width: 80%">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 30%; display: flex">
            <p style="width: 60%">一级代理充值率:</p>
            <p class="color-red">10%</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">二级代理充值率:</p>
            <p class="color-red">10%</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">三级代理充值率:</p>
            <p>10%</p>
          </div>
        </div>
      </div>
      <div class="sub_row" style="margin-left: 20%; width: 80%">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 30%; display: flex">
            <p style="width: 60%">一级代理充值金额:</p>
            <p>100000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">二级代理充值金额:</p>
            <p>200000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">三级代理充值金额:</p>
            <p>200000</p>
          </div>
        </div>
      </div>
      <div class="sub_row" style="margin-left: 20%; width: 80%">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 30%; display: flex">
            <p style="width: 60%">一级代理提现金额:</p>
            <p>200000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">二级代理提现金额:</p>
            <p>100000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">三级代理提现金额:</p>
            <p>100000</p>
          </div>
        </div>
      </div>
      <div class="sub_row" style="margin-left: 20%; width: 80%">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 30%; display: flex">
            <p style="width: 60%">一级代理提现差:</p>
            <p class="color-red">200000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">二级代理提现差:</p>
            <p>100000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">三级代理提现差:</p>
            <p>100000</p>
          </div>
        </div>
      </div>
      <div class="sub_row" style="margin-left: 20%; width: 80%">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 30%; display: flex">
            <p style="width: 60%">一级代理复充率:</p>
            <p>10%</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">二级代理复充率:</p>
            <p>10%</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">三级代理复充率:</p>
            <p>10%</p>
          </div>
        </div>
      </div>
      <div class="sub_row" style="margin-left: 20%; width: 80%">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="width: 30%; display: flex">
            <p style="width: 60%">代理邀请奖励:</p>
            <p>100000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">代理邀请奖励:</p>
            <p>100000</p>
          </div>
          <div style="width: 30%; display: flex">
            <p style="width: 60%">代理邀请奖励:</p>
            <p>100000</p>
          </div>
        </div>
      </div>
    </div>

    <div class="dl_row">
      <p style="width: 20%">IP地址</p>
      <div style="display: flex; width: 35%">
        <div style="width: 70%; display: flex">
          <p>66.249.69.0</p>
          <el-button link>
            <el-icon>
              <CopyDocument />
            </el-icon>
          </el-button>
        </div>
        <el-button type="primary" link>巴西 圣保罗</el-button>
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">设备ID</p>
      <div style="display: flex; width: 35%">
        <div style="width: 70%">
          <p>VEN_1106_DEV_3038</p>
        </div>
        <el-button type="primary" link>华为 MATE60</el-button>
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">支付账号</p>
      <div style="display: flex; width: 50%">
        <div style="width: 70%">
          <p>09062134223</p>
        </div>
        <el-button type="primary" link>Bank|PIX|Electronic Wallet|MEX</el-button>
      </div>
    </div>
    <div class="dl_row">
      <p style="width: 20%">标签</p>
      <div><el-input placeholder="请输入用户标签"></el-input></div>
    </div>
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

    <div class="dl_row" style="align-items: flex-start">
      <p style="width: 20%">风控行为</p>
      <div style="width: 80%">
        <div style="display: flex; justify-content: space-between">
          <p style="width: 20%">代理充值率</p>
          <p style="width: 15%">一级代理</p>
          <p style="width: 20%">充值率<span class="color-red">10%</span></p>
          <p style="width: 10%">预警</p>
          <p style="width: 35%">
            设定值 一级代理充值率大于<span class="color-red">5%</span>
          </p>
        </div>
        <div style="display: flex; justify-content: space-between">
          <p style="width: 20%">代理充值率</p>
          <p style="width: 15%">二级代理</p>
          <p style="width: 20%">充值率<span class="color-red">10%</span></p>
          <p style="width: 10%">预警</p>
          <p style="width: 35%">
            设定值 二级代理充值率大于<span class="color-red">5%</span>
          </p>
        </div>
        <div style="display: flex; justify-content: space-between">
          <p style="width: 20%">代理平均充值金额</p>
          <p style="width: 15%">二级代理</p>
          <p style="width: 20%">平均充值金额<span class="color-red">30</span></p>
          <p style="width: 10%">禁止提现</p>
          <p style="width: 35%">平均充值金额小于<span class="color-red">50</span></p>
        </div>
      </div>
    </div>

    <div class="dl_row">
      <p style="width: 20%">备注</p>
      <div>
        <el-input placeholder="用户风控行为过多，手动改为【禁止提现】"></el-input>
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

.sub_row {
  /* Style for even elements in the group */
  background-color: #ccc;
  margin-bottom: 4px;
  p {
    margin: 3px;
  }
}

.color-red {
  color: red;
}
</style>
