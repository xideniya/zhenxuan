export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 已有的品牌的数据类型
export interface TradeMark {
  id?: number //新增时没有ID
  tmName: string
  logoUrl: string
}
export type Records = TradeMark[]
// 获取全部已有品牌的数据类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
