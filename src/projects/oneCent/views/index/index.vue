<template>
  <div class="index" :class="{ inWxmp: isInWxmp }">
    <headerBar :onBack="onBack"></headerBar>

    <van-pull-refresh v-model="isPullLoading" @refresh="onRefresh">
      <div class="topWrap">
        <!-- 倒计时 -->
        <div class="expire">
          <div>距离活动结束，还剩：</div>
          <van-count-down :time="expireTime" @finish="onExpireFinish">
            <template v-slot="timeData">
              <span class="item">{{ timeData.days }}</span>天
              <span class="item">{{ timeData.hours }}</span>:
              <span class="item">{{ timeData.minutes }}</span>:
              <span class="item">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
        <div class="activityRule" @click="onShowRule">活动规则</div>
      </div>

      <div class="imgStep">
        <!-- 活动头图 -->
        <img src="https://img.yzcdn.cn/vant/logo.png" alt="">
        <!-- 轮播信息 -->
        <div class="carousel one-txt-cut">
          <van-swipe vertical :autoplay="3000" :show-indicators="false" :touchable="false">
            <van-swipe-item v-for="(item, index) in userCarousel" :key="index">
              {{item}}
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <!-- tab栏 -->
      <div class="goodsBox">
        <h4>商品列表</h4>
        <van-tabs
          type="card"
          @click="onTabsClick"
          :swipe-threshold="2"
          color="transparent"
          title-active-color="#000"
          title-inactive-color="#666"
          background="#F2F2F2"
          :offset-top="63"
          :class="{ hideTab: tabList.length < 2 }"
        >
          <van-tab
            v-for="item in tabList"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >
            <!-- 商品列表ul -->
            <van-list
              v-model="isMoreLoading"
              :finished="isMoreFinished"
              :error.sync="isMoreError"
              @load="getTabGoodsList"
              :immediate-check="false"
              class="goodsList"
            >
              <div class="goodsItem" v-for="obj in goodsList" :key="obj.id">
                <div class="imgWrap">
                  <img alt="" v-lazy="obj.img" :key="obj.img">
                  <div class="shareTag">需分享9人</div>
                  <div class="sellOut">
                    <div class="sellOutTxt">已售罄</div>
                  </div>
                </div>
                <div class="titleWrap">
                  <p class="title two-txt-cut">商品标题{{obj.id}}</p>
                </div>
                <div class="price">
                  <span class="yuan">￥</span>
                  <span class="salePrice">0.01</span>
                  <span class="originPrice">￥199.00</span>
                </div>
              </div>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 分享进程悬浮按钮 -->
      <div class="shareListBtn" @click="toShareList">分享进程</div>

      <!-- 获取活动券 -->
      <div class="ticketGetBtn" v-if="!ticketsNum">
        <p class="title">获取活动券</p>
        <p class="tip">(当前剩余活动券{{ticketsNum}}张)</p>
      </div>
    </van-pull-refresh>

    <!-- 规则 -->
    <rules v-model="isShowRule"/>
  </div>
</template>

<script>
import api from '@/api/index'
import headerBar from '@@/components/headerBar/headerBar'
import platform from '@@/utils/platform'
import rules from '@/components/rules'

export default {
  name: 'Index',
  data () {
    return {
      isPullLoading: false,
      expireTime: '',
      ticketsNum: 0,
      userCarousel: [],
      activeBar: '',
      tabList: [],
      goodsList: [],
      pageNo: 1,
      isMoreLoading: false,
      isMoreFinished: false,
      isMoreError: false,
      isInWxmp: platform.isWxmp,
      isShowRule: false
    }
  },
  computed: {},
  created () {
    this.$loading.show()
    this.getIndex()
    this.getExpireTime()
    this.getUserCarousel()
  },
  mounted () {
    this.$nextTick(vm => {
      const tabsEle = document.querySelectorAll('.van-tab')
      tabsEle.forEach(v => {
        v.style.flexBasis = '38%'
      })
    })
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isPullLoading = false
      }, 500)
    },
    onExpireFinish () {
      console.log('倒计时结束')
    },
    // 切换tab栏
    onTabsClick (name, title) {
      if (this.activeBar === name) return
      this.activeBar = name
      // this.goodsList = []
      this.getTabGoodsList(1)
    },
    getIndex () {
      api.getIndex().then(res => {
        console.log(res)
      })
      // 假数据
      this.tabList = [
        { id: 1, name: '分类一' },
        { id: 2, name: '分类一' },
        { id: 3, name: '分类一' }
      ]
      this.activeBar = this.tabList[0].id
      this.getTabGoodsList(1)
      this.$loading.hide()
    },
    getTabGoodsList (isInit) {
      if (isInit) {
        this.pageNo = 1
        this.goodsList = []
      } else {
        this.pageNo++
      }
      // const params = {
      //   id: this.activeBar,
      //   pageNo: this.pageNo
      // }
      // api.getTabGoodsList(params).then(res => {
      //   console.log(res)
      // })
      // console.log(this.pageNo)
      // 假数据
      let arr = []
      for (let i = 1; i < 17; i++) {
        arr.push({
          id: 16 * (this.pageNo - 1) + i,
          img: 'https://img.yzcdn.cn/vant/logo.png'
        })
      }
      if (this.pageNo > 2) {
        setTimeout(() => {
          this.isMoreError = true
        }, 2000)
        return
      }
      setTimeout(() => {
        this.goodsList = [...this.goodsList, ...arr]
        this.isMoreLoading = false
      }, 500)
    },
    getExpireTime () {
      // api.getExpireTime().then(res => {
      //   console.log(res)
      // })
      // 假数据
      this.expireTime = 3 * 60 * 60 * 1000
    },
    getUserCarousel () {
      // api.getUserCarousel().then(res => {
      //   console.log(res)
      // })
      // 假数据
      this.userCarousel = [
        '***用户名，已成功抢购199元的”商品主标题',
        '***用户名，已成功抢购23元的”商品主标题',
        '***用户名，已成功抢购555元的”商品主标题'
      ]
    },
    toShareList () {
      this.$router.push({
        name: 'ShareList'
      })
    },
    onLoadMore () {},
    onBack () {
      if (this.$route.name === 'Index') {
        // 去原生页
      } else {
        this.$router.go(-1)
      }
    },
    onShowRule () {
      this.isShowRule = true
    }
  },
  components: { headerBar, rules }
}
</script>

<style lang="less" scoped>
@imgUrl: '~@/assets/images/';

.index {
  height: 100%;
  padding-top: 64px;

  &.inWxmp {
    padding-top: 0;
  }
}
.van-pull-refresh {
  height: 100%;
  overflow: auto;
  // padding-bottom: 55px;

  /deep/ .van-pull-refresh__track {
    height: 100%;
  }
}

.topWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FEF8EC;
  height: 33px;
  line-height: 33px;
  font-size: 12px;
  padding: 0 12px;
  color: #666;

  .expire {
    display: flex;
    align-items: center;

    .van-count-down {
      font-size: 12px;
      color: #666;
      display: flex;
      align-items: center;

      .item {
        display: block;
        width:19px;
        height:19px;
        background:rgba(51,51,51,1);
        border-radius:3px;
        text-align: center;
        color: #fff;
        margin: 0 3px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
  .activityRule {
    color: #1B8DFF;
  }
}

.imgStep {
  position: relative;

  img {
    width: 100%;
  }

  .carousel {
    position: absolute;
    left: 8px;
    top: 8px;

    .van-swipe {
      height: 23px;
      line-height: 23px;
      background-color: #000;
      opacity: .39;
      border-radius: 13px;
      width: 310px;
      padding: 0 10px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      color:rgba(255,255,255,1);
    }
  }
}

.goodsBox {
  h4 {
    text-align: center;
    height:45px;
    line-height:45px;
    font-size:18px;
    font-family:PingFangSC-Medium,PingFang SC;
    color:rgba(0,0,0,1);
    background: url('@{imgUrl}tabsTitleBg.png') 112px center no-repeat, url('@{imgUrl}tabsTitleBg.png') 244px center no-repeat;
    background-size: 4.5%;
  }
  .van-tabs {
    /deep/ .van-tabs__nav--card {
      margin: 0;
      border-radius: 0;
      border: none;

      .van-tab {
        border: none;

        &.van-tab--active {
          span {
            width:88px;
            height:30px;
            background:rgba(253,197,83,1);
            border-radius:15px;
            margin: 0 auto;
          }
        }
      }
    }
    &.hideTab {
      /deep/ .van-tabs__wrap {
        display: none;
      }
    }
  }
}

.ticketGetBtn {
  position: fixed;
  left: 50%;
  bottom: 13px;
  transform: translateX(-50%);
  width: 335px;
  background-color: #FF5742;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  padding: 4px 0;

  .title {
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    color:rgba(255,255,255,1);
    padding-bottom: 3px;
  }
  .tip {
    font-size: 11px;
  }
}

.shareListBtn {
  position: fixed;
  bottom: 66px;
  right: -20px;
  z-index: 999;
  background-color: #fff;
  width: 110px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  box-shadow: 0 1px 5px #ccc;
  padding-left: 35px;
  font-size: 12px;
  background: #fff url('@{imgUrl}shareListIcon.png') 6px center no-repeat;
  background-size: 22%;
}

.goodsList {
  display: flex;
  padding: 10px 7px;
  justify-content: space-between;
  flex-wrap: wrap;

  /deep/ & > div {
    width: 100%;
  }
  .goodsItem {
    width: 177px;
    background-color: #fff;
    margin-bottom: 7px;
    border-radius: 6px;
    overflow: hidden;
    padding-bottom: 8px;

    .imgWrap {
      position: relative;
      height: 177px;
      overflow: hidden;

      img {
        width: 100%;
      }
      .shareTag {
        position: absolute;
        bottom: 4px;
        right: 4px;
        background-color: #FF5742;
        font-size: 12px;
        padding: 5px 12px;
        border-radius: 11px;
        color: #fff;
      }
      .sellOut {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: .74;

        .sellOutTxt {
          font-size: 12px;
          color: #fff;
          padding: 1px 14px 0;
          height: 21px;
          line-height: 21px;
          border-radius: 13px;
          opacity: .8;
          background-color: #000;
          position: absolute;
          left: 50%;
          bottom: 38px;
          transform: translateX(-50%);
        }
      }
    }
    .titleWrap {
      height: 48px;
      overflow: hidden;
      padding: 4px 8px 10px;
      font-size: 12px;
      font-family:PingFangSC-Regular,PingFang SC;
      color: #333;
      line-height: 17px;
    }
    .price {
      padding: 0 8px;

      .yuan {
        color: #FD2A32;
        font-size: 10px;
      }
      .salePrice {
        color: #FD2A32;
        font-size: 14px;
        margin-right: 4px;
      }
      .originPrice {
        text-decoration: line-through;
        color: #999;
        font-size: 11px;
      }
    }
  }
}
</style>
