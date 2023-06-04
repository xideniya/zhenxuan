import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App, Component } from 'vue'
const allGlobalComponent: { [name: string]: Component } = { SvgIcon }
export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
