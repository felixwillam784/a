import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';


export function getChargeWidrawReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/deposit-withdrawal-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/deposit-withdrawal-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getRetentionReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/retention-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/retention-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getUserQualityReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/user-quality-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/user-quality-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getAgentActivityReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/agent-activity-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/agent-activity-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getAgentNewReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/agent-new-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/agent-new-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getAgentWarningReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/agent-warning-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/agent-warning-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getGameReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/game-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
      game_id:formData.gameType,
    }});
  }
  return axios.get(baseURL+'/analyze/game-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
    game_id:formData.gameType,
  }});
}

export function getDataSummaryReport(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartDepositeWithdrawalData(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/deposit-withdrawal-data', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/deposit-withdrawal-data', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartfirstChargeCountData(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/first-charge-count', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/first-charge-count', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartfirstChargeAmountData(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/first-charge-amount', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/first-charge-amount', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartfirstActivityRetention(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/activity-retention', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/activity-retention', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartAgentRetention(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/agent-retention', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/agent-retention', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartfirstDepositeRetention(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/first-deposit-retention', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/first-deposit-retention', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartSelfGame(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/self-game', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/self-game', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartThirdGame(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/third-game', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/third-game', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChartDepositeWithdrawalTotalData(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/deposit-withdrawal-total', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/deposit-withdrawal-total', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}

export function getDataSummaryChatGameTotal(token: string, daterange:any, formData:any): any {
  const baseURL = import.meta.env.VITE_APP_BASE_API;
  if(daterange[0] == "" && daterange[1] == "")
  {
    return axios.get(baseURL+'/analyze/data-summary-report/chart/game-total', {headers : {
      Authorization: token,
    }, params:{
      page_num:formData.pageNum,
      page_size:formData.pageSize,
    }});
  }
  return axios.get(baseURL+'/analyze/data-summary-report/chart/game-total', {headers : {
    Authorization: token,
  }, params:{
    start_date:new Date(daterange[0]).toISOString(),
    end_date:new Date(daterange[1]).toISOString(),
    page_num:formData.pageNum,
    page_size:formData.pageSize,
  }});
}