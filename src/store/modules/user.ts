import { defineStore } from 'pinia'
import type { loginForm, loginResponse } from '@/api/user/type.ts'
import type { User } from './types/types.ts'
import { reqLogin } from '@/api/user'
import { set_token, get_token } from '@/utils/token.ts'

const useUserStore = defineStore('User', {
  state: (): User => {
    return {
      token: get_token(),
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
  },
  getters: {},
})
export default useUserStore
