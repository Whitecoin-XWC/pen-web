/* eslint-disable array-callback-return */
<template>
  <div class="main-container">
    <div class="main-btns">
      <div :class="['btn-item', tabIndex == 6 && 'tab-active']" @click="tabType(6)">{{ $t('出售') }}</div>
      <i></i>
      <div :class="['btn-item', tabIndex == 5 && 'tab-active']" @click="tabType(5)">{{ $t('全部') }}</div>
      <div :class="['btn-item', tabIndex == 2 && 'tab-active']" @click="tabType(2)">{{ $t('视频') }}</div>
      <div :class="['btn-item', tabIndex == 3 && 'tab-active']" @click="tabType(3)">{{ $t('音频') }}</div>
      <div :class="['btn-item', tabIndex == 1 && 'tab-active']" @click="tabType(1)">{{ $t('图像') }}</div>
      <div :class="['btn-item', tabIndex == 4 && 'tab-active']" @click="tabType(4)">{{ $t('动图') }}</div>
      <div :class="['btn-item', tabIndex == 0 && 'tab-active']" @click="tabType(0)">{{ $t('文本') }}</div>
    </div>
    <div class="main-items">
      <div v-for="(item, index) in nftList" :key="index" class="album-item" @click="toDetails(item)">
        <img :src="item.fileName" alt="" />
        <p class="album-title">{{ item.fileTitle }}</p>
        <p class="album-author">{{ $t('创作者') }}：{{ item.userName }}</p>
        <div class="album-price">
          <div>
            <p>{{ $t('保留价') }}</p>
            <p>{{ item.pmPrice }}</p>
          </div>
          <div>
            <p>{{ $t('售价') }}</p>
            <p>{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination class="pagination" :total="total" :page-size="pageSize" :pager-count="5" layout="prev, pager, next" @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import http from '../../api/http'
export default {
  props: {},
  data() {
    return {
      tabIndex: 2,
      currentPage: 1,
      pageSize: 8,
      nftList: [],
      total: 0,
    }
  },
  computed: {
    ...mapState('global', ['address']),
  },
  mounted() {
    this.getNftList()
  },

  methods: {
    toDetails(item) {
      console.log(item)
      this.$router.push({
        path: `/details/${item.id}`,
        query: {
          tokenId: item.id,
          userAddress: this.address,
          mediaType: item.mediaType,
          source: item.source,
          status: item.fileStatus,
          copyrightFee: item.copyrightFee,
        },
      })
    },
    pageChange(index) {
      console.log(index)
      this.currentPage = index
      this.getNftList()
    },
    async getNftList(mediaType, status) {
      const res = await http(this.$axios).getSelectIndexList({
        page: this.currentPage,
        pageSize: this.pageSize,
        mediaType: mediaType || null,
        status: status || null,
      })
      console.log('res', res)
      if (res.code === 200 && res.data) {
        this.nftList = res.data.records
        this.total = res.data.count
        const url = res.data.imgUrl
        this.nftList.forEach((item) => {
          return (item.fileName = `${url}${item.fileName}`)
        })
      }
    },
    tabType(index) {
      if (index < 5) {
        this.getNftList(index, null)
      } else if (index === 5) {
        this.getNftList(null, null)
      } else if (index === 6) {
        this.getNftList(null, 4)
      }
      this.tabIndex = index
    },
  },
}
</script>

<style scoped lang="scss">
.main-container {
  position: relative;
  margin: 0 auto;
  width: 1200px;

  .main-btns {
    display: flex;
    margin-top: 22px;

    i {
      height: 50px;
      width: 1px;
      background: #e6e6e6;
      margin-right: 20px;
    }
  }
  .main-items {
    margin: 0 auto;
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
  }
  .pagination {
    text-align: center;
  }
}
</style>
