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
          <div class="name_img name01"></div>
          <div class="name_text left">
            <p>{{ $t('about name01 title') }}</p>
            <p>{{ $t('about name01 name') }}</p>
            <p>
              {{ $t('about name01 content01') }}<br />
              {{ $t('about name01 content02') }}<br />
              {{ $t('about name01 content03') }}<br />
            </p>
          </div>
        </div>
        <div class="name_li flex">
          <div class="name_img name02"></div>
          <div class="name_text right">
            <p>{{ $t('about name02 title') }}</p>
            <p>{{ $t('about name02 name') }}</p>
            <p>
              {{ $t('about name02 content01') }}<br />
              {{ $t('about name02 content02') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="radmap">
      <div class="radmap_title">{{ $t('Penguin Roadmap') }}</div>
      <div class="radmap_img"><img src="@/assets/img/about/roadmap.png" alt="" width="100%" /></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.about_con {
  .about_banner {
    height: 500px;
    background: #f6f6f6;
    display: flex;
    align-items: center;
    .banner_ul {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .banner_text {
        p {
          font-size: 16px;
          color: #110b43;
          &:first-child {
            font-size: 36px;
            color: #110b43;
          }
        }
      }
      .banner_img {
        width: 662px;
        height: 342px;
        background: url(@/assets/img/about/about_banner.png) no-repeat;
        background-size: cover;
      }
    }
  }
  .about_name {
    background: url(@/assets/img/about/about_name.png) repeat-x;
    background-size: cover;
    .name_con {
      width: 1200px;
      margin: 0 auto;
      padding: 30px 0;
      .name_li {
        display: flex;
        align-items: center;
        margin-top: 30px;
        .name_img {
          width: 200px;
          height: 196px;
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
          width: 673px;
          p {
            font-size: 12px;
            font-weight: 400;
            color: rgba(70, 77, 89, 0.9);
            line-height: 20px;
            &:first-child {
              font-size: 18px;
              font-weight: 500;
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
            margin-left: 63px;
          }
          &.right {
            margin-right: 63px;
          }
        }
        &.flex {
          flex-direction: row-reverse;
        }
      }
    }
  }
  .radmap {
    width: 1200px;
    margin: 0 auto;
    padding: 90px 0;
    .radmap_title {
      font-size: 24px;
      font-weight: 400;
      color: #464d59;
      text-align: center;
    }
    .radmap_img {
      margin-top: 60px;
      text-align: center;
    }
  }
}
</style>
