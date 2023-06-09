import request from '@/utils/request.ts'
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type.ts'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USER_INFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
// 暴露请求函数
//登录
export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}
// 获取用户信息
export const reqUserinfo = () => {
  return request.get<any, userInfoResponseData>(API.USER_INFO_URL)
}
// 退出登录
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
