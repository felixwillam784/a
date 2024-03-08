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
    const { code, msg } = response.data;
    if (code === "00000") {
      return response.data;
    } else if (code === "00") {
      return response.data;
    } else {
      // 响应数据为二进制流处理(Excel导出)
      if (response.data instanceof ArrayBuffer) {
        return response;
      }

      ElMessage({
        message: msg || '系统出错',
        type: 'error',
      });

      return Promise.reject(new Error(msg || 'Error'));
    }
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data;
      if (code === '06') {
        const networkData = NetworkData.getInstance()
        networkData.resetData();
        router.push(`/login`);
      } else {
        ElMessage({
          message: msg || '系统出错',
          type: 'error',
        });
      }
    }
    return Promise.reject(error.message);
  }
);




// 导出 axios 实例
export default service;
