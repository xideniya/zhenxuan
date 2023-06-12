import request from '@/utils/request.ts'
import {
  Attr,
  CategoryId,
  CategoryResponseData,
} from '@/api/product/attr/type.ts'
enum API {
  GET_CATEGORY_1_URL = '/admin/product/getCategory1',
  GET_CATEGORY_2_URL = '/admin/product/getCategory2',
  GET_CATEGORY_3_URL = '/admin/product/getCategory3',
  GET_CATEGORY_LIST_URL = '/admin/product/attrInfoList',
  ADD_OR_EDIT_ATTR_URL = '/admin/product/saveAttrInfo',
  REMOVE_ATTR_URL = '/admin/product/deleteAttr',
}
export const reqGetCategory_1 = () => {
  return request.get<any, CategoryResponseData>(API.GET_CATEGORY_1_URL)
}
export const reqGetCategory_2 = (cat2: number) => {
  return request.get<any, CategoryResponseData>(
    API.GET_CATEGORY_2_URL + '/' + cat2,
  )
}
export const reqGetCategory_3 = (cat3: number) => {
  return request.get<any, CategoryResponseData>(
    API.GET_CATEGORY_3_URL + '/' + cat3,
  )
}
export const reqGetAttrInfoList = (cat: CategoryId) => {
  return request.get<any, any>(
    API.GET_CATEGORY_LIST_URL +
      '/' +
      cat.category_1_id +
      '/' +
      cat.category_2_id +
      '/' +
      cat.category_3_id,
  )
}
// 修改或添加属性值
export const reqAddOrEditAttr = (data: Attr) => {
  return request.post<any, any>(API.ADD_OR_EDIT_ATTR_URL, data)
}
export const reqRemoveAttr = (attrId: number | string) => {
  return request.delete<any, any>(API.REMOVE_ATTR_URL + `/${attrId}`)
}
