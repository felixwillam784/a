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

export function depositWithdrawDataApi(token: string, daterange:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  if(daterange[0] == "" && daterange[1] == "")
  {    
    return axios.get(baseURL+'/dashboard/deposit-withdrawal', {headers : {
        Authorization: token,
    }});
  }
  return axios.get(baseURL+'/dashboard/deposit-withdrawal', {headers : {
      Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString()
  }});
}

export function userDataAnalysisApi(token: string, daterange:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {    
    return axios.get(baseURL+'/dashboard/user-data', {headers : {
        Authorization: token,
    }});
  }
  return axios.get(baseURL+'/dashboard/user-data', {headers : {
      Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString()
  }});
}

export function userRetentionDataApi(token: string, daterange:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {    
    return axios.get(baseURL+'/dashboard/user-retention', {headers : {
        Authorization: token,
    }});
  }
  return axios.get(baseURL+'/dashboard/user-retention', {headers : {
      Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString()
  }});
}

export function agencyDataAnalysisApi(token: string, daterange:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {    
    return axios.get(baseURL+'/dashboard/agent-data', {headers : {
        Authorization: token,
    }});
  }
  return axios.get(baseURL+'/dashboard/agent-data', {headers : {
      Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString()
  }});
}

export function agentRetentionApi(token: string, daterange:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {    
    return axios.get(baseURL+'/dashboard/agent-retention', {headers : {
        Authorization: token,
    }});
  }
  return axios.get(baseURL+'/dashboard/agent-retention', {headers : {
      Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString()
  }});
}

export function gameDataApi(token: string, daterange:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {    
    return axios.get(baseURL+'/dashboard/game-data', {headers : {
        Authorization: token,
    }});
  }
  return axios.get(baseURL+'/dashboard/game-data', {headers : {
      Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString()
  }});
}

