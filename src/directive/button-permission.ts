import pinia from '@/store'
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore(pinia)

export const permissionConfig = {
  mounted(el: any, options: any) {
    if (!userStore.buttons.includes(options.value)) {
      el.parentNode.removeChild(el)
    }
  },
}
