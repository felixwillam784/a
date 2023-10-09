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
  