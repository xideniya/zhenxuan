import { defineStore } from 'pinia'
import type { loginForm, loginResponse } from '@/api/user/type.ts'
import type { User } from './types/types.ts'
import { reqLogin, reqUserinfo } from '@/api/user'
import { set_token, get_token } from '@/utils/token.ts'
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
    async userLogin(data: loginForm) {
      try {
        const result: loginResponse = await reqLogin(data)
        if (result.code === 200) {
          this.token = result.data.token as string
          set_token(result.data.token as string)
          return 'ok'
        } else {
          return Promise.reject(new Error(result.data.message))
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUserInfo() {
      const result = await reqUserinfo()
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      }
    },
  },
  getters: {},
})
export default useUserStore
