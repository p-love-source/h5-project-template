/** * 分享进程 */
<template>
  <div class="shareList">
    <header-bar></header-bar>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list class="shareListBox" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, idx) in list" :key="idx">
          <!--
              1:未支付 2:分享进行中 3:分享完成 4:分享失败 5:已取消
             -->
          <div class="item">
            <div class="topWrap">
              <div class="itemStatus">
                <p class="underWay" v-if="item.order_status == '1'">待付款</p>
                <p class="underWay" v-else-if="item.order_status == '2'">分享中</p>
                <p class="success" v-else-if="item.order_status == '3'">分享成功</p>
                <p class="cancel" v-else-if="item.order_status == '4'">分享失败</p>
                <p class="cancel" v-else>已取消</p>
              </div>

              <!-- <div class="countDown" v-if="item.isShowTime">
                <van-count-down :time="item.count_down" @finish="onFinished(item.order_id,idx)">
                  <template v-slot="timeData">
                    <span class="timeItem">{{ timeData.hours >= 10 ? timeData.hours : `0${timeData.hours}` }}</span>
                    <span class="timeItem">{{ timeData.minutes >= 10 ? timeData.minutes : `0${timeData.minutes}` }}</span>
                    <span class="timeItem">{{ timeData.seconds >= 10 ? timeData.seconds : `0${timeData.seconds}` }}</span>
                  </template>
                </van-count-down>
              </div> -->

              <div
                class="countDown"
                v-if="item.count_down && item.count_down > 0 && (item.order_status == '1' || item.order_status == '2')"
              >
                <p class="text">倒计时</p>
                <van-count-down :time="item.count_down" @finish="onFinished(item.order_id, idx)">
                  <template v-slot="timeData">
                    <span class="timeItem">{{ timeData.hours >= 10 ? timeData.hours : `0${timeData.hours}` }}</span>:
                    <span class="timeItem">{{
                      timeData.minutes >= 10 ? timeData.minutes : `0${timeData.minutes}`
                    }}</span>:
                    <span class="timeItem">{{
                      timeData.seconds >= 10 ? timeData.seconds : `0${timeData.seconds}`
                    }}</span>
                  </template>
                </van-count-down>
              </div>
            </div>
            <div class="bottomWrap">
              <van-image class="itemImg" width="80" height="80" :src="item.small_pic" alt="" v-lazy="item.small_pic" />
              <div class="itemText">
                <p class="two-txt-cut">{{ item.item_name }}</p>
                <!-- left_need_share_num == '0' -->
                <p v-if="item.left_need_share_num">剩余待分享 <span class="shareNum">{{ item.left_need_share_num }}</span>人</p>
              </div>
              <van-button
                class="itemBtn"
                type="info"
                size="small"
                v-if="item.order_status == '1'"
                @click="itemBtnClick('1')"
                >待付款</van-button
              >
              <van-button
                class="itemBtn"
                type="info"
                size="small"
                v-if="item.order_status == '2'"
                @click="itemBtnClick('2')"
                >继续分享</van-button
              >
              <van-button
                class="itemBtn"
                type="info"
                size="small"
                v-if="item.order_status == '3' && item.order_item_id != '0'"
                @click="itemBtnClick('3')"
                >查看订单</van-button
              >
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import headerBar from '@@/components/headerBar/headerBar'
import api from '@/api/index'
export default {
  name: 'ShareList',
  props: {},

  data () {
    return {
      isRefresh: false,
      list: [],
      loading: false,
      finished: false,
      pageNo: 0,
      pageSize: 10,
      total: 0,
      currTime: 0
    }
  },

  computed: {},

  created () {
    this.$loading.show()
  },
  mounted () {},
  methods: {
    onLoad () {
      this.getShareList()
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isRefresh = false
        // TODO 刷新接口
      }, 500)
    },
    itemBtnClick (status) {
      switch (status) {
        case '1':
          console.log('待付款')
          break
        case '2':
          console.log('继续分享')
          break
        case '3':
          console.log('查看订单')
          break
      }
    },
    // 倒计时结束
    onFinished (orderId, idx) {
      console.log(orderId, idx)
      this.$toast('倒计时结束')
      this.getShareList()
    },
    // 本地自测测试数据
    setTestData (val, idx) {
      let midObj = {}
      midObj = { ...val }
      switch (idx) {
        case 0:
          midObj.order_status = '1'
          midObj.count_down = 300000
          midObj.left_need_share_num = null
          break
        case 1:
          midObj.order_status = '2'
          midObj.count_down = 3000000
          break
        case 2:
          midObj.order_status = '3'
          midObj.left_need_share_num = null
          break
        case 3:
          midObj.order_status = '4'
          midObj.left_need_share_num = null
          break
        case 4:
          midObj.order_status = '5'
          midObj.left_need_share_num = null
          break
      }
      return midObj
    },
    setItemDatas (list) {
      let midArr = []
      list.map((val, idx) => {
        let mid = {}
        console.log(val.share_end_time)
        mid = { ...val }
        if (val.share_end_time) {
          mid.count_down = (val.share_end_time - this.currTime) * 1000
        }

        // 测试数据
        mid = this.setTestData(mid, idx)

        midArr.push(mid)
      })
      return midArr
    },
    // 获取分享列表
    getShareList () {
      api.getShareList({ first_row: this.pageNo, fetch_num: this.pageSize }).then(res => {
        console.log('share-list:', res)
        this.$loading.hide()
        let data = res.data
        this.currTime = data.current_time
        this.total = data.total_num
        let list = this.setItemDatas(data.item_list)
        this.list = [...this.list, ...list]
        console.log(this.list)
        // 加载状态结束
        this.loading = false
        // 全部加载完成
        if (this.list.length >= this.total) {
          console.log('complete all loading')
          this.finished = true
        }
      })

      // setTimeout(() => {
      //   let data = [
      //     {
      //       item_id: '60099',
      //       item_img: 'https://iph.href.lu/80x80',
      //       count_down: 80000000,
      //       item_name: '测试商品一',
      //       share_num: '10',
      //       status: '1'
      //     },
      //     {
      //       item_id: '60099',
      //       item_img: 'https://iph.href.lu/80x80',
      //       count_down: 100000,
      //       item_name: '测试商品一',
      //       share_num: '10',
      //       status: '1'
      //     }
      //   ]

      //   this.list = [...this.list, ...data]
      //   console.log(this.list)
      //   // 加载状态结束
      //   this.loading = false
      //   // 全部加载完成
      //   if (this.list.length >= 20) {
      //     this.finished = true
      //   }
      // }, 500)
    }
  },

  components: {
    headerBar
  }
}
</script>

<style lang="less" scoped>
.shareList {
  height: 100%;
  padding-top: 64px;
  background: #f2f2f2;
  .shareListBox {
    .item {
      position: relative;
      // background: #FFF;
      // border-radius: 6px;
    }
  }
}

.topWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: #333333;
  .countDown {
    display: flex;
    align-items: center;
    p {
      padding-right: 2px;
    }
    .van-count-down {
      font-size: 12px;
      display: flex;
      align-items: center;

      .timeItem {
        display: block;
        width: 19px;
        height: 19px;
        color: #fff;
        text-align: center;
        background-color: #333333;
        border-radius: 4px;
        margin: 0 3px;
      }
    }
  }
}

.bottomWrap {
  display: flex;
  border-top: 1px solid #d8d8d8;
  padding-top: 8px;
  .itemImg {
    display: block;
    width: 80px;
    height: 80px;
  }
  .itemText {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 8px;
    .shareNum {
      color: #FD2A32;
    }
  }
  .van-button--small {
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    min-width: 58px;
    height: 24px;
    line-height: 24px;
    color: #333;
    font-size: 12px;
    padding: 0;
    background-color: #FDC553;
    border: none;
  }
}

.underWay {
  color: #ffa30e;
}
.success {
  color: #56b700;
}
.cancel {
  color: #999999;
}

.van-pull-refresh {
  height: 100%;
  overflow: auto;

  /deep/ .van-pull-refresh__track {
    height: 100%;
  }
}

.van-list {
  padding: 8px 8px;
}
.van-cell {
  background: #fff;
  padding: 0 8px 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 17px;
}
.van-cell:not(:last-child)::after {
  border-bottom: 0;
}

</style>
