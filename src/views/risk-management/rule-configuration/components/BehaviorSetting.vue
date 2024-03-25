<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

const registeredSameIPList = ref<Array<any>>([
  {
    status: 0,
  },
  {
    status: 1,
  },
]);

const addRegisteredSameIPItem = () => {
  registeredSameIPList.value.push({
    status: 1,
  });
};

const checkRegisteredSameIPItem = (index: number) => {
  registeredSameIPList.value[index].status = 0;
};

const deleteRegisteredSameIPItem = (index: number) => {
  registeredSameIPList.value.splice(index, 1);
};
</script>

<template>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同注册IP
    <el-button style="margin-left: auto" @click="addRegisteredSameIPItem">
      新增风控行为
    </el-button>
  </el-row>
  <template v-for="(item1, index1) in registeredSameIPList" :key="index1">
    <el-row class="bg-neutral-100 behavior-setting-row">
      <el-col :span="4">
        风控行为名称
        <el-input
          value="风控行为名称"
          placeholder="请输入风控行为名称"
          style="width: 100px; margin-left: 10px"
        />
      </el-col>
      <el-col :span="4" class="d-flex align-center">
        处罚触发值
        <el-input
          style="width: 100px; margin-left: 10px"
          value="10"
          placeholder="请输入处罚触发值"
        />
      </el-col>
      <el-col :span="4" class="d-flex align-center">
        处罚范围
        <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
      </el-col>
      <el-col :span="4">
        处罚方式
        <el-select
          style="width: 100px; margin-left: 10px"
          value="提现封禁（扣款不打款）"
        ></el-select>
      </el-col>
      <el-col :span="4">
        自动去代理关系
        <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
      </el-col>
      <el-col :span="4">
        是否生效
        <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
        <template v-if="item1.status == 1">
          <el-button link type="primary" @click="checkRegisteredSameIPItem(index1)">
            确定
          </el-button>
          <el-button link type="primary" @click="deleteRegisteredSameIPItem(index1)">
            删除
          </el-button>
        </template>
      </el-col>
    </el-row>
  </template>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同登录IP
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      登录IP风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同设备ID（手机设备号）
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      设备ID风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同浏览器指纹
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      设备ID风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同登录密码
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      一级IP风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同身份信息
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      一级IP风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同手机号
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      手机号风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <el-row class="bg-neutral-300 behavior-setting-row">
    同银行卡号
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      银行卡风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <el-row class="bg-neutral-300 behavior-setting-row">
    组合风控
    <el-button style="margin-left: auto"> 新增风控行为 </el-button>
  </el-row>
  <el-row class="bg-neutral-100 behavior-setting-row">
    <el-col :span="4">
      风控行为名称
      <el-input
        value="风控行为名称"
        placeholder="请输入风控行为名称"
        style="width: 100px; margin-left: 10px"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      严重违规风控
      <el-input
        style="width: 100px; margin-left: 10px"
        value="10"
        placeholder="请输入登录IP风控"
      />
    </el-col>
    <el-col :span="4" class="d-flex align-center">
      处罚范围
      <el-select style="width: 100px; margin-left: 10px" value="全部账号"></el-select>
    </el-col>
    <el-col :span="4">
      处罚方式
      <el-select
        style="width: 100px; margin-left: 10px"
        value="提现封禁（扣款不打款）"
      ></el-select>
    </el-col>
    <el-col :span="4">
      自动去代理关系
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
    <el-col :span="4">
      是否生效
      <el-select style="width: 100px; margin-left: 10px" value="否"></el-select>
    </el-col>
  </el-row>
  <div class="text-center mt-4">
    <el-button type="primary"> 确认 </el-button>
    <el-button>取消</el-button>
  </div>
</template>

<style lang="scss">
.behavior-setting-row {
  margin: 8px 0px;
  padding: 10px;
}
</style>
