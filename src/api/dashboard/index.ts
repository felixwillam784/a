import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';

/**
 *
 * @param data {LoginForm}
 * @returns
 */
export function platformOverviewApi(token: string): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/dashboard/platform-overview', {headers : {
        Authorization: token,
    }});
}

export function depositWithdrawDataApi(token: string): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/dashboard/deposit-withdrawal', {headers : {
      Authorization: token,
  }});
}

export function userDataAnalysisApi(token: string): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/dashboard/user-data', {headers : {
      Authorization: token,
  }});
}

export function userRetentionDataApi(token: string): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/dashboard/user-retention', {headers : {
      Authorization: token,
  }});
}

export function agencyDataAnalysisApi(token: string): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/dashboard/agent-data', {headers : {
      Authorization: token,
  }});
}

export function agentRetentionApi(token: string): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/dashboard/agent-retention', {headers : {
      Authorization: token,
  }});
}

export function gameDataApi(token: string): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/dashboard/game-data', {headers : {
      Authorization: token,
  }});
}

