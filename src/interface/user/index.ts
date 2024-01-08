export interface GetUserInfo {
    id: number
    name: string
    role_id: number
    token: string
    avatar: string
    roles: Array<string>
    perms: Array<string>
}

export type GetUserInfoResponseData = {
    code: number | string
    data: GetUserInfo
    message: string
}
