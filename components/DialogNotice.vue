<template>
  <div v-if="isShowNoticeDialog" class="notice-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('您的竞标')" name="your">
        <div class="your-scroll">
          <div class="your-container">
            <div v-for="item in 5" :key="item" class="your-item">
              <div class="your-l">
                <p class="your-name">{{ $t('出价最高') }}</p>
                <div class="your-detail">
                  <img src="../assets/img/home/item-img.png" alt="" />
                  <div class="your-info">
                    <p>张凡俊</p>
                    <p>23h 59m 59s</p>
                  </div>
                </div>
              </div>
              <div class="your-r">
                <p>100 XWC</p>
                <p>$100</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('收到竞标')" name="received">{{ $t('收到竞标') }}</el-tab-pane>
      <el-tab-pane :label="$t('版权费')" name="royalties">{{ $t('版权费') }}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {},
  data() {
    return {
      activeName: 'your',
    }
  },
  computed: {
    ...mapState('global', ['isShowNoticeDialog']),
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
}
</script>

<style scoped lang="scss">
.notice-container {
  position: absolute;
  z-index: 9;
  width: 386px;
  height: 460px;
  background: #ffffff;
  box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12);
  top: 90px;
  right: 415px;
  &::before {
    position: absolute;
    display: inline-block;
    content: '';
    border-top: 8px solid transparent;
    border-bottom: 8px solid #ffffff;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
  }
  /deep/.el-tabs__active-bar {
    background-color: #000000ff;
  }
  /deep/.el-tabs__item {
    padding: 0 20% !important;
    font-size: 16px;
    font-weight: 400;
    color: #00000040;
    &.is-active {
      font-weight: 600;
      color: #000000d9;
    }
  }
  .your-scroll {
    width: 100%;
    height: 400px;
    overflow: hidden;
  }
  .your-container {
    width: 100%;
    height: 100%;
    padding: 18px 20px;
    box-sizing: border-box;
    overflow: scroll;
    .your-item {
      height: 100px;
      border-bottom: 1px solid #0000000f;
      display: flex;
      justify-content: space-between;
      .your-l {
        display: flex;
        flex-direction: column;
        .your-name {
          font-size: 14px;
          font-weight: 700;
          color: #000000a6;
          line-height: 22px;
          margin-bottom: 9px;
        }
        .your-detail {
          display: flex;
          img {
            width: 40px;
            height: 40px;
            margin-right: 14px;
          }
          .your-info {
            p {
              &:first-child {
                font-size: 14px;
                font-weight: 400;
                color: #999999;
                line-height: 20px;
              }
              &:last-child {
                font-size: 16px;
                font-weight: bold;
                color: #000000;
                line-height: 19px;
              }
            }
          }
        }
      }
      .your-r {
        padding-top: 31px;
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        line-height: 19px;
      }
    }
  }
}
</style>
