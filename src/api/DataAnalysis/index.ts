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