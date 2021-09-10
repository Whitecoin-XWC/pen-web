<template>
  <div class="about_con">
    <div class="about_banner">
      <div class="banner_ul">
        <div class="banner_text">
          <p>{{ $t('About') }}</p>
          <p>{{ $t('Be a pioneer of blockchain technology innovation') }}</p>
        </div>
        <div class="banner_img"></div>
      </div>
    </div>
    <div class="about_name">
      <div class="name_con">
        <div class="name_li">
          <div class="name-top">
            <div class="name_img name01"></div>
            <div class="name_text left">
              <p>{{ $t('about name01 title') }}</p>
              <p>{{ $t('about name01 name') }}</p>
            </div>
          </div>
          <div class="name-con">
            <p>{{ $t('about name01 content01') }}</p>
            <p>{{ $t('about name01 content02') }}</p>
            <p>{{ $t('about name01 content03') }}</p>
          </div>
        </div>
        <div class="name_li flex">
          <div class="name-top flex01">
            <div class="name_img name02"></div>
            <div class="name_text right">
              <p>{{ $t('about name02 title') }}</p>
              <p>{{ $t('about name02 name') }}</p>
            </div>
          </div>
          <div class="name-con">
            <p>{{ $t('about name02 content01') }}</p>
            <p>{{ $t('about name02 content02') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="radmap">
      <div class="radmap_title">{{ $t('Penguin Roadmap') }}</div>
      <div class="radmap_img"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.about_con {
  background: #f6f6f6;
  .about_banner {
    display: flex;
    align-items: center;
    flex-direction: column;
    .banner_ul {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 30rem 25rem;
      text-align: center;
      .banner_text {
        p {
          font-size: 14px;
          color: #110b43;
          &:first-child {
            font-size: 18rem;
            font-family: Helvetica-Bold, Helvetica, sans-serif;
            font-weight: bold;
            color: #110b43;
            margin-bottom: 10rem;
          }
        }
      }
      .banner_img {
        width: 345rem;
        height: 178rem;
        background: url(@/assets/img/about/about_banner.png) no-repeat;
        background-size: cover;
        margin-top: 20rem;
      }
    }
  }
  .about_name {
    background: #ffffff;
    .name_con {
      padding: 30rem 20rem;
      .name_li {
        display: flex;
        flex-direction: column;
        .name-top {
          display: flex;
          align-items: center;
          &.flex01 {
            flex-direction: row-reverse;
          }
        }
        .name-con {
          font-size: 12rem;
          color: rgba(70, 77, 89, 0.9);
          margin-top: 20rem;
        }
        .name_img {
          width: 150rem;
          height: 148rem;
          &.name01 {
            background: url(@/assets/img/about/name01.png) no-repeat;
            background-size: cover;
          }
          &.name02 {
            background: url(@/assets/img/about/name02.png) no-repeat;
            background-size: cover;
          }
        }
        .name_text {
          p {
            font-size: 12rem;
            font-weight: 400;
            color: rgba(70, 77, 89, 0.9);
            line-height: 24rem;
            &:first-child {
              font-size: 16rem;
              font-weight: 700;
              color: #464d59;
              margin-bottom: 8px;
            }
            &:nth-child(2) {
              font-size: 18px;
              color: #464d59;
              margin-bottom: 8px;
            }
          }
          &.left {
            margin-left: 10rem;
          }
          &.right {
            margin-right: 10rem;
          }
        }
        &.flex {
          flex-direction: column;
          margin-top: 30rem;
        }
      }
    }
  }
  .radmap {
    padding: 40rem 25rem;
    .radmap_title {
      font-size: 24rem;
      font-weight: 400;
      color: #464d59;
      text-align: center;
    }
    .radmap_img {
      width: 343rem;
      height: 849rem;
      background: url(@/assets/img/mobile/about.png) no-repeat;
      background-size: cover;
      margin-top: 40rem;
      text-align: center;
    }
  }
}
</style>
