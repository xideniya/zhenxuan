import { SkuData } from '@/api/product/spu/type.ts'

interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
export interface SkuInfo extends ResponseData {
  data: SkuData
}
