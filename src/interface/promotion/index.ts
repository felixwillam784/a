export interface PromotionListData {
  id: number,
  name: string,
  group_id: string,
  group_name: string,
  desc: string,
  activity_id: string
  image: string,
  campaign_text: string
  button: string
  button_text: string
  click_feedback: number,
  content: string,
  target: number,
  on_time: string,
  off_time: string,
  countdown: string
  remark: string,
  status: boolean
}

export interface PromotionGroupData {
  id?: number
  name: string
}


export type GetPromotionListResponse = {
  code: number | string
  message: string
  data: {
    list: Array<PromotionListData>
  }
}
export interface GetPromotionDeleteReq {
  id: number
}

export type GetPromotionGroupListResponse = {
  code: number | string
  message: string
  data: {
    list: Array<PromotionGroupData>
  }
}

export type GetPromotionGroupDeleteRes = {
  code: number | string
  message: string
}