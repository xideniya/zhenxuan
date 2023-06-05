export interface loginForm {
  username: string
  password: string
}
// 登录接口返回的数据类型
interface dataType {
  token?: string
  message?: string
}
export interface loginResponse {
  code: number
  data: dataType
}
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}

export interface userResponseData {
  code: number
  data: user
}
