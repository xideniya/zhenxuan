import request from '@/utils/request.ts'
import type {
  loginForm,
  loginResponse,
  userResponseData,
} from '@/api/user/type.ts'

enum API {
  LOGIN_URL = '/user/login',
  USER_INFO = '/user/info',
}
// 暴露请求函数
export const reqLogin = (data: loginForm) => {
  return request.post<any, loginResponse>(API.LOGIN_URL, data)
}
export const reqUserinfo = () => {
  return request.get<any, userResponseData>(API.USER_INFO)
}
