export interface SigninRequestData {
  name: string
  password: string
}

export interface SigninResponseData {
  id: number
  name: string
  role_id: number
  token: string
}

export type GetSigninResponseData = {
  code: number | string
  data: SigninResponseData
  message: string
}


export type SignOutResponseData = {
  code: number | string
  message: string
}