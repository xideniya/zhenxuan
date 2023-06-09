// 登录接口请求体类型
export interface loginFormData {
  username: string
  password: string
}
export interface responseData {
  code: number
  message: string
  ok: boolean
}
// 登录接口返回类型
export interface loginResponseData extends responseData {
  data: string
}
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
