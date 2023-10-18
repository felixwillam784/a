import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';


export function getUserListApi(token: string, data:any): any {

  const transformedData: { [key: string]: any } = {};

  const keys = Object.keys(data);
  for(let i = 0; i < keys.length - 2; i ++)
  {
    const newKey = `same_key${i + 1}`;
    const newVal = `same_val${i + 1}`;
    transformedData[newKey] = keys[i];
    transformedData[newVal] = data[keys[i]];
  }
  transformedData['page_num'] = data.page_num;
  transformedData['page_size'] = data.page_size;

    console.log(transformedData);
    const baseURL = import.meta.env.VITE_APP_BASE_API;
      return axios.get(baseURL+'/user/list', {headers : {
          Authorization: token,
      }, params:{...transformedData}});
    // }
    // return axios.get(baseURL+'/dashboard/deposit-withdrawal', {headers : {
    //     Authorization: token,
    // }, params:{
    //   start_date:new Date(daterange[0]).toISOString(),
    //   end_date:new Date(daterange[1]).toISOString()
    // }});
  }
  
export function getUserDetailApi(token: string, id:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/user/detail', {headers : {
      Authorization: token,
  }, params:{
    user_id: id,
  }});
}

export function getUserDetailDepositWithdrawl(token: string, id:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/user/detail/deposit-withdrawal', {headers : {
      Authorization: token,
  }, params:{
    user_id: id,
  }});
}

export function getUserDetailAgent(token: string, id:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/user/detail/agent', {headers : {
      Authorization: token,
  }, params:{
    user_id: id,
  }});
}

export function getUserDetailTable(token: string, id:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL+'/user/detail/payment-table-data', {headers : {
      Authorization: token,
  }, params:{
    user_id: id,
  }});
}

export function getUserDetailFunding(token: string, id:any, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/user/funding-details', {headers : {
      Authorization: token,
    }, params:{
      user_id: id,
      same_key2: "event_type",
      same_val2: formData.event_type,
      same_key3: "record_id",
      same_val3: formData.record_id,
      time_interval_key1: "submission_time",
      start_time1: new Date(daterange[0]).toISOString(),
      end_time1: new Date(daterange[1]).toISOString(),
      amount_interval_key1: "change_amount",
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
      sort_field: "time",
      sort_method: "desc",
      page_num: 1,
      page_size: 10
    }});
  }

export function getUserAgentDetail(token: string, id:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/user/agent-details', {headers : {
      Authorization: token,
    }, params:{
      user_id: id,
      time_interval_key1: "time",
      start_time1: new Date(formData.dateRange[0]).toISOString(),
      end_time1: new Date(formData.dateRange[1]).toISOString(),
      mount_interval_key1: "betting_rebate",
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    }});
  }

export function getUserAgentDetailBetHistory(token: string, id:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/user/agent-details/bet-history', {headers : {
      Authorization: token,
    }, params:{
      user_id: id,
      mount_interval_key1: "bet_amount",
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    }});
  }

export function getUserAgentDetailDepositHistory(token: string,  id:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/user/agent-details/deposit-history', {headers : {
      Authorization: token,
    }, params:{
      user_id: id,
      mount_interval_key1: "bet_amount",
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    }});
  }

export function getUserPromotionDetail(token: string, id:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL+'/user/detail/promotion', {headers : {
    Authorization: token,
  }, params:{
    user_id: id,
    time_interval_key1: "registration_time",
    start_time1: new Date(formData.dateRange[0]).toISOString(),
    end_time1: new Date(formData.dateRange[1]).toISOString(),
  }});
}

export function getUserRechargeRecordDetail(token: string, id:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL+'/user/recharge-record', {headers : {
    Authorization: token,
  }, params:{
    user_id: id,
    time_interval_key1: "submission_time",
    start_time1: new Date(formData.dateRange[0]).toISOString(),
    end_time1: new Date(formData.dateRange[1]).toISOString(),
    amount_interval_key1: "recharge_amount",
    min_amount1: formData.min_amount,
    max_amount1: formData.max_amount,
    page_num: formData.pageNum,
    page_size: formData.pageSize
  }});
}

export function getUserWithDrawlRecordDetail(token: string, id:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL+'/user/withdrawal-record', {headers : {
    Authorization: token,
  }, params:{
    user_id: id,
    time_interval_key1: "submission_time",
    start_time1: new Date(formData.dateRange[0]).toISOString(),
    end_time1: new Date(formData.dateRange[1]).toISOString(),
    amount_interval_key1: "receipt_amount",
    min_amount1: formData.min_amount,
    max_amount1: formData.max_amount,
    page_num: formData.pageNum,
    page_size: formData.pageSize
  }});
}