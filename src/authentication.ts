// 鉴权文件
import router from '@/router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 去掉进度条的小球
NProgress.configure({ showSpinner: false })
import pinia from '@/store'
import useUserStore from '@/store/modules/user.ts'
import setting from '@/setting.ts'
const userStore = useUserStore(pinia)
// 全局前置守卫
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 改变网页标题
  document.title = setting.title + '-' + to.meta.title
  // 获取用户信息和token
  const token = userStore.token
  const username = userStore.username
  if (token) {
    // 登录成功
    if (to.path == '/login') {
      // 登录成功不能访问登录页
      next({ path: '/' })
    } else {
      // 用户登录放行除登录外的其他组件
      if (username) {
        // 有用户信息直接放行
        next()
      } else {
        // 先获取用户信息再放行
        try {
          await userStore.getUserInfo()
          // 刷新的时候是异步路由，获取到用户信息，路由没加载完毕出现白屏
          next({ ...to })
        } catch (error) {
          // token过期，获取不到用户信息
          // 退出登录
          await userStore.userLogout()
          next({
            path: '/login',
            query: {
              redirect: to.path,
            },
          })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach(() => {
  NProgress.done()
})
