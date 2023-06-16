interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface User {
  id?: number
  createTime: string
  updateTime: string
  username: string
  password: string
  name: string
  phone: null
  roleName: string
}
export interface userResponse extends ResponseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    orders: null
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
export interface UserParams {
  id?: number | undefined
  name: string
  username: string
  password: ''
}
export interface Role {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
export interface RoleResponse extends ResponseData {
  data: {
    assignRoles: Role[]
    allRolesList: Role[]
  }
}

export interface AssignRole {
  roleIdList: number[]
  userId: number
}
