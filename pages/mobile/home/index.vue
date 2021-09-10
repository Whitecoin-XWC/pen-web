<template>
  <div class="content_all">
    <div class="banner">
      {{ $t('STORAGE ANYWHERE') }}
      <span></span>
    </div>
    <Addr />
    <div class="homea_con">
      <div class="homea_left">
        <p>{{ $t('Introduction') }}</p>
        <p>
          {{ $t('Introduction content') }}
        </p>
      </div>
      <div class="homea_right"></div>
    </div>
    <div class="why_stake">
      <div class="why_title">{{ $t('Why stake with Penguin') }}</div>
      <div class="why_con">
        <div class="why_li">
          <div class="icon one"></div>
          <div class="text">{{ $t('Competitive price') }}</div>
        </div>
        <div class="why_li">
          <div class="icon two"></div>
          <div class="text">{{ $t('Security and Authenticity') }}</div>
        </div>
        <div class="why_li">
          <div class="icon three"></div>
          <div class="text">{{ $t('High Efficiency') }}</div>
        </div>
        <div class="why_li">
          <div class="icon four"></div>
          <div class="text">{{ $t('Reliability') }}</div>
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
  background: #f9f9f9;
  .banner {
    padding: 30rem 25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24rem;
    font-family: Helvetica-Bold, Helvetica, sans-serif;
    font-weight: bold;
    color: #030047;
    span {
      width: 353rem;
      height: 176rem;
      background: url(@/assets/img/mobile/banner.png) no-repeat;
      background-size: cover;
      margin-top: 20rem;
    }
  }
  .homea_con {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 30rem 25rem;
    text-align: center;
    .homea_left {
      color: #464d59;
      p:first-child {
        font-size: 18rem;
        font-weight: 500;
        color: #464d59;
        margin-bottom: 15rem;
      }
      p:last-child {
        line-height: 24rem;
        font-size: 14rem;
      }
    }
    .homea_right {
      margin-top: 20rem;
      width: 269px;
      height: 255px;
      background: url(@/assets/img/home/about_right.png) no-repeat;
      background-size: cover;
    }
  }
  .why_stake {
    padding: 30rem 25rem;
    background: #ffffff;
    .why_title {
      font-size: 18rem;
      font-weight: 400;
      color: #464d59;
      margin-bottom: 40rem;
      text-align: center;
    }
    .why_con {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      .why_li {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #464d59;
        margin-bottom: 40rem;
        .icon {
          width: 100rem;
          height: 100rem;
          margin-bottom: 10rem;
          &.one {
            background: url(@/assets/img/home/one.png) no-repeat;
            background-size: cover;
          }
          &.two {
            background: url(@/assets/img/home/two.png) no-repeat;
            background-size: cover;
          }
          &.three {
            background: url(@/assets/img/home/three.png) no-repeat;
            background-size: cover;
          }
          &.four {
            background: url(@/assets/img/home/four.png) no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
