import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';
import { start } from 'nprogress';

export function getUserListApi(token: string, data: any): any {
  const transformedData: { [key: string]: any } = {};

  const keys = Object.keys(data);
  for (let i = 0; i < keys.length - 2; i++) {
    const newKey = `same_key${i + 1}`;
    const newVal = `same_val${i + 1}`;
    transformedData[newKey] = keys[i];
    transformedData[newVal] = data[keys[i]];
  }
  transformedData['page_num'] = data.page_num;
  transformedData['page_size'] = data.page_size;

  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/list', {
    headers: {
      Authorization: token,
    },
    params: { ...transformedData },
  });
  // }
  // return axios.get(baseURL+'/dashboard/deposit-withdrawal', {headers : {
  //     Authorization: token,
  // }, params:{
  //   start_date:new Date(daterange[0]).toISOString(),
  //   end_date:new Date(daterange[1]).toISOString()
  // }});
}

export function getUserDetailApi(token: string, id: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL + '/user/detail', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
    },
  });
}

export function getUserDetailDepositWithdrawl(token: string, id: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL + '/user/detail/deposit-withdrawal', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
    },
  });
}

export function getUserDetailAgent(token: string, id: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL + '/user/detail/agent', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
    },
  });
}

export function getUserDetailTable(token: string, id: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL + '/user/detail/payment-table-data', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
    },
  });
}

export function getUserDetailFunding(
  token: string,
  id: any,
  daterange: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/funding-details', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      same_key2: 'event_type',
      same_val2: formData.event_type,
      same_key3: 'record_id',
      same_val3: formData.record_id,
      time_interval_key1: 'submission_time',
      start_time1: new Date(daterange[0]).toISOString(),
      end_time1: new Date(daterange[1]).toISOString(),
      amount_interval_key1: 'change_amount',
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
      sort_field: 'time',
      sort_method: 'desc',
    },
  });
}

export function getUserAgentDetail(token: string, id: any, formData: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/agent-details', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      time_interval_key1: 'time',
      start_time1: new Date(formData.dateRange[0]).toISOString(),
      end_time1: new Date(formData.dateRange[1]).toISOString(),
      mount_interval_key1: 'betting_rebate',
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    },
  });
}

export function getUserAgentDetailBetHistory(
  token: string,
  id: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/agent-details/bet-history', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      mount_interval_key1: 'bet_amount',
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    },
  });
}

export function getUserAgentDetailDepositHistory(
  token: string,
  id: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/agent-details/deposit-history', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      mount_interval_key1: 'bet_amount',
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    },
  });
}

export function getUserPromotionDetail(
  token: string,
  id: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/detail/promotion', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      time_interval_key1: 'registration_time',
      start_time1: new Date(formData.dateRange[0]).toISOString(),
      end_time1: new Date(formData.dateRange[1]).toISOString(),
    },
  });
}

export function getUserRechargeRecordDetail(
  token: string,
  id: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/recharge-record', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      time_interval_key1: 'submission_time',
      start_time1: new Date(formData.dateRange[0]).toISOString(),
      end_time1: new Date(formData.dateRange[1]).toISOString(),
      amount_interval_key1: 'recharge_amount',
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    },
  });
}

export function getUserWithDrawlRecordDetail(
  token: string,
  id: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/withdrawal-record', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      time_interval_key1: 'submission_time',
      start_time1: new Date(formData.dateRange[0]).toISOString(),
      end_time1: new Date(formData.dateRange[1]).toISOString(),
      amount_interval_key1: 'receipt_amount',
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
    },
  });
}

export function getUserBettingRecordDetail(
  token: string,
  id: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/betting-record', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      same_key1: 'game',
      same_val1: formData.game,
      same_key2: 'winning_odds',
      same_val2: formData.winning_odds,
      time_interval_key1: 'submission_time',
      start_time1: new Date(formData.dateRange[0]).toISOString(),
      end_time1: new Date(formData.dateRange[1]).toISOString(),
      amount_interval_key1: 'settlement_amount',
      min_amount1: formData.min_amount,
      max_amount1: formData.max_amount,
      amount_interval_key2: 'winning_amount',
      min_amount2: formData.winning_min_amount,
      max_amount2: formData.winning_max_amount,
      sort_field: 'betting_time',
      sort_mode: 'desc',
    },
  });
}

export function getUserLoginRecordDetail(
  token: string,
  id: any,
  formData: any
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/login-record', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
      time_interval_key1: 'login_time',
      start_time1: new Date(formData.dateRange[0]).toISOString(),
      end_time1: new Date(formData.dateRange[1]).toISOString(),
    },
  });
}

export function getUserMoneyFlow(token: string, formData: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  let start_date = new Date(formData.flow_date);
  start_date.setHours(0);
  start_date.setMinutes(0);
  start_date.setSeconds(0);
  start_date.setMilliseconds(0);

  let end_date = new Date(formData.flow_date);
  end_date.setHours(23);
  end_date.setMinutes(59);
  end_date.setSeconds(59);
  end_date.setMilliseconds(999);

  return axios.get(baseURL + '/user/money-flow', {
    headers: {
      Authorization: token,
    },
    params: {
      same_key1: 'customer_label',
      same_val1: formData.customer_label,
      like_key1: 'customer_name',
      ike_val1: formData.customer_name,
      like_key2: 'customer_account',
      like_val2: formData.customer_account,
      time_interval_key1: 'flow_date',
      start_time1: start_date.toISOString(),
      end_time1: end_date.toISOString(),
      page_num: formData.pageNum,
      page_size: formData.pageSize,
    },
  });
}

export function getUserMoneyFlowDetail(token: string, id: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/user/money-flow/detail', {
    headers: {
      Authorization: token,
    },
    params: {
      user_id: id,
    },
  });
}

export function getAgentlist(token: string, customer_account: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/agent/list', {
    headers: {
      Authorization: token,
    },
    params: {
      customer_account: customer_account,
    },
  });
}

export function getAgentSettinglist(token: string): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.get(baseURL + '/agent/setting/list', {
    headers: {
      Authorization: token,
    },
  });
}

export function getAgentRelationshipList(
  token: string,
  formData: any,
  relation_level: number
): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;

  return axios.get(baseURL + '/agent/relationship/list', {
    headers: {
      Authorization: token,
    },
    params: {
      ...formData,
      relation_level: 1,
    },
  });
}

export function updateAgentRealtionSetting(token: string, formData: any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  return axios.post(
    baseURL + '/agent/setting/update',
    {
      data: [...formData],
    },
    {
      headers: { Authorization: token },
    }
  );
}
