/**
 * 页面交互类型
 * */
import platform from '../utils/platform'
import baseBridgeFunc from './baseBridgeFunc'

// 商品详情
export function dateil (pageName, data, callback) {
  if (platform.isInnerAndroid) {
    console.log('android')
    baseBridgeFunc.androidCallHandler('detail', data, callback)
  } else if (platform.isInnerIos) {
    console.log('ios')
    baseBridgeFunc.iosCallHandler('dyddetail', data)
  } else {
    console.log('wechat')
    baseBridgeFunc.wechatCallHandler(`/pages/Body/pages/details/details?id=${data.id}`)
  }
}
