import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';

/**
 *
 * @param data {LoginForm}
 * @returns
 */
export function platformOverviewApi(token: string): AxiosPromise {
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/dashboard/platform-overview', {headers : {
        Authorization: token,
    }})
//   return request({
//     url: '/dashboard/platform-overview',
//     method: 'get',
//     headers: {
//       Authorization: token, // 客户端信息Base64明文：mall-admin:123456
//     },
//   });
}

/**
 * 注销
 */
export function logoutApi(data: any, token: string) {
  return request({
    url: '/admin/logout',
    method: 'POST',
    data: data,
    headers: {
      Authorization: token, // 客户端信息Base64明文：mall-admin:123456
    },
  });
}

