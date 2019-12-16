/**
 * vconsole调试工具
 */
;(function () {
  // 本地开发模式不开启
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) return
  // 打包线上生产环境时不开启
  const isOnline = process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod'
  if (isOnline) return

  // 动态引入，利于chunk分离
  import(/* webpackChunkName: "vconsole" */ 'vconsole').then(res => {
    const VConsole = res.default
    // eslint-disable-next-line no-new
    new VConsole()
  })
})()
