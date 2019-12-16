import http from '@/utils/http'

export default {
  // 获取落地页首页数据
  getIndex: data => http({ name: 'kyk.richLandlord.pointsList', data }),
  // 获取分类商品列表
  getTabGoodsList: data => http({ name: 'kyk.richLandlord.pointsList', data }),
  // 获取剩余时间
  getExpireTime: data => http({ name: 'kyk.richLandlord.pointsList', data }),
  // 获取用户购买轮播信息
  getUserCarousel: data => http({ name: 'kyk.richLandlord.pointsList', data }),
  // 获取分享进程列表
  getShareList: data => http({ name: 'kyk.oneCoinV2.getOrderList', data })
}
