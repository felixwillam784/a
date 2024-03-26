export interface PromotionListData {
  id: number,
  name: string,
  group_id: string,
  group_name: string,
  desc: string,
  activity_id: number
  image_path: string,
  campaign_text: string
  button: string
  button_text: string
  click_feedback: number,
  content: string,
  target: number,
  on_time: number,
  off_time: number,
  countdown: boolean
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

export type GetPromotionDetailResponse = {
  code: number | string
  message: string
  data: PromotionListData
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