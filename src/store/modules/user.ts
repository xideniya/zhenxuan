import { defineStore } from 'pinia'
import type { User } from './types/types.ts'
import { reqLogin, reqUserinfo, reqLogout } from '@/api/user'
import { set_token, get_token, remove_token } from '@/utils/token.ts'
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes.ts'
import { loginFormData } from '@/api/user/type.ts'
import filterRoute from '@/utils/filterroute.ts'
import router from '@/router'

const useUserStore = defineStore('User', {
  state: (): User => {
    return {
      token: get_token(),
      routes: [], //用于左侧导航菜单
      username: '',
      avatar: '',
      buttons: [], //存储用户按钮权限
    }
  },
  actions: {
    // 登录
    async userLogin(data: loginFormData) {
      const result = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data as string
        set_token(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息好
    async getUserInfo() {
      const result = await reqUserinfo()
      if (result.code === 200) {
        // 用户名称
        this.username = result.data.name
        // 用户头像
        this.avatar = result.data.avatar
        // 用户的按钮权限
        this.buttons = result.data.buttons
        // 根据权限筛选用户动态路由
        const arr = filterRoute(asyncRoutes, result.data.routes)
        // 用于左侧导航栏展示
        this.routes = [...constantRoutes, ...arr, ...anyRoutes]
        // 动态添加路由
        const arr2 = [...arr, ...anyRoutes]
        arr2.forEach((item: any) => {
          router.addRoute(item)
        })
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 退出登录
    async userLogout() {
      const result = await reqLogout()
      if (result.code === 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        remove_token()
        return result.ok
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
