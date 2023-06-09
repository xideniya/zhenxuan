import request from '@/utils/request.ts'
import {
  TradeMark,
  TrademarkResponseData,
} from '@/api/product/trademark/type.ts'
enum API {
  TRADE_MARK_URL = `/admin/product/baseTrademark/`,
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  REMOVE_TRADEMARK_URL = '/admin/product/baseTrademark/remove',
}
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponseData>(
    API.TRADE_MARK_URL + `${page}/${limit}`,
  )
}
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}
export const reqRemoveTrademark = (id: number) => {
  return request.delete<any, any>(API.REMOVE_TRADEMARK_URL + '/' + id)
}
