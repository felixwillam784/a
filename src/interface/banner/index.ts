
// banner list data types
export interface BannerListData {
  id: number,
  name: string,
  desc: string,
  sort: number,
  condition: string,
  click_feedback: number,
  content: string,
  target: number,
  on_time: number,
  off_time: number,
  image: string,
  activity_id: number
  is_disappear: number
  replace_id: number,
  remark: string,
  status: boolean
}
//get BannerList Response Types
export type GetBannerListResponse = {
  code: number | string
  message: string
  data: {
    list: Array<BannerListData>
  }
}

export type GetBannerDetailResponse = {
  code: number | string
  message: string
  data: BannerListData
}

export type GetBannerAddResponse = {
  code: number | string
  message: string
}

export type GetBannerUpdateResponse = {
  code: number | string
  message: string
}

export type GetBannerDeleteResponse = {
  code: number | string
  message: string
}