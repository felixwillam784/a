import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';


export function depositOrderListApi(token: string): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/deposit-order/list', {headers : {
        Authorization: token,
    }});
}

export function getManualPaymentList(token: string, formData: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.get(baseURL+'/manual/payment/', {headers : {
        Authorization: token,

    }, params:{
        user_account:formData.user_account,
        nick_name:formData.nick_name,
        invitation_code:formData.invitation_code,
        page_num:formData.pageNum,
        page_size:formData.pageSize,
    }});


}

