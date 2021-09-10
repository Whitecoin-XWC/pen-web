<template>
  <div class="footer-all">
    <div class="foot-logo" @click="homeUrl(1)"><span></span>{{ $t('Efficient and convenient trading platform') }}</div>
    <el-collapse accordion>
      <el-collapse-item :title="$t('Website navigation')" name="1">
        <li>{{ $t('HOME') }}</li>
        <li @click="homeUrl(2)">{{ $t('Tools') }}</li>
      </el-collapse-item>
      <el-collapse-item :title="$t('About')" name="2">
        <li @click="homeUrl(3)">{{ $t('Team Introduction') }}</li>
        <li @click="homeUrl(3)">{{ $t('Development history') }}</li>
      </el-collapse-item>
      <el-collapse-item :title="$t('Contact us')" name="3">
        <li @click="homeUrl(4)"><span class="TP_EN"></span><span class="text">CN</span></li>
        <li @click="homeUrl(5)"><span class="TP_EN"></span><span class="text">EN</span></li>
        <li @click="homeUrl(6)">
          <span class="Tokenswap_DEX"> </span>
        </li>
      </el-collapse-item>
    </el-collapse>
    <div class="banquan">Copyright ©2021 www.penguin.top, All Rights Reserved.</div>
  </div>
</template>
<script>
export default {
  methods: {
    homeUrl(index) {
      if (index === 1) {
        this.$router.push('/mobile/home')
      } else if (index === 2) {
        window.open(process.env.TOOLS_URL)
      } else if (index === 3) {
        this.$router.push('/mobile/about')
      } else if (index === 4) {
        window.open('https://t.me/TP_CN')
      } else if (index === 5) {
        window.open('https://t.me/TP_EN1')
      } else if (index === 6) {
        window.open('https://twitter.com/Tokenswap_DEX')
      }
    },
    toolsHiddle() {
      window.open(process.env.TOOLS_URL)
    },
    aboutHiddle() {
      this.$router.push('/mobile/about')
    },
  },
}
</script>

<style scoped lang="scss">
.footer-all {
  background: #22284b;
  color: #ffffff;
  .foot-logo {
    display: flex;
    flex-direction: column;
    padding: 10rem 25rem;
    font-size: 14rem;
    color: rgba(255, 255, 255, 0.56);
    span {
      display: block;
      width: 84rem;
      height: 30rem;
      background: url(@/assets/img/home/logo.png) no-repeat;
      background-size: cover;
      margin-right: 5rem;
      margin-bottom: 3rem;
    }
  }
  /deep/ .el-collapse {
    border-top: 1px solid rgba(88, 96, 145, 0.19);
    border-bottom: 1px solid rgba(88, 96, 145, 0.19);
    .el-collapse-item__header {
      background: #22284b;
      height: 48rem;
      line-height: 48rem;
      color: #ffffff;
      font-size: 14rem;
      font-weight: 400;
      border-bottom: 1px solid rgba(88, 96, 145, 0.19);
      padding: 0 10rem 0 25rem;
    }
    .el-collapse-item__wrap {
      background: #1a1e39;
      border-bottom: none;
      .el-collapse-item__content {
        display: flex;
        flex-wrap: wrap;
        opacity: 0.6;
        color: #ffffff;
        padding: 10rem 25rem;
        li {
          margin-right: 25rem;
          position: relative;
          .TP_EN {
            display: inline-block;
            width: 20rem;
            height: 20rem;
            background: url(@/assets/img/home/TP_EN.png) no-repeat;
            background-size: cover;
            margin-right: 10rem;
            margin-top: 3rem;
          }
          .Tokenswap_DEX {
            display: inline-block;
            width: 20rem;
            height: 20rem;
            background: url(@/assets/img/home/Tokenswap_DEX.png) no-repeat;
            background-size: cover;
          }
          .text {
            position: absolute;
            left: 22rem;
            top: -7rem;
            font-size: 12rem;
          }
        }
      }
    }
  }
  .banquan {
    font-size: 14rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.56);
    text-align: center;
    padding: 15rem 25rem;
  }
}
</style>
