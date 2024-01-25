<script setup lang="ts"></script>
<template>
  <div style="margin-top: 30px">
    <div>
      <div class="dl_row big_row">
        <p class="left">代理充值率</p>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">一级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">充值率大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">二级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">充值率大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
          </div>
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">充值率大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>-</el-button>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">三级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">充值率大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="dl_row big_row">
        <p class="left">代理复充率</p>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">一级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">复充率小于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">二级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">复充率小于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">三级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">复充率小于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="dl_row big_row">
        <p class="left">代理平均充值金额</p>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">一级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">平均充值小于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">二级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">平均充值小于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p class="left">三级代理</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">人数大于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 30%">平均充值小于</p>
                <el-input placeholder="请输入一级代理返利" class="edit"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="dl_row big_row">
        <p class="left">设备ID预警</p>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p style="width: 30%">同一个ID设备下注册或游戏账户数量大于</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; align-items: center; width: 50%">
                <el-input placeholder="请输入" style="width: 60%"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="dl_row big_row">
        <p class="left">IP风控预警</p>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p style="width: 30%">同一个IP地址下注册或游戏的账户数量大于</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; align-items: center; width: 50%">
                <el-input placeholder="请输入" style="width: 60%"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="dl_row big_row">
        <p class="left">身份信息风控预警</p>
      </div>
      <div class="dl_row sub_row" style="align-items: flex-start">
        <p style="width: 30%">同一个支付途径进行充值</p>
        <div class="right">
          <div class="line">
            <div class="content">
              <div style="display: flex; align-items: center; width: 50%">
                <el-input placeholder="请输入" style="width: 60%"></el-input>
              </div>
              <div style="display: flex; width: 30%; align-items: center">
                <p style="width: 25%">风控等级</p>
                <el-select placeholder="请选择风控等级" class="edit"></el-select>
              </div>
            </div>
            <el-button>+</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="justify-content: center; display: flex">
    <el-button type="primary">确认</el-button>
    <el-button>取消</el-button>
  </div>
</template>
<style lang="scss"></style>
