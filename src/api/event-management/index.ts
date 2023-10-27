import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';
import { start } from 'nprogress';


export function getRebateConfiguration(token: string,formData:any): any {

  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/activity/rebate-configuration', {headers : {
        Authorization: token,
    }, params:{
      same_key1: "method_name",
      same_val1: formData.method_name,
      same_key2: "fund_type",
      same_val2: formData.fund_type,
      same_key3: "activity_time",
      same_val3: formData.activity_time,
      same_key4: "code_magnification",
      same_val4: formData.code_magnification,
      same_key5: "fixed_value",
      same_val5: formData.fixed_value,
    }});
}

export function addRebateConfiguration(token: string,formData:any): any {

  const {method_id, ...newData} = formData;
  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.post(baseURL+'/activity/rebate-configuration', {
      ...newData
    }, {
        headers:{Authorization: token}
    });
}

export function updateRebateConfiguration(token: string,formData:any): any {

  const {method_id, ...newData} = formData;
  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.put(baseURL+`/activity/rebate-configuration/${method_id}`, {
      ...newData
    }, {
        headers:{Authorization: token}
    });
}

export function deleteRebateConfiguration(token: string,formData:any): any {

  const {method_id, ...newData} = formData;
  const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.delete(baseURL+`/activity/rebate-configuration/${method_id}`,{
        headers:{Authorization: token}
    });
}