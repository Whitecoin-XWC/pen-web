<template>
  <div class="main-container">
    <div class="user-container">
      <!-- <div class="user-portrait">
        <img src="../../assets/img/header/portrait.png" alt="" />
      </div> -->
      <div class="user-name">{{ nickName }} <span class="user-edit" @click="showEditDialog"></span></div>
      <p class="user-call">{{ introduction }}</p>
    </div>
    <div class="person-btns">
      <div :class="['btn-item', tabIndex == 0 && 'tab-active']" @click="tabType(0)">{{ $t('创作') }}</div>
      <div :class="['btn-item', tabIndex == 1 && 'tab-active']" @click="tabType(1)">{{ $t('藏品') }}</div>
      <div :class="['btn-item', tabIndex == 2 && 'tab-active']" @click="tabType(2)">{{ $t('关注') }}</div>
    </div>
    <div v-if="nftList.length" class="person-items">
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

    <div v-if="!nftList.length" class="not-data">
      <div class="not-img"></div>
      <p>暂无数据</p>
    </div>
    <el-pagination
      v-if="nftList.length"
      class="pagination"
      :total="total"
      :page-size="pageSize"
      :pager-count="5"
      layout="prev, pager, next"
      @current-change="pageChange"
    >
    </el-pagination>
    <DialogEdit @editComplete="editComplete" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import http from '../../api/http'
export default {
  props: {},
  data() {
    return {
      tabIndex: 1,
      nickName: '',
      introduction: '',
      currentPage: 1,
      pageSize: 8,
      nftList: [],
      total: 0,
      source: 0,
    }
  },
  computed: {
    ...mapState('personal', ['isShowEditDialog']),
    ...mapState('global', ['address']),
  },
  mounted() {
    console.log('address====', this.address)
    this.getUserInfoData()
    this.getUserSeleceNftList()
  },
  methods: {
    pageChange(index) {
      this.currentPage = index
      this.getUserSeleceNftList()
    },
    editComplete() {
      this.getUserInfoData().then(() => {
        this.$store.commit('personal/set_state', { isShowEditDialog: false })
      })
    },
    async getUserInfoData() {
      const res = await http(this.$axios).getUserInfo({ id: this.address })
      console.log('----------res', res)
      if (res.code === 200 && res.data) {
        this.nickName = res.data.nickName
        this.introduction = res.data.introduction
      }
    },
    async getUserSeleceNftList() {
      const res = await http(this.$axios).getUserSelectFiles({
        page: this.currentPage,
        pageSize: this.pageSize,
        userAddress: this.address,
        source: this.source,
      })
      console.log('res---', res)
      if (res.code === 200 && res.data) {
        this.nftList = res.data.records
        const imgUrl = res.data.imgUrl
        this.total = res.data.count
        console.log(this.total)
        this.nftList.forEach((item) => {
          item.fileName = `${imgUrl}${item.fileName}`
        })
      }
    },
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
    showEditDialog() {
      this.$store.commit('personal/set_state', { isShowEditDialog: true })
    },
    tabType(index) {
      this.tabIndex = index
      this.source = index
      this.getUserSeleceNftList()
    },
  },
}
</script>

<style scoped lang="scss">
.main-container {
  position: relative;
  margin: 0 auto;
  width: 1200px;
  .user-container {
    margin-top: 55px;
    .user-portrait {
      width: 108px;
      height: 108px;
      border-radius: 50%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      margin: 0 auto;
      text-align: center;
      font-size: 30px;
      font-weight: 600;
      color: #000000;
      margin-top: 15px;
      margin-bottom: 4px;
      position: relative;
      .user-edit {
        display: inline-block;
        width: 28px;
        height: 28px;
        background: url('../../assets/img/personal/edit.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        cursor: pointer;
      }
    }
    .user-call {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
      line-height: 28px;
    }
  }
  .person-btns {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: 97px;
  }
  .person-items {
    margin: 0 auto;
    padding-top: 36px;
    display: flex;
    flex-wrap: wrap;
  }
  .not-data {
    text-align: center;
    margin-top: 159px;
    .not-img {
      margin: 0 auto;
      width: 257px;
      height: 200px;
      background: url('../../assets/img/personal/not-data.png');
      background-size: 100% 100%;
    }
    p {
      margin-top: 12px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 28px;
    }
  }
  .pagination {
    text-align: center;
  }
}
</style>
