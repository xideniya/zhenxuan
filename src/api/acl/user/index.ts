import request from '@/utils/request.ts'
import {
  AssignRole,
  RoleResponse,
  UserParams,
  userResponse,
} from '@/api/acl/user/type.ts'
enum API {
  USER_URL = '/admin/acl/user',
  NEW_USER_URL = '/admin/acl/user/save',
  UPDATE_USER_URL = '/admin/acl/user/update',
  ROLE_URL = '/admin/acl/user/toAssign/',
  ASSIGN_ROLE_URL = '/admin/acl/user/doAssignRole',
  REMOVE_USER_BY_ID = '/admin/acl/user/remove/',
  REMOVE_USER_GROUP = '/admin/acl/user/batchRemove',
}
export const reqUser = (page: number, limit: number, username: string) => {
  return request.get<any, userResponse>(
    API.USER_URL + `/${page}/${limit}?username=${username}`,
  )
}
export const reqNewUser = (userParams: UserParams) => {
  if (userParams.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, userParams)
  } else {
    return request.post<any, any>(API.NEW_USER_URL, userParams)
  }
}
export const reqRole = (adminId: number) => {
  return request.get<any, RoleResponse>(API.ROLE_URL + adminId)
}
export const reqAssignRole = (data: AssignRole) => {
  return request.post<any, any>(API.ASSIGN_ROLE_URL, data)
}
export const reqRemoveUserByID = (id: number) => {
  return request.delete<any, any>(API.REMOVE_USER_BY_ID + id)
}
export const reqRemoveUserGroup = (idList: number[]) => {
  return request.delete<any, any>(API.REMOVE_USER_GROUP, { data: idList })
}
