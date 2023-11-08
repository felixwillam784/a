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

export function getBlacklist(token: string, formData:any): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/withdrawal/black-list', {headers : {
        Authorization: token,
    }, params:{
        same_key1: "user_account",
        same_val1: formData.user_account,
        same_key2: "nick_name",
        same_val2: formData.nick_name,
        time_interval_key1: "blackout_time",
        start_time1: formData.ban_time[0],
        end_time1: formData.ban_time[1],
        page_num: formData.pageNum,
        page_size: formData.pageSize
    }});
}

export function addBlackList(token: string,black:any): any {

    const baseURL = import.meta.env.VITE_APP_BASE_API;
      return axios.post(baseURL+'/withdrawal/black-list/add', {
            user_account: black.user_account,
            ban_mark: black.creation_reason,
            creation_reason: black.ban_remark
      }, {
          headers:{Authorization: token}
      });
  }
  
  export function deleteblackList(token: string,user_id:any): any {

    const baseURL = import.meta.env.VITE_APP_BASE_API;
    console.log(user_id);
      return axios.delete(baseURL+`/withdrawal/black-list/delete`,{
          headers:{Authorization: token},
          params:{id:user_id}
      });
  }