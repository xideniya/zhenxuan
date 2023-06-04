import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import GlobalComponent from '@/components/index.ts'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.use(GlobalComponent)
import '@/styles/index.scss'
app.mount('#app')
