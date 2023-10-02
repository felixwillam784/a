import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';


export function getUserListApi(token: string, data:any): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;
      return axios.get(baseURL+'/user/list', {headers : {
          Authorization: token,
      }, params:{...data}});
    // }
    // return axios.get(baseURL+'/dashboard/deposit-withdrawal', {headers : {
    //     Authorization: token,
    // }, params:{
    //   start_date:new Date(daterange[0]).toISOString(),
    //   end_date:new Date(daterange[1]).toISOString()
    // }});
  }
  