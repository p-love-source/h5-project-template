/**
 * 全局路由导航守卫
 */
import router from '@/router'
import glg from '@@/utils/globalGuards'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // 存储登录状态
  glg.setLoginStatus(to, from)
  // 判断路由是否需要登录访问
  glg.judgeNeedLogin(to, from)
  // 路由发生变化修改页面title
  glg.setDocumentTitle(to, from)

  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
