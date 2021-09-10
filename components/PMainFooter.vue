<template>
  <div class="footer">
    <div class="footer_con">
      <div class="footer_left">
        <div class="left_logo" @click="homeUrl"></div>
        <div class="left_name">Efficient and convenient trading platform</div>
      </div>
      <div class="footer_right">
        <div class="right_con">
          <li>
            <p>Website navigation</p>
            <p @click="toolsHiddle">Tools</p>
            <!-- <p>Mine</p>
            <p>Develop</p>
            <p>Blog</p> -->
          </li>
          <!-- <li>
            <p>File</p>
            <p>FAQ</p>
            <p>Audit report</p>
          </li> -->
          <li>
            <p>About us</p>
            <p><router-link to="/about">Team Introduction</router-link></p>
            <p><router-link to="/about">Development history</router-link></p>
          </li>
          <li>
            <p>Contact us</p>
            <p>
              <a href="https://t.me/TP_CN" target="_blank"><span class="TP_EN"></span><span class="text">CN</span></a>
              <a href="https://t.me/TP_EN1" target="_blank"><span class="TP_EN"></span> <span class="text">EN</span></a>
              <a href="https://twitter.com/Tokenswap_DEX" target="_blank"><span class="Tokenswap_DEX"> </span></a>
            </p>
          </li>
        </div>
        <div class="banquan">Copyright ©2021 www.penguin.top, All Rights Reserved.</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    homeUrl() {
      this.$router.push('/home')
    },
    toolsHiddle() {
      window.open(process.env.TOOLS_URL)
    },
  },
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  font-weight: 400;
  color: #ffffff;
  padding: 108px 0 50px 0;
  background: #464d59;
  .footer_con {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .footer_left {
      font-size: 12px;
      font-weight: 400;
      .left_logo {
        width: 107px;
        height: 38px;
        cursor: pointer;
        margin-bottom: 14px;
        background: url(../assets/img/home/logo.png) no-repeat;
        background-size: cover;
      }
      .left_name {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .footer_right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      .right_con {
        display: flex;
        justify-content: space-between;
        li {
          p,
          .liaxi {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
            padding: 7px 0;
            cursor: pointer;
            a {
              color: rgba(255, 255, 255, 0.4);
              position: relative;
              &:hover {
                color: #9485ff;
              }
              .TP_EN {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url(../assets/img/home/TP_EN.png) no-repeat;
                background-size: cover;
                margin-right: 30px;
              }
              .Tokenswap_DEX {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url(../assets/img/home/Tokenswap_DEX.png) no-repeat;
                background-size: cover;
              }
              .text {
                position: absolute;
                left: 22px;
                top: -12px;
                font-size: 12px;
              }
            }
            &.text_small {
              font-size: 12px;
            }
          }
          p:first-child {
            font-size: 20px;
            color: #ffffff;
            cursor: text;
          }
        }
      }
      .banquan {
        font-size: 12px;
        margin-top: 50px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
</style>
