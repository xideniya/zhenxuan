import { ResponseData } from '@/api/product/attr/type.ts'

export interface MenuData {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  select: boolean
  children?: MenuData[]
}
export interface MenuAllResponse extends ResponseData {
  data: MenuData[]
}
export interface MenuParams {
  code: string
  id: number | undefined
  level: number
  name: string
  pid: number
}
