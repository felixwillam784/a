export interface GetActiveManagementData {
    event_id: string;
    event_type: string;
    event_name: string;
    event_description: string;
    trigger_condition: string;
    takin_condition: string;
    event_weight: string;
    code_rebate: string;
    bonus_id: string;
    event_takin_time: string;
    event_takin_cycle: string;
    times_in_cycle: string;
    event_active_time: string;
    event_time: string;
    event_status: string;
}

export interface GetActiveManagementDetailData {
    event_id: string;
    event_type: string;
    event_name: string;
    event_description: string;
    trigger_condition: Array<ActiveCondition>;
    takin_condition: Array<ActiveCondition>;
    event_weight: number|string;
    code_rebate: number|string;
    deposite_threshold:number|string;
    bonus_id: Array<ActiveBonus>;
    event_takin_time: string;
    event_takin_cycle: string;
    times_in_cycle: number | string;
    event_active_time: string;
    event_time: string;
    reamrk:string;
    event_status: string;
}

export interface ActiveCondition{
    condition:string;
    amount:number | string;
}

export interface ActiveBonus{
    deposite_minimum:number | string;
    deposite_maximum:number | string;
    bonus_id:number | string;
}