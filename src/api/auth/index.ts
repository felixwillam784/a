import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LoginForm, LoginResult, VerifyCode } from './types';

/**
 *
 * @param data {LoginForm}
 * @returns
 */
export function loginApi(data: any): AxiosPromise<LoginResult> {
  return request({
    url: '/admin/login',
    method: 'post',
    data: data,
    headers: {
      Authorization: 'Basic bWFsbC1hZG1pbjoxMjM0NTY=', // 客户端信息Base64明文：mall-admin:123456
    },
  });
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

/**
 * 获取图片验证码
 */
export function getCaptcha(): AxiosPromise<VerifyCode> {
  return request({
    url: 'http://vue3.youlai.tech/prod-api/api/v1/auth/captcha?t=' + new Date().getTime().toString(),
    method: 'get',
  });
}
