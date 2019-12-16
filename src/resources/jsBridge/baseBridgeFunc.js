/**
 * js与原生交互
 * */
import wx from 'weixin-js-sdk'

function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  } else {
    console.log('没有WebViewJavascriptBridge对象，等回调')
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      () => {
        callback(window.WebViewJavascriptBridge)
      },
      false
    )
  }
}

// android
function androidCallHandler (funcName, param, callback) {
  console.log('android', funcName, param)
  setupWebViewJavascriptBridge(bridge => bridge.callhandler(funcName, param, callback))
}

// ios
function iosCallHandler (type, param) {
  console.log('ios', type, param)
  let str = ''
  for (let i in param) {
    str += `?${i}=${param[i]}&`
  }
  str = str.substr(0, str.length - 1)
  console.log(`jsmp://page=${type}${str}`)
  window.location.href = `jsmp://page=${type}${str}`
  // 'jsmp://page=dyddetail?id=666'
}

// wechat
function wechatCallHandler (url, param, isDefault = true) {
  wx.miniProgram.getEnv(res => {
    if (res.miniprogram) {
      if (isDefault) {
        wx.miniProgram.navigateTo({
          url: url
        })
      } else {
        // other ==> https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
        // wx.miniProgram.switchTab
        console.log('其它')
      }
    }
  })
}

export default {
  androidCallHandler,
  iosCallHandler,
  wechatCallHandler
}
