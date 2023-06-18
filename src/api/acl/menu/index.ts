import request from '@/utils/request.ts'
import { MenuAllResponse, MenuParams } from '@/api/acl/menu/type.ts'
enum API {
  ALL_MENU_URL = '/admin/acl/permission',
  NEW_MENU_URL = '/admin/acl/permission/save',
  EDIT_MENU_URL = '/admin/acl/permission/update',
  DELETE_MENU_URL = '/admin/acl/permission/remove/',
}

export const reqALlMenu = () => {
  return request.get<any, MenuAllResponse>(API.ALL_MENU_URL)
}
export const reqNewORUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.EDIT_MENU_URL, data)
  } else {
    return request.post<any, any>(API.NEW_MENU_URL, data)
  }
}
export const reqDeleteMenu = (id: number) => {
  return request.delete<any, any>(API.DELETE_MENU_URL + id)
}
