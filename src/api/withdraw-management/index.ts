import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';


export function depositOrderListApi(token: string): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/deposit-order/list', {headers : {
        Authorization: token,
    }});
}

