import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';


/*export function depositOrderListApi(token: string): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/deposit-order/list', {headers : {
        Authorization: token,
    }});
}*/

export function getManualPaymentList(token: string, formData: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.get(baseURL+'/manual/payment', {headers : {
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
    return axios.get(baseURL+'/withdrawal/ban', {headers : {
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
    return axios.delete(baseURL+`/withdrawal/black-list/delete`,{
        headers:{Authorization: token},
        params:{id:user_id}
    });
}

export function getDepositChannelList(token:string, formData:any){
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/deposit-channel/list', {headers : {
        Authorization: token,
    }, params:{
        same_key1: "deposit_channel",
        same_val1: formData.deposit_channel,
        page_num: formData.pageNum,
        page_size: formData.pageSize,
    }});

}

export function addDepositeChannel(token: string, formData:any): any {

    const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.post(baseURL+'/deposit-channel/add', {
        product_id: formData.product_id,
        channel_name: formData.channel_name,
        channel_remark: formData.channel_remark,
        channel_status: formData.channel_status,
        currency_type: formData.currency_type,
        handling_fee: formData.handling_fee.trim()!=="" ? parseFloat(formData.handling_fee) : 0,
        maxium_recharge_amount: formData.maxium_recharge_amount.trim() !== "" ? parseFloat(formData.maxium_recharge_amount) : 0,
        minium_recharge_amount: formData.minium_recharge_amount.trim() !== "" ? parseFloat(formData.minium_recharge_amount) : 0,
        payment_method: formData.payment_method,
    }, {
        headers:{Authorization: token}
    });
}

export function updateDepositeChannel(token: string, formData:any): any {

    const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.post(baseURL+'/deposit-channel/update', {
        product_id: formData.product_id,
        channel_name: formData.channel_name,
        channel_remark: formData.channel_remark,
        channel_status: formData.channel_status,
        currency_type: formData.currency_type,
        handling_fee: formData.handling_fee,
        maxium_recharge_amount: formData.maxium_recharge_amount.trim() !== "" ? parseFloat(formData.maxium_recharge_amount) : 0,
        minium_recharge_amount: formData.minium_recharge_amount.trim() !== "" ? parseFloat(formData.minium_recharge_amount) : 0,
        payment_method: formData.payment_method,
    }, {
        headers:{Authorization: token}
    });
}

export function getChannelAllList(token:string){
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/deposit-channel/all-list', {headers : {
        Authorization: token,
    }});

}

export function getProductIDAllList(token:string){
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.get(baseURL+'/deposit-channel/all-product-id-list', {headers : {
        Authorization: token,
    }});

}

export function getWithdrawlReviewList(token:string, formData:any){
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/withdrawal/review', {headers : {
        Authorization: token,
    }, params:{
        user_account:formData.user_account,
        submission_start:Math.floor(new Date(formData.submission_time[0]).getTime() / 1000),
        submission_end:Math.floor(new Date(formData.submission_time[1]).getTime() / 1000),
        page_num:formData.page_num,
        page_size:formData.page_size,
    }});
}

export function getDepositeOrderList(token:string, formData:any){
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.get(baseURL+'/deposit-order/list', {headers : {
        Authorization: token,
    }, params:{
        user_account:formData.user_account,
        submission_start:Math.floor(new Date(formData.order_update_time[0]).getTime() / 1000),
        submission_end:Math.floor(new Date(formData.order_update_time[1]).getTime() / 1000),
        page_num:formData.page_num,
        page_size:formData.page_size,
    }});
}

export function setDepositeAmount(token: string, id:string, order_amount:number): any {

    const baseURL = import.meta.env.VITE_APP_BASE_API;
    return axios.post(baseURL+'/deposit/suppliment', {
        id:id,
        order_amount:order_amount,
    }, {
        headers:{Authorization: token}
    });
}