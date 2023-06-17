import request from '@/utils/request.ts'
import { MenuResponse, RoleData, RoleResponse } from '@/api/acl/role/type.ts'
enum API {
  ROLE_LIST_URL = '/admin/acl/role/',
  NEW_ROLE_URL = '/admin/acl/role/save',
  EDIT_ROLE_URL = '/admin/acl/role/update',
  DELETE_ROLE_URL = '/admin/acl/role/remove/',
  ALL_PERMISSION_URL = '/admin/acl/permission/toAssign/',
  DO_ASSIGN_URL = '/admin/acl/permission/doAssign',
}
export const reqGetRoleList = (
  page: number,
  limit: number,
  roleName: string,
) => {
  return request.get<any, RoleResponse>(
    API.ROLE_LIST_URL + page + '/' + limit + `?roleName=${roleName}`,
  )
}
export const reqNewOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.EDIT_ROLE_URL, data)
  } else {
    return request.post<any, any>(API.NEW_ROLE_URL, data)
  }
}
export const reqDeleteRole = (id: number) => {
  return request.delete<any, any>(API.DELETE_ROLE_URL + id)
}
export const reqAllPermission = (roleId: number) => {
  return request.get<any, MenuResponse>(API.ALL_PERMISSION_URL + roleId)
}
export const reqDoAssign = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(
    API.DO_ASSIGN_URL + `?roleId=${roleId}&permissionId=${permissionId}`,
  )
}
