<template>
  <div class="content_all">
    <div class="banner"><img src="../../assets/img/home/banner.png" alt="" /></div>
    <Addr />
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
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.content_all {
  .banner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 0 20px 0;
    text-align: center;
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
        p:last-child {
          line-height: 24px;
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
      justify-content: space-around;
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
