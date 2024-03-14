import axios, { AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { NetworkData } from '@/net/NetworkData'
import { localStorage } from '@/utils/storage';
import useStore from '@/store';
import { useRoute, useRouter } from "vue-router";
import { isEmpty } from 'lodash'
import qs from 'qs'
import router from '@/router';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

function stringify (data: any) {
  return qs.stringify(data, { allowDots: true, encode: false })
}


// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }

    const networkData = NetworkData.getInstance()

    if (networkData.getToken() != undefined) {
      config.headers.Authorization = 'Bearer ' + networkData.getToken();
    }

    // json
    if (!isEmpty(config.data.params)) {
      config.url = config.url + '?' + stringify(config.data.params)
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);


// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = response.data;
    if (code === "00000" || code === "00") {
      return response.data;
    } else {
      // 响应数据为二进制流处理(Excel导出等)
      if (response.data instanceof ArrayBuffer) {
        return response;
      }
      ElMessage({
        message: message || '系统出错',
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(new Error(message || 'Error'));
    }
  },
  (error: any) => {
    if (error.response) {
      const { config, data } = error.response;
      // 特殊处理登录请求的错误
      if (config && config.url && config.url.includes('/login')) {
        ElMessage.error('登录失败，请检查用户名和密码是否正确');
      } else if (error.response.status === 401) {
        const networkData = NetworkData.getInstance()
        networkData.resetData();
        router.push(`/login`);
      } else if (error.response.data) {
        const { message } = data;
        ElMessage.error(message || '系统出错');
      } 
      return Promise.reject(error.message);
    } else {
      // 网络错误或服务器未响应
      ElMessage.error('网络错误或服务器无响应');
    }
    return Promise.reject(error);
  }
);




// 导出 axios 实例
export default service;
