import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';

export function getGameConfigList(token: string, formData: any): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.get(baseURL+'/game/config', {headers : {
        Authorization: token,
    }, params:{
        same_key1: "game_id",
        same_val1: formData.game_id,
        same_key2: "game_supplier",
        same_val2: formData.game_supplier,
        same_key3: "game_maker",
        same_val3: formData.game_maker,
        same_key4: "game_trial",
        same_val4: formData.game_trial,
        same_key5: "game_name",
        same_val5: formData.game_name,
        same_key6: "game_state",
        same_val6: formData.game_state,
        same_key7: "game_group",
        same_val7: formData.game_group,
        same_key8: "game_label",
        same_val8: formData.game_label,
        same_key9: "card_number",
        same_val9: formData.card_number,
        page_num: formData.pageNum,
        page_size: formData.pageSize
    }});
}

export function doBatchAction(token: string, type:any, game_id_list: any): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;

    return axios.post(baseURL+'/game/config/batch-action',
        {
            action_type:type,
            game_id_list:game_id_list,
        },{
        headers : {
            Authorization: token,
        }});
        
}

export function getGameDistributionList(token: string, formData: any, api_type:number): any {
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.get(baseURL+'/game/distribution', {headers : {
        Authorization: token,
    }, params:{
        game_group: formData.game_group,
        page_type: api_type,
        same_key1: "game_id",
        same_val1: formData.game_id,
        same_key2: "game_supplier",
        same_val2: formData.game_supplier,
        same_key3: "game_maker",
        same_val3: formData.game_maker,
        same_key4: "game_name",
        same_val4: formData.game_name,
        same_key5: "game_state",
        same_val5: formData.game_state,
        same_key6: "game_label",
        same_val6: formData.game_label,
        page_num: formData.page_num,
        page_size: formData.page_size
    }});
}

export function addbatch(token: string, game_group: any, game_id_list: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.post(baseURL+'/game/distribution/add-group', 
        {
            game_group:game_group,
            game_id_list:game_id_list,
        },{
        headers : {
            Authorization: token,
        }});
}

export function deleteBatch(token: string, game_group: any, game_id_list: any): any {
    
    const baseURL = import.meta.env.VITE_APP_BASE_API;
    /**/
    return axios.post(baseURL+'/game/distribution/remove-group', {
        
            game_group:game_group,
            game_id_list:game_id_list,
        },{
        headers : {
            Authorization: token,
        }});
}