/**
 * Created by hanxueqiang on 19/11/13
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 获取子项目名
try {
  if (process.argv[2] === 'lint') return
  process.env.VUE_APP_PROJECT_NAME = process.argv[3].split('---')[1]
} catch (error) {
  console.log(process.argv)
  console.log(error)
  return
}

// 设置NODE_ENV
const runType = process.argv[2]
if (runType === 'serve') {
  // 本地运行 npm run serve
  process.env.NODE_ENV = 'development'
} else if (runType === 'build') {
  // 打包项目 npm run build
  process.env.NODE_ENV = 'production'
}

// 打印
console.log('-----projectName: ' + process.env.VUE_APP_PROJECT_NAME)
console.log('-----serverEnv: ' + process.env.VUE_APP_SERVER_ENV)

const projectName = process.env.VUE_APP_PROJECT_NAME

module.exports = {
  publicPath: +process.env.VUE_APP_HISTORY_OPEN
    ? `${process.env.VUE_APP_HISTORY_BASE}/${projectName}`
    : (process.env.NODE_ENV === 'production' ? './' : '/'),
  outputDir: `dist/${projectName}`,
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 开发环境服务配置
  devServer: {
    host: '0.0.0.0',
    port: 8899,
    open: false,
    progress: false,
    proxy: {
      [process.env.VUE_APP_PROXY_CODE]: {
        target: process.env.VUE_APP_SERVER_URL,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_PROXY_CODE]: ''
        }
      }
    }
  },

  // 添加webpack配置
  configureWebpack: config => {
    // 定义快捷路径标识
    const myAlias = {
      '@@': Path.resolve(__dirname, './src/resources'),
      '@': Path.resolve(__dirname, './src/projects/', projectName)
    }
    // 自定义插件
    let myPlugins = []
    const isOnline = process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod'
    if (isOnline) {
      // 线上环境启用 js压缩插件
      const myUglifyJsPlugin = new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ['console.log']
          },
          output: {
            comments: false
          }
        },
        parallel: true
      })
      myPlugins.unshift(myUglifyJsPlugin)
    }
    // 更新config
    config.resolve.alias = { ...config.resolve.alias, ...myAlias }
    config.plugins = [...config.plugins, ...myPlugins]
  },

  // 修改webpack配置
  chainWebpack: config => {
    config.entry('app').clear().add(`./src/projects/${projectName}/main.js`)
    config.plugin(`html`).use(HtmlWebpackPlugin, [{
      template: `./src/projects/${projectName}/index.html`,
      templateParameters: {
        BASE_URL: '/',
        PROJECT_NAME: projectName,
        APP_VERSION: process.env.VUE_APP_APP_VERSION
      }
    }]).before('preload')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }

  // 第三方插件选项
  // pluginOptions: {}
}
