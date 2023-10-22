import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';

export function getBlackList(token: string, formData: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.get(baseURL+'/withdrawal/ban/', {headers : {
        Authorization: token,
    }, params:{
        user_account:formData.user_account,
        nick_name:formData.nick_name,
        withdrawal_account:formData.withdrawal_account,
        page_num:formData.pageNum,
        page_size:formData.pageSize,
    }});
}