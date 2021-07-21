<template>
  <div class="main-container">
    <div class="detail-top">
      <div class="top-left">
        <img :src="nftDetails.fileName" alt="" />
        <div v-if="nftDetails.fileStatus === 5" class="price-container">
          <div class="price-t">
            <div class="price-info">
              <p>{{ $t('保留价') }}</p>
              <p>{{ anctionDetail.auctionRetainPrice }} {{ anctionDetail.auctionCoin }}</p>
              <p>≈${{ anctionDetail.auctionRetainPriceUsdt }}</p>
            </div>
            <div class="price-info">
              <p>{{ $t('最低加价') }}</p>
              <p>{{ anctionDetail.auctionMinMarkup }} {{ anctionDetail.auctionCoin }}</p>
              <p>≈${{ anctionDetail.auctionMinMarkupUsdt }}</p>
            </div>
          </div>
          <div class="price-b">
            <div class="price-info">
              <p>{{ $t('版权费') }}</p>
              <p>{{ nftDetails.copyrightFee }} %</p>
            </div>
            <div class="price-info">
              <p>{{ $t('平台费') }}</p>
              <p>5 %</p>
            </div>
          </div>
        </div>
      </div>
      <div class="top-right">
        <div class="title-container">
          <h2>{{ nftDetails.fileTitle }}</h2>
          <div v-if="nftDetails.userAddress != address && !nftDetails.collect" class="focus" @click="follow">{{ $t('关注') }}</div>
          <div v-if="nftDetails.userAddress != address && nftDetails.collect" class="focus unfollow" @click="unFollow">{{ $t('取消关注') }}</div>
        </div>
        <p class="create">
          <span>{{ $t('创作者') }}</span> <span>{{ nftDetails.creater }}</span>
        </p>
        <p class="all">
          <span>{{ $t('所有者') }}</span> <span>{{ nftDetails.userAddress }}</span>
        </p>
        <div class="describe">
          {{ nftDetails.fileDes }}
        </div>
        <!-- 拥有者 -->
        <!-- 拍卖前 -->
        <div v-if="nftDetails.userAddress === address && nftDetails.fileStatus === 2" class="details-btns">
          <div @click="openDialog('isShowDialogAuction')">{{ $t('创建拍卖') }}</div>
          <div @click="openDialog('isShowSetPrice')">{{ $t('设置售价') }}</div>
          <div class="transfer" @click="openDialog('isShowTransferNft')">{{ $t('转移NFT') }}</div>
        </div>
        <!-- 拍卖中 -->
        <div v-if="nftDetails.userAddress === address && nftDetails.fileStatus === 5 && anctionDetail.auctionStatus === 0" class="details-btns">
          <div @click="openDialog('isShowDialogAuction')">{{ $t('更新价格') }}</div>
          <div class="cancel" @click="openDialog('isShowCancelAuction')">{{ $t('取消拍卖') }}</div>
        </div>
        <!-- 出售中 -->
        <div v-if="nftDetails.userAddress === address && nftDetails.fileStatus === 4" class="details-btns">
          <div @click="openDialog('isShowSetPrice')">{{ $t('更新售价') }}</div>
          <div class="cancel" @click="openDialog('isShowCancelSell')">{{ $t('取消出售') }}</div>
        </div>
        <!-- 最高价 -->
        <div v-if="anctionDetail.auctionMaxEr === address && nftDetails.fileStatus === 5 && anctionDetail.auctionStatus === 1" class="details-btns">
          <div>{{ $t('当前最高价') }}</div>
        </div>
        <!-- 竞拍 -->
        <div
          v-if="anctionDetail.auctionMaxEr && anctionDetail.auctionMaxEr !== address && nftDetails.fileStatus === 5 && anctionDetail.auctionStatus <= 1"
          class="details-btns"
        >
          <div @click="openDialog('isShowDialogBidding')">{{ $t('竞拍') }}</div>
        </div>
        <!-- 购买 -->
        <div v-if="nftDetails.userAddress !== address && nftDetails.fileStatus === 4" class="details-btns">
          <div @click="openDialog('isShowBuyConfirm')">{{ $t('购买') }}</div>
        </div>

        <!-- 拍卖完成后领取NFT -->
        <div v-if="nftDetails.userAddress !== address && nftDetails.fileStatus === 5 && anctionDetail.auctionStatus === 2" class="details-btns">
          <div>{{ $t('领取NFT') }}</div>
        </div>

        <div v-if="nftDetails.fileStatus === 5" class="price-container price-position">
          <div class="price-t">
            <div class="price-info">
              <p>{{ $t('竞拍人') }}</p>
              <p :title="anctionDetail.auctionCreater" class="auctionCreater">{{ anctionDetail.auctionCreater }}</p>
            </div>
          </div>
          <div class="price-b">
            <div class="price-info">
              <p>{{ $t('版权费') }}</p>
              <p>{{ nftDetails.copyrightFee }} %</p>
            </div>
            <div class="price-info">
              <p>{{ $t('平台费') }}</p>
              <p>5 %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-record">
      <p class="record-title">{{ $t('历史记录') }}</p>
      <div class="record-box">
        <div v-for="(item, index) in nftRecordList" :key="index" class="record-item">
          <div class="record-info">
            {{ item.logInfo }}
            <!-- <div class="record-portrait">张</div> -->
            <!-- <img src="../../assets/img/header/portrait.png" alt="" /> -->
            <!-- <span>0xf910 ... 5e65 </span>{{ $t('发行了这个') }}<span>NFT</span> -->
          </div>
          <div class="record-time">{{ item.createTime }}</div>
        </div>
      </div>
    </div>
    <div v-if="nftDetails.fileStatus === 5" class="detail-record">
      <p class="record-title">{{ $t('拍卖记录') }}</p>
      <div class="record-box">
        <div v-for="(item, index) in anctionRecordList" :key="index" class="record-item">
          <div class="record-info">
            <span>{{ item.auctioneer }} </span>{{ $t('竞拍出价') }}<span>{{ item.auctionTime }}</span>
          </div>
          <div class="record-price">{{ item.auctionPrice }}{{ anctionDetail.auctionCoin }}</div>
        </div>
      </div>
    </div>
    <CancelSell :token-id="tokenId" />
    <CancelAuction :token-id="tokenId" />
    <DialogAuction v-if="isCreateAnction" :token-id="tokenId" :is-create-anction="isCreateAnction" />
    <DialogSetPrice v-if="isCreatePrice" :token-id="tokenId" :is-create-price="isCreatePrice" />
    <TransferNft v-if="Object.keys(coinList).length" :token-id="tokenId" :copyright-fee="copyrightFee" />
    <BuyConfirm
      v-if="Object.keys(nftDetails).length && Object.keys(coinList).length"
      :token-id="tokenId"
      :copyright-fee="copyrightFee"
      :sell-price="nftDetails.price"
      :coin="(!nftDetails.unit && 'XWC') || nftDetails.unit"
    />
    <DialogBidding
      v-if="Object.keys(anctionDetail).length && Object.keys(coinList).length"
      :id="anctionDetail.id.toString()"
      :anction-id="anctionDetail.auctionId"
      :token-id="tokenId"
      :coin="anctionDetail.auctionCoin"
      :anction-price="anctionMaxPrice"
      :min-add="anctionDetail.auctionMinMarkup"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import http from '../../api/http'
export default {
  props: {},
  asyncData({ route, redirect }) {
    if (!route.params.token) {
      redirect('/home')
    }
  },
  data() {
    return {
      nftDetails: {},
      currentPage: 1,
      pageSize: 10,
      nftRecordList: [],
      tokenId: this.$route.query.tokenId,
      copyrightFee: this.$route.query.copyrightFee,
      isCreatePrice: 0, // 是否为创建售卖 1售卖 2售卖中 0无状态
      isCreateAnction: 0, // 是否为创建拍卖 1拍卖 2拍卖中 0无状态
      anctionDetail: {},
      anctionRecordList: [],
    }
  },

  computed: {
    ...mapState('global', [
      'isShowCancelSell',
      'isShowBuyConfirm',
      'isShowDialogAuction',
      'isShowSetPrice',
      'isShowDialogBidding',
      'isShowTransferNft',
      'isShowCancelAuction',
      'coinList',
      'address',
    ]),
    anctionMaxPrice() {
      const details = this.anctionDetail
      return (!details.auctionStatus && details.auctionRetainPrice) || details.auctionMaxPrice
    },
  },
  mounted() {
    console.log(this.$route)
    this.getNftDetails()
    this.getNftRecord()
    this.getAnctionRecordList()
  },
  destroyed() {
    this.$store.commit('global/set_state', {
      isShowCancelSell: false,
      isShowBuyConfirm: false,
      isShowDialogAuction: false,
      isShowSetPrice: false,
      isShowDialogBidding: false,
      isShowTransferNft: false,
      isShowCancelAuction: false,
    })

    console.log(222)
  },
  methods: {
    // 关注
    async follow() {
      const res = await http(this.$axios).followNft({
        userAddress: this.address,
        tokenId: this.tokenId,
      })
      console.log(res)
      if (res.code === 200) {
        this.getNftDetails()
        this.$message.success(this.$t('关注成功'))
      } else {
        this.$message.error(this.$t('关注失败'))
      }
    },
    // 取消关注
    async unFollow() {
      const res = await http(this.$axios).onFollowNft({
        userAddress: this.address,
        tokenId: this.tokenId,
      })
      console.log(res)
      if (res.code === 200) {
        this.getNftDetails()
        this.$message.success(this.$t('取消关注成功'))
      } else {
        this.$message.error(this.$t('取消关注失败'))
      }
    },
    // 获取拍卖纪录
    async getAnctionRecordList() {
      const res = await http(this.$axios).getAuctionLog(this.tokenId)
      console.log('拍卖', res)
      if (res.code === 200 && res.data) {
        this.anctionRecordList = res.data
      }
    },
    // 获取历史记录
    async getNftRecord() {
      const res = await http(this.$axios).getFileLog({ tokenId: this.tokenId, page: this.currentPage, pageSize: this.pageSize })
      console.log(res)
      if (res.code === 200 && res.data) {
        this.nftRecordList = res.data.records
      }
    },
    // 获取拍卖详情
    async getAnctionDetailData() {
      const res = await http(this.$axios).getAnctionDetail({ fileTokenId: this.tokenId })
      console.log('anctionDetail', res)
      if (res.code === 200 && res.data) {
        this.anctionDetail = res.data
        this.$store.commit('anction/set_state', {
          coin: this.anctionDetail.auctionCoin,
          anctionPrice: this.anctionDetail.auctionRetainPrice,
          minAdd: this.anctionDetail.auctionMinMarkup,
          anctionId: this.anctionDetail.auctionId,
          id: this.anctionDetail.id,
        })
        this.isCreateAnction = 2
      } else {
        this.isCreateAnction = 2
      }
    },
    // 获取nft详情
    async getNftDetails() {
      const res = await http(this.$axios).getFileDetail(this.$route.query)
      console.log('详情数据', res)
      if (res.code === 200 && res.data) {
        const dataObj = res.data
        this.nftDetails = dataObj.filePO
        this.nftDetails.fileName = `${dataObj.imgUrl}${this.nftDetails.fileName}`
        if (this.nftDetails.fileStatus === 4) {
          this.isCreatePrice = 2
          this.$store.commit('price/set_state', { coin: this.nftDetails.unit, nftPrice: this.nftDetails.price })
        } else {
          this.isCreatePrice = 1
          this.$store.commit('price/set_state', { coin: '', nftPrice: '' })
        }
        if (this.nftDetails.fileStatus === 5) {
          this.getAnctionDetailData()
        } else {
          this.isCreateAnction = 1
          this.$store.commit('anction/set_state', {
            coin: 'XWC',
            anctionPrice: '',
            minAdd: '',
          })
        }
      }
    },
    // 获取币种字典表
    async getCoinData(key) {
      const result = await this.$wallet.getCoinList()
      if (result.code === '0' && result.data) {
        console.log(result.data)
        const coinObj = result.data
        this.$store.commit('global/set_state', { coinList: coinObj })
      }
    },

    // 打开弹窗公共方法
    openDialog(key) {
      console.log(Object.keys(this.coinList))
      if (!Object.keys(this.coinList).length) {
        this.getCoinData().then(() => {
          this.$store.commit('global/set_state', { [key]: true })
        })
      } else {
        this.$store.commit('global/set_state', { [key]: true })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.main-container {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  .detail-top {
    margin-top: 48px;
    display: flex;
    margin-bottom: 39px;
  }
  .price-container {
    width: 396px;
    height: 200px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    &.price-position {
      position: absolute;
      top: 544px;
    }
    .price-t,
    .price-b {
      height: 100px;
      display: flex;
      box-sizing: border-box;
    }
    .price-b {
      padding: 30px 0 26px 26px;
    }
    .price-t {
      border-bottom: 1px solid #ebebeb;
      padding: 16px 0 20px 26px;
    }
    .price-info {
      width: 50%;
      p {
        &:nth-child(1) {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
        }
        &:nth-child(2) {
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          line-height: 22px;
        }
        &:nth-child(3) {
          font-size: 16px;
          font-weight: bold;
          color: #999999;
          line-height: 19px;
        }
      }
      .auctionCreater {
        width: 350px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .top-left {
    margin-right: 62px;
    img {
      width: 396px;
      height: 524px;
      box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      border: 2px solid #ebebeb;
      margin-bottom: 20px;
    }
  }
  .top-right {
    width: 100%;
    .title-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      h2 {
        font-size: 30px;
        font-weight: 600;
        color: #000000;
        line-height: 42px;
      }
      .focus {
        width: 182px;
        height: 50px;
        background: #43cee2;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        &.unfollow {
          background: #fd3434;
        }
      }
    }
    .create,
    .all {
      display: flex;
      span {
        &:nth-child(1) {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          margin-right: 80px;
        }
        &:nth-child(2) {
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          line-height: 22px;
        }
      }
    }
    .create {
      margin-top: 25px;
      margin-bottom: 20px;
    }
    .describe {
      margin-top: 38px;
      margin-bottom: 42px;
      padding: 27px 20px;
      width: 100%;
      height: 259px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #ebebeb;
      font-size: 14px;
      font-weight: 400;
      color: #00000080;
      line-height: 22px;
    }
    .details-btns {
      text-align: right;
      height: 50px;
      div {
        display: inline-block;
        width: 182px;
        height: 50px;
        background: linear-gradient(180deg, #000000 0%, #000000 100%);
        border-radius: 4px;
        line-height: 50px;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
        user-select: none;
        margin-left: 18px;
        &.transfer {
          background: #43cee2;
        }
        &.cancel {
          background: #fd3434;
        }
      }
    }
  }
  .detail-record {
    width: 100%;
    min-height: 130px;
    max-height: 450px;
    border: 1px solid #ebebeb;
    margin-bottom: 20px;
    overflow: hidden;
    // padding: 0 31px 0 25px;
    .record-title {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      font-weight: bold;
      color: #999999;
      padding: 0 31px 0 25px;
      border-bottom: 1px solid #ebebeb;
    }
    .record-box {
      min-height: 80px;
      max-height: 400px;
      overflow-y: scroll;
    }
    .record-item {
      height: 40px;
      line-height: 40px;
      padding: 0 31px 0 25px;
      display: flex;
      justify-content: space-between;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 16px;
      }
      .record-portrait {
        display: inline-block;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 50%;
        background: linear-gradient(329deg, #2b8ce8 0%, #10b0bc 42%, #2af4ff 100%);
        font-size: 10px;
        font-weight: 400;
        color: #ffffff;
        margin-right: 16px;
      }
      .record-info {
        font-size: 16px;
        font-weight: 400;
        color: #00000080;
        span {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
        }
      }
      .record-time {
        font-size: 16px;
        font-weight: 400;
        color: #00000080;
      }
      .record-price {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
      }
    }
  }
}
</style>
