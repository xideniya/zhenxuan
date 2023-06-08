import { defineStore } from 'pinia'
import type { User } from './types/types.ts'
import { reqLogin, reqUserinfo, reqLogout } from '@/api/user'
import { set_token, get_token, remove_token } from '@/utils/token.ts'
import { routes } from '@/router/routes.ts'

const useUserStore = defineStore('User', {
  state: (): User => {
    return {
      token: get_token(),
      routes: routes,
      username: '',
      avatar: '',
    }
  },
  actions: {
    // 登录
    async userLogin(data: any) {
      const result: any = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data as string
        set_token(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const result = await reqUserinfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
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
