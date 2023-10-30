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

export function addManualPayment(token: string, formData: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.post(baseURL+'/manual/payment/add', {
        
            user_account:formData.user_account,
            order_amount:formData.order_amount,
            change_type:formData.change_type,
            code_ratio:formData.code_ratio,
            remark:formData.remark,
        },{
        headers : {
            Authorization: token,
        }});
}

export function getWithDrawalBanList(token: string, formData: any): any {
    
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

export function addBanList(token: string, formData: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.post(baseURL+'/withdrawal/ban/add', {
        
            user_account:formData.user_account,
            nick_name:formData.nick_name,
            withdrawal_account:formData.withdrawal_account,
            ban_reason:formData.ban_reason,
        },{
        headers : {
            Authorization: token,
        }});
}

export function updateBan(token: string, formData: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.post(baseURL+'/withdrawal/ban/update', {
        
            id:formData.id,
            user_account:formData.user_account,
            nick_name:formData.nick_name,
            withdrawal_account:formData.withdrawal_account,
            ban_reason:formData.ban_reason,
            creation_time:formData.creation_time,
            operator:formData.operator,
            ban_remark:formData.ban_remark,
            unblock_remark:formData.unblock_remark,
        },{
        headers : {
            Authorization: token,
        }});
}