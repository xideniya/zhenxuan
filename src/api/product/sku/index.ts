import request from '@/utils/request.ts'
import { SkuInfo, SkuResponseData } from '@/api/product/sku/type.ts'
enum API {
  PRODUCT_LIST_URL = '/admin/product/list',
  ON_SALE_URL = '/admin/product/onSale',
  CANCEL_SALE_URL = '/admin/product/cancelSale',
  SKU_INFO_URL = '/admin/product/getSkuInfo',
  DELETE_SKU_URL = '/admin/product/deleteSku/',
}
export const reqGetProductList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(
    API.PRODUCT_LIST_URL + `/${page}/${limit}`,
  )
}
export const reqOnSaleOrCancelSale = (skuId: number, isSale: number) => {
  if (isSale) {
    return request.get<any, any>(API.CANCEL_SALE_URL + '/' + skuId)
  } else {
    return request.get<any, any>(API.ON_SALE_URL + '/' + skuId)
  }
}
export const reqSkuInfo = (skuId: number) => {
  return request.get<any, SkuInfo>(API.SKU_INFO_URL + '/' + skuId)
}
export const reqDeleteSku = (skuId: number) => {
  return request.delete<any, any>(API.DELETE_SKU_URL + skuId)
}
