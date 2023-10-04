import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';


export function getChargeWidrawReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/deposit-withdrawal-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/deposit-withdrawal-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getRetentionReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/retention-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/retention-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getUserQualityReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/user-quality-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/user-quality-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getAgentActivityReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/agent-activity-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/agent-activity-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getAgentNewReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/agent-new-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/agent-new-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getAgentWarningReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/agent-warning-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/agent-warning-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getGameReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/game-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
      game_id:formData.gameType,
    }});
  }
  return axios.get(baseURL+'/analyze/game-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
    game_id:formData.gameType,
  }});
}