<template>
  <div class="content_all">
    <div class="banner"></div>
    <div class="wallet">
      <div v-if="walletShow === true" class="wallet_center">
        <div class="address">ADDRESS：{{ walletAddress.address }}</div>
        <div class="hold">
          HOLD：<span>{{ hold }}</span>
        </div>
        <div :class="['button', hold === 0 ? 'disabled' : '']">Receive income</div>
      </div>
      <div v-if="walletShow === false" class="wallet_center">
        <div class="address">No Wallet detected. Please download and open the latest version of Wallet extention.</div>
        <div class="button btn" @click="urlHiddle(1)">Loacal download</div>
        <div class="button btn" @click="urlHiddle(2)">Chrome Web Store</div>
      </div>
    </div>
    <div class="home_about">
      <div class="homea_con">
        <div class="homea_left">
          <p>Penguin Introduction</p>
          <p>
            Penguin is a p2p decentralized storage network established on Whitecoin, which allows pool storage, bandwidth and hashrate resources to support its
            application. The system uses both distributed storage market and retrieval market to hire miners, and it can help DApp with its storage and code
            allocation, and data and content to release isolated data, without disturbing data on chain. The innovative stimulation system with built-in
            micropayments and smart contract construct a reliable reputation mechanism, leading fast and reliable data provision, routing around censorship and
            giving permanence to digital information. The survived network partitions and zero downtime situated in offline work shall resist periodical
            breakdowns.
          </p>
        </div>
        <div class="homea_right"></div>
      </div>
    </div>
    <div class="why_stake">
      <div class="why_title">Why stake with Penguin</div>
      <div class="why_con">
        <div class="why_li">
          <div class="icon one"></div>
          <div class="text">Competitive price</div>
        </div>
        <div class="why_li">
          <div class="icon two"></div>
          <div class="text">Security and Authenticity</div>
        </div>
        <div class="why_li">
          <div class="icon three"></div>
          <div class="text">High Efficiency</div>
        </div>
        <div class="why_li">
          <div class="icon four"></div>
          <div class="text">Reliability</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      walletShow: false,
      walletAddress: null,
      hold: 0,
    }
  },
  mounted() {
    // 是否连接钱包
    if (this.$wallet.checkInstalled()) {
      // 连接初始化
      this.$wallet.connectWallet().then((res) => {
        if (res.code === '0') {
          this.walletShow = true
          this.walletAddress = res.data.walletAddress
        } else {
          this.walletShow = false
        }
      })
    } else {
      this.walletShow = false
    }
  },
  methods: {
    urlHiddle(index) {
      if (index === 1) {
        location.open('https://xwcwebwallet.oss-cn-hongkong.aliyuncs.com/xwcWebWallet.zip')
      } else if (index === 2) {
        location.open('https://chrome.google.com/webstore/detail/xwcextwallet/ohofidejidplafebkaphkkjpnajednjn')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.content_all {
  .banner {
    height: 864px;
    background: url(../../assets/img/home/banner.png) no-repeat;
    background-size: cover;
  }
  .wallet {
    height: 114px;
    background: #f7d88b;
    display: flex;
    align-items: center;
    .wallet_center {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .address,
      .hold {
        font-size: 14px;
        font-weight: 500;
        color: #464d59;
        margin-right: 47px;
        span {
          font-size: 20px;
          font-weight: 600;
          color: #464d59;
        }
      }
      .button {
        background: #464d59;
        width: 130px;
        line-height: 34px;
        border-radius: 6px;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        &.btn {
          border: 1px solid #464d59;
          background: transparent;
          color: #464d59;
          &:last-child {
            margin-left: 47px;
          }
        }
        &:hover {
          color: #9485ff;
          border: 1px solid #9485ff;
        }
        &.disabled {
          cursor: no-drop;
          background: #969696;
          border: 1px solid #969696;
          color: #ffffff;
        }
      }
    }
  }
  .home_about {
    background: #f9f9f9;
    height: 560px;
    display: flex;
    align-items: center;
    .homea_con {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .homea_left {
        width: 50%;
        color: #464d59;
        p:first-child {
          font-size: 24px;
          font-weight: 500;
          color: #464d59;
          margin-bottom: 15px;
        }
      }
      .homea_right {
        width: 412px;
        height: 390px;
        background: url(../../assets/img/home/about_right.png) no-repeat;
        background-size: cover;
      }
    }
  }
  .why_stake {
    width: 1200px;
    margin: 0 auto;
    padding: 70px 0;
    .why_title {
      font-size: 24px;
      font-weight: 400;
      color: #464d59;
      margin-bottom: 40px;
      text-align: center;
    }
    .why_con {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 166px;
      .why_li {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #464d59;
        .icon {
          width: 63px;
          height: 63px;
          margin-bottom: 15px;
          &.one {
            background: url(../../assets/img/home/one.png) no-repeat;
            background-size: cover;
          }
          &.two {
            background: url(../../assets/img/home/two.png) no-repeat;
            background-size: cover;
          }
          &.three {
            background: url(../../assets/img/home/three.png) no-repeat;
            background-size: cover;
          }
          &.four {
            background: url(../../assets/img/home/four.png) no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
