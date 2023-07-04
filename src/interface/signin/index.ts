export interface SigninRequestData {
  account: string
  password: string
}

export type GetSigninResponseData = {
  code: number
  token: string
  message: string
}