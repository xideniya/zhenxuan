interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
export interface RoleResponse extends ResponseData {
  data: {
    records: RoleData[]
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
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuData[]
  select: boolean
}
export interface MenuResponse extends ResponseData {
  data: MenuData[]
}
