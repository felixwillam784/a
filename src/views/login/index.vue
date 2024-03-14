<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch, nextTick, computed } from "vue";

// 组件依赖
import { ElForm, ElInput } from "element-plus";
import router from "@/router";
import LangSelect from "@/components/LangSelect/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useRoute } from "vue-router";
import { authStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { SigninRequestData } from "@/interface/auth";

const route = useRoute();
const { dispatchSignIn } = authStore();

const loginFormRef = ref(ElForm);
const passwordRef = ref(ElInput);

const state = reactive({
  redirect: "",
  loginForm: {
    name: "",
    password: "",
  } as SigninRequestData,
  loginRules: {
    name: [{ required: true, trigger: "blur" }],
    password: [{ required: true, trigger: "blur", validator: validatePassword }],
  },
  loading: false as boolean,
  passwordType: "password" as string,
  // 大写提示禁用
  capslockTooltipDisabled: true as boolean,
  otherQuery: {},
  clientHeight: document.documentElement.clientHeight,
  showCopyright: true as boolean,
});

function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
}

const {
  loginForm,
  loginRules,
  loading,
  passwordType,
  capslockTooltipDisabled,
  showCopyright,
} = toRefs(state);

function checkCapslock(e: any) {
  const { key } = e;
  state.capslockTooltipDisabled = key && key.length === 1 && key >= "A" && key <= "Z";
}

function showPwd() {
  if (state.passwordType === "password") {
    state.passwordType = "";
  } else {
    state.passwordType = "password";
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
}

const success = computed(() => {
  const { getSuccess } = storeToRefs(authStore());
  return getSuccess.value;
});

async function handleLogin() {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      state.loading = true;
      try {
        await dispatchSignIn(state.loginForm);

        if (success.value) {
          router.push({ path: state.redirect || "/", query: state.otherQuery });
        }
      } catch (error: any) {
        // ElMessage.error(error);
      } finally {
        state.loading = false;
      }
    }
  });
}


watch(
  route,
  () => {
    const query = route.query;
    if (query) {
      state.redirect = query.redirect as string;
      state.otherQuery = getOtherQuery(query);
    }
  },
  { immediate: true }
);

function getOtherQuery(query: any) {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

onMounted(() => {
  window.onresize = () => {
    if (state.clientHeight > document.documentElement.clientHeight) {
      state.showCopyright = false;
    } else {
      state.showCopyright = true;
    }
  };
});
</script>

<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("login.title") }}</h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="name"
          v-model="loginForm.name"
          :placeholder="$t('login.username')"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
          class="login-form-input"
        />
      </el-form-item>

      <el-tooltip
        :disabled="capslockTooltipDisabled"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="passwordRef"
            :key="passwordType"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup="checkCapslock"
            @blur="capslockTooltipDisabled = true"
            @keyup.enter="handleLogin"
            class="login-form-input"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        size="large"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
        >{{ $t("login.login") }}
      </el-button>
    </el-form>

    <div v-if="showCopyright == true" class="copyright">
      <p>{{ $t("login.copyright") }}</p>
      <p>{{ $t("login.icp") }}</p>
    </div>
  </div>
</template>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$dark_gray: #889aa4;

/* reset element-ui css */
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .el-form-item {
      margin-right: 0px !important;
    }
  }

  .svg-container {
    padding: 5px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .el-input {
    display: inline-block;
    height: 36px;
    width: 85%;

    .el-input__wrapper {
      padding: 0;
      background: transparent;
      box-shadow: none;

      .el-input__inner {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $light_gray;
        height: 36px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }

  .el-input__inner {
    &:hover {
      border-color: var(--el-input-hover-border, var(--el-border-color-hover));
      box-shadow: none;
    }

    box-shadow: none;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .copyright {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    color: #cccccc;
  }
}
</style>
@/interface/auth
