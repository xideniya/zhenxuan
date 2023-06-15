import request from '@/utils/request.ts'
import {
  BaseSaleAttrResponse,
  imageListResponse,
  SaleAttrResponse,
  SkuInfoData,
  SPU,
  SPUResponseData,
  trademarkResponse,
} from '@/api/product/spu/type.ts'
enum API {
  PRODUCT_URL = '/admin/product',
  TRADEMARK_LIST_URL = '/admin/product/baseTrademark/getTrademarkList',
  SPU_IMAGE_LIST = '/admin/product/spuImageList',
  SPU_SALE_ATTR_LIST = '/admin/product/spuSaleAttrList',
  BASE_SALE_ATTR_LIST = '/admin/product/baseSaleAttrList',
  // 追加新的spu
  ADD_SPU_URL = '/admin/product/saveSpuInfo',
  // 修改已有的spu
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  // 添加sku
  SAVE_SKU_INFO_URL = '/admin/product/saveSkuInfo',
  FIND_SKU_BY_SPUID = '/admin/product/findBySpuId',
  // 删除spu
  DELETE_SPU = '/admin/product/deleteSpu',
}
export const reqGetProduct = (
  page: number,
  limit: number,
  c3id: number | undefined,
) => {
  return request.get<any, SPUResponseData>(
    API.PRODUCT_URL + `/${page}/${limit}?category3Id=${c3id}`,
  )
}
export const reqGetTrademarkList = () => {
  return request.get<any, trademarkResponse>(API.TRADEMARK_LIST_URL)
}
export const reqGetSpuImageList = (spuId: number) => {
  return request.get<any, imageListResponse>(API.SPU_IMAGE_LIST + '/' + spuId)
}
export const reqSpuSaleAttrList = (spuId: number) => {
  return request.get<any, SaleAttrResponse>(
    API.SPU_SALE_ATTR_LIST + '/' + spuId,
  )
}
export const reqBaseSaleAttrList = () => {
  return request.get<any, BaseSaleAttrResponse>(API.BASE_SALE_ATTR_LIST)
}
export const addOrUpdateSPu = (data: SPU) => {
  if (!data.id) {
    return request.post<any, any>(API.ADD_SPU_URL, data)
  } else {
    return request.post<any, any>(API.UPDATE_SPU_URL, data)
  }
}
export const saveSkuInfo = (data: any) => {
  return request.post<any, any>(API.SAVE_SKU_INFO_URL, data)
}
export const productFindBySpuId = (spuId: number) => {
  return request.get<any, SkuInfoData>(API.FIND_SKU_BY_SPUID + '/' + spuId)
}
export const deleteSPU = (spuId: number) => {
  return request.delete<any, any>(API.DELETE_SPU + '/' + spuId)
}
