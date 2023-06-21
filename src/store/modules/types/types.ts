// 定义仓库数据类型
import type { RouteRecordRaw } from 'vue-router'

export interface User {
  token: string | null
  routes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}
